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

// Get all posts (public route with pagination and filters)
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
    query("search").optional().isString(),
    query("featured").optional().isBoolean(),
    query("status").optional().isIn(["draft", "published", "archived"]),
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
      const limit = parseInt(req.query.limit as string) || 9;
      const offset = (page - 1) * limit;
      const category = req.query.category as string;
      const search = req.query.search as string;
      const featured = req.query.featured === "true";
      const status = (req.query.status as string) || "published";

      // Build WHERE clause
      let whereConditions = ["bp.status = ?"];
      let params: any[] = [status];

      if (category && category !== "Todos") {
        whereConditions.push("c.name = ?");
        params.push(category);
      }

      if (search) {
        whereConditions.push(
          '(bp.title LIKE ? OR bp.excerpt LIKE ? OR CONCAT(u.first_name, " ", u.last_name) LIKE ?)',
        );
        const searchPattern = `%${search}%`;
        params.push(searchPattern, searchPattern, searchPattern);
      }

      if (featured) {
        whereConditions.push("bp.featured = 1");
      }

      const whereClause =
        whereConditions.length > 0
          ? `WHERE ${whereConditions.join(" AND ")}`
          : "";

      // Get total count
      const countQuery = `
      SELECT COUNT(*) as total
      FROM blog_posts bp
      LEFT JOIN users u ON bp.author_id = u.id
      LEFT JOIN categories c ON bp.category_id = c.id
      ${whereClause}
    `;

      db.get(countQuery, params, (err, countResult: any) => {
        if (err) {
          console.error("Database error:", err);
          return res.status(500).json({ error: "Erro interno do servidor" });
        }

        const total = countResult.total;
        const totalPages = Math.ceil(total / limit);

        // Get posts
        const postsQuery = `
        SELECT 
          bp.id,
          bp.title,
          bp.slug,
          bp.excerpt,
          bp.published_date,
          bp.read_time,
          bp.image_url,
          bp.views,
          bp.likes,
          bp.featured,
          bp.status,
          CONCAT(u.first_name, ' ', u.last_name) as author,
          u.id as author_id,
          c.name as category,
          c.id as category_id,
          GROUP_CONCAT(t.name) as tags
        FROM blog_posts bp
        LEFT JOIN users u ON bp.author_id = u.id
        LEFT JOIN categories c ON bp.category_id = c.id
        LEFT JOIN post_tags pt ON bp.id = pt.post_id
        LEFT JOIN tags t ON pt.tag_id = t.id
        ${whereClause}
        GROUP BY bp.id
        ORDER BY bp.published_date DESC
        LIMIT ? OFFSET ?
      `;

        db.all(
          postsQuery,
          [...params, limit, offset],
          (postsErr, posts: any[]) => {
            if (postsErr) {
              console.error("Database error:", postsErr);
              return res
                .status(500)
                .json({ error: "Erro interno do servidor" });
            }

            // Format posts
            const formattedPosts = posts.map((post) => ({
              ...post,
              tags: post.tags ? post.tags.split(",") : [],
              author_role: "Membro da Equipe NEABI", // Default role for display
            }));

            res.json({
              posts: formattedPosts,
              pagination: {
                current_page: page,
                total_pages: totalPages,
                total_posts: total,
                has_next: page < totalPages,
                has_previous: page > 1,
              },
            });
          },
        );
      });
    } catch (error) {
      console.error("Posts fetch error:", error);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  },
);

// Get single post by slug (public route)
router.get("/:slug", async (req: AuthRequest, res: Response) => {
  try {
    const { slug } = req.params;

    const query = `
      SELECT 
        bp.id,
        bp.title,
        bp.slug,
        bp.excerpt,
        bp.content,
        bp.published_date,
        bp.read_time,
        bp.image_url,
        bp.views,
        bp.likes,
        bp.featured,
        bp.status,
        CONCAT(u.first_name, ' ', u.last_name) as author,
        u.id as author_id,
        c.name as category,
        c.id as category_id,
        GROUP_CONCAT(t.name) as tags
      FROM blog_posts bp
      LEFT JOIN users u ON bp.author_id = u.id
      LEFT JOIN categories c ON bp.category_id = c.id
      LEFT JOIN post_tags pt ON bp.id = pt.post_id
      LEFT JOIN tags t ON pt.tag_id = t.id
      WHERE bp.slug = ? AND bp.status = 'published'
      GROUP BY bp.id
    `;

    db.get(query, [slug], (err, post: any) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ error: "Erro interno do servidor" });
      }

      if (!post) {
        return res.status(404).json({ error: "Post não encontrado" });
      }

      // Increment view count
      db.run("UPDATE blog_posts SET views = views + 1 WHERE id = ?", [post.id]);

      // Format post
      const formattedPost = {
        ...post,
        tags: post.tags ? post.tags.split(",") : [],
        author_role: "Membro da Equipe NEABI",
      };

      res.json(formattedPost);
    });
  } catch (error) {
    console.error("Post fetch error:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

// Create new post (admin only)
router.post(
  "/",
  [
    authenticateToken,
    requireAdmin,
    body("title")
      .trim()
      .isLength({ min: 5, max: 200 })
      .withMessage("Título deve ter entre 5 e 200 caracteres"),
    body("excerpt")
      .trim()
      .isLength({ min: 10, max: 300 })
      .withMessage("Resumo deve ter entre 10 e 300 caracteres"),
    body("content")
      .trim()
      .isLength({ min: 50 })
      .withMessage("Conteúdo deve ter pelo menos 50 caracteres"),
    body("category_id")
      .isInt({ min: 1 })
      .withMessage("Categoria é obrigatória"),
    body("read_time")
      .optional()
      .matches(/^\d+\s*(min|minutos?)$/i)
      .withMessage('Tempo de leitura deve estar no formato "X min"'),
    body("tags").optional().isArray().withMessage("Tags devem ser um array"),
    body("featured")
      .optional()
      .isBoolean()
      .withMessage("Featured deve ser um boolean"),
    body("status")
      .optional()
      .isIn(["draft", "published", "archived"])
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
        excerpt,
        content,
        category_id,
        read_time = "5 min",
        tags = [],
        featured = false,
        status = "published",
      } = req.body;

      const slug = createSlug(title);
      const author_id = req.user!.id;

      // Check if slug already exists
      db.get(
        "SELECT id FROM blog_posts WHERE slug = ?",
        [slug],
        (err, existingPost) => {
          if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ error: "Erro interno do servidor" });
          }

          if (existingPost) {
            return res
              .status(400)
              .json({ error: "Já existe um post com este título" });
          }

          // Insert post
          db.run(
            `
        INSERT INTO blog_posts (
          title, slug, excerpt, content, author_id, category_id, 
          read_time, featured, status
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
            [
              title,
              slug,
              excerpt,
              content,
              author_id,
              category_id,
              read_time,
              featured ? 1 : 0,
              status,
            ],
            function (insertErr) {
              if (insertErr) {
                console.error("Post creation error:", insertErr);
                return res.status(500).json({ error: "Erro ao criar post" });
              }

              const postId = this.lastID;

              // Insert tags if provided
              if (tags.length > 0) {
                const tagPromises = tags.map((tagName: string) => {
                  return new Promise<number>((resolve, reject) => {
                    // Insert or get existing tag
                    db.run(
                      "INSERT OR IGNORE INTO tags (name, slug) VALUES (?, ?)",
                      [tagName, createSlug(tagName)],
                      function () {
                        db.get(
                          "SELECT id FROM tags WHERE name = ?",
                          [tagName],
                          (tagErr, tag: any) => {
                            if (tagErr) reject(tagErr);
                            else resolve(tag.id);
                          },
                        );
                      },
                    );
                  });
                });

                Promise.all(tagPromises)
                  .then((tagIds) => {
                    // Insert post-tag relationships
                    const tagInserts = tagIds.map((tagId) => {
                      return new Promise<void>((resolve, reject) => {
                        db.run(
                          "INSERT INTO post_tags (post_id, tag_id) VALUES (?, ?)",
                          [postId, tagId],
                          (tagRelErr) => {
                            if (tagRelErr) reject(tagRelErr);
                            else resolve();
                          },
                        );
                      });
                    });

                    Promise.all(tagInserts)
                      .then(() => {
                        res.status(201).json({
                          message: "Post criado com sucesso",
                          post_id: postId,
                          slug: slug,
                        });
                      })
                      .catch((tagRelError) => {
                        console.error("Tag relationship error:", tagRelError);
                        res
                          .status(500)
                          .json({ error: "Erro ao associar tags" });
                      });
                  })
                  .catch((tagError) => {
                    console.error("Tag creation error:", tagError);
                    res.status(500).json({ error: "Erro ao criar tags" });
                  });
              } else {
                res.status(201).json({
                  message: "Post criado com sucesso",
                  post_id: postId,
                  slug: slug,
                });
              }
            },
          );
        },
      );
    } catch (error) {
      console.error("Post creation error:", error);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  },
);

// Update post (admin only)
router.put(
  "/:id",
  [
    authenticateToken,
    requireAdmin,
    body("title").optional().trim().isLength({ min: 5, max: 200 }),
    body("excerpt").optional().trim().isLength({ min: 10, max: 300 }),
    body("content").optional().trim().isLength({ min: 50 }),
    body("category_id").optional().isInt({ min: 1 }),
    body("read_time")
      .optional()
      .matches(/^\d+\s*(min|minutos?)$/i),
    body("tags").optional().isArray(),
    body("featured").optional().isBoolean(),
    body("status").optional().isIn(["draft", "published", "archived"]),
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

      const postId = parseInt(req.params.id);
      const updates = req.body;

      // Get current post
      db.get(
        "SELECT * FROM blog_posts WHERE id = ?",
        [postId],
        (err, currentPost: any) => {
          if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ error: "Erro interno do servidor" });
          }

          if (!currentPost) {
            return res.status(404).json({ error: "Post não encontrado" });
          }

          // Build update query
          const updateFields: string[] = [];
          const updateParams: any[] = [];

          Object.keys(updates).forEach((key) => {
            if (key !== "tags" && updates[key] !== undefined) {
              if (key === "title") {
                updateFields.push("title = ?", "slug = ?");
                updateParams.push(updates[key], createSlug(updates[key]));
              } else if (key === "featured") {
                updateFields.push("featured = ?");
                updateParams.push(updates[key] ? 1 : 0);
              } else {
                updateFields.push(`${key} = ?`);
                updateParams.push(updates[key]);
              }
            }
          });

          if (updateFields.length > 0) {
            updateFields.push("updated_at = CURRENT_TIMESTAMP");
            updateParams.push(postId);

            const updateQuery = `UPDATE blog_posts SET ${updateFields.join(", ")} WHERE id = ?`;

            db.run(updateQuery, updateParams, (updateErr) => {
              if (updateErr) {
                console.error("Post update error:", updateErr);
                return res
                  .status(500)
                  .json({ error: "Erro ao atualizar post" });
              }

              // Handle tags update if provided
              if (updates.tags) {
                // Delete existing tag relationships
                db.run(
                  "DELETE FROM post_tags WHERE post_id = ?",
                  [postId],
                  (deleteErr) => {
                    if (deleteErr) {
                      console.error("Tag deletion error:", deleteErr);
                      return res
                        .status(500)
                        .json({ error: "Erro ao atualizar tags" });
                    }

                    // Insert new tags (similar to create post logic)
                    if (updates.tags.length > 0) {
                      // Tag insertion logic here (similar to create post)
                      res.json({ message: "Post atualizado com sucesso" });
                    } else {
                      res.json({ message: "Post atualizado com sucesso" });
                    }
                  },
                );
              } else {
                res.json({ message: "Post atualizado com sucesso" });
              }
            });
          } else {
            res.json({ message: "Nenhuma alteração detectada" });
          }
        },
      );
    } catch (error) {
      console.error("Post update error:", error);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  },
);

// Delete post (admin only)
router.delete(
  "/:id",
  [authenticateToken, requireAdmin],
  async (req: AuthRequest, res: Response) => {
    try {
      const postId = parseInt(req.params.id);

      // Check if post exists
      db.get(
        "SELECT id FROM blog_posts WHERE id = ?",
        [postId],
        (err, post) => {
          if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ error: "Erro interno do servidor" });
          }

          if (!post) {
            return res.status(404).json({ error: "Post não encontrado" });
          }

          // Delete post (cascading will handle post_tags)
          db.run(
            "DELETE FROM blog_posts WHERE id = ?",
            [postId],
            (deleteErr) => {
              if (deleteErr) {
                console.error("Post deletion error:", deleteErr);
                return res.status(500).json({ error: "Erro ao deletar post" });
              }

              res.json({ message: "Post deletado com sucesso" });
            },
          );
        },
      );
    } catch (error) {
      console.error("Post deletion error:", error);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  },
);

// Get categories (public route)
router.get("/meta/categories", async (req: AuthRequest, res: Response) => {
  db.all("SELECT * FROM categories ORDER BY name", (err, categories) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }

    res.json(categories);
  });
});

// Get tags (public route)
router.get("/meta/tags", async (req: AuthRequest, res: Response) => {
  db.all("SELECT * FROM tags ORDER BY name", (err, tags) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }

    res.json(tags);
  });
});

export default router;
