import { Router, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import {
  loginUser,
  registerUser,
  logoutUser,
  authenticateToken,
  AuthRequest,
} from "../auth/auth";

const router = Router();

// Login route
router.post(
  "/login",
  [
    body("email")
      .isEmail()
      .normalizeEmail()
      .withMessage("Email válido é obrigatório"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Senha deve ter pelo menos 6 caracteres"),
  ],
  async (req: Request, res: Response) => {
    try {
      // Check validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: "Dados inválidos",
          details: errors.array(),
        });
      }

      const { email, password } = req.body;

      const result = await loginUser(email, password);

      if (!result) {
        return res.status(401).json({
          error: "Email ou senha incorretos",
        });
      }

      res.json({
        message: "Login realizado com sucesso",
        user: result.user,
        token: result.token,
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({
        error: "Erro interno do servidor",
      });
    }
  },
);

// Register route (only admins can register new users)
router.post(
  "/register",
  [
    authenticateToken,
    body("email")
      .isEmail()
      .normalizeEmail()
      .withMessage("Email válido é obrigatório"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Senha deve ter pelo menos 6 caracteres"),
    body("firstName")
      .trim()
      .isLength({ min: 2 })
      .withMessage("Nome deve ter pelo menos 2 caracteres"),
    body("lastName")
      .trim()
      .isLength({ min: 2 })
      .withMessage("Sobrenome deve ter pelo menos 2 caracteres"),
    body("role")
      .optional()
      .isIn(["admin", "reader"])
      .withMessage("Role deve ser admin ou reader"),
  ],
  async (req: AuthRequest, res: Response) => {
    try {
      // Check if user is admin
      if (req.user?.role !== "admin") {
        return res.status(403).json({
          error: "Apenas administradores podem registrar novos usuários",
        });
      }

      // Check validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: "Dados inválidos",
          details: errors.array(),
        });
      }

      const {
        email,
        password,
        firstName,
        lastName,
        role = "reader",
      } = req.body;

      const newUser = await registerUser(
        email,
        password,
        firstName,
        lastName,
        role,
      );

      res.status(201).json({
        message: "Usuário criado com sucesso",
        user: newUser,
      });
    } catch (error: any) {
      console.error("Registration error:", error);

      if (error.message === "Usuário já existe") {
        return res.status(400).json({
          error: "Usuário já existe",
        });
      }

      res.status(500).json({
        error: "Erro interno do servidor",
      });
    }
  },
);

// Logout route
router.post(
  "/logout",
  authenticateToken,
  async (req: AuthRequest, res: Response) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];

      if (!token) {
        return res.status(400).json({
          error: "Token não fornecido",
        });
      }

      await logoutUser(token);

      res.json({
        message: "Logout realizado com sucesso",
      });
    } catch (error) {
      console.error("Logout error:", error);
      res.status(500).json({
        error: "Erro interno do servidor",
      });
    }
  },
);

// Get current user profile
router.get("/profile", authenticateToken, (req: AuthRequest, res: Response) => {
  res.json({
    user: req.user,
  });
});

// Verify token (for frontend auth checks)
router.get("/verify", authenticateToken, (req: AuthRequest, res: Response) => {
  res.json({
    valid: true,
    user: req.user,
  });
});

// Change password
router.put(
  "/change-password",
  [
    authenticateToken,
    body("currentPassword")
      .isLength({ min: 6 })
      .withMessage("Senha atual é obrigatória"),
    body("newPassword")
      .isLength({ min: 6 })
      .withMessage("Nova senha deve ter pelo menos 6 caracteres"),
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

      // This would be implemented with proper password verification
      res.json({
        message:
          "Funcionalidade de alteração de senha será implementada em breve",
      });
    } catch (error) {
      console.error("Change password error:", error);
      res.status(500).json({
        error: "Erro interno do servidor",
      });
    }
  },
);

export default router;
