import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import db from "../database/init";

// JWT Secret - in production this should be in environment variables
const JWT_SECRET = process.env.JWT_SECRET || "neabi-secret-key-2024";
const JWT_EXPIRES_IN = "24h";

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  role: "admin" | "reader";
  created_at: string;
}

export interface AuthRequest extends Request {
  user?: User;
}

// Generate JWT token
export const generateToken = (user: User): string => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN },
  );
};

// Verify JWT token
export const verifyToken = (token: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
};

// Authentication middleware
export const authenticateToken = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ error: "Token de acesso requerido" });
  }

  try {
    const decoded = await verifyToken(token);

    // Get user from database
    db.get(
      "SELECT id, email, first_name, last_name, role, created_at FROM users WHERE id = ?",
      [decoded.id],
      (err, user) => {
        if (err) {
          console.error("Database error:", err);
          return res.status(500).json({ error: "Erro interno do servidor" });
        }

        if (!user) {
          return res.status(401).json({ error: "Usuário não encontrado" });
        }

        req.user = user as User;
        next();
      },
    );
  } catch (error) {
    console.error("Token verification error:", error);
    return res.status(403).json({ error: "Token inválido" });
  }
};

// Admin role middleware
export const requireAdmin = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  if (!req.user) {
    return res.status(401).json({ error: "Usuário não autenticado" });
  }

  if (req.user.role !== "admin") {
    return res
      .status(403)
      .json({ error: "Acesso negado. Apenas administradores." });
  }

  next();
};

// Reader or Admin role middleware
export const requireAuth = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  if (!req.user) {
    return res.status(401).json({ error: "Usuário não autenticado" });
  }

  if (!["admin", "reader"].includes(req.user.role)) {
    return res.status(403).json({ error: "Acesso negado" });
  }

  next();
};

// Login function
export const loginUser = async (
  email: string,
  password: string,
): Promise<{ user: User; token: string } | null> => {
  return new Promise((resolve, reject) => {
    db.get(
      "SELECT * FROM users WHERE email = ?",
      [email],
      async (err, row: any) => {
        if (err) {
          console.error("Database error:", err);
          reject(new Error("Erro interno do servidor"));
          return;
        }

        if (!row) {
          resolve(null); // User not found
          return;
        }

        try {
          const isValidPassword = await bcrypt.compare(password, row.password);

          if (!isValidPassword) {
            resolve(null); // Invalid password
            return;
          }

          const user: User = {
            id: row.id,
            email: row.email,
            first_name: row.first_name,
            last_name: row.last_name,
            role: row.role,
            created_at: row.created_at,
          };

          const token = generateToken(user);

          // Store session in database
          db.run(
            'INSERT INTO user_sessions (user_id, token, expires_at) VALUES (?, ?, datetime("now", "+24 hours"))',
            [user.id, token],
            (sessionErr) => {
              if (sessionErr) {
                console.error("Session creation error:", sessionErr);
              }
            },
          );

          resolve({ user, token });
        } catch (bcryptError) {
          console.error("Password verification error:", bcryptError);
          reject(new Error("Erro na verificação da senha"));
        }
      },
    );
  });
};

// Register function
export const registerUser = async (
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  role: "admin" | "reader" = "reader",
): Promise<User | null> => {
  return new Promise(async (resolve, reject) => {
    try {
      // Check if user already exists
      db.get(
        "SELECT id FROM users WHERE email = ?",
        [email],
        async (err, existingUser) => {
          if (err) {
            console.error("Database error:", err);
            reject(new Error("Erro interno do servidor"));
            return;
          }

          if (existingUser) {
            reject(new Error("Usuário já existe"));
            return;
          }

          try {
            const hashedPassword = await bcrypt.hash(password, 12);

            db.run(
              "INSERT INTO users (email, password, first_name, last_name, role) VALUES (?, ?, ?, ?, ?)",
              [email, hashedPassword, firstName, lastName, role],
              function (insertErr) {
                if (insertErr) {
                  console.error("User creation error:", insertErr);
                  reject(new Error("Erro ao criar usuário"));
                  return;
                }

                // Get the created user
                db.get(
                  "SELECT id, email, first_name, last_name, role, created_at FROM users WHERE id = ?",
                  [this.lastID],
                  (selectErr, user) => {
                    if (selectErr) {
                      console.error("User retrieval error:", selectErr);
                      reject(new Error("Erro ao recuperar usuário"));
                      return;
                    }

                    resolve(user as User);
                  },
                );
              },
            );
          } catch (hashError) {
            console.error("Password hashing error:", hashError);
            reject(new Error("Erro ao processar senha"));
          }
        },
      );
    } catch (error) {
      console.error("Registration error:", error);
      reject(new Error("Erro no registro"));
    }
  });
};

// Logout function (remove session)
export const logoutUser = async (token: string): Promise<boolean> => {
  return new Promise((resolve) => {
    db.run("DELETE FROM user_sessions WHERE token = ?", [token], (err) => {
      if (err) {
        console.error("Logout error:", err);
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
};

// Clean expired sessions
export const cleanExpiredSessions = () => {
  db.run(
    'DELETE FROM user_sessions WHERE expires_at < datetime("now")',
    (err) => {
      if (err) {
        console.error("Error cleaning expired sessions:", err);
      } else {
        console.log("Expired sessions cleaned");
      }
    },
  );
};

// Run cleanup every hour
setInterval(cleanExpiredSessions, 60 * 60 * 1000);
