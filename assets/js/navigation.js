:assets/js/navigation.js
/**
 * Sistema de Navegação Global
 * Gerencia navegação entre páginas e componentes
 */

// Mapeamento de páginas
const PAGES = {
    'index.html': 'index.html',
    'quem-sou': 'pages/quem-sou.html',
    'cotidiano': 'pages/cotidiano.html',
    'trajetoria': 'pages/trajetoria.html',
    'projetos': 'pages/projetos.html',
    'galeria': 'pages/galeria.html'
};

// Inicializa navegação
function initNavigation() {
    loadCommonComponents();
    setupNavigationLinks();
    setupBackNavigation();
    updateActivePage();
    handleAnchorLinks();
}

// Carrega componentes comuns
async function loadCommonComponents() {
    // Header já está inline no index.html, apenas carrega footer
    await loadComponent('footer-container', 'components/footer.html');
}

// Carrega um componente HTML
async function loadComponent(containerId, componentPath) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    try {
        const response = await fetch(componentPath);
        if (!response.ok) throw new Error('Component not found');
        
        const html = await response.text();
        container.innerHTML = html;
        
        // Executa scripts dentro do componente
        executeComponentScripts(container);
        
        // Atualiza navegação após carregar header
        if (containerId === 'header-container') {
            updateNavigationLinks();
        }
    } catch (error) {
        console.error(`Erro ao carregar componente ${componentPath}:`, error);
        container.innerHTML = `<div class="component-error">erro ao carregar componente</div>`;
    }
}

// Executa scripts dentro de componentes
function executeComponentScripts(container) {
    const scripts = container.querySelectorAll('script');
    scripts.forEach(script => {
        const newScript = document.createElement('script');
        if (script.src) {
            newScript.src = script.src;
        } else {
            newScript.textContent = script.textContent;
        }
        document.body.appendChild(newScript);
        document.body.removeChild(newScript);
    });
}

// Configura links de navegação
function setupNavigationLinks() {
    document.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (!link) return;
        
        const href = link.getAttribute('href');
        
        // Links internos
        if (href && !href.startsWith('http') && !href.startsWith('#') && !href.startsWith('mailto:')) {
            e.preventDefault();
            navigateToPage(href);
        }
    });
}

// Navega para uma página
async function navigateToPage(pagePath) {
    // Salva scroll position atual
    saveScrollPosition();
    
    try {
        // Carrega a página
        const response = await fetch(pagePath);
        if (!response.ok) throw new Error('Page not found');
        
        const html = await response.text();
        const parser = new DOMParser();
        const newDoc = parser.parseFromString(html, 'text/html');
        
        // Atualiza conteúdo principal
        const newContent = newDoc.querySelector('.page-content, .content');
        const currentContent = document.querySelector('.page-content, .content');
        
        if (newContent && currentContent) {
            // Animação de transição
            currentContent.style.opacity = '0';
            currentContent.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                currentContent.innerHTML = newContent.innerHTML;
                currentContent.style.opacity = '1';
                currentContent.style.transform = 'translateY(0)';
                
                // Atualiza título
                document.title = newDoc.title;
                
                // Atualiza URL no navegador
                updateBrowserURL(pagePath);
                
                // Executa scripts da nova página
                executePageScripts(newDoc);
                
                // Restaura scroll position
                restoreScrollPosition();
                
                // Atualiza navegação ativa
                updateActivePage();
                
                // Rola para o topo
                window.scrollTo(0, 0);
                
                // Dispara evento de página carregada
                window.dispatchEvent(new CustomEvent('pagechanged', {
                    detail: { page: pagePath }
                }));
            }, 300);
        }
    } catch (error) {
        console.error('Erro na navegação:', error);
        showNavigationError();
    }
}

// Executa scripts específicos da página
function executePageScripts(doc) {
    const scripts = doc.querySelectorAll('script');
    scripts.forEach(script => {
        // Filtra scripts de bibliotecas e componentes
        if (script.src.includes('navigation.js') || 
            script.src.includes('style.css') ||
            script.hasAttribute('data-no-execute')) {
            return;
        }
        
        const newScript = document.createElement('script');
        if (script.src) {
            newScript.src = script.src;
        } else {
            newScript.textContent = script.textContent;
        }
        
        // Adiciona atributo para controle
        newScript.setAttribute('data-page-script', 'true');
        
        document.body.appendChild(newScript);
        
        // Remove scripts antigos da mesma página
        const oldScripts = document.querySelectorAll(`script[data-page-script]`);
        oldScripts.forEach(oldScript => {
            if (oldScript !== newScript) {
                oldScript.remove();
            }
        });
    });
}

// Atualiza URL no navegador
function updateBrowserURL(pagePath) {
    const basePath = window.location.pathname.split('/').slice(0, -1).join('/') || '';
    const newURL = `${basePath}/${pagePath}`.replace('//', '/');
    
    window.history.pushState({ page: pagePath }, '', newURL);
}

// Configura navegação de voltar/avançar
function setupBackNavigation() {
    window.addEventListener('popstate', (e) => {
        if (e.state && e.state.page) {
            navigateToPage(e.state.page);
        }
    });
}

// Atualiza links de navegação
function updateNavigationLinks() {
    const navItems = document.querySelectorAll('.nav-item');
    const currentPage = getCurrentPage();
    
    navItems.forEach(item => {
        const href = item.getAttribute('href');
        
        // Converte links de âncora para links de página
        if (href && href.startsWith('#')) {
            const pageName = href.substring(1);
            if (PAGES[pageName]) {
                item.setAttribute('href', PAGES[pageName]);
                
                // Se estiver na home, mantém como âncora
                if (currentPage === 'index.html') {
                    item.setAttribute('href', `#${pageName}`);
                }
            }
        }
        
        // Marca como ativo
        if (href && (href.includes(currentPage) || 
            (currentPage === 'index.html' && href.startsWith('#')))) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

// Obtém página atual
function getCurrentPage() {
    const path = window.location.pathname;
    const page = path.split('/').pop() || 'index.html';
    return page;
}

// Atualiza página ativa
function updateActivePage() {
    const currentPage = getCurrentPage();
    document.querySelectorAll('.nav-item').forEach(item => {
        const href = item.getAttribute('href');
        item.classList.toggle('active', 
            (currentPage === 'index.html' && href && href.startsWith('#')) ||
            (href && href.includes(currentPage))
        );
    });
}

// Manipula links âncora
function handleAnchorLinks() {
    document.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (!link) return;
        
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                // Se estiver na home, rola suavemente
                if (getCurrentPage() === 'index.html') {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                } else {
                    // Se estiver em outra página, navega para a home com âncora
                    navigateToPage('index.html');
                    setTimeout(() => {
                        const homeTarget = document.getElementById(targetId);
                        if (homeTarget) {
                            homeTarget.scrollIntoView({
                                behavior: 'smooth',
                                block: 'start'
                            });
                        }
                    }, 500);
                }
            }
        }
    });
}

// Salva posição do scroll
function saveScrollPosition() {
    sessionStorage.setItem('scrollPosition', window.scrollY.toString());
    sessionStorage.setItem('currentPage', getCurrentPage());
}

// Restaura posição do scroll
function restoreScrollPosition() {
    const savedPage = sessionStorage.getItem('currentPage');
    const currentPage = getCurrentPage();
    
    if (savedPage === currentPage) {
        const savedPosition = sessionStorage.getItem('scrollPosition');
        if (savedPosition) {
            setTimeout(() => {
                window.scrollTo(0, parseInt(savedPosition));
                sessionStorage.removeItem('scrollPosition');
                sessionStorage.removeItem('currentPage');
            }, 100);
        }
    }
}

// Mostra loading durante navegação
function showPageLoading() {
    // Função removida - sem necessidade de loading sem API
}

// Esconde loading
function hidePageLoading() {
    // Função removida - sem necessidade de loading sem API
}

// Mostra erro de navegação
function showNavigationError() {
    const content = document.querySelector('.page-content, .content');
    if (content) {
        content.innerHTML = `
            <div class="page-error">
                <h2>erro na navegação</h2>
                <p>não foi possível carregar a página solicitada</p>
                <button onclick="navigateToPage('index.html')" class="btn-read-more">
                    voltar para home
                </button>
            </div>
        `;
    }
}

// Inicializa quando o DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNavigation);
} else {
    initNavigation();
}

// Exporta funções para uso global
window.navigateToPage = navigateToPage;
window.loadComponent = loadComponent;