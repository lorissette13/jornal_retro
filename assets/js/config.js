/**
 * Configurações Globais - Constantes centralizadas
 * Define parâmetros reutilizáveis em todo o portfólio
 */

const CONFIG = {
  // Paginação
  POSTS_PER_PAGE: 4,
  PROJECTS_PER_PAGE: 6,
  GALLERY_PER_PAGE: 8,
  TIMELINE_PER_PAGE: 5,

  // Carousel
  CAROUSEL_VISIBLE_ITEMS: 4,
  CAROUSEL_ITEM_WIDTH: 240, // px (220 item + 20 gap)
  CAROUSEL_AUTO_ADVANCE: false,
  CAROUSEL_TRANSITION_DURATION: 300, // ms

  // Categorias de Posts
  POST_CATEGORIES: {
    'música': { label: 'Música', icon: '🎵', color: '#7E8C54' },
    'jogos': { label: 'Jogos', icon: '🎮', color: '#6B8E23' },
    'filmes': { label: 'Filmes', icon: '🎬', color: '#556B2F' },
    'livros': { label: 'Livros', icon: '📚', color: '#7E8C54' },
    'boardgames': { label: 'Board Games', icon: '🎲', color: '#6B8E23' },
    'dev-life': { label: 'Dev Life', icon: '💻', color: '#556B2F' },
    'viagens': { label: 'Viagens', icon: '✈️', color: '#7E8C54' }
  },

  // Categorias de Projetos
  PROJECT_CATEGORIES: {
    'frontend': { label: 'Frontend', icon: '🎨' },
    'fullstack': { label: 'Full Stack', icon: '⚙️' },
    'backend': { label: 'Backend', icon: '🔧' },
    'devops': { label: 'DevOps', icon: '🚀' }
  },

  // Categorias de Galeria
  GALLERY_CATEGORIES: {
    'setup': { label: 'Setup', icon: '🖥️' },
    'games': { label: 'Games', icon: '🎮' },
    'viagens': { label: 'Viagens', icon: '✈️' },
    'eventos': { label: 'Eventos', icon: '🎤' },
    'projetos': { label: 'Projetos', icon: '💼' },
    'livros': { label: 'Livros', icon: '📚' }
  },

  // Tipos de Timeline
  TIMELINE_TYPES: {
    'work': { label: 'Trabalho', icon: '💼', color: '#556B2F' },
    'education': { label: 'Educação', icon: '🎓', color: '#7E8C54' },
    'certification': { label: 'Certificação', icon: '📜', color: '#6B8E23' },
    'project': { label: 'Projeto', icon: '💡', color: '#556B2F' }
  },

  // Ordenação
  SORT_OPTIONS: {
    'recent': { label: 'Mais Recentes', key: 'date', order: 'desc' },
    'oldest': { label: 'Mais Antigos', key: 'date', order: 'asc' },
    'favorite': { label: 'Favoritos', key: 'favorite', order: 'desc' },
    'title': { label: 'Título A-Z', key: 'title', order: 'asc' }
  },

  // Animações
  ANIMATIONS: {
    FADE_IN_DURATION: 300, // ms
    SLIDE_DURATION: 500, // ms
    EASING: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
  },

  // Formatos de Data
  DATE_FORMAT: {
    LOCALE: 'pt-BR',
    OPTIONS: {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }
  },

  // Limites
  MAX_VISIBLE_TAGS: 5,
  MAX_VISIBLE_SKILLS: 8,
  EXCERPT_LENGTH: 150, // caracteres

  // Armazenamento Local
  STORAGE_KEYS: {
    FAVORITES: 'portfolio_favorites',
    PREFERENCES: 'portfolio_preferences',
    THEME: 'portfolio_theme',
    HISTORY: 'portfolio_history'
  }
};

// Enums para tipos de dados
const DATA_TYPES = {
  POSTS: 'posts',
  PROJECTS: 'projects',
  GALLERY: 'gallery',
  TIMELINE: 'timeline',
  ABOUT: 'about'
};

// Estados de status
const STATUS = {
  ATIVO: 'ativo',
  INATIVO: 'inativo',
  EM_DESENVOLVIMENTO: 'in-progress',
  COMPLETO: 'completed'
};

// Exporta para uso global
window.CONFIG = CONFIG;
window.DATA_TYPES = DATA_TYPES;
window.STATUS = STATUS;
