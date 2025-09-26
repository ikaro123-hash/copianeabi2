import { useState } from "react";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  Filter,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Bell,
  Share2,
  Download,
  Bookmark,
  Search,
} from "lucide-react";
import Navigation from "@/components/Navigation";

// Event interface - easily adaptable to Django models
interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  category: string;
  type: string;
  capacity: number;
  registered: number;
  organizer: string;
  speakers: string[];
  tags: string[];
  image: string;
  status: "upcoming" | "ongoing" | "completed";
  featured: boolean;
  registrationRequired: boolean;
  price: string;
}

// Sample events data - would come from Django ORM
const eventsData: Event[] = [
  {
    id: 1,
    title: "Mesa Redonda: Mulheres Negras na Ciência",
    description:
      "Discussão sobre os desafios e conquistas das mulheres negras no campo científico, abordando questões de representatividade e inclusão na academia.",
    date: "2024-12-15",
    startTime: "14:00",
    endTime: "17:00",
    location: "Auditório Principal",
    category: "Mesa Redonda",
    type: "Presencial",
    capacity: 200,
    registered: 156,
    organizer: "NEABI",
    speakers: [
      "Dra. Joice Berth",
      "Dra. Silvany Euclênio",
      "Dra. Katemari Rosa",
    ],
    tags: ["mulheres negras", "ciência", "representatividade"],
    image: "/placeholder.svg",
    status: "upcoming",
    featured: true,
    registrationRequired: true,
    price: "Gratuito",
  },
  {
    id: 2,
    title: "Workshop: Capoeira e Resistência Cultural",
    description:
      "Oficina prática sobre capoeira como forma de resistência cultural e preservação da memória afro-brasileira.",
    date: "2024-12-22",
    startTime: "09:00",
    endTime: "12:00",
    location: "Quadra Poliesportiva",
    category: "Workshop",
    type: "Presencial",
    capacity: 50,
    registered: 35,
    organizer: "NEABI",
    speakers: ["Mestre João Pequeno", "Contra-Mestre Lua Rasta"],
    tags: ["capoeira", "resistência", "cultura"],
    image: "/placeholder.svg",
    status: "upcoming",
    featured: true,
    registrationRequired: true,
    price: "Gratuito",
  },
  {
    id: 3,
    title: "Lançamento do Livro: Vozes Quilombolas",
    description:
      "Evento de lançamento da coletânea de narrativas de comunidades quilombolas contemporâneas.",
    date: "2025-01-10",
    startTime: "19:00",
    endTime: "21:00",
    location: "Biblioteca Central",
    category: "Lançamento",
    type: "Presencial",
    capacity: 100,
    registered: 67,
    organizer: "NEABI + Editora Quilombo",
    speakers: ["Coletivo de Autores Quilombolas", "Prof. Dr. Antônio Bispo"],
    tags: ["literatura", "quilombos", "lançamento"],
    image: "/placeholder.svg",
    status: "upcoming",
    featured: false,
    registrationRequired: false,
    price: "Gratuito",
  },
  {
    id: 4,
    title: "Seminário: Educação Antirracista na Prática",
    description:
      "Encontro para discussão de metodologias e práticas educacionais antirracistas no ambiente escolar.",
    date: "2025-01-25",
    startTime: "08:00",
    endTime: "17:00",
    location: "Centro de Convenções",
    category: "Seminário",
    type: "Híbrido",
    capacity: 300,
    registered: 245,
    organizer: "NEABI + Secretaria de Educação",
    speakers: [
      "Prof. Dra. Nilma Lino Gomes",
      "Prof. Dr. Petronilha Silva",
      "Prof. Ms. Henrique Cunha Jr.",
    ],
    tags: ["educação", "antirracismo", "metodologia"],
    image: "/placeholder.svg",
    status: "upcoming",
    featured: true,
    registrationRequired: true,
    price: "R$ 50,00",
  },
  {
    id: 5,
    title: "Ciclo de Cinema: Documentários Afrobrasileiros",
    description:
      "Exibição de documentários que retratam a história e cultura afro-brasileira seguida de debates.",
    date: "2025-02-05",
    startTime: "18:00",
    endTime: "22:00",
    location: "Cinema da Universidade",
    category: "Exibição",
    type: "Presencial",
    capacity: 150,
    registered: 89,
    organizer: "NEABI + Curso de Cinema",
    speakers: ["Diretores dos Documentários", "Críticos de Cinema"],
    tags: ["cinema", "documentário", "cultura"],
    image: "/placeholder.svg",
    status: "upcoming",
    featured: false,
    registrationRequired: true,
    price: "Gratuito",
  },
  {
    id: 6,
    title: "Conferência: O Futuro das Políticas Afirmativas",
    description:
      "Análise das políticas afirmativas brasileiras e perspectivas para os próximos anos.",
    date: "2025-02-20",
    startTime: "14:00",
    endTime: "18:00",
    location: "Auditório Magna",
    category: "Conferência",
    type: "Híbrido",
    capacity: 500,
    registered: 234,
    organizer: "NEABI + Ministério da Educação",
    speakers: [
      "Min. Anielle Franco",
      "Prof. Dr. Silvio Almeida",
      "Dra. Djamila Ribeiro",
    ],
    tags: ["políticas afirmativas", "futuro", "educação"],
    image: "/placeholder.svg",
    status: "upcoming",
    featured: true,
    registrationRequired: true,
    price: "Gratuito",
  },
];

const categories = [
  "Todos",
  "Mesa Redonda",
  "Workshop",
  "Seminário",
  "Conferência",
  "Lançamento",
  "Exibição",
];
const eventTypes = ["Todos", "Presencial", "Online", "Híbrido"];

export default function Eventos() {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [selectedType, setSelectedType] = useState("Todos");
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 6;

  // Filter events - would be handled by Django QuerySets
  const filteredEvents = eventsData.filter((event) => {
    const matchesCategory =
      selectedCategory === "Todos" || event.category === selectedCategory;
    const matchesType = selectedType === "Todos" || event.type === selectedType;
    return matchesCategory && matchesType;
  });

  // Pagination - would use Django Paginator
  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);
  const startIndex = (currentPage - 1) * eventsPerPage;
  const currentEvents = filteredEvents.slice(
    startIndex,
    startIndex + eventsPerPage,
  );

  const featuredEvents = eventsData.filter((event) => event.featured);
  const upcomingEvents = eventsData
    .filter((event) => event.status === "upcoming")
    .slice(0, 3);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatShortDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
    });
  };

  const getStatusColor = (status: string) => {
    const colors = {
      upcoming: "bg-blue-100 text-blue-800",
      ongoing: "bg-green-100 text-green-800",
      completed: "bg-gray-100 text-gray-800",
    };
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const getOccupancyPercentage = (registered: number, capacity: number) => {
    return Math.round((registered / capacity) * 100);
  };

  const getOccupancyColor = (percentage: number) => {
    if (percentage >= 90) return "text-red-600";
    if (percentage >= 70) return "text-yellow-600";
    return "text-green-600";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <Navigation />

      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-amber-100 text-amber-800">
              Eventos NEABI
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Agenda de{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-red-700">
                Eventos
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Acompanhe nossa programação de palestras, workshops, seminários e
              outras atividades relacionadas aos estudos afro-brasileiros e
              indígenas.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Eventos em Destaque
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Não perca os principais eventos da nossa agenda.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {featuredEvents.map((event) => (
              <Card
                key={event.id}
                className="hover:shadow-xl transition-all duration-300 group overflow-hidden"
              >
                <div className="aspect-video bg-gradient-to-br from-amber-100 to-red-100 flex items-center justify-center relative">
                  <Calendar className="h-16 w-16 text-amber-600 group-hover:scale-110 transition-transform" />
                  <Badge className="absolute top-4 left-4 bg-red-600 text-white">
                    Destaque
                  </Badge>
                  <div className="absolute top-4 right-4 bg-white rounded-lg p-2 text-center">
                    <div className="text-lg font-bold text-gray-900">
                      {formatShortDate(event.date).split(" ")[0]}
                    </div>
                    <div className="text-xs text-gray-600 uppercase">
                      {formatShortDate(event.date).split(" ")[1]}
                    </div>
                  </div>
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="outline">{event.category}</Badge>
                    <Badge className={getStatusColor(event.status)}>
                      {event.status === "upcoming"
                        ? "Próximo"
                        : event.status === "ongoing"
                          ? "Em andamento"
                          : "Finalizado"}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg group-hover:text-amber-600 transition-colors leading-tight">
                    {event.title}
                  </CardTitle>
                  <CardDescription>
                    {formatDate(event.date)} • {event.startTime}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4 text-sm line-clamp-3">
                    {event.description}
                  </p>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="h-3 w-3" />
                      {event.location}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Users className="h-3 w-3" />
                      <span
                        className={getOccupancyColor(
                          getOccupancyPercentage(
                            event.registered,
                            event.capacity,
                          ),
                        )}
                      >
                        {event.registered}/{event.capacity} inscritos (
                        {getOccupancyPercentage(
                          event.registered,
                          event.capacity,
                        )}
                        %)
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1">
                      {event.registrationRequired
                        ? "Inscrever-se"
                        : "Mais informações"}
                    </Button>
                    <Button variant="outline" size="sm">
                      <Bookmark className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Filters and All Events */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Todos os Eventos
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore nossa agenda completa de atividades.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-8">
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-56">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Categoria" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent>
                  {eventTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                Notificações
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </Button>
            </div>
          </div>

          {/* Events Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {currentEvents.map((event) => (
              <Card
                key={event.id}
                className="hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="outline">{event.category}</Badge>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        {event.type}
                      </Badge>
                      {event.price !== "Gratuito" && (
                        <Badge className="bg-green-100 text-green-800 text-xs">
                          {event.price}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <CardTitle className="text-lg leading-tight">
                    {event.title}
                  </CardTitle>
                  <CardDescription className="text-amber-600 font-medium">
                    {formatDate(event.date)}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4 text-sm line-clamp-2">
                    {event.description}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="h-3 w-3" />
                      {event.startTime} - {event.endTime}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="h-3 w-3" />
                      {event.location}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Users className="h-3 w-3" />
                      <span
                        className={getOccupancyColor(
                          getOccupancyPercentage(
                            event.registered,
                            event.capacity,
                          ),
                        )}
                      >
                        {event.registered}/{event.capacity} vagas
                      </span>
                    </div>
                  </div>

                  {event.speakers.length > 0 && (
                    <div className="mb-4">
                      <p className="text-xs text-gray-600 mb-1">
                        Palestrantes:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {event.speakers.slice(0, 2).map((speaker, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="text-xs"
                          >
                            {speaker}
                          </Badge>
                        ))}
                        {event.speakers.length > 2 && (
                          <Badge variant="secondary" className="text-xs">
                            +{event.speakers.length - 2} mais
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between items-center">
                    <Button size="sm" variant="outline">
                      <ExternalLink className="h-3 w-3 mr-1" />
                      Ver detalhes
                    </Button>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Share2 className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Bookmark className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2">
              <Button
                variant="outline"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="flex items-center gap-2"
              >
                <ChevronLeft className="h-4 w-4" />
                Anterior
              </Button>

              <div className="flex gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      onClick={() => setCurrentPage(page)}
                      className={`w-10 h-10 ${currentPage === page ? "bg-amber-600 hover:bg-amber-700" : ""}`}
                    >
                      {page}
                    </Button>
                  ),
                )}
              </div>

              <Button
                variant="outline"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="flex items-center gap-2"
              >
                Próxima
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-amber-600 to-red-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <Calendar className="h-12 w-12 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-6">Não Perca Nenhum Evento</h2>
          <p className="text-xl leading-relaxed opacity-95 mb-8">
            Inscreva-se em nossa newsletter e receba notificações sobre novos
            eventos, palestras e atividades do NEABI diretamente no seu email.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              <Bell className="h-4 w-4 mr-2" />
              Receber Notificações
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-amber-600"
            >
              <Download className="h-4 w-4 mr-2" />
              Baixar Calendário
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
