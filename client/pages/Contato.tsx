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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  User,
  Calendar,
  ExternalLink,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Linkedin,
} from "lucide-react";
import Navigation from "@/components/Navigation";

export default function Contato() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    category: "",
  });

  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email",
      details: [
        "neabi@universidade.edu.br",
        "coordenacao.neabi@universidade.edu.br",
      ],
      description: "Respostas em até 48 horas úteis",
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Telefone",
      details: ["(11) 3456-7890", "(11) 3456-7891"],
      description: "Seg. à Sex. das 8h às 17h",
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Endereço",
      details: [
        "Universidade Federal - Campus Central",
        "Prédio da Reitoria, Sala 205",
        "Rua das Universidades, 123",
        "São Paulo - SP, CEP: 01234-567",
      ],
      description: "Como chegar",
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Horário de Atendimento",
      details: [
        "Segunda a Quinta: 8h às 17h",
        "Sexta-feira: 8h às 16h",
        "Sábados: 9h às 13h (agendamento)",
      ],
      description: "Atendimento presencial e online",
    },
  ];

  const teamMembers = [
    {
      name: "Prof. Dra. Ana Maria Santos",
      role: "Coordenadora Geral",
      email: "ana.santos@universidade.edu.br",
      phone: "(11) 3456-7892",
      areas: ["Relações Étnico-Raciais", "História da África"],
      office: "Sala 205A",
    },
    {
      name: "Prof. Ms. Carlos Eduardo Silva",
      role: "Vice-Coordenador",
      email: "carlos.silva@universidade.edu.br",
      phone: "(11) 3456-7893",
      areas: ["Antropologia Social", "Cultura Afro-Brasileira"],
      office: "Sala 205B",
    },
    {
      name: "Profa. Dra. Mariana Ribeiro",
      role: "Coordenadora de Pesquisa",
      email: "mariana.ribeiro@universidade.edu.br",
      phone: "(11) 3456-7894",
      areas: ["Estudos Étnicos", "Metodologia de Pesquisa"],
      office: "Sala 206A",
    },
    {
      name: "Prof. Ms. José Antônio Lima",
      role: "Coordenador de Extensão",
      email: "jose.lima@universidade.edu.br",
      phone: "(11) 3456-7895",
      areas: ["Cultura Brasileira", "Projetos Comunitários"],
      office: "Sala 206B",
    },
  ];

  const socialMedia = [
    {
      name: "Facebook",
      icon: <Facebook className="h-5 w-5" />,
      url: "#",
      followers: "2.5k",
    },
    {
      name: "Instagram",
      icon: <Instagram className="h-5 w-5" />,
      url: "#",
      followers: "3.2k",
    },
    {
      name: "Twitter",
      icon: <Twitter className="h-5 w-5" />,
      url: "#",
      followers: "1.8k",
    },
    {
      name: "YouTube",
      icon: <Youtube className="h-5 w-5" />,
      url: "#",
      followers: "1.2k",
    },
    {
      name: "LinkedIn",
      icon: <Linkedin className="h-5 w-5" />,
      url: "#",
      followers: "900",
    },
  ];

  const faqItems = [
    {
      question: "Como posso participar dos projetos do NEABI?",
      answer:
        "Você pode se inscrever através do nosso site ou entrando em contato diretamente conosco. Oferecemos projetos de extensão, pesquisa e ensino abertos à comunidade acadêmica e externa.",
    },
    {
      question: "O NEABI oferece cursos ou capacitações?",
      answer:
        "Sim, oferecemos regularmente cursos de extensão, workshops e capacitações sobre relações étnico-raciais, história e cultura afro-brasileira e indígena.",
    },
    {
      question: "Como posso solicitar uma palestra ou consultoria?",
      answer:
        "Entre em contato conosco através do formulário ou email com pelo menos 30 dias de antecedência, informando o tema, data, local e público-alvo.",
    },
    {
      question: "Estudantes de outras instituições podem participar?",
      answer:
        "Sim, muitas de nossas atividades são abertas ao público em geral, incluindo estudantes de outras instituições de ensino.",
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission - would connect to Django backend
    console.log("Form submitted:", formData);
    alert("Mensagem enviada com sucesso! Entraremos em contato em breve.");
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      category: "",
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <Navigation />

      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-amber-100 text-amber-800">
              Entre em Contato
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Fale{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-red-700">
                Conosco
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Estamos sempre abertos ao diálogo e prontos para colaborar. Entre
              em contato para esclarecer dúvidas, propor parcerias ou participar
              de nossos projetos.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Informações de Contato
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Escolha a melhor forma de entrar em contato conosco.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-amber-600 to-red-700 rounded-lg flex items-center justify-center text-white">
                      {info.icon}
                    </div>
                  </div>
                  <CardTitle className="text-lg">{info.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1 mb-3">
                    {info.details.map((detail, detailIndex) => (
                      <p key={detailIndex} className="text-gray-700 text-sm">
                        {detail}
                      </p>
                    ))}
                  </div>
                  <p className="text-xs text-amber-600 font-medium">
                    {info.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form and Map */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Envie uma Mensagem
              </h2>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5 text-amber-600" />
                    Formulário de Contato
                  </CardTitle>
                  <CardDescription>
                    Preencha o formulário abaixo e responderemos o mais breve
                    possível.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Nome completo *</Label>
                        <Input
                          id="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) =>
                            handleInputChange("name", e.target.value)
                          }
                          placeholder="Seu nome completo"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) =>
                            handleInputChange("email", e.target.value)
                          }
                          placeholder="seu@email.com"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone">Telefone</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) =>
                            handleInputChange("phone", e.target.value)
                          }
                          placeholder="(11) 99999-9999"
                        />
                      </div>
                      <div>
                        <Label htmlFor="category">Categoria</Label>
                        <Select
                          value={formData.category}
                          onValueChange={(value) =>
                            handleInputChange("category", value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione uma categoria" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="duvida">Dúvida geral</SelectItem>
                            <SelectItem value="parceria">
                              Proposta de parceria
                            </SelectItem>
                            <SelectItem value="participacao">
                              Participação em projetos
                            </SelectItem>
                            <SelectItem value="palestra">
                              Solicitação de palestra
                            </SelectItem>
                            <SelectItem value="pesquisa">
                              Colaboração em pesquisa
                            </SelectItem>
                            <SelectItem value="outro">Outro</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="subject">Assunto *</Label>
                      <Input
                        id="subject"
                        type="text"
                        required
                        value={formData.subject}
                        onChange={(e) =>
                          handleInputChange("subject", e.target.value)
                        }
                        placeholder="Resumo do seu contato"
                      />
                    </div>

                    <div>
                      <Label htmlFor="message">Mensagem *</Label>
                      <Textarea
                        id="message"
                        required
                        rows={6}
                        value={formData.message}
                        onChange={(e) =>
                          handleInputChange("message", e.target.value)
                        }
                        placeholder="Descreva sua solicitação, dúvida ou proposta em detalhes..."
                      />
                    </div>

                    <Button type="submit" className="w-full">
                      <Send className="h-4 w-4 mr-2" />
                      Enviar Mensagem
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Map and Additional Info */}
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Localização
                </h2>
                <Card>
                  <CardContent className="p-0">
                    <div className="aspect-video bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                      <div className="text-center">
                        <MapPin className="h-16 w-16 text-gray-500 mx-auto mb-4" />
                        <p className="text-gray-600">Mapa Interativo</p>
                        <p className="text-sm text-gray-500">
                          Clique para abrir no Google Maps
                        </p>
                      </div>
                    </div>
                  </CardContent>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="h-4 w-4 text-amber-600" />
                      <span className="font-medium">Como chegar</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      Universidade Federal - Campus Central, Prédio da Reitoria,
                      Sala 205
                    </p>
                    <Button variant="outline" size="sm" className="w-full">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Abrir no Google Maps
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Social Media */}
              <Card>
                <CardHeader>
                  <CardTitle>Redes Sociais</CardTitle>
                  <CardDescription>
                    Siga-nos para acompanhar nossas atividades e novidades.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {socialMedia.map((social, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="justify-start"
                      >
                        {social.icon}
                        <span className="ml-2">{social.name}</span>
                        <span className="ml-auto text-xs text-gray-500">
                          {social.followers}
                        </span>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Team Contact */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Nossa Equipe
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Entre em contato diretamente com os membros da nossa equipe.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-red-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <User className="h-8 w-8 text-amber-600" />
                  </div>
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <CardDescription className="text-amber-600 font-medium">
                    {member.role}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Mail className="h-3 w-3" />
                      <span className="truncate">{member.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone className="h-3 w-3" />
                      {member.phone}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="h-3 w-3" />
                      {member.office}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-2">
                      Áreas de atuação:
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {member.areas.map((area, areaIndex) => (
                        <Badge
                          key={areaIndex}
                          variant="secondary"
                          className="text-xs"
                        >
                          {area}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Perguntas Frequentes
            </h2>
            <p className="text-gray-600">
              Confira as respostas para as dúvidas mais comuns.
            </p>
          </div>

          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{item.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{item.answer}</p>
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
          <h2 className="text-3xl font-bold mb-6">Agende uma Reunião</h2>
          <p className="text-xl leading-relaxed opacity-95 mb-8">
            Prefere conversar pessoalmente? Agende uma reunião com nossa equipe
            para discutir parcerias, projetos ou esclarecer dúvidas específicas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              <Calendar className="h-4 w-4 mr-2" />
              Agendar Reunião
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-amber-600"
            >
              <Phone className="h-4 w-4 mr-2" />
              Ligar Agora
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
