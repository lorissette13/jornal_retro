:assets/js/projects.js
/**
 * Sistema de Projetos Portfólio
 * Filtros, busca e exibição de projetos
 */

let projectsData = [];
let filteredProjects = [];
let currentCategory = 'all';
const PROJECTS_PER_PAGE = 6;
let currentPage = 1;

// Inicializa página de projetos
async function initProjectsPage() {
    await loadProjectsData();
    setupEventListeners();
    updateProjectsDisplay();
    updateProjectsStats();
}

// Carrega dados dos projetos
async function loadProjectsData() {
    try {
        const response = await fetch('../assets/data/projects.json');
        const data = await response.json();
        projectsData = data.projects;
        
        // Ordena por ano (mais recente primeiro)
        projectsData.sort((a, b) => parseInt(b.year) - parseInt(a.year));
        
        filteredProjects = [...projectsData];
    } catch (error) {
        console.error('Erro ao carregar projetos:', error);
        showProjectsError();
    }
}

// Configura event listeners
function setupEventListeners() {
    // Filtros por categoria (botões)
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            currentCategory = btn.dataset.category;
            updateFilterButtons(btn);
            applyFilters();
        });
    });
    
    // Favoritos
    document.addEventListener('click', handleFavoriteClick);
}

// Atualiza botões de filtro ativos
function updateFilterButtons(activeBtn) {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.toggle('active', btn === activeBtn);
    });
}

// Aplica todos os filtros
function applyFilters() {
    let results = [...projectsData];
    
    // Filtro por categoria
    if (currentCategory !== 'all') {
        results = results.filter(project => project.category === currentCategory);
    }
    
    filteredProjects = results;
    currentPage = 1;
    updateProjectsDisplay();
    updateProjectsStats();
}

// Atualiza display dos projetos
function updateProjectsDisplay() {
    const container = document.getElementById('projects-grid');
    const pagination = document.getElementById('projects-pagination');
    
    if (!container) return;
    
    // Calcula paginação
    const totalPages = Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE);
    const startIndex = (currentPage - 1) * PROJECTS_PER_PAGE;
    const endIndex = startIndex + PROJECTS_PER_PAGE;
    const projectsToShow = filteredProjects.slice(startIndex, endIndex);
    
    if (projectsToShow.length === 0) {
        container.innerHTML = '<div class="no-projects">nenhum projeto encontrado</div>';
    } else {
        container.innerHTML = projectsToShow.map(createProjectCard).join('');
    }
    
    // Atualiza paginação
    updatePagination(pagination, totalPages);
}

// Cria card de projeto
function createProjectCard(project) {
    const statusClass = project.status === 'ativo' ? 'ativo' : 'arquivado';
    const favoriteIcon = project.favorite ? '★' : '☆';
    
    return `
        <article class="project-card" data-id="${project.id}" data-category="${project.category}">
            <div class="project-header">
                <div class="project-meta">
                    <span class="project-category">${project.category}</span>
                    <span class="project-year">${project.year}</span>
                </div>
                
                <button class="project-favorite" 
                        data-project-id="${project.id}"
                        aria-label="${project.favorite ? 'remover dos favoritos' : 'marcar como favorito'}">
                    ${favoriteIcon}
                </button>
                
                <h3 class="project-title">${project.title}</h3>
                <span class="project-status ${statusClass}">${project.status}</span>
            </div>
            
            <div class="project-body">
                <p class="project-description">${project.description}</p>
                
                ${project.features && project.features.length > 0 ? `
                    <div class="project-features">
                        <div class="project-features-title">principais features:</div>
                        <ul class="project-features-list">
                            ${project.features.map(feature => `
                                <li class="project-feature">${feature}</li>
                            `).join('')}
                        </ul>
                    </div>
                ` : ''}
                
                <div class="project-tech">
                    <div class="project-tech-title">tecnologias:</div>
                    <div class="project-tech-list">
                        ${project.tech.map(tech => `
                            <span class="project-tech-item">${tech}</span>
                        `).join('')}
                    </div>
                </div>
            </div>
            
            <div class="project-footer">
                <div class="project-links">
                    ${project.github ? `
                        <a href="${project.github}" 
                           target="_blank" 
                           class="project-link github"
                           aria-label="ver código no github">
                            código
                        </a>
                    ` : ''}
                    
                    ${project.demo ? `
                        <a href="${project.demo}" 
                           target="_blank" 
                           class="project-link demo"
                           aria-label="ver demonstração">
                            demo
                        </a>
                    ` : ''}
                </div>
                
                <div class="project-actions">
                    <button class="project-action-btn share-btn" 
                            data-project-id="${project.id}"
                            aria-label="compartilhar projeto">
                        ↪
                    </button>
                </div>
            </div>
        </article>
    `;
}

// Atualiza paginação
function updatePagination(container, totalPages) {
    if (!container || totalPages <= 1) {
        container.innerHTML = '';
        return;
    }
    
    let paginationHTML = '';
    
    // Botão anterior
    paginationHTML += `
        <button class="pagination-btn prev-btn" 
                ${currentPage <= 1 ? 'disabled' : ''}
                data-page="${currentPage - 1}">
            ‹ anterior
        </button>
    `;
    
    // Números das páginas
    const maxVisible = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);
    
    if (endPage - startPage + 1 < maxVisible) {
        startPage = Math.max(1, endPage - maxVisible + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
        paginationHTML += `
            <button class="pagination-btn ${i === currentPage ? 'active' : ''}" 
                    data-page="${i}">
                ${i}
            </button>
        `;
    }
    
    // Botão próximo
    paginationHTML += `
        <button class="pagination-btn next-btn" 
                ${currentPage >= totalPages ? 'disabled' : ''}
                data-page="${currentPage + 1}">
            próximo ›
        </button>
    `;
    
    container.innerHTML = paginationHTML;
    
    // Adiciona eventos aos botões
    container.querySelectorAll('.pagination-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            if (!btn.disabled && btn.dataset.page) {
                goToPage(parseInt(btn.dataset.page));
            }
        });
    });
}

// Navega para página específica
function goToPage(page) {
    currentPage = page;
    updateProjectsDisplay();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Manipula clique em favoritos
function handleFavoriteClick(event) {
    if (event.target.classList.contains('project-favorite')) {
        event.preventDefault();
        const projectId = event.target.dataset.projectId;
        toggleProjectFavorite(projectId);
    }
}

// Alterna favorito do projeto
function toggleProjectFavorite(projectId) {
    const project = projectsData.find(p => p.id === projectId);
    if (project) {
        project.favorite = !project.favorite;
        
        // Atualiza no localStorage
        saveProjectFavorite(projectId, project.favorite);
        
        // Atualiza display
        updateProjectsDisplay();
        updateProjectsStats();
        
        // Atualiza na home se estiver nela
        if (window.location.pathname.includes('index.html')) {
            loadFeaturedProjects(3);
        }
    }
}

// Salva favorito no localStorage
function saveProjectFavorite(projectId, isFavorite) {
    try {
        const favorites = JSON.parse(localStorage.getItem('project-favorites') || '{}');
        favorites[projectId] = isFavorite;
        localStorage.setItem('project-favorites', JSON.stringify(favorites));
    } catch (error) {
        console.error('Erro ao salvar favorito:', error);
    }
}

// Atualiza estatísticas
function updateProjectsStats() {
    const totalProjects = projectsData.length;
    const favoriteProjects = projectsData.filter(p => p.favorite).length;
    const activeProjects = projectsData.filter(p => p.status === 'ativo').length;
    
    // Conta tecnologias únicas
    const allTech = projectsData.flatMap(p => p.tech);
    const uniqueTech = [...new Set(allTech)].length;
    
    document.getElementById('total-projects')?.textContent = totalProjects;
    document.getElementById('favorite-projects')?.textContent = favoriteProjects;
    document.getElementById('active-projects')?.textContent = activeProjects;
    document.getElementById('total-tech')?.textContent = uniqueTech;
}

// Carrega projetos favoritos para a home
function loadFeaturedProjects(limit = 3) {
    const container = document.getElementById('featured-projects');
    if (!container) return;
    
    const featured = projectsData
        .filter(project => project.favorite)
        .slice(0, limit);
    
    if (featured.length === 0) {
        container.innerHTML = `
            <h3 class="section-title">projetos em destaque</h3>
            <p class="loading-text">nenhum projeto favorito ainda</p>
        `;
        return;
    }
    
    const html = `
        <h3 class="section-title">projetos em destaque</h3>
        ${featured.map(createProjectPreview).join('')}
        <div class="btn-container">
            <a href="pages/projetos.html" class="btn-small">ver todos os projetos</a>
        </div>
    `;
    container.innerHTML = html;
}

// Cria preview de projeto para a home
function createProjectPreview(project) {
    const statusClass = project.status === 'ativo' ? 'ativo' : 'arquivado';
    
    return `
        <div class="news-item">
            <h4 class="news-title">${project.title}</h4>
            <p class="news-text">${project.description}</p>
            <p class="news-text"><strong>stack:</strong> ${project.tech.join(' • ')}</p>
            <div class="project-links">
                ${project.demo ? `
                    <a href="${project.demo}" target="_blank" class="project-link-small">demo</a>
                ` : ''}
                <a href="pages/projetos.html" class="project-link-small">ver detalhes</a>
            </div>
        </div>
    `;
}

// Debounce para busca
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Mostra erro
function showProjectsError() {
    const container = document.getElementById('projects-grid');
    if (container) {
        container.innerHTML = `
            <div class="no-projects">
                <p>não foi possível carregar os projetos</p>
                <p>tente novamente mais tarde</p>
            </div>
        `;
    }
}

// Exporta funções para uso global
window.loadFeaturedProjects = loadFeaturedProjects;