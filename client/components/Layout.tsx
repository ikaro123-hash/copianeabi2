import { ReactNode } from "react";
import Navigation from "./Navigation";

interface LayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
  className?: string;
}

// This Layout component structure is easily adaptable to Django templates
// In Django, this would become a base.html template with {% block content %}
export default function Layout({
  children,
  title = "NEABI - Núcleo de Estudos Afro-Brasileiros e Indígenas",
  description = "Promovendo diversidade e inclusão através da educação, pesquisa e extensão",
  className = "",
}: LayoutProps) {
  return (
    <div
      className={`min-h-screen bg-gradient-to-b from-amber-50 to-white ${className}`}
    >
      {/* Navigation would be {% include 'includes/navigation.html' %} in Django */}
      <Navigation />

      {/* Main content area - equivalent to {% block content %} in Django templates */}
      <main>{children}</main>

      {/* Footer would be {% include 'includes/footer.html' %} in Django */}
      <Footer />
    </div>
  );
}

// Footer component - would be a separate Django template include
function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-amber-600 to-red-700 rounded flex items-center justify-center">
                <span className="text-white font-bold">N</span>
              </div>
              <span className="text-lg font-bold">NEABI</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Núcleo de Estudos Afro-Brasileiros e Indígenas
            </p>
            <p className="text-gray-400 text-xs">
              Promovendo diversidade e inclusão no ambiente acadêmico desde
              2021.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Navegação</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="/" className="hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/sobre" className="hover:text-white transition-colors">
                  Sobre
                </a>
              </li>
              <li>
                <a
                  href="/projetos"
                  className="hover:text-white transition-colors"
                >
                  Projetos
                </a>
              </li>
              <li>
                <a href="/blog" className="hover:text-white transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="/contato"
                  className="hover:text-white transition-colors"
                >
                  Contato
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Projetos</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a
                  href="/projetos/semana-consciencia-negra"
                  className="hover:text-white transition-colors"
                >
                  Semana da Consciência Negra
                </a>
              </li>
              <li>
                <a
                  href="/projetos/eventos"
                  className="hover:text-white transition-colors"
                >
                  Eventos
                </a>
              </li>
              <li>
                <a href="/blog" className="hover:text-white transition-colors">
                  Pesquisas
                </a>
              </li>
              <li>
                <a
                  href="/projetos"
                  className="hover:text-white transition-colors"
                >
                  Extensão
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contato</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>neabi@universidade.edu.br</li>
              <li>(11) 3456-7890</li>
              <li>Campus Central - Sala 205</li>
              <li>
                <a
                  href="/contato"
                  className="hover:text-white transition-colors"
                >
                  Fale conosco
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>
            &copy; 2024 NEABI - Núcleo de Estudos Afro-Brasileiros e Indígenas.
            Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
