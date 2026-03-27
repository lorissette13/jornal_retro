/**
 * yournotes.js — Mural de Recortes
 * CRUD de notas usando localStorage, renderização como post-its vintage
 */

(function () {
    'use strict';

    var STORAGE_KEY = 'yournotes_data';

    var CATEGORIES = [
        { id: 'editorial', label: 'editorial' },
        { id: 'classificado', label: 'classificado' },
        { id: 'coluna', label: 'coluna' },
        { id: 'ultima-hora', label: 'última hora' },
        { id: 'nota-pessoal', label: 'nota pessoal' }
    ];

    // ============================================================
    // Dados — localStorage
    // ============================================================

    function loadNotes() {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
        } catch (e) {
            return [];
        }
    }

    function saveNotes(notes) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    }

    function generateId() {
        return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
    }

    function createNote(title, content, category) {
        var now = new Date().toISOString();
        return {
            id: generateId(),
            title: title.trim(),
            content: content.trim(),
            category: category,
            createdAt: now,
            updatedAt: now
        };
    }

    function addNote(title, content, category) {
        var notes = loadNotes();
        notes.unshift(createNote(title, content, category));
        saveNotes(notes);
        return notes;
    }

    function updateNote(id, title, content, category) {
        var notes = loadNotes();
        notes = notes.map(function (n) {
            if (n.id === id) {
                return Object.assign({}, n, {
                    title: title.trim(),
                    content: content.trim(),
                    category: category,
                    updatedAt: new Date().toISOString()
                });
            }
            return n;
        });
        saveNotes(notes);
        return notes;
    }

    function deleteNote(id) {
        var notes = loadNotes().filter(function (n) { return n.id !== id; });
        saveNotes(notes);
        return notes;
    }

    // ============================================================
    // Formatação de data vintage
    // ============================================================

    var MONTHS = [
        'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
        'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
    ];

    function formatDate(isoDate) {
        var d = new Date(isoDate);
        return d.getDate() + ' de ' + MONTHS[d.getMonth()] + ' de ' + d.getFullYear();
    }

    function getCategoryLabel(id) {
        var cat = CATEGORIES.find(function (c) { return c.id === id; });
        return cat ? cat.label : id;
    }

    // ============================================================
    // Renderização
    // ============================================================

    function renderNotes(filter) {
        var board = document.getElementById('mural-board');
        var counter = document.getElementById('mural-counter');
        if (!board) return;

        var notes = loadNotes();
        var filtered = filter && filter !== 'all'
            ? notes.filter(function (n) { return n.category === filter; })
            : notes;

        // Atualiza contador
        if (counter) {
            var total = notes.length;
            counter.textContent = total === 0
                ? 'seu mural está vazio'
                : total === 1
                    ? 'seu mural contém 1 recorte'
                    : 'seu mural contém ' + total + ' recortes';
        }

        if (filtered.length === 0) {
            board.innerHTML = '<div class="mural-empty"><p>nenhum recorte aqui.</p><span>que tal criar uma nota?</span></div>';
            return;
        }

        board.innerHTML = filtered.map(function (note) {
            return '<article class="note-card" data-id="' + escapeAttr(note.id) + '" data-category="' + escapeAttr(note.category) + '">' +
                '<span class="note-category-stamp">' + escapeHtml(getCategoryLabel(note.category)) + '</span>' +
                '<h3 class="note-title">' + escapeHtml(note.title) + '</h3>' +
                '<p class="note-body">' + escapeHtml(note.content) + '</p>' +
                '<div class="note-date">' + formatDate(note.updatedAt) + '</div>' +
                '<div class="note-actions">' +
                    '<button class="note-btn note-btn-edit" data-id="' + escapeAttr(note.id) + '" aria-label="editar nota">editar</button>' +
                    '<button class="note-btn note-btn-delete" data-id="' + escapeAttr(note.id) + '" aria-label="excluir nota">excluir</button>' +
                '</div>' +
            '</article>';
        }).join('');

        // Delegar eventos nos cards
        board.querySelectorAll('.note-btn-edit').forEach(function (btn) {
            btn.addEventListener('click', function (e) {
                e.stopPropagation();
                openEditModal(btn.getAttribute('data-id'));
            });
        });

        board.querySelectorAll('.note-btn-delete').forEach(function (btn) {
            btn.addEventListener('click', function (e) {
                e.stopPropagation();
                confirmDelete(btn.getAttribute('data-id'));
            });
        });
    }

    // ============================================================
    // Escape helpers
    // ============================================================

    function escapeHtml(str) {
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function escapeAttr(str) {
        return String(str).replace(/"/g, '&quot;').replace(/'/g, '&#39;');
    }

    // ============================================================
    // Modal de criação/edição
    // ============================================================

    var currentFilter = 'all';
    var editingId = null;

    function buildCategoryOptions(selectedId) {
        return CATEGORIES.map(function (c) {
            var sel = c.id === selectedId ? ' selected' : '';
            return '<option value="' + c.id + '"' + sel + '>' + c.label + '</option>';
        }).join('');
    }

    function openCreateModal() {
        editingId = null;
        var modal = document.getElementById('yn-modal');
        var title = document.getElementById('yn-modal-title');
        var form = document.getElementById('yn-form');
        if (!modal || !form) return;

        title.textContent = 'nova nota';
        document.getElementById('yn-note-title').value = '';
        document.getElementById('yn-note-content').value = '';
        document.getElementById('yn-note-category').value = CATEGORIES[0].id;
        modal.classList.add('open');
        document.getElementById('yn-note-title').focus();
    }

    function openEditModal(id) {
        var notes = loadNotes();
        var note = notes.find(function (n) { return n.id === id; });
        if (!note) return;

        editingId = id;
        var modal = document.getElementById('yn-modal');
        var title = document.getElementById('yn-modal-title');
        if (!modal) return;

        title.textContent = 'editar nota';
        document.getElementById('yn-note-title').value = note.title;
        document.getElementById('yn-note-content').value = note.content;
        document.getElementById('yn-note-category').value = note.category;
        modal.classList.add('open');
        document.getElementById('yn-note-title').focus();
    }

    function closeModal() {
        var modal = document.getElementById('yn-modal');
        if (modal) modal.classList.remove('open');
        editingId = null;
    }

    function confirmDelete(id) {
        if (window.confirm('excluir esta nota permanentemente?')) {
            deleteNote(id);
            renderNotes(currentFilter);
        }
    }

    // ============================================================
    // Filtros
    // ============================================================

    function initFilters() {
        var filterBtns = document.querySelectorAll('.yn-filter-btn');
        filterBtns.forEach(function (btn) {
            btn.addEventListener('click', function () {
                filterBtns.forEach(function (b) { b.classList.remove('active'); });
                btn.classList.add('active');
                currentFilter = btn.getAttribute('data-filter');
                renderNotes(currentFilter);
            });
        });
    }

    // ============================================================
    // Init
    // ============================================================

    function init() {
        // Botão criar nota
        var btnNew = document.getElementById('btn-new-note');
        if (btnNew) {
            btnNew.addEventListener('click', openCreateModal);
        }

        // Fechar modal
        var btnClose = document.getElementById('yn-modal-close');
        var btnCancel = document.getElementById('yn-btn-cancel');
        var overlay = document.getElementById('yn-modal');
        if (btnClose) btnClose.addEventListener('click', closeModal);
        if (btnCancel) btnCancel.addEventListener('click', closeModal);
        if (overlay) {
            overlay.addEventListener('click', function (e) {
                if (e.target === overlay) closeModal();
            });
        }

        // Fechar com Escape
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') closeModal();
        });

        // Salvar nota
        var form = document.getElementById('yn-form');
        if (form) {
            form.addEventListener('submit', function (e) {
                e.preventDefault();
                var titleVal = document.getElementById('yn-note-title').value.trim();
                var contentVal = document.getElementById('yn-note-content').value.trim();
                var categoryVal = document.getElementById('yn-note-category').value;

                if (!titleVal) {
                    document.getElementById('yn-note-title').focus();
                    return;
                }

                if (editingId) {
                    updateNote(editingId, titleVal, contentVal, categoryVal);
                } else {
                    addNote(titleVal, contentVal, categoryVal);
                }

                closeModal();
                renderNotes(currentFilter);
            });
        }

        // Filtros
        initFilters();

        // Renderiza notas iniciais
        renderNotes(currentFilter);
    }

    document.addEventListener('DOMContentLoaded', init);

})();
