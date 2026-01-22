/**
 * Sistema de Timeline da Trajetória
 * Timeline interativa com filtros e navegação
 * Carrega dados de assets/content/timeline/data.json
 */

let timelineData = [];
let filteredTimeline = [];
let currentFilter = 'all';
let timelineYears = [];

// Inicializa página de trajetória
function initTrajectoryPage() {
    loadTimelineData();
}

// Carrega dados da timeline do arquivo centralizado
function loadTimelineData() {
    loadJSON('../assets/content/timeline/data.json')
        .then(data => {
            timelineData = data.experiences || [];
            
            // Extrai anos única para navegação
            extractTimelineYears();
            
            filteredTimeline = [...timelineData];
            
            setupTimelineFilters();
            setupTimelineNavigation();
            updateTimelineDisplay();
            updateSkills();
            updateTimelineStats();
        })
        .catch(error => console.error('Erro carregando trajetória:', error));
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
    
    return `
        <div class="timeline-item" data-id="${item.id}" data-year="${period.split('-')[0]}" data-type="${item.type}">
            <div class="timeline-date">${period}</div>
            
            <div class="timeline-content">
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

// Carrega experiências em destaque para a home (primeiras experiências)
function loadFeaturedExperiences(limit = 2) {
    const container = document.getElementById('featured-experiences');
    if (!container) return;
    
    const featured = timelineData
        .sort((a, b) => {
            const yearA = parseInt(a.period.split('-')[0]);
            const yearB = parseInt(b.period.split('-')[0]);
            return yearB - yearA;
        })
        .slice(0, limit);
    
    if (featured.length === 0) {
        container.innerHTML = `
            <h3 class="section-title">trajetória profissional</h3>
            <p class="loading-text">nenhuma experiência disponível</p>
        `;
        return;
    }
    
    const html = `
        <h3 class="section-title">trajetória profissional</h3>
        ${featured.map(createExperiencePreview).join('')}
        <div class="btn-container">
            <a href="pages/trajetoria.html" class="btn-read-more">ver trajetória completa</a>
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