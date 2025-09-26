import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navigationItems = [
    { name: "Home", path: "/" },
    {
      name: "Projetos e Ações",
      path: "/projetos",
      subItems: [
        {
          name: "Semana da Consciência Negra",
          path: "/projetos/semana-consciencia-negra",
        },
        { name: "Eventos", path: "/projetos/eventos" },
      ],
    },
    { name: "Blog", path: "/blog" },
    { name: "Sobre", path: "/sobre" },
    { name: "Contato", path: "/contato" },
  ];

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-red-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">N</span>
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-bold text-gray-900">NEABI</span>
              <p className="text-xs text-gray-600 -mt-1">
                Núcleo de Estudos Afro-Brasileiros
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <div key={item.name}>
                {item.subItems ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className={`text-gray-700 hover:text-amber-600 flex items-center space-x-1 ${
                          item.subItems.some((sub) => isActive(sub.path))
                            ? "text-amber-600"
                            : ""
                        }`}
                      >
                        <span>{item.name}</span>
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-56">
                      {item.subItems.map((subItem) => (
                        <DropdownMenuItem key={subItem.name} asChild>
                          <Link
                            to={subItem.path}
                            className={`w-full ${isActive(subItem.path) ? "bg-amber-50 text-amber-600" : ""}`}
                          >
                            {subItem.name}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link
                    to={item.path}
                    className={`text-gray-700 hover:text-amber-600 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive(item.path) ? "text-amber-600 bg-amber-50" : ""
                    }`}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}

            <Button className="bg-gradient-to-r from-amber-600 to-red-700 hover:from-amber-700 hover:to-red-800 text-white">
              ENTRAR
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 space-y-2">
            {navigationItems.map((item) => (
              <div key={item.name}>
                {item.subItems ? (
                  <div>
                    <div className="text-gray-700 font-medium px-3 py-2 border-b border-gray-100">
                      {item.name}
                    </div>
                    {item.subItems.map((subItem) => (
                      <Link
                        key={subItem.name}
                        to={subItem.path}
                        className={`block px-6 py-2 text-sm text-gray-600 hover:text-amber-600 hover:bg-amber-50 ${
                          isActive(subItem.path)
                            ? "text-amber-600 bg-amber-50"
                            : ""
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Link
                    to={item.path}
                    className={`block px-3 py-2 text-gray-700 hover:text-amber-600 hover:bg-amber-50 rounded-md ${
                      isActive(item.path) ? "text-amber-600 bg-amber-50" : ""
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}

            <div className="pt-2">
              <Button className="w-full bg-gradient-to-r from-amber-600 to-red-700 hover:from-amber-700 hover:to-red-800 text-white">
                ENTRAR
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
