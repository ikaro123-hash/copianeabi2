import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Users,
  BookOpen,
  Target,
  Heart,
  Scale,
  Lightbulb,
  GraduationCap,
  Calendar,
  Award,
} from "lucide-react";
import Navigation from "@/components/Navigation";

export default function Sobre() {
  const objectives = [
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: "Ensino",
      description:
        "Implementar a transversalidade dos temas sobre relações étnico-raciais nos cursos da instituição",
    },
    {
      icon: <Lightbulb className="h-6 w-6" />,
      title: "Pesquisa",
      description:
        "Promover e incentivar pesquisas sobre História Africana, Cultura Afro-Brasileira e Indígena",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Extensão",
      description:
        "Desenvolver ações extensionistas e eventos culturais que valorizam a diversidade étnico-racial",
    },
    {
      icon: <Scale className="h-6 w-6" />,
      title: "Combate ao Racismo",
      description:
        "Zelar pelo cumprimento da legislação antirracista e promover ações inclusivas",
    },
  ];

  const team = [
    {
      name: "Prof. Dr. Ana Maria Santos",
      role: "Coordenadora Geral",
      area: "Doutora em História da África",
      image: "/placeholder.svg",
    },
    {
      name: "Prof. Ms. Carlos Eduardo Silva",
      role: "Vice-Coordenador",
      area: "Mestre em Antropologia Social",
      image: "/placeholder.svg",
    },
    {
      name: "Profa. Dra. Mariana Ribeiro",
      role: "Coordenadora de Pesquisa",
      area: "Doutora em Estudos Étnicos e Africanos",
      image: "/placeholder.svg",
    },
    {
      name: "Prof. Ms. José Antônio Lima",
      role: "Coordenador de Extensão",
      area: "Mestre em Cultura e Identidades Brasileiras",
      image: "/placeholder.svg",
    },
  ];

  const achievements = [
    "Implementação da Lei 10.639/03 em 100% dos cursos",
    "Mais de 50 eventos realizados desde 2021",
    "15 projetos de pesquisa em andamento",
    "Parcerias com 12 comunidades quilombolas",
    "3 prêmios de reconhecimento acadêmico",
    "Mais de 2000 pessoas impactadas diretamente",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <Navigation />

      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-amber-100 text-amber-800">
              Sobre o NEABI
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Núcleo de Estudos{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-red-700">
                Afro-Brasileiros e Indígenas
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Órgão propositivo e consultivo voltado para a valorização, estudo
              e disseminação de conhecimentos sobre as culturas afro-brasileiras
              e indígenas, atuando em consonância com as Leis nº 10.639/2003 e
              nº 11.645/2008.
            </p>
          </div>
        </div>
      </section>

      {/* Mission and Vision */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <Card className="border-l-4 border-l-amber-600">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <Target className="h-6 w-6 text-amber-600" />
                  Nossa Missão
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  Promover a diversidade étnico-racial e combater desigualdades
                  históricas por meio da educação, pesquisa e extensão,
                  fortalecendo a valorização das tradições, lutas e legados das
                  populações afro-brasileiras e indígenas no ambiente acadêmico
                  e na sociedade.
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-red-600">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <Heart className="h-6 w-6 text-red-600" />
                  Nossa Visão
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  Ser referência nacional na promoção da educação das relações
                  étnico-raciais, contribuindo para a construção de uma
                  sociedade mais justa, igualitária e respeitosa com a
                  diversidade cultural brasileira.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Objectives */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Nossos Objetivos
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Atuamos em quatro pilares fundamentais para promover a diversidade
              e inclusão no ambiente acadêmico.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {objectives.map((objective, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-amber-600 to-red-700 rounded-lg flex items-center justify-center text-white">
                      {objective.icon}
                    </div>
                  </div>
                  <CardTitle className="text-lg">{objective.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">
                    {objective.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Nossa Equipe
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Profissionais qualificados e comprometidos com a promoção da
              diversidade étnico-racial.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <div className="w-20 h-20 bg-gradient-to-br from-amber-100 to-red-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <GraduationCap className="h-8 w-8 text-amber-600" />
                  </div>
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <CardDescription className="text-amber-600 font-medium">
                    {member.role}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">{member.area}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Legal Framework */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Fundamentação Legal
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Nosso trabalho está fundamentado na legislação brasileira que
              promove a diversidade étnico-racial.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Scale className="h-5 w-5 text-amber-600" />
                  Lei nº 10.639/2003
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Altera a Lei de Diretrizes e Bases da Educação Nacional para
                  incluir no currículo oficial da Rede de Ensino a
                  obrigatoriedade da temática "História e Cultura
                  Afro-Brasileira".
                </p>
                <Badge variant="secondary">História Afro-Brasileira</Badge>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Scale className="h-5 w-5 text-red-600" />
                  Lei nº 11.645/2008
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Estabelece as diretrizes e bases da educação nacional para
                  incluir no currículo oficial da Rede de Ensino a
                  obrigatoriedade da temática "História e Cultura Indígena".
                </p>
                <Badge variant="secondary">Cultura Indígena</Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Conquistas e Resultados
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Nosso compromisso com a diversidade tem gerado resultados
              concretos na comunidade acadêmica.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <Card
                key={index}
                className="border-l-4 border-l-gradient-to-b border-l-amber-600"
              >
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <Award className="h-5 w-5 text-amber-600 mt-1 flex-shrink-0" />
                    <p className="text-gray-700">{achievement}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-amber-600 to-red-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <Calendar className="h-12 w-12 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-6">Participe do NEABI</h2>
          <p className="text-xl leading-relaxed opacity-95 mb-8">
            Junte-se a nós na construção de uma sociedade mais justa e
            igualitária. Conheça nossos projetos e descubra como você pode
            contribuir.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/projetos">Ver Projetos</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-amber-600"
              asChild
            >
              <Link to="/contato">Fale Conosco</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
