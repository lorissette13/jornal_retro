/**
 * Utilities - Funções Auxiliares Compartilhadas
 * Funções reutilizáveis em todo o portfólio (formatação, DOM, storage, etc)
 */

class StorageManager {
  /**
   * Obtém dados do localStorage
   */
  static get(key, defaultValue = null) {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : defaultValue;
    } catch {
      return defaultValue;
    }
  }

  /**
   * Salva dados no localStorage
   */
  static set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Remove item do localStorage
   */
  static remove(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Limpa todo o localStorage
   */
  static clear() {
    try {
      localStorage.clear();
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Verifica se chave existe
   */
  static has(key) {
    return localStorage.getItem(key) !== null;
  }
}

class DOMUtils {
  /**
   * Cria elemento com classe
   */
  static createElement(tag, className = '', text = '') {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (text) el.textContent = text;
    return el;
  }

  /**
   * Remove elemento
   */
  static remove(selector) {
    document.querySelectorAll(selector).forEach(el => el.remove());
  }

  /**
   * Limpa container
   */
  static clear(selector) {
    const el = document.querySelector(selector);
    if (el) el.innerHTML = '';
  }

  /**
   * Adiciona classe
   */
  static addClass(selector, className) {
    document.querySelectorAll(selector).forEach(el => el.classList.add(className));
  }

  /**
   * Remove classe
   */
  static removeClass(selector, className) {
    document.querySelectorAll(selector).forEach(el => el.classList.remove(className));
  }

  /**
   * Toggle classe
   */
  static toggleClass(selector, className) {
    document.querySelectorAll(selector).forEach(el => el.classList.toggle(className));
  }

  /**
   * Atribui atributo
   */
  static setAttribute(selector, attr, value) {
    document.querySelectorAll(selector).forEach(el => el.setAttribute(attr, value));
  }

  /**
   * Obtém atributo
   */
  static getAttribute(selector, attr) {
    const el = document.querySelector(selector);
    return el ? el.getAttribute(attr) : null;
  }

  /**
   * Mostra elemento
   */
  static show(selector) {
    this.removeClass(selector, 'hidden');
  }

  /**
   * Esconde elemento
   */
  static hide(selector) {
    this.addClass(selector, 'hidden');
  }

  /**
   * Agrega event listener múltiplo
   */
  static addEventListener(selector, event, callback) {
    document.querySelectorAll(selector).forEach(el => {
      el.addEventListener(event, callback);
    });
  }
}

class FormatterUtils {
  /**
   * Formata data
   */
  static formatDate(dateStr, options = {}) {
    if (!dateStr) return '';
    try {
      const date = new Date(dateStr + 'T00:00:00');
      const locale = options.locale || CONFIG.DATE_FORMAT.LOCALE;
      const formatOptions = options.options || CONFIG.DATE_FORMAT.OPTIONS;
      return date.toLocaleDateString(locale, formatOptions);
    } catch {
      return dateStr;
    }
  }

  /**
   * Formata data para input
   */
  static formatDateForInput(dateStr) {
    if (!dateStr) return '';
    const date = new Date(dateStr + 'T00:00:00');
    return date.toISOString().split('T')[0];
  }

  /**
   * Formata período (ex: 2020-2023 -> "2020 - 2023")
   */
  static formatPeriod(period) {
    if (!period) return '';
    if (period.includes('-')) {
      return period.split('-').map(p => p.trim()).join(' - ');
    }
    return period;
  }

  /**
   * Trunca texto
   */
  static truncate(text, length = CONFIG.EXCERPT_LENGTH) {
    if (!text || text.length <= length) return text;
    return text.substring(0, length) + '...';
  }

  /**
   * Capitaliza string
   */
  static capitalize(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  /**
   * Slug de string (para URLs)
   */
  static slugify(str) {
    return str
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');
  }

  /**
   * Remove acentos
   */
  static removeAccents(str) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  /**
   * Formata número com separador
   */
  static formatNumber(num) {
    return new Intl.NumberFormat('pt-BR').format(num);
  }

  /**
   * Tempo legível (há X tempo atrás)
   */
  static timeAgo(dateStr) {
    const date = new Date(dateStr + 'T00:00:00');
    const now = new Date();
    const diff = Math.floor((now - date) / 1000);

    const units = [
      { name: 'ano', seconds: 31536000 },
      { name: 'mês', seconds: 2592000 },
      { name: 'semana', seconds: 604800 },
      { name: 'dia', seconds: 86400 },
      { name: 'hora', seconds: 3600 },
      { name: 'minuto', seconds: 60 }
    ];

    for (const unit of units) {
      const amount = Math.floor(diff / unit.seconds);
      if (amount >= 1) {
        return `há ${amount} ${unit.name}${amount > 1 ? 's' : ''}`;
      }
    }

    return 'agora mesmo';
  }
}

class ArrayUtils {
  /**
   * Agrupa array por propriedade
   */
  static groupBy(arr, key) {
    return arr.reduce((acc, item) => {
      const value = item[key];
      if (!acc[value]) acc[value] = [];
      acc[value].push(item);
      return acc;
    }, {});
  }

  /**
   * Ordena array
   */
  static sortBy(arr, key, order = 'asc') {
    return [...arr].sort((a, b) => {
      const aVal = a[key];
      const bVal = b[key];

      if (aVal < bVal) return order === 'asc' ? -1 : 1;
      if (aVal > bVal) return order === 'asc' ? 1 : -1;
      return 0;
    });
  }

  /**
   * Filtra array único
   */
  static unique(arr, key = null) {
    if (!key) {
      return [...new Set(arr)];
    }
    const seen = new Set();
    return arr.filter(item => {
      const value = item[key];
      if (seen.has(value)) return false;
      seen.add(value);
      return true;
    });
  }

  /**
   * Encontra duplicatas
   */
  static findDuplicates(arr, key = null) {
    const items = key 
      ? arr.map(item => item[key]) 
      : arr;
    
    const seen = new Set();
    const duplicates = new Set();

    items.forEach(item => {
      if (seen.has(item)) {
        duplicates.add(item);
      }
      seen.add(item);
    });

    return Array.from(duplicates);
  }

  /**
   * Chunk array
   */
  static chunk(arr, size) {
    const chunks = [];
    for (let i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size));
    }
    return chunks;
  }

  /**
   * Flatten array
   */
  static flatten(arr) {
    return arr.reduce((flat, item) => {
      return flat.concat(Array.isArray(item) ? this.flatten(item) : item);
    }, []);
  }

  /**
   * Encontra valor entre arrays
   */
  static intersection(arr1, arr2) {
    return arr1.filter(item => arr2.includes(item));
  }
}

class AnimationUtils {
  /**
   * Fade in animation
   */
  static fadeIn(element, duration = CONFIG.ANIMATIONS.FADE_IN_DURATION) {
    element.style.opacity = '0';
    element.style.transition = `opacity ${duration}ms ease-in`;
    
    requestAnimationFrame(() => {
      element.style.opacity = '1';
    });
  }

  /**
   * Fade out animation
   */
  static fadeOut(element, duration = CONFIG.ANIMATIONS.FADE_IN_DURATION) {
    element.style.transition = `opacity ${duration}ms ease-out`;
    element.style.opacity = '0';

    return new Promise(resolve => {
      setTimeout(resolve, duration);
    });
  }

  /**
   * Slide in animation
   */
  static slideIn(element, direction = 'left', duration = CONFIG.ANIMATIONS.SLIDE_DURATION) {
    const start = direction === 'left' ? '-100%' : '100%';
    element.style.transform = `translateX(${start})`;
    element.style.transition = `transform ${duration}ms ${CONFIG.ANIMATIONS.EASING}`;
    
    requestAnimationFrame(() => {
      element.style.transform = 'translateX(0)';
    });
  }

  /**
   * Escala animation
   */
  static scale(element, scale = 1, duration = CONFIG.ANIMATIONS.FADE_IN_DURATION) {
    element.style.transform = 'scale(0.9)';
    element.style.transition = `transform ${duration}ms ease-in`;
    
    requestAnimationFrame(() => {
      element.style.transform = `scale(${scale})`;
    });
  }

  /**
   * Pulso animation
   */
  static pulse(element, count = 3) {
    let pulses = 0;
    const originalOpacity = element.style.opacity || '1';
    
    const interval = setInterval(() => {
      element.style.opacity = element.style.opacity === '0.5' ? originalOpacity : '0.5';
      pulses++;
      
      if (pulses >= count * 2) {
        clearInterval(interval);
        element.style.opacity = originalOpacity;
      }
    }, 200);
  }

  /**
   * Shake animation
   */
  static shake(element, intensity = 5, duration = 300) {
    const start = Date.now();
    const originalTransform = element.style.transform;

    const animate = () => {
      const elapsed = Date.now() - start;
      const progress = elapsed / duration;

      if (progress < 1) {
        const offset = Math.sin(progress * Math.PI * 4) * intensity;
        element.style.transform = `translateX(${offset}px)`;
        requestAnimationFrame(animate);
      } else {
        element.style.transform = originalTransform;
      }
    };

    animate();
  }
}

// Exporta classes globalmente
window.StorageManager = StorageManager;
window.DOMUtils = DOMUtils;
window.FormatterUtils = FormatterUtils;
window.ArrayUtils = ArrayUtils;
window.AnimationUtils = AnimationUtils;
