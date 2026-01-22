/**
 * Carousel - Componente Genérico de Carrossel
 * Funciona com qualquer tipo de dados e é altamente configurável
 */

class Carousel {
  /**
   * @param {Object} options - Configuração
   */
  constructor(options = {}) {
    this.container = document.querySelector(options.container) || null;
    this.items = options.items || [];
    this.visibleItems = options.visibleItems || CONFIG.CAROUSEL_VISIBLE_ITEMS;
    this.itemWidth = options.itemWidth || CONFIG.CAROUSEL_ITEM_WIDTH;
    this.autoAdvance = options.autoAdvance || CONFIG.CAROUSEL_AUTO_ADVANCE;
    this.autoAdvanceInterval = options.autoAdvanceInterval || 5000;
    this.template = options.template || this._defaultTemplate;
    this.type = options.type || 'default';

    this.currentSlide = 0;
    this.totalSlides = this.items.length;
    this.autoAdvanceTimer = null;

    if (this.container) {
      this.init();
    }
  }

  /**
   * Inicializa carousel
   */
  init() {
    this.render();
    this.setupControls();
    if (this.autoAdvance) {
      this.startAutoAdvance();
    }
  }

  /**
   * Template padrão
   */
  _defaultTemplate(item, index) {
    return `
      <div class="carousel-item ${index === 0 ? 'active' : ''}" data-index="${index}" data-id="${item.id}">
        <div class="carousel-content">
          ${item.emoji ? `<div class="carousel-emoji">${item.emoji}</div>` : ''}
          ${item.image ? `<img src="${item.image}" alt="${item.title}">` : ''}
          <h4 class="carousel-title">${item.title || item.name || ''}</h4>
        </div>
      </div>
    `;
  }

  /**
   * Renderiza carousel
   */
  render() {
    if (!this.container) return this;

    let trackHTML = '<div class="carousel-track">';

    this.items.forEach((item, index) => {
      trackHTML += this.template(item, index);
    });

    trackHTML += '</div>';

    this.container.innerHTML = trackHTML;
    this.updateCarouselPosition();

    return this;
  }

  /**
   * Configura botões de controle
   */
  setupControls() {
    const prevBtn = this.container?.querySelector('.carousel-btn.prev');
    const nextBtn = this.container?.querySelector('.carousel-btn.next');

    if (prevBtn) {
      prevBtn.addEventListener('click', () => this.prev());
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => this.next());
    }

    // Suporte a teclado
    if (this.container) {
      this.container.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') this.prev();
        if (e.key === 'ArrowRight') this.next();
      });
    }

    // Touch support
    this.setupTouchSupport();
  }

  /**
   * Configura suporte a touch/swipe
   */
  setupTouchSupport() {
    let touchStartX = 0;
    let touchEndX = 0;

    const track = this.container?.querySelector('.carousel-track');
    if (!track) return;

    track.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, false);

    track.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      this.handleSwipe(touchStartX, touchEndX);
    }, false);
  }

  /**
   * Detecta swipe
   */
  handleSwipe(startX, endX) {
    const diff = startX - endX;
    const threshold = 50;

    if (Math.abs(diff) < threshold) return;

    if (diff > 0) {
      // Swipe à esquerda = próximo
      this.next();
    } else {
      // Swipe à direita = anterior
      this.prev();
    }
  }

  /**
   * Vai para próximo slide
   */
  next() {
    this.stopAutoAdvance();
    this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
    this.updateCarouselPosition();
    this.updateActiveItem();
    if (this.autoAdvance) {
      this.startAutoAdvance();
    }
    return this;
  }

  /**
   * Vai para slide anterior
   */
  prev() {
    this.stopAutoAdvance();
    this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
    this.updateCarouselPosition();
    this.updateActiveItem();
    if (this.autoAdvance) {
      this.startAutoAdvance();
    }
    return this;
  }

  /**
   * Vai para slide específico
   */
  goToSlide(index) {
    this.stopAutoAdvance();
    this.currentSlide = index % this.totalSlides;
    this.updateCarouselPosition();
    this.updateActiveItem();
    if (this.autoAdvance) {
      this.startAutoAdvance();
    }
    return this;
  }

  /**
   * Atualiza posição visual do carousel
   */
  updateCarouselPosition() {
    const track = this.container?.querySelector('.carousel-track');
    if (!track) return;

    const offset = this.currentSlide * this.itemWidth;
    track.style.transform = `translateX(-${offset}px)`;
    track.style.transition = `transform ${CONFIG.ANIMATIONS.SLIDE_DURATION}ms ${CONFIG.ANIMATIONS.EASING}`;
  }

  /**
   * Atualiza classe active
   */
  updateActiveItem() {
    const items = this.container?.querySelectorAll('.carousel-item');
    if (!items) return;

    items.forEach((item, index) => {
      item.classList.toggle('active', index === this.currentSlide);
    });
  }

  /**
   * Inicia auto-advance
   */
  startAutoAdvance() {
    if (this.autoAdvanceTimer) return;

    this.autoAdvanceTimer = setInterval(() => {
      this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
      this.updateCarouselPosition();
      this.updateActiveItem();
    }, this.autoAdvanceInterval);

    return this;
  }

  /**
   * Para auto-advance
   */
  stopAutoAdvance() {
    if (this.autoAdvanceTimer) {
      clearInterval(this.autoAdvanceTimer);
      this.autoAdvanceTimer = null;
    }
    return this;
  }

  /**
   * Adiciona items dinamicamente
   */
  addItems(newItems) {
    this.items = [...this.items, ...newItems];
    this.totalSlides = this.items.length;
    this.render();
    this.setupControls();
    return this;
  }

  /**
   * Define novos items
   */
  setItems(items) {
    this.items = items;
    this.totalSlides = this.items.length;
    this.currentSlide = 0;
    this.render();
    this.setupControls();
    return this;
  }

  /**
   * Obtém item atual
   */
  getCurrentItem() {
    return this.items[this.currentSlide] || null;
  }

  /**
   * Obtém todos os items
   */
  getItems() {
    return this.items;
  }

  /**
   * Obtém informações do carousel
   */
  getInfo() {
    return {
      currentSlide: this.currentSlide,
      totalSlides: this.totalSlides,
      visibleItems: this.visibleItems,
      currentItem: this.getCurrentItem()
    };
  }

  /**
   * Destrói carousel (limpa recursos)
   */
  destroy() {
    this.stopAutoAdvance();
    if (this.container) {
      this.container.innerHTML = '';
    }
  }
}

// Exporta para uso global
window.Carousel = Carousel;
