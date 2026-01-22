// quem-sou-page.js - Lógica da página Quem Sou
document.addEventListener('DOMContentLoaded', function() {
    // Carrega componentes
    loadComponent('header-container', '../components/header.html');
    loadComponent('footer-container', '../components/footer.html');

    // Carrega conteúdo
    loadQuemSouContent();
});

function loadQuemSouContent() {
    const container = document.getElementById('full-who-content');
    const paragraphs = getAllAboutMeParagraphs();

    container.innerHTML = paragraphs.map(para => `
        <p class="paragraph">${para.content}</p>
    `).join('');
}