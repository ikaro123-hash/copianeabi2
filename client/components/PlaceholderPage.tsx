import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Construction } from "lucide-react";
import Navigation from "@/components/Navigation";

interface PlaceholderPageProps {
  title: string;
  description: string;
  comingSoon?: boolean;
}

export default function PlaceholderPage({
  title,
  description,
  comingSoon = true,
}: PlaceholderPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <Navigation />

      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Card className="text-center">
            <CardHeader className="pb-8">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-amber-100 to-red-100 rounded-full flex items-center justify-center">
                  <Construction className="h-10 w-10 text-amber-600" />
                </div>
              </div>
              <CardTitle className="text-3xl font-bold text-gray-900 mb-4">
                {title}
              </CardTitle>
              <CardDescription className="text-lg text-gray-600 max-w-2xl mx-auto">
                {description}
              </CardDescription>
            </CardHeader>

            <CardContent className="pb-8">
              {comingSoon && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-6">
                  <h3 className="text-lg font-semibold text-amber-800 mb-2">
                    🚧 Página em Construção
                  </h3>
                  <p className="text-amber-700">
                    Esta seção está sendo desenvolvida e será disponibilizada em
                    breve. Continue acompanhando nossas atualizações!
                  </p>
                </div>
              )}

              <div className="space-y-4">
                <p className="text-gray-600">
                  Enquanto isso, você pode explorar outras seções do nosso site:
                </p>

                <div className="flex flex-wrap gap-3 justify-center">
                  <Button variant="outline" asChild>
                    <a href="/">Página Inicial</a>
                  </Button>
                  <Button variant="outline" asChild>
                    <a href="/blog">Blog NEABI</a>
                  </Button>
                  <Button variant="outline" asChild>
                    <a href="/projetos">Projetos e Ações</a>
                  </Button>
                  <Button
                    className="bg-gradient-to-r from-amber-600 to-red-700 hover:from-amber-700 hover:to-red-800"
                    asChild
                  >
                    <a href="/contato">Entre em Contato</a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
