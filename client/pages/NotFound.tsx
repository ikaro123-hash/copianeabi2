import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Home, ArrowLeft } from "lucide-react";
import Navigation from "@/components/Navigation";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <Navigation />

      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <Card className="text-center">
            <CardHeader className="pb-8">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-amber-100 to-red-100 rounded-full flex items-center justify-center">
                  <span className="text-4xl font-bold text-amber-600">404</span>
                </div>
              </div>
              <CardTitle className="text-3xl font-bold text-gray-900 mb-4">
                Página não encontrada
              </CardTitle>
              <CardDescription className="text-lg text-gray-600">
                A página que você está procurando não existe ou foi movida.
              </CardDescription>
            </CardHeader>

            <CardContent className="pb-8">
              <div className="space-y-4">
                <p className="text-gray-600">
                  Você pode navegar para uma de nossas seções principais:
                </p>

                <div className="flex flex-wrap gap-3 justify-center">
                  <Button asChild>
                    <Link to="/" className="flex items-center gap-2">
                      <Home className="h-4 w-4" />
                      Página Inicial
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/projetos">Projetos e Ações</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/blog">Blog</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/sobre">Sobre</Link>
                  </Button>
                </div>

                <div className="pt-4">
                  <Button variant="ghost" onClick={() => window.history.back()}>
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Voltar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
