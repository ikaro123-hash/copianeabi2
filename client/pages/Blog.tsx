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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Calendar,
  User,
  Clock,
  Search,
  ChevronLeft,
  ChevronRight,
  Filter,
  Eye,
  MessageCircle,
  Heart,
  Share2,
} from "lucide-react";
import Navigation from "@/components/Navigation";

// This interface would be easily adaptable to Django models
interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content?: string;
  author: string;
  authorRole: string;
  publishedDate: string;
  readTime: string;
  category: string;
  tags: string[];
  imageUrl: string;
  views: number;
  comments: number;
  likes: number;
  featured: boolean;
}

// This data structure mimics what would come from Django's ORM
const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "A Importância da Representatividade na Educação Superior",
    excerpt:
      "Análise sobre como a diversidade étnico-racial impacta positivamente o ambiente acadêmico e a qualidade do ensino...",
    author: "Prof. Dra. Ana Maria Santos",
    authorRole: "Coordenadora Geral do NEABI",
    publishedDate: "2024-11-15",
    readTime: "8 min",
    category: "Educação",
    tags: ["representatividade", "ensino superior", "diversidade"],
    imageUrl: "/placeholder.svg",
    views: 1245,
    comments: 23,
    likes: 89,
    featured: true,
  },
  {
    id: 2,
    title: "Quilombos Contemporâneos: Resistência e Identidade Cultural",
    excerpt:
      "Uma análise profunda sobre as comunidades quilombolas atuais e sua importância para a preservação da cultura afro-brasileira...",
    author: "Prof. Ms. Carlos Eduardo Silva",
    authorRole: "Vice-Coordenador do NEABI",
    publishedDate: "2024-11-10",
    readTime: "12 min",
    category: "Cultura",
    tags: ["quilombos", "resistência", "cultura afro-brasileira"],
    imageUrl: "/placeholder.svg",
    views: 987,
    comments: 31,
    likes: 76,
    featured: true,
  },
  {
    id: 3,
    title: "Povos Indígenas: Saberes Ancestrais na Ciência Moderna",
    excerpt:
      "Como os conhecimentos tradicionais indígenas contribuem para avanços científicos e sustentabilidade ambiental...",
    author: "Profa. Dra. Mariana Ribeiro",
    authorRole: "Coordenadora de Pesquisa",
    publishedDate: "2024-11-05",
    readTime: "10 min",
    category: "Ciência",
    tags: ["povos indígenas", "conhecimento tradicional", "sustentabilidade"],
    imageUrl: "/placeholder.svg",
    views: 756,
    comments: 18,
    likes: 64,
    featured: false,
  },
  {
    id: 4,
    title: "Literatura Afrodiaspórica: Vozes que Ecoam Através dos Séculos",
    excerpt:
      "Explorando a rica tradição literária da diáspora africana e seus impactos na literatura brasileira contemporânea...",
    author: "Prof. Ms. José Antônio Lima",
    authorRole: "Coordenador de Extensão",
    publishedDate: "2024-10-28",
    readTime: "15 min",
    category: "Literatura",
    tags: ["literatura", "diáspora africana", "identidade"],
    imageUrl: "/placeholder.svg",
    views: 1123,
    comments: 27,
    likes: 92,
    featured: false,
  },
  {
    id: 5,
    title: "Políticas Afirmativas: Avanços e Desafios na Última Década",
    excerpt:
      "Avaliação crítica das políticas de ação afirmativa implementadas nas universidades brasileiras...",
    author: "Prof. Dr. Roberto Silva",
    authorRole: "Pesquisador Colaborador",
    publishedDate: "2024-10-20",
    readTime: "11 min",
    category: "Política",
    tags: ["políticas afirmativas", "universidade", "inclusão"],
    imageUrl: "/placeholder.svg",
    views: 892,
    comments: 35,
    likes: 71,
    featured: false,
  },
  {
    id: 6,
    title: "Religiões de Matriz Africana: História e Resistência no Brasil",
    excerpt:
      "Um estudo sobre a preservação das tradições religiosas africanas no contexto brasileiro e sua importância cultural...",
    author: "Profa. Ms. Conceição Evaristo",
    authorRole: "Professora Convidada",
    publishedDate: "2024-10-15",
    readTime: "9 min",
    category: "Religião",
    tags: ["religiões africanas", "candomblé", "umbanda", "resistência"],
    imageUrl: "/placeholder.svg",
    views: 1034,
    comments: 22,
    likes: 88,
    featured: false,
  },
  {
    id: 7,
    title: "Mulheres Negras na Ciência: Superando Barreiras Históricas",
    excerpt:
      "Perfil de cientistas negras brasileiras que revolucionaram suas áreas de pesquisa apesar dos obstáculos enfrentados...",
    author: "Dra. Jurema Werneck",
    authorRole: "Pesquisadora Visitante",
    publishedDate: "2024-10-08",
    readTime: "13 min",
    category: "Ciência",
    tags: ["mulheres negras", "ciência", "protagonismo feminino"],
    imageUrl: "/placeholder.svg",
    views: 1456,
    comments: 41,
    likes: 124,
    featured: true,
  },
  {
    id: 8,
    title: "Arte Afro-Brasileira: Expressões Contemporâneas de Ancestralidade",
    excerpt:
      "Panorama da produção artística afro-brasileira atual e sua conexão com as raízes ancestrais africanas...",
    author: "Prof. Emanoel Araujo",
    authorRole: "Curador Convidado",
    publishedDate: "2024-09-30",
    readTime: "7 min",
    category: "Arte",
    tags: ["arte afro-brasileira", "ancestralidade", "expressão cultural"],
    imageUrl: "/placeholder.svg",
    views: 743,
    comments: 16,
    likes: 59,
    featured: false,
  },
  {
    id: 9,
    title: "Juventude Negra e Mercado de Trabalho: Desafios e Oportunidades",
    excerpt:
      "Análise das dificuldades enfrentadas por jovens negros no acesso ao mercado de trabalho e estratégias de superação...",
    author: "Prof. Ms. Silvio Almeida",
    authorRole: "Pesquisador Colaborador",
    publishedDate: "2024-09-25",
    readTime: "6 min",
    category: "Sociedade",
    tags: ["juventude negra", "mercado de trabalho", "oportunidades"],
    imageUrl: "/placeholder.svg",
    views: 891,
    comments: 29,
    likes: 67,
    featured: false,
  },
];

// Categories and tags for filtering (would come from Django models)
const categories = [
  "Todos",
  "Educação",
  "Cultura",
  "Ciência",
  "Literatura",
  "Política",
  "Religião",
  "Arte",
  "Sociedade",
];
const popularTags = [
  "representatividade",
  "quilombos",
  "povos indígenas",
  "literatura",
  "políticas afirmativas",
  "mulheres negras",
];

export default function Blog() {
  // State management (would be handled by Django views and templates)
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("recent");

  const postsPerPage = 9; // This would be configurable in Django settings

  // Filter and search logic (would be handled by Django QuerySets)
  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory =
      selectedCategory === "Todos" || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Sort posts (would be handled by Django ORM ordering)
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    switch (sortBy) {
      case "recent":
        return (
          new Date(b.publishedDate).getTime() -
          new Date(a.publishedDate).getTime()
        );
      case "popular":
        return b.views - a.views;
      case "liked":
        return b.likes - a.likes;
      default:
        return 0;
    }
  });

  // Pagination logic (would use Django Paginator)
  const totalPages = Math.ceil(sortedPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const currentPosts = sortedPosts.slice(startIndex, startIndex + postsPerPage);

  // Featured posts (would be a separate Django query)
  const featuredPosts = blogPosts.filter((post) => post.featured).slice(0, 3);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString("pt-BR");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <Navigation />

      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-amber-100 text-amber-800">
              Blog NEABI
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Reflexões sobre{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-red-700">
                Diversidade
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Artigos, pesquisas e discussões sobre questões étnico-raciais,
              diversidade cultural e inclusão no ambiente acadêmico e na
              sociedade brasileira.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Posts em Destaque
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Os artigos mais relevantes e impactantes sobre diversidade
              étnico-racial.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {featuredPosts.map((post) => (
              <Card
                key={post.id}
                className="hover:shadow-xl transition-all duration-300 group"
              >
                <div className="aspect-video bg-gradient-to-br from-amber-100 to-red-100 flex items-center justify-center relative overflow-hidden">
                  <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center">
                    <User className="h-8 w-8 text-white" />
                  </div>
                  <Badge className="absolute top-4 left-4 bg-red-600 text-white">
                    Destaque
                  </Badge>
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="outline">{post.category}</Badge>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        {formatNumber(post.views)}
                      </div>
                    </div>
                  </div>
                  <CardTitle className="text-lg group-hover:text-amber-600 transition-colors leading-tight">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-600">
                    Por {post.author} • {formatDate(post.publishedDate)}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock className="h-3 w-3" />
                      {post.readTime}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-amber-600 hover:text-amber-700"
                    >
                      Ler mais →
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Filter and Search Section */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Buscar artigos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>

              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-48">
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
            </div>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Mais recentes</SelectItem>
                <SelectItem value="popular">Mais visualizados</SelectItem>
                <SelectItem value="liked">Mais curtidos</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Popular Tags */}
          <div className="mt-6">
            <p className="text-sm text-gray-600 mb-3">Tags populares:</p>
            <div className="flex flex-wrap gap-2">
              {popularTags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="cursor-pointer hover:bg-amber-100 hover:text-amber-800"
                >
                  #{tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid - 3x3 Layout */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              Todos os Artigos
              <span className="text-sm font-normal text-gray-500 ml-2">
                ({formatNumber(filteredPosts.length)}{" "}
                {filteredPosts.length === 1 ? "artigo" : "artigos"})
              </span>
            </h2>
          </div>

          {/* Posts Grid - Django would use {% for post in posts %} */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {currentPosts.map((post) => (
              <Card
                key={post.id}
                className="hover:shadow-lg transition-all duration-300 group"
              >
                <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative overflow-hidden">
                  <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center">
                    <User className="h-6 w-6 text-white" />
                  </div>
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="outline">{post.category}</Badge>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        {formatNumber(post.views)}
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart className="h-3 w-3" />
                        {post.likes}
                      </div>
                    </div>
                  </div>
                  <CardTitle className="text-lg group-hover:text-amber-600 transition-colors leading-tight">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="text-sm">
                    Por {post.author} • {formatDate(post.publishedDate)}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4 text-sm line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Clock className="h-3 w-3" />
                      {post.readTime}
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MessageCircle className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Share2 className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-amber-600 hover:text-amber-700 text-xs"
                      >
                        Ler →
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination - Django would use {% include 'pagination.html' %} */}
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

      {/* Newsletter Subscription */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-amber-600 to-red-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Fique por Dentro das Novidades
          </h2>
          <p className="text-xl leading-relaxed opacity-95 mb-8">
            Receba nossos artigos mais recentes e atualizações sobre eventos
            diretamente no seu email.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Seu melhor email"
              className="bg-white text-gray-900"
            />
            <Button variant="secondary" className="whitespace-nowrap">
              Inscrever-se
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
