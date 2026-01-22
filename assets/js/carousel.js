/**
 * Sistema de Carrossel para Homepage
 */

let currentSlide = 0;
let totalSlides = 0;

function initCarousel() {
    const track = document.getElementById('carousel-track');
    if (!track) return;
    
    // Adiciona imagens de exemplo (usando emojis como placeholders)
    const images = [
        { emoji: '📸', title: 'Fotografia' },
        { emoji: '🎮', title: 'Games' },
        { emoji: '🎵', title: 'Música' },
        { emoji: '✈️', title: 'Viagens' },
        { emoji: '☕', title: 'Dev Life' },
        { emoji: '📚', title: 'Conhecimento' },
        { emoji: '🎨', title: 'Design' },
        { emoji: '💻', title: 'Código' }
    ];
    
    track.innerHTML = images.map((img, index) => `
        <div class="carousel-item ${index === 0 ? 'active' : ''}" data-index="${index}">
            <div class="carousel-image-placeholder">
                <div class="image-icon">${img.emoji}</div>
                <div class="image-title">${img.title}</div>
            </div>
        </div>
    `).join('');
    
    totalSlides = images.length;
    
    // Configura botões
    setupCarouselControls();
}

function setupCarouselControls() {
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    
    if (prevBtn) prevBtn.addEventListener('click', () => navigateCarousel(-1));
    if (nextBtn) nextBtn.addEventListener('click', () => navigateCarousel(1));
}

function navigateCarousel(direction) {
    const items = document.querySelectorAll('.carousel-item');
    if (items.length === 0) return;
    
    // Remove classe active do item atual
    items[currentSlide].classList.remove('active');
    
    // Calcula novo índice
    currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
    
    // Adiciona classe active ao novo item
    items[currentSlide].classList.add('active');
    
    // Atualiza posição do track com scroll suave
    const track = document.getElementById('carousel-track');
    if (track) {
        const itemWidth = 240; // 220px item + 20px gap
        track.scrollLeft = currentSlide * itemWidth;
    }
}

// Exporta para uso global
window.initCarousel = initCarousel;