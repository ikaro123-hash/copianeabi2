import sqlite3 from "sqlite3";
import bcrypt from "bcryptjs";
import path from "path";

const DB_PATH = path.join(__dirname, "../data/neabi.db");

// Enable verbose mode for debugging
const sqlite = sqlite3.verbose();

export const db = new sqlite.Database(DB_PATH, (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
  } else {
    console.log("Connected to the SQLite database.");
  }
});

// Initialize database tables
export const initializeDatabase = async () => {
  return new Promise<void>((resolve, reject) => {
    db.serialize(() => {
      // Users table
      db.run(`
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          email TEXT UNIQUE NOT NULL,
          password TEXT NOT NULL,
          first_name TEXT NOT NULL,
          last_name TEXT NOT NULL,
          role TEXT DEFAULT 'reader' CHECK(role IN ('admin', 'reader')),
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);

      // Categories table
      db.run(`
        CREATE TABLE IF NOT EXISTS categories (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT UNIQUE NOT NULL,
          slug TEXT UNIQUE NOT NULL,
          description TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);

      // Tags table
      db.run(`
        CREATE TABLE IF NOT EXISTS tags (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT UNIQUE NOT NULL,
          slug TEXT UNIQUE NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);

      // Blog posts table
      db.run(`
        CREATE TABLE IF NOT EXISTS blog_posts (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT NOT NULL,
          slug TEXT UNIQUE NOT NULL,
          excerpt TEXT NOT NULL,
          content TEXT NOT NULL,
          author_id INTEGER NOT NULL,
          category_id INTEGER NOT NULL,
          published_date DATETIME DEFAULT CURRENT_TIMESTAMP,
          read_time TEXT DEFAULT '5 min',
          image_url TEXT,
          views INTEGER DEFAULT 0,
          likes INTEGER DEFAULT 0,
          featured BOOLEAN DEFAULT 0,
          status TEXT DEFAULT 'published' CHECK(status IN ('draft', 'published', 'archived')),
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (author_id) REFERENCES users (id),
          FOREIGN KEY (category_id) REFERENCES categories (id)
        )
      `);

      // Post tags junction table
      db.run(`
        CREATE TABLE IF NOT EXISTS post_tags (
          post_id INTEGER,
          tag_id INTEGER,
          PRIMARY KEY (post_id, tag_id),
          FOREIGN KEY (post_id) REFERENCES blog_posts (id) ON DELETE CASCADE,
          FOREIGN KEY (tag_id) REFERENCES tags (id) ON DELETE CASCADE
        )
      `);

      // Events table
      db.run(`
        CREATE TABLE IF NOT EXISTS events (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT NOT NULL,
          slug TEXT UNIQUE NOT NULL,
          description TEXT NOT NULL,
          date DATE NOT NULL,
          start_time TIME NOT NULL,
          end_time TIME NOT NULL,
          location TEXT NOT NULL,
          category TEXT NOT NULL,
          event_type TEXT DEFAULT 'presencial' CHECK(event_type IN ('presencial', 'online', 'hibrido')),
          capacity INTEGER NOT NULL,
          registered INTEGER DEFAULT 0,
          organizer TEXT NOT NULL,
          speakers TEXT, -- JSON string of speakers array
          image_url TEXT,
          status TEXT DEFAULT 'upcoming' CHECK(status IN ('upcoming', 'ongoing', 'completed', 'cancelled')),
          featured BOOLEAN DEFAULT 0,
          registration_required BOOLEAN DEFAULT 1,
          price TEXT DEFAULT 'Gratuito',
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);

      // Event tags junction table
      db.run(`
        CREATE TABLE IF NOT EXISTS event_tags (
          event_id INTEGER,
          tag_id INTEGER,
          PRIMARY KEY (event_id, tag_id),
          FOREIGN KEY (event_id) REFERENCES events (id) ON DELETE CASCADE,
          FOREIGN KEY (tag_id) REFERENCES tags (id) ON DELETE CASCADE
        )
      `);

      // User sessions table for JWT token management
      db.run(
        `
        CREATE TABLE IF NOT EXISTS user_sessions (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id INTEGER NOT NULL,
          token TEXT NOT NULL,
          expires_at DATETIME NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
        )
      `,
        (err) => {
          if (err) {
            console.error("Error creating tables:", err.message);
            reject(err);
          } else {
            console.log("Database tables created successfully.");
            seedInitialData()
              .then(() => {
                resolve();
              })
              .catch(reject);
          }
        },
      );
    });
  });
};

// Seed initial data
const seedInitialData = async () => {
  return new Promise<void>((resolve, reject) => {
    db.serialize(async () => {
      try {
        // Check if admin user exists
        db.get(
          "SELECT id FROM users WHERE role = ?",
          ["admin"],
          async (err, row) => {
            if (err) {
              console.error("Error checking admin user:", err.message);
              reject(err);
              return;
            }

            if (!row) {
              // Create default admin user
              const hashedPassword = await bcrypt.hash("admin123", 12);
              db.run(
                `
              INSERT INTO users (email, password, first_name, last_name, role)
              VALUES (?, ?, ?, ?, ?)
            `,
                [
                  "admin@neabi.edu.br",
                  hashedPassword,
                  "Administrador",
                  "NEABI",
                  "admin",
                ],
                (err) => {
                  if (err) {
                    console.error("Error creating admin user:", err.message);
                  } else {
                    console.log(
                      "Default admin user created: admin@neabi.edu.br / admin123",
                    );
                  }
                },
              );

              // Create default reader user
              const readerPassword = await bcrypt.hash("leitor123", 12);
              db.run(
                `
              INSERT INTO users (email, password, first_name, last_name, role)
              VALUES (?, ?, ?, ?, ?)
            `,
                [
                  "leitor@neabi.edu.br",
                  readerPassword,
                  "Usuário",
                  "Leitor",
                  "reader",
                ],
                (err) => {
                  if (err) {
                    console.error("Error creating reader user:", err.message);
                  } else {
                    console.log(
                      "Default reader user created: leitor@neabi.edu.br / leitor123",
                    );
                  }
                },
              );
            }

            // Seed categories
            const categories = [
              {
                name: "Educação",
                slug: "educacao",
                description: "Artigos sobre educação e diversidade",
              },
              {
                name: "Cultura",
                slug: "cultura",
                description: "Cultura afro-brasileira e indígena",
              },
              {
                name: "Ciência",
                slug: "ciencia",
                description: "Pesquisas e descobertas científicas",
              },
              {
                name: "Literatura",
                slug: "literatura",
                description: "Literatura afrodiaspórica",
              },
              {
                name: "Política",
                slug: "politica",
                description: "Políticas públicas e ações afirmativas",
              },
              {
                name: "Religião",
                slug: "religiao",
                description: "Religiões de matriz africana",
              },
              {
                name: "Arte",
                slug: "arte",
                description: "Arte e expressões culturais",
              },
              {
                name: "Sociedade",
                slug: "sociedade",
                description: "Questões sociais e inclusão",
              },
            ];

            categories.forEach((category) => {
              db.run(
                `
              INSERT OR IGNORE INTO categories (name, slug, description)
              VALUES (?, ?, ?)
            `,
                [category.name, category.slug, category.description],
              );
            });

            // Seed tags
            const tags = [
              "representatividade",
              "quilombos",
              "povos indígenas",
              "literatura",
              "políticas afirmativas",
              "mulheres negras",
              "resistência",
              "cultura afro-brasileira",
              "conhecimento tradicional",
              "sustentabilidade",
              "diáspora africana",
              "identidade",
              "universidade",
              "inclusão",
              "religião",
              "candomblé",
              "umbanda",
              "ciência",
              "protagonismo feminino",
              "ancestralidade",
              "expressão cultural",
              "juventude negra",
              "mercado de trabalho",
              "oportunidades",
              "antirracismo",
              "metodologia",
            ];

            tags.forEach((tagName) => {
              const slug = tagName.toLowerCase().replace(/\s+/g, "-");
              db.run(
                `
              INSERT OR IGNORE INTO tags (name, slug)
              VALUES (?, ?)
            `,
                [tagName, slug],
              );
            });

            console.log("Initial data seeded successfully.");
            resolve();
          },
        );
      } catch (error) {
        console.error("Error seeding data:", error);
        reject(error);
      }
    });
  });
};

// Graceful shutdown
process.on("SIGINT", () => {
  db.close((err) => {
    if (err) {
      console.error("Error closing database:", err.message);
    } else {
      console.log("Database connection closed.");
    }
    process.exit(0);
  });
});

export default db;
