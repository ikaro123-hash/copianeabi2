from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from django.utils import timezone
from core.models import Category, Tag, BlogPost, Event
import random

User = get_user_model()

class Command(BaseCommand):
    help = 'Setup initial NEABI data with sample posts and events'

    def add_arguments(self, parser):
        parser.add_argument(
            '--reset',
            action='store_true',
            help='Reset all data before creating new content',
        )

    def handle(self, *args, **options):
        if options['reset']:
            self.stdout.write('Resetting all data...')
            BlogPost.objects.all().delete()
            Event.objects.all().delete()
            Category.objects.all().delete()
            Tag.objects.all().delete()
            User.objects.filter(is_superuser=False).delete()

        self.stdout.write('Setting up NEABI initial data...')

        # Create users
        admin_user, created = User.objects.get_or_create(
            username='admin',
            email='admin@neabi.edu.br',
            defaults={
                'first_name': 'Administrador',
                'last_name': 'NEABI',
                'role': 'admin',
                'is_staff': True,
                'is_superuser': True,
            }
        )
        if created:
            admin_user.set_password('admin123')
            admin_user.save()
            self.stdout.write(f'Created admin user: {admin_user.email}')

        reader_user, created = User.objects.get_or_create(
            username='leitor',
            email='leitor@neabi.edu.br',
            defaults={
                'first_name': 'Usuário',
                'last_name': 'Leitor',
                'role': 'reader',
            }
        )
        if created:
            reader_user.set_password('leitor123')
            reader_user.save()
            self.stdout.write(f'Created reader user: {reader_user.email}')

        # Create categories
        categories_data = [
            {
                'name': 'Educação',
                'description': 'Artigos sobre educação e diversidade',
            },
            {
                'name': 'Cultura',
                'description': 'Cultura afro-brasileira e indígena',
            },
            {
                'name': 'Ciência',
                'description': 'Pesquisas e descobertas científicas',
            },
            {
                'name': 'Literatura',
                'description': 'Literatura afrodiaspórica',
            },
            {
                'name': 'Política',
                'description': 'Políticas públicas e ações afirmativas',
            },
            {
                'name': 'Religião',
                'description': 'Religiões de matriz africana',
            },
            {
                'name': 'Arte',
                'description': 'Arte e expressões culturais',
            },
            {
                'name': 'Sociedade',
                'description': 'Questões sociais e inclusão',
            },
        ]

        categories = []
        for cat_data in categories_data:
            category, created = Category.objects.get_or_create(
                name=cat_data['name'],
                defaults={'description': cat_data['description']}
            )
            categories.append(category)
            if created:
                self.stdout.write(f'Created category: {category.name}')

        # Create tags
        tags_data = [
            'representatividade', 'quilombos', 'povos indígenas', 'literatura',
            'políticas afirmativas', 'mulheres negras', 'resistência',
            'cultura afro-brasileira', 'conhecimento tradicional', 'sustentabilidade',
            'diáspora africana', 'identidade', 'universidade', 'inclusão',
            'religião', 'candomblé', 'umbanda', 'ciência', 'protagonismo feminino',
            'ancestralidade', 'expressão cultural', 'juventude negra',
            'mercado de trabalho', 'oportunidades', 'antirracismo', 'metodologia'
        ]

        tags = []
        for tag_name in tags_data:
            tag, created = Tag.objects.get_or_create(name=tag_name)
            tags.append(tag)
            if created:
                self.stdout.write(f'Created tag: {tag.name}')

        # Create sample blog posts
        posts_data = [
            {
                'title': 'A Importância da Representatividade na Educação Superior',
                'excerpt': 'Reflexões sobre como a diversidade étnico-racial transforma o ambiente universitário e contribui para uma educação mais inclusiva.',
                'content': '''
                <p>A representatividade na educação superior não é apenas uma questão de justiça social, mas uma necessidade fundamental para o desenvolvimento de uma sociedade mais igualitária e diversa.</p>
                
                <p>Quando estudantes negros e indígenas ocupam os espaços universitários, eles trazem consigo suas experiências, conhecimentos ancestrais e perspectivas únicas que enriquecem o ambiente acadêmico para todos.</p>
                
                <h3>O Impacto das Políticas Afirmativas</h3>
                <p>As políticas de ações afirmativas têm sido fundamentais para ampliar o acesso de grupos historicamente excluídos ao ensino superior. Desde a implementação da Lei de Cotas em 2012, observamos um aumento significativo na presença de estudantes negros, pardos e indígenas nas universidades brasileiras.</p>
                
                <p>Essa mudança não apenas beneficia os estudantes contemplados, mas transforma toda a dinâmica universitária, promovendo debates mais ricos e uma compreensão mais ampla da realidade brasileira.</p>
                
                <h3>Desafios e Perspectivas</h3>
                <p>Apesar dos avanços, ainda enfrentamos desafios significativos. A permanência estudantil, o combate ao racismo institucional e a criação de ambientes verdadeiramente inclusivos são questões que demandam atenção contínua.</p>
                
                <p>É fundamental que as instituições de ensino superior não apenas garantam o acesso, mas também criem condições para que todos os estudantes possam se desenvolver plenamente em sua trajetória acadêmica.</p>
                ''',
                'category': categories[0],  # Educação
                'tags': [tags[0], tags[4], tags[12]],  # representatividade, políticas afirmativas, universidade
                'featured': True,
            },
            {
                'title': 'Conhecimentos Tradicionais Indígenas e Sustentabilidade',
                'excerpt': 'Como os saberes ancestrais dos povos indígenas podem contribuir para soluções sustentáveis na contemporaneidade.',
                'content': '''
                <p>Os povos indígenas do Brasil possuem um acervo milenar de conhecimentos sobre o meio ambiente, práticas sustentáveis e manejo de recursos naturais que podem oferecer soluções valiosas para os desafios ambientais contemporâneos.</p>
                
                <p>Esses conhecimentos, transmitidos de geração em geração, representam uma forma única de compreender e interagir com a natureza, baseada no respeito e na harmonia com o meio ambiente.</p>
                
                <h3>Sistemas Agroflorestais Tradicionais</h3>
                <p>Os sistemas agroflorestais desenvolvidos pelos povos indígenas são exemplos notáveis de práticas sustentáveis. Essas técnicas permitem a produção de alimentos enquanto preservam a biodiversidade e mantêm a saúde dos ecossistemas.</p>
                
                <h3>Medicina Tradicional</h3>
                <p>O conhecimento sobre plantas medicinais representa outro aspecto fundamental da sabedoria indígena. Muitos medicamentos modernos têm origem em plantas utilizadas tradicionalmente por esses povos.</p>
                
                <p>É essencial reconhecer, valorizar e proteger esses conhecimentos, garantindo que os povos indígenas sejam protagonistas nos processos de discussão sobre sustentabilidade e preservação ambiental.</p>
                ''',
                'category': categories[2],  # Ciência
                'tags': [tags[2], tags[8], tags[9]],  # povos indígenas, conhecimento tradicional, sustentabilidade
                'featured': False,
            },
            {
                'title': 'Literatura Afro-brasileira: Vozes que Ecoam Resistência',
                'excerpt': 'Um panorama da rica produção literária afro-brasileira e seu papel na construção da identidade e resistência cultural.',
                'content': '''
                <p>A literatura afro-brasileira representa uma das mais ricas expressões da cultura nacional, sendo veículo fundamental para a preservação da memória, da identidade e da resistência dos povos africanos e seus descendentes no Brasil.</p>
                
                <p>Desde os tempos coloniais até a contemporaneidade, autores afro-brasileiros têm utilizado a literatura como forma de denúncia, celebração e construção de narrativas que desafiam estereótipos e afirmam a dignidade de seu povo.</p>
                
                <h3>Marcos Históricos</h3>
                <p>Autores como Machado de Assis, Lima Barreto e Maria Firmina dos Reis foram pioneiros em abordar questões raciais em suas obras, muitas vezes de forma sutil devido às limitações de sua época.</p>
                
                <h3>A Nova Geração</h3>
                <p>Atualmente, autores como Conceição Evaristo, Djamila Ribeiro, Eliana Alves Cruz e muitos outros têm dado continuidade a essa tradição, trazendo novas perspectivas e abordagens para a literatura brasileira.</p>
                
                <p>Suas obras não apenas enriquecem o panorama literário nacional, mas também contribuem para a formação de uma consciência crítica sobre questões raciais e sociais no Brasil.</p>
                ''',
                'category': categories[3],  # Literatura
                'tags': [tags[3], tags[6], tags[10]],  # literatura, resistência, diáspora africana
                'featured': True,
            },
            {
                'title': 'Mulheres Negras na Ciência: Quebrando Barreiras',
                'excerpt': 'O protagonismo feminino negro na produção científica brasileira e os desafios enfrentados para alcançar reconhecimento.',
                'content': '''
                <p>As mulheres negras na ciência enfrentam uma dupla barreira: o machismo e o racismo. Apesar dessas dificuldades, muitas têm se destacado em diversas áreas do conhecimento, contribuindo significativamente para o avanço científico brasileiro.</p>
                
                <p>É fundamental reconhecer e valorizar essas contribuições, bem como trabalhar para derrubar as barreiras que ainda impedem o pleno desenvolvimento de talentos femininos negros na ciência.</p>
                
                <h3>Pioneiras e Referências</h3>
                <p>Mulheres como Sônia Guimarães, primeira mulher negra a se tornar doutora em Física no Brasil, e Joana D'Arc Félix de Sousa, referência em Química, pavimentaram o caminho para futuras gerações.</p>
                
                <h3>Desafios Atuais</h3>
                <p>Ainda hoje, mulheres negras estão sub-representadas em posições de liderança científica e enfrentam dificuldades para acessar recursos de pesquisa e reconhecimento profissional.</p>
                
                <p>Iniciativas de apoio e programas de incentivo são fundamentais para reverter esse quadro e garantir que o talento científico seja reconhecido independentemente de gênero ou cor.</p>
                ''',
                'category': categories[2],  # Ciência
                'tags': [tags[5], tags[17], tags[18]],  # mulheres negras, ciência, protagonismo feminino
                'featured': False,
            },
            {
                'title': 'Religiões de Matriz Africana: Patrimônio Cultural Brasileiro',
                'excerpt': 'A riqueza espiritual e cultural das religiões afro-brasileiras e sua contribuição para a formação da identidade nacional.',
                'content': '''
                <p>As religiões de matriz africana no Brasil representam um patrimônio cultural inestimável, preservando tradições, valores e conhecimentos ancestrais que resistiram séculos de perseguição e preconceito.</p>
                
                <p>O Candomblé, a Umbanda e outras manifestações religiosas afro-brasileiras são expressões autênticas da diversidade espiritual brasileira e merecem respeito e proteção.</p>
                
                <h3>Resistência e Preservação</h3>
                <p>Durante séculos, essas religiões foram praticadas em segredo, desenvolvendo estratégias de resistência que permitiram sua sobrevivência até os dias atuais.</p>
                
                <p>O sincretismo religioso, longe de representar uma simples mistura, constitui uma sofisticada forma de preservação cultural que permitiu a manutenção de tradições africanas em solo brasileiro.</p>
                
                <h3>Contribuições Culturais</h3>
                <p>Além da dimensão espiritual, essas religiões contribuíram enormemente para a música, dança, culinária e farmacologia brasileiras, influenciando profundamente a cultura nacional.</p>
                
                <p>É fundamental combater a intolerância religiosa e garantir o direito à liberdade de culto, reconhecendo a importância dessas tradições para a diversidade cultural brasileira.</p>
                ''',
                'category': categories[5],  # Religião
                'tags': [tags[14], tags[15], tags[16]],  # religião, candomblé, umbanda
                'featured': False,
            },
        ]

        for i, post_data in enumerate(posts_data):
            post, created = BlogPost.objects.get_or_create(
                title=post_data['title'],
                defaults={
                    'excerpt': post_data['excerpt'],
                    'content': post_data['content'],
                    'author': admin_user,
                    'category': post_data['category'],
                    'featured': post_data['featured'],
                    'views': random.randint(50, 500),
                    'likes': random.randint(5, 50),
                    'published_date': timezone.now() - timezone.timedelta(days=random.randint(1, 30)),
                }
            )
            if created:
                post.tags.set(post_data['tags'])
                self.stdout.write(f'Created blog post: {post.title}')

        # Create sample events
        events_data = [
            {
                'title': 'Semana da Consciência Negra 2024',
                'description': 'Uma semana dedicada à reflexão sobre a importância da cultura afro-brasileira na formação da sociedade brasileira. Palestras, oficinas e apresentações culturais.',
                'date': timezone.now().date() + timezone.timedelta(days=30),
                'start_time': '08:00',
                'end_time': '18:00',
                'location': 'Auditório Central da Universidade',
                'category': 'Educação',
                'event_type': 'presencial',
                'capacity': 200,
                'organizer': 'NEABI',
                'speakers': 'Dr. João Silva, Profa. Maria Santos, Pesquisador Carlos Oliveira',
                'featured': True,
                'price': 'Gratuito',
            },
            {
                'title': 'Mesa Redonda: Políticas Afirmativas no Ensino Superior',
                'description': 'Debate sobre os impactos e desafios das políticas de ações afirmativas nas universidades brasileiras.',
                'date': timezone.now().date() + timezone.timedelta(days=15),
                'start_time': '14:00',
                'end_time': '17:00',
                'location': 'Sala de Conferências 101',
                'category': 'Política',
                'event_type': 'hibrido',
                'capacity': 80,
                'organizer': 'NEABI em parceria com PROGRAD',
                'speakers': 'Dra. Ana Lúcia, Prof. Roberto Mendes, Ativista Social Mariana Costa',
                'featured': False,
                'price': 'Gratuito',
            },
            {
                'title': 'Oficina de Literatura Afro-brasileira',
                'description': 'Oficina prática de escrita criativa focada na literatura afro-brasileira contemporânea.',
                'date': timezone.now().date() + timezone.timedelta(days=7),
                'start_time': '09:00',
                'end_time': '12:00',
                'location': 'Biblioteca Central - Sala de Estudos',
                'category': 'Cultura',
                'event_type': 'presencial',
                'capacity': 25,
                'organizer': 'NEABI e Curso de Letras',
                'speakers': 'Escritora Fernanda Nascimento, Prof. Dr. Luis Carlos',
                'featured': True,
                'price': 'Gratuito',
            },
        ]

        for event_data in events_data:
            event, created = Event.objects.get_or_create(
                title=event_data['title'],
                defaults={
                    'description': event_data['description'],
                    'date': event_data['date'],
                    'start_time': event_data['start_time'],
                    'end_time': event_data['end_time'],
                    'location': event_data['location'],
                    'category': event_data['category'],
                    'event_type': event_data['event_type'],
                    'capacity': event_data['capacity'],
                    'organizer': event_data['organizer'],
                    'speakers': event_data['speakers'],
                    'featured': event_data['featured'],
                    'price': event_data['price'],
                    'registered': random.randint(5, event_data['capacity'] // 2),
                }
            )
            if created:
                # Add some random tags to events
                event_tags = random.sample(tags, random.randint(2, 5))
                event.tags.set(event_tags)
                self.stdout.write(f'Created event: {event.title}')

        self.stdout.write(
            self.style.SUCCESS('Successfully set up NEABI initial data!')
        )
        self.stdout.write('\nLogin credentials:')
        self.stdout.write('Admin: admin@neabi.edu.br / admin123')
        self.stdout.write('Reader: leitor@neabi.edu.br / leitor123')
