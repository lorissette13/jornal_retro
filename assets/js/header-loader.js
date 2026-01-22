// header-loader.js - Carrega e configura o menu no header
// Executa APÓS o componente estar carregado

function loadNavigationMenu() {
    const navContainer = document.getElementById('nav-menu-pages');
    
    if (!navContainer) {
        console.error('Elemento nav-menu-pages não encontrado');
        return;
    }

    // Se já tem conteúdo, é porque foi carregado pelo componente
    if (navContainer.innerHTML.trim().length > 0) {
        initializeNavigation();
        return;
    }

    // Detecta se está na home ou em página interna
    const isHome = window.location.pathname.endsWith('index.html') || 
                   window.location.pathname.endsWith('/') ||
                   window.location.pathname === '';

    const navPath = isHome ? 'components/nav-menu.html' : '../components/nav-menu.html';

    // Carrega o menu
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

    // Detecta se está na home
    const isHome = window.location.pathname.endsWith('index.html') || 
                   window.location.pathname.endsWith('/') ||
                   window.location.pathname === '';

    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        let href = item.getAttribute('href');
        const dataPage = item.getAttribute('data-page');
        
        if (isHome) {
            // Na home: converter para links internos com #
            if (dataPage === 'home') {
                item.classList.add('active');
                item.style.display = 'none'; // Esconde link home
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
            
            // Atualiza o estado ativo
            const currentPage = window.location.pathname.split('/').pop();
            const newHref = item.getAttribute('href');
            const dataPage = item.getAttribute('data-page');

            if (newHref && (newHref.includes(currentPage) ||
                (currentPage === 'index.html' && newHref.includes('../index')) ||
                (currentPage === 'trajetoria.html' && dataPage === 'trajetoria'))) {
                item.classList.add('active');
            }
        }
    });
}

// Espera o componente ser carregado antes de inicializar
document.addEventListener('DOMContentLoaded', function() {
    // Aguarda um pouco para garantir que o componente foi carregado
    setTimeout(function() {
        loadNavigationMenu();
    }, 150);
});