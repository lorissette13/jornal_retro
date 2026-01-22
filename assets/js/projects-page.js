// projects-page.js - Lógica específica da página de projetos
let currentPage = 1;
const itemsPerPage = 3;
let filteredProjects = [];
let allProjects = PROJECTS_DATA.projects;

// Inicialização - DOMContentLoaded já disparado em projetos.html
// Apenas executa quando a página estiver pronta
setTimeout(function() {
    displayProjects();
    setupFilters();
    setupNavigation();
}, 100);

function setupFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active de todos
            filterBtns.forEach(b => b.classList.remove('active'));
            // Adiciona ao clicado
            this.classList.add('active');

            const status = this.getAttribute('data-status');
            currentPage = 1;

            if (status === 'all') {
                filteredProjects = allProjects;
            } else if (status === 'featured') {
                filteredProjects = allProjects.filter(p => p.featured);
            } else {
                filteredProjects = allProjects.filter(p => p.status === status);
            }

            displayProjects();
        });
    });
}

function displayProjects() {
    if (filteredProjects.length === 0) {
        filteredProjects = allProjects;
    }

    const container = document.getElementById('projects-container');
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageProjects = filteredProjects.slice(startIndex, endIndex);

    container.innerHTML = pageProjects.map(renderProjectHTML).join('');

    updatePagination();
}

function setupNavigation() {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    prevBtn.addEventListener('click', () => goToPreviousPage());
    nextBtn.addEventListener('click', () => goToNextPage());
}

function goToPreviousPage() {
    if (currentPage > 1) {
        currentPage--;
        displayProjects();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function goToNextPage() {
    const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        displayProjects();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function updatePagination() {
    const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);

    // Top navigation
    document.getElementById('current-page').textContent = currentPage;
    document.getElementById('total-pages').textContent = totalPages;
    document.getElementById('prev-btn').disabled = currentPage === 1;
    document.getElementById('next-btn').disabled = currentPage === totalPages;
}