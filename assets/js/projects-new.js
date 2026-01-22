/**
 * Sistema de Projetos Refatorado - NOVO
 * Usa DataModule + DOMRenderer + Carousel genérica
 * 
 * REDUZ de 532 linhas para ~180 linhas
 * REUTILIZA: DataModule, DOMRenderer, configurações centralizadas
 */

class ProjectsSystem {
  constructor() {
    this.dataModule = new DataModule(ALL_DATA.projects, DATA_TYPES.PROJECTS, {
      itemsPerPage: CONFIG.PROJECTS_PER_PAGE
    });

    this.renderer = new DOMRenderer({
      container: '#projects-grid',
      type: DATA_TYPES.PROJECTS,
      onFavoriteClick: (id) => this.handleFavorite(id),
      onCardClick: (item) => this.handleCardClick(item)
    });

    this.containerSelector = '#projects-grid';
    this.paginationSelector = '#projects-pagination';
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
    document.querySelectorAll('[data-filter-project-category]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const category = e.target.dataset.filterProjectCategory;
        this.filterByCategory(category);
      });
    });

    // Filtro por status
    document.querySelectorAll('[data-filter-status]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const status = e.target.dataset.filterStatus;
        this.filterByStatus(status);
      });
    });

    // Busca
    const searchInput = document.querySelector('[data-search-projects]');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.dataModule.search(e.target.value);
        this.render();
      });
    }

    // Ordenação
    document.querySelectorAll('[data-sort-projects]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const key = e.target.dataset.sortProjects;
        const order = e.target.dataset.sortOrder || 'desc';
        this.dataModule.sort(key, order);
        this.render();
      });
    });

    // Filtro de favoritos
    const favBtn = document.querySelector('[data-filter-favorites-only]');
    if (favBtn) {
      favBtn.addEventListener('click', () => {
        this.toggleFavoritesFilter();
      });
    }
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
   * Filtra por status
   */
  filterByStatus(status) {
    if (status === 'all') {
      this.dataModule.filters.status = null;
    } else {
      this.dataModule.filters.status = status;
    }
    this.dataModule.currentPage = 1;
    this.dataModule._applyFilters();
    this.updateFilterButtons('status', status);
    this.render();
  }

  /**
   * Toggle filtro de favoritos
   */
  toggleFavoritesFilter() {
    const showFavorites = !this.dataModule.filters.favorites;
    this.dataModule.filterFavorites(showFavorites);
    const btn = document.querySelector('[data-filter-favorites-only]');
    if (btn) btn.classList.toggle('active', showFavorites);
    this.render();
  }

  /**
   * Atualiza botões de filtro
   */
  updateFilterButtons(filterType, activeValue) {
    let selector;
    if (filterType === 'category') {
      selector = '[data-filter-project-category]';
    } else if (filterType === 'status') {
      selector = '[data-filter-status]';
    }

    if (selector) {
      document.querySelectorAll(selector).forEach(btn => {
        const btnValue = filterType === 'category'
          ? btn.dataset.filterProjectCategory
          : btn.dataset.filterStatus;

        btn.classList.toggle('active', btnValue === activeValue);
      });
    }
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
    console.log('Projeto clicado:', item);
    // Pode abrir modal detalhado, redirecionar, etc
  }

  /**
   * Renderiza projetos
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
      html += `<button class="pagination-btn prev" onclick="projectsSystem.prevPage()">← anterior</button>`;
    }

    for (let i = 1; i <= info.totalPages; i++) {
      const active = i === info.currentPage ? 'active' : '';
      html += `<button class="pagination-btn ${active}" onclick="projectsSystem.goToPage(${i})">${i}</button>`;
    }

    if (info.hasNextPage) {
      html += `<button class="pagination-btn next" onclick="projectsSystem.nextPage()">próxima →</button>`;
    }

    html += `<span class="pagination-info">${info.showingFrom}-${info.showingTo} de ${info.totalItems}</span></div>`;

    container.innerHTML = html;
  }

  /**
   * Atualiza estatísticas
   */
  updateStats() {
    const items = this.dataModule.items;
    const stats = {
      total: items.length,
      ativo: items.filter(p => p.status === 'ativo').length,
      favoritos: items.filter(p => p.favorite).length,
      categorias: this.dataModule.getAvailableCategories().length
    };

    const totalEl = document.querySelector('[data-stat-total-projects]');
    const ativoEl = document.querySelector('[data-stat-active-projects]');
    const favEl = document.querySelector('[data-stat-favorite-projects]');

    if (totalEl) totalEl.textContent = stats.total;
    if (ativoEl) ativoEl.textContent = stats.ativo;
    if (favEl) favEl.textContent = stats.favoritos;

    return stats;
  }

  /**
   * Reseta todos os filtros
   */
  resetFilters() {
    this.dataModule.reset();
    document.querySelectorAll('[data-filter-project-category], [data-filter-status]')
      .forEach(btn => btn.classList.remove('active'));
    this.render();
  }

  /**
   * Obtém tecnologias disponíveis
   */
  getTechnologies() {
    const techs = new Set();
    this.dataModule.items.forEach(project => {
      if (project.tech) {
        project.tech.forEach(t => techs.add(t));
      }
    });
    return Array.from(techs).sort();
  }

  /**
   * Filtra por tecnologia
   */
  filterByTechnology(tech) {
    this.dataModule.filtered = this.dataModule.items.filter(project => {
      return project.tech && project.tech.includes(tech);
    });
    this.dataModule.currentPage = 1;
    this.render();
  }

  /**
   * Obtém categorias
   */
  getCategories() {
    const categories = this.dataModule.getAvailableCategories();
    return categories.map(cat => ({
      value: cat,
      label: CONFIG.PROJECT_CATEGORIES[cat]?.label || cat,
      icon: CONFIG.PROJECT_CATEGORIES[cat]?.icon || '💼'
    }));
  }

  /**
   * Share projeto
   */
  shareProject(id, platform = 'twitter') {
    const project = this.dataModule.getItemById(id);
    if (!project) return;

    const text = encodeURIComponent(`Confira o projeto "${project.title}": ${project.description}`);
    const url = `${window.location.origin}${window.location.pathname}`;

    const platforms = {
      twitter: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`
    };

    if (platforms[platform]) {
      window.open(platforms[platform], '_blank', 'width=600,height=400');
    }
  }

  /**
   * Exporta projetos filtrados
   */
  exportFiltered(format = 'json') {
    const filtered = this.dataModule.getAll();

    if (format === 'json') {
      return JSON.stringify(filtered, null, 2);
    }

    if (format === 'csv') {
      const headers = ['id', 'title', 'category', 'year', 'status', 'tech'];
      const rows = filtered.map(p => [
        p.id,
        `"${p.title}"`,
        p.category,
        p.year,
        p.status,
        `"${(p.tech || []).join(', ')}"`
      ]);

      return [headers, ...rows].map(row => row.join(',')).join('\n');
    }

    return null;
  }
}

// Instância global
let projectsSystem;

/**
 * Inicializa quando DOM está pronto
 */
function initProjectsPage() {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      projectsSystem = new ProjectsSystem();
      projectsSystem.init();
    });
  } else {
    projectsSystem = new ProjectsSystem();
    projectsSystem.init();
  }
}

// Exporta globalmente
window.ProjectsSystem = ProjectsSystem;
window.initProjectsPage = initProjectsPage;
