import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

interface NewsPost {
  id: number;
  title: string;
  content: string;
  date: string;
  comments: Comment[];
}

interface Comment {
  id: number;
  author: string;
  text: string;
  date: string;
}

interface Server {
  id: number;
  name: string;
  online: number;
  maxPlayers: number;
  status: 'online' | 'offline';
}

export default function Index() {
  const [activeTab, setActiveTab] = useState('home');
  const [newComment, setNewComment] = useState('');
  const [selectedNews, setSelectedNews] = useState<number | null>(null);

  const servers: Server[] = [
    { id: 1, name: 'CRMP #1 Аризона', online: 487, maxPlayers: 500, status: 'online' },
    { id: 2, name: 'CRMP #2 Феникс', online: 423, maxPlayers: 500, status: 'online' },
    { id: 3, name: 'CRMP #3 Тестовый', online: 0, maxPlayers: 100, status: 'offline' },
  ];

  const [news, setNews] = useState<NewsPost[]>([
    {
      id: 1,
      title: 'Обновление 2.5: Новые гонки',
      content: 'Добавили 15 новых гоночных трасс по всему штату! Соревнуйтесь с друзьями и зарабатывайте награды.',
      date: '15.10.2024',
      comments: [
        { id: 1, author: 'Игрок123', text: 'Крутое обновление!', date: '15.10.2024' },
        { id: 2, author: 'ProGamer', text: 'Когда фикс багов с машинами?', date: '15.10.2024' },
      ],
    },
    {
      id: 2,
      title: 'Акция: x2 опыт на выходных',
      content: 'С пятницы по воскресенье получайте двойной опыт за все действия! Не упустите шанс прокачаться.',
      date: '12.10.2024',
      comments: [
        { id: 1, author: 'Newbie', text: 'Отлично! Наконец-то подниму уровень', date: '12.10.2024' },
      ],
    },
  ]);

  const rules = [
    { id: 1, title: 'Запрет читов', description: 'Использование читов карается перманентным баном' },
    { id: 2, title: 'Уважение игроков', description: 'Оскорбления и токсичное поведение запрещены' },
    { id: 3, title: 'РП отыгровка', description: 'Соблюдайте ролевую игру и не нарушайте реализм' },
    { id: 4, title: 'Запрет рекламы', description: 'Реклама сторонних серверов запрещена' },
  ];

  const vacancies = [
    { id: 1, position: 'Модератор', requirements: 'Опыт работы от 3 месяцев, возраст 18+', status: 'open' },
    { id: 2, position: 'Разработчик', requirements: 'Знание PAWN, опыт с SA-MP', status: 'open' },
    { id: 3, position: 'Дизайнер', requirements: 'Портфолио обязательно', status: 'closed' },
  ];

  const donatePackages = [
    { id: 1, name: 'Стартовый', price: 299, features: ['1000 игровой валюты', 'VIP статус на 7 дней'] },
    { id: 2, name: 'Продвинутый', price: 799, features: ['3000 игровой валюты', 'VIP статус на 30 дней', 'Уникальный скин'] },
    { id: 3, name: 'Премиум', price: 1999, features: ['10000 игровой валюты', 'VIP+ статус на 90 дней', '3 уникальных скина', 'Приватный дом'] },
  ];

  const handleAddComment = (newsId: number) => {
    if (!newComment.trim()) return;
    
    setNews(prevNews => 
      prevNews.map(post => 
        post.id === newsId 
          ? {
              ...post,
              comments: [
                ...post.comments,
                {
                  id: post.comments.length + 1,
                  author: 'Гость',
                  text: newComment,
                  date: new Date().toLocaleDateString('ru-RU'),
                },
              ],
            }
          : post
      )
    );
    setNewComment('');
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <header className="sticky top-0 z-50 border-b border-primary/20 bg-[#0a0a0a]/95 backdrop-blur">
        <div className="container mx-auto px-4">
          <div className="flex h-20 items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-12 w-12 rounded bg-gradient-to-br from-primary via-accent to-secondary flex items-center justify-center">
                <Icon name="Gamepad2" className="text-background" size={24} />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                CRMP CITY
              </span>
            </div>
            <nav className="hidden md:flex gap-6">
              <Button 
                variant={activeTab === 'home' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('home')}
                className="text-base"
              >
                Главная
              </Button>
              <Button 
                variant={activeTab === 'rules' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('rules')}
                className="text-base"
              >
                Правила
              </Button>
              <Button 
                variant={activeTab === 'forum' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('forum')}
                className="text-base"
              >
                Форум
              </Button>
              <Button 
                variant={activeTab === 'donate' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('donate')}
                className="text-base"
              >
                Донат
              </Button>
              <Button 
                variant={activeTab === 'vacancies' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('vacancies')}
                className="text-base"
              >
                Вакансии
              </Button>
              <Button 
                variant={activeTab === 'servers' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('servers')}
                className="text-base"
              >
                Сервера
              </Button>
            </nav>
            <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90">
              Играть
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {activeTab === 'home' && (
          <div className="space-y-12">
            <section className="relative h-[600px] overflow-hidden rounded-xl">
              <img 
                src="https://cdn.poehali.dev/projects/03cf9b8f-e8d7-4bdd-8aa4-4501ed2c60b9/files/8984130a-4fc3-4fb9-8d54-5fd57cc40966.jpg" 
                alt="Hero" 
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent" />
              <div className="relative flex h-full flex-col items-center justify-center text-center px-4">
                <h1 className="text-6xl md:text-8xl mb-6 font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent animate-fade-in">
                  CRMP CITY
                </h1>
                <p className="text-xl md:text-2xl mb-8 text-muted-foreground max-w-2xl">
                  Лучший ролевой сервер в San Andreas. Начни свою историю прямо сейчас!
                </p>
                <div className="flex gap-4">
                  <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-lg px-8">
                    <Icon name="Play" size={20} className="mr-2" />
                    Начать играть
                  </Button>
                  <Button size="lg" variant="outline" className="text-lg px-8 border-primary text-primary hover:bg-primary hover:text-background">
                    <Icon name="Info" size={20} className="mr-2" />
                    Подробнее
                  </Button>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-4xl mb-6 text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Мониторинг серверов
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {servers.map((server) => (
                  <Card key={server.id} className="bg-card border-primary/20 hover:border-primary/40 transition-all hover:scale-105">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-xl">{server.name}</CardTitle>
                        <Badge variant={server.status === 'online' ? 'default' : 'destructive'} className="bg-primary">
                          {server.status === 'online' ? 'Онлайн' : 'Оффлайн'}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Игроков:</span>
                          <span className="text-2xl font-bold text-primary">{server.online}/{server.maxPlayers}</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all" 
                            style={{ width: `${(server.online / server.maxPlayers) * 100}%` }}
                          />
                        </div>
                        <Button className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90">
                          Подключиться
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-4xl mb-6 text-center bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                Новости и обновления
              </h2>
              <div className="space-y-6">
                {news.map((post) => (
                  <Card key={post.id} className="bg-card border-secondary/20 hover:border-secondary/40 transition-all">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-2xl mb-2">{post.title}</CardTitle>
                          <p className="text-sm text-muted-foreground">{post.date}</p>
                        </div>
                        <Icon name="Newspaper" className="text-secondary" size={32} />
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-lg">{post.content}</p>
                      
                      <div className="space-y-4 pt-4 border-t border-border">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Icon name="MessageSquare" size={20} />
                          <span className="font-semibold">Комментарии ({post.comments.length})</span>
                        </div>
                        
                        <div className="space-y-3">
                          {post.comments.map((comment) => (
                            <div key={comment.id} className="bg-muted/50 rounded-lg p-4">
                              <div className="flex items-center justify-between mb-2">
                                <span className="font-semibold text-primary">{comment.author}</span>
                                <span className="text-xs text-muted-foreground">{comment.date}</span>
                              </div>
                              <p className="text-sm">{comment.text}</p>
                            </div>
                          ))}
                        </div>

                        <div className="flex gap-2">
                          <Input 
                            placeholder="Написать комментарий..."
                            value={selectedNews === post.id ? newComment : ''}
                            onChange={(e) => {
                              setSelectedNews(post.id);
                              setNewComment(e.target.value);
                            }}
                            className="flex-1"
                          />
                          <Button 
                            onClick={() => handleAddComment(post.id)}
                            className="bg-secondary hover:bg-secondary/90"
                          >
                            <Icon name="Send" size={20} />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeTab === 'rules' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <h2 className="text-5xl text-center mb-8 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Правила сервера
            </h2>
            <div className="grid gap-6">
              {rules.map((rule) => (
                <Card key={rule.id} className="bg-card border-primary/20 hover:border-primary/40 transition-all">
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                        {rule.id}
                      </div>
                      {rule.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg text-muted-foreground">{rule.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'forum' && (
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl text-center mb-8 bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">
              Форум
            </h2>
            <Card className="bg-card border-accent/20">
              <CardContent className="py-12 text-center">
                <Icon name="MessageCircle" size={64} className="mx-auto mb-4 text-accent" />
                <p className="text-xl text-muted-foreground">Форум в разработке</p>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'donate' && (
          <div className="max-w-6xl mx-auto space-y-8">
            <h2 className="text-5xl text-center mb-8 bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
              Поддержать проект
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {donatePackages.map((pkg) => (
                <Card key={pkg.id} className="bg-card border-secondary/20 hover:border-secondary/40 transition-all hover:scale-105">
                  <CardHeader>
                    <CardTitle className="text-2xl text-center">{pkg.name}</CardTitle>
                    <div className="text-center">
                      <span className="text-5xl font-bold text-secondary">{pkg.price}</span>
                      <span className="text-muted-foreground ml-2">₽</span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-2">
                      {pkg.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <Icon name="Check" className="text-primary" size={20} />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full bg-gradient-to-r from-secondary to-primary hover:opacity-90">
                      Купить
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'vacancies' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <h2 className="text-5xl text-center mb-8 bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
              Вакансии
            </h2>
            <div className="grid gap-6">
              {vacancies.map((vacancy) => (
                <Card key={vacancy.id} className="bg-card border-accent/20 hover:border-accent/40 transition-all">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-2xl">{vacancy.position}</CardTitle>
                      <Badge variant={vacancy.status === 'open' ? 'default' : 'secondary'} className="bg-accent">
                        {vacancy.status === 'open' ? 'Набор открыт' : 'Набор закрыт'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">{vacancy.requirements}</p>
                    {vacancy.status === 'open' && (
                      <Button className="bg-gradient-to-r from-accent to-primary hover:opacity-90">
                        Откликнуться
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'servers' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <h2 className="text-5xl text-center mb-8 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Наши сервера
            </h2>
            <div className="grid gap-6">
              {servers.map((server) => (
                <Card key={server.id} className="bg-card border-primary/20 hover:border-primary/40 transition-all">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-2xl">{server.name}</CardTitle>
                      <Badge variant={server.status === 'online' ? 'default' : 'destructive'} className="bg-primary">
                        {server.status === 'online' ? 'Онлайн' : 'Оффлайн'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-lg">
                      <span className="text-muted-foreground">Игроков онлайн:</span>
                      <span className="text-3xl font-bold text-primary">{server.online}/{server.maxPlayers}</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-primary to-accent h-3 rounded-full transition-all" 
                        style={{ width: `${(server.online / server.maxPlayers) * 100}%` }}
                      />
                    </div>
                    <div className="flex gap-4">
                      <Button className="flex-1 bg-gradient-to-r from-primary to-accent hover:opacity-90">
                        <Icon name="Play" size={20} className="mr-2" />
                        Подключиться
                      </Button>
                      <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-background">
                        <Icon name="Info" size={20} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </main>

      <footer className="mt-24 border-t border-primary/20 bg-card">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
              <h3 className="text-xl font-bold mb-4 text-primary">CRMP CITY</h3>
              <p className="text-muted-foreground">Лучший ролевой сервер San Andreas</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Контакты</h4>
              <div className="space-y-2 text-muted-foreground">
                <p>Discord: crmp-city</p>
                <p>VK: vk.com/crmp_city</p>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4">Ссылки</h4>
              <div className="space-y-2 text-muted-foreground">
                <p>Правила сервера</p>
                <p>Пользовательское соглашение</p>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border text-center text-muted-foreground">
            <p>© 2024 CRMP CITY. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
