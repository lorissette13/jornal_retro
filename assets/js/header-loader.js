// header-loader.js - Carrega e configura o menu no header
// Executa APÓS o componente estar carregado

function loadNavigationMenu() {
    const navContainer = document.getElementById('nav-menu-pages');
    
    if (!navContainer) {
        console.error('Elemento nav-menu-pages não encontrado');
        return;
    }

    if (navContainer.innerHTML.trim().length > 0) {
        initializeNavigation();
        return;
    }

    const isHome = window.location.pathname.endsWith('index.html') || 
                   window.location.pathname.endsWith('/') ||
                   window.location.pathname === '';

    const navPath = isHome ? 'components/nav-menu.html' : '../components/nav-menu.html';

    fetch(navPath)
        .then(response => response.text())
        .then(html => {
            navContainer.innerHTML = html;
            initializeNavigation();
        })
        .catch(error => {
            console.error('Erro carregando nav-menu:', error);
        });
}

function initializeNavigation() {
    const navContainer = document.getElementById('nav-menu-pages');
    
    if (!navContainer) {
        console.error('Elemento nav-menu-pages não encontrado');
        return;
    }

    const isHome = window.location.pathname.endsWith('index.html') || 
                   window.location.pathname.endsWith('/') ||
                   window.location.pathname === '';

    const currentPage = window.location.pathname.split('/').pop();

    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        let href = item.getAttribute('href');
        const dataPage = item.getAttribute('data-page');
        
        if (isHome) {
            if (dataPage === 'home') {
                item.style.display = 'none';
            } else if (dataPage === 'quem-sou') {
                item.href = '#who';
            } else if (dataPage === 'trajetoria') {
                item.href = '#curriculum';
            } else if (dataPage === 'projetos') {
                item.href = '#projects';
            } else if (dataPage === 'cotidiano') {
                item.href = '#daily';
            } else if (dataPage === 'galeria') {
                item.href = '#gallery';
            } else if (dataPage === 'yournotes') {
                item.href = 'pages/yournotes.html';
            }
        } else {
            // Nas páginas internas: ajustar caminhos relativos
            if (href === './index.html') {
                item.href = '../index.html';
            } else if (href && href.startsWith('./pages/')) {
                item.href = href.replace('./pages/', '../pages/');
            }

            // Mostra o link home nas páginas internas
            if (dataPage === 'home') {
                item.style.display = 'inline-block';
            }

            // Esconde o item do menu que corresponde à página atual
            const newHref = item.getAttribute('href');
            if (newHref && newHref.includes(currentPage) && currentPage !== 'index.html') {
                item.style.display = 'none';
            }

            // Atualiza estado ativo
            if (newHref && (newHref.includes(currentPage) ||
                (currentPage === 'index.html' && newHref.includes('../index')) ||
                (currentPage === 'trajetoria.html' && dataPage === 'trajetoria'))) {
                item.classList.add('active');
            }
        }
    });
}

document.addEventListener('component-loaded', function(e) {
    if (e.detail && e.detail.containerId === 'header-container') {
        loadNavigationMenu();
    }
});