import { Router, Response } from "express";
import { body, query, validationResult } from "express-validator";
import { authenticateToken, requireAdmin, AuthRequest } from "../auth/auth";
import db from "../database/init";

const router = Router();

// Helper function to create slug from title
const createSlug = (title: string): string => {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove accents
    .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single
    .trim("-"); // Remove leading/trailing hyphens
};

// Get all events (public route with pagination and filters)
router.get(
  "/",
  [
    query("page")
      .optional()
      .isInt({ min: 1 })
      .withMessage("Página deve ser um número positivo"),
    query("limit")
      .optional()
      .isInt({ min: 1, max: 50 })
      .withMessage("Limite deve ser entre 1 e 50"),
    query("category").optional().isString(),
    query("type").optional().isIn(["presencial", "online", "hibrido"]),
    query("status")
      .optional()
      .isIn(["upcoming", "ongoing", "completed", "cancelled"]),
    query("featured").optional().isBoolean(),
  ],
  async (req: AuthRequest, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: "Parâmetros inválidos",
          details: errors.array(),
        });
      }

      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 6;
      const offset = (page - 1) * limit;
      const category = req.query.category as string;
      const eventType = req.query.type as string;
      const status = (req.query.status as string) || "upcoming";
      const featured = req.query.featured === "true";

      // Build WHERE clause
      let whereConditions = ["status = ?"];
      let params: any[] = [status];

      if (category && category !== "Todos") {
        whereConditions.push("category = ?");
        params.push(category);
      }

      if (eventType && eventType !== "Todos") {
        whereConditions.push("event_type = ?");
        params.push(eventType);
      }

      if (featured) {
        whereConditions.push("featured = 1");
      }

      const whereClause =
        whereConditions.length > 0
          ? `WHERE ${whereConditions.join(" AND ")}`
          : "";

      // Get total count
      const countQuery = `SELECT COUNT(*) as total FROM events ${whereClause}`;

      db.get(countQuery, params, (err, countResult: any) => {
        if (err) {
          console.error("Database error:", err);
          return res.status(500).json({ error: "Erro interno do servidor" });
        }

        const total = countResult.total;
        const totalPages = Math.ceil(total / limit);

        // Get events
        const eventsQuery = `
        SELECT 
          id, title, slug, description, date, start_time, end_time,
          location, category, event_type, capacity, registered, organizer,
          speakers, image_url, status, featured, registration_required, price,
          created_at, updated_at
        FROM events
        ${whereClause}
        ORDER BY date ASC, start_time ASC
        LIMIT ? OFFSET ?
      `;

        db.all(
          eventsQuery,
          [...params, limit, offset],
          (eventsErr, events: any[]) => {
            if (eventsErr) {
              console.error("Database error:", eventsErr);
              return res
                .status(500)
                .json({ error: "Erro interno do servidor" });
            }

            // Format events
            const formattedEvents = events.map((event) => ({
              ...event,
              speakers: event.speakers ? JSON.parse(event.speakers) : [],
              featured: Boolean(event.featured),
              registration_required: Boolean(event.registration_required),
            }));

            res.json({
              events: formattedEvents,
              pagination: {
                current_page: page,
                total_pages: totalPages,
                total_events: total,
                has_next: page < totalPages,
                has_previous: page > 1,
              },
            });
          },
        );
      });
    } catch (error) {
      console.error("Events fetch error:", error);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  },
);

// Get single event by slug (public route)
router.get("/:slug", async (req: AuthRequest, res: Response) => {
  try {
    const { slug } = req.params;

    const query = `
      SELECT 
        id, title, slug, description, date, start_time, end_time,
        location, category, event_type, capacity, registered, organizer,
        speakers, image_url, status, featured, registration_required, price,
        created_at, updated_at
      FROM events
      WHERE slug = ?
    `;

    db.get(query, [slug], (err, event: any) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ error: "Erro interno do servidor" });
      }

      if (!event) {
        return res.status(404).json({ error: "Evento não encontrado" });
      }

      // Format event
      const formattedEvent = {
        ...event,
        speakers: event.speakers ? JSON.parse(event.speakers) : [],
        featured: Boolean(event.featured),
        registration_required: Boolean(event.registration_required),
      };

      res.json(formattedEvent);
    });
  } catch (error) {
    console.error("Event fetch error:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

// Create new event (admin only)
router.post(
  "/",
  [
    authenticateToken,
    requireAdmin,
    body("title")
      .trim()
      .isLength({ min: 5, max: 200 })
      .withMessage("Título deve ter entre 5 e 200 caracteres"),
    body("description")
      .trim()
      .isLength({ min: 10 })
      .withMessage("Descrição deve ter pelo menos 10 caracteres"),
    body("date").isISO8601().withMessage("Data deve estar no formato ISO8601"),
    body("start_time")
      .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
      .withMessage("Hora de início deve estar no formato HH:MM"),
    body("end_time")
      .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
      .withMessage("Hora de fim deve estar no formato HH:MM"),
    body("location")
      .trim()
      .isLength({ min: 2 })
      .withMessage("Local é obrigatório"),
    body("category")
      .trim()
      .isLength({ min: 2 })
      .withMessage("Categoria é obrigatória"),
    body("event_type")
      .isIn(["presencial", "online", "hibrido"])
      .withMessage("Tipo de evento inválido"),
    body("capacity")
      .isInt({ min: 1 })
      .withMessage("Capacidade deve ser um número positivo"),
    body("organizer")
      .trim()
      .isLength({ min: 2 })
      .withMessage("Organizador é obrigatório"),
    body("speakers")
      .optional()
      .isArray()
      .withMessage("Palestrantes devem ser um array"),
    body("featured")
      .optional()
      .isBoolean()
      .withMessage("Featured deve ser um boolean"),
    body("registration_required")
      .optional()
      .isBoolean()
      .withMessage("Registration required deve ser um boolean"),
    body("price")
      .optional()
      .isString()
      .withMessage("Preço deve ser uma string"),
    body("status")
      .optional()
      .isIn(["upcoming", "ongoing", "completed", "cancelled"])
      .withMessage("Status inválido"),
  ],
  async (req: AuthRequest, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: "Dados inválidos",
          details: errors.array(),
        });
      }

      const {
        title,
        description,
        date,
        start_time,
        end_time,
        location,
        category,
        event_type,
        capacity,
        organizer,
        speakers = [],
        featured = false,
        registration_required = true,
        price = "Gratuito",
        status = "upcoming",
      } = req.body;

      const slug = createSlug(title);

      // Check if slug already exists
      db.get(
        "SELECT id FROM events WHERE slug = ?",
        [slug],
        (err, existingEvent) => {
          if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ error: "Erro interno do servidor" });
          }

          if (existingEvent) {
            return res
              .status(400)
              .json({ error: "Já existe um evento com este título" });
          }

          // Insert event
          db.run(
            `
        INSERT INTO events (
          title, slug, description, date, start_time, end_time, location,
          category, event_type, capacity, organizer, speakers, featured,
          registration_required, price, status
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
            [
              title,
              slug,
              description,
              date,
              start_time,
              end_time,
              location,
              category,
              event_type,
              capacity,
              organizer,
              JSON.stringify(speakers),
              featured ? 1 : 0,
              registration_required ? 1 : 0,
              price,
              status,
            ],
            function (insertErr) {
              if (insertErr) {
                console.error("Event creation error:", insertErr);
                return res.status(500).json({ error: "Erro ao criar evento" });
              }

              res.status(201).json({
                message: "Evento criado com sucesso",
                event_id: this.lastID,
                slug: slug,
              });
            },
          );
        },
      );
    } catch (error) {
      console.error("Event creation error:", error);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  },
);

// Update event (admin only)
router.put(
  "/:id",
  [
    authenticateToken,
    requireAdmin,
    body("title").optional().trim().isLength({ min: 5, max: 200 }),
    body("description").optional().trim().isLength({ min: 10 }),
    body("date").optional().isISO8601(),
    body("start_time")
      .optional()
      .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
    body("end_time")
      .optional()
      .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
    body("location").optional().trim().isLength({ min: 2 }),
    body("category").optional().trim().isLength({ min: 2 }),
    body("event_type").optional().isIn(["presencial", "online", "hibrido"]),
    body("capacity").optional().isInt({ min: 1 }),
    body("organizer").optional().trim().isLength({ min: 2 }),
    body("speakers").optional().isArray(),
    body("featured").optional().isBoolean(),
    body("registration_required").optional().isBoolean(),
    body("price").optional().isString(),
    body("status")
      .optional()
      .isIn(["upcoming", "ongoing", "completed", "cancelled"]),
  ],
  async (req: AuthRequest, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: "Dados inválidos",
          details: errors.array(),
        });
      }

      const eventId = parseInt(req.params.id);
      const updates = req.body;

      // Get current event
      db.get(
        "SELECT * FROM events WHERE id = ?",
        [eventId],
        (err, currentEvent: any) => {
          if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ error: "Erro interno do servidor" });
          }

          if (!currentEvent) {
            return res.status(404).json({ error: "Evento não encontrado" });
          }

          // Build update query
          const updateFields: string[] = [];
          const updateParams: any[] = [];

          Object.keys(updates).forEach((key) => {
            if (updates[key] !== undefined) {
              if (key === "title") {
                updateFields.push("title = ?", "slug = ?");
                updateParams.push(updates[key], createSlug(updates[key]));
              } else if (key === "speakers") {
                updateFields.push("speakers = ?");
                updateParams.push(JSON.stringify(updates[key]));
              } else if (
                key === "featured" ||
                key === "registration_required"
              ) {
                updateFields.push(`${key} = ?`);
                updateParams.push(updates[key] ? 1 : 0);
              } else {
                updateFields.push(`${key} = ?`);
                updateParams.push(updates[key]);
              }
            }
          });

          if (updateFields.length > 0) {
            updateFields.push("updated_at = CURRENT_TIMESTAMP");
            updateParams.push(eventId);

            const updateQuery = `UPDATE events SET ${updateFields.join(", ")} WHERE id = ?`;

            db.run(updateQuery, updateParams, (updateErr) => {
              if (updateErr) {
                console.error("Event update error:", updateErr);
                return res
                  .status(500)
                  .json({ error: "Erro ao atualizar evento" });
              }

              res.json({ message: "Evento atualizado com sucesso" });
            });
          } else {
            res.json({ message: "Nenhuma alteração detectada" });
          }
        },
      );
    } catch (error) {
      console.error("Event update error:", error);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  },
);

// Delete event (admin only)
router.delete(
  "/:id",
  [authenticateToken, requireAdmin],
  async (req: AuthRequest, res: Response) => {
    try {
      const eventId = parseInt(req.params.id);

      // Check if event exists
      db.get("SELECT id FROM events WHERE id = ?", [eventId], (err, event) => {
        if (err) {
          console.error("Database error:", err);
          return res.status(500).json({ error: "Erro interno do servidor" });
        }

        if (!event) {
          return res.status(404).json({ error: "Evento não encontrado" });
        }

        // Delete event
        db.run("DELETE FROM events WHERE id = ?", [eventId], (deleteErr) => {
          if (deleteErr) {
            console.error("Event deletion error:", deleteErr);
            return res.status(500).json({ error: "Erro ao deletar evento" });
          }

          res.json({ message: "Evento deletado com sucesso" });
        });
      });
    } catch (error) {
      console.error("Event deletion error:", error);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  },
);

// Register for event (authenticated users)
router.post(
  "/:id/register",
  [authenticateToken],
  async (req: AuthRequest, res: Response) => {
    try {
      const eventId = parseInt(req.params.id);
      const userId = req.user!.id;

      // Get event details
      db.get(
        "SELECT capacity, registered, registration_required FROM events WHERE id = ?",
        [eventId],
        (err, event: any) => {
          if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ error: "Erro interno do servidor" });
          }

          if (!event) {
            return res.status(404).json({ error: "Evento não encontrado" });
          }

          if (!event.registration_required) {
            return res
              .status(400)
              .json({ error: "Este evento não requer inscrição" });
          }

          if (event.registered >= event.capacity) {
            return res.status(400).json({ error: "Evento lotado" });
          }

          // Update registered count
          db.run(
            "UPDATE events SET registered = registered + 1 WHERE id = ?",
            [eventId],
            (updateErr) => {
              if (updateErr) {
                console.error("Registration update error:", updateErr);
                return res
                  .status(500)
                  .json({ error: "Erro ao registrar para o evento" });
              }

              res.json({ message: "Inscrição realizada com sucesso" });
            },
          );
        },
      );
    } catch (error) {
      console.error("Event registration error:", error);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  },
);

// Get event categories (public route)
router.get("/meta/categories", async (req: AuthRequest, res: Response) => {
  const query = `
    SELECT DISTINCT category 
    FROM events 
    WHERE status != 'cancelled'
    ORDER BY category
  `;

  db.all(query, (err, categories: any[]) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }

    const categoryList = ["Todos", ...categories.map((c) => c.category)];
    res.json(categoryList);
  });
});

// Get event statistics (admin only)
router.get(
  "/meta/stats",
  [authenticateToken, requireAdmin],
  async (req: AuthRequest, res: Response) => {
    try {
      const queries = {
        total: "SELECT COUNT(*) as count FROM events",
        upcoming:
          'SELECT COUNT(*) as count FROM events WHERE status = "upcoming"',
        ongoing:
          'SELECT COUNT(*) as count FROM events WHERE status = "ongoing"',
        completed:
          'SELECT COUNT(*) as count FROM events WHERE status = "completed"',
        totalRegistrations: "SELECT SUM(registered) as total FROM events",
      };

      const stats: any = {};

      const executeQuery = (key: string, query: string): Promise<void> => {
        return new Promise((resolve, reject) => {
          db.get(query, (err, result: any) => {
            if (err) reject(err);
            else {
              stats[key] = result.count || result.total || 0;
              resolve();
            }
          });
        });
      };

      await Promise.all(
        Object.entries(queries).map(([key, query]) => executeQuery(key, query)),
      );

      res.json(stats);
    } catch (error) {
      console.error("Event stats error:", error);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  },
);

export default router;
