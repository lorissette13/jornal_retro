/**
 * Sistema de Carrossel para Homepage
 */

let currentSlide = 0;
let totalSlides = 0;

function initCarousel() {
    const track = document.getElementById('carousel-track');
    if (!track) return;
    
    // Adiciona imagens de exemplo (em produção, carregar de JSON)
    const images = [
        { src: 'assets/images/gallery/setup.jpg', alt: 'Setup de trabalho', title: 'Setup 2024' },
        { src: 'assets/images/gallery/games.jpg', alt: 'Coleção de jogos', title: 'Jogos Retrô' },
        { src: 'assets/images/gallery/evento.jpg', alt: 'Evento tech', title: 'Meetup Dev' },
        { src: 'assets/images/gallery/projeto.jpg', alt: 'Projeto em desenvolvimento', title: 'Workspace' }
    ];
    
    track.innerHTML = images.map((img, index) => `
        <div class="carousel-slide ${index === 0 ? 'active' : ''}" data-index="${index}">
            <div class="slide-content">
                <div class="slide-image-placeholder">
                    <div class="image-icon">🖼️</div>
                    <div class="image-loading">${img.title}</div>
                </div>
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
    const slides = document.querySelectorAll('.carousel-slide');
    if (slides.length === 0) return;
    
    // Remove classe active do slide atual
    slides[currentSlide].classList.remove('active');
    
    // Calcula novo índice
    currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
    
    // Adiciona classe active ao novo slide
    slides[currentSlide].classList.add('active');
    
    // Atualiza posição do track
    const track = document.getElementById('carousel-track');
    if (track) {
        track.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
}

// Exporta para uso global
window.initCarousel = initCarousel;