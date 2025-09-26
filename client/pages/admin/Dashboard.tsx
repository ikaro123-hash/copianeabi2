import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  FileText,
  Calendar,
  Users,
  Plus,
  Edit,
  Eye,
  LogOut,
  BarChart3,
  TrendingUp,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  role: "admin" | "reader";
}

interface DashboardStats {
  posts: number;
  events: number;
  users: number;
  views: number;
}

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [stats, setStats] = useState<DashboardStats>({
    posts: 0,
    events: 0,
    users: 0,
    views: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem("neabi_token");
    const userData = localStorage.getItem("neabi_user");

    if (!token || !userData) {
      navigate("/admin/login");
      return;
    }

    const parsedUser = JSON.parse(userData) as User;
    if (parsedUser.role !== "admin") {
      toast({
        title: "Acesso negado",
        description: "Apenas administradores podem acessar esta área.",
        variant: "destructive",
      });
      navigate("/");
      return;
    }

    setUser(parsedUser);
    loadDashboardData();
  }, [navigate, toast]);

  const loadDashboardData = async () => {
    try {
      const token = localStorage.getItem("neabi_token");

      // Load posts count
      const postsResponse = await fetch("/api/posts?limit=1", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (postsResponse.ok) {
        const postsData = await postsResponse.json();
        setStats((prev) => ({
          ...prev,
          posts: postsData.pagination?.total_posts || 0,
        }));
      }

      // Load events count
      const eventsResponse = await fetch("/api/events?limit=1", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (eventsResponse.ok) {
        const eventsData = await eventsResponse.json();
        setStats((prev) => ({
          ...prev,
          events: eventsData.pagination?.total_events || 0,
        }));
      }
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("neabi_token");
      await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("neabi_token");
      localStorage.removeItem("neabi_user");
      navigate("/admin/login");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 bg-amber-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-amber-600 to-red-700 rounded-full flex items-center justify-center mr-3">
                <span className="text-white font-bold text-sm">N</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900">Admin NEABI</h1>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Olá, {user?.first_name}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-gray-600 hover:text-gray-900"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Painel Administrativo
          </h2>
          <p className="text-gray-600">
            Gerencie posts, eventos e conteúdo do NEABI
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total de Posts
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.posts}</div>
              <p className="text-xs text-muted-foreground">
                Artigos publicados
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total de Eventos
              </CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.events}</div>
              <p className="text-xs text-muted-foreground">
                Eventos cadastrados
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Usuários</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.users}</div>
              <p className="text-xs text-muted-foreground">
                Usuários registrados
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Visualizações
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.views}</div>
              <p className="text-xs text-muted-foreground">Views total</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Posts Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Gerenciar Posts
              </CardTitle>
              <CardDescription>
                Criar, editar e gerenciar artigos do blog
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                className="w-full justify-start"
                onClick={() => navigate("/admin/posts/new")}
              >
                <Plus className="h-4 w-4 mr-2" />
                Criar Novo Post
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => navigate("/admin/posts")}
              >
                <Edit className="h-4 w-4 mr-2" />
                Gerenciar Posts
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => navigate("/blog")}
              >
                <Eye className="h-4 w-4 mr-2" />
                Ver Blog Público
              </Button>
            </CardContent>
          </Card>

          {/* Events Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Gerenciar Eventos
              </CardTitle>
              <CardDescription>
                Criar, editar e gerenciar eventos do NEABI
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                className="w-full justify-start"
                onClick={() => navigate("/admin/events/new")}
              >
                <Plus className="h-4 w-4 mr-2" />
                Criar Novo Evento
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => navigate("/admin/events")}
              >
                <Edit className="h-4 w-4 mr-2" />
                Gerenciar Eventos
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => navigate("/projetos/eventos")}
              >
                <Eye className="h-4 w-4 mr-2" />
                Ver Eventos Públicos
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
