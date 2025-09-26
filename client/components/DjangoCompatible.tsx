// This file contains React components structured to be easily adaptable to Django templates
// Each component shows how it would translate to Django template syntax

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, Users, Eye, Heart } from "lucide-react";

// Blog Post Card - would use Django template tags like {% for post in posts %}
interface BlogPostProps {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  publishedDate: string;
  readTime: string;
  category: string;
  views: number;
  likes: number;
}

export function BlogPostCard({
  id,
  title,
  excerpt,
  author,
  publishedDate,
  readTime,
  category,
  views,
  likes,
}: BlogPostProps) {
  // Django equivalent:
  // {% for post in posts %}
  //   <article class="blog-post-card">
  //     <h3>{{ post.title }}</h3>
  //     <p>{{ post.excerpt|truncatewords:20 }}</p>
  //     <div class="meta">
  //       <span>Por {{ post.author.name }}</span>
  //       <span>{{ post.published_date|date:"d \de F \de Y" }}</span>
  //     </div>
  //   </article>
  // {% endfor %}

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start mb-2">
          <Badge variant="outline">{category}</Badge>
          <div className="flex items-center gap-3 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <Eye className="h-3 w-3" />
              {views.toLocaleString("pt-BR")}
            </div>
            <div className="flex items-center gap-1">
              <Heart className="h-3 w-3" />
              {likes}
            </div>
          </div>
        </div>
        <CardTitle className="text-lg leading-tight hover:text-amber-600 transition-colors">
          <a href={`/blog/${id}`}>{title}</a>
        </CardTitle>
        <CardDescription className="text-sm">
          Por {author} • {new Date(publishedDate).toLocaleDateString("pt-BR")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4 text-sm line-clamp-3">{excerpt}</p>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Clock className="h-3 w-3" />
            {readTime}
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-amber-600 hover:text-amber-700 text-xs"
          >
            <a href={`/blog/${id}`}>Ler mais →</a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// Event Card - would use Django model fields
interface EventProps {
  id: number;
  title: string;
  description: string;
  date: string;
  startTime: string;
  location: string;
  category: string;
  capacity: number;
  registered: number;
  featured: boolean;
}

export function EventCard({
  id,
  title,
  description,
  date,
  startTime,
  location,
  category,
  capacity,
  registered,
  featured,
}: EventProps) {
  // Django equivalent:
  // {% for event in events %}
  //   <div class="event-card">
  //     {% if event.featured %}<span class="badge-featured">Destaque</span>{% endif %}
  //     <h3>{{ event.title }}</h3>
  //     <p>{{ event.description|truncatewords:15 }}</p>
  //     <div class="event-meta">
  //       <span>{{ event.date|date:"d/m/Y" }} às {{ event.start_time|time:"H:i" }}</span>
  //       <span>{{ event.location }}</span>
  //       <span>{{ event.registered }}/{{ event.capacity }} vagas</span>
  //     </div>
  //   </div>
  // {% endfor %}

  const occupancyPercentage = Math.round((registered / capacity) * 100);
  const getOccupancyColor = (percentage: number) => {
    if (percentage >= 90) return "text-red-600";
    if (percentage >= 70) return "text-yellow-600";
    return "text-green-600";
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start mb-2">
          <Badge variant="outline">{category}</Badge>
          {featured && (
            <Badge className="bg-red-600 text-white">Destaque</Badge>
          )}
        </div>
        <CardTitle className="text-lg leading-tight hover:text-amber-600 transition-colors">
          <a href={`/eventos/${id}`}>{title}</a>
        </CardTitle>
        <CardDescription>
          {new Date(date).toLocaleDateString("pt-BR")} • {startTime}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4 text-sm line-clamp-2">{description}</p>
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="h-3 w-3" />
            {new Date(date).toLocaleDateString("pt-BR", {
              weekday: "long",
              day: "numeric",
              month: "long",
            })}
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="h-3 w-3" />
            {location}
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Users className="h-3 w-3" />
            <span className={getOccupancyColor(occupancyPercentage)}>
              {registered}/{capacity} vagas ({occupancyPercentage}%)
            </span>
          </div>
        </div>
        <Button size="sm" className="w-full">
          <a href={`/eventos/${id}`}>Ver detalhes</a>
        </Button>
      </CardContent>
    </Card>
  );
}

// Pagination Component - would use Django's built-in pagination
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  baseUrl?: string; // For Django URL generation
}

export function PaginationComponent({
  currentPage,
  totalPages,
  onPageChange,
  baseUrl = "",
}: PaginationProps) {
  // Django equivalent:
  // {% if is_paginated %}
  //   <div class="pagination">
  //     {% if page_obj.has_previous %}
  //       <a href="?page={{ page_obj.previous_page_number }}">Anterior</a>
  //     {% endif %}
  //
  //     {% for num in page_obj.paginator.page_range %}
  //       {% if page_obj.number == num %}
  //         <span class="current">{{ num }}</span>
  //       {% else %}
  //         <a href="?page={{ num }}">{{ num }}</a>
  //       {% endif %}
  //     {% endfor %}
  //
  //     {% if page_obj.has_next %}
  //       <a href="?page={{ page_obj.next_page_number }}">Próxima</a>
  //     {% endif %}
  //   </div>
  // {% endif %}

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-2">
      <Button
        variant="outline"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center gap-2"
      >
        Anterior
      </Button>

      <div className="flex gap-1">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Button
            key={page}
            variant={currentPage === page ? "default" : "outline"}
            onClick={() => onPageChange(page)}
            className={`w-10 h-10 ${currentPage === page ? "bg-amber-600 hover:bg-amber-700" : ""}`}
          >
            {baseUrl ? <a href={`${baseUrl}?page=${page}`}>{page}</a> : page}
          </Button>
        ))}
      </div>

      <Button
        variant="outline"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center gap-2"
      >
        Próxima
      </Button>
    </div>
  );
}

// Search and Filter Component - would use Django forms
interface SearchFilterProps {
  searchTerm: string;
  selectedCategory: string;
  categories: string[];
  onSearchChange: (term: string) => void;
  onCategoryChange: (category: string) => void;
}

export function SearchFilter({
  searchTerm,
  selectedCategory,
  categories,
  onSearchChange,
  onCategoryChange,
}: SearchFilterProps) {
  // Django equivalent:
  // <form method="GET" class="search-filter-form">
  //   <input type="text" name="search" value="{{ request.GET.search }}" placeholder="Buscar...">
  //   <select name="category">
  //     <option value="">Todas as categorias</option>
  //     {% for category in categories %}
  //       <option value="{{ category.slug }}" {% if request.GET.category == category.slug %}selected{% endif %}>
  //         {{ category.name }}
  //       </option>
  //     {% endfor %}
  //   </select>
  //   <button type="submit">Filtrar</button>
  // </form>

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center mb-8">
      <div className="relative flex-1 max-w-md">
        <input
          type="text"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
        />
      </div>

      <select
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
      >
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
}

// Meta information component for SEO - would use Django meta tags
interface MetaProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
}

export function MetaTags({ title, description, keywords, ogImage }: MetaProps) {
  // Django equivalent in base.html:
  // <title>{{ page_title|default:"NEABI" }} | Núcleo de Estudos Afro-Brasileiros e Indígenas</title>
  // <meta name="description" content="{{ page_description|default:"Promovendo diversidade e inclusão através da educação" }}">
  // <meta name="keywords" content="{{ page_keywords|default:"NEABI, diversidade, inclusão, afro-brasileiro, indígena" }}">
  // <meta property="og:title" content="{{ page_title }}">
  // <meta property="og:description" content="{{ page_description }}">
  // <meta property="og:image" content="{{ page_image|default:"/static/images/neabi-logo.jpg" }}">

  return (
    <>
      {/* This would be in the <head> section of Django templates */}
      <title>{title} | NEABI</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {ogImage && <meta property="og:image" content={ogImage} />}
    </>
  );
}
