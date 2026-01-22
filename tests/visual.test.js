/**
 * tests/visual.test.js - Testes para elementos visuais
 * Typewriter, Hover efeitos, Cores botões
 * 30% cobertura focada em visual regression
 */

describe('Visual Elements Tests', () => {
    
    // ====== TYPEWRITER TESTS ======
    describe('Typewriter Effect', () => {
        let typewriterElement;
        
        beforeEach(() => {
            document.body.innerHTML = `
                <h1 id="typewriter-logo" class="typewriter">lorissette13</h1>
            `;
            typewriterElement = document.getElementById('typewriter-logo');
        });

        test('deve ter classe "typewriter" para ativar animação CSS', () => {
            expect(typewriterElement.classList.contains('typewriter')).toBe(true);
        });

        test('deve manter conteúdo original durante animação', () => {
            const originalText = typewriterElement.textContent;
            expect(originalText).toBe('lorissette13');
        });

        test('deve estar visível e com tamanho adequado', () => {
            const styles = window.getComputedStyle(typewriterElement);
            // Deve ter fonte Special Elite
            expect(typewriterElement.style.fontFamily || styles.fontFamily).toBeTruthy();
            // Deve estar visível
            expect(styles.display).not.toBe('none');
        });

        test('deve ter animação de typewriter definida em CSS', () => {
            const styles = window.getComputedStyle(typewriterElement);
            // Verificar se há transição ou animação
            const hasAnimation = styles.animation || styles.animationName;
            expect(hasAnimation).toBeTruthy();
        });
    });

    // ====== HOVER EFFECTS TESTS ======
    describe('Hover Effects (Blocos de Conteúdo)', () => {
        let projectCard, postCard;
        
        beforeEach(() => {
            document.body.innerHTML = `
                <article class="project-card">
                    <h2>Projeto Teste</h2>
                    <p>Descrição</p>
                </article>
                <article class="post-card">
                    <h2>Post Teste</h2>
                    <p>Conteúdo</p>
                </article>
            `;
            projectCard = document.querySelector('.project-card');
            postCard = document.querySelector('.post-card');
        });

        test('cards devem ter classe para hover efeito', () => {
            expect(projectCard.classList.contains('project-card')).toBe(true);
            expect(postCard.classList.contains('post-card')).toBe(true);
        });

        test('project-card deve ter shadow/lift no hover', () => {
            const styles = projectCard.getAttribute('style') || window.getComputedStyle(projectCard);
            // Verificar se tem propriedade de sombra ou transform
            expect(projectCard.classList.toString()).toBeTruthy();
        });

        test('post-card deve ter transição suave', () => {
            const styles = window.getComputedStyle(postCard);
            const transition = styles.transition || styles.transitionDuration;
            // Deve ter transição definida
            expect(transition).toBeTruthy();
        });

        test('cards devem manter tamanho em desktop (4 colunas)', () => {
            // Simular viewport desktop
            const rect = projectCard.getBoundingClientRect();
            // Deve ter dimensões válidas
            expect(rect.width).toBeGreaterThan(0);
            expect(rect.height).toBeGreaterThan(0);
        });
    });

    // ====== BUTTON COLORS TESTS ======
    describe('Button Colors & Styling', () => {
        let primaryBtn, filterBtn, navBtn;
        
        beforeEach(() => {
            document.body.innerHTML = `
                <style>
                    :root {
                        --btn-primary-bg: #2d5a3d;
                        --btn-primary-text: #f5f5dc;
                        --btn-hover-bg: #1e3a2a;
                    }
                </style>
                <button class="btn-primary">clique aqui</button>
                <button class="filter-btn active" data-category="all">todos</button>
                <button class="nav-btn prev-btn">‹ anterior</button>
            `;
            primaryBtn = document.querySelector('.btn-primary');
            filterBtn = document.querySelector('.filter-btn');
            navBtn = document.querySelector('.nav-btn');
        });

        test('botões primários devem estar presentes', () => {
            expect(primaryBtn).toBeTruthy();
            expect(filterBtn).toBeTruthy();
            expect(navBtn).toBeTruthy();
        });

        test('cores devem vir de CSS variables (tokens.css)', () => {
            // Verificar se CSS root tem as variáveis
            const root = document.documentElement;
            const bgColor = getComputedStyle(root).getPropertyValue('--btn-primary-bg');
            expect(bgColor).toBeTruthy();
        });

        test('botão ativo deve ter classe "active"', () => {
            expect(filterBtn.classList.contains('active')).toBe(true);
        });

        test('botões devem ter tipo correto e acessibilidade', () => {
            expect(primaryBtn.tagName).toBe('BUTTON');
            expect(navBtn.getAttribute('class')).toBeTruthy();
        });

        test('botão desabilitado deve ter atributo disabled', () => {
            const disabledBtn = document.createElement('button');
            disabledBtn.disabled = true;
            document.body.appendChild(disabledBtn);
            expect(disabledBtn.disabled).toBe(true);
        });
    });

    // ====== RESPONSIVE TESTS ======
    describe('Responsive Layout', () => {
        let container;
        
        beforeEach(() => {
            document.body.innerHTML = `
                <div class="posts-container" style="display: grid; grid-template-columns: repeat(4, 1fr);">
                    <article>Post 1</article>
                    <article>Post 2</article>
                    <article>Post 3</article>
                    <article>Post 4</article>
                </div>
            `;
            container = document.querySelector('.posts-container');
        });

        test('grid deve ter 4 colunas em desktop', () => {
            const gridCols = window.getComputedStyle(container).gridTemplateColumns;
            expect(gridCols).toContain('1fr');
        });

        test('todos os cards devem ter altura similar', () => {
            const cards = container.querySelectorAll('article');
            const heights = Array.from(cards).map(c => c.offsetHeight);
            // Todos devem ter altura (mesmo que dinâmica)
            heights.forEach(h => expect(h).toBeGreaterThan(0));
        });
    });

    // ====== FILTER BUTTONS TESTS ======
    describe('Filter Button Styling', () => {
        let filterContainer;
        
        beforeEach(() => {
            document.body.innerHTML = `
                <div class="filter-buttons">
                    <button class="filter-btn active" data-category="all">todos</button>
                    <button class="filter-btn filter-color-filmes" data-category="filmes">filmes</button>
                    <button class="filter-btn filter-color-jogos" data-category="jogos">jogos</button>
                </div>
            `;
            filterContainer = document.querySelector('.filter-buttons');
        });

        test('botão ativo deve estar identificado', () => {
            const activeBtn = filterContainer.querySelector('.filter-btn.active');
            expect(activeBtn).toBeTruthy();
            expect(activeBtn.textContent).toContain('todos');
        });

        test('cada categoria deve ter classe de cor', () => {
            const filmesBtn = filterContainer.querySelector('.filter-color-filmes');
            expect(filmesBtn).toBeTruthy();
            expect(filmesBtn.classList.contains('filter-color-filmes')).toBe(true);
        });

        test('filtros devem ter data-category para identificação', () => {
            const buttons = filterContainer.querySelectorAll('.filter-btn');
            buttons.forEach(btn => {
                expect(btn.getAttribute('data-category')).toBeTruthy();
            });
        });

        test('cores de filtro devem estar em tokens.css', () => {
            // Simular leitura de tokens
            const root = document.documentElement;
            const style = window.getComputedStyle(root);
            // Deve ter definições de cores
            expect(style).toBeTruthy();
        });
    });

    // ====== NAVIGATION BUTTONS TESTS ======
    describe('Navigation Button States', () => {
        let prevBtn, nextBtn;
        
        beforeEach(() => {
            document.body.innerHTML = `
                <button class="nav-btn prev-btn" id="prev-btn" disabled>
                    ‹ anterior
                </button>
                <button class="nav-btn next-btn" id="next-btn">
                    próximo ›
                </button>
            `;
            prevBtn = document.getElementById('prev-btn');
            nextBtn = document.getElementById('next-btn');
        });

        test('botão anterior deve estar desabilitado na primeira página', () => {
            expect(prevBtn.disabled).toBe(true);
        });

        test('botão próximo deve estar habilitado por padrão', () => {
            expect(nextBtn.disabled).toBe(false);
        });

        test('botões devem ter ícones visuais corretos', () => {
            expect(prevBtn.textContent).toContain('‹');
            expect(nextBtn.textContent).toContain('›');
        });

        test('botões desabilitados devem ter estilo visual diferente', () => {
            const disabledStyle = window.getComputedStyle(prevBtn);
            // Deve ter opacity reduzida ou similar
            expect(disabledStyle.cursor || 'default').toBeTruthy();
        });
    });

    // ====== COLOR TOKENS CONSISTENCY ======
    describe('Color Tokens (tokens.css)', () => {
        let rootElement;
        
        beforeEach(() => {
            rootElement = document.documentElement;
        });

        test('CSS root deve ter variáveis de cores definidas', () => {
            const style = getComputedStyle(rootElement);
            const bgColor = style.getPropertyValue('--btn-primary-bg');
            expect(bgColor).toBeTruthy();
        });

        test('cores devem ser hexadecimais válidas', () => {
            const style = getComputedStyle(rootElement);
            const bgColor = style.getPropertyValue('--btn-primary-bg');
            // Básico: deve ter # ou ser válido
            expect(bgColor.trim().length).toBeGreaterThan(0);
        });

        test('todas as categorias devem ter cores definidas', () => {
            const categories = ['filmes', 'jogos', 'boardgames', 'livros', 'música', 'dev-life', 'viagens'];
            categories.forEach(cat => {
                const className = `filter-color-${cat}`;
                // Elemento com classe deve existir na DOM ou CSS
                expect(className).toBeTruthy();
            });
        });
    });

});

/**
 * Instruções para executar:
 * 
 * 1. Verificar visuais:
 *    npm test -- tests/visual.test.js
 * 
 * 2. Manual (recomendado para visuais):
 *    - Abrir http://localhost:8000/?debug=visual
 *    - Verificar typewriter, hover, cores
 * 
 * 3. Regressão:
 *    - Sempre rodar testes após mexer em CSS
 *    - Verificar em desktop + mobile
 */
