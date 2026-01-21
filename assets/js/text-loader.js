/**
 * Sistema de Carregamento de Textos
 */

async function loadTextContent(filePath, elementMap) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) throw new Error('File not found');
        
        const text = await response.text();
        const paragraphs = text.split('---');
        
        for (const [elementId, paragraphIndex] of Object.entries(elementMap)) {
            const element = document.getElementById(elementId);
            if (element && paragraphs[paragraphIndex]) {
                element.textContent = paragraphs[paragraphIndex].trim();
            }
        }
    } catch (error) {
        console.error('Erro ao carregar conteúdo:', error);
        // Fallback para conteúdo estático
        setFallbackContent(elementMap);
    }
}

function setFallbackContent(elementMap) {
    const fallbacks = {
        'who-text-1': 'desenvolvedor front-end com raízes em html/css/js vanilla. nasci em 1995 e desde criança fui fascinado pela web dos anos 2000 - geocities, blogs, fóruns.',
        'who-text-2': 'hoje, especializado em react/vue mas mantenho o amor pelo simples e funcional. este portfólio é uma homenagem à estética retro-moderna que me inspira.'
    };
    
    for (const [elementId] of Object.entries(elementMap)) {
        const element = document.getElementById(elementId);
        if (element && fallbacks[elementId]) {
            element.textContent = fallbacks[elementId];
        }
    }
}

async function loadFullPageContent(pageName) {
    try {
        const response = await fetch(`assets/data/${pageName}.txt`);
        if (!response.ok) throw new Error('File not found');
        
        const text = await response.text();
        const container = document.getElementById('full-who-content');
        if (container) {
            container.innerHTML = text.split('---').map(paragraph => 
                `<p class="page-paragraph">${paragraph.trim()}</p>`
            ).join('');
        }
    } catch (error) {
        console.error('Erro ao carregar página:', error);
        // Fallback
        const container = document.getElementById('full-who-content');
        if (container) {
            container.innerHTML = `
                <p class="page-paragraph">desenvolvedor front-end com 8+ anos de experiência</p>
                <p class="page-paragraph">especializado em criar interfaces modernas com foco em performance e acessibilidade</p>
                <p class="page-paragraph">apaixonado por design systems, arquitetura front-end e boas práticas de código</p>
            `;
        }
    }
}

// Exporta para uso global
window.loadTextContent = loadTextContent;
window.loadFullPageContent = loadFullPageContent;