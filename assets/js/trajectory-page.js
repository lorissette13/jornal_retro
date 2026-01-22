// trajectory-page.js - Lógica específica da página de trajetória
let currentPage = 1;
const itemsPerPage = 3;
let filteredTrajectory = [];
let allTrajectory = TRAJECTORY_DATA.trajectory;
let currentFilter = 'all';
let currentSkillFilter = null;

// Inicialização - DOMContentLoaded já disparado em trajetoria.html
setTimeout(function() {
    displayTrajectory();
    setupFilters();
    setupNavigation();
}, 100);

function setupFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn:not(.skill-filter)');
    const skillBtns = document.querySelectorAll('.skill-filter');
    
    // Filtros gerais (todos/destaque)
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active de todos os não-skill
            filterBtns.forEach(b => b.classList.remove('active'));
            // Adiciona ao clicado
            this.classList.add('active');
            
            currentFilter = this.getAttribute('data-type');
            currentPage = 1;
            
            applyFilters();
        });
    });
    
    // Filtros de habilidades
    skillBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Se já está ativo, desativa (toggle)
            if (this.classList.contains('active')) {
                this.classList.remove('active');
                currentSkillFilter = null;
            } else {
                // Remove active de todos os outros skills
                skillBtns.forEach(b => b.classList.remove('active'));
                // Adiciona ao clicado
                this.classList.add('active');
                currentSkillFilter = this.getAttribute('data-skill');
            }
            
            currentPage = 1;
            applyFilters();
        });
    });
}

function applyFilters() {
    filteredTrajectory = allTrajectory;
    
    // Aplica filtro geral
    if (currentFilter === 'featured') {
        filteredTrajectory = filteredTrajectory.filter(exp => exp.featured);
    }
    
    // Aplica filtro de skill
    if (currentSkillFilter) {
        filteredTrajectory = filteredTrajectory.filter(exp =>
            exp.skills.includes(currentSkillFilter)
        );
    }
    
    displayTrajectory();
}

function displayTrajectory() {
    if (filteredTrajectory.length === 0) {
        filteredTrajectory = allTrajectory;
    }
    
    const container = document.getElementById('trajectory-container');
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageTrajectory = filteredTrajectory.slice(startIndex, endIndex);
    
    container.innerHTML = pageTrajectory.map(renderTrajectoryHTML).join('');
    
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
        displayTrajectory();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function goToNextPage() {
    const totalPages = Math.ceil(filteredTrajectory.length / itemsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        displayTrajectory();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function updatePagination() {
    const totalPages = Math.ceil(filteredTrajectory.length / itemsPerPage);
    
    // Top navigation
    document.getElementById('current-page').textContent = currentPage;
    document.getElementById('total-pages').textContent = totalPages;
    document.getElementById('prev-btn').disabled = currentPage === 1;
    document.getElementById('next-btn').disabled = currentPage === totalPages;
}
