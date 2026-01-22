/**
 * Component Loader
 * Módulo reutilizável para carregar componentes HTML dinamicamente
 * 
 * USO:
 * loadComponent('header-container', 'components/header.html');
 */

async function loadComponent(containerId, componentPath) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.warn(`Container não encontrado: ${containerId}`);
        return;
    }
    
    try {
        // Ajusta caminho relativo se necessário
        let finalPath = componentPath;
        if (window.location.pathname.includes('/pages/')) {
            if (finalPath.startsWith('components/')) {
                finalPath = '../' + finalPath;
            }
        }
        
        const response = await fetch(finalPath);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        
        const html = await response.text();
        container.innerHTML = html;
        
        console.log(`✓ Componente carregado: ${componentPath}`);
    } catch (error) {
        console.error(`✗ Erro ao carregar componente ${componentPath}:`, error);
        container.innerHTML = `<div class="component-error">erro ao carregar componente</div>`;
    }
}

// Exporta globalmente
window.loadComponent = loadComponent;
