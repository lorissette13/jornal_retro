// utils.js - Utilitários compartilhados para filtros, paginação e renderização

/**
 * Filtra dados por categoria/status
 * @param {Array} data - Array de itens
 * @param {string} filter - Filtro a aplicar ('all' ou valor específico)
 * @param {string} filterKey - Chave do objeto para filtrar (ex: 'category', 'status')
 * @returns {Array} Dados filtrados
 */
function filterData(data, filter, filterKey = 'category') {
    if (filter === 'all') return data;
    return data.filter(item => item[filterKey] === filter);
}

/**
 * Pagina dados
 * @param {Array} data - Array de itens
 * @param {number} page - Página atual (1-based)
 * @param {number} perPage - Itens por página
 * @returns {Object} { items: Array, totalPages: number, hasNext: boolean, hasPrev: boolean }
 */
function paginateData(data, page, perPage) {
    const totalPages = Math.ceil(data.length / perPage);
    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;
    const items = data.slice(startIndex, endIndex);

    return {
        items,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1
    };
}

/**
 * Atualiza controles de paginação
 * @param {number} currentPage - Página atual
 * @param {number} totalPages - Total de páginas
 * @param {string} currentPageId - ID do elemento para página atual
 * @param {string} totalPagesId - ID do elemento para total de páginas
 * @param {string} prevBtnId - ID do botão anterior
 * @param {string} nextBtnId - ID do botão próximo
 */
function updatePaginationControls(currentPage, totalPages, currentPageId, totalPagesId, prevBtnId, nextBtnId) {
    document.getElementById(currentPageId).textContent = currentPage;
    document.getElementById(totalPagesId).textContent = totalPages;
    document.getElementById(prevBtnId).disabled = currentPage === 1;
    document.getElementById(nextBtnId).disabled = currentPage === totalPages;
}

/**
 * Configura filtros
 * @param {string} selector - Seletor CSS para botões de filtro
 * @param {Function} onFilterChange - Callback quando filtro muda (recebe filterValue)
 */
function setupFilters(selector, onFilterChange) {
    const filterBtns = document.querySelectorAll(selector);
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-pressed', 'false');
            });
            this.classList.add('active');
            this.setAttribute('aria-pressed', 'true');

            const filterValue = this.getAttribute('data-category') || this.getAttribute('data-status') || 'all';
            onFilterChange(filterValue);
        });
    });
}

/**
 * Configura navegação de páginas
 * @param {string} prevBtnId - ID do botão anterior
 * @param {string} nextBtnId - ID do botão próximo
 * @param {Function} onPageChange - Callback quando página muda (recebe direction: 'prev' ou 'next')
 */
function setupPagination(prevBtnId, nextBtnId, onPageChange) {
    document.getElementById(prevBtnId).addEventListener('click', () => onPageChange('prev'));
    document.getElementById(nextBtnId).addEventListener('click', () => onPageChange('next'));
}

/**
 * Carrega dados JSON
 * @param {string} url - URL do arquivo JSON
 * @returns {Promise<Object>} Dados carregados
 */
function loadJSON(url) {
    return fetch(url).then(response => response.json());
}

/**
 * Renderiza HTML de item (placeholder - implementar por módulo)
 * @param {Object} item - Item a renderizar
 * @returns {string} HTML
 */
function renderItemHTML(item) {
    // Implementar por módulo específico
    return `<div>${item.title || item.name}</div>`;
}