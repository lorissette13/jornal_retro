:assets/js/posts.js
/**
 * Sistema de Posts do Cotidiano
 * Carrega, filtra e exibe posts com navegação por páginas
 */

const POSTS_PER_PAGE = 4;
let currentPage = 1;
let currentCategory = 'all';
let allPosts = [];
let filteredPosts = [];

// Inicializa página de posts
function initPostsPage() {
    loadPosts();
    setupEventListeners();
}

// Carrega posts do arquivo JSON
async function loadPosts() {
    try {
        const response = await fetch('../assets/data/posts.json');
        const data = await response.json();
        allPosts = data.posts;
        
        // Ordena por data (mais recente primeiro)
        allPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        updatePostsDisplay();
        updateStats();
    } catch (error) {
        console.error('Erro ao carregar posts:', error);
        showErrorMessage();
    }
}

// Configura event listeners
function setupEventListeners() {
    // Filtros por categoria
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.dataset.category;
            setActiveCategory(category);
        });
    });
    
    // Navegação entre páginas
    document.getElementById('prev-btn')?.addEventListener('click', goToPrevPage);
    document.getElementById('next-btn')?.addEventListener('click', goToNextPage);
    document.getElementById('prev-btn-bottom')?.addEventListener('click', goToPrevPage);
    document.getElementById('next-btn-bottom')?.addEventListener('click', goToNextPage);
    
    // Favoritos
    document.addEventListener('click', handleFavoriteClick);
}

// Define categoria ativa
function setActiveCategory(category) {
    currentCategory = category;
    currentPage = 1;
    
    // Atualiza botões ativos
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.category === category);
    });
    
    // Filtra posts
    if (category === 'all') {
        filteredPosts = [...allPosts];
    } else {
        filteredPosts = allPosts.filter(post => post.category === category);
    }
    
    updatePostsDisplay();
}

// Atualiza display dos posts
function updatePostsDisplay() {
    const container = document.getElementById('posts-container');
    if (!container) return;
    
    // Calcula posts para a página atual
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    const endIndex = startIndex + POSTS_PER_PAGE;
    const postsToShow = filteredPosts.slice(startIndex, endIndex);
    
    if (postsToShow.length === 0) {
        container.innerHTML = '<div class="no-posts">nenhum post encontrado nesta categoria</div>';
    } else {
        container.innerHTML = postsToShow.map(createPostCard).join('');
    }
    
    updateNavigation();
}

// Cria HTML para um card de post
function createPostCard(post) {
    const date = formatDate(post.date);
    const favoriteIcon = post.favorite ? '★' : '☆';
    
    return `
        <article class="post-card" data-id="${post.id}" data-category="${post.category}" data-favorite="${post.favorite}">
            <div class="post-card-header">
                <div class="post-meta">
                    <span class="post-category ${post.category}">${post.category}</span>
                    <span class="post-date">${date}</span>
                    ${post.favorite ? '<span class="post-favorite">★ favorito</span>' : ''}
                </div>
                
                <h2 class="post-title">${post.title}</h2>
                
                <div class="post-tags">
                    ${post.tags.map(tag => `<span class="post-tag">${tag}</span>`).join('')}
                </div>
            </div>
            
            <div class="post-content">
                ${post.paragraphs.map(p => `<p class="post-paragraph">${p}</p>`).join('')}
            </div>
            
            <div class="post-actions">
                <button class="post-action-btn favorite-btn ${post.favorite ? 'active' : ''}" 
                        data-post-id="${post.id}" 
                        aria-label="${post.favorite ? 'remover dos favoritos' : 'marcar como favorito'}">
                    ${favoriteIcon}
                </button>
                <button class="post-action-btn share-btn" data-post-id="${post.id}" aria-label="compartilhar post">
                    ↪
                </button>
            </div>
        </article>
    `;
}

// Atualiza navegação entre páginas
function updateNavigation() {
    const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
    const prevDisabled = currentPage <= 1;
    const nextDisabled = currentPage >= totalPages;
    
    // Atualiza números das páginas
    document.querySelectorAll('.page-info span').forEach(span => {
        if (span.id === 'current-page' || span.id === 'current-page-bottom') {
            span.textContent = currentPage;
        }
        if (span.id === 'total-pages' || span.id === 'total-pages-bottom') {
            span.textContent = totalPages;
        }
    });
    
    // Atualiza estado dos botões
    const prevButtons = document.querySelectorAll('.prev-btn');
    const nextButtons = document.querySelectorAll('.next-btn');
    
    prevButtons.forEach(btn => btn.disabled = prevDisabled);
    nextButtons.forEach(btn => btn.disabled = nextDisabled);
}

// Navegação para página anterior
function goToPrevPage() {
    if (currentPage > 1) {
        currentPage--;
        updatePostsDisplay();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Navegação para próxima página
function goToNextPage() {
    const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
    if (currentPage < totalPages) {
        currentPage++;
        updatePostsDisplay();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Formata data para exibição
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', options);
}

// Atualiza estatísticas
function updateStats() {
    const totalPosts = allPosts.length;
    const favorites = allPosts.filter(post => post.favorite).length;
    const categories = [...new Set(allPosts.map(post => post.category))].length;
    
    document.getElementById('total-posts-count')?.textContent = totalPosts;
    document.getElementById('favorites-count')?.textContent = favorites;
    document.getElementById('total-categories-count')?.textContent = categories;
}

// Manipula clique em favoritos
function handleFavoriteClick(event) {
    if (event.target.classList.contains('favorite-btn')) {
        event.preventDefault();
        const postId = event.target.dataset.postId;
        toggleFavorite(postId);
    }
}

// Alterna estado de favorito
function toggleFavorite(postId) {
    const post = allPosts.find(p => p.id === postId);
    if (post) {
        post.favorite = !post.favorite;
        
        // Atualiza no localStorage
        saveFavoriteState(postId, post.favorite);
        
        // Atualiza display
        updatePostsDisplay();
        updateStats();
        
        // Atualiza na home se estiver nela
        if (window.location.pathname.includes('index.html')) {
            loadFeaturedPosts(3);
        }
    }
}

// Salva estado de favorito no localStorage
function saveFavoriteState(postId, isFavorite) {
    try {
        const favorites = JSON.parse(localStorage.getItem('post-favorites') || '{}');
        favorites[postId] = isFavorite;
        localStorage.setItem('post-favorites', JSON.stringify(favorites));
    } catch (error) {
        console.error('Erro ao salvar favorito:', error);
    }
}

// Carrega posts favoritos para a home
function loadFeaturedPosts(limit = 3) {
    const container = document.getElementById('featured-posts');
    if (!container) return;
    
    // Carrega posts favoritos
    const featured = allPosts
        .filter(post => post.favorite)
        .slice(0, limit);
    
    if (featured.length === 0) {
        container.innerHTML = '<p class="no-posts">nenhum post favorito ainda</p>';
        return;
    }
    
    container.innerHTML = featured.map(createFeaturedPostCard).join('');
}

// Cria card de post para a home
function createFeaturedPostCard(post) {
    const date = formatDate(post.date);
    
    return `
        <div class="tag-category">
            <h4 class="tag-title">${getCategoryIcon(post.category)} ${post.title}</h4>
            <p class="tag-text">${post.paragraphs[0]}</p>
            <div class="tag-meta">
                <span class="tag-date">${date}</span>
                <a href="pages/cotidiano.html#${post.id}" class="tag-link">ler mais →</a>
            </div>
        </div>
    `;
}

// Retorna ícone para categoria
function getCategoryIcon(category) {
    const icons = {
        'filmes': '🎬',
        'jogos': '🎮',
        'boardgames': '♟️',
        'livros': '📚',
        'música': '🎵',
        'dev-life': '💻'
    };
    return icons[category] || '📝';
}

// Mostra mensagem de erro
function showErrorMessage() {
    const container = document.getElementById('posts-container');
    if (container) {
        container.innerHTML = `
            <div class="no-posts">
                <p>não foi possível carregar os posts</p>
                <p>tente novamente mais tarde</p>
            </div>
        `;
    }
}

// Exporta funções para uso global
window.loadFeaturedPosts = loadFeaturedPosts;