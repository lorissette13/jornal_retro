/**
 * YourNotes — Gerenciamento de Dados (localStorage)
 * Responsável por CRUD de notas e persistência do estilo escolhido
 */

const YOURNOTES_KEY = 'yournotes_data';
const YOURNOTES_STYLE_KEY = 'yournotes_style';

/**
 * Gera um ID único usando crypto.randomUUID quando disponível,
 * com fallback para timestamp + random de alta entropia
 */
function generateId() {
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
        return crypto.randomUUID();
    }
    return Date.now().toString(36) + Array.from({ length: 3 }, () =>
        Math.random().toString(36).slice(2, 7)
    ).join('');
}

/**
 * Carrega todas as notas do localStorage
 * @returns {Array} Lista de notas
 */
function loadNotes() {
    try {
        const raw = localStorage.getItem(YOURNOTES_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch (e) {
        console.error('YourNotes: erro ao carregar notas', e);
        return [];
    }
}

/**
 * Salva array de notas no localStorage
 * @param {Array} notes
 */
function saveNotes(notes) {
    try {
        localStorage.setItem(YOURNOTES_KEY, JSON.stringify(notes));
    } catch (e) {
        console.error('YourNotes: erro ao salvar notas', e);
    }
}

/**
 * Cria uma nova nota e persiste
 * @param {Object} data - { title, content, category }
 * @returns {Object} Nota criada
 */
function createNote(data) {
    const notes = loadNotes();
    const now = new Date().toISOString();
    const note = {
        id: generateId(),
        title: data.title || 'sem título',
        content: data.content || '',
        category: data.category || 'nota pessoal',
        createdAt: now,
        updatedAt: now
    };
    notes.unshift(note);
    saveNotes(notes);
    return note;
}

/**
 * Atualiza uma nota existente
 * @param {string} id
 * @param {Object} data - { title, content, category }
 * @returns {Object|null} Nota atualizada ou null
 */
function updateNote(id, data) {
    const notes = loadNotes();
    const idx = notes.findIndex(n => n.id === id);
    if (idx === -1) return null;
    notes[idx] = {
        ...notes[idx],
        title: data.title ?? notes[idx].title,
        content: data.content ?? notes[idx].content,
        category: data.category ?? notes[idx].category,
        updatedAt: new Date().toISOString()
    };
    saveNotes(notes);
    return notes[idx];
}

/**
 * Exclui uma nota
 * @param {string} id
 * @returns {boolean} Sucesso
 */
function deleteNote(id) {
    const notes = loadNotes();
    const filtered = notes.filter(n => n.id !== id);
    if (filtered.length === notes.length) return false;
    saveNotes(filtered);
    return true;
}

/**
 * Carrega o estilo de visualização salvo
 * @returns {string} Estilo ativo
 */
function loadStyle() {
    return localStorage.getItem(YOURNOTES_STYLE_KEY) || 'mural';
}

/**
 * Salva o estilo de visualização
 * @param {string} style
 */
function saveStyle(style) {
    localStorage.setItem(YOURNOTES_STYLE_KEY, style);
}

// Expõe globalmente
window.YourNotesData = {
    loadNotes,
    saveNotes,
    createNote,
    updateNote,
    deleteNote,
    loadStyle,
    saveStyle
};
