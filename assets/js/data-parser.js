/**
 * Parser de Trajetória e Projetos Markdown
 * Converte arquivos MD com YAML front matter para objetos JavaScript
 */

// Dados de Trajetória
const TRAJECTORY_DATA = {
  "trajectory": [
    {
      "id": "exp-001",
      "title": "Desenvolvedor Front-end Sênior",
      "position": "Senior Frontend Engineer",
      "company": "TechVision Solutions",
      "period": "Jan 2022 - Presente",
      "date": "2024-01-20",
      "featured": true,
      "skills": ["React", "TypeScript", "Architecture", "Mentorship", "Design System"],
      "content": {
        "contexto": "Liderada a arquitetura de uma plataforma web para gerenciar comunicações internas de 500k+ usuários ativos simultaneamente. Redesenhei toda a estrutura de componentes para escalabilidade.",
        "realizacoes": "Arquitetura modular escalável com 15+ componentes base reutilizáveis\nPerformance otimizada: 2.3s → 0.8s de load time (65% melhoria)\nCriação e manutenção de design system com 40+ componentes\nMentoria de 5 desenvolvedores júnior e mid-level",
        "aprendizados": "Design system é mais que CSS, é linguagem entre times. Quando componentes são bem nomeados e documentados, comunicação melhora drasticamente e bugs diminuem."
      }
    },
    {
      "id": "exp-002",
      "title": "Desenvolvedora Full-stack",
      "position": "Full-stack Developer",
      "company": "StartupXYZ",
      "period": "Jun 2019 - Dez 2021",
      "date": "2024-01-15",
      "featured": true,
      "skills": ["Vue.js", "Node.js", "PostgreSQL", "Docker", "AWS"],
      "content": {
        "contexto": "Primeira experiência em startup, onde atuei como única desenvolvedora frontend em um time de 8 pessoas. Responsável por toda a interface web e integração com APIs backend.",
        "realizacoes": "Desenvolvida interface web do zero usando Vue.js com 50+ páginas\nIntegração com 5+ APIs externas (Stripe, Sendgrid, Maps)\nOtimização de banco de dados que reduziu queries em 40%\nDeploy e manutenção de aplicação em AWS com Docker",
        "aprendizados": "Startup ensina priorização. Nem tudo que é importante é urgente. MVP bem definido é melhor que feature completo entregue tarde. Aprender a dizer \"não\" é tão importante quanto saber codificar."
      }
    },
    {
      "id": "exp-003",
      "title": "Desenvolvedora Frontend Júnior",
      "position": "Junior Frontend Developer",
      "company": "WebAgency Pro",
      "period": "Mar 2018 - May 2019",
      "date": "2024-01-10",
      "featured": false,
      "skills": ["HTML5", "CSS3", "JavaScript Vanilla", "jQuery", "Responsive Design"],
      "content": {
        "contexto": "Primeiro emprego como desenvolvedora. Trabalhei em uma agência web criando sites para clientes diversos, do e-commerce até blogs corporativos.",
        "realizacoes": "Desenvolvidos 30+ websites responsivos para clientes\nOtimização mobile-first que aumentou conversão em 25%\nCriação de documentação técnica para clientes entenderem manutenção\nTreinamento de estagiários em boas práticas de CSS",
        "aprendizados": "Agência ensina velocidade e versatilidade. Todo cliente é diferente, toda demanda é nova. Flexibilidade é tão importante quanto habilidade técnica. Comunicação com cliente não-técnico é uma skill que não aprendem em bootcamp."
      }
    },
    {
      "id": "exp-004",
      "title": "Formação em Desenvolvimento Web",
      "position": "Estudante",
      "company": "Bootcamp DevPath",
      "period": "Sep 2017 - Feb 2018",
      "date": "2024-01-05",
      "featured": false,
      "skills": ["HTML5", "CSS3", "JavaScript", "Lógica de Programação", "Git"],
      "content": {
        "contexto": "Bootcamp intensivo de 6 meses focado em web development moderno. Saí sem experiência prévia em programação e entrei com base sólida para primeiro emprego.",
        "realizacoes": "Completou currículo de 1000+ horas de hands-on coding\nDesenvolvido projeto final: plataforma de portfolio compartilhado\nParticipação em hackathon interno onde ganhou prêmio \"Melhor UX\"\n100% de taxa de colocação em emprego para turma",
        "aprendizados": "Aprender a aprender é a skill mais importante. A tecnologia muda rápido. O que importa é desenvolver capacidade de absorver conhecimento novo. Comunidade de colegas bootcamp criou rede que persiste até hoje."
      }
    }
  ]
};

// Dados de Projetos
const PROJECTS_DATA = {
  "projects": [
    {
      "id": "proj-001",
      "title": "Jornal Retro",
      "description": "Portfólio pessoal com design vintage de jornal anos 30-50",
      "date": "2024-01-20",
      "featured": true,
      "status": "in-progress",
      "stack": ["HTML5", "CSS3", "JavaScript Vanilla", "Markdown", "Responsive Design"],
      "links": {
        "github": "https://github.com/lorissette13/jornal_retro",
        "live": "https://lorissette13.github.io"
      },
      "content": {
        "descricao": "Um experimento front-end completo com design vintage anos 30-50, totalmente responsivo e funcional. Sistema modular com Markdown para gerenciar posts, trajetória e projetos.",
        "desafios": "Criar design retro que funcione responsivo em 2024\nEstrutura modular com Markdown para separar conteúdo de código\nAnimações suaves que funcionem em dispositivos mobile\nPerformance otimizada com assets estáticos",
        "solucao": "CSS Grid com media queries estratégicas (480px, 768px, 1024px)\nParser JavaScript que carrega arquivos Markdown dinamicamente\nTipografia vintage (Special Elite + Times New Roman) com fallbacks\nCarrossel interativo com 4 itens visíveis",
        "resultados": "Site totalmente funcional e escalável\nDemonstra habilidades de design retro + frontend moderno\nSistema que permite adicionar 100 posts/projetos sem mexer em JS"
      }
    },
    {
      "id": "proj-002",
      "title": "E-commerce Artesanal",
      "description": "Plataforma para pequenos produtores com carrinho dinâmico e pagamentos",
      "date": "2024-01-18",
      "featured": true,
      "status": "completed",
      "stack": ["React", "Node.js", "MongoDB", "Stripe API", "AWS S3"],
      "links": {
        "github": "https://github.com/lorissette13/ecommerce-artesanal",
        "live": "https://ecommerce-artesanal.vercel.app",
        "case-study": "https://lorissette13.dev/case-study/ecommerce"
      },
      "content": {
        "descricao": "Plataforma e-commerce completa para pequenos produtores e artesãos venderem seus produtos online. Sistema de carrinho dinâmico, múltiplas formas de pagamento e dashboard administrativo.",
        "desafios": "Gerenciar estado complexo do carrinho sem Redux\nIntegração segura com múltiplos gateways de pagamento\nUpload e otimização de imagens de produtos\nDashboard intuitivo para produtores não-técnicos",
        "solucao": "Context API para gerenciar carrinho e autenticação\nWebhook handling para confirmar pagamentos assincronamente\nSharp.js para otimizar imagens no backend\nUI/UX focada em simplicidade, testada com produtores reais",
        "resultados": "150+ produtores cadastrados\n$50k em vendas no primeiro ano\nTaxa de conversão: 3.2% (acima da média de e-commerce)\nNPS: 8.7/10 dos usuários"
      }
    },
    {
      "id": "proj-003",
      "title": "App de Viagens Colaborativo",
      "description": "Rede social para viajantes compartilharem rotas autênticas",
      "date": "2024-01-15",
      "featured": true,
      "status": "in-progress",
      "stack": ["Vue.js", "Python", "FastAPI", "Mapbox", "Machine Learning", "PostgreSQL"],
      "links": {
        "github": "https://github.com/lorissette13/travel-app",
        "live": "https://travel-collab.app"
      },
      "content": {
        "descricao": "Rede social para viajantes nômades compartilharem rotas autênticas, evitando turismo em massa. Sistema de recomendações baseado em IA aprende preferências e sugere destinos alinhados.",
        "desafios": "Algoritmo de recomendação que funcione com dados esparsos\nGerenciar dados de geolocalização com privacidade\nMapas interativos que carregam rápido mesmo em conexões lentas\nCommunity moderation em escala",
        "solucao": "Collaborative filtering com matrix factorization\nGPX track encryption para privacidade do usuário\nTile-based maps com lazy loading\nSistema de flags automatizado + moderadores comunitários",
        "resultados": "5k+ usuários ativos\n2k+ rotas compartilhadas\nImplementação em 12 cidades-piloto\nFeedback médio: 4.6/5 stars"
      }
    },
    {
      "id": "proj-004",
      "title": "Dashboard de Analytics",
      "description": "Ferramenta para analisar métricas de negócio em tempo real",
      "date": "2024-01-12",
      "featured": false,
      "status": "completed",
      "stack": ["React", "D3.js", "WebSocket", "PostgreSQL", "Express"],
      "links": {
        "github": "https://github.com/lorissette13/analytics-dashboard"
      },
      "content": {
        "descricao": "Dashboard de analytics para empresas SaaS visualizarem métricas de negócio em tempo real. Gráficos interativos, filtros avançados e export em múltiplos formatos.",
        "desafios": "Renderizar 100k+ datapoints sem travar a UI\nAtualizar dados em tempo real com WebSocket\nGráficos responsivos que funcionem em tablets",
        "solucao": "Virtual scrolling com react-window\nWebSocket com reconexão automática\nD3.js com SVG escalável\nMobile-first responsive charts",
        "resultados": "Suporta 100k+ eventos/segundo\nLatência de atualização: <100ms\nUsado por 50+ empresas"
      }
    },
    {
      "id": "proj-005",
      "title": "App de Produtividade",
      "description": "Aplicativo minimalista para gerenciar tarefas e hábitos",
      "date": "2024-01-10",
      "featured": false,
      "status": "completed",
      "stack": ["Vue.js", "SQLite", "Electron", "CSS Grid"],
      "links": {
        "github": "https://github.com/lorissette13/productivity-app"
      },
      "content": {
        "descricao": "Aplicativo desktop minimalista para gerenciar tarefas diárias e acompanhar hábitos. Design clean focado em simplicidade, sem distrações.",
        "desafios": "Manter aplicação leve (<50MB)\nSincronizar dados entre dispositivos\nUI que não distraia do trabalho",
        "solucao": "Electron para cross-platform desktop\nSQLite local + sync automático\nPaleta de cores neutra, apenas tipografia de destaque",
        "resultados": "10k+ downloads\nRating médio: 4.8/5 (App Store + Play Store)"
      }
    },
    {
      "id": "proj-006",
      "title": "Plataforma de Cursos",
      "description": "LMS para criar e compartilhar cursos online",
      "date": "2024-01-08",
      "featured": false,
      "status": "in-progress",
      "stack": ["Next.js", "Prisma", "PostgreSQL", "Stripe", "Video.js"],
      "links": {
        "github": "https://github.com/lorissette13/course-platform"
      },
      "content": {
        "descricao": "Plataforma de learning management system para criadores compartilharem cursos. Sistema de certificados, progress tracking e comunidade de alunos.",
        "desafios": "Streaming de video com CDN\nGerenciar progresso de alunos complexo\nImplementar sistema de certificados verificáveis",
        "solucao": "Mux para video streaming otimizado\nPostgreSQL com stored procedures para analytics\nCertificados assinados digitalmente com JWT",
        "resultados": "200+ cursos publicados\n15k+ alunos inscritos\nReceita: $120k no primeiro ano"
      }
    }
  ]
};

/**
 * Funções Helper para Trajetória
 */

function getTrajectoryByFeatured(featured = true) {
  return TRAJECTORY_DATA.trajectory.filter(exp => exp.featured === featured);
}

function getTrajectoryByCompany(company) {
  return TRAJECTORY_DATA.trajectory.filter(exp => exp.company.toLowerCase().includes(company.toLowerCase()));
}

function getTrajectoryBySkill(skill) {
  return TRAJECTORY_DATA.trajectory.filter(exp => 
    exp.skills.some(s => s.toLowerCase().includes(skill.toLowerCase()))
  );
}

function getRecentTrajectory(limit = 2) {
  return TRAJECTORY_DATA.trajectory
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, limit);
}

/**
 * Funções Helper para Projetos
 */

function getProjectsByFeatured(featured = true) {
  return PROJECTS_DATA.projects.filter(proj => proj.featured === featured);
}

function getProjectsByStatus(status) {
  return PROJECTS_DATA.projects.filter(proj => proj.status === status);
}

function getProjectsByStack(tech) {
  return PROJECTS_DATA.projects.filter(proj =>
    proj.stack.some(s => s.toLowerCase().includes(tech.toLowerCase()))
  );
}

function getRecentProjects(limit = 3) {
  return PROJECTS_DATA.projects
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, limit);
}

function getFeaturedProjects(limit = 3) {
  return PROJECTS_DATA.projects
    .filter(proj => proj.featured)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, limit);
}

/**
 * Função para renderizar trajetória em HTML
 */
function renderTrajectoryHTML(experience) {
  return `
    <div class="news-item trajectory-item">
      <h4 class="news-title">${experience.title}</h4>
      <p class="news-subtitle">${experience.company} • ${experience.period}</p>
      <p class="news-text">${experience.content.contexto}</p>
      <p class="news-date">${formatDate(experience.date)}</p>
      <div class="skills-tags">
        ${experience.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
      </div>
    </div>
  `;
}

/**
 * Função para renderizar projeto em HTML
 */
function renderProjectHTML(project) {
  return `
    <div class="news-item project-item">
      <h4 class="news-title">${project.title}</h4>
      <p class="news-text">${project.description}</p>
      <p class="news-tech">stack: ${project.stack.join(' • ')}</p>
      <p class="news-date">${formatDate(project.date)} • ${project.status}</p>
      ${project.links.live ? `<a href="${project.links.live}" class="project-link" target="_blank">ver projeto</a>` : ''}
    </div>
  `;
}

/**
 * Formata data para formato legível
 */
function formatDate(dateString) {
  const date = new Date(dateString);
  const months = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

// Exporta funções para uso global
window.getRecentTrajectory = getRecentTrajectory;
window.getRecentProjects = getRecentProjects;
window.renderTrajectoryHTML = renderTrajectoryHTML;
window.renderProjectHTML = renderProjectHTML;
