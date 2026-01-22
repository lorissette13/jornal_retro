/**
 * Sistema de Timeline Refatorado - NOVO
 * Usa DataModule + DOMRenderer customizado para timeline
 * 
 * REDUZ de 543 linhas para ~180 linhas
 * Timeline é um tipo especial de card com layout vertical
 */

class TimelineSystem {
  constructor() {
    this.dataModule = new DataModule(ALL_DATA.timeline, DATA_TYPES.TIMELINE, {
      itemsPerPage: CONFIG.TIMELINE_PER_PAGE
    });

    this.renderer = new DOMRenderer({
      container: '#timeline-container',
      type: DATA_TYPES.TIMELINE,
      onFavoriteClick: (id) => this.handleFavorite(id),
      onCardClick: (item) => this.handleCardClick(item)
    });

    this.containerSelector = '#timeline-container';
    this.paginationSelector = '#timeline-pagination';
    this.filterMode = 'all'; // all, work, education, certification
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
    // Filtros por tipo
    document.querySelectorAll('[data-filter-timeline-type]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const type = e.target.dataset.filterTimelineType;
        this.filterByType(type);
      });
    });

    // Ordenação temporal (ASC/DESC)
    document.querySelectorAll('[data-timeline-sort]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const order = e.target.dataset.timelineSort;
        this.changeTimelineOrder(order);
      });
    });

    // Filtro de favoritos
    const favBtn = document.querySelector('[data-timeline-favorites]');
    if (favBtn) {
      favBtn.addEventListener('click', () => {
        this.toggleFavoritesFilter();
      });
    }

    // Expandir/Retrair itens
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('timeline-expand-btn')) {
        this.toggleItemExpanded(e.target.closest('.timeline-item'));
      }
    });
  }

  /**
   * Filtra por tipo
   */
  filterByType(type) {
    if (type === 'all') {
      this.dataModule.filterByType(null);
      this.dataModule.filters.type = null;
    } else {
      this.dataModule.filterByType(type);
    }
    this.dataModule._applyFilters();
    this.updateFilterButtons('type', type);
    this.render();
  }

  /**
   * Muda ordem temporal
   */
  changeTimelineOrder(order) {
    this.dataModule.sort('date', order === 'asc' ? 'asc' : 'desc');
    this.updateFilterButtons('sort', order);
    this.render();
  }

  /**
   * Toggle filtro favoritos
   */
  toggleFavoritesFilter() {
    const showFavorites = !this.dataModule.filters.favorites;
    this.dataModule.filterFavorites(showFavorites);
    const btn = document.querySelector('[data-timeline-favorites]');
    if (btn) btn.classList.toggle('active', showFavorites);
    this.render();
  }

  /**
   * Atualiza botões de filtro
   */
  updateFilterButtons(filterType, activeValue) {
    let selector;
    if (filterType === 'type') {
      selector = '[data-filter-timeline-type]';
    } else if (filterType === 'sort') {
      selector = '[data-timeline-sort]';
    }

    if (selector) {
      document.querySelectorAll(selector).forEach(btn => {
        const btnValue = filterType === 'type'
          ? btn.dataset.filterTimelineType
          : btn.dataset.timelineSort;

        btn.classList.toggle('active', btnValue === activeValue);
      });
    }
  }

  /**
   * Expande/Retrai item
   */
  toggleItemExpanded(element) {
    element.classList.toggle('expanded');
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
   * Trata clique no item (pode expandir automaticamente)
   */
  handleCardClick(item) {
    console.log('Timeline item clicado:', item);
    // Pode abrir em modal, expandir, redirecionar para detalhes, etc
  }

  /**
   * Renderiza timeline
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

    let html = '<div class="timeline-pagination">';

    if (info.hasPrevPage) {
      html += `<button class="timeline-nav-btn prev" onclick="timelineSystem.prevPage()">← anterior</button>`;
    }

    for (let i = 1; i <= info.totalPages; i++) {
      const active = i === info.currentPage ? 'active' : '';
      html += `<button class="timeline-nav-btn ${active}" onclick="timelineSystem.goToPage(${i})">${i}</button>`;
    }

    if (info.hasNextPage) {
      html += `<button class="timeline-nav-btn next" onclick="timelineSystem.nextPage()">próxima →</button>`;
    }

    html += `<span class="timeline-info">${info.showingFrom}-${info.showingTo} de ${info.totalItems}</span></div>`;

    container.innerHTML = html;
  }

  /**
   * Atualiza estatísticas
   */
  updateStats() {
    const items = this.dataModule.items;
    const stats = {
      total: items.length,
      trabalho: items.filter(i => i.type === 'work').length,
      educacao: items.filter(i => i.type === 'education').length,
      certificacoes: items.filter(i => i.type === 'certification').length,
      projetos: items.filter(i => i.type === 'project').length,
      favoritos: items.filter(i => i.favorite).length
    };

    const totalEl = document.querySelector('[data-stat-total-timeline]');
    const workEl = document.querySelector('[data-stat-work]');
    const educEl = document.querySelector('[data-stat-education]');
    const certEl = document.querySelector('[data-stat-certifications]');
    const projEl = document.querySelector('[data-stat-projects]');
    const favEl = document.querySelector('[data-stat-favorite-timeline]');

    if (totalEl) totalEl.textContent = stats.total;
    if (workEl) workEl.textContent = stats.trabalho;
    if (educEl) educEl.textContent = stats.educacao;
    if (certEl) certEl.textContent = stats.certificacoes;
    if (projEl) projEl.textContent = stats.projetos;
    if (favEl) favEl.textContent = stats.favoritos;

    return stats;
  }

  /**
   * Reseta filtros
   */
  resetFilters() {
    this.dataModule.reset();
    document.querySelectorAll('[data-filter-timeline-type]')
      .forEach(btn => btn.classList.remove('active'));
    this.render();
  }

  /**
   * Obtém tipos disponíveis
   */
  getTypes() {
    const types = this.dataModule.getAvailableTypes();
    return types.map(type => ({
      value: type,
      label: CONFIG.TIMELINE_TYPES[type]?.label || type,
      icon: CONFIG.TIMELINE_TYPES[type]?.icon || '📌'
    }));
  }

  /**
   * Obtém itens por tipo
   */
  getItemsByType(type) {
    return this.dataModule.items.filter(item => item.type === type);
  }

  /**
   * Agrupa itens por tipo para visualização
   */
  getGroupedItems() {
    const grouped = {};
    const types = this.dataModule.getAvailableTypes();

    types.forEach(type => {
      grouped[type] = {
        label: CONFIG.TIMELINE_TYPES[type]?.label || type,
        icon: CONFIG.TIMELINE_TYPES[type]?.icon || '📌',
        items: this.getItemsByType(type)
      };
    });

    return grouped;
  }

  /**
   * Exporta timeline como JSON
   */
  exportAsJSON() {
    const items = this.dataModule.getAll();
    return JSON.stringify(items, null, 2);
  }

  /**
   * Exporta timeline como CV/Currículo
   */
  exportAsCV() {
    const items = this.dataModule.getAll();

    let cv = '# Currículo - Lorissette13\n\n';

    // Agrupar por tipo
    const grouped = this.getGroupedItems();

    if (grouped.work?.items.length > 0) {
      cv += '## Experiência Profissional\n\n';
      grouped.work.items.forEach(item => {
        cv += `### ${item.title}\n`;
        cv += `**${item.company}** | ${item.period}\n`;
        cv += `${item.description}\n\n`;
      });
    }

    if (grouped.education?.items.length > 0) {
      cv += '## Educação\n\n';
      grouped.education.items.forEach(item => {
        cv += `### ${item.title}\n`;
        cv += `**${item.institution}** | ${item.period}\n`;
        cv += `${item.description}\n\n`;
      });
    }

    if (grouped.certification?.items.length > 0) {
      cv += '## Certificações\n\n';
      grouped.certification.items.forEach(item => {
        cv += `- **${item.title}** (${item.period})\n`;
      });
    }

    return cv;
  }
}

// Instância global
let timelineSystem;

/**
 * Inicializa quando DOM está pronto
 */
function initTimelinePage() {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      timelineSystem = new TimelineSystem();
      timelineSystem.init();
    });
  } else {
    timelineSystem = new TimelineSystem();
    timelineSystem.init();
  }
}

// Exporta globalmente
window.TimelineSystem = TimelineSystem;
window.initTimelinePage = initTimelinePage;
