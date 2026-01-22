// tests/navigation.test.js - Testes para navigation.js

// Mock do fetch para testes
global.fetch = jest.fn();

// Mock do document
global.document = {
    getElementById: jest.fn(),
    addEventListener: jest.fn(),
    querySelector: jest.fn(),
    querySelectorAll: jest.fn(() => []),
    createElement: jest.fn(() => ({
        id: '',
        className: '',
        innerHTML: '',
        appendChild: jest.fn(),
        removeChild: jest.fn(),
        classList: {
            add: jest.fn(),
            remove: jest.fn(),
            toggle: jest.fn()
        }
    })),
    body: {
        appendChild: jest.fn(),
        removeChild: jest.fn()
    },
    title: 'Test Page'
};

// Mock do window
global.window = {
    location: {
        pathname: '/index.html'
    },
    history: {
        pushState: jest.fn()
    },
    scrollTo: jest.fn(),
    dispatchEvent: jest.fn(),
    addEventListener: jest.fn()
};

// Mock do sessionStorage
global.sessionStorage = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn()
};

// Mock do DOMParser
global.DOMParser = jest.fn(() => ({
    parseFromString: jest.fn(() => ({
        querySelector: jest.fn(() => ({ innerHTML: '<div>Test Content</div>' })),
        title: 'New Page Title'
    }))
}));

// Importar funções (simulando)
const {
    loadComponent,
    navigateToPage,
    getCurrentPage,
    updateNavigationLinks,
    saveScrollPosition,
    restoreScrollPosition
} = require('../assets/js/navigation.js');

describe('Navigation Module Tests', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('loadComponent should load and insert HTML', async () => {
        const mockHtml = '<div>Test Component</div>';

        fetch.mockResolvedValueOnce({
            ok: true,
            text: () => Promise.resolve(mockHtml)
        });

        const mockContainer = {
            innerHTML: '',
            querySelectorAll: jest.fn(() => [])
        };
        document.getElementById.mockReturnValue(mockContainer);

        await loadComponent('test-container', 'components/test.html');

        expect(fetch).toHaveBeenCalledWith('components/test.html');
        expect(mockContainer.innerHTML).toBe(mockHtml);
    });

    test('loadComponent should handle errors gracefully', async () => {
        fetch.mockRejectedValueOnce(new Error('Network error'));

        const mockContainer = { innerHTML: '' };
        document.getElementById.mockReturnValue(mockContainer);

        await loadComponent('test-container', 'components/test.html');

        expect(mockContainer.innerHTML).toContain('erro ao carregar componente');
    });

    test('getCurrentPage should return current page from pathname', () => {
        window.location.pathname = '/pages/quem-sou.html';
        expect(getCurrentPage()).toBe('quem-sou.html');

        window.location.pathname = '/index.html';
        expect(getCurrentPage()).toBe('index.html');

        window.location.pathname = '/';
        expect(getCurrentPage()).toBe('index.html');
    });

    test('saveScrollPosition should save scroll and page to sessionStorage', () => {
        window.scrollY = 500;
        window.location.pathname = '/index.html';

        saveScrollPosition();

        expect(sessionStorage.setItem).toHaveBeenCalledWith('scrollPosition', '500');
        expect(sessionStorage.setItem).toHaveBeenCalledWith('currentPage', 'index.html');
    });

    test('restoreScrollPosition should restore scroll when page matches', () => {
        sessionStorage.getItem.mockImplementation((key) => {
            if (key === 'currentPage') return 'index.html';
            if (key === 'scrollPosition') return '300';
            return null;
        });

        window.location.pathname = '/index.html';

        restoreScrollPosition();

        // Verifica se scrollTo foi chamado após timeout
        setTimeout(() => {
            expect(window.scrollTo).toHaveBeenCalledWith(0, 300);
            expect(sessionStorage.removeItem).toHaveBeenCalledWith('scrollPosition');
            expect(sessionStorage.removeItem).toHaveBeenCalledWith('currentPage');
        }, 150);
    });

    test('updateNavigationLinks should update nav items', () => {
        const mockNavItems = [
            { getAttribute: jest.fn(() => '#quem-sou'), setAttribute: jest.fn(), classList: { add: jest.fn(), remove: jest.fn() } },
            { getAttribute: jest.fn(() => '#projetos'), setAttribute: jest.fn(), classList: { add: jest.fn(), remove: jest.fn() } }
        ];

        document.querySelectorAll.mockReturnValue(mockNavItems);
        window.location.pathname = '/index.html';

        updateNavigationLinks();

        // Verifica se os links foram atualizados
        expect(mockNavItems[0].setAttribute).toHaveBeenCalledWith('href', '#quem-sou');
        expect(mockNavItems[0].classList.add).toHaveBeenCalledWith('active');
    });

    // Teste básico para navigateToPage (mais complexo devido a animações)
    test('navigateToPage should handle successful navigation', async () => {
        const mockHtml = `
            <html>
                <head><title>New Page</title></head>
                <body><div class="page-content">New Content</div></body>
            </html>
        `;

        fetch.mockResolvedValueOnce({
            ok: true,
            text: () => Promise.resolve(mockHtml)
        });

        const mockContent = { innerHTML: '', style: {} };
        document.querySelector.mockReturnValue(mockContent);

        await navigateToPage('pages/test.html');

        expect(fetch).toHaveBeenCalledWith('pages/test.html');
        expect(window.history.pushState).toHaveBeenCalled();
        expect(window.dispatchEvent).toHaveBeenCalledWith(
            expect.objectContaining({
                type: 'pagechanged',
                detail: { page: 'pages/test.html' }
            })
        );
    });
});