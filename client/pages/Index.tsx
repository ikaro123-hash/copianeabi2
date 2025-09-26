import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import {
  Calendar,
  Users,
  BookOpen,
  Heart,
  ArrowRight,
  MapPin,
} from "lucide-react";
import Navigation from "@/components/Navigation";

export default function Index() {
  const featuredEvents = [
    {
      title: "Semana da Consciência Negra 2024",
      date: "20-24 de Novembro",
      description:
        "Uma semana dedicada à reflexão e celebração da cultura afro-brasileira",
      image: "/placeholder.svg",
      badge: "Destaque",
    },
    {
      title: "Roda de Conversa: Literatura Afrodiaspórica",
      date: "15 de Dezembro",
      description:
        "Discussão sobre autores contemporâneos da literatura afrodiaspórica",
      image: "/placeholder.svg",
      badge: "Próximo",
    },
  ];

  const recentPosts = [
    {
      title: "A Importância da Representatividade na Educação",
      excerpt:
        "Reflexões sobre como a diversidade étnico-racial impacta positivamente o ambiente acadêmico...",
      date: "10 de Novembro, 2024",
      author: "Equipe NEABI",
      readTime: "5 min",
    },
    {
      title: "Quilombos Contemporâneos: Resistência e Cultura",
      excerpt:
        "Uma análise sobre as comunidades quilombolas atuais e sua importância para a preservação cultural...",
      date: "5 de Novembro, 2024",
      author: "Prof. Maria Santos",
      readTime: "8 min",
    },
    {
      title: "Povos Indígenas: Saberes Ancestrais e Modernidade",
      excerpt:
        "Como os conhecimentos tradicionais indígenas contribuem para a ciência contemporânea...",
      date: "1 de Novembro, 2024",
      author: "Dr. Carlos Ribeiro",
      readTime: "6 min",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-red-700">
                NEABI
              </span>
            </h1>
            <h2 className="text-xl md:text-2xl font-semibold text-gray-700 mb-4">
              Núcleo de Estudos Afro-Brasileiros e Indígenas
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              Promovendo a diversidade, a inclusão e o reconhecimento das
              contribuições dos povos afro-brasileiros e indígenas para a
              sociedade brasileira através da educação, pesquisa e extensão.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-amber-600 to-red-700 hover:from-amber-700 hover:to-red-800"
              >
                <Link to="/sobre" className="flex items-center gap-2">
                  Conheça nosso trabalho
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-amber-600 text-amber-600 hover:bg-amber-50"
              >
                <Link to="/projetos" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Participe dos projetos
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Próximos Eventos
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Participe de nossas atividades e contribua para a construção de
              uma sociedade mais justa e inclusiva.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {featuredEvents.map((event, index) => (
              <Card
                key={index}
                className="overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="aspect-video bg-gradient-to-br from-amber-100 to-red-100 flex items-center justify-center">
                  <Calendar className="h-16 w-16 text-amber-600" />
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge className="bg-amber-100 text-amber-800">
                      {event.badge}
                    </Badge>
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="h-4 w-4 mr-1" />
                      Campus Central
                    </div>
                  </div>
                  <CardTitle className="text-xl">{event.title}</CardTitle>
                  <CardDescription className="flex items-center gap-2 text-amber-600 font-medium">
                    <Calendar className="h-4 w-4" />
                    {event.date}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{event.description}</p>
                  <Button variant="outline" className="w-full">
                    Saiba mais
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button variant="outline" asChild>
              <Link to="/projetos/eventos">Ver todos os eventos</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Recent Blog Posts */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Blog NEABI
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Reflexões, pesquisas e discussões sobre questões étnico-raciais e
              diversidade cultural.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {recentPosts.map((post, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Badge variant="secondary" className="w-fit mb-2">
                    {post.readTime} de leitura
                  </Badge>
                  <CardTitle className="text-lg leading-tight">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-500">
                    Por {post.author} • {post.date}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <Button
                    variant="ghost"
                    className="p-0 h-auto text-amber-600 hover:text-amber-700"
                  >
                    Ler mais →
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button asChild>
              <Link to="/blog" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Ver todos os posts
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-amber-600 to-red-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <Heart className="h-12 w-12 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-6">Nossa Missão</h2>
          <p className="text-xl leading-relaxed opacity-95">
            Contribuir para a formação de uma sociedade mais justa e
            igualitária, promovendo o respeito à diversidade étnico-racial e
            cultural, combatendo o preconceito e a discriminação, e valorizando
            as contribuições dos povos afro-brasileiros e indígenas para a
            construção da identidade nacional.
          </p>
        </div>
      </section>

      {/* Footer */}
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
              <p className="text-gray-400 text-sm">
                Núcleo de Estudos Afro-Brasileiros e Indígenas
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Navegação</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link to="/" className="hover:text-white">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/sobre" className="hover:text-white">
                    Sobre
                  </Link>
                </li>
                <li>
                  <Link to="/projetos" className="hover:text-white">
                    Projetos
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className="hover:text-white">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Projetos</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link
                    to="/projetos/semana-consciencia-negra"
                    className="hover:text-white"
                  >
                    Semana da Consciência Negra
                  </Link>
                </li>
                <li>
                  <Link to="/projetos/eventos" className="hover:text-white">
                    Eventos
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Contato</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>email@neabi.edu.br</li>
                <li>(11) 1234-5678</li>
                <li>
                  <Link to="/contato" className="hover:text-white">
                    Fale conosco
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>
              &copy; 2024 NEABI - Núcleo de Estudos Afro-Brasileiros e
              Indígenas. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
