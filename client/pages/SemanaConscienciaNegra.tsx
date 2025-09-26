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
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  Star,
  Download,
  Share2,
  Camera,
  Music,
  BookOpen,
  Award,
  Heart,
  Mic,
} from "lucide-react";
import Navigation from "@/components/Navigation";

export default function SemanaConscienciaNegra() {
  const eventSchedule = [
    {
      day: "Segunda-feira - 20/11",
      date: "2024-11-20",
      events: [
        {
          time: "08:00 - 09:00",
          title: "Credenciamento e Café de Abertura",
          location: "Hall Principal",
          type: "Recepção",
          speaker: "",
          description: "Recepção dos participantes com café da manhã temático.",
        },
        {
          time: "09:00 - 10:30",
          title:
            "Cerimônia de Abertura: 'Zumbi dos Palmares - Símbolo de Resistência'",
          location: "Auditório Principal",
          type: "Palestra Magna",
          speaker: "Prof. Dr. Kabengele Munanga",
          description:
            "Reflexões sobre o legado de Zumbi dos Palmares e a importância da consciência negra.",
        },
        {
          time: "10:30 - 11:00",
          title: "Intervalo Cultural - Capoeira Angola",
          location: "Pátio Central",
          type: "Apresentação",
          speaker: "Grupo Senzala",
          description:
            "Demonstração de capoeira angola com participação do público.",
        },
        {
          time: "11:00 - 12:30",
          title: "Mesa Redonda: 'Mulheres Negras na Ciência e Tecnologia'",
          location: "Auditório Secundário",
          type: "Debate",
          speaker:
            "Dra. Katemari Rosa, Dra. Joice Berth, Dra. Silvany Euclênio",
          description:
            "Discussão sobre a presença e contribuições das mulheres negras na ciência.",
        },
      ],
    },
    {
      day: "Terça-feira - 21/11",
      date: "2024-11-21",
      events: [
        {
          time: "09:00 - 10:30",
          title: "Palestra: 'Literatura Afrodiaspórica no Século XXI'",
          location: "Auditório Principal",
          type: "Palestra",
          speaker: "Prof. Dra. Conceição Evaristo",
          description:
            "Análise da produção literária contemporânea de autores afrodiaspóricos.",
        },
        {
          time: "10:30 - 11:00",
          title: "Sarau Literário - Poesia da Resistência",
          location: "Biblioteca Central",
          type: "Cultural",
          speaker: "Coletivo Poesia Preta",
          description:
            "Declamação de poesias que retratam a luta e resistência negra.",
        },
        {
          time: "14:00 - 15:30",
          title: "Workshop: 'Técnicas de Tranças e Turbantes'",
          location: "Sala Multicultural",
          type: "Oficina",
          speaker: "Coletivo Beleza Negra",
          description:
            "Aprenda técnicas tradicionais de cuidado e estilização do cabelo crespo.",
        },
        {
          time: "15:30 - 17:00",
          title:
            "Documentário: 'Quilombos Urbanos - Resistência nas Metrópoles'",
          location: "Cinema da Universidade",
          type: "Exibição",
          speaker: "Diretor: João Silva",
          description:
            "Exibição seguida de debate sobre comunidades quilombolas urbanas.",
        },
      ],
    },
    {
      day: "Quarta-feira - 22/11",
      date: "2024-11-22",
      events: [
        {
          time: "09:00 - 10:30",
          title:
            "Conferência: 'Religiões de Matriz Africana e Intolerância Religiosa'",
          location: "Auditório Principal",
          type: "Conferência",
          speaker: "Babalorixá Sidnei Nogueira",
          description:
            "Discussão sobre a importância das religiões afro-brasileiras e o combate à intolerância.",
        },
        {
          time: "10:30 - 12:00",
          title: "Feira de Economia Criativa Afrocentrada",
          location: "Praça Central",
          type: "Feira",
          speaker: "Empreendedores Locais",
          description:
            "Exposição e venda de produtos de empreendedores negros locais.",
        },
        {
          time: "14:00 - 15:30",
          title: "Roda de Conversa: 'Juventude Negra e Mercado de Trabalho'",
          location: "Sala de Reuniões",
          type: "Debate",
          speaker: "Coletivo Juventude Negra Ativa",
          description:
            "Discussão sobre desafios e oportunidades para jovens negros no mercado de trabalho.",
        },
        {
          time: "19:00 - 21:00",
          title: "Noite Cultural - Show com Banda de Samba-Rock",
          location: "Ginásio Poliesportivo",
          type: "Show",
          speaker: "Banda Samba da Resistência",
          description:
            "Apresentação musical celebrando a cultura afro-brasileira.",
        },
      ],
    },
    {
      day: "Quinta-feira - 23/11",
      date: "2024-11-23",
      events: [
        {
          time: "09:00 - 10:30",
          title: "Seminário: 'Políticas Públicas e População Negra'",
          location: "Auditório Principal",
          type: "Seminário",
          speaker: "Dep. Benedita da Silva, Prof. Dr. Silvio Almeida",
          description:
            "Análise das políticas públicas voltadas para a população negra no Brasil.",
        },
        {
          time: "10:30 - 12:00",
          title: "Exposição: 'Arte Afro-Brasileira Contemporânea'",
          location: "Galeria de Arte",
          type: "Exposição",
          speaker: "Curadoria: Prof. Emanoel Araujo",
          description:
            "Mostra de obras de artistas afro-brasileiros contemporâneos.",
        },
        {
          time: "14:00 - 15:30",
          title: "Mesa Redonda: 'Educação Antirracista na Prática'",
          location: "Auditório Secundário",
          type: "Debate",
          speaker: "Professores da Rede Pública e Privada",
          description:
            "Relatos de experiências práticas na implementação da educação antirracista.",
        },
        {
          time: "15:30 - 17:00",
          title: "Workshop: 'Danças Afro-Brasileiras'",
          location: "Sala de Dança",
          type: "Oficina",
          speaker: "Grupo Ginga Brasileira",
          description:
            "Aprenda os movimentos e significados das danças tradicionais afro-brasileiras.",
        },
      ],
    },
    {
      day: "Sexta-feira - 24/11",
      date: "2024-11-24",
      events: [
        {
          time: "09:00 - 10:30",
          title: "Palestra de Encerramento: 'O Futuro da Luta Antirracista'",
          location: "Auditório Principal",
          type: "Palestra",
          speaker: "Prof. Dr. Sueli Carneiro",
          description:
            "Reflexões sobre os próximos passos na luta contra o racismo no Brasil.",
        },
        {
          time: "10:30 - 11:00",
          title: "Apresentação dos Trabalhos Acadêmicos",
          location: "Salas de Aula",
          type: "Apresentação",
          speaker: "Estudantes e Pesquisadores",
          description:
            "Apresentação de pesquisas desenvolvidas sobre temáticas afro-brasileiras.",
        },
        {
          time: "11:00 - 12:00",
          title: "Cerimônia de Encerramento e Avaliação",
          location: "Auditório Principal",
          type: "Encerramento",
          speaker: "Coordenação do NEABI",
          description: "Balanço da semana e planejamento de ações futuras.",
        },
        {
          time: "19:00 - 22:00",
          title: "Festa de Confraternização - Feijoada Cultural",
          location: "Restaurante Universitário",
          type: "Confraternização",
          speaker: "Toda a Comunidade",
          description:
            "Encerramento festivo com feijoada e apresentações culturais.",
        },
      ],
    },
  ];

  const speakers = [
    {
      name: "Prof. Dr. Kabengele Munanga",
      title: "Antropólogo e Professor Emérito USP",
      bio: "Referência mundial em estudos africanos e relações raciais no Brasil",
      image: "/placeholder.svg",
      topics: ["Relações Raciais", "Identidade Negra", "África"],
    },
    {
      name: "Prof. Dra. Conceição Evaristo",
      title: "Escritora e Doutora em Literatura",
      bio: "Uma das mais importantes vozes da literatura afro-brasileira contemporânea",
      image: "/placeholder.svg",
      topics: ["Literatura", "Escrevivência", "Mulher Negra"],
    },
    {
      name: "Prof. Dr. Sueli Carneiro",
      title: "Filósofa e Ativista",
      bio: "Fundadora do Geledés e pioneira no movimento de mulheres negras no Brasil",
      image: "/placeholder.svg",
      topics: ["Feminismo Negro", "Direitos Humanos", "Filosofia"],
    },
    {
      name: "Dra. Katemari Rosa",
      title: "Física e Pesquisadora",
      bio: "Primeira mulher negra a obter doutorado em Física no Brasil",
      image: "/placeholder.svg",
      topics: ["Física", "Educação Científica", "Representatividade"],
    },
  ];

  const activities = [
    {
      category: "Palestras e Conferências",
      icon: <Mic className="h-6 w-6" />,
      count: 8,
      description:
        "Apresentações de especialistas renomados sobre temas relevantes",
    },
    {
      category: "Workshops e Oficinas",
      icon: <Users className="h-6 w-6" />,
      count: 6,
      description: "Atividades práticas e interativas para toda a comunidade",
    },
    {
      category: "Apresentações Culturais",
      icon: <Music className="h-6 w-6" />,
      count: 10,
      description: "Shows, danças e manifestações artísticas afro-brasileiras",
    },
    {
      category: "Exposições e Mostras",
      icon: <Camera className="h-6 w-6" />,
      count: 4,
      description: "Exibições de arte, fotografia e documentários temáticos",
    },
  ];

  const formatTime = (time: string) => {
    return time;
  };

  const getEventTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      Palestra: "bg-blue-100 text-blue-800",
      "Palestra Magna": "bg-purple-100 text-purple-800",
      Debate: "bg-green-100 text-green-800",
      Oficina: "bg-orange-100 text-orange-800",
      Cultural: "bg-pink-100 text-pink-800",
      Show: "bg-red-100 text-red-800",
      Exposição: "bg-indigo-100 text-indigo-800",
      Recepção: "bg-gray-100 text-gray-800",
      Apresentação: "bg-yellow-100 text-yellow-800",
      Exibição: "bg-teal-100 text-teal-800",
      Conferência: "bg-violet-100 text-violet-800",
      Feira: "bg-emerald-100 text-emerald-800",
      Seminário: "bg-cyan-100 text-cyan-800",
      Encerramento: "bg-slate-100 text-slate-800",
      Confraternização: "bg-rose-100 text-rose-800",
    };
    return colors[type] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <Navigation />

      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-amber-600 text-white">
              20 a 24 de Novembro de 2024
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Semana da{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-red-500">
                Consciência Negra
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
              Uma semana dedicada à reflexão, celebração e fortalecimento da
              cultura afro-brasileira, promovendo o debate sobre questões
              étnico-raciais e a valorização da diversidade.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-amber-600 hover:bg-amber-700">
                <Calendar className="h-4 w-4 mr-2" />
                Ver Programação Completa
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-black"
              >
                <Download className="h-4 w-4 mr-2" />
                Baixar PDF
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Event Overview */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-8">
            {activities.map((activity, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-amber-600 to-red-700 rounded-lg flex items-center justify-center text-white">
                      {activity.icon}
                    </div>
                  </div>
                  <CardTitle className="text-lg">{activity.category}</CardTitle>
                  <CardDescription>
                    <span className="text-2xl font-bold text-amber-600">
                      {activity.count}
                    </span>{" "}
                    atividades
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">
                    {activity.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Speakers */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Palestrantes Confirmados
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Personalidades de destaque que contribuem para a reflexão sobre a
              consciência negra no Brasil.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {speakers.map((speaker, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <div className="w-20 h-20 bg-gradient-to-br from-amber-100 to-red-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Star className="h-8 w-8 text-amber-600" />
                  </div>
                  <CardTitle className="text-lg">{speaker.name}</CardTitle>
                  <CardDescription className="text-amber-600 font-medium">
                    {speaker.title}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm mb-4">{speaker.bio}</p>
                  <div className="flex flex-wrap gap-1 justify-center">
                    {speaker.topics.map((topic, topicIndex) => (
                      <Badge
                        key={topicIndex}
                        variant="secondary"
                        className="text-xs"
                      >
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Event Schedule */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Programação Completa
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Confira toda a programação da Semana da Consciência Negra 2024
              organizada por dia.
            </p>
          </div>

          <Tabs defaultValue="2024-11-20" className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-8 bg-gray-100">
              {eventSchedule.map((day) => (
                <TabsTrigger
                  key={day.date}
                  value={day.date}
                  className="text-xs sm:text-sm"
                >
                  {day.day.split(" - ")[0]}
                </TabsTrigger>
              ))}
            </TabsList>

            {eventSchedule.map((day) => (
              <TabsContent key={day.date} value={day.date}>
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    {day.day}
                  </h3>
                  {day.events.map((event, eventIndex) => (
                    <Card
                      key={eventIndex}
                      className="hover:shadow-md transition-shadow"
                    >
                      <CardHeader>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <Badge className={getEventTypeColor(event.type)}>
                                {event.type}
                              </Badge>
                              <div className="flex items-center gap-1 text-sm text-gray-600">
                                <Clock className="h-4 w-4" />
                                {formatTime(event.time)}
                              </div>
                              <div className="flex items-center gap-1 text-sm text-gray-600">
                                <MapPin className="h-4 w-4" />
                                {event.location}
                              </div>
                            </div>
                            <CardTitle className="text-lg">
                              {event.title}
                            </CardTitle>
                            {event.speaker && (
                              <CardDescription className="text-amber-600 font-medium">
                                {event.speaker}
                              </CardDescription>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Share2 className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Heart className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600">{event.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-amber-600 to-red-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <Users className="h-12 w-12 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-6">
            Participe da Semana da Consciência Negra
          </h2>
          <p className="text-xl leading-relaxed opacity-95 mb-8">
            Todas as atividades são gratuitas e abertas ao público. Venha fazer
            parte desta importante reflexão sobre a diversidade e o combate ao
            racismo em nossa sociedade.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              <Calendar className="h-4 w-4 mr-2" />
              Inscrever-se
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-amber-600"
            >
              <MapPin className="h-4 w-4 mr-2" />
              Como Chegar
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
