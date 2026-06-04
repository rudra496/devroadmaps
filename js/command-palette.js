/* ========================================
   DevRoadmaps — Command Palette (Ctrl+K)
   Quick navigation and actions
   ======================================== */

const COMMANDS = [
    // Navigation - Pages
    { id: 'home', title: 'Go to Home', icon: '🏠', category: 'Navigation', action: () => window.location.href = 'index.html' },
    { id: 'roadmaps', title: 'Browse All Roadmaps', icon: '🗺️', category: 'Navigation', action: () => window.location.href = 'index.html#roadmaps' },
    { id: 'features', title: 'View Features', icon: '✨', category: 'Navigation', action: () => window.location.href = 'index.html#features' },
    { id: 'faq', title: 'Read FAQ', icon: '❓', category: 'Navigation', action: () => window.location.href = 'index.html#faq' },
    { id: 'community', title: 'Join Community', icon: '👥', category: 'Navigation', action: () => window.location.href = 'index.html#community' },
    { id: 'daily-challenge', title: 'Daily Challenge', icon: '🎯', category: 'Navigation', action: () => window.location.href = 'index.html#daily-challenge-section' },
    { id: 'skill-radar', title: 'Skill Radar', icon: '📊', category: 'Navigation', action: () => window.location.href = 'index.html#skill-radar-section' },
    { id: 'compare', title: 'Compare Roadmaps', icon: '⚖️', category: 'Navigation', action: () => window.location.href = 'index.html#compare-section' },
    { id: 'projects', title: 'Project Ideas', icon: '🔨', category: 'Navigation', action: () => window.location.href = 'index.html#projects-section' },
    { id: 'interview', title: 'Interview Prep', icon: '🎤', category: 'Navigation', action: () => window.location.href = 'index.html#interview-section' },
    { id: 'data-mgmt', title: 'Data Management', icon: '💾', category: 'Navigation', action: () => window.location.href = 'index.html#data-section' },

    // Roadmaps
    { id: 'frontend', title: 'Open Frontend Roadmap', icon: '🎨', category: 'Roadmaps', action: () => window.location.href = 'roadmap.html?roadmap=frontend' },
    { id: 'backend', title: 'Open Backend Roadmap', icon: '⚙️', category: 'Roadmaps', action: () => window.location.href = 'roadmap.html?roadmap=backend' },
    { id: 'fullstack', title: 'Open Full Stack Roadmap', icon: '🌐', category: 'Roadmaps', action: () => window.location.href = 'roadmap.html?roadmap=fullstack' },
    { id: 'ml-ai', title: 'Open ML/AI Roadmap', icon: '🧠', category: 'Roadmaps', action: () => window.location.href = 'roadmap.html?roadmap=ml-ai' },
    { id: 'devops', title: 'Open DevOps Roadmap', icon: '☁️', category: 'Roadmaps', action: () => window.location.href = 'roadmap.html?roadmap=devops' },
    { id: 'mobile', title: 'Open Mobile Roadmap', icon: '📱', category: 'Roadmaps', action: () => window.location.href = 'roadmap.html?roadmap=mobile' },
    { id: 'cybersecurity', title: 'Open Cybersecurity Roadmap', icon: '🔒', category: 'Roadmaps', action: () => window.location.href = 'roadmap.html?roadmap=cybersecurity' },
    { id: 'data-engineer', title: 'Open Data Engineer Roadmap', icon: '🗃️', category: 'Roadmaps', action: () => window.location.href = 'roadmap.html?roadmap=data-engineer' },
    { id: 'blockchain', title: 'Open Blockchain Roadmap', icon: '⛓️', category: 'Roadmaps', action: () => window.location.href = 'roadmap.html?roadmap=blockchain' },
    { id: 'game-dev', title: 'Open Game Dev Roadmap', icon: '🎮', category: 'Roadmaps', action: () => window.location.href = 'roadmap.html?roadmap=game-dev' },
    { id: 'embedded-iot', title: 'Open IoT Roadmap', icon: '🔌', category: 'Roadmaps', action: () => window.location.href = 'roadmap.html?roadmap=embedded-iot' },
    { id: 'product-manager', title: 'Open PM Roadmap', icon: '📋', category: 'Roadmaps', action: () => window.location.href = 'roadmap.html?roadmap=product-manager' },
    { id: 'devsecops', title: 'Open DevSecOps Roadmap', icon: '🛡️', category: 'Roadmaps', action: () => window.location.href = 'roadmap.html?roadmap=devsecops' },
    { id: 'qa-engineer', title: 'Open QA Roadmap', icon: '🧪', category: 'Roadmaps', action: () => window.location.href = 'roadmap.html?roadmap=qa-engineer' },
    { id: 'technical-writer', title: 'Open Technical Writer Roadmap', icon: '✍️', category: 'Roadmaps', action: () => window.location.href = 'roadmap.html?roadmap=technical-writer' },
    { id: 'low-code', title: 'Open Low-Code Roadmap', icon: '⚡', category: 'Roadmaps', action: () => window.location.href = 'roadmap.html?roadmap=low-code-no-code' },
    { id: 'cloud-architect', title: 'Open Cloud Architect Roadmap', icon: '🏗️', category: 'Roadmaps', action: () => window.location.href = 'roadmap.html?roadmap=cloud-architect' },
    { id: 'platform-engineer', title: 'Open Platform Engineer Roadmap', icon: '🔧', category: 'Roadmaps', action: () => window.location.href = 'roadmap.html?roadmap=platform-engineer' },
    { id: 'sre', title: 'Open SRE Roadmap', icon: '🛡️', category: 'Roadmaps', action: () => window.location.href = 'roadmap.html?roadmap=sre' },
    { id: 'ar-vr', title: 'Open AR/VR Roadmap', icon: '🥽', category: 'Roadmaps', action: () => window.location.href = 'roadmap.html?roadmap=ar-vr' },

    // Actions
    { id: 'theme', title: 'Toggle Dark/Light Theme', icon: '🌓', category: 'Actions', action: () => {
        const btn = document.getElementById('theme-toggle');
        if (btn) btn.click();
    }},
    { id: 'share-progress', title: 'Share My Progress', icon: '📸', category: 'Actions', action: () => {
        if (typeof shareOverallProgress === 'function') shareOverallProgress();
    }},
    { id: 'export-data', title: 'Export All My Data', icon: '📥', category: 'Actions', action: () => {
        if (typeof exportAllData === 'function') exportAllData();
    }},
    { id: 'github', title: 'View on GitHub', icon: '⭐', category: 'Actions', action: () => {
        window.open('https://github.com/rudra496/devroadmaps', '_blank');
    }},
    { id: 'print', title: 'Print Current Page', icon: '🖨️', category: 'Actions', action: () => window.print() },

    // Features
    { id: 'timer', title: 'Start Study Timer', icon: '⏱️', category: 'Features', action: () => {
        const params = new URLSearchParams(window.location.search);
        const roadmap = params.get('roadmap') || 'frontend';
        if (typeof toggleTimer === 'function') toggleTimer(roadmap);
    }},
    { id: 'bookmarks', title: 'View Bookmarks', icon: '📌', category: 'Features', action: () => {
        const panel = document.getElementById('bookmarkPanel');
        if (panel) panel.classList.toggle('open');
    }},
];

let paletteOpen = false;
let filteredCommands = [...COMMANDS];
let selectedIndex = 0;

function initCommandPalette() {
    // Create palette DOM
    const palette = document.createElement('div');
    palette.id = 'command-palette';
    palette.className = 'command-palette';
    palette.innerHTML = `
        <div class="palette-backdrop"></div>
        <div class="palette-container">
            <div class="palette-header">
                <span class="palette-icon">⌘</span>
                <input type="text" id="palette-search" class="palette-search" placeholder="Type a command or search..." autocomplete="off">
                <span class="palette-shortcut">ESC</span>
            </div>
            <div class="palette-results" id="palette-results"></div>
            <div class="palette-footer">
                <span>↑↓ Navigate</span>
                <span>↵ Select</span>
                <span>ESC Close</span>
            </div>
        </div>
    `;
    document.body.appendChild(palette);

    const searchInput = document.getElementById('palette-search');
    const resultsContainer = document.getElementById('palette-results');
    const backdrop = palette.querySelector('.palette-backdrop');

    // Filter commands
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        filteredCommands = COMMANDS.filter(cmd =>
            cmd.title.toLowerCase().includes(query) ||
            cmd.category.toLowerCase().includes(query) ||
            cmd.id.toLowerCase().includes(query)
        );
        selectedIndex = 0;
        renderPaletteResults();
    });

    // Keyboard navigation
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            selectedIndex = Math.min(selectedIndex + 1, filteredCommands.length - 1);
            renderPaletteResults();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            selectedIndex = Math.max(selectedIndex - 1, 0);
            renderPaletteResults();
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (filteredCommands[selectedIndex]) {
                executeCommand(filteredCommands[selectedIndex]);
            }
        }
    });

    // Close on backdrop click
    backdrop.addEventListener('click', closePalette);

    // Global keyboard shortcut (Ctrl+K or Cmd+K)
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            togglePalette();
        } else if (e.key === 'Escape' && paletteOpen) {
            closePalette();
        }
    });

    renderPaletteResults();
}

function renderPaletteResults() {
    const container = document.getElementById('palette-results');
    if (!container) return;

    if (filteredCommands.length === 0) {
        container.innerHTML = '<div class="palette-empty">No commands found</div>';
        return;
    }

    // Group by category
    const grouped = {};
    filteredCommands.forEach(cmd => {
        if (!grouped[cmd.category]) grouped[cmd.category] = [];
        grouped[cmd.category].push(cmd);
    });

    let html = '';
    let globalIdx = 0;
    for (const [category, cmds] of Object.entries(grouped)) {
        html += `<div class="palette-category">${category}</div>`;
        cmds.forEach(cmd => {
            const isSelected = globalIdx === selectedIndex;
            html += `
                <div class="palette-item ${isSelected ? 'selected' : ''}" data-idx="${globalIdx}">
                    <span class="palette-item-icon">${cmd.icon}</span>
                    <span class="palette-item-title">${cmd.title}</span>
                </div>
            `;
            globalIdx++;
        });
    }
    container.innerHTML = html;

    // Click handlers
    container.querySelectorAll('.palette-item').forEach(item => {
        item.addEventListener('click', () => {
            const idx = parseInt(item.dataset.idx);
            if (filteredCommands[idx]) executeCommand(filteredCommands[idx]);
        });
    });

    // Scroll selected into view
    const selected = container.querySelector('.palette-item.selected');
    if (selected) selected.scrollIntoView({ block: 'nearest' });
}

function executeCommand(cmd) {
    closePalette();
    if (cmd.action) cmd.action();
}

function openPalette() {
    const palette = document.getElementById('command-palette');
    if (!palette) return;
    palette.classList.add('open');
    paletteOpen = true;
    document.getElementById('palette-search').focus();
    document.body.style.overflow = 'hidden';
}

function closePalette() {
    const palette = document.getElementById('command-palette');
    if (!palette) return;
    palette.classList.remove('open');
    paletteOpen = false;
    document.body.style.overflow = '';
    document.getElementById('palette-search').value = '';
    filteredCommands = [...COMMANDS];
    selectedIndex = 0;
    renderPaletteResults();
}

function togglePalette() {
    if (paletteOpen) closePalette();
    else openPalette();
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', initCommandPalette);
