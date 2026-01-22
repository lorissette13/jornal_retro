/**
 * Index de Importação - Script Loader Centralizado
 * Garante ordem correta de carregamento de scripts
 * 
 * Usar em HTML: <script src="assets/js/index.js"></script>
 * Todos os scripts serão carregados em ordem correta automaticamente
 */

const SCRIPT_LOADER = {
  // Scripts básicos (sem dependências)
  core: [
    'config.js',           // Constantes globais
    'all-data.js',         // Dados consolidados
    'utilities.js'         // Funções auxiliares
  ],

  // Classes base (dependem de core)
  base: [
    'data-module.js',      // Gerenciador de dados
    'dom-renderer.js',     // Renderizador de DOM
    'carousel-new.js'      // Carrossel genérico
  ],

  // Sistemas de página (dependem de base)
  systems: [
    'posts-new.js',        // Sistema de Posts
    'projects-new.js',     // Sistema de Projetos
    'gallery-new.js',      // Sistema de Galeria
    'timeline-new.js'      // Sistema de Timeline
  ],

  // Scripts legados (descontinuados, mantidos para compatibilidade)
  deprecated: [
    // 'posts-parser.js',
    // 'projects.js',
    // 'gallery.js',
    // 'timeline.js',
    // 'carousel.js',
    // 'data-parser.js'
  ],

  /**
   * Carrega script dinamicamente
   */
  load(filename, basePath = 'assets/js/') {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = basePath + filename;
      script.async = false; // Garante ordem

      script.onload = () => {
        console.log(`✅ Carregado: ${filename}`);
        resolve();
      };

      script.onerror = () => {
        console.error(`❌ Erro ao carregar: ${filename}`);
        reject(new Error(`Falha ao carregar ${filename}`));
      };

      document.head.appendChild(script);
    });
  },

  /**
   * Carrega múltiplos scripts em ordem
   */
  async loadSequence(scripts, basePath = 'assets/js/') {
    console.log(`🔄 Carregando ${scripts.length} scripts...`);

    for (const script of scripts) {
      try {
        await this.load(script, basePath);
      } catch (error) {
        console.error(error);
        // Continua carregando os próximos
      }
    }

    console.log('✅ Todos os scripts carregados!');
  },

  /**
   * Inicializa todo o sistema
   */
  async initialize() {
    try {
      // 1. Carregar scripts base
      await this.loadSequence(this.core);

      // 2. Carregar classes
      await this.loadSequence(this.base);

      // 3. Carregar sistemas
      await this.loadSequence(this.systems);

      // 4. Triggar evento customizado
      window.dispatchEvent(new Event('portfolioLoaded'));

      console.log('🚀 Portfólio completamente carregado!');
    } catch (error) {
      console.error('Erro na inicialização:', error);
    }
  }
};

/**
 * Inicia quando DOM está pronto (evita conflito com outro DOMContentLoaded)
 */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    SCRIPT_LOADER.initialize();
  });
} else {
  // DOM já está pronto
  SCRIPT_LOADER.initialize();
}

// Exporta globalmente
window.SCRIPT_LOADER = SCRIPT_LOADER;
