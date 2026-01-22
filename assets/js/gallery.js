/**
 * SISTEMA DE GALERIA - VERSÃO MODULAR
 * Carrega dados de assets/data/gallery/YYYY-ID-slug.json (como posts)
 * Cada arquivo é uma imagem independente
 */

let galleryData = [];
let filteredGallery = [];
let currentGalleryCategory = 'all';
let currentGalleryYear = 'all';
let currentGalleryFilter = 'all';
let currentSlideIndex = 0;
let slides = [];
let currentPage = 0;
const itemsPerPage = 8;

/**
 * Carrega dados da galeria da pasta
 * Busca todos os arquivos JSON em assets/data/gallery/
 */
function loadGalleryData() {
    // Carrega lista de arquivos com fetch da pasta (requer listing endpoint ou alternativa)
    // Para simplificar, vamos usar uma abordagem pragmática:
    // Definir um array com os nomes dos arquivos esperados
    
    const galleryFiles = [
        '2024-gallery-001-setup-de-trabalho',
        '2023-gallery-002-colecao-de-jogos-retro',
        '2023-gallery-003-viagem-para-portugal',
        '2023-gallery-004-evento-de-tecnologia',
        '2024-gallery-005-projeto-em-desenvolvimento',
        '2024-gallery-006-estante-de-livros',
        '2022-gallery-007-workshop-de-programacao',
        '2023-gallery-008-equipamento-de-audio',
        '2024-gallery-009-cafe-da-manha-criativo',
        '2024-gallery-010-ferramentas-de-desenvolvimento',
        '2024-gallery-011-prototipagem-no-figma',
        '2024-gallery-012-evento-tech-conference-2024',
        '2023-gallery-013-montanhas-do-sul',
        '2024-gallery-014-night-gaming-session',
        '2024-gallery-015-codigo-limpo-em-acao',
        '2024-gallery-016-biblioteca-pessoal',
        '2024-gallery-017-code-review-em-tempo-real',
        '2024-gallery-018-plantinhas-da-mesa',
        '2023-gallery-019-praia-ao-entardecer',
        '2024-gallery-020-meetup-de-devs-local',
        '2024-gallery-021-dashboard-em-construcao',
        '2024-gallery-022-setup-gaming-rgb-2024',
        '2024-gallery-023-livro-tech-stack-2024',
        '2023-gallery-024-console-retro-mini',
        '2024-gallery-025-portfolio-website-redesign',
        '2023-gallery-026-viagem-internacional-londres',
        '2024-gallery-027-workshop-advanced-css',
        '2024-gallery-028-colecao-de-teclados-mecanicos'
    ];
    
    // Carrega todos os arquivos em paralelo
    Promise.all(
        galleryFiles.map(filename => 
            fetch(`../assets/data/gallery/${filename}.json`)
                .then(response => response.json())
                .catch(error => {
                    console.warn(`Erro ao carregar ${filename}:`, error);
                    return null;
                })
        )
    ).then(results => {
        // Filtra null (arquivos não encontrados) e adiciona ID
        galleryData = results
            .filter(img => img !== null)
            .map((img, index) => ({
                ...img,
                id: `gallery-${String(index + 1).padStart(3, '0')}`
            }));
        
        // Ordena por ano (mais recente primeiro)
        galleryData.sort((a, b) => parseInt(b.year) - parseInt(a.year));
        filteredGallery = [...galleryData];
        slides = [...galleryData];
        
        // Carrega localStorage
        loadFavoritesFromLocalStorage();
        
        // Se estamos na página de galeria, inicializa
        if (document.getElementById('thumbnails-container')) {
            initGallery();
        }
    }).catch(error => {
        console.error('Erro ao carregar galeria:', error);
        showGalleryError();
    });
}

/**
 * Inicializa sistema da galeria
 */
function initGallery() {
    setupGalleryFilters();
    setupCarouselControls();
    setupModal();
    setupFilterButtons();
    setupPaginationControls();
    updateGalleryDisplay();
    updateGalleryStats();
}

/**
 * Configura controles de paginação
 */
function setupPaginationControls() {
    const prevBtn = document.getElementById('pagination-prev');
    const nextBtn = document.getElementById('pagination-next');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentPage > 0) {
                currentPage--;
                updateThumbnails();
                // Scroll para o topo da seção de miniaturas
                document.getElementById('thumbnails-container')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const totalPages = Math.ceil(filteredGallery.length / itemsPerPage);
            if (currentPage < totalPages - 1) {
                currentPage++;
                updateThumbnails();
                document.getElementById('thumbnails-container')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }
}

/**
 * Atualiza estado dos botões de paginação
 */
function updatePaginationControls() {
    const totalPages = Math.ceil(filteredGallery.length / itemsPerPage);
    const prevBtn = document.getElementById('pagination-prev');
    const nextBtn = document.getElementById('pagination-next');
    const counter = document.getElementById('pagination-counter');
    
    if (prevBtn) {
        prevBtn.disabled = currentPage === 0;
    }
    
    if (nextBtn) {
        nextBtn.disabled = currentPage >= totalPages - 1 || totalPages === 0;
    }
    
    if (counter) {
        if (totalPages > 0) {
            counter.textContent = `página ${currentPage + 1} de ${totalPages}`;
        } else {
            counter.textContent = '';
        }
    }
}

/**
 * Configura event listeners dos filtros interativos
 */
function setupFilterButtons() {
    // Botões de categoria
    document.querySelectorAll('[data-category]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            currentGalleryCategory = e.target.dataset.category;
            updateFilterUI(e.target);
            applyGalleryFilters();
        });
    });
    
    // Botões de ano
    document.querySelectorAll('[data-year]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            currentGalleryYear = e.target.dataset.year;
            updateFilterUI(e.target);
            applyGalleryFilters();
        });
    });
}

/**
 * Atualiza UI dos filtros
 */
function updateFilterUI(activeBtn) {
    activeBtn.parentElement.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.toggle('active', btn === activeBtn);
    });
}

/**
 * Configura filtros customizados (legado)
 */
function setupGalleryFilters() {
    const categorySelect = document.getElementById('gallery-category');
    const yearSelect = document.getElementById('gallery-year');
    
    if (categorySelect) {
        categorySelect.addEventListener('change', (e) => {
            currentGalleryCategory = e.target.value;
            applyGalleryFilters();
        });
    }
    
    if (yearSelect) {
        yearSelect.addEventListener('change', (e) => {
            currentGalleryYear = e.target.value;
            applyGalleryFilters();
        });
    }
}

/**
 * Aplica filtros à galeria
 */
function applyGalleryFilters() {
    let results = [...galleryData];
    
    if (currentGalleryCategory !== 'all') {
        results = results.filter(image => image.category === currentGalleryCategory);
    }
    
    if (currentGalleryYear !== 'all') {
        results = results.filter(image => image.year === currentGalleryYear);
    }
    
    if (currentGalleryFilter === 'favorites') {
        results = results.filter(image => image.favorite);
    }
    
    filteredGallery = results;
    currentPage = 0;  // Reseta para primeira página
    updateGalleryDisplay();
}

/**
 * Atualiza display da galeria
 */
function updateGalleryDisplay() {
    updateMainCarousel();
    updateThumbnails();
}

/**
 * Atualiza carrossel principal
 */
function updateMainCarousel() {
    const carousel = document.querySelector('.main-carousel');
    if (!carousel || filteredGallery.length === 0) return;

    slides = [...filteredGallery];
    currentSlideIndex = 0;
    
    const slide = slides[0];
    carousel.innerHTML = `
        <div class="carousel-slide active" data-index="0">
            <div class="slide-content">
                <div class="slide-image-placeholder" data-image="${slide.image}">
                    <div class="image-icon">🖼️</div>
                    <div class="image-loading">${slide.title}</div>
                </div>
                <div class="slide-info">
                    <h3 class="slide-title">${slide.title}</h3>
                    <p class="slide-description">${slide.description}</p>
                    <div class="slide-meta">
                        ${slide.tags.map(tag => `<span class="slide-tag">${tag}</span>`).join('')}
                    </div>
                </div>
            </div>
        </div>
    `;
    
    const currentEl = document.getElementById('current-slide');
    const totalEl = document.getElementById('total-slides');
    if (currentEl) currentEl.textContent = '1';
    if (totalEl) totalEl.textContent = slides.length;
    
    updateFavoriteButton();
}

/**
 * Atualiza miniaturas
 */
function updateThumbnails() {
    const container = document.getElementById('thumbnails-container');
    if (!container) return;
    
    if (filteredGallery.length === 0) {
        container.innerHTML = '<div class="no-images">nenhuma imagem encontrada</div>';
        updatePaginationControls();
        return;
    }
    
    // Calcula paginação
    const totalPages = Math.ceil(filteredGallery.length / itemsPerPage);
    if (currentPage >= totalPages) currentPage = totalPages - 1;
    if (currentPage < 0) currentPage = 0;
    
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageImages = filteredGallery.slice(startIndex, endIndex);
    
    container.innerHTML = pageImages.map((image, index) => createThumbnail(image, startIndex + index)).join('');
    
    container.querySelectorAll('.thumbnail-item').forEach((thumb, index) => {
        thumb.addEventListener('click', () => goToSlide(startIndex + index));
        
        const favBtn = thumb.querySelector('.thumbnail-favorite');
        if (favBtn) {
            favBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleImageFavorite(pageImages[index].id);
            });
        }
    });
    
    updatePaginationControls();
}

/**
 * Cria HTML da miniatura
 */
function createThumbnail(image, index) {
    const favoriteClass = image.favorite ? 'active' : '';
    
    return `
        <div class="thumbnail-item ${index === 0 ? 'active' : ''}" data-index="${index}" data-id="${image.id}">
            <button class="thumbnail-favorite ${favoriteClass}" 
                    data-image-id="${image.id}"
                    aria-label="${image.favorite ? 'remover dos favoritos' : 'marcar como favorita'}">
                ${image.favorite ? '★' : '☆'}
            </button>
            
            <div class="thumbnail-image-placeholder">
                <div class="image-icon-small">🖼️</div>
                <div class="image-title-small">${image.title}</div>
            </div>
            
            <div class="thumbnail-overlay">
                <div class="thumbnail-title">${image.title}</div>
                <div class="thumbnail-category">${image.category} • ${image.year}</div>
            </div>
        </div>
    `;
}

/**
 * Configura controles do carrossel
 */
function setupCarouselControls() {
    const prevBtn = document.querySelector('.main-prev');
    const nextBtn = document.querySelector('.main-next');
    const favBtn = document.getElementById('slide-favorite');
    const fullscreenBtn = document.getElementById('slide-fullscreen');
    
    if (prevBtn) prevBtn.addEventListener('click', () => goToSlide(currentSlideIndex - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => goToSlide(currentSlideIndex + 1));
    
    if (favBtn) {
        favBtn.addEventListener('click', () => {
            if (slides[currentSlideIndex]) {
                toggleImageFavorite(slides[currentSlideIndex].id);
            }
        });
    }
    
    if (fullscreenBtn) {
        fullscreenBtn.addEventListener('click', openModal);
    }
}

/**
 * Navega para slide específico
 */
function goToSlide(index) {
    if (slides.length === 0) return;
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;
    currentSlideIndex = index;
    updateMainCarousel();
}

/**
 * Atualiza botão de favorito
 */
function updateFavoriteButton() {
    const favBtn = document.getElementById('slide-favorite');
    if (!favBtn || !slides[currentSlideIndex]) return;
    
    const isFavorite = slides[currentSlideIndex].favorite;
    favBtn.textContent = isFavorite ? '★' : '☆';
    favBtn.classList.toggle('active', isFavorite);
}

/**
 * Alterna favorito da imagem
 */
function toggleImageFavorite(imageId) {
    const image = galleryData.find(img => img.id === imageId);
    if (image) {
        image.favorite = !image.favorite;
        saveFavoritesToLocalStorage();
        updateGalleryDisplay();
        
        // Atualiza home se necessário
        if (window.location.pathname === '/' || window.location.pathname.includes('index.html')) {
            loadFeaturedGallery(4);
        }
    }
}

/**
 * Salva favoritos no localStorage
 */
function saveFavoritesToLocalStorage() {
    try {
        const favorites = {};
        galleryData.forEach(image => {
            if (image.favorite) favorites[image.id] = true;
        });
        localStorage.setItem('gallery-favorites', JSON.stringify(favorites));
    } catch (error) {
        console.error('Erro ao salvar favoritos:', error);
    }
}

/**
 * Carrega favoritos do localStorage
 */
function loadFavoritesFromLocalStorage() {
    try {
        const favorites = JSON.parse(localStorage.getItem('gallery-favorites') || '{}');
        galleryData.forEach(image => {
            image.favorite = !!favorites[image.id];
        });
    } catch (error) {
        console.error('Erro ao carregar favoritos:', error);
    }
}

/**
 * Configura modal para visualização full-screen
 */
function setupModal() {
    const modal = document.getElementById('image-modal');
    const closeBtn = document.getElementById('modal-close');
    
    if (!modal) return;
    
    // ESC para fechar
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
    
    // Clique fora para fechar
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
}

/**
 * Abre modal com imagem atual
 */
function openModal() {
    const modal = document.getElementById('image-modal');
    const currentImage = slides[currentSlideIndex];
    
    if (!modal || !currentImage) return;
    
    document.getElementById('modal-title').textContent = currentImage.title;
    document.getElementById('modal-description').textContent = currentImage.description;
    document.getElementById('modal-category').textContent = currentImage.category;
    document.getElementById('modal-year').textContent = currentImage.year;
    document.getElementById('modal-credit').textContent = `crédito: ${currentImage.credit}`;
    
    const modalImg = document.getElementById('modal-image');
    modalImg.alt = currentImage.title;
    modalImg.src = `../assets/images/gallery/${currentImage.image}`;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

/**
 * Fecha modal
 */
function closeModal() {
    const modal = document.getElementById('image-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

/**
 * Carrega imagens para grid de miniaturas da home
 * Mostra apenas imagens favoritas
 */
function loadFeaturedGallery(limit = 4) {
    const container = document.getElementById('home-thumbnails');
    if (!container) return;
    
    // Se galleryData ainda não foi carregado, aguarda
    if (galleryData.length === 0) {
        setTimeout(() => loadFeaturedGallery(limit), 100);
        return;
    }
    
    const featured = galleryData
        .filter(image => image.favorite)
        .slice(0, limit);
    
    if (featured.length === 0) {
        container.innerHTML = '<div class="no-images">nenhuma imagem favorita ainda</div>';
        return;
    }
    
    container.innerHTML = featured.map((image, index) => `
        <a href="pages/galeria.html" class="thumbnail-item-home" data-index="${index}">
            <div class="image-icon">${getIconForCategory(image.category)}</div>
            <div class="image-title">${image.title}</div>
        </a>
    `).join('');
}

/**
 * Retorna ícone adequado para cada categoria
 */
function getIconForCategory(category) {
    const icons = {
        'setup': '💻',
        'games': '🎮',
        'viagens': '✈️',
        'eventos': '🎪',
        'projetos': '📁',
        'default': '🖼️'
    };
    return icons[category] || icons.default;
}

/**
 * Configura carrossel da home
 */
function setupHomeCarousel() {
    const track = document.getElementById('carousel-track');
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');
    
    if (!track || !prevBtn || !nextBtn) return;
    
    // Scroll por item (50% da viewport = 1 item visível + parcial)
    const scrollAmount = track.offsetWidth * 0.5;
    
    const updateButtonStates = () => {
        prevBtn.disabled = track.scrollLeft <= 0;
        nextBtn.disabled = track.scrollLeft >= (track.scrollWidth - track.offsetWidth - 10);
    };
    
    prevBtn.addEventListener('click', () => {
        track.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
        setTimeout(updateButtonStates, 100);
    });
    
    nextBtn.addEventListener('click', () => {
        track.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
        setTimeout(updateButtonStates, 100);
    });
    
    // Atualiza estado dos botões quando scrolla manualmente
    track.addEventListener('scroll', updateButtonStates);
    
    // Inicializa estados dos botões
    updateButtonStates();
}

/**
 * Exibe erro na galeria
 */
function showGalleryError() {
    const container = document.querySelector('.main-carousel');
    if (container) {
        container.innerHTML = `
            <div class="no-images">
                <p>não foi possível carregar a galeria</p>
                <p>tente novamente mais tarde</p>
            </div>
        `;
    }
}

// Exporta para uso global
window.loadGalleryData = loadGalleryData;
window.initGallery = initGallery;
window.loadFeaturedGallery = loadFeaturedGallery;
window.goToSlide = goToSlide;
window.toggleImageFavorite = toggleImageFavorite;
window.openModal = openModal;
window.closeModal = closeModal;

// Carrega dados ao iniciar
loadGalleryData();
