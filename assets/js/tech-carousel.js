/**
 * Carrossel de Tecnologias
 */

function initTechCarousel() {
    const carousel = document.getElementById('tech-carousel');
    if (!carousel) return;
    
    const technologies = [
        { name: 'html5', icon: '🌐' },
        { name: 'css3', icon: '🎨' },
        { name: 'javascript', icon: '📜' },
        { name: 'typescript', icon: '📘' },
        { name: 'react', icon: '⚛️' },
        { name: 'vue', icon: '🟢' },
        { name: 'node.js', icon: '🟩' },
        { name: 'python', icon: '🐍' },
        { name: 'mongodb', icon: '🍃' },
        { name: 'docker', icon: '🐳' },
        { name: 'aws', icon: '☁️' },
        { name: 'git', icon: '📚' },
        { name: 'figma', icon: '🎯' },
        { name: 'sass', icon: '💅' },
        { name: 'webpack', icon: '📦' }
    ];
    
    // Adiciona tecnologias ao carrossel
    carousel.innerHTML = technologies.map(tech => `
        <div class="tech-item">
            <div class="tech-icon">${tech.icon}</div>
            <div class="tech-name">${tech.name}</div>
        </div>
    `).join('');
    
    // Configura navegação
    setupCarouselNavigation();
}

// Configura navegação do carrossel
function setupCarouselNavigation() {
    const carousel = document.getElementById('tech-carousel');
    const prevBtn = document.querySelector('.prev-tech');
    const nextBtn = document.querySelector('.next-tech');
    
    if (!carousel || !prevBtn || !nextBtn) return;
    
    const scrollAmount = 150;
    
    prevBtn.addEventListener('click', () => {
        carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });
    
    nextBtn.addEventListener('click', () => {
        carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
    
    // Esconde/mostra botões baseado na posição do scroll
    carousel.addEventListener('scroll', () => {
        const isAtStart = carousel.scrollLeft === 0;
        const isAtEnd = carousel.scrollLeft >= carousel.scrollWidth - carousel.clientWidth;
        
        prevBtn.style.opacity = isAtStart ? '0.3' : '1';
        nextBtn.style.opacity = isAtEnd ? '0.3' : '1';
        
        prevBtn.disabled = isAtStart;
        nextBtn.disabled = isAtEnd;
    });
    
    // Inicializa estado dos botões
    carousel.dispatchEvent(new Event('scroll'));
}