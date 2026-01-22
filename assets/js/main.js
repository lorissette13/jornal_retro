:assets/js/main.js
/**
 * Script de Inicialização Global
 * Coordena todos os sistemas do portfólio
 */

// Estado global da aplicação
const AppState = {
    currentPage: '',
    userPreferences: {},
    isLoading: false,
    data: {
        posts: [],
        projects: [],
        gallery: [],
        timeline: []
    }
};

// Inicializa a aplicação
async function initApp() {
    console.log('🚀 Inicializando portfólio lorissette13...');
    
    // Carrega preferências do usuário
    loadUserPreferences();
    
    // Inicializa sistemas baseado na página atual
    const currentPage = getCurrentPageName();
    AppState.currentPage = currentPage;
    
    // Configurações específicas por página
    switch(currentPage) {
        case 'index.html':
            initHomePage();
            break;
        case 'quem-sou.html':
            initQuemSouPage();
            break;
        case 'cotidiano.html':
            initCotidianoPage();
            break;
        case 'trajetoria.html':
            initTrajetoriaPage();
            break;
        case 'projetos.html':
            initProjetosPage();
            break;
        case 'galeria.html':
            initGaleriaPage();
            break;
    }
    
    // Configura listeners globais
    setupGlobalListeners();
    
    // Inicializa analytics (simulado)
    initAnalytics();
    
    console.log('✅ Aplicação inicializada na página:', currentPage);
}

// Obtém nome da página atual
function getCurrentPageName() {
    const path = window.location.pathname;
    return path.split('/').pop() || 'index.html';
}

// Inicializa página home
function initHomePage() {
    // Carrega textos dinâmicos
    loadTextContent('assets/data/quem-sou.txt', {
        'who-text-1': 0,
        'who-text-2': 1
    });
    
    // Carrega conteúdo destacado em 3 colunas
    loadFeaturedExperiences(2);
    loadFeaturedProjects(3);
    loadFeaturedGalleryHome(3);
    
    // Inicializa carrossel da galeria
    if (typeof initCarousel === 'function') {
        initCarousel();
    }
}

// Inicializa página "Quem Sou"
function initQuemSouPage() {
    loadFullPageContent('quem-sou');
}

// Inicializa página "Cotidiano"
function initCotidianoPage() {
    if (typeof initPostsPage === 'function') {
        initPostsPage();
    }
}

// Inicializa página "Trajetória"
function initTrajetoriaPage() {
    if (typeof initTimeline === 'function') {
        initTimeline();
    }
}

// Inicializa página "Projetos"
function initProjetosPage() {
    if (typeof initProjectsPage === 'function') {
        initProjectsPage();
    }
    
    if (typeof initTechCarousel === 'function') {
        initTechCarousel();
    }
}

// Inicializa página "Galeria"
function initGaleriaPage() {
    if (typeof initGallery === 'function') {
        initGallery();
    }
}

// Carrega preferências do usuário
function loadUserPreferences() {
    try {
        const preferences = localStorage.getItem('user-preferences');
        if (preferences) {
            AppState.userPreferences = JSON.parse(preferences);
        }
    } catch (error) {
        console.error('Erro ao carregar preferências:', error);
    }
}

// Salva preferências do usuário
function saveUserPreferences() {
    try {
        localStorage.setItem('user-preferences', JSON.stringify(AppState.userPreferences));
    } catch (error) {
        console.error('Erro ao salvar preferências:', error);
    }
}

// Configura listeners globais
function setupGlobalListeners() {
    // Theme toggle (para futura implementação)
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Idioma (para futura implementação)
    const langToggle = document.getElementById('lang-toggle');
    if (langToggle) {
        langToggle.addEventListener('click', toggleLanguage);
    }
    
    // Evento de mudança de página
    window.addEventListener('pagechanged', (e) => {
        const newPage = e.detail.page;
        console.log('📄 Página alterada para:', newPage);
        
        // Reinicializa sistemas para nova página
        setTimeout(() => {
            const pageName = newPage.split('/').pop();
            AppState.currentPage = pageName;
            
            // Re-executa inicialização específica da página
            switch(pageName) {
                case 'index.html': initHomePage(); break;
                case 'quem-sou.html': initQuemSouPage(); break;
                case 'cotidiano.html': initCotidianoPage(); break;
                case 'trajetoria.html': initTrajetoriaPage(); break;
                case 'projetos.html': initProjetosPage(); break;
                case 'galeria.html': initGaleriaPage(); break;
            }
        }, 100);
    });
    
    // Salva estado antes de sair
    window.addEventListener('beforeunload', () => {
        saveUserPreferences();
    });
}

// Alterna tema (esboço para feature futura)
function toggleTheme() {
    const isDark = document.body.classList.toggle('dark-theme');
    AppState.userPreferences.theme = isDark ? 'dark' : 'light';
    saveUserPreferences();
    updateThemeIcon(isDark);
}

// Atualiza ícone do tema
function updateThemeIcon(isDark) {
    const icon = document.querySelector('#theme-toggle i');
    if (icon) {
        icon.textContent = isDark ? '☀️' : '🌙';
    }
}

// Alterna idioma (esboço para feature futura)
function toggleLanguage() {
    const isEnglish = document.documentElement.lang === 'en';
    document.documentElement.lang = isEnglish ? 'pt-br' : 'en';
    AppState.userPreferences.language = isEnglish ? 'pt' : 'en';
    saveUserPreferences();
    updateLanguageIcon(isEnglish);
}

// Atualiza ícone do idioma
function updateLanguageIcon(isEnglish) {
    const icon = document.querySelector('#lang-toggle i');
    if (icon) {
        icon.textContent = isEnglish ? '🇧🇷' : '🇺🇸';
    }
}

// Inicializa analytics (simulado)
function initAnalytics() {
    console.log('📊 Analytics inicializado');
    // Em produção: Google Analytics, Matomo, etc.
}

// Função utilitária para carregar conteúdo de texto
async function loadTextContent(filePath, elementMap) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) throw new Error('File not found');
        
        const text = await response.text();
        const paragraphs = text.split('---');
        
        for (const [elementId, paragraphIndex] of Object.entries(elementMap)) {
            const element = document.getElementById(elementId);
            if (element && paragraphs[paragraphIndex]) {
                element.textContent = paragraphs[paragraphIndex].trim();
            }
        }
    } catch (error) {
        console.error('Erro ao carregar conteúdo:', error);
    }
}

// Função utilitária para carregar conteúdo completo da página
async function loadFullPageContent(pageName) {
    try {
        const response = await fetch(`assets/data/${pageName}.txt`);
        if (!response.ok) throw new Error('File not found');
        
        const text = await response.text();
        const container = document.getElementById('full-who-content');
        if (container) {
            container.innerHTML = text.split('---').map(paragraph => 
                `<p class="page-paragraph">${paragraph.trim()}</p>`
            ).join('');
        }
    } catch (error) {
        console.error('Erro ao carregar página:', error);
    }
}

// Carrega experiências destacadas na home
async function loadFeaturedExperiences(count = 2) {
    try {
        const response = await fetch('assets/data/trajetoria.json');
        const data = await response.json();
        const experiences = data.experiences.slice(0, count);
        
        const container = document.getElementById('featured-experiences');
        if (container) {
            container.innerHTML = experiences.map(exp => `
                <div class="news-item">
                    <h4 class="news-title">${exp.title}</h4>
                    <p class="news-text">${exp.description}</p>
                    <p class="news-text"><strong>${exp.period}</strong> - ${exp.company}</p>
                </div>
            `).join('');
        }
    } catch (error) {
        console.error('Erro ao carregar experiências:', error);
        const container = document.getElementById('featured-experiences');
        if (container) {
            container.innerHTML = '<p class="error-text">Erro ao carregar experiências.</p>';
        }
    }
}

// Carrega projetos destacados na home
async function loadFeaturedProjects(count = 3) {
    try {
        const response = await fetch('assets/data/projects.json');
        const data = await response.json();
        const projects = data.projects.slice(0, count);
        
        const container = document.getElementById('featured-projects');
        if (container) {
            container.innerHTML = projects.map(project => `
                <div class="project">
                    <p class="project-text">${project.description}</p>
                    <p class="project-tech">stack: ${project.tech.join(' • ')}</p>
                </div>
            `).join('');
        }
    } catch (error) {
        console.error('Erro ao carregar projetos:', error);
        const container = document.getElementById('featured-projects');
        if (container) {
            container.innerHTML = '<p class="error-text">Erro ao carregar projetos.</p>';
        }
    }
}

// Carrega galeria destacada na home (agora estático, mas mantendo para compatibilidade)
async function loadFeaturedGalleryHome(count = 3) {
    // Como mudamos para estático, não carrega dinamicamente
    // Mantém a estrutura estática da v0
    console.log('Galeria home mantida estática conforme v0');
}

// Carrega componentes HTML externos
async function loadComponent(containerId, componentPath) {
    try {
        const response = await fetch(componentPath);
        if (!response.ok) throw new Error('Component not found');
        
        const html = await response.text();
        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = html;
        }
    } catch (error) {
        console.error('Erro ao carregar componente:', error);
    }
}

// Inicializa quando o DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}

// Exporta para uso global
window.AppState = AppState;
window.initApp = initApp;