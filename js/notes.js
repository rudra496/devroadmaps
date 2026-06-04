/* ========================================
   DevRoadmaps — Notes & Journal System
   Personal learning notes per roadmap
   ======================================== */

const NOTES_KEY = 'devroadmaps-notes';

function getNotes(roadmapSlug) {
    try {
        const all = JSON.parse(localStorage.getItem(NOTES_KEY) || '{}');
        return all[roadmapSlug] || [];
    } catch { return []; }
}

function saveNote(roadmapSlug, title, content, nodeId) {
    const all = JSON.parse(localStorage.getItem(NOTES_KEY) || '{}');
    if (!all[roadmapSlug]) all[roadmapSlug] = [];

    all[roadmapSlug].push({
        id: Date.now(),
        title,
        content,
        nodeId: nodeId || null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    });

    localStorage.setItem(NOTES_KEY, JSON.stringify(all));
    return all[roadmapSlug][all[roadmapSlug].length - 1];
}

function updateNote(roadmapSlug, noteId, title, content) {
    const all = JSON.parse(localStorage.getItem(NOTES_KEY) || '{}');
    if (!all[roadmapSlug]) return;

    const note = all[roadmapSlug].find(n => n.id === noteId);
    if (note) {
        note.title = title;
        note.content = content;
        note.updatedAt = new Date().toISOString();
        localStorage.setItem(NOTES_KEY, JSON.stringify(all));
    }
}

function deleteNote(roadmapSlug, noteId) {
    const all = JSON.parse(localStorage.getItem(NOTES_KEY) || '{}');
    if (!all[roadmapSlug]) return;

    all[roadmapSlug] = all[roadmapSlug].filter(n => n.id !== noteId);
    localStorage.setItem(NOTES_KEY, JSON.stringify(all));
}

function getAllNotes() {
    try {
        return JSON.parse(localStorage.getItem(NOTES_KEY) || '{}');
    } catch { return {}; }
}

function getNotesCount(roadmapSlug) {
    return getNotes(roadmapSlug).length;
}

function renderNotesPanel(roadmapSlug, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const notes = getNotes(roadmapSlug);

    if (notes.length === 0) {
        container.innerHTML = `
            <div class="notes-empty">
                <div class="notes-empty-icon">📝</div>
                <h4>No notes yet</h4>
                <p>Start taking notes for this roadmap!</p>
                <button class="btn btn-sm btn-primary" onclick="showNewNoteForm('${roadmapSlug}')">+ Add Note</button>
            </div>
        `;
        return;
    }

    let html = `
        <div class="notes-header">
            <h4>📝 My Notes (${notes.length})</h4>
            <button class="btn btn-sm btn-primary" onclick="showNewNoteForm('${roadmapSlug}')">+ Add</button>
        </div>
        <div id="new-note-form" style="display:none" class="note-form">
            <input type="text" id="note-title" placeholder="Note title..." maxlength="100">
            <textarea id="note-content" placeholder="Write your notes here..." rows="4"></textarea>
            <div class="note-form-actions">
                <button class="btn btn-sm btn-primary" onclick="submitNote('${roadmapSlug}')">Save</button>
                <button class="btn btn-sm" onclick="hideNoteForm()">Cancel</button>
            </div>
        </div>
        <div class="notes-list">
    `;

    notes.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)).forEach(note => {
        const date = new Date(note.updatedAt).toLocaleDateString();
        html += `
            <div class="note-card" data-note-id="${note.id}">
                <div class="note-card-header">
                    <strong>${escapeHtml(note.title)}</strong>
                    <span class="note-date">${date}</span>
                </div>
                <p class="note-card-content">${escapeHtml(note.content)}</p>
                <div class="note-card-actions">
                    <button class="btn btn-sm" onclick="editNote('${roadmapSlug}', ${note.id})">✏️ Edit</button>
                    <button class="btn btn-sm" onclick="confirmDeleteNote('${roadmapSlug}', ${note.id})">🗑️ Delete</button>
                </div>
            </div>
        `;
    });

    html += '</div>';
    container.innerHTML = html;
}

function showNewNoteForm(roadmapSlug) {
    const form = document.getElementById('new-note-form');
    if (form) form.style.display = 'block';
}

function hideNoteForm() {
    const form = document.getElementById('new-note-form');
    if (form) form.style.display = 'none';
}

function submitNote(roadmapSlug) {
    const title = document.getElementById('note-title').value.trim();
    const content = document.getElementById('note-content').value.trim();

    if (!title || !content) {
        alert('Please fill in both title and content');
        return;
    }

    saveNote(roadmapSlug, title, content);
    hideNoteForm();
    renderNotesPanel(roadmapSlug, 'notes-panel');
}

function editNote(roadmapSlug, noteId) {
    const notes = getNotes(roadmapSlug);
    const note = notes.find(n => n.id === noteId);
    if (!note) return;

    const newTitle = prompt('Edit title:', note.title);
    if (newTitle === null) return;

    const newContent = prompt('Edit content:', note.content);
    if (newContent === null) return;

    updateNote(roadmapSlug, noteId, newTitle, newContent);
    renderNotesPanel(roadmapSlug, 'notes-panel');
}

function confirmDeleteNote(roadmapSlug, noteId) {
    if (confirm('Delete this note?')) {
        deleteNote(roadmapSlug, noteId);
        renderNotesPanel(roadmapSlug, 'notes-panel');
    }
}
