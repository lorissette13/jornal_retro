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
function initApp() {
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
    // Carrega conteúdo destacado em 3 colunas
    loadFeaturedExperiences(2);
    loadFeaturedProjects(5);
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
function loadTextContent(filePath, elementMap) {
    // Carregamento estático de conteúdo padrão
    const fallbackContent = {
        'who-text-1': 'desenvolvedor front-end com alma de artesão digital, combinando código limpo com narrativas visuais. nascido em 1995, minha jornada mistura tecnologia vintage com inovação contemporânea.',
        'who-text-2': 'fora do terminal, sou colecionador de momentos: cafés em xícaras velhas, trilhas sonoras para concentração, jogos retrô que inspiram soluções modernas.',
        'who-text-3': 'acredito que interfaces devem conversar, não apenas funcionar - cada linha de código carrega intenção, cada animação conta uma história.',
        'who-text-4': 'nas horas vagas, mergulho em mundos ficcionais através de livros, filmes e jogos. cada história que consumo deixa marcas no meu trabalho.'
    };
    
    for (const [elementId, paragraphIndex] of Object.entries(elementMap)) {
        const element = document.getElementById(elementId);
        if (element && fallbackContent[elementId]) {
            element.textContent = fallbackContent[elementId];
        }
    }
}

// Função utilitária para carregar conteúdo completo da página
function loadFullPageContent(pageName) {
    // Carregamento estático mantido
    console.log('Carregamento de página estático:', pageName);
}

// Carrega experiências destacadas na home (usando data-parser)
function loadFeaturedExperiences(count = 2) {
    try {
        const recentExperiences = getRecentTrajectory(count);
        const container = document.getElementById('featured-experiences');
        if (container && recentExperiences.length > 0) {
            container.innerHTML = recentExperiences.map(renderTrajectoryHTML).join('');
        }
    } catch (e) {
        console.error('Erro carregando experiências:', e);
    }
}

// Carrega projetos destacados na home (usando data-parser)
function loadFeaturedProjects(count = 5) {
    try {
        const recentProjects = getRecentProjects(count);
        const container = document.getElementById('featured-projects');
        if (container && recentProjects.length > 0) {
            container.innerHTML = recentProjects.map(renderProjectHTML).join('');
        }
    } catch (e) {
        console.error('Erro carregando projetos:', e);
    }
}

// Carrega galeria destacada na home (mock local, mantendo estrutura)
function loadFeaturedGalleryHome(count = 3) {
    // Galeria mantida estática conforme v0
    console.log('Galeria home mantida estática conforme v0');
}

// Carrega componentes HTML externos
function loadComponent(containerId, componentPath) {
    // Carregamento de componentes desabilitado - usando versão estática
    console.log('Componentes carregados estaticamente:', containerId);
}

// Efeito typewriter para o logo
function initTypewriter() {
    const element = document.getElementById('typewriter-logo');
    if (!element) return;
    
    const text = element.textContent;
    element.textContent = '';
    element.style.borderRight = '2px solid #7E8C54';
    
    let i = 0;
    const timer = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
            setTimeout(() => {
                element.style.borderRight = 'none';
            }, 500);
        }
    }, 100);
}

// Inicializa botão conectar-se
function initConnectButton() {
    const btn = document.getElementById('main-btn');
    if (btn) {
        btn.addEventListener('click', () => {
            // Simula abertura de modal ou redirecionamento
            alert('Funcionalidade de contato em desenvolvimento! 📧\n\nPor enquanto, me encontre em:\n• GitHub: @lorissette13\n• LinkedIn: loris-developer\n• Email: loris@example.com');
        });
    }
}

// Sistema de Carousel da Galeria na Home
let currentGalleryIndex = 0;
const galleryItems = ['📁', '🎮', '🎵', '✈️', '☕', '📚', '🎨'];
const visibleItems = 4;

function initGalleryCarousel() {
    const carousel = document.getElementById('gallery-carousel');
    const prevBtn = document.getElementById('gallery-prev');
    const nextBtn = document.getElementById('gallery-next');
    
    if (!carousel || !prevBtn || !nextBtn) return;
    
    // Configura eventos dos botões
    prevBtn.addEventListener('click', () => navigateGallery(-1));
    nextBtn.addEventListener('click', () => navigateGallery(1));
    
    // Atualiza estado inicial
    updateGalleryCarousel();
}

function navigateGallery(direction) {
    const maxIndex = galleryItems.length - visibleItems;
    currentGalleryIndex = Math.max(0, Math.min(maxIndex, currentGalleryIndex + direction));
    updateGalleryCarousel();
}

function updateGalleryCarousel() {
    const carousel = document.getElementById('gallery-carousel');
    const prevBtn = document.getElementById('gallery-prev');
    const nextBtn = document.getElementById('gallery-next');
    
    if (!carousel) return;
    
    // Atualiza posição do carousel
    const translateX = -currentGalleryIndex * 80; // 80px por item
    carousel.style.transform = `translateX(${translateX}px)`;
    
    // Atualiza botões
    const maxIndex = galleryItems.length - visibleItems;
    prevBtn.disabled = currentGalleryIndex === 0;
    nextBtn.disabled = currentGalleryIndex === maxIndex;
    
    // Atualiza classes ativas
    const items = carousel.querySelectorAll('.gallery-item');
    items.forEach((item, index) => {
        const isVisible = index >= currentGalleryIndex && index < currentGalleryIndex + visibleItems;
        item.classList.toggle('active', isVisible);
    });
}

// Animações de entrada para elementos
function initFadeInAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Seleciona elementos para animar
    const elementsToAnimate = document.querySelectorAll('.who-column, .news-item, .project, .tag-category, .mock-image-gallery');
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Inicializa quando o DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initApp();
        initTypewriter();
        initConnectButton();
        initGalleryCarousel();
        initFadeInAnimations();
    });
} else {
    initApp();
    initTypewriter();
    initConnectButton();
    initGalleryCarousel();
    initFadeInAnimations();
}

// Exporta para uso global
window.AppState = AppState;
window.initApp = initApp;