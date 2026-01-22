// tests/main.test.js - Testes para main.js

// Mock do fetch para testes
global.fetch = jest.fn();

// Mock do document
global.document = {
    getElementById: jest.fn(),
    addEventListener: jest.fn(),
    readyState: 'complete'
};

// Importar funções (simulando)
const {
    loadFeaturedExperiences,
    loadFeaturedProjects,
    loadComponent,
    initTypewriter,
    initConnectButton,
    initFadeInAnimations
} = require('../assets/js/main.js');

describe('Main Module Tests', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('loadFeaturedExperiences should load and display experiences', async () => {
        const mockData = {
            experiences: [
                { title: 'Test Exp 1', description: 'Desc 1', period: '2020-2021', company: 'Company 1' },
                { title: 'Test Exp 2', description: 'Desc 2', period: '2021-2022', company: 'Company 2' }
            ]
        };

        fetch.mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve(mockData)
        });

        const mockContainer = { innerHTML: '' };
        document.getElementById.mockReturnValue(mockContainer);

        await loadFeaturedExperiences(2);

        expect(fetch).toHaveBeenCalledWith('assets/data/trajetoria.json');
        expect(mockContainer.innerHTML).toContain('Test Exp 1');
        expect(mockContainer.innerHTML).toContain('Test Exp 2');
    });

    test('loadFeaturedProjects should load and display projects', async () => {
        const mockData = {
            projects: [
                { description: 'Project 1', tech: ['html', 'css'] },
                { description: 'Project 2', tech: ['js', 'react'] },
                { description: 'Project 3', tech: ['node', 'api'] }
            ]
        };

        fetch.mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve(mockData)
        });

        const mockContainer = { innerHTML: '' };
        document.getElementById.mockReturnValue(mockContainer);

        await loadFeaturedProjects(3);

        expect(fetch).toHaveBeenCalledWith('assets/data/projects.json');
        expect(mockContainer.innerHTML).toContain('Project 1');
        expect(mockContainer.innerHTML).toContain('html • css');
    });

    test('loadComponent should load and insert HTML', async () => {
        const mockHtml = '<div>Test Component</div>';

        fetch.mockResolvedValueOnce({
            ok: true,
            text: () => Promise.resolve(mockHtml)
        });

        const mockContainer = { innerHTML: '' };
        document.getElementById.mockReturnValue(mockContainer);

        await loadComponent('test-container', 'components/test.html');

        expect(fetch).toHaveBeenCalledWith('components/test.html');
        expect(mockContainer.innerHTML).toBe(mockHtml);
    });

    test('initTypewriter should animate text', () => {
        const mockElement = {
            textContent: 'Test Text',
            style: {}
        };

        document.getElementById.mockReturnValue(mockElement);

        initTypewriter();

        // Verifica se o texto foi limpo inicialmente
        expect(mockElement.textContent).toBe('');
        expect(mockElement.style.borderRight).toBe('2px solid #7E8C54');
    });

    test('initConnectButton should add event listener', () => {
        const mockButton = {
            addEventListener: jest.fn()
        };

        document.getElementById.mockReturnValue(mockButton);

        initConnectButton();

        expect(mockButton.addEventListener).toHaveBeenCalledWith('click', expect.any(Function));
    });

    // Teste para initFadeInAnimations seria mais complexo devido ao IntersectionObserver
    // Por enquanto, apenas verificar se não lança erro
    test('initFadeInAnimations should not throw error', () => {
        expect(() => initFadeInAnimations()).not.toThrow();
    });
});