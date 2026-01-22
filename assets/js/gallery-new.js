/**
 * Sistema de Galeria Refatorado - NOVO
 * Usa DataModule + DOMRenderer (idêntico a posts, apenas troca tipo e dados)
 * 
 * REUTILIZA: DataModule, DOMRenderer, Carousel genérica
 * ELIMINA: 600+ linhas de código duplicado
 */

class GallerySystem {
  constructor() {
    this.dataModule = new DataModule(ALL_DATA.gallery, DATA_TYPES.GALLERY, {
      itemsPerPage: CONFIG.GALLERY_PER_PAGE
    });

    this.renderer = new DOMRenderer({
      container: '#gallery-grid',
      type: DATA_TYPES.GALLERY,
      onFavoriteClick: (id) => this.handleFavorite(id),
      onCardClick: (item) => this.handleCardClick(item)
    });

    this.carousel = null;
    this.containerSelector = '#gallery-grid';
    this.paginationSelector = '#gallery-pagination';
  }

  /**
   * Inicializa o sistema
   */
  init() {
    this.setupCarousel();
    this.setupEventListeners();
    this.render();
    this.updateStats();
  }

  /**
   * Configura carousel para home (opcional)
   */
  setupCarousel() {
    const carouselContainer = document.querySelector('[data-carousel-gallery]');
    if (!carouselContainer) return;

    this.carousel = new Carousel({
      container: '[data-carousel-gallery]',
      items: this.dataModule.getFirst(4),
      visibleItems: 4,
      template: (item, index) => `
        <div class="carousel-item ${index === 0 ? 'active' : ''}" data-id="${item.id}">
          <img src="${item.image}" alt="${item.title}" class="carousel-image">
          <h4 class="carousel-title">${item.title}</h4>
        </div>
      `
    });
  }

  /**
   * Configura event listeners
   */
  setupEventListeners() {
    // Filtros por categoria
    document.querySelectorAll('[data-filter-gallery-category]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const category = e.target.dataset.filterGalleryCategory;
        this.filterByCategory(category);
      });
    });

    // Filtros por ano
    document.querySelectorAll('[data-filter-gallery-year]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const year = e.target.dataset.filterGalleryYear;
        this.filterByYear(year);
      });
    });

    // Busca
    const searchInput = document.querySelector('[data-search-gallery]');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.dataModule.search(e.target.value);
        this.render();
      });
    }

    // View mode (grid/list)
    document.querySelectorAll('[data-view-mode]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.changeViewMode(e.target.dataset.viewMode);
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
   * Filtra por ano
   */
  filterByYear(year) {
    this.dataModule.filterByYear(year);
    this.updateFilterButtons('year', year);
    this.render();
  }

  /**
   * Muda modo de visualização
   */
  changeViewMode(mode) {
    const container = document.querySelector(this.containerSelector);
    if (!container) return;

    container.classList.remove('grid-view', 'list-view');
    container.classList.add(`${mode}-view`);

    document.querySelectorAll('[data-view-mode]').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.viewMode === mode);
    });
  }

  /**
   * Atualiza botões de filtro
   */
  updateFilterButtons(filterType, activeValue) {
    let selector;
    if (filterType === 'category') {
      selector = '[data-filter-gallery-category]';
    } else if (filterType === 'year') {
      selector = '[data-filter-gallery-year]';
    }

    document.querySelectorAll(selector).forEach(btn => {
      const btnValue = filterType === 'category'
        ? btn.dataset.filterGalleryCategory
        : btn.dataset.filterGalleryYear;

      btn.classList.toggle('active', btnValue === activeValue);
    });
  }

  /**
   * Vai para página
   */
  goToPage(page) {
    this.dataModule.goToPage(page);
    this.render();
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
   * Abre imagem em lightbox
   */
  openLightbox(id) {
    const item = this.dataModule.getItemById(id);
    if (!item) return;

    const html = `
      <div class="lightbox">
        <button class="lightbox-close">&times;</button>
        <div class="lightbox-content">
          <img src="${item.image}" alt="${item.title}" class="lightbox-image">
          <div class="lightbox-info">
            <h2>${item.title}</h2>
            <p>${item.description}</p>
            <p class="lightbox-credit">${item.credit}</p>
          </div>
        </div>
      </div>
    `;

    const container = document.querySelector('body');
    container.insertAdjacentHTML('beforeend', html);

    const lightbox = document.querySelector('.lightbox');
    const closeBtn = lightbox.querySelector('.lightbox-close');

    closeBtn.addEventListener('click', () => lightbox.remove());
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) lightbox.remove();
    });
  }

  /**
   * Trata clique em favorito
   */
  handleFavorite(id) {
    this.dataModule.toggleFavorite(id);
    this.updateStats();
  }

  /**
   * Trata clique no item
   */
  handleCardClick(item) {
    this.openLightbox(item.id);
  }

  /**
   * Renderiza galeria
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

    if (info.hasPrevPage) {
      html += `<button class="pagination-btn prev" onclick="gallerySystem.prevPage()">← anterior</button>`;
    }

    for (let i = 1; i <= info.totalPages; i++) {
      const active = i === info.currentPage ? 'active' : '';
      html += `<button class="pagination-btn ${active}" onclick="gallerySystem.goToPage(${i})">${i}</button>`;
    }

    if (info.hasNextPage) {
      html += `<button class="pagination-btn next" onclick="gallerySystem.nextPage()">próxima →</button>`;
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
      favoritos: this.dataModule.items.filter(g => g.favorite).length,
      categorias: this.dataModule.getAvailableCategories().length,
      anos: this.dataModule.getAvailableYears().length
    };

    const totalEl = document.querySelector('[data-stat-total-gallery]');
    const favEl = document.querySelector('[data-stat-favorite-gallery]');

    if (totalEl) totalEl.textContent = stats.total;
    if (favEl) favEl.textContent = stats.favoritos;

    return stats;
  }

  /**
   * Reseta filtros
   */
  resetFilters() {
    this.dataModule.reset();
    document.querySelectorAll('[data-filter-gallery-category], [data-filter-gallery-year]')
      .forEach(btn => btn.classList.remove('active'));
    this.render();
  }

  /**
   * Obtém categorias disponíveis
   */
  getCategories() {
    const categories = this.dataModule.getAvailableCategories();
    return categories.map(cat => ({
      value: cat,
      label: CONFIG.GALLERY_CATEGORIES[cat]?.label || cat,
      icon: CONFIG.GALLERY_CATEGORIES[cat]?.icon || '📷'
    }));
  }

  /**
   * Obtém anos disponíveis
   */
  getYears() {
    return this.dataModule.getAvailableYears();
  }

  /**
   * Download como ZIP (mock)
   */
  downloadAsZip() {
    const filtered = this.dataModule.getAll();
    console.log('Download iniciado para:', filtered.length, 'itens');
    // Implementar com biblioteca de ZIP se necessário
  }
}

// Instância global
let gallerySystem;

/**
 * Inicializa quando DOM está pronto
 */
function initGalleryPage() {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      gallerySystem = new GallerySystem();
      gallerySystem.init();
    });
  } else {
    gallerySystem = new GallerySystem();
    gallerySystem.init();
  }
}

// Exporta globalmente
window.GallerySystem = GallerySystem;
window.initGalleryPage = initGalleryPage;
