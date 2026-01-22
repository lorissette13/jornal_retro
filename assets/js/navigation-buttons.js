// navigation-buttons.js - Módulo de Botões de Navegação Reutilizáveis

/**
 * Módulo para criar botões de navegação reutilizáveis
 * Fornece funções para gerar botões padronizados para navegação
 */

class NavigationButtons {
    constructor() {
        this.buttonStyles = {
            primary: 'btn-primary',
            secondary: 'btn-secondary',
            outline: 'btn-outline',
            ghost: 'btn-ghost'
        };

        this.buttonSizes = {
            small: 'btn-small',
            medium: 'btn-medium',
            large: 'btn-large'
        };
    }

    /**
     * Cria um botão de navegação básico
     * @param {Object} options - Opções do botão
     * @param {string} options.text - Texto do botão
     * @param {string} options.href - URL de destino
     * @param {string} options.style - Estilo (primary, secondary, outline, ghost)
     * @param {string} options.size - Tamanho (small, medium, large)
     * @param {string} options.icon - Classe do ícone (opcional)
     * @param {boolean} options.external - Se é link externo
     * @param {Function} options.onClick - Função de callback para clique
     * @returns {HTMLElement} Elemento button criado
     */
    createButton(options = {}) {
        const {
            text = '',
            href = '#',
            style = 'primary',
            size = 'medium',
            icon = '',
            external = false,
            onClick = null
        } = options;

        // Cria o elemento
        const button = document.createElement(external ? 'a' : 'button');

        // Define atributos
        if (external) {
            button.href = href;
            button.target = '_blank';
            button.rel = 'noopener noreferrer';
        } else if (href && href !== '#') {
            button.setAttribute('data-href', href);
        }

        // Adiciona classes
        const classes = ['nav-button', this.buttonStyles[style], this.buttonSizes[size]];
        button.className = classes.join(' ');

        // Adiciona ícone se fornecido
        if (icon) {
            const iconElement = document.createElement('span');
            iconElement.className = `icon ${icon}`;
            button.appendChild(iconElement);
        }

        // Adiciona texto
        const textElement = document.createElement('span');
        textElement.className = 'button-text';
        textElement.textContent = text;
        button.appendChild(textElement);

        // Adiciona event listener se fornecido
        if (onClick && typeof onClick === 'function') {
            button.addEventListener('click', onClick);
        } else if (!external && href && href !== '#') {
            button.addEventListener('click', () => this.handleNavigation(href));
        }

        return button;
    }

    /**
     * Cria um grupo de botões de navegação
     * @param {Array} buttonsConfig - Array de configurações de botões
     * @param {string} containerClass - Classe CSS para o container
     * @returns {HTMLElement} Container com os botões
     */
    createButtonGroup(buttonsConfig = [], containerClass = 'button-group') {
        const container = document.createElement('div');
        container.className = containerClass;

        buttonsConfig.forEach(config => {
            const button = this.createButton(config);
            container.appendChild(button);
        });

        return container;
    }

    /**
     * Cria botão "Voltar"
     * @param {string} targetPage - Página de destino (padrão: index.html)
     * @param {string} text - Texto do botão (padrão: "voltar")
     * @returns {HTMLElement} Botão voltar
     */
    createBackButton(targetPage = 'index.html', text = 'voltar') {
        return this.createButton({
            text: text,
            href: targetPage,
            style: 'outline',
            size: 'small',
            icon: 'icon-arrow-left'
        });
    }

    /**
     * Cria botão "Ver Mais/Ler Mais"
     * @param {string} href - Link de destino
     * @param {string} text - Texto do botão (padrão: "ver mais")
     * @returns {HTMLElement} Botão ver mais
     */
    createReadMoreButton(href, text = 'ver mais') {
        return this.createButton({
            text: text,
            href: href,
            style: 'primary',
            size: 'medium',
            icon: 'icon-arrow-right'
        });
    }

    /**
     * Cria botão de ação (conectar, contato, etc.)
     * @param {string} action - Tipo de ação
     * @param {string} text - Texto do botão
     * @param {Function} onClick - Função de callback
     * @returns {HTMLElement} Botão de ação
     */
    createActionButton(action, text, onClick) {
        const configs = {
            connect: { style: 'primary', icon: 'icon-connect' },
            contact: { style: 'secondary', icon: 'icon-mail' },
            download: { style: 'outline', icon: 'icon-download' },
            share: { style: 'ghost', icon: 'icon-share' }
        };

        const config = configs[action] || configs.connect;

        return this.createButton({
            text: text,
            style: config.style,
            size: 'medium',
            icon: config.icon,
            onClick: onClick
        });
    }

    /**
     * Manipula navegação interna
     * @param {string} href - URL de destino
     */
    handleNavigation(href) {
        if (window.navigateToPage) {
            window.navigateToPage(href);
        } else {
            window.location.href = href;
        }
    }

    /**
     * Adiciona botões a um container
     * @param {string} containerId - ID do container
     * @param {Array} buttonsConfig - Configuração dos botões
     */
    addButtonsToContainer(containerId, buttonsConfig) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const buttonGroup = this.createButtonGroup(buttonsConfig);
        container.appendChild(buttonGroup);
    }
}

// Instância global
const navButtons = new NavigationButtons();

// Exporta para uso global
window.NavigationButtons = NavigationButtons;
window.navButtons = navButtons;