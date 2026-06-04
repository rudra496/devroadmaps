/* ========================================
   DevRoadmaps — Data Export & Import
   Backup and restore all user data
   ======================================== */

const EXPORT_KEYS = [
    'devroadmaps-bookmarks',
    'devroadmaps-study-time',
    'devroadmaps-streak',
    'devroadmaps-challenges',
    'devroadmaps-notes',
    'devroadmaps_certifications',
    'devroadmaps_forum',
    'color-theme'
];

function exportAllData() {
    const data = {
        version: '2.0',
        exportedAt: new Date().toISOString(),
        app: 'DevRoadmaps',
        data: {}
    };

    // Export general keys
    EXPORT_KEYS.forEach(key => {
        const val = localStorage.getItem(key);
        if (val) data.data[key] = val;
    });

    // Export all progress keys
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('progress-') || key.startsWith('tips-') || key.startsWith('ratings-')) {
            data.data[key] = localStorage.getItem(key);
        }
    }

    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `devroadmaps-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
}

function importAllData(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const data = JSON.parse(e.target.result);
            if (!data.data || data.app !== 'DevRoadmaps') {
                alert('Invalid backup file');
                return;
            }

            if (!confirm(`Import ${Object.keys(data.data).length} data items from backup dated ${new Date(data.exportedAt).toLocaleDateString()}? This will merge with your current data.`)) {
                return;
            }

            Object.entries(data.data).forEach(([key, value]) => {
                localStorage.setItem(key, value);
            });

            alert('Data imported successfully! Reloading page...');
            window.location.reload();
        } catch (err) {
            alert('Error reading backup file: ' + err.message);
        }
    };
    reader.readAsText(file);
}

function clearAllData() {
    if (!confirm('This will delete ALL your progress, bookmarks, notes, and settings. This cannot be undone. Continue?')) return;
    if (!confirm('Are you absolutely sure? All data will be permanently lost.')) return;

    const keysToRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('progress-') || key.startsWith('tips-') || key.startsWith('ratings-') || EXPORT_KEYS.includes(key)) {
            keysToRemove.push(key);
        }
    }

    keysToRemove.forEach(key => localStorage.removeItem(key));
    alert('All data cleared. Reloading...');
    window.location.reload();
}

function renderDataManagement(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // Calculate data usage
    let totalSize = 0;
    let itemCount = 0;
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('progress-') || key.startsWith('tips-') || key.startsWith('ratings-') || EXPORT_KEYS.includes(key)) {
            totalSize += (localStorage.getItem(key) || '').length;
            itemCount++;
        }
    }
    const sizeKB = (totalSize / 1024).toFixed(1);

    const slugs = ['frontend','backend','fullstack','ml-ai','devops','mobile','cybersecurity',
                   'data-engineer','blockchain','game-dev','embedded-iot','product-manager',
                   'devsecops','qa-engineer','technical-writer','low-code-no-code','cloud-architect',
                   'platform-engineer','sre','ar-vr'];
    let totalDone = 0;
    slugs.forEach(slug => {
        const progress = JSON.parse(localStorage.getItem(`progress-${slug}`) || '{}');
        totalDone += Object.values(progress).filter(v => v).length;
    });

    container.innerHTML = `
        <div class="data-management">
            <div class="data-stats">
                <div class="data-stat">
                    <span class="data-stat-value">${itemCount}</span>
                    <span class="data-stat-label">Data Items</span>
                </div>
                <div class="data-stat">
                    <span class="data-stat-value">${sizeKB} KB</span>
                    <span class="data-stat-label">Storage Used</span>
                </div>
                <div class="data-stat">
                    <span class="data-stat-value">${totalDone}</span>
                    <span class="data-stat-label">Topics Completed</span>
                </div>
            </div>
            <div class="data-actions">
                <button class="btn btn-primary" onclick="exportAllData()">📥 Export All Data</button>
                <label class="btn btn-secondary" style="cursor:pointer">
                    📤 Import Backup
                    <input type="file" accept=".json" onchange="importAllData(this.files[0])" style="display:none">
                </label>
                <button class="btn btn-sm" onclick="clearAllData()" style="color:#ff6b6b">🗑️ Clear All Data</button>
            </div>
        </div>
    `;
}
