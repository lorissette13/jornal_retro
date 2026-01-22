/**
 * Sistema de Posts Refatorado - NOVO
 * Usa DataModule + DOMRenderer para eliminar duplicação
 * 
 * ANTES: 400+ linhas de código duplicado
 * DEPOIS: ~150 linhas de código limpo e modular
 */

class PostsSystem {
  constructor() {
    this.dataModule = new DataModule(ALL_DATA.posts, DATA_TYPES.POSTS, {
      itemsPerPage: CONFIG.POSTS_PER_PAGE
    });

    this.renderer = new DOMRenderer({
      container: '#posts-grid',
      type: DATA_TYPES.POSTS,
      onFavoriteClick: (id) => this.handleFavorite(id),
      onCardClick: (item) => this.handleCardClick(item)
    });

    this.containerSelector = '#posts-grid';
    this.paginationSelector = '#posts-pagination';
  }

  /**
   * Inicializa o sistema
   */
  init() {
    this.setupEventListeners();
    this.render();
    this.updateStats();
  }

  /**
   * Configura event listeners
   */
  setupEventListeners() {
    // Filtros por categoria
    document.querySelectorAll('[data-filter-category]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const category = e.target.dataset.filterCategory;
        this.filterByCategory(category);
      });
    });

    // Filtros por tipo
    document.querySelectorAll('[data-filter-type]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const type = e.target.dataset.filterType;
        this.filterByType(type);
      });
    });

    // Busca
    const searchInput = document.querySelector('[data-search-posts]');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.dataModule.search(e.target.value);
        this.render();
      });
    }

    // Ordenação
    document.querySelectorAll('[data-sort-by]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const key = e.target.dataset.sortBy;
        const order = e.target.dataset.sortOrder || 'desc';
        this.dataModule.sort(key, order);
        this.render();
      });
    });
  }

  /**
   * Filtra por categoria
   */
  filterByCategory(category) {
    this.dataModule.filterByCategory(category);
    this.updateFilterButtons('category', category);
    this.render();
  }

  /**
   * Filtra por tipo/tipo de conteúdo
   */
  filterByType(type) {
    this.dataModule.filterByType(type);
    this.updateFilterButtons('type', type);
    this.render();
  }

  /**
   * Filtra favoritos
   */
  filterFavorites() {
    const showFavorites = !this.dataModule.filters.favorites;
    this.dataModule.filterFavorites(showFavorites);
    this.render();
  }

  /**
   * Atualiza botões de filtro
   */
  updateFilterButtons(filterType, activeValue) {
    const selector = filterType === 'category' 
      ? '[data-filter-category]' 
      : '[data-filter-type]';

    document.querySelectorAll(selector).forEach(btn => {
      const btnValue = filterType === 'category' 
        ? btn.dataset.filterCategory 
        : btn.dataset.filterType;

      btn.classList.toggle('active', btnValue === activeValue);
    });
  }

  /**
   * Vai para página
   */
  goToPage(page) {
    this.dataModule.goToPage(page);
    this.render();
  }

  /**
   * Próxima página
   */
  nextPage() {
    this.dataModule.nextPage();
    this.render();
  }

  /**
   * Página anterior
   */
  prevPage() {
    this.dataModule.prevPage();
    this.render();
  }

  /**
   * Trata clique em favorito
   */
  handleFavorite(id) {
    this.dataModule.toggleFavorite(id);
    this.updateStats();
  }

  /**
   * Trata clique no card
   */
  handleCardClick(item) {
    console.log('Post clicado:', item);
    // Pode redirecionar, abrir modal, etc
  }

  /**
   * Renderiza posts atuais
   */
  render() {
    const items = this.dataModule.getPageItems();
    this.renderer.render(items);
    this.updatePagination();
  }

  /**
   * Atualiza paginação
   */
  updatePagination() {
    const info = this.dataModule.getPaginationInfo();
    const container = document.querySelector(this.paginationSelector);

    if (!container || info.totalPages <= 1) {
      if (container) container.innerHTML = '';
      return;
    }

    let html = '<div class="pagination">';

    // Botão anterior
    if (info.hasPrevPage) {
      html += `<button class="pagination-btn prev" onclick="postsSystem.prevPage()">← anterior</button>`;
    } else {
      html += '<span class="pagination-btn disabled">← anterior</span>';
    }

    // Números de página
    for (let i = 1; i <= info.totalPages; i++) {
      const active = i === info.currentPage ? 'active' : '';
      html += `<button class="pagination-btn ${active}" onclick="postsSystem.goToPage(${i})">${i}</button>`;
    }

    // Botão próxima
    if (info.hasNextPage) {
      html += `<button class="pagination-btn next" onclick="postsSystem.nextPage()">próxima →</button>`;
    } else {
      html += '<span class="pagination-btn disabled">próxima →</span>';
    }

    html += `<span class="pagination-info">${info.showingFrom}-${info.showingTo} de ${info.totalItems}</span></div>`;

    container.innerHTML = html;
  }

  /**
   * Atualiza estatísticas
   */
  updateStats() {
    const stats = {
      total: this.dataModule.items.length,
      favoritos: this.dataModule.items.filter(p => p.favorite).length,
      categorias: this.dataModule.getAvailableCategories().length
    };

    // Atualiza elementos de stats se existirem
    const totalEl = document.querySelector('[data-stat-total-posts]');
    const favEl = document.querySelector('[data-stat-favorite-posts]');

    if (totalEl) totalEl.textContent = stats.total;
    if (favEl) favEl.textContent = stats.favoritos;

    return stats;
  }

  /**
   * Reseta filtros
   */
  resetFilters() {
    this.dataModule.reset();
    document.querySelectorAll('[data-filter-category]').forEach(btn => {
      btn.classList.remove('active');
    });
    this.render();
  }

  /**
   * Obtém categorias para UI
   */
  getCategories() {
    const categories = this.dataModule.getAvailableCategories();
    return categories.map(cat => ({
      value: cat,
      label: CONFIG.POST_CATEGORIES[cat]?.label || cat,
      icon: CONFIG.POST_CATEGORIES[cat]?.icon || '📌'
    }));
  }

  /**
   * Exporta dados filtrados (para share, download, etc)
   */
  exportFiltered(format = 'json') {
    const filtered = this.dataModule.getAll();

    if (format === 'json') {
      return JSON.stringify(filtered, null, 2);
    }

    if (format === 'csv') {
      const headers = ['id', 'title', 'category', 'date', 'favorite'];
      const rows = filtered.map(p => [
        p.id,
        `"${p.title}"`,
        p.category,
        p.date,
        p.favorite
      ]);

      return [headers, ...rows].map(row => row.join(',')).join('\n');
    }

    return null;
  }
}

// Instância global
let postsSystem;

/**
 * Inicializa quando DOM está pronto
 */
function initPostsPage() {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      postsSystem = new PostsSystem();
      postsSystem.init();
    });
  } else {
    postsSystem = new PostsSystem();
    postsSystem.init();
  }
}

// Exporta globalmente
window.PostsSystem = PostsSystem;
window.initPostsPage = initPostsPage;
