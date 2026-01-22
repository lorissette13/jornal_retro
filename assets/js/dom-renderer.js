/**
 * DOMRenderer - Renderização Genérica de Componentes
 * Classe reutilizável para renderizar cards, listas e grids
 * Funciona com qualquer tipo de dados (posts, projetos, galeria, timeline)
 */

class DOMRenderer {
  /**
   * @param {Object} options - Configuração de renderização
   */
  constructor(options = {}) {
    this.container = options.container || null;
    this.template = options.template || this._defaultTemplate;
    this.type = options.type || DATA_TYPES.POSTS;
    this.onCardClick = options.onCardClick || null;
    this.onFavoriteClick = options.onFavoriteClick || null;
    this.cardClass = options.cardClass || 'content-card';
    this.animateOnRender = options.animate !== false;
  }

  /**
   * Template padrão para posts/items genéricos
   */
  _defaultTemplate(item, type) {
    const categoryConfig = this._getCategoryConfig(item.category, type);
    const categoryLabel = categoryConfig?.label || item.category || '';
    const categoryColor = categoryConfig?.color || '#556B2F';
    const icon = categoryConfig?.icon || '📌';

    const dateStr = this._formatDate(item.date);
    const favoriteClass = item.favorite ? 'favorite' : '';
    const tags = (item.tags || []).slice(0, CONFIG.MAX_VISIBLE_TAGS);

    return `
      <article class="${this.cardClass} ${favoriteClass}" data-id="${item.id}">
        <div class="card-header">
          <div class="card-meta">
            <span class="card-category" style="color: ${categoryColor}">
              ${icon} ${categoryLabel}
            </span>
            <span class="card-date">${dateStr}</span>
          </div>
          <button class="btn-favorite" data-id="${item.id}" title="Favoritar">
            ${item.favorite ? '❤️' : '🤍'}
          </button>
        </div>
        
        <div class="card-content">
          <h3 class="card-title">${item.title}</h3>
          ${item.description ? `<p class="card-description">${this._truncate(item.description)}</p>` : ''}
          
          ${this._renderParagraphs(item.paragraphs)}
          ${this._renderTechStack(item.tech || item.skills || [])}
        </div>

        ${this._renderTags(tags)}

        <div class="card-actions">
          ${item.github ? `<a href="${item.github}" class="btn-small" target="_blank">GitHub</a>` : ''}
          ${item.demo ? `<a href="${item.demo}" class="btn-small" target="_blank">Demo</a>` : ''}
          ${item.live ? `<a href="${item.live}" class="btn-small" target="_blank">Acessar</a>` : ''}
          ${!item.github && !item.demo && !item.live ? '<div class="card-empty-actions"></div>' : ''}
        </div>
      </article>
    `;
  }

  /**
   * Template para timeline/experiência
   */
  getTimelineTemplate(item) {
    const typeConfig = CONFIG.TIMELINE_TYPES[item.type] || {};
    const dateStr = this._formatDate(item.date || item.period);

    return `
      <div class="timeline-item" data-id="${item.id}">
        <div class="timeline-marker" style="color: ${typeConfig.color}">
          ${typeConfig.icon} ${typeConfig.label}
        </div>
        
        <div class="timeline-content">
          <h3 class="timeline-title">${item.title}</h3>
          ${item.company || item.institution ? `
            <p class="timeline-subtitle">${item.company || item.institution}</p>
          ` : ''}
          <p class="timeline-period">${dateStr}</p>
          
          ${item.description ? `<p class="timeline-description">${item.description}</p>` : ''}
          
          ${this._renderTimelineContent(item.content)}
          ${this._renderTechStack(item.skills || [])}
        </div>
      </div>
    `;
  }

  /**
   * Template para galeria
   */
  getGalleryTemplate(item) {
    const categoryConfig = CONFIG.GALLERY_CATEGORIES[item.category] || {};

    return `
      <div class="gallery-item" data-id="${item.id}">
        <div class="gallery-image-wrapper">
          <img src="${item.image || 'placeholder.jpg'}" 
               alt="${item.title}" 
               class="gallery-image"
               loading="lazy">
          <div class="gallery-overlay">
            <button class="btn-favorite" data-id="${item.id}">
              ${item.favorite ? '❤️' : '🤍'}
            </button>
          </div>
        </div>
        
        <div class="gallery-info">
          <h3 class="gallery-title">${item.title}</h3>
          ${item.description ? `<p class="gallery-description">${item.description}</p>` : ''}
          <div class="gallery-meta">
            <span class="gallery-category">${categoryConfig.icon} ${categoryConfig.label}</span>
            <span class="gallery-year">${item.year || ''}</span>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Template para carousel
   */
  getCarouselTemplate(item) {
    return `
      <div class="carousel-item" data-id="${item.id}">
        <div class="carousel-content">
          ${item.emoji ? `<div class="carousel-emoji">${item.emoji}</div>` : ''}
          ${item.image ? `<img src="${item.image}" alt="${item.title}" class="carousel-image">` : ''}
          <h4 class="carousel-title">${item.title}</h4>
        </div>
      </div>
    `;
  }

  /**
   * Renderiza múltiplos items
   */
  render(items, options = {}) {
    if (!this.container) {
      console.error('Container não definido para DOMRenderer');
      return this;
    }

    // Limpa container
    if (options.clear !== false) {
      this.container.innerHTML = '';
    }

    // Renderiza cada item
    items.forEach(item => {
      const html = this._selectTemplate(item);
      const element = this._createElementFromHTML(html);

      // Adiciona event listeners
      this._attachEventListeners(element, item);

      // Anima se necessário
      if (this.animateOnRender) {
        element.style.opacity = '0';
        this.container.appendChild(element);
        this._animateFadeIn(element);
      } else {
        this.container.appendChild(element);
      }
    });

    return this;
  }

  /**
   * Seleciona template apropriado baseado no tipo
   */
  _selectTemplate(item) {
    switch (this.type) {
      case DATA_TYPES.TIMELINE:
        return this.getTimelineTemplate(item);
      case DATA_TYPES.GALLERY:
        return this.getGalleryTemplate(item);
      case 'carousel':
        return this.getCarouselTemplate(item);
      default:
        return this.template(item, this.type);
    }
  }

  /**
   * Cria elemento DOM a partir de HTML string
   */
  _createElementFromHTML(html) {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = html.trim();
    return wrapper.firstChild;
  }

  /**
   * Anexa event listeners ao elemento
   */
  _attachEventListeners(element, item) {
    // Clique em favorito
    const favBtn = element.querySelector('.btn-favorite');
    if (favBtn && this.onFavoriteClick) {
      favBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.onFavoriteClick(item.id);
        favBtn.textContent = item.favorite ? '❤️' : '🤍';
      });
    }

    // Clique no card
    if (this.onCardClick) {
      element.addEventListener('click', () => this.onCardClick(item));
    }
  }

  /**
   * Anima entrada do elemento (fade-in)
   */
  _animateFadeIn(element) {
    requestAnimationFrame(() => {
      element.style.transition = `opacity ${CONFIG.ANIMATIONS.FADE_IN_DURATION}ms ease-in`;
      element.style.opacity = '1';
    });
  }

  /**
   * Formata data de forma legível
   */
  _formatDate(dateStr) {
    if (!dateStr) return '';
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString(CONFIG.DATE_FORMAT.LOCALE, CONFIG.DATE_FORMAT.OPTIONS);
    } catch {
      return dateStr;
    }
  }

  /**
   * Trunca texto
   */
  _truncate(text, length = CONFIG.EXCERPT_LENGTH) {
    if (text.length <= length) return text;
    return text.substring(0, length) + '...';
  }

  /**
   * Renderiza parágrafos
   */
  _renderParagraphs(paragraphs = []) {
    if (!paragraphs || paragraphs.length === 0) return '';

    return paragraphs.map(p => `<p class="card-paragraph">${p}</p>`).join('');
  }

  /**
   * Renderiza stack de tecnologias
   */
  _renderTechStack(techs = []) {
    if (!techs || techs.length === 0) return '';

    const displayed = techs.slice(0, CONFIG.MAX_VISIBLE_SKILLS);
    const remaining = techs.length - displayed.length;

    return `
      <div class="tech-stack">
        ${displayed.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
        ${remaining > 0 ? `<span class="tech-tag more-techs">+${remaining}</span>` : ''}
      </div>
    `;
  }

  /**
   * Renderiza tags/labels
   */
  _renderTags(tags = []) {
    if (!tags || tags.length === 0) return '';

    return `
      <div class="card-tags">
        ${tags.map(tag => `<span class="tag">#${tag}</span>`).join('')}
      </div>
    `;
  }

  /**
   * Renderiza conteúdo estruturado de timeline
   */
  _renderTimelineContent(content) {
    if (!content) return '';

    let html = '';

    if (content.contexto) {
      html += `<div class="timeline-section"><strong>Contexto:</strong> ${content.contexto}</div>`;
    }

    if (content.realizacoes) {
      const items = content.realizacoes.split('\n').filter(l => l.trim());
      html += `
        <div class="timeline-section">
          <strong>Realizações:</strong>
          <ul class="timeline-list">
            ${items.map(item => `<li>${item}</li>`).join('')}
          </ul>
        </div>
      `;
    }

    if (content.aprendizados) {
      html += `<div class="timeline-section"><strong>Aprendizados:</strong> ${content.aprendizados}</div>`;
    }

    return html;
  }

  /**
   * Obtém configuração de categoria
   */
  _getCategoryConfig(category, type) {
    const configs = {
      [DATA_TYPES.POSTS]: CONFIG.POST_CATEGORIES,
      [DATA_TYPES.PROJECTS]: CONFIG.PROJECT_CATEGORIES,
      [DATA_TYPES.GALLERY]: CONFIG.GALLERY_CATEGORIES,
      [DATA_TYPES.TIMELINE]: CONFIG.TIMELINE_TYPES
    };

    return configs[type]?.[category] || null;
  }

  /**
   * Limpa container
   */
  clear() {
    if (this.container) {
      this.container.innerHTML = '';
    }
    return this;
  }

  /**
   * Define novo container
   */
  setContainer(selector) {
    this.container = document.querySelector(selector);
    return this;
  }
}

// Exporta para uso global
window.DOMRenderer = DOMRenderer;
