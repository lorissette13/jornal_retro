/**
 * DataModule - Sistema Centralizado de Dados
 * Abstração para gerenciar qualquer tipo de coleção (posts, projetos, galeria, timeline)
 * Oferece filtros, busca, paginação e ordenação de forma genérica
 */

class DataModule {
  /**
   * @param {Array} items - Array de items (posts, projetos, etc)
   * @param {String} type - Tipo de dados (posts, projects, gallery, timeline)
   * @param {Object} options - Configuração do módulo
   */
  constructor(items = [], type = DATA_TYPES.POSTS, options = {}) {
    this.items = items;
    this.type = type;
    this.filtered = [...items];
    this.currentPage = 1;
    this.itemsPerPage = options.itemsPerPage || this._getDefaultPagination();
    this.sortBy = options.sortBy || 'date';
    this.sortOrder = options.sortOrder || 'desc';
    this.searchTerm = '';
    this.filters = {};
    this.favorites = this._loadFavorites();
  }

  /**
   * Obtém paginação padrão baseada no tipo
   */
  _getDefaultPagination() {
    const defaults = {
      [DATA_TYPES.POSTS]: CONFIG.POSTS_PER_PAGE,
      [DATA_TYPES.PROJECTS]: CONFIG.PROJECTS_PER_PAGE,
      [DATA_TYPES.GALLERY]: CONFIG.GALLERY_PER_PAGE,
      [DATA_TYPES.TIMELINE]: CONFIG.TIMELINE_PER_PAGE
    };
    return defaults[this.type] || 6;
  }

  /**
   * Carrega favoritos do localStorage
   */
  _loadFavorites() {
    const stored = localStorage.getItem(CONFIG.STORAGE_KEYS.FAVORITES);
    return stored ? JSON.parse(stored) : [];
  }

  /**
   * Salva favoritos no localStorage
   */
  _saveFavorites() {
    localStorage.setItem(CONFIG.STORAGE_KEYS.FAVORITES, JSON.stringify(this.favorites));
  }

  /**
   * Filtra items por categoria
   */
  filterByCategory(category) {
    if (category === 'all') {
      this.filters.category = null;
    } else {
      this.filters.category = category;
    }
    this.currentPage = 1;
    this._applyFilters();
    return this;
  }

  /**
   * Filtra items por ano
   */
  filterByYear(year) {
    if (year === 'all') {
      this.filters.year = null;
    } else {
      this.filters.year = year;
    }
    this.currentPage = 1;
    this._applyFilters();
    return this;
  }

  /**
   * Filtra items por tipo (timeline)
   */
  filterByType(type) {
    if (type === 'all') {
      this.filters.type = null;
    } else {
      this.filters.type = type;
    }
    this.currentPage = 1;
    this._applyFilters();
    return this;
  }

  /**
   * Filtra itens favoritos
   */
  filterFavorites(showOnly = false) {
    this.filters.favorites = showOnly;
    this.currentPage = 1;
    this._applyFilters();
    return this;
  }

  /**
   * Busca por termo (título, descrição, tags)
   */
  search(term) {
    this.searchTerm = term.toLowerCase();
    this.currentPage = 1;
    this._applyFilters();
    return this;
  }

  /**
   * Ordena items
   */
  sort(key, order = 'desc') {
    this.sortBy = key;
    this.sortOrder = order;
    this._applySort();
    return this;
  }

  /**
   * Define quantidade de items por página
   */
  setPagination(itemsPerPage) {
    this.itemsPerPage = itemsPerPage;
    this.currentPage = 1;
    return this;
  }

  /**
   * Vai para página específica
   */
  goToPage(page) {
    const maxPages = this.getTotalPages();
    this.currentPage = Math.max(1, Math.min(page, maxPages));
    return this;
  }

  /**
   * Próxima página
   */
  nextPage() {
    const maxPages = this.getTotalPages();
    if (this.currentPage < maxPages) {
      this.currentPage++;
    }
    return this;
  }

  /**
   * Página anterior
   */
  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
    return this;
  }

  /**
   * Aplica todos os filtros
   */
  _applyFilters() {
    this.filtered = [...this.items];

    // Filtro por categoria
    if (this.filters.category) {
      this.filtered = this.filtered.filter(item => item.category === this.filters.category);
    }

    // Filtro por ano
    if (this.filters.year) {
      this.filtered = this.filtered.filter(item => {
        const itemYear = this._extractYear(item);
        return itemYear === this.filters.year;
      });
    }

    // Filtro por tipo (timeline)
    if (this.filters.type) {
      this.filtered = this.filtered.filter(item => item.type === this.filters.type);
    }

    // Filtro de favoritos
    if (this.filters.favorites) {
      this.filtered = this.filtered.filter(item => item.favorite === true);
    }

    // Busca por texto
    if (this.searchTerm) {
      this.filtered = this.filtered.filter(item => this._matchesSearch(item));
    }

    this._applySort();
  }

  /**
   * Aplica ordenação
   */
  _applySort() {
    this.filtered.sort((a, b) => {
      let aVal = this._getPropertyValue(a, this.sortBy);
      let bVal = this._getPropertyValue(b, this.sortBy);

      // Tratamento especial para datas
      if (this.sortBy === 'date') {
        aVal = new Date(aVal || '1970-01-01');
        bVal = new Date(bVal || '1970-01-01');
      }

      // Comparação
      if (aVal < bVal) return this.sortOrder === 'asc' ? -1 : 1;
      if (aVal > bVal) return this.sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }

  /**
   * Obtém valor de propriedade aninhada
   */
  _getPropertyValue(obj, path) {
    return path.split('.').reduce((current, prop) => current?.[prop], obj);
  }

  /**
   * Extrai ano de um item
   */
  _extractYear(item) {
    if (item.year) return item.year.toString();
    if (item.date) return item.date.substring(0, 4);
    if (item.period) return item.period.split('-')[0];
    return '';
  }

  /**
   * Verifica se item corresponde à busca
   */
  _matchesSearch(item) {
    const searchIn = [
      item.title || '',
      item.description || '',
      item.content?.descricao || '',
      (item.tags || []).join(' '),
      (item.skills || []).join(' ')
    ].join(' ').toLowerCase();

    return searchIn.includes(this.searchTerm);
  }

  /**
   * Obtém items da página atual
   */
  getPageItems() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filtered.slice(start, end);
  }

  /**
   * Obtém item por ID
   */
  getItemById(id) {
    return this.items.find(item => item.id === id);
  }

  /**
   * Obtém N primeiros items
   */
  getFirst(n) {
    return this.filtered.slice(0, n);
  }

  /**
   * Obtém todos os items filtrados
   */
  getAll() {
    return this.filtered;
  }

  /**
   * Total de items filtrados
   */
  getCount() {
    return this.filtered.length;
  }

  /**
   * Total de páginas
   */
  getTotalPages() {
    return Math.ceil(this.filtered.length / this.itemsPerPage);
  }

  /**
   * Informações de paginação
   */
  getPaginationInfo() {
    const total = this.getCount();
    const totalPages = this.getTotalPages();
    const start = (this.currentPage - 1) * this.itemsPerPage + 1;
    const end = Math.min(this.currentPage * this.itemsPerPage, total);

    return {
      currentPage: this.currentPage,
      totalPages,
      totalItems: total,
      itemsPerPage: this.itemsPerPage,
      showingFrom: start,
      showingTo: end,
      hasNextPage: this.currentPage < totalPages,
      hasPrevPage: this.currentPage > 1
    };
  }

  /**
   * Alterna item como favorito
   */
  toggleFavorite(id) {
    const index = this.favorites.indexOf(id);
    if (index > -1) {
      this.favorites.splice(index, 1);
    } else {
      this.favorites.push(id);
    }
    this._saveFavorites();

    // Atualiza item local
    const item = this.getItemById(id);
    if (item) {
      item.favorite = !item.favorite;
    }

    return this;
  }

  /**
   * Verifica se item é favorito
   */
  isFavorite(id) {
    return this.favorites.includes(id);
  }

  /**
   * Obtém lista de anos disponíveis
   */
  getAvailableYears() {
    const years = new Set();
    this.items.forEach(item => {
      const year = this._extractYear(item);
      if (year) years.add(year);
    });
    return Array.from(years).sort().reverse();
  }

  /**
   * Obtém lista de categorias disponíveis
   */
  getAvailableCategories() {
    const categories = new Set();
    this.items.forEach(item => {
      if (item.category) categories.add(item.category);
    });
    return Array.from(categories).sort();
  }

  /**
   * Obtém lista de tipos disponíveis (timeline)
   */
  getAvailableTypes() {
    const types = new Set();
    this.items.forEach(item => {
      if (item.type) types.add(item.type);
    });
    return Array.from(types).sort();
  }

  /**
   * Reseta todos os filtros
   */
  reset() {
    this.filtered = [...this.items];
    this.currentPage = 1;
    this.searchTerm = '';
    this.filters = {};
    this.sortBy = 'date';
    this.sortOrder = 'desc';
    return this;
  }

  /**
   * Exporta estado atual para salvar em localStorage
   */
  getState() {
    return {
      sortBy: this.sortBy,
      sortOrder: this.sortOrder,
      favorites: this.favorites
    };
  }

  /**
   * Restaura estado anterior
   */
  setState(state) {
    if (state.sortBy) this.sortBy = state.sortBy;
    if (state.sortOrder) this.sortOrder = state.sortOrder;
    if (state.favorites) this.favorites = state.favorites;
    return this;
  }
}

// Exporta para uso global
window.DataModule = DataModule;
