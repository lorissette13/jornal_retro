/**
 * Sistema de Timeline da Trajetória
 * Timeline interativa com filtros e navegação
 */

let timelineData = [];
let filteredTimeline = [];
let currentFilter = 'all';
let timelineYears = [];

// Mock da trajetória (sem necessidade de fetch)
const TIMELINE_DATA = {
  "experiences": [
    {
      "id": "exp-001",
      "type": "education",
      "title": "bacharelado em sistemas de informação",
      "period": "2013-2017",
      "institution": "universidade federal",
      "description": "fundamentos em algoritmos, estrutura de dados, engenharia de software e redes. projeto final: sistema de gerenciamento acadêmico.",
      "skills": ["algoritmos", "java", "sql", "redes"],
      "favorite": true
    },
    {
      "id": "exp-002",
      "type": "work",
      "title": "desenvolvedor front-end júnior",
      "period": "2018-2019",
      "company": "startup tech solutions",
      "description": "primeira experiência profissional. desenvolvimento de interfaces responsivas com html/css/js. aprendizado de git e metodologias ágeis.",
      "skills": ["html5", "css3", "javascript", "git", "scrum"],
      "favorite": false
    },
    {
      "id": "exp-003",
      "type": "work",
      "title": "desenvolvedor front-end pleno",
      "period": "2020-2021",
      "company": "agência digital creativa",
      "description": "liderança de projetos front-end. implementação de design systems. mentoring de desenvolvedores júniores. foco em performance.",
      "skills": ["react", "vue", "sass", "webpack", "jest"],
      "favorite": true
    },
    {
      "id": "exp-004",
      "type": "work",
      "title": "desenvolvedor front-end sênior",
      "period": "2022-presente",
      "company": "empresa global tech",
      "description": "arquitetura de sistemas escaláveis. definição de padrões de código. entrevistas técnicas. foco em acessibilidade e web vitals.",
      "skills": ["typescript", "next.js", "graphql", "docker", "aws"],
      "favorite": true
    },
    {
      "id": "exp-005",
      "type": "certification",
      "title": "aws certified solutions architect",
      "period": "2021",
      "institution": "amazon web services",
      "description": "certificação em arquitetura de soluções cloud. foco em segurança, escalabilidade e otimização de custos na aws.",
      "skills": ["aws", "cloud", "arquitetura", "segurança"],
      "favorite": true
    },
    {
      "id": "exp-006",
      "type": "certification",
      "title": "react advanced patterns",
      "period": "2020",
      "institution": "frontend masters",
      "description": "curso avançado de padrões em react. renderização otimizada, hooks customizados e gerenciamento de estado complexo.",
      "skills": ["react", "hooks", "performance", "padrões"],
      "favorite": false
    },
    {
      "id": "exp-007",
      "type": "project",
      "title": "sistema de design open source",
      "period": "2021",
      "description": "criação de design system completo com react e storybook. mais de 500 estrelas no github. usado por 50+ empresas.",
      "skills": ["react", "storybook", "design tokens", "npm"],
      "favorite": true
    },
    {
      "id": "exp-008",
      "type": "project",
      "title": "aplicativo de viagens colaborativo",
      "period": "2022",
      "description": "app fullstack para compartilhamento de roteiros de viagem. integração com mapas e sistema de reviews.",
      "skills": ["vue.js", "node.js", "mongodb", "mapbox"],
      "favorite": false
    },
    {
      "id": "exp-009",
      "type": "certification",
      "title": "typescript advanced masterclass",
      "period": "2023",
      "institution": "egghead.io",
      "description": "aprofundamento em tipos avançados de typescript. genéricos, decoradores e tipos utilitários.",
      "skills": ["typescript", "tipos avançados", "oop"],
      "favorite": true
    },
    {
      "id": "exp-010",
      "type": "work",
      "title": "tech lead - arquitetura frontend",
      "period": "2023-presente",
      "company": "empresa global tech",
      "description": "liderança técnica de squad de 5 desenvolvedores. definição de arquitetura de microfrontends. implementação de pipeline ci/cd.",
      "skills": ["arquitetura", "liderança", "nextjs", "webpack", "devops"],
      "favorite": true
    }
  ]
};

// Inicializa timeline
function initTimeline() {
    loadTimelineData();
    loadFavoritesFromLocalStorage();
    setupTimelineFilters();
    setupTimelineNavigation();
    updateTimelineDisplay();
    updateSkills();
    updateTimelineStats();
}

// Carrega dados da timeline (mock local, sem fetch)
function loadTimelineData() {
    timelineData = TIMELINE_DATA.experiences;
    
    // Extrai anos únicos para navegação
    extractTimelineYears();
    
    filteredTimeline = [...timelineData];
}

// Extrai anos da timeline
function extractTimelineYears() {
    const years = new Set();
    timelineData.forEach(item => {
        const year = item.period.split('-')[0];
        years.add(parseInt(year));
    });
    timelineYears = Array.from(years).sort((a, b) => a - b);
}

// Configura filtros
function setupTimelineFilters() {
    document.querySelectorAll('.timeline-filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;
            setTimelineFilter(filter);
        });
    });
}

// Define filtro ativo
function setTimelineFilter(filter) {
    currentFilter = filter;
    
    // Atualiza botões ativos
    document.querySelectorAll('.timeline-filter-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.filter === filter);
    });
    
    // Aplica filtro
    if (filter === 'all') {
        filteredTimeline = [...timelineData];
    } else if (filter === 'favorites') {
        filteredTimeline = timelineData.filter(item => item.favorite);
    } else {
        filteredTimeline = timelineData.filter(item => item.type === filter);
    }
    
    updateTimelineDisplay();
}

// Atualiza display da timeline
function updateTimelineDisplay() {
    const container = document.getElementById('timeline');
    if (!container) return;
    
    if (filteredTimeline.length === 0) {
        container.innerHTML = '<div class="no-items">nenhum item encontrado</div>';
        return;
    }
    
    // Ordena por período (mais recente primeiro)
    const sortedItems = [...filteredTimeline].sort((a, b) => {
        const yearA = parseInt(a.period.split('-')[0]);
        const yearB = parseInt(b.period.split('-')[0]);
        return yearB - yearA;
    });
    
    container.innerHTML = sortedItems.map(createTimelineItem).join('');
    
    // Anima entrada
    animateTimelineItems();
}

// Cria item da timeline
function createTimelineItem(item) {
    const period = item.period;
    const typeLabel = getTypeLabel(item.type);
    const icon = getTypeIcon(item.type);
    const isFavorite = item.favorite;
    
    return `
        <div class="timeline-item" data-id="${item.id}" data-year="${period.split('-')[0]}" data-type="${item.type}">
            <div class="timeline-date">${period}</div>
            
            <div class="timeline-content">
                <button class="timeline-favorite-btn ${isFavorite ? 'active' : ''}" 
                        data-id="${item.id}" 
                        aria-label="adicionar aos favoritos">
                    ${isFavorite ? '★' : '☆'}
                </button>
                
                <div class="timeline-type">${icon} ${typeLabel}</div>
                
                <h3 class="timeline-title">${item.title}</h3>
                
                ${item.company ? `<div class="timeline-company">${item.company}</div>` : ''}
                ${item.institution ? `<div class="timeline-company">${item.institution}</div>` : ''}
                
                <p class="timeline-description">${item.description}</p>
                
                ${item.skills ? `
                    <div class="timeline-skills">
                        ${item.skills.map(skill => `<span class="timeline-skill">${skill}</span>`).join('')}
                    </div>
                ` : ''}
            </div>
        </div>
    `;
}

// Retorna label para tipo
function getTypeLabel(type) {
    const labels = {
        'work': 'trabalho',
        'education': 'educação',
        'certification': 'certificação',
        'project': 'projeto'
    };
    return labels[type] || type;
}

// Retorna ícone para tipo
function getTypeIcon(type) {
    const icons = {
        'work': '💼',
        'education': '🎓',
        'certification': '🏅',
        'project': '🚀'
    };
    return icons[type] || '📝';
}

// Anima itens da timeline
function animateTimelineItems() {
    const items = document.querySelectorAll('.timeline-item');
    items.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
        item.classList.add('animated');
    });
    
    // Adiciona listeners para botões de favoritar
    document.querySelectorAll('.timeline-favorite-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const itemId = btn.dataset.id;
            toggleTimelineFavorite(itemId);
        });
    });
}

// Configura navegação da timeline
function setupTimelineNavigation() {
    document.getElementById('timeline-prev-btn')?.addEventListener('click', navigateTimelinePrev);
    document.getElementById('timeline-next-btn')?.addEventListener('click', navigateTimelineNext);
}

// Navega para ano anterior
function navigateTimelinePrev() {
    const currentYear = getCurrentTimelineYear();
    const currentIndex = timelineYears.indexOf(currentYear);
    
    if (currentIndex > 0) {
        const prevYear = timelineYears[currentIndex - 1];
        scrollToTimelineYear(prevYear);
    }
    
    updateTimelineNavigation();
}

// Navega para próximo ano
function navigateTimelineNext() {
    const currentYear = getCurrentTimelineYear();
    const currentIndex = timelineYears.indexOf(currentYear);
    
    if (currentIndex < timelineYears.length - 1) {
        const nextYear = timelineYears[currentIndex + 1];
        scrollToTimelineYear(nextYear);
    }
    
    updateTimelineNavigation();
}

// Obtém ano atual da timeline
function getCurrentTimelineYear() {
    const items = document.querySelectorAll('.timeline-item');
    if (items.length === 0) return timelineYears[0] || 2013;
    
    const firstVisible = Array.from(items).find(item => {
        const rect = item.getBoundingClientRect();
        return rect.top >= 0;
    });
    
    return firstVisible ? parseInt(firstVisible.dataset.year) : timelineYears[0];
}

// Rola para um ano específico
function scrollToTimelineYear(year) {
    const targetItem = document.querySelector(`.timeline-item[data-year="${year}"]`);
    if (targetItem) {
        targetItem.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
        
        // Atualiza display do ano
        document.getElementById('timeline-year-display').textContent = year;
    }
}

// Atualiza navegação da timeline
function updateTimelineNavigation() {
    const currentYear = getCurrentTimelineYear();
    const currentIndex = timelineYears.indexOf(currentYear);
    
    const prevBtn = document.getElementById('timeline-prev-btn');
    const nextBtn = document.getElementById('timeline-next-btn');
    
    // Botão anterior: desabilita no primeiro item, mostra nos demais
    if (prevBtn) {
        prevBtn.disabled = currentIndex <= 0;
        prevBtn.style.visibility = currentIndex <= 0 ? 'hidden' : 'visible';
    }
    
    if (nextBtn) {
        nextBtn.disabled = currentIndex >= timelineYears.length - 1;
    }
    
    // Atualiza display
    document.getElementById('timeline-year-display').textContent = currentYear;
}

// Atualiza habilidades
function updateSkills() {
    const container = document.getElementById('skills-container');
    if (!container) return;
    
    container.innerHTML = `
        <div class="skill-category">
            <h3 class="skill-category-title">frontend</h3>
            <div class="skill-items">
                <span class="skill-item">html5</span>
                <span class="skill-item">css3</span>
                <span class="skill-item">javascript</span>
                <span class="skill-item">typescript</span>
                <span class="skill-item">react</span>
                <span class="skill-item">vue</span>
                <span class="skill-item">sass</span>
            </div>
        </div>
        
        <div class="skill-category">
            <h3 class="skill-category-title">backend & devops</h3>
            <div class="skill-items">
                <span class="skill-item">node.js</span>
                <span class="skill-item">python</span>
                <span class="skill-item">graphql</span>
                <span class="skill-item">mongodb</span>
                <span class="skill-item">docker</span>
                <span class="skill-item">aws</span>
            </div>
        </div>
        
        <div class="skill-category">
            <h3 class="skill-category-title">ferramentas</h3>
            <div class="skill-items">
                <span class="skill-item">git</span>
                <span class="skill-item">figma</span>
                <span class="skill-item">storybook</span>
                <span class="skill-item">vscode</span>
                <span class="skill-item">notion</span>
            </div>
        </div>
    `;
}

// Atualiza estatísticas
function updateTimelineStats() {
    // Cálculos simulados
    const startYear = Math.min(...timelineYears);
    const currentYear = new Date().getFullYear();
    const totalYears = currentYear - startYear;
    
    const totalProjects = timelineData.filter(item => item.type === 'project').length;
    const totalCerts = timelineData.filter(item => item.type === 'certification').length;
    
    document.getElementById('total-experience').textContent = `${totalYears}+`;
    document.getElementById('total-projects').textContent = `${totalProjects * 3}+`;
    document.getElementById('total-certifications').textContent = `${totalCerts}+`;
}

// Mostra erro na timeline
function showTimelineError() {
    const container = document.getElementById('timeline');
    if (container) {
        container.innerHTML = `
            <div class="no-items">
                <p>não foi possível carregar a trajetória</p>
                <p>tente novamente mais tarde</p>
            </div>
        `;
    }
}

// Alterna status de favorito de um item da timeline
function toggleTimelineFavorite(itemId) {
    const item = timelineData.find(exp => exp.id === itemId);
    if (!item) return;
    
    // Alterna o status
    item.favorite = !item.favorite;
    
    // Atualiza localStorage
    saveFavoritesToLocalStorage();
    
    // Atualiza visual do botão
    const btn = document.querySelector(`.timeline-favorite-btn[data-id="${itemId}"]`);
    if (btn) {
        btn.classList.toggle('active');
        btn.textContent = item.favorite ? '★' : '☆';
    }
}

// Salva favoritos no localStorage
function saveFavoritesToLocalStorage() {
    const favorites = {
        timeline: timelineData.filter(item => item.favorite).map(item => item.id),
        gallery: typeof galleryData !== 'undefined' 
            ? galleryData.filter(img => img.favorite).map(img => img.id)
            : []
    };
    localStorage.setItem('portfolio-favorites', JSON.stringify(favorites));
}

// Carrega favoritos do localStorage
function loadFavoritesFromLocalStorage() {
    const saved = localStorage.getItem('portfolio-favorites');
    if (!saved) return;
    
    try {
        const favorites = JSON.parse(saved);
        
        // Restaura favoritos de timeline
        if (favorites.timeline && timelineData) {
            timelineData.forEach(item => {
                item.favorite = favorites.timeline.includes(item.id);
            });
        }
        
        // Restaura favoritos de galeria (se disponível)
        if (favorites.gallery && typeof galleryData !== 'undefined') {
            galleryData.forEach(img => {
                img.favorite = favorites.gallery.includes(img.id);
            });
        }
    } catch (error) {
        console.error('Erro ao carregar favoritos:', error);
    }
}

// Carrega experiências favoritas para a home
function loadFeaturedExperiences(limit = 2) {
    const container = document.getElementById('featured-experiences');
    if (!container) return;
    
    const featured = timelineData
        .filter(exp => exp.favorite)
        .sort((a, b) => {
            const yearA = parseInt(a.period.split('-')[0]);
            const yearB = parseInt(b.period.split('-')[0]);
            return yearB - yearA;
        })
        .slice(0, limit);
    
    if (featured.length === 0) {
        container.innerHTML = `
            <h3 class="section-title">trajetória profissional</h3>
            <p class="loading-text">nenhuma experiência marcada como favorita</p>
        `;
        return;
    }
    
    const html = `
        <h3 class="section-title">trajetória profissional</h3>
        ${featured.map(createExperiencePreview).join('')}
        <div class="btn-container">
            <a href="pages/trajetoria.html" class="btn-small">ver trajetória completa</a>
        </div>
    `;
    container.innerHTML = html;
}

// Cria preview de experiência para a home
function createExperiencePreview(exp) {
    const typeLabel = getTypeLabel(exp.type);
    const icon = getTypeIcon(exp.type);
    
    return `
        <div class="news-item">
            <div class="exp-header">
                <span class="exp-type">${icon} ${typeLabel}</span>
                <span class="exp-period">${exp.period}</span>
            </div>
            <h4 class="news-title">${exp.title}</h4>
            ${exp.company ? `<p class="news-text">${exp.company}</p>` : ''}
            ${exp.institution ? `<p class="news-text">${exp.institution}</p>` : ''}
            <p class="news-text">${exp.description.substring(0, 120)}...</p>
            ${exp.skills ? `
                <div class="exp-skills">
                    ${exp.skills.slice(0, 3).map(skill => `<span class="exp-skill">${skill}</span>`).join('')}
                </div>
            ` : ''}
        </div>
    `;
}

// Exporta função para uso global
window.loadFeaturedExperiences = loadFeaturedExperiences;