import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import {
  Calendar,
  Users,
  BookOpen,
  Target,
  Award,
  Lightbulb,
  Heart,
  Globe,
  ArrowRight,
  MapPin,
  Clock,
} from "lucide-react";
import Navigation from "@/components/Navigation";

export default function Projetos() {
  const featuredProjects = [
    {
      title: "Semana da Consciência Negra",
      description:
        "Evento anual que promove reflexões sobre a história e cultura afro-brasileira",
      category: "Evento Anual",
      status: "Em andamento",
      participants: "500+ pessoas",
      duration: "20-24 de Novembro",
      image: "/placeholder.svg",
      badge: "Destaque",
      link: "/projetos/semana-consciencia-negra",
    },
    {
      title: "Projeto Griôs: Memórias Ancestrais",
      description:
        "Registro e preservação da tradição oral de comunidades quilombolas",
      category: "Pesquisa",
      status: "Ativo",
      participants: "12 comunidades",
      duration: "2023-2025",
      image: "/placeholder.svg",
      badge: "Pesquisa",
      link: "#",
    },
    {
      title: "Formação Docente Antirracista",
      description:
        "Capacitação de professores para implementação da Lei 10.639/03",
      category: "Extensão",
      status: "Ativo",
      participants: "200+ professores",
      duration: "Contínuo",
      image: "/placeholder.svg",
      badge: "Formação",
      link: "#",
    },
  ];

  const researchProjects = [
    {
      title: "Mapeamento de Territórios Quilombolas",
      coordinator: "Prof. Dra. Ana Maria Santos",
      description:
        "Pesquisa sobre a situação atual das comunidades quilombolas na região",
      status: "Em andamento",
      year: "2024-2025",
      funding: "CNPq",
    },
    {
      title: "Literatura Afrodiaspórica Contemporânea",
      coordinator: "Prof. Ms. Carlos Eduardo Silva",
      description:
        "Análise da produção literária de autores afrodiaspóricos no século XXI",
      status: "Concluído",
      year: "2023",
      funding: "FAPESP",
    },
    {
      title: "Saberes Tradicionais Indígenas e Sustentabilidade",
      coordinator: "Profa. Dra. Mariana Ribeiro",
      description:
        "Estudo dos conhecimentos ancestrais indígenas aplicados à conservação ambiental",
      status: "Em andamento",
      year: "2024-2026",
      funding: "CAPES",
    },
    {
      title: "Racismo Institucional no Ensino Superior",
      coordinator: "Prof. Ms. José Antônio Lima",
      description:
        "Diagnóstico e propostas de combate ao racismo estrutural nas universidades",
      status: "Em andamento",
      year: "2024",
      funding: "Próprio",
    },
  ];

  const extensionProjects = [
    {
      title: "Cursinho Pré-Vestibular Ubuntu",
      description:
        "Preparação de jovens negros e indígenas para o ensino superior",
      beneficiaries: "150 estudantes/ano",
      location: "Campus Central",
      frequency: "Semanal",
    },
    {
      title: "Festival de Cultura Afroindígena",
      description:
        "Evento cultural anual com apresentações artísticas e gastronômicas",
      beneficiaries: "2000+ pessoas",
      location: "Praça Central",
      frequency: "Anual",
    },
    {
      title: "Oficinas de Tranças e Turbantes",
      description: "Workshops sobre cuidados com cabelos crespos e cacheados",
      beneficiaries: "50 pessoas/mês",
      location: "Sala Multicultural",
      frequency: "Mensal",
    },
    {
      title: "Roda de Conversa: Ancestralidade",
      description:
        "Diálogos sobre espiritualidade e tradições afro-brasileiras",
      beneficiaries: "30 pessoas/encontro",
      location: "Auditório NEABI",
      frequency: "Quinzenal",
    },
  ];

  const upcomingEvents = [
    {
      title: "Mesa Redonda: Mulheres Negras na Ciência",
      date: "15 de Dezembro, 2024",
      time: "14h às 17h",
      location: "Auditório Principal",
      speakers: [
        "Dra. Joice Berth",
        "Dra. Silvany Euclênio",
        "Dra. Katemari Rosa",
      ],
    },
    {
      title: "Workshop: Capoeira e Resistência",
      date: "22 de Dezembro, 2024",
      time: "9h às 12h",
      location: "Quadra Poliesportiva",
      speakers: ["Mestre João Pequeno", "Contra-Mestre Lua Rasta"],
    },
    {
      title: "Lançamento de Livro: Vozes Quilombolas",
      date: "10 de Janeiro, 2025",
      time: "19h às 21h",
      location: "Biblioteca Central",
      speakers: ["Coletivo de Autores Quilombolas"],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <Navigation />

      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-amber-100 text-amber-800">
              Projetos e Ações
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Transformando a{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-red-700">
                Educação
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Conheça os projetos de ensino, pesquisa e extensão que promovem a
              diversidade étnico-racial e o combate ao racismo no ambiente
              acadêmico e na sociedade.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Projetos em Destaque
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Iniciativas que geram impacto significativo na promoção da
              igualdade racial.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <Card
                key={index}
                className="hover:shadow-xl transition-all duration-300 group"
              >
                <div className="aspect-video bg-gradient-to-br from-amber-100 to-red-100 flex items-center justify-center relative overflow-hidden">
                  <Target className="h-16 w-16 text-amber-600 group-hover:scale-110 transition-transform" />
                  <Badge className="absolute top-4 left-4 bg-white text-amber-800">
                    {project.badge}
                  </Badge>
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="outline">{project.category}</Badge>
                    <Badge
                      variant="secondary"
                      className="text-green-700 bg-green-100"
                    >
                      {project.status}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl group-hover:text-amber-600 transition-colors">
                    {project.title}
                  </CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Users className="h-4 w-4" />
                      {project.participants}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="h-4 w-4" />
                      {project.duration}
                    </div>
                  </div>
                  <Button
                    className="w-full group-hover:bg-amber-600 transition-colors"
                    asChild
                  >
                    <Link to={project.link}>
                      Saiba mais
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Projects by Category */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Projetos por Categoria
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore nossos projetos organizados por área de atuação.
            </p>
          </div>

          <Tabs defaultValue="pesquisa" className="w-full">
            <TabsList className="grid w-full lg:w-fit mx-auto grid-cols-3 mb-8">
              <TabsTrigger value="pesquisa" className="flex items-center gap-2">
                <Lightbulb className="h-4 w-4" />
                Pesquisa
              </TabsTrigger>
              <TabsTrigger value="extensao" className="flex items-center gap-2">
                <Heart className="h-4 w-4" />
                Extensão
              </TabsTrigger>
              <TabsTrigger value="eventos" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Eventos
              </TabsTrigger>
            </TabsList>

            <TabsContent value="pesquisa">
              <div className="grid md:grid-cols-2 gap-6">
                {researchProjects.map((project, index) => (
                  <Card
                    key={index}
                    className="hover:shadow-lg transition-shadow"
                  >
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <Badge
                          variant="outline"
                          className="bg-blue-50 text-blue-700"
                        >
                          {project.funding}
                        </Badge>
                        <Badge
                          variant={
                            project.status === "Concluído"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {project.status}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg">{project.title}</CardTitle>
                      <CardDescription className="text-amber-600">
                        {project.coordinator}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4">
                        {project.description}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Calendar className="h-4 w-4" />
                        {project.year}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="extensao">
              <div className="grid md:grid-cols-2 gap-6">
                {extensionProjects.map((project, index) => (
                  <Card
                    key={index}
                    className="hover:shadow-lg transition-shadow"
                  >
                    <CardHeader>
                      <CardTitle className="text-lg">{project.title}</CardTitle>
                      <CardDescription>{project.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Users className="h-4 w-4" />
                          <span className="font-medium">
                            Beneficiários:
                          </span>{" "}
                          {project.beneficiaries}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin className="h-4 w-4" />
                          <span className="font-medium">Local:</span>{" "}
                          {project.location}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Clock className="h-4 w-4" />
                          <span className="font-medium">Frequência:</span>{" "}
                          {project.frequency}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="eventos">
              <div className="grid lg:grid-cols-3 gap-6">
                {upcomingEvents.map((event, index) => (
                  <Card
                    key={index}
                    className="hover:shadow-lg transition-shadow"
                  >
                    <CardHeader>
                      <Badge className="w-fit mb-2 bg-amber-100 text-amber-800">
                        Próximo Evento
                      </Badge>
                      <CardTitle className="text-lg">{event.title}</CardTitle>
                      <CardDescription className="text-amber-600 font-medium">
                        {event.date}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Clock className="h-4 w-4" />
                          {event.time}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin className="h-4 w-4" />
                          {event.location}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-2">
                          Palestrantes:
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {event.speakers.map((speaker, speakerIndex) => (
                            <Badge
                              key={speakerIndex}
                              variant="secondary"
                              className="text-xs"
                            >
                              {speaker}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="text-center mt-8">
                <Button variant="outline" asChild>
                  <Link to="/projetos/eventos">Ver todos os eventos</Link>
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-amber-600 to-red-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <Globe className="h-12 w-12 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-6">Faça Parte da Mudança</h2>
          <p className="text-xl leading-relaxed opacity-95 mb-8">
            Participe dos nossos projetos e contribua para a construção de uma
            sociedade mais justa e igualitária. Sua participação é fundamental
            para o sucesso de nossas ações.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/contato">Quero Participar</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-amber-600"
              asChild
            >
              <Link to="/sobre">Conheça o NEABI</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
