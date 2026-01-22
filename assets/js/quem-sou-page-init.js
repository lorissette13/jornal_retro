// quem-sou-page.js - Lógica específica da página de quem sou
setTimeout(function() {
    // DOMContentLoaded já disparado em quem-sou.html
    loadQuemSouContent();
}, 100);

function loadQuemSouContent() {
    const container = document.getElementById('full-who-content');
    const paragraphs = getAllAboutMeParagraphs();
    
    container.innerHTML = paragraphs.map(para => `
        <p class="paragraph">${para.content}</p>
    `).join('');
}
