/**
 * ALL_DATA - Consolidação de Todos os Dados do Portfólio
 * Sistema centralizado que elimina duplicação entre posts-parser.js, projects.js, gallery.js, timeline.js
 * 
 * Cada tipo de dado (posts, projects, gallery, timeline) mantém estrutura consistente
 * Permite reutilização de código em DOMRenderer, DataModule e Carousel
 */

const ALL_DATA = {
  /**
   * POSTS - Sistema de Cotidiano
   */
  posts: [
    {
      id: "post-001",
      title: "nova descoberta musical",
      category: "música",
      date: "2024-01-15",
      favorite: true,
      tags: ["indie", "synthwave", "descoberta"],
      description: "Descobri uma nova banda que virou minha trilha sonora oficial para codar",
      paragraphs: [
        "Descobri a banda 'timecop1983' essa semana e já virou minha trilha sonora oficial para codar. Synthwave com toques nostálgicos dos anos 80, perfeito para sessões noturnas de desenvolvimento. O bater do sintetizador combina perfeitamente com o foco que preciso para resolver problemas complexos de arquitetura frontend.",
        "Comecei a notar que a escolha de trilha sonora afeta drasticamente minha capacidade de concentração. Músicas muito energéticas tiram a concentração, enquanto synthwave cria uma atmosfera consistente para manter o fluxo. Recomendo o álbum 'journeys' para quem busca foco e atmosfera em suas sessões de trabalho.",
        "Já compartilhei essa descoberta com alguns colegas desenvolvedores e a resposta foi excelente. Estou compilando uma playlist chamada 'dev vibes' com artistas similares e planejando fazer uma postagem completa sobre música para coding."
      ]
    },
    {
      id: "post-002",
      title: "jogo indie que surpreendeu",
      category: "jogos",
      date: "2024-01-10",
      favorite: true,
      tags: ["indie", "pixel-art", "narrativa"],
      description: "Finalizei um jogo interativo que revolucionou minha forma de pensar em narrativas web",
      paragraphs: [
        "Finalizei 'stray gods' e que experiência única! Um musical interativo com mitologia grega que mescla escolhas do jogador com música ao vivo. Cada decisão que você toma altera as canções subsequentes e o desfecho da história de forma orgânica, criando uma narrativa verdadeiramente interativa.",
        "As escolhas do jogador alteram as canções e o desfecho da história de forma orgânica. Não é apenas um jogo com cutscenes musicais, mas sim uma experiência onde a música é parte integral da mecânica. Raro ver jogos que mesclam tão bem mecânicas de escolha com composição musical dinâmica.",
        "Jogar isso me fez pensar diferente sobre como estruturar narrativas em aplicações web. A ideia de componentes que se adaptam ao estado da aplicação é exatamente o que fazemos em frontend moderno. Recomendo para qualquer dev que quer explorar storytelling interativo."
      ]
    },
    {
      id: "post-003",
      title: "ritual matinal ajustado",
      category: "dev-life",
      date: "2024-01-08",
      favorite: false,
      tags: ["rotina", "produtividade", "café"],
      description: "Encontrei o ritual matinal perfeito para maximizar minha produtividade",
      paragraphs: [
        "Após testar várias abordagens ao longo de meses, finalmente encontrei um ritual matinal que funciona perfeitamente. A chave foi simplificar: menos tecnologia, mais foco. Comecei com 20 minutos de leitura técnica, seguidos por planejamento do dia no papel, não digital.",
        "O segredo foi separar consumo de informação de criação logo pela manhã. Pela manhã leio e planejo, à tarde executo. Essa divisão evita que informação nova me tire do foco durante a execução. Café em xícara velha, papel e caneta, e a mente limpa.",
        "Produtividade aumentou significativamente nas primeiras 4 horas do dia. As tarefas mais complexas saem mais rápido quando começam logo cedo em um estado mental otimizado. Recomendo testar sua própria variação desse padrão."
      ]
    },
    {
      id: "post-004",
      title: "filme que inspira código",
      category: "filmes",
      date: "2024-01-05",
      favorite: true,
      tags: ["sci-fi", "inspiração", "futurismo"],
      description: "Revendo clássicos de ficção científica aprendi lições valiosas sobre design",
      paragraphs: [
        "Revendo 'her' percebi quantas interfaces do filme influenciaram o design atual. Aquela interação minimalista, conversacional e invisible é exatamente para onde estamos indo em design de produto. A simplicidade das interações entre humano e IA mostra o poder da comunicação não-verbal bem executada.",
        "O filme mostra que o melhor design não é o mais visível, mas o que desaparece no uso. As interfaces mais poderosas são aquelas que você esquece que está usando. Estética retro combinada com futurismo: ano de produção 2013 achava que 2025 seria assim.",
        "Às vezes, ficção científica é o melhor briefing para produtos inovadores. Antes de codificar, assista sci-fi. Visualize como a tecnologia deve se sentir ao usuário. 'Her', 'Minority Report' e 'Blade Runner' são meus inspiradores de design favoritos."
      ]
    },
    {
      id: "post-005",
      title: "boardgame para devs",
      category: "boardgames",
      date: "2024-01-03",
      favorite: false,
      tags: ["estratégia", "cooperação", "lógica"],
      description: "Descobri que jogos de tabuleiro ensinam mais sobre trabalho em equipe que treinamentos corporativos",
      paragraphs: [
        "'Pandemic legacy' ensina mais sobre trabalho em equipe do que muitos cursos corporativos. A necessidade de comunicação clara, planejamento estratégico e adaptação a mudanças inesperadas é quase um sprint de desenvolvimento em formato de jogo.",
        "O jogo força você a coordenar com seu time, explicar estratégias, adaptar planos quando algo sai do esperado. Exatamente como retros e planning meetings em times ágeis. Sem comunicação clara, o time falha. Com comunicação, conseguem derrotar a pandemia.",
        "Recomendo para equipes de tech que querem melhorar colaboração de forma divertida. É mais barato que team building corporativo e muito mais efetivo. Jogos de tabuleiro cooperativos são subestimados como ferramentas de desenvolvimento de equipe."
      ]
    },
    {
      id: "post-006",
      title: "livro que expandiu horizontes",
      category: "livros",
      date: "2023-12-28",
      favorite: true,
      tags: ["ficção", "filosofia", "tecnologia"],
      description: "Leitura obrigatória para quem pensa sobre ética em tecnologia",
      paragraphs: [
        "'Exhalation' do ted chiang é obrigatório para quem pensa sobre ética e tecnologia. Cada conto é uma premissa científica explorada com profundidade filosófica incrível. Não são histórias de sci-fi superficiais, mas meditações profundas sobre a natureza da consciência, tempo e livre arbítrio.",
        "Especialmente 'the lifecycle of software objects' para desenvolvedores refletirem. É uma história sobre criar seres digitais sencientes e os dilemas éticos de abandoná-los. Como criadores de software, isso nos bate onde dói: qual é nossa responsabilidade com os sistemas que criamos?",
        "Recomendo ler antes de qualquer projeto novo envolvendo IA ou dados de usuários. Expande a perspectiva sobre o impacto real do que codificamos. Chiang escreve como alguém que entende profundamente tecnologia mas nunca perde a humanidade na equação."
      ]
    },
    {
      id: "post-007",
      title: "setup otimizado",
      category: "dev-life",
      date: "2023-12-20",
      favorite: false,
      tags: ["setup", "ergonomia", "ferramentas"],
      description: "Customizei todos os atalhos do meu editor para otimizar o fluxo de trabalho",
      paragraphs: [
        "Após meses testando diferentes abordagens, finalmente encontrei a configuração perfeita de atalhos no vscode. A chave foi não copiar os atalhos padrão, mas criar um mapa mental que faz sentido para seu fluxo pessoal.",
        "Customizei todos os shortcuts para mapear fluxo mental, não funções isoladas. Em vez de memorizar 'Ctrl+K Ctrl+C' para comentar, mapeei para algo que minha mão já fazia naturalmente. Atalhos que não preciso pensar são atalhos que funcionam.",
        "Produtividade aumentou 30% quando parei de lutar contra as ferramentas e as moldei ao meu fluxo de trabalho. Editor é extensão do seu cérebro. Se o editor luta contra você, você sempre perde. Configure para vencer."
      ]
    },
    {
      id: "post-008",
      title: "trilha para codar",
      category: "música",
      date: "2023-12-15",
      favorite: false,
      tags: ["playlist", "foco", "instrumental"],
      description: "Compilei playlists específicas para cada tipo de tarefa de programação",
      paragraphs: [
        "Estou compilando playlists específicas para tipos diferentes de tarefas de programação. Cada contexto de trabalho precisa de uma trilha sonora diferente para manter o fluxo máximo.",
        "Bug fixing: jazz suave que acalma a mente enquanto você procura a agulha no palheiro. Arquitetura nova: post-rock expansivo que cresce enquanto suas ideias crescem. Refatoração: ambient que se integra ao fundo sem distrair. Cada tipo de trabalho tem sua música ideal.",
        "A trilha sonora certa pode transformar completamente o fluxo de trabalho. Testei em meus colegas e todos reportaram melhoria. Próximo passo: public playlists no spotify com esses contextos mapeados."
      ]
    }
  ],

  /**
   * PROJECTS - Portfólio de Projetos
   */
  projects: [
    {
      id: "proj-001",
      title: "jornal retro digital",
      description: "portfólio com estética vintage anos 30-50. foco em html/css vanilla e design responsivo.",
      category: "frontend",
      year: "2024",
      date: "2024-01-20",
      favorite: true,
      tags: ["design", "responsivo", "vanilla"],
      status: "ativo",
      tech: ["html5", "css3", "javascript", "responsive design"],
      features: ["design vintage", "totalmente responsivo", "sem frameworks", "performático"],
      github: "https://github.com/lorissette13/retro-journal",
      demo: "https://lorissette13.github.io/retro-journal",
      image: "retro-journal.jpg"
    },
    {
      id: "proj-002",
      title: "e-commerce artesanal",
      description: "plataforma para pequenos produtores com carrinho dinâmico e pagamentos integrados.",
      category: "fullstack",
      year: "2023",
      date: "2023-12-18",
      favorite: true,
      tags: ["react", "ecommerce", "pagamentos"],
      status: "ativo",
      tech: ["react", "node.js", "mongodb", "stripe", "jwt"],
      features: ["carrinho em tempo real", "checkout seguro", "dashboard admin", "mobile-first"],
      github: "https://github.com/lorissette13/artisanal-shop",
      demo: "https://artisanal-shop.vercel.app",
      image: "artisanal-shop.jpg"
    },
    {
      id: "proj-003",
      title: "app de viagens colaborativo",
      description: "rede social para viajantes compartilharem rotas autênticas e recomendações.",
      category: "fullstack",
      year: "2023",
      date: "2023-12-15",
      favorite: true,
      tags: ["vue", "mapas", "comunidade"],
      status: "ativo",
      tech: ["vue.js", "python", "mapbox", "mongodb", "docker"],
      features: ["mapas interativos", "sistema de reviews", "recomendações por ia", "comunidade"],
      github: "https://github.com/lorissette13/travel-collab",
      demo: "https://travel-collab.netlify.app",
      image: "travel-app.jpg"
    },
    {
      id: "proj-004",
      title: "sistema de design open source",
      description: "biblioteca de componentes reutilizáveis com documentação completa em storybook.",
      category: "frontend",
      year: "2022",
      date: "2022-12-12",
      favorite: false,
      tags: ["design", "componentes", "opensource"],
      status: "ativo",
      tech: ["react", "typescript", "storybook", "styled-components", "npm"],
      features: ["50+ componentes", "documentação completa", "theme switching", "a11y compliant"],
      github: "https://github.com/lorissette13/design-system",
      demo: "https://design-system-storybook.vercel.app",
      image: "design-system.jpg"
    },
    {
      id: "proj-005",
      title: "dashboard de analytics",
      description: "painel administrativo para visualização de dados em tempo real com gráficos interativos.",
      category: "frontend",
      year: "2022",
      date: "2022-12-10",
      favorite: false,
      tags: ["analytics", "gráficos", "dados"],
      status: "ativo",
      tech: ["react", "d3.js", "websockets", "chart.js", "tailwind"],
      features: ["gráficos em tempo real", "filtros avançados", "exportação de dados", "dark mode"],
      github: "https://github.com/lorissette13/analytics-dashboard",
      demo: "https://analytics-dashboard-demo.vercel.app",
      image: "analytics-dashboard.jpg"
    },
    {
      id: "proj-006",
      title: "plataforma de cursos online",
      description: "sistema completo de e-learning com vídeos, exercícios e certificados.",
      category: "fullstack",
      year: "2021",
      date: "2021-12-08",
      favorite: false,
      tags: ["educação", "elearning", "certificados"],
      status: "ativo",
      tech: ["next.js", "node.js", "postgresql", "aws s3", "ffmpeg"],
      features: ["streaming de vídeo", "exercícios interativos", "sistema de progresso", "certificados"],
      github: "https://github.com/lorissette13/learning-platform",
      demo: "https://learn-platform.vercel.app",
      image: "learning-platform.jpg"
    },
    {
      id: "proj-007",
      title: "app de produtividade pomodoro",
      description: "aplicativo de gerenciamento de tempo com técnica pomodoro e estatísticas.",
      category: "mobile",
      year: "2021",
      date: "2021-12-05",
      favorite: false,
      tags: ["mobile", "produtividade", "pomodoro"],
      status: "ativo",
      tech: ["react native", "expo", "async storage", "notificações"],
      features: ["temporizador pomodoro", "estatísticas diárias", "notificações", "modo foco"],
      github: "https://github.com/lorissette13/pomodoro-app",
      demo: null,
      image: "pomodoro-app.jpg"
    },
    {
      id: "proj-008",
      title: "ferramenta de colaboração em código",
      description: "editor de código colaborativo em tempo real com syntax highlighting.",
      category: "fullstack",
      year: "2020",
      date: "2020-12-03",
      favorite: false,
      tags: ["colaboração", "editor", "realtime"],
      status: "arquivado",
      tech: ["vue.js", "socket.io", "codemirror", "redis", "docker"],
      features: ["edição em tempo real", "syntax highlighting", "chat integrado", "salvamento automático"],
      github: "https://github.com/lorissette13/code-collab",
      demo: null,
      image: "code-collab.jpg"
    }
  ],

  /**
   * GALLERY - Galeria de Imagens
   */
  gallery: [
    {
      id: "gallery-001",
      title: "setup de trabalho",
      category: "setup",
      year: "2024",
      date: "2024-01-15",
      description: "meu ambiente de trabalho atual com monitor duplo, teclado mecânico e iluminação personalizada.",
      favorite: true,
      tags: ["setup", "ergonomia", "iluminação"],
      image: "setup-2024.jpg",
      thumbnail: "setup-2024-thumb.jpg",
      credit: "foto própria"
    },
    {
      id: "gallery-002",
      title: "coleção de jogos retro",
      category: "games",
      year: "2023",
      date: "2023-12-20",
      description: "parte da minha coleção de jogos retrô para consoles clássicos dos anos 80-90.",
      favorite: true,
      tags: ["retro", "coleção", "jogos"],
      image: "retro-games.jpg",
      thumbnail: "retro-games-thumb.jpg",
      credit: "foto própria"
    },
    {
      id: "gallery-003",
      title: "viagem para portugal",
      category: "viagens",
      year: "2023",
      date: "2023-11-15",
      description: "vista do castelo de são jorge em lisboa durante o pôr do sol.",
      favorite: true,
      tags: ["portugal", "lisboa", "pôr do sol"],
      image: "lisboa-castle.jpg",
      thumbnail: "lisboa-castle-thumb.jpg",
      credit: "foto própria"
    },
    {
      id: "gallery-004",
      title: "evento de tecnologia",
      category: "eventos",
      year: "2023",
      date: "2023-10-10",
      description: "participação como palestrante em conferência de desenvolvimento front-end.",
      favorite: false,
      tags: ["evento", "palestra", "tecnologia"],
      image: "tech-event.jpg",
      thumbnail: "tech-event-thumb.jpg",
      credit: "foto do evento"
    },
    {
      id: "gallery-005",
      title: "projeto em desenvolvimento",
      category: "projetos",
      year: "2024",
      date: "2024-01-10",
      description: "screenshot de um projeto em desenvolvimento mostrando interface e código.",
      favorite: true,
      tags: ["desenvolvimento", "interface", "código"],
      image: "project-dev.jpg",
      thumbnail: "project-dev-thumb.jpg",
      credit: "captura de tela"
    },
    {
      id: "gallery-006",
      title: "estante de livros",
      category: "livros",
      year: "2024",
      date: "2024-01-05",
      description: "minha estante com livros de ficção científica, fantasia e tecnologia.",
      favorite: false,
      tags: ["livros", "estante", "coleção"],
      image: "book-shelf.jpg",
      thumbnail: "book-shelf-thumb.jpg",
      credit: "foto própria"
    },
    {
      id: "gallery-007",
      title: "workshop de programação",
      category: "eventos",
      year: "2022",
      date: "2022-09-15",
      description: "ministrando workshop de javascript para iniciantes em espaço colaborativo.",
      favorite: false,
      tags: ["workshop", "ensino", "javascript"],
      image: "coding-workshop.jpg",
      thumbnail: "coding-workshop-thumb.jpg",
      credit: "foto do participante"
    },
    {
      id: "gallery-008",
      title: "conferência react brasil",
      category: "eventos",
      year: "2023",
      date: "2023-08-20",
      description: "apresentação sobre performance em react na maior conferência react do brasil.",
      favorite: true,
      tags: ["conferência", "react", "performance"],
      image: "react-conf.jpg",
      thumbnail: "react-conf-thumb.jpg",
      credit: "foto do evento"
    }
  ],

  /**
   * TIMELINE - Trajetória Profissional
   */
  timeline: [
    {
      id: "exp-001",
      type: "work",
      title: "desenvolvedor front-end sênior",
      company: "empresa global tech",
      period: "2022-presente",
      date: "2024-01-20",
      favorite: true,
      tags: ["arquitetura", "mentoring", "typescript"],
      skills: ["typescript", "next.js", "graphql", "docker", "aws"],
      description: "arquitetura de sistemas escaláveis. definição de padrões de código. entrevistas técnicas. foco em acessibilidade e web vitals.",
      content: {
        contexto: "Liderada a arquitetura de uma plataforma web para gerenciar comunicações internas de 500k+ usuários ativos simultaneamente.",
        realizacoes: "Arquitetura modular escalável com 15+ componentes base reutilizáveis\nPerformance otimizada: 2.3s → 0.8s de load time (65% melhoria)\nCriação e manutenção de design system com 40+ componentes\nMentoria de 5 desenvolvedores júnior e mid-level",
        aprendizados: "Design system é mais que CSS, é linguagem entre times. Quando componentes são bem nomeados e documentados, comunicação melhora drasticamente."
      }
    },
    {
      id: "exp-002",
      type: "work",
      title: "desenvolvedora full-stack",
      company: "startupxyz",
      period: "2019-2021",
      date: "2024-01-15",
      favorite: true,
      tags: ["vue", "node.js", "startup"],
      skills: ["vue.js", "node.js", "postgresql", "docker", "aws"],
      description: "primeira experiência em startup, onde atuei como única desenvolvedora frontend em um time de 8 pessoas.",
      content: {
        contexto: "Responsável por toda a interface web e integração com APIs backend em startup de crescimento rápido.",
        realizacoes: "Desenvolvida interface web do zero usando Vue.js com 50+ páginas\nIntegração com 5+ APIs externas (Stripe, Sendgrid, Maps)\nOtimização de banco de dados que reduziu queries em 40%\nDeploy e manutenção de aplicação em AWS com Docker",
        aprendizados: "Startup ensina priorização. MVP bem definido é melhor que feature completo entregue tarde."
      }
    },
    {
      id: "exp-003",
      type: "work",
      title: "desenvolvedora frontend júnior",
      company: "webagency pro",
      period: "2018-2019",
      date: "2024-01-10",
      favorite: false,
      tags: ["html", "css", "javascript"],
      skills: ["html5", "css3", "javascript vanilla", "jquery", "responsive design"],
      description: "primeira experiência profissional. desenvolvimento de interfaces responsivas com html/css/js.",
      content: {
        contexto: "Trabalhei em uma agência web criando sites para clientes diversos, do e-commerce até blogs corporativos.",
        realizacoes: "Desenvolvidos 30+ websites responsivos para clientes\nOtimização mobile-first que aumentou conversão em 25%\nCriação de documentação técnica para clientes\nTreinamento de estagiários em boas práticas de CSS",
        aprendizados: "Agência ensina velocidade e versatilidade. Comunicação com cliente não-técnico é uma skill valiosa."
      }
    },
    {
      id: "exp-004",
      type: "education",
      title: "bootcamp development web",
      company: "bootcamp devpath",
      period: "2017-2018",
      date: "2024-01-05",
      favorite: false,
      tags: ["formação", "javascript", "web"],
      skills: ["html5", "css3", "javascript", "lógica de programação", "git"],
      description: "bootcamp intensivo de 6 meses focado em web development moderno. saí sem experiência prévia em programação.",
      content: {
        contexto: "Bootcamp intensivo que forneceu base sólida para primeiro emprego como desenvolvedora.",
        realizacoes: "Completou currículo de 1000+ horas de hands-on coding\nDesenvolvido projeto final: plataforma de portfolio compartilhado\nParticipação em hackathon onde ganhou prêmio \"Melhor UX\"\n100% de taxa de colocação em emprego",
        aprendizados: "Aprender a aprender é a skill mais importante. A comunidade de colegas criou rede que persiste."
      }
    },
    {
      id: "exp-005",
      type: "certification",
      title: "aws certified solutions architect",
      company: "amazon web services",
      period: "2021",
      date: "2024-01-12",
      favorite: true,
      tags: ["certificação", "aws", "cloud"],
      skills: ["aws", "cloud", "arquitetura", "segurança"],
      description: "certificação em arquitetura de soluções cloud. foco em segurança, escalabilidade e otimização de custos na aws.",
      content: {
        contexto: "Certificação obtida para aprimorar conhecimento em cloud computing e arquitetura escalável.",
        realizacoes: "Aprovado no exam AWS SAA-C02 na primeira tentativa\nImplementação de 5 arquiteturas em AWS para projetos reais\nMentoria de colegas no path de certificação AWS",
        aprendizados: "Cloud knowledge é essencial para desenvolvimento moderno. AWS oferece múltiplas soluções para cada problema."
      }
    },
    {
      id: "exp-006",
      type: "certification",
      title: "react advanced patterns",
      company: "frontend masters",
      period: "2020",
      date: "2024-01-08",
      favorite: false,
      tags: ["certificação", "react", "padrões"],
      skills: ["react", "hooks", "performance", "padrões"],
      description: "curso avançado de padrões em react. renderização otimizada, hooks customizados e gerenciamento de estado complexo.",
      content: {
        contexto: "Aprofundamento em padrões avançados de React para melhorar qualidade do código.",
        realizacoes: "Completou 40 horas de conteúdo em padrões avançados\nImplementação de 10+ custom hooks em projetos reais\nOptimização de performance em componentes complexos",
        aprendizados: "Custom hooks são poderosos para compartilhar lógica. Performance importa mais do que você acha."
      }
    }
  ]
};

// Função utilitária para obter dados por tipo
function getDataByType(type) {
  const dataMap = {
    [DATA_TYPES.POSTS]: ALL_DATA.posts,
    [DATA_TYPES.PROJECTS]: ALL_DATA.projects,
    [DATA_TYPES.GALLERY]: ALL_DATA.gallery,
    [DATA_TYPES.TIMELINE]: ALL_DATA.timeline
  };
  
  return dataMap[type] || [];
}

// Função para formatar data padrão
function formatDate(dateStr) {
  if (!dateStr) return '';
  try {
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  } catch {
    return dateStr;
  }
}

// Exporta dados globais
window.ALL_DATA = ALL_DATA;
window.getDataByType = getDataByType;
window.formatDate = formatDate;
