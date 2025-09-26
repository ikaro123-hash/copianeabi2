from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from django.utils import timezone
from django.utils.text import slugify
from datetime import timedelta
from core.models import UserProfile, Category, Tag, Post, Event


class Command(BaseCommand):
    help = 'Popula o banco de dados com dados de exemplo para teste'

    def handle(self, *args, **options):
        self.stdout.write(self.style.SUCCESS('🚀 Iniciando população de dados de exemplo...'))
        
        # Criar usuários
        self.create_users()
        
        # Criar categorias e tags
        self.create_categories_and_tags()
        
        # Criar posts
        self.create_posts()
        
        # Criar eventos
        self.create_events()
        
        self.stdout.write(self.style.SUCCESS('✅ Dados de exemplo criados com sucesso!'))
        self.stdout.write('📊 Resumo:')
        self.stdout.write(f'   - Usuários: {User.objects.count()}')
        self.stdout.write(f'   - Posts: {Post.objects.count()}')
        self.stdout.write(f'   - Eventos: {Event.objects.count()}')
        self.stdout.write(f'   - Categorias: {Category.objects.count()}')
        self.stdout.write(f'   - Tags: {Tag.objects.count()}')

    def create_users(self):
        """Criar usuários de exemplo"""
        if not User.objects.filter(username='admin').exists():
            admin_user = User.objects.create_user(
                username='admin',
                email='admin@neabi.edu.br',
                password='admin123',
                first_name='Admin',
                last_name='NEABI'
            )
            admin_user.userprofile.role = 'admin'
            admin_user.userprofile.save()
            self.stdout.write('✓ Usuário admin criado')

        if not User.objects.filter(username='leitor').exists():
            reader_user = User.objects.create_user(
                username='leitor',
                email='leitor@exemplo.com',
                password='leitor123',
                first_name='João',
                last_name='Silva'
            )
            reader_user.userprofile.role = 'reader'
            reader_user.userprofile.save()
            self.stdout.write('✓ Usuário leitor criado')

        # Criar mais alguns usuários para variedade
        authors_data = [
            ('dra.maria', 'maria@neabi.edu.br', 'Maria', 'Santos', 'admin'),
            ('prof.carlos', 'carlos@neabi.edu.br', 'Carlos', 'Oliveira', 'admin'),
            ('ana.pesquisadora', 'ana@neabi.edu.br', 'Ana', 'Costa', 'admin'),
        ]
        
        for username, email, first_name, last_name, role in authors_data:
            if not User.objects.filter(username=username).exists():
                user = User.objects.create_user(
                    username=username,
                    email=email,
                    password='senha123',
                    first_name=first_name,
                    last_name=last_name
                )
                user.userprofile.role = role
                user.userprofile.save()
                self.stdout.write(f'✓ Usuário {username} criado')

    def create_categories_and_tags(self):
        """Criar categorias e tags"""
        categories_data = [
            ('Educação Antirracista', 'educacao-antirracista', 'Artigos sobre práticas educativas antirracistas'),
            ('História Afro-brasileira', 'historia-afro-brasileira', 'Conteúdos sobre história e cultura afro-brasileira'),
            ('Diversidade e Inclusão', 'diversidade-inclusao', 'Discussões sobre diversidade e inclusão'),
            ('Pesquisa Acadêmica', 'pesquisa-academica', 'Resultados de pesquisas acadêmicas'),
            ('Políticas Afirmativas', 'politicas-afirmativas', 'Análises sobre políticas de ação afirmativa'),
            ('Cultura Indígena', 'cultura-indigena', 'Conteúdos sobre povos indígenas'),
        ]
        
        for name, slug, description in categories_data:
            category, created = Category.objects.get_or_create(
                slug=slug,
                defaults={'name': name, 'description': description}
            )
            if created:
                self.stdout.write(f'✓ Categoria "{name}" criada')

        tags_data = [
            'educação', 'diversidade', 'inclusão', 'história', 'cultura', 'pesquisa',
            'racismo', 'antirracismo', 'afrobrasileiro', 'indígena', 'quilombo',
            'cotas', 'universidade', 'ensino', 'literatura', 'arte', 'música',
            'capoeira', 'religião', 'resistência', 'identidade', 'sociedade'
        ]
        
        for tag_name in tags_data:
            tag, created = Tag.objects.get_or_create(
                slug=slugify(tag_name),
                defaults={'name': tag_name}
            )
            if created:
                self.stdout.write(f'✓ Tag "{tag_name}" criada')

    def create_posts(self):
        """Criar posts de exemplo"""
        admin_user = User.objects.get(username='admin')
        maria_user = User.objects.get(username='dra.maria')
        carlos_user = User.objects.get(username='prof.carlos')
        ana_user = User.objects.get(username='ana.pesquisadora')
        
        educacao_cat = Category.objects.get(slug='educacao-antirracista')
        historia_cat = Category.objects.get(slug='historia-afro-brasileira')
        diversidade_cat = Category.objects.get(slug='diversidade-inclusao')
        pesquisa_cat = Category.objects.get(slug='pesquisa-academica')
        politicas_cat = Category.objects.get(slug='politicas-afirmativas')
        
        posts_data = [
            {
                'title': 'A Importância da Representatividade na Educação Superior',
                'author': maria_user,
                'category': educacao_cat,
                'excerpt': 'Análise sobre como a diversidade étnico-racial impacta positivamente o ambiente acadêmico e a qualidade do ensino.',
                'content': '''A representatividade na educação superior não é apenas uma questão de justiça social, mas também um fator determinante para a qualidade do ensino e da pesquisa nas universidades brasileiras.

Quando estudantes de diferentes origens étnico-raciais ingressam no ensino superior, eles trazem consigo perspectivas únicas, experiências diversas e conhecimentos que enriquecem o ambiente acadêmico. Esta diversidade de olhares contribui para debates mais profundos, pesquisas mais abrangentes e soluções mais criativas para os desafios da sociedade.

As políticas de ação afirmativa, implementadas nas últimas décadas, têm demonstrado resultados positivos não apenas para os estudantes beneficiados, mas para toda a comunidade acadêmica. Estudos mostram que ambientes mais diversos estimulam o pensamento crítico e reduzem preconceitos.

É fundamental que as instituições de ensino superior continuem investindo em programas de inclusão e permanência, garantindo que a diversidade se traduza em oportunidades reais de desenvolvimento acadêmico e profissional para todos os estudantes.''',
                'featured': True,
                'status': 'published',
                'tags': ['diversidade', 'educação', 'universidade', 'inclusão']
            },
            {
                'title': 'Quilombos Urbanos: Resistência e Cultura nas Cidades Brasileiras',
                'author': carlos_user,
                'category': historia_cat,
                'excerpt': 'Explorando a presença e influência das comunidades quilombolas em contextos urbanos contemporâneos.',
                'content': '''Os quilombos urbanos representam uma faceta pouco conhecida da resistência afro-brasileira nas cidades. Estas comunidades, formadas por descendentes de quilombolas ou por grupos que adotaram práticas culturais quilombolas, mantêm vivas tradições ancestrais em meio ao ambiente urbano.

Diferente dos quilombos rurais, amplamente estudados pela historiografia, os quilombos urbanos enfrentam desafios específicos relacionados à especulação imobiliária, gentrificação e pressões do desenvolvimento urbano. Mesmo assim, conseguem preservar suas tradições culturais, práticas religiosas e formas de organização comunitária.

Estas comunidades desenvolveram estratégias únicas de resistência cultural, adaptando práticas tradicionais ao contexto urbano. A capoeira, o samba, as religiões de matriz africana e outras manifestações culturais encontram nos quilombos urbanos espaços de preservação e reinvenção.

O reconhecimento legal e a proteção destes territórios são fundamentais para a manutenção da diversidade cultural brasileira e para a garantia dos direitos das populações afrodescendentes nas cidades.''',
                'featured': True,
                'status': 'published',
                'tags': ['quilombo', 'cultura', 'resistência', 'história']
            },
            {
                'title': 'Literatura Afro-brasileira: Vozes que Ecoam na Contemporaneidade',
                'author': ana_user,
                'category': diversidade_cat,
                'excerpt': 'Um panorama da produção literária afro-brasileira contemporânea e sua importância para a representação cultural.',
                'content': '''A literatura afro-brasileira contemporânea vive um momento de efervescência, com autoras e autores negros ganhando visibilidade e reconhecimento no cenário literário nacional. Esta produção vai muito além da temática racial, abrangendo a complexidade da experiência humana sob a perspectiva afro-brasileira.

Escritoras como Conceição Evaristo, com seu conceito de "escrevivência", têm revolucionado a forma como compreendemos a literatura brasileira. Autores como Itamar Vieira Junior, vencedor do Prêmio Jabuti, demonstram a força narrativa que emerge das experiências afro-brasileiras.

Esta literatura não apenas conta histórias, mas reconstrói narrativas, questiona cânones estabelecidos e propõe novas formas de compreender a identidade brasileira. Temas como ancestralidade, memória, resistência e pertencimento permeiam estas obras, oferecendo perspectivas alternativas sobre a história e a sociedade brasileiras.

O crescimento do interesse editorial e acadêmico por esta produção reflete uma mudança importante no panorama cultural brasileiro, sinalizando o reconhecimento da diversidade como valor fundamental para a cultura nacional.''',
                'featured': True,
                'status': 'published',
                'tags': ['literatura', 'cultura', 'arte', 'identidade']
            },
            {
                'title': 'Metodologias Decoloniais na Pesquisa Acadêmica',
                'author': admin_user,
                'category': pesquisa_cat,
                'excerpt': 'Como incorporar perspectivas decoloniais nos métodos de pesquisa para uma ciência mais inclusiva e representativa.',
                'content': '''As metodologias decoloniais emergem como alternativa crítica aos paradigmas tradicionais de pesquisa, propondo abordagens que questionam a colonialidade do saber e valorizam conhecimentos historicamente marginalizados.

Esta perspectiva metodológica reconhece que os métodos de pesquisa não são neutros, mas carregam visões de mundo específicas que podem reproduzir relações de poder coloniais. Por isso, propõe a incorporação de epistemologias e metodologias próprias dos povos historicamente subalternizados.

Na prática, isso significa valorizar formas de conhecimento oral, narrativas comunitárias, saberes ancestrais e experiências vividas como fontes legítimas de conhecimento científico. Também implica repensar a relação entre pesquisador e pesquisado, buscando horizontalizar estas relações.

Pesquisadores que adotam metodologias decoloniais trabalham colaborativamente com as comunidades, garantindo que os benefícios da pesquisa retornem para os grupos estudados. Esta abordagem tem se mostrado particularmente relevante em estudos sobre comunidades indígenas, quilombolas e outros grupos tradicionalmente marginalizados pela academia.''',
                'featured': False,
                'status': 'published',
                'tags': ['pesquisa', 'metodologia', 'decolonial']
            },
            {
                'title': 'O Impacto das Cotas Universitárias após Duas Décadas',
                'author': maria_user,
                'category': politicas_cat,
                'excerpt': 'Avaliação dos resultados das políticas de cotas raciais e sociais nas universidades brasileiras.',
                'content': '''Passadas mais de duas décadas desde a implementação das primeiras políticas de cotas raciais nas universidades brasileiras, é possível avaliar os impactos transformadores desta política pública na educação superior do país.

Os dados demonstram que as cotas cumpriram seu objetivo de democratizar o acesso ao ensino superior. O percentual de estudantes pretos e pardos nas universidades federais saltou de menos de 12% em 2003 para mais de 50% em 2023, refletindo uma mudança substancial no perfil da população universitária.

Além do acesso, as cotas impactaram a permanência e o desempenho acadêmico. Contrariando críticas iniciais, pesquisas mostram que cotistas apresentam desempenho acadêmico similar ou superior ao de não-cotistas, especialmente quando há programas de apoio à permanência.

O impacto vai além dos números: a presença de estudantes de diferentes origens sociais e raciais transformou o ambiente universitário, enriqueceu debates acadêmicos e contribuiu para pesquisas mais diversas e socialmente relevantes.

Entretanto, desafios permanecem. A permanência ainda é um obstáculo, especialmente para estudantes de baixa renda. É necessário fortalecer políticas de assistência estudantil para garantir que o acesso se traduza em conclusão bem-sucedida dos cursos.''',
                'featured': False,
                'status': 'published',
                'tags': ['cotas', 'políticas', 'universidade', 'inclusão']
            },
            {
                'title': 'Capoeira na Educação: Pedagogia e Resistência',
                'author': carlos_user,
                'category': educacao_cat,
                'excerpt': 'A capoeira como ferramenta pedagógica para a educação antirracista e valorização da cultura afro-brasileira.',
                'content': '''A capoeira, reconhecida como Patrimônio Cultural Imaterial da Humanidade pela UNESCO, representa muito mais que uma manifestação cultural: é uma ferramenta pedagógica poderosa para a educação antirracista e a valorização da identidade afro-brasileira.

Nas escolas, a capoeira pode ser utilizada de forma interdisciplinar, conectando educação física, história, música, geografia e literatura. Através dos movimentos, cantos e rituais da capoeira, estudantes aprendem sobre a história da resistência africana no Brasil, desenvolvem consciência corporal e experimentam formas não-eurocêntricas de conhecimento.

A roda de capoeira ensina valores como respeito, cooperação e solidariedade. Diferente de modalidades competitivas, a capoeira prioriza o diálogo corporal e a expressão individual dentro de um contexto coletivo. Esta característica faz dela uma prática educativa única para o desenvolvimento de habilidades socioemocionais.

Projetos educacionais que incorporam a capoeira têm demonstrado resultados positivos no combate ao racismo, no fortalecimento da autoestima de crianças e jovens negros e na promoção do respeito à diversidade cultural.

Para que a capoeira cumpra seu potencial pedagógico, é fundamental que seja ensinada por mestres e professores que compreendam sua dimensão histórica e cultural, evitando apropriações superficiais que esvaziem seu significado político e cultural.''',
                'featured': False,
                'status': 'published',
                'tags': ['capoeira', 'educação', 'cultura', 'resistência']
            },
            {
                'title': 'Mulheres Negras na Ciência: Desafios e Conquistas',
                'author': ana_user,
                'category': diversidade_cat,
                'excerpt': 'Perfil das mulheres negras na produção científica brasileira e os obstáculos enfrentados na carreira acadêmica.',
                'content': '''As mulheres negras enfrentam múltiplas barreiras na carreira científica, resultado da intersecção entre racismo e sexismo que marca suas trajetórias acadêmicas. Apesar dos obstáculos, suas contribuições para a ciência brasileira são significativas e crescentes.

Dados do CNPq mostram que mulheres negras representam menos de 3% dos pesquisadores com bolsa produtividade, evidenciando a sub-representação deste grupo nos mais altos níveis da carreira científica. Esta disparidade reflete não apenas barreiras no acesso, mas também dificuldades de permanência e progressão na academia.

Os desafios incluem menor acesso a redes de colaboração científica, dificuldades de financiamento para pesquisas, questionamento constante da competência técnica e isolamento nos ambientes acadêmicos. Muitas relatam experiências de solidão acadêmica e necessidade de provar constantemente sua capacidade intelectual.

Apesar das dificuldades, mulheres negras têm produzido pesquisas inovadoras, especialmente em áreas como saúde da população negra, educação das relações étnico-raciais e estudos sobre desigualdades sociais. Suas pesquisas frequentemente conectam rigor científico com relevância social.

Iniciativas como redes de mulheres negras na ciência, programas de mentoria e políticas institucionais de diversidade têm contribuído para ampliar a presença e visibilidade deste grupo na academia. O reconhecimento de suas contribuições é fundamental para a construção de uma ciência mais diversa e democrática.''',
                'featured': False,
                'status': 'published',
                'tags': ['mulheres', 'ciência', 'diversidade', 'academia']
            },
            {
                'title': 'Religiões de Matriz Africana: Patrimônio e Resistência',
                'author': carlos_user,
                'category': historia_cat,
                'excerpt': 'A importância das religiões afro-brasileiras como patrimônio cultural e espaço de resistência.',
                'content': '''As religiões de matriz africana no Brasil representam um dos mais importantes patrimônios culturais e espirituais do país, constituindo espaços fundamentais de preservação de tradições ancestrais e resistência cultural.

O Candomblé, a Umbanda, o Batuque, a Jurema e outras tradições religiosas afro-brasileiras mantêm vivas cosmologias, práticas rituais, conhecimentos sobre plantas medicinais e formas de organização social que conectam o Brasil contemporâneo com suas raízes africanas.

Estas tradições enfrentaram e continuam enfrentando perseguições históricas. Durante o período escravista e nas primeiras décadas republicanas, foram criminalizadas e reprimidas violentamente. Mesmo após a liberdade religiosa garantida constitucionalmente, sofrem com intolerância religiosa e discriminação.

Os terreiros funcionam como centros comunitários que vão além da dimensão religiosa, oferecendo suporte social, preservando tradições orais, desenvolvendo práticas de cura tradicional e mantendo vínculos com comunidades de origem africana.

O reconhecimento das religiões de matriz africana como patrimônio cultural imaterial tem avançado, com tombamentos de terreiros históricos e políticas de proteção. Entretanto, ainda há muito a fazer para garantir plena liberdade religiosa e combater a intolerância.

A valorização destas tradições é fundamental não apenas para as comunidades praticantes, mas para toda a sociedade brasileira, pois representa o reconhecimento da diversidade cultural como fundamento da identidade nacional.''',
                'featured': False,
                'status': 'published',
                'tags': ['religião', 'cultura', 'resistência', 'patrimônio']
            },
            {
                'title': 'Tecnologia e Inclusão Digital para Comunidades Tradicionais',
                'author': admin_user,
                'category': diversidade_cat,
                'excerpt': 'Como a tecnologia pode ser aliada na preservação cultural e desenvolvimento de comunidades quilombolas e indígenas.',
                'content': '''A inclusão digital representa uma oportunidade única para comunidades tradicionais quilombolas e indígenas fortalecerem sua identidade cultural, ampliarem oportunidades econômicas e garantirem a transmissão de conhecimentos ancestrais para futuras gerações.

Projetos de inclusão digital nestas comunidades têm demonstrado resultados promissores quando respeitam especificidades culturais e são desenvolvidos participativamente. A tecnologia deixa de ser vista como ameaça à tradição e passa a ser ferramenta de preservação e divulgação cultural.

Iniciativas como criação de bibliotecas digitais de línguas indígenas, plataformas de comercialização de produtos tradicionais e redes sociais comunitárias têm empoderado estas comunidades. Jovens indígenas e quilombolas utilizam as tecnologias para documentar práticas culturais, conectar-se com outras comunidades e amplificar suas vozes.

A telemedicina tem se mostrado especialmente importante para comunidades isoladas, permitindo acesso a atendimento médico especializado sem necessidade de longos deslocamentos. Plataformas educacionais adaptadas contribuem para a educação diferenciada, respeitando pedagogias próprias.

Entretanto, a inclusão digital deve ser acompanhada de políticas que garantam infraestrutura adequada, formação técnica contextualizada e respeito à autonomia comunitária. O objetivo é que as tecnologias sejam apropriadas pelos próprios grupos, servindo a seus projetos de vida e visões de desenvolvimento.''',
                'featured': False,
                'status': 'draft',
                'tags': ['tecnologia', 'inclusão', 'comunidades', 'tradicionais']
            }
        ]
        
        for post_data in posts_data:
            post, created = Post.objects.get_or_create(
                slug=slugify(post_data['title']),
                defaults={
                    'title': post_data['title'],
                    'author': post_data['author'],
                    'category': post_data['category'],
                    'excerpt': post_data['excerpt'],
                    'content': post_data['content'],
                    'featured': post_data['featured'],
                    'status': post_data['status'],
                    'publication_date': timezone.now() - timedelta(days=len(posts_data) - posts_data.index(post_data)),
                    'views': __import__('random').randint(50, 500)
                }
            )
            
            if created:
                # Adicionar tags
                for tag_name in post_data['tags']:
                    tag = Tag.objects.get(slug=slugify(tag_name))
                    post.tags.add(tag)
                
                self.stdout.write(f'✓ Post "{post_data["title"][:50]}..." criado')

    def create_events(self):
        """Criar eventos de exemplo"""
        admin_user = User.objects.get(username='admin')
        
        now = timezone.now()
        
        events_data = [
            {
                'title': 'Mesa Redonda: Mulheres Negras na Ciência',
                'description': '''Uma discussão profunda sobre os desafios e conquistas das mulheres negras no ambiente acadêmico e científico brasileiro.

O evento contará com a participação de pesquisadoras negras de diferentes áreas do conhecimento, que compartilharão suas experiências, trajetórias e pesquisas. Será uma oportunidade única para debater questões como representatividade, equidade de gênero e raça na ciência, e estratégias para ampliar a participação de mulheres negras na pesquisa científica.

A mesa redonda também abordará temas como financiamento de pesquisas, redes de colaboração acadêmica e a importância da diversidade para a inovação científica.''',
                'start_date': now + timedelta(days=5),
                'end_date': now + timedelta(days=5, hours=3),
                'location': 'Auditório Principal',
                'organizer': 'NEABI',
                'speakers': 'Dra. Maria Santos, Dra. Ana Costa, Dra. Juliana Oliveira',
                'event_type': 'presencial',
                'visibility': 'public',
                'capacity': 200,
                'registered': 156,
                'featured': True,
                'price': 'Gratuito',
                'tags': ['mulheres', 'ciência', 'diversidade']
            },
            {
                'title': 'Workshop: Capoeira e Resistência Cultural',
                'description': '''Workshop prático sobre capoeira como manifestação de resistência cultural e ferramenta pedagógica.

Participantes aprenderão movimentos básicos da capoeira, conhecerão sua história e importância cultural, e discutirão como esta arte pode ser utilizada em contextos educacionais para promover a educação antirracista.

O workshop será conduzido por mestres de capoeira reconhecidos e educadores especialistas em cultura afro-brasileira.''',
                'start_date': now + timedelta(days=12),
                'end_date': now + timedelta(days=12, hours=4),
                'location': 'Quadra Poliesportiva',
                'organizer': 'NEABI em parceria com Grupo Capoeira Resistência',
                'speakers': 'Mestre João, Professora Carla, Contramestre Pedro',
                'event_type': 'presencial',
                'visibility': 'public',
                'capacity': 50,
                'registered': 35,
                'featured': True,
                'price': 'Gratuito',
                'tags': ['capoeira', 'cultura', 'workshop']
            },
            {
                'title': 'Seminário: Educação Antirracista na Prática',
                'description': '''Seminário voltado para educadores interessados em implementar práticas antirracistas em suas atividades pedagógicas.

O evento apresentará metodologias, recursos didáticos e estratégias para abordar questões étnico-raciais no ambiente educacional, promovendo uma educação mais inclusiva e igualitária.

Serão apresentadas experiências exitosas de escolas e professores que implementaram práticas antirracistas, bem como materiais didáticos e recursos pedagógicos disponíveis.''',
                'start_date': now + timedelta(days=25),
                'end_date': now + timedelta(days=25, hours=6),
                'location': 'Centro de Convenções',
                'organizer': 'NEABI e Secretaria de Educação',
                'speakers': 'Prof. Carlos Oliveira, Dra. Maria Santos, Equipe Pedagógica NEABI',
                'event_type': 'hibrido',
                'visibility': 'public',
                'capacity': 300,
                'registered': 245,
                'featured': False,
                'price': 'Gratuito',
                'tags': ['educação', 'antirracismo', 'seminário']
            },
            {
                'title': 'Conferência: O Futuro das Políticas Afirmativas',
                'description': '''Conferência nacional sobre os rumos das políticas de ação afirmativa no Brasil, com especialistas de todo o país.

O evento debaterá os avanços conquistados, desafios atuais e perspectivas futuras das políticas afirmativas no ensino superior, mercado de trabalho e outras áreas.

Será uma oportunidade para pesquisadores, gestores públicos, ativistas e estudantes discutirem estratégias para consolidar e ampliar as conquistas das políticas de ação afirmativa.''',
                'start_date': now + timedelta(days=40),
                'end_date': now + timedelta(days=41, hours=8),
                'location': 'Auditório Magna',
                'organizer': 'NEABI e Consórcio Nacional de Núcleos de Estudos Afro-brasileiros',
                'speakers': 'Dr. Antônio Silva, Dra. Conceição Santos, Dr. Paulo Mendes, Dra. Lucia Rodrigues',
                'event_type': 'hibrido',
                'visibility': 'public',
                'capacity': 500,
                'registered': 234,
                'featured': False,
                'price': 'Gratuito',
                'tags': ['políticas', 'conferência', 'ação afirmativa']
            },
            {
                'title': 'Oficina: Literatura Afro-brasileira Contemporânea',
                'description': '''Oficina de criação literária focada na literatura afro-brasileira contemporânea.

Participantes conhecerão obras e autores representativos da literatura afro-brasileira atual, técnicas narrativas e temáticas características, além de desenvolverem seus próprios textos.

A oficina é voltada para escritores iniciantes, estudantes de letras e interessados em literatura brasileira.''',
                'start_date': now + timedelta(days=18),
                'end_date': now + timedelta(days=18, hours=5),
                'location': 'Biblioteca Central - Sala de Estudos',
                'organizer': 'NEABI e Curso de Letras',
                'speakers': 'Escritor Marcos Tavares, Professora Ana Costa',
                'event_type': 'presencial',
                'visibility': 'public',
                'capacity': 30,
                'registered': 28,
                'featured': False,
                'price': 'Gratuito',
                'tags': ['literatura', 'oficina', 'escrita']
            },
            {
                'title': 'Reunião Interna: Planejamento 2025',
                'description': 'Reunião interna da equipe NEABI para planejamento das atividades do próximo ano.',
                'start_date': now + timedelta(days=7),
                'end_date': now + timedelta(days=7, hours=3),
                'location': 'Sala NEABI',
                'organizer': 'Coordenação NEABI',
                'speakers': 'Equipe NEABI',
                'event_type': 'presencial',
                'visibility': 'private',
                'capacity': 15,
                'registered': 12,
                'featured': False,
                'price': 'Interno',
                'tags': ['reunião', 'planejamento']
            }
        ]
        
        for event_data in events_data:
            event, created = Event.objects.get_or_create(
                slug=slugify(event_data['title']),
                defaults={
                    'title': event_data['title'],
                    'description': event_data['description'],
                    'start_date': event_data['start_date'],
                    'end_date': event_data['end_date'],
                    'location': event_data['location'],
                    'organizer': event_data['organizer'],
                    'speakers': event_data['speakers'],
                    'event_type': event_data['event_type'],
                    'visibility': event_data['visibility'],
                    'capacity': event_data['capacity'],
                    'registered': event_data['registered'],
                    'featured': event_data['featured'],
                    'price': event_data['price'],
                    'status': 'upcoming'
                }
            )
            
            if created:
                # Adicionar tags
                for tag_name in event_data['tags']:
                    tag = Tag.objects.get(slug=slugify(tag_name))
                    event.tags.add(tag)
                
                self.stdout.write(f'✓ Evento "{event_data["title"][:50]}..." criado')
