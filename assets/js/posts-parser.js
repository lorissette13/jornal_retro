/**
 * Parser de Posts Markdown
 * Converte arquivos MD com YAML front matter para objetos JavaScript
 */

// Dados dos posts convertidos de Markdown
const POSTS_DATA = {
  "posts": [
    {
      "id": "post-001",
      "title": "nova descoberta musical",
      "category": "música",
      "date": "2024-01-15",
      "favorite": true,
      "tags": ["indie", "synthwave", "descoberta"],
      "paragraphs": [
        "Descobri a banda 'timecop1983' essa semana e já virou minha trilha sonora oficial para codar. Synthwave com toques nostálgicos dos anos 80, perfeito para sessões noturnas de desenvolvimento. O bater do sintetizador combina perfeitamente com o foco que preciso para resolver problemas complexos de arquitetura frontend.",
        "Comecei a notar que a escolha de trilha sonora afeta drasticamente minha capacidade de concentração. Músicas muito energéticas tiram a concentração, enquanto synthwave cria uma atmosfera consistente para manter o fluxo. Recomendo o álbum 'journeys' para quem busca foco e atmosfera em suas sessões de trabalho.",
        "Já compartilhei essa descoberta com alguns colegas desenvolvedores e a resposta foi excelente. Estou compilando uma playlist chamada 'dev vibes' com artistas similares e planejando fazer uma postagem completa sobre música para coding."
      ]
    },
    {
      "id": "post-002",
      "title": "jogo indie que surpreendeu",
      "category": "jogos",
      "date": "2024-01-10",
      "favorite": true,
      "tags": ["indie", "pixel-art", "narrativa"],
      "paragraphs": [
        "Finalizei 'stray gods' e que experiência única! Um musical interativo com mitologia grega que mescla escolhas do jogador com música ao vivo. Cada decisão que você toma altera as canções subsequentes e o desfecho da história de forma orgânica, criando uma narrativa verdadeiramente interativa.",
        "As escolhas do jogador alteram as canções e o desfecho da história de forma orgânica. Não é apenas um jogo com cutscenes musicais, mas sim uma experiência onde a música é parte integral da mecânica. Raro ver jogos que mesclam tão bem mecânicas de escolha com composição musical dinâmica.",
        "Jogar isso me fez pensar diferente sobre como estruturar narrativas em aplicações web. A ideia de componentes que se adaptam ao estado da aplicação é exatamente o que fazemos em frontend moderno. Recomendo para qualquer dev que quer explorar storytelling interativo."
      ]
    },
    {
      "id": "post-003",
      "title": "ritual matinal ajustado",
      "category": "dev-life",
      "date": "2024-01-08",
      "favorite": false,
      "tags": ["rotina", "produtividade", "café"],
      "paragraphs": [
        "Após testar várias abordagens ao longo de meses, finalmente encontrei um ritual matinal que funciona perfeitamente. A chave foi simplificar: menos tecnologia, mais foco. Comecei com 20 minutos de leitura técnica, seguidos por planejamento do dia no papel, não digital.",
        "O segredo foi separar consumo de informação de criação logo pela manhã. Pela manhã leio e planejo, à tarde executo. Essa divisão evita que informação nova me tire do foco durante a execução. Café em xícara velha, papel e caneta, e a mente limpa.",
        "Produtividade aumentou significativamente nas primeiras 4 horas do dia. As tarefas mais complexas saem mais rápido quando começam logo cedo em um estado mental otimizado. Recomendo testar sua própria variação desse padrão."
      ]
    },
    {
      "id": "post-004",
      "title": "filme que inspira código",
      "category": "filmes",
      "date": "2024-01-05",
      "favorite": true,
      "tags": ["sci-fi", "inspiração", "futurismo"],
      "paragraphs": [
        "Revendo 'her' percebi quantas interfaces do filme influenciaram o design atual. Aquela interação minimalista, conversacional e invisible é exatamente para onde estamos indo em design de produto. A simplicidade das interações entre humano e IA mostra o poder da comunicação não-verbal bem executada.",
        "O filme mostra que o melhor design não é o mais visível, mas o que desaparece no uso. As interfaces mais poderosas são aquelas que você esquece que está usando. Estética retro combinada com futurismo: ano de produção 2013 achava que 2025 seria assim.",
        "Às vezes, ficção científica é o melhor briefing para produtos inovadores. Antes de codificar, assista sci-fi. Visualize como a tecnologia deve se sentir ao usuário. 'Her', 'Minority Report' e 'Blade Runner' são meus inspiradores de design favoritos."
      ]
    },
    {
      "id": "post-005",
      "title": "boardgame para devs",
      "category": "boardgames",
      "date": "2024-01-03",
      "favorite": false,
      "tags": ["estratégia", "cooperação", "lógica"],
      "paragraphs": [
        "'Pandemic legacy' ensina mais sobre trabalho em equipe do que muitos cursos corporativos. A necessidade de comunicação clara, planejamento estratégico e adaptação a mudanças inesperadas é quase um sprint de desenvolvimento em formato de jogo.",
        "O jogo força você a coordenar com seu time, explicar estratégias, adaptar planos quando algo sai do esperado. Exatamente como retros e planning meetings em times ágeis. Sem comunicação clara, o time falha. Com comunicação, conseguem derrotar a pandemia.",
        "Recomendo para equipes de tech que querem melhorar colaboração de forma divertida. É mais barato que team building corporativo e muito mais efetivo. Jogos de tabuleiro cooperativos são subestimados como ferramentas de desenvolvimento de equipe."
      ]
    },
    {
      "id": "post-006",
      "title": "livro que expandiu horizontes",
      "category": "livros",
      "date": "2023-12-28",
      "favorite": true,
      "tags": ["ficção", "filosofia", "tecnologia"],
      "paragraphs": [
        "'Exhalation' do ted chiang é obrigatório para quem pensa sobre ética e tecnologia. Cada conto é uma premissa científica explorada com profundidade filosófica incrível. Não são histórias de sci-fi superficiais, mas meditações profundas sobre a natureza da consciência, tempo e livre arbítrio.",
        "Especialmente 'the lifecycle of software objects' para desenvolvedores refletirem. É uma história sobre criar seres digitais sencientes e os dilemas éticos de abandoná-los. Como criadores de software, isso nos bate onde dói: qual é nossa responsabilidade com os sistemas que criamos?",
        "Recomendo ler antes de qualquer projeto novo envolvendo IA ou dados de usuários. Expande a perspectiva sobre o impacto real do que codificamos. Chiang escreve como alguém que entende profundamente tecnologia mas nunca perde a humanidade na equação."
      ]
    },
    {
      "id": "post-007",
      "title": "setup otimizado",
      "category": "dev-life",
      "date": "2023-12-20",
      "favorite": false,
      "tags": ["setup", "ergonomia", "ferramentas"],
      "paragraphs": [
        "Após meses testando diferentes abordagens, finalmente encontrei a configuração perfeita de atalhos no vscode. A chave foi não copiar os atalhos padrão, mas criar um mapa mental que faz sentido para seu fluxo pessoal.",
        "Customizei todos os shortcuts para mapear fluxo mental, não funções isoladas. Em vez de memorizar 'Ctrl+K Ctrl+C' para comentar, mapeei para algo que minha mão já fazia naturalmente. Atalhos que não preciso pensar são atalhos que funcionam.",
        "Produtividade aumentou 30% quando parei de lutar contra as ferramentas e as moldei ao meu fluxo de trabalho. Editor é extensão do seu cérebro. Se o editor luta contra você, você sempre perde. Configure para vencer."
      ]
    },
    {
      "id": "post-008",
      "title": "trilha para codar",
      "category": "música",
      "date": "2023-12-15",
      "favorite": false,
      "tags": ["playlist", "foco", "instrumental"],
      "paragraphs": [
        "Estou compilando playlists específicas para tipos diferentes de tarefas de programação. Cada contexto de trabalho precisa de uma trilha sonora diferente para manter o fluxo máximo.",
        "Bug fixing: jazz suave que acalma a mente enquanto você procura a agulha no palheiro. Arquitetura nova: post-rock expansivo que cresce enquanto suas ideias crescem. Refatoração: ambient que se integra ao fundo sem distrair. Cada tipo de trabalho tem sua música ideal.",
        "A trilha sonora certa pode transformar completamente o fluxo de trabalho. Testei em meus colegas e todos reportaram melhoria. Próximo passo: public playlists no spotify com esses contextos mapeados."
      ]
    }
  ],
  "categories": [
    "filmes",
    "jogos",
    "boardgames",
    "livros",
    "discos",
    "música",
    "dev-life",
    "viagens"
  ]
};

/**
 * Função auxiliar para extrair número de parágrafos
 * @param {Array} paragraphs - Array de parágrafos
 * @param {number} limit - Limite de parágrafos a retornar
 * @returns {Array} Array limitado de parágrafos
 */
function limitParagraphs(paragraphs, limit = 1) {
    return paragraphs.slice(0, limit);
}

/**
 * Função para formatar data
 * @param {string} dateStr - Data em formato YYYY-MM-DD
 * @returns {string} Data formatada
 */
function formatDate(dateStr) {
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    return new Date(dateStr + 'T00:00:00').toLocaleDateString('pt-BR', options);
}

/**
 * Função para obter posts pela categoria
 * @param {string} category - Categoria para filtrar
 * @returns {Array} Posts da categoria
 */
function getPostsByCategory(category) {
    if (category === 'all') {
        return POSTS_DATA.posts;
    }
    return POSTS_DATA.posts.filter(post => post.category === category);
}

/**
 * Função para obter posts favoritos
 * @returns {Array} Posts marcados como favoritos
 */
function getFavoritePosts() {
    return POSTS_DATA.posts.filter(post => post.favorite);
}

/**
 * Função para limitar posts para a home
 * @param {number} limit - Limite de posts
 * @returns {Array} Posts limitados
 */
function getLimitedPosts(limit = 2) {
    return POSTS_DATA.posts.slice(0, limit).sort((a, b) => new Date(b.date) - new Date(a.date));
}
