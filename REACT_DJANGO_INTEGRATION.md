# Guia de Integração React + Django

Este documento explica como integrar o frontend React existente com o backend Django implementado.

## 🔗 Arquitetura da Integração

```
React Frontend (Port 5173)  ←→  Django Backend (Port 8000)
├── Components              ←→  ├── API Endpoints
├── Pages                   ←→  ├── Models & Views
├── State Management        ←→  ├── Authentication
└── Routing                 ←→  └── Permissions
```

## 🚀 Configuração da Integração

### 1. Instalar e Configurar Django

```bash
cd django_backend
python setup.py
python manage.py createsuperuser
python manage.py runserver  # Port 8000
```

### 2. Configurar React para consumir API Django

```bash
cd client
npm install axios  # Para requisições HTTP
npm run dev        # Port 5173
```

### 3. Configurar variáveis de ambiente

```javascript
// client/.env
VITE_API_BASE_URL=http://127.0.0.1:8000/api
VITE_DJANGO_BASE_URL=http://127.0.0.1:8000
```

## 📡 API Endpoints Disponíveis

### Posts

```javascript
// Listar posts (públicos)
GET /api/posts/
GET /api/posts/?search=termo&category=categoria&page=1

// Posts em destaque
GET /api/posts/featured/

// Detalhes de um post
GET /api/posts/{id}/

// Incrementar visualizações
POST /api/posts/{id}/increment_views/

// CRUD (apenas admins)
POST /api/posts/
PUT /api/posts/{id}/
DELETE /api/posts/{id}/
```

### Eventos

```javascript
// Listar eventos (públicos e futuros)
GET /api/events/
GET /api/events/?search=termo&visibility=public

// Eventos em destaque
GET /api/events/featured/

// Próximos eventos
GET /api/events/upcoming/

// Detalhes de um evento
GET /api/events/{id}/

// CRUD (apenas admins)
POST /api/events/
PUT /api/events/{id}/
DELETE /api/events/{id}/
```

### Auxiliares

```javascript
// Categorias
GET /api/categories/

// Tags
GET /api/tags/

// Mensagens de contato
POST /api/contact-messages/
```

## 🛠️ Implementação no React

### 1. Service Layer (API Client)

```javascript
// client/src/services/api.js
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para incluir token de autenticação
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const postsAPI = {
  getAll: (params = {}) => api.get("/posts/", { params }),
  getFeatured: () => api.get("/posts/featured/"),
  getById: (id) => api.get(`/posts/${id}/`),
  incrementViews: (id) => api.post(`/posts/${id}/increment_views/`),
  create: (data) => api.post("/posts/", data),
  update: (id, data) => api.put(`/posts/${id}/`, data),
  delete: (id) => api.delete(`/posts/${id}/`),
};

export const eventsAPI = {
  getAll: (params = {}) => api.get("/events/", { params }),
  getFeatured: () => api.get("/events/featured/"),
  getUpcoming: () => api.get("/events/upcoming/"),
  getById: (id) => api.get(`/events/${id}/`),
  create: (data) => api.post("/events/", data),
  update: (id, data) => api.put(`/events/${id}/`, data),
  delete: (id) => api.delete(`/events/${id}/`),
};

export const utilsAPI = {
  getCategories: () => api.get("/categories/"),
  getTags: () => api.get("/tags/"),
  sendContactMessage: (data) => api.post("/contact-messages/", data),
};

export default api;
```

### 2. Hook Personalizado para Posts

```javascript
// client/src/hooks/usePosts.js
import { useState, useEffect } from "react";
import { postsAPI } from "../services/api";

export const usePosts = (params = {}) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await postsAPI.getAll(params);
        setPosts(response.data.results);
        setPagination({
          count: response.data.count,
          next: response.data.next,
          previous: response.data.previous,
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [JSON.stringify(params)]);

  return { posts, loading, error, pagination };
};

export const useFeaturedPosts = () => {
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedPosts = async () => {
      try {
        const response = await postsAPI.getFeatured();
        setFeaturedPosts(response.data);
      } catch (err) {
        console.error("Erro ao buscar posts em destaque:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedPosts();
  }, []);

  return { featuredPosts, loading };
};
```

### 3. Componente Blog Atualizado

```javascript
// client/pages/Blog.tsx (atualizado para usar API)
import React, { useState } from 'react';
import { usePosts, useFeaturedPosts } from '../hooks/usePosts';
import { BlogPostCard } from '../components/DjangoCompatible';

export default function Blog() {
  const [searchParams, setSearchParams] = useState({
    search: '',
    category: '',
    page: 1,
  });

  const { posts, loading, error, pagination } = usePosts(searchParams);
  const { featuredPosts } = useFeaturedPosts();

  const handleSearch = (search: string) => {
    setSearchParams(prev => ({ ...prev, search, page: 1 }));
  };

  const handleCategoryFilter = (category: string) => {
    setSearchParams(prev => ({ ...prev, category, page: 1 }));
  };

  const handlePageChange = (page: number) => {
    setSearchParams(prev => ({ ...prev, page }));
  };

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block mb-4 px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm">
              Blog NEABI
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Reflexões sobre <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-red-700">Diversidade</span>
            </h1>
          </div>
        </div>
      </section>

      {/* Posts em Destaque */}
      {featuredPosts.length > 0 && (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              Posts em Destaque
            </h2>
            <div className="grid lg:grid-cols-3 gap-8">
              {featuredPosts.map((post) => (
                <BlogPostCard key={post.id} post={post} featured={true} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Filtros de Busca */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <SearchFilter
            onSearch={handleSearch}
            onCategoryFilter={handleCategoryFilter}
            currentCategory={searchParams.category}
          />
        </div>
      </section>

      {/* Grid de Posts */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              Todos os Artigos
              <span className="text-sm font-normal text-gray-500 ml-2">
                ({pagination?.count || 0} artigos)
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {posts.map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>

          {/* Paginação */}
          {pagination && (
            <PaginationComponent
              currentPage={searchParams.page}
              totalPages={Math.ceil(pagination.count / 9)}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </section>
    </div>
  );
}
```

### 4. Componente de Eventos Atualizado

```javascript
// client/pages/Eventos.tsx (atualizado para usar API)
import React from "react";
import { useEvents, useFeaturedEvents } from "../hooks/useEvents";
import { EventCard } from "../components/DjangoCompatible";

export default function Eventos() {
  const { events, loading, error } = useEvents();
  const { featuredEvents } = useFeaturedEvents();

  if (loading) return <div>Carregando eventos...</div>;
  if (error) return <div>Erro: {error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Eventos NEABI
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Participe dos nossos eventos e atividades sobre diversidade e
            inclusão.
          </p>
        </div>
      </section>

      {/* Eventos em Destaque */}
      {featuredEvents.length > 0 && (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              Eventos em Destaque
            </h2>
            <div className="grid lg:grid-cols-2 gap-8">
              {featuredEvents.map((event) => (
                <EventCard key={event.id} event={event} featured={true} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Lista de Eventos */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Próximos Eventos
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
```

## 🔐 Autenticação

### 1. Context de Autenticação

```javascript
// client/src/contexts/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      // Verificar se token é válido
      checkAuthStatus();
    } else {
      setLoading(false);
    }
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await api.get("/auth/user/");
      setUser(response.data);
    } catch (error) {
      localStorage.removeItem("authToken");
    } finally {
      setLoading(false);
    }
  };

  const login = async (username, password) => {
    try {
      const response = await api.post("/auth/login/", {
        username,
        password,
      });

      const { token, user } = response.data;
      localStorage.setItem("authToken", token);
      setUser(user);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Erro no login",
      };
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setUser(null);
  };

  const isAdmin = () => {
    return user?.profile?.role === "admin";
  };

  const value = {
    user,
    login,
    logout,
    isAdmin,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
```

### 2. Componente de Login

```javascript
// client/src/components/Login.jsx
import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(formData.username, formData.password);

    if (result.success) {
      // Redirecionar baseado no role
      window.location.href = "/";
    } else {
      setError(result.error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Usuário
        </label>
        <input
          type="text"
          value={formData.username}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              username: e.target.value,
            }))
          }
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
          required
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Senha
        </label>
        <input
          type="password"
          value={formData.password}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              password: e.target.value,
            }))
          }
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded"
      >
        Entrar
      </button>
    </form>
  );
};
```

## 📊 Estado Global (Opcional)

Para aplicações mais complexas, considere usar Zustand ou Redux:

```javascript
// client/src/stores/usePostStore.js (Zustand)
import { create } from "zustand";
import { postsAPI } from "../services/api";

export const usePostStore = create((set, get) => ({
  posts: [],
  featuredPosts: [],
  loading: false,
  error: null,

  fetchPosts: async (params = {}) => {
    set({ loading: true, error: null });
    try {
      const response = await postsAPI.getAll(params);
      set({ posts: response.data.results, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  fetchFeaturedPosts: async () => {
    try {
      const response = await postsAPI.getFeatured();
      set({ featuredPosts: response.data });
    } catch (error) {
      set({ error: error.message });
    }
  },
}));
```

## 🚀 Deploy e Produção

### 1. Configurações de Produção

```javascript
// client/.env.production
VITE_API_BASE_URL=https://your-django-backend.com/api
VITE_DJANGO_BASE_URL=https://your-django-backend.com
```

### 2. Build do React

```bash
npm run build
```

### 3. Servir arquivos estáticos no Django

```python
# django_backend/neabi/settings.py (produção)
STATIC_ROOT = BASE_DIR / 'staticfiles'
STATICFILES_DIRS = [
    BASE_DIR / 'static',
    BASE_DIR / '../client/dist',  # Build do React
]
```

## ✅ Checklist de Integração

- [ ] Django backend funcionando (port 8000)
- [ ] React frontend funcionando (port 5173)
- [ ] CORS configurado
- [ ] API endpoints testados
- [ ] Hooks personalizados criados
- [ ] Componentes atualizados para usar API
- [ ] Autenticação implementada
- [ ] Permissões funcionando
- [ ] Estado global configurado (opcional)
- [ ] Build de produção testado

---

🎉 **Integração completa!** O frontend React agora consome dados do backend Django de forma segura e eficiente.
