/**
 * Typewriter Effect - Módulo para efeito de digitação no logo
 * Executado em todas as páginas (home + internas)
 */

function initTypewriter() {
    const element = document.getElementById('typewriter-logo');
    if (!element) return;

    const text = element.textContent;
    const speed = 100; // ms por caractere

    element.textContent = '';
    let index = 0;

    function typeCharacter() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(typeCharacter, speed);
        }
    }

    typeCharacter();
}

// Exporta globalmente
window.initTypewriter = initTypewriter;
