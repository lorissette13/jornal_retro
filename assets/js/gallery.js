/**
 * Sistema de Galeria com Carrossel
 * Galeria interativa com filtros e carrossel
 */

let galleryData = [];
let filteredGallery = [];
let currentGalleryCategory = 'all';
let currentGalleryYear = 'all';
let currentGalleryFilter = 'all';
let currentSlideIndex = 0;
let slides = [];

// Inicializa galeria
async function initGallery() {
    await loadGalleryData();
    loadFavoritesFromLocalStorage();
    setupGalleryFilters();
    setupCarouselControls();
    setupModal();
    updateGalleryDisplay();
    updateGalleryStats();
}

// Carrega dados da galeria
async function loadGalleryData() {
    try {
        const response = await fetch('../assets/data/gallery.json');
        const data = await response.json();
        galleryData = data.images;
        
        // Ordena por ano (mais recente primeiro)
        galleryData.sort((a, b) => parseInt(b.year) - parseInt(a.year));
        
        filteredGallery = [...galleryData];
        slides = [...galleryData];
    } catch (error) {
        console.error('Erro ao carregar galeria:', error);
        showGalleryError();
    }
}

// Configura filtros da galeria
function setupGalleryFilters() {
    // Filtro por categoria
    document.getElementById('gallery-category')?.addEventListener('change', (e) => {
        currentGalleryCategory = e.target.value;
        applyGalleryFilters();
    });
    
    // Filtro por ano
    document.getElementById('gallery-year')?.addEventListener('change', (e) => {
        currentGalleryYear = e.target.value;
        applyGalleryFilters();
    });
    
    // Botões toggle
    document.querySelectorAll('.toggle-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            currentGalleryFilter = btn.dataset.filter;
            updateGalleryToggleButtons(btn);
            applyGalleryFilters();
        });
    });
}

// Atualiza botões toggle ativos
function updateGalleryToggleButtons(activeBtn) {
    document.querySelectorAll('.toggle-btn').forEach(btn => {
        btn.classList.toggle('active', btn === activeBtn);
    });
}

// Aplica filtros da galeria
function applyGalleryFilters() {
    let results = [...galleryData];
    
    // Filtro por categoria
    if (currentGalleryCategory !== 'all') {
        results = results.filter(image => image.category === currentGalleryCategory);
    }
    
    // Filtro por ano
    if (currentGalleryYear !== 'all') {
        results = results.filter(image => image.year === currentGalleryYear);
    }
    
    // Filtro por favoritas
    if (currentGalleryFilter === 'favorites') {
        results = results.filter(image => image.favorite);
    }
    
    filteredGallery = results;
    updateGalleryDisplay();
    updateGalleryStats();
}

// Atualiza display da galeria
function updateGalleryDisplay() {
    updateMainCarousel();
    updateThumbnails();
}

// Atualiza carrossel principal
function updateMainCarousel() {
    const carousel = document.querySelector('.main-carousel');
    if (!carousel || filteredGallery.length === 0) return;
    
    // Atualiza slides com base nas imagens filtradas
    slides = [...filteredGallery];
    
    // Atualiza contador
    document.getElementById('current-slide').textContent = '1';
    document.getElementById('total-slides').textContent = slides.length;
    
    // Se não há slides ativos, cria o primeiro
    if (!document.querySelector('.carousel-slide.active')) {
        createSlide(0);
    }
    
    // Atualiza favorito do slide atual
    updateFavoriteButton();
}

// Cria slide no carrossel
function createSlide(index) {
    const carousel = document.querySelector('.main-carousel');
    if (!carousel || index >= slides.length) return;
    
    const slide = slides[index];
    
    const slideHTML = `
        <div class="carousel-slide ${index === 0 ? 'active' : ''}" data-index="${index}">
            <div class="slide-content">
                <div class="slide-image-placeholder" data-image="${slide.image}">
                    <div class="image-icon">🖼️</div>
                    <div class="image-loading">carregando "${slide.title}"...</div>
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
    
    if (index === 0) {
        carousel.innerHTML = slideHTML;
    } else {
        carousel.insertAdjacentHTML('beforeend', slideHTML);
    }
}

// Atualiza miniaturas
function updateThumbnails() {
    const container = document.getElementById('thumbnails-container');
    if (!container) return;
    
    if (filteredGallery.length === 0) {
        container.innerHTML = '<div class="no-images">nenhuma imagem encontrada</div>';
        return;
    }
    
    container.innerHTML = filteredGallery.map((image, index) => createThumbnail(image, index)).join('');
    
    // Adiciona eventos às miniaturas
    container.querySelectorAll('.thumbnail-item').forEach((thumb, index) => {
        thumb.addEventListener('click', () => {
            goToSlide(index);
        });
        
        // Evento para favoritar
        const favBtn = thumb.querySelector('.thumbnail-favorite');
        if (favBtn) {
            favBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleImageFavorite(image.id);
            });
        }
    });
}

// Cria miniatura
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

// Configura controles do carrossel
function setupCarouselControls() {
    const prevBtn = document.querySelector('.main-prev');
    const nextBtn = document.querySelector('.main-next');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => goToSlide(currentSlideIndex - 1));
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => goToSlide(currentSlideIndex + 1));
    }
    
    // Botão de favorito
    const favBtn = document.getElementById('slide-favorite');
    if (favBtn) {
        favBtn.addEventListener('click', () => {
            if (slides[currentSlideIndex]) {
                toggleImageFavorite(slides[currentSlideIndex].id);
            }
        });
    }
    
    // Botão de tela cheia
    const fullscreenBtn = document.getElementById('slide-fullscreen');
    if (fullscreenBtn) {
        fullscreenBtn.addEventListener('click', openModal);
    }
    
    // Botão de download
    const downloadBtn = document.getElementById('slide-download');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', downloadCurrentImage);
    }
}

// Navega para slide específico
function goToSlide(index) {
    if (index < 0 || index >= slides.length) return;
    
    // Remove classe active do slide atual
    const currentSlide = document.querySelector('.carousel-slide.active');
    if (currentSlide) {
        currentSlide.classList.remove('active');
    }
    
    // Remove classe active da miniatura atual
    const currentThumb = document.querySelector('.thumbnail-item.active');
    if (currentThumb) {
        currentThumb.classList.remove('active');
    }
    
    // Cria novo slide se necessário
    if (!document.querySelector(`.carousel-slide[data-index="${index}"]`)) {
        createSlide(index);
    }
    
    // Ativa novo slide
    const newSlide = document.querySelector(`.carousel-slide[data-index="${index}"]`);
    if (newSlide) {
        newSlide.classList.add('active');
    }
    
    // Ativa nova miniatura
    const newThumb = document.querySelector(`.thumbnail-item[data-index="${index}"]`);
    if (newThumb) {
        newThumb.classList.add('active');
        newThumb.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center'
        });
    }
    
    currentSlideIndex = index;
    
    // Atualiza contador
    document.getElementById('current-slide').textContent = index + 1;
    
    // Atualiza botão de favorito
    updateFavoriteButton();
}

// Atualiza botão de favorito
function updateFavoriteButton() {
    const favBtn = document.getElementById('slide-favorite');
    if (!favBtn || !slides[currentSlideIndex]) return;
    
    const isFavorite = slides[currentSlideIndex].favorite;
    favBtn.textContent = isFavorite ? '★' : '☆';
    favBtn.classList.toggle('active', isFavorite);
}

// Alterna favorito da imagem
function toggleImageFavorite(imageId) {
    const image = galleryData.find(img => img.id === imageId);
    if (image) {
        image.favorite = !image.favorite;
        
        // Atualiza no localStorage centralizado
        saveFavoritesToLocalStorage();
        
        // Atualiza display
        updateGalleryDisplay();
        updateGalleryStats();
        
        // Atualiza na home se estiver nela
        if (window.location.pathname.includes('index.html')) {
            loadFeaturedGallery(4);
        }
    }
}

// Salva favorito no localStorage
function saveImageFavorite(imageId, isFavorite) {
    try {
        const favorites = JSON.parse(localStorage.getItem('image-favorites') || '{}');
        favorites[imageId] = isFavorite;
        localStorage.setItem('image-favorites', JSON.stringify(favorites));
    } catch (error) {
        console.error('Erro ao salvar favorito:', error);
    }
}

// Configura modal
function setupModal() {
    const modal = document.getElementById('image-modal');
    const closeBtn = document.getElementById('modal-close');
    
    if (!modal || !closeBtn) return;
    
    // Fecha modal com ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
    
    // Fecha modal ao clicar fora
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    closeBtn.addEventListener('click', closeModal);
}

// Abre modal com imagem atual
function openModal() {
    const modal = document.getElementById('image-modal');
    const currentImage = slides[currentSlideIndex];
    
    if (!modal || !currentImage) return;
    
    // Preenche dados do modal
    document.getElementById('modal-title').textContent = currentImage.title;
    document.getElementById('modal-description').textContent = currentImage.description;
    document.getElementById('modal-category').textContent = currentImage.category;
    document.getElementById('modal-year').textContent = currentImage.year;
    document.getElementById('modal-credit').textContent = `crédito: ${currentImage.credit}`;
    
    // Configura imagem (placeholder por enquanto)
    const modalImg = document.getElementById('modal-image');
    modalImg.alt = currentImage.title;
    modalImg.src = `../assets/images/gallery/${currentImage.image}`;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Fecha modal
function closeModal() {
    const modal = document.getElementById('image-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Download da imagem atual
function downloadCurrentImage() {
    const currentImage = slides[currentSlideIndex];
    if (!currentImage) return;
    
    // Simula download (em produção, seria o link real)
    alert(`Download da imagem "${currentImage.title}" iniciado`);
    
    // Em produção:
    // const link = document.createElement('a');
    // link.href = `../assets/images/gallery/${currentImage.image}`;
    // link.download = `${currentImage.title}.jpg`;
    // link.click();
}

// Atualiza estatísticas
function updateGalleryStats() {
    const totalImages = galleryData.length;
    const favoriteImages = galleryData.filter(img => img.favorite).length;
    
    // Conta categorias e anos únicos
    const categories = [...new Set(galleryData.map(img => img.category))].length;
    const years = [...new Set(galleryData.map(img => img.year))].length;
    
    document.getElementById('total-images').textContent = totalImages;
    document.getElementById('favorite-images').textContent = favoriteImages;
    document.getElementById('total-categories').textContent = categories;
    document.getElementById('total-years').textContent = years;
}

// Carrega imagens favoritas para a home
function loadFeaturedGallery(limit = 4) {
    const container = document.getElementById('carousel-track');
    if (!container) return;
    
    const featured = galleryData
        .filter(image => image.favorite)
        .slice(0, limit);
    
    if (featured.length === 0) {
        container.innerHTML = '<div class="no-images">nenhuma imagem favorita ainda</div>';
        return;
    }
    
    container.innerHTML = featured.map((image, index) => `
        <div class="carousel-item" data-index="${index}">
            <div class="carousel-image-placeholder" data-image="${image.image}">
                <div class="image-icon">🖼️</div>
                <div class="image-title">${image.title}</div>
            </div>
        </div>
    `).join('');
    
    // Configura navegação do carrossel da home
    setupHomeCarousel();
}

// Configura carrossel da home
function setupHomeCarousel() {
    const track = document.getElementById('carousel-track');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    
    if (!track || !prevBtn || !nextBtn) return;
    
    const itemWidth = 220;
    const items = track.children.length;
    let position = 0;
    const maxPosition = -((items - 1) * itemWidth);
    
    prevBtn.addEventListener('click', () => {
        position = Math.min(position + itemWidth, 0);
        track.style.transform = `translateX(${position}px)`;
        updateHomeCarouselButtons();
    });
    
    nextBtn.addEventListener('click', () => {
        position = Math.max(position - itemWidth, maxPosition);
        track.style.transform = `translateX(${position}px)`;
        updateHomeCarouselButtons();
    });
    
    function updateHomeCarouselButtons() {
        prevBtn.disabled = position >= 0;
        nextBtn.disabled = position <= maxPosition;
    }
    
    updateHomeCarouselButtons();
}

// Mostra erro na galeria
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

// Exporta funções para uso global
window.loadFeaturedGallery = loadFeaturedGallery;