/**
 * YourNotes — Lógica Principal
 * CRUD de notas, troca de estilos, renderização e eventos
 */

/* =========================================================================
   CONFIGURAÇÃO
   ========================================================================= */

const CATEGORIES = ['editorial', 'classificado', 'coluna', 'última hora', 'nota pessoal'];

const STYLES = [
    { id: 'mural',   icon: '📋', label: 'Mural de Recortes' },
    { id: 'edicao',  icon: '🗞️', label: 'Edição do Dia'     },
    { id: 'caderno', icon: '🔖', label: 'Caderno do Repórter' },
    { id: 'mesa',    icon: '✂️', label: 'Mesa de Edição'     },
    { id: 'arquivo', icon: '🏛️', label: 'Arquivo do Jornal'  }
];

const CATEGORY_COLORS = {
    'editorial':    'var(--color-accent-olive)',
    'classificado': 'var(--color-accent-gold)',
    'coluna':       'var(--color-accent-sage)',
    'última hora':  '#8b0000',
    'nota pessoal': 'var(--color-border-brown)'
};

let currentStyle = 'mural';
let currentFilter = 'all';
let editingNoteId = null;

/* =========================================================================
   FORMATAÇÃO
   ========================================================================= */

function formatDateVintage(isoDate) {
    const d = new Date(isoDate);
    const months = [
        'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
        'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
    ];
    return `${d.getDate()} de ${months[d.getMonth()]} de ${d.getFullYear()}`;
}

function formatEditionNumber() {
    const notes = YourNotesData.loadNotes();
    return notes.length > 0 ? notes.length : 1;
}

function getNoteSize(content) {
    const len = (content || '').length;
    if (len < 50) return 'sm';
    if (len < 200) return 'md';
    return 'lg';
}

/* =========================================================================
   RENDERIZAÇÃO DE NOTA INDIVIDUAL (reutilizada por todos os estilos)
   ========================================================================= */

function renderNoteCard(note) {
    const size = getNoteSize(note.content);
    const catColor = CATEGORY_COLORS[note.category] || 'var(--color-accent-sage)';
    const dateLabel = formatDateVintage(note.createdAt);

    return `
    <article class="yn-note yn-note--${size}" data-id="${note.id}" data-category="${note.category}">
        <div class="yn-note__tape"></div>
        <header class="yn-note__header">
            <span class="yn-note__category" style="color:${catColor}">${note.category}</span>
            <h2 class="yn-note__title">${escapeHtml(note.title)}</h2>
        </header>
        <div class="yn-note__body">
            <p class="yn-note__content">${escapeHtml(note.content)}</p>
        </div>
        <footer class="yn-note__footer">
            <span class="yn-note__stamp">${dateLabel}</span>
            <div class="yn-note__actions">
                <button class="yn-btn-edit" data-id="${note.id}" title="editar nota" aria-label="editar nota">✏️</button>
                <button class="yn-btn-delete" data-id="${note.id}" title="excluir nota" aria-label="excluir nota">✕</button>
            </div>
        </footer>
    </article>`;
}

function escapeHtml(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

/* =========================================================================
   RENDERIZAÇÃO DO CONTAINER DE NOTAS
   ========================================================================= */

function renderNotes() {
    const container = document.getElementById('yn-notes-container');
    if (!container) return;

    let notes = YourNotesData.loadNotes();

    if (currentFilter !== 'all') {
        notes = notes.filter(n => n.category === currentFilter);
    }

    // Limpa classes de estilo anteriores
    container.className = 'yn-notes-container';
    container.classList.add(`yn-style--${currentStyle}`);

    if (notes.length === 0) {
        container.innerHTML = `
        <div class="yn-empty">
            <span class="yn-empty__icon">📰</span>
            <p class="yn-empty__text">nenhuma nota ainda. crie a primeira!</p>
        </div>`;
        updateCounter(0);
        return;
    }

    if (currentStyle === 'edicao') {
        container.innerHTML = renderEdicaoLayout(notes);
    } else {
        container.innerHTML = notes.map(renderNoteCard).join('');
    }

    updateCounter(notes.length);
}

/* Layout especial: Edição do Dia — simula colunas de jornal */
function renderEdicaoLayout(notes) {
    const today = formatDateVintage(new Date().toISOString());
    const edition = formatEditionNumber();
    const [headline, ...rest] = notes;

    return `
    <div class="yn-edicao">
        <div class="yn-edicao__header">
            <div class="yn-edicao__meta">edição nº ${edition} • ${today}</div>
        </div>
        <div class="yn-edicao__grid">
            <div class="yn-edicao__headline">
                ${renderNoteCard(headline)}
            </div>
            <div class="yn-edicao__sidebar">
                ${rest.map(renderNoteCard).join('')}
            </div>
        </div>
    </div>`;
}

/* =========================================================================
   MODAL DE CRIAÇÃO / EDIÇÃO
   ========================================================================= */

function openModal(noteId) {
    editingNoteId = noteId || null;
    const modal = document.getElementById('yn-modal');
    const form = document.getElementById('yn-form');
    const title = document.getElementById('yn-modal-title');

    form.reset();

    if (noteId) {
        const notes = YourNotesData.loadNotes();
        const note = notes.find(n => n.id === noteId);
        if (note) {
            title.textContent = 'editar nota';
            document.getElementById('yn-input-title').value = note.title;
            document.getElementById('yn-input-content').value = note.content;
            document.getElementById('yn-input-category').value = note.category;
        }
    } else {
        title.textContent = 'nova nota';
    }

    modal.classList.add('yn-modal--open');
    document.getElementById('yn-input-title').focus();
}

function closeModal() {
    const modal = document.getElementById('yn-modal');
    modal.classList.remove('yn-modal--open');
    editingNoteId = null;
}

/* =========================================================================
   EVENTOS
   ========================================================================= */

function setupEvents() {
    // Botão nova nota
    document.getElementById('yn-btn-new')?.addEventListener('click', () => openModal());

    // Fechar modal
    document.getElementById('yn-modal-close')?.addEventListener('click', closeModal);
    document.getElementById('yn-modal-cancel')?.addEventListener('click', closeModal);

    // Clicar fora do modal fecha
    document.getElementById('yn-modal')?.addEventListener('click', function (e) {
        if (e.target === this) closeModal();
    });

    // ESC fecha modal
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeModal();
    });

    // Submeter formulário
    document.getElementById('yn-form')?.addEventListener('submit', function (e) {
        e.preventDefault();
        const title = document.getElementById('yn-input-title').value.trim();
        const content = document.getElementById('yn-input-content').value.trim();
        const category = document.getElementById('yn-input-category').value;

        if (!title && !content) {
            const titleInput = document.getElementById('yn-input-title');
            titleInput.focus();
            titleInput.setCustomValidity('preencha ao menos o título ou o conteúdo');
            titleInput.reportValidity();
            titleInput.addEventListener('input', () => titleInput.setCustomValidity(''), { once: true });
            return;
        }

        if (editingNoteId) {
            YourNotesData.updateNote(editingNoteId, { title, content, category });
        } else {
            YourNotesData.createNote({ title, content, category });
        }

        closeModal();
        renderNotes();
    });

    // Delegação de eventos para editar / excluir notas
    document.getElementById('yn-notes-container')?.addEventListener('click', function (e) {
        const editBtn = e.target.closest('.yn-btn-edit');
        const deleteBtn = e.target.closest('.yn-btn-delete');

        if (editBtn) {
            const id = editBtn.dataset.id;
            openModal(id);
        }

        if (deleteBtn) {
            const id = deleteBtn.dataset.id;
            const card = deleteBtn.closest('.yn-note');
            if (card) {
                card.classList.add('yn-note--removing');
                setTimeout(() => {
                    YourNotesData.deleteNote(id);
                    renderNotes();
                }, 350);
            }
        }
    });

    // Filtros por categoria
    document.querySelectorAll('.yn-filter-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            document.querySelectorAll('.yn-filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentFilter = this.dataset.category;
            renderNotes();
        });
    });

    // Style picker
    document.querySelectorAll('.yn-style-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            const style = this.dataset.style;
            setActiveStyle(style);
        });
    });
}

/* =========================================================================
   TROCA DE ESTILO
   ========================================================================= */

function setActiveStyle(style) {
    currentStyle = style;
    YourNotesData.saveStyle(style);

    document.querySelectorAll('.yn-style-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.style === style);
        btn.setAttribute('aria-pressed', btn.dataset.style === style ? 'true' : 'false');
    });

    // Atualiza label do estilo ativo no header da toolbar
    const activeStyleDef = STYLES.find(s => s.id === style);
    const activeLabel = document.getElementById('yn-active-style-label');
    if (activeLabel && activeStyleDef) {
        activeLabel.textContent = activeStyleDef.label;
    }

    renderNotes();
}

/* =========================================================================
   CONTADOR
   ========================================================================= */

function updateCounter(count) {
    const el = document.getElementById('yn-counter');
    if (!el) return;
    const total = YourNotesData.loadNotes().length;
    if (total === 0) {
        el.textContent = 'mural vazio';
    } else if (count === total) {
        el.textContent = `${total} ${total === 1 ? 'recorte' : 'recortes'}`;
    } else {
        el.textContent = `${count} de ${total} ${total === 1 ? 'recorte' : 'recortes'}`;
    }
}

/* =========================================================================
   INICIALIZAÇÃO
   ========================================================================= */

function initYourNotes() {
    currentStyle = YourNotesData.loadStyle();

    // Ativa estilo salvo nos botões
    document.querySelectorAll('.yn-style-btn').forEach(btn => {
        const isActive = btn.dataset.style === currentStyle;
        btn.classList.toggle('active', isActive);
        btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });

    // Atualiza label do estilo ativo
    const activeStyleDef = STYLES.find(s => s.id === currentStyle);
    const activeLabel = document.getElementById('yn-active-style-label');
    if (activeLabel && activeStyleDef) {
        activeLabel.textContent = activeStyleDef.label;
    }

    setupEvents();
    setupHistoryToggle();
    renderNotes();
}

/* =========================================================================
   TOGGLE — Linha do Tempo Histórica
   ========================================================================= */

function setupHistoryToggle() {
    const btn = document.getElementById('yn-history-toggle');
    const panel = document.getElementById('yn-history-timeline');
    if (!btn || !panel) return;

    btn.addEventListener('click', function () {
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        const next = !isExpanded;
        this.setAttribute('aria-expanded', String(next));
        panel.hidden = !next;
        this.querySelector('.yn-history__toggle-text').textContent =
            next ? 'ocultar linha do tempo' : 'ver linha do tempo';
    });
}

window.initYourNotes = initYourNotes;
