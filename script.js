/**
 * Script principal - Portfólio lorissette13
 * Funcionalidades básicas do jornal retro
 */

// Typewriter effect para o logo
function initTypewriter() {
    const logo = document.getElementById('typewriter-logo');
    if (!logo) return;

    const text = 'lorissette13';
    let index = 0;
    
    // Limpa o conteúdo inicial
    logo.textContent = '';

    function typeWriter() {
        if (index < text.length) {
            logo.textContent = text.substring(0, index + 1);
            index++;
            setTimeout(typeWriter, 120);
        } else {
            // Remove o cursor piscante após terminar
            setTimeout(() => {
                logo.style.setProperty('--after-display', 'none');
            }, 500);
        }
    }

    // Começa após um pequeno delay
    setTimeout(typeWriter, 500);
}

// Smooth scroll para navegação
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-item');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Animações de entrada
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Elementos para animar
    const animatedElements = document.querySelectorAll('.who-column, .news-item, .project, .tag-category, .mock-image-gallery');

    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Botão conectar - funcionalidade básica
function initConnectButton() {
    const connectBtn = document.getElementById('main-btn');

    if (connectBtn) {
        connectBtn.addEventListener('click', function(e) {
            e.preventDefault();

            // Animação simples
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
                alert('Funcionalidade de contato em desenvolvimento! 📧');
            }, 150);
        });
    }
}

// Botões pequenos
function initSmallButtons() {
    const smallButtons = document.querySelectorAll('.btn-small');

    smallButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();

            const buttonText = this.textContent.trim();

            if (buttonText.includes('linha do tempo')) {
                alert('Timeline profissional em desenvolvimento! 📅');
            } else if (buttonText.includes('stack completo')) {
                alert('Página de habilidades em desenvolvimento! 💻');
            } else {
                alert(`Funcionalidade "${buttonText}" em desenvolvimento! 🚧`);
            }
        });
    });
}

// Galeria mock
function initGallery() {
    const galleryItems = document.querySelectorAll('.mock-image-gallery');

    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            const categories = ['📁 Arquivos', '🎮 Jogos', '🎵 Música', '✈️ Viagens'];
            alert(`${categories[index]} - Galeria em desenvolvimento! 📸`);
        });
    });
}

// Inicialização quando DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Inicializando jornal retro lorissette13...');

    initTypewriter();
    initSmoothScroll();
    initAnimations();
    initConnectButton();
    initSmallButtons();
    initGallery();
});

// Previne comportamento padrão em links vazios
document.addEventListener('click', function(e) {
    if (e.target.tagName === 'A' && !e.target.getAttribute('href')) {
        e.preventDefault();
    }
});