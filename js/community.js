/* ========================================
   DevRoadmaps — Community Features
   ======================================== */

// === Community Tips ===
function initCommunityTips(nodeId, roadmapSlug) {
    const key = `tips-${roadmapSlug}`;
    const tips = JSON.parse(localStorage.getItem(key) || '{}');

    function getTips() { return tips[nodeId] || []; }
    function saveTips() { localStorage.setItem(key, JSON.stringify(tips)); }

    return {
        getTips,
        addTip(text) {
            const tip = { text, date: new Date().toISOString(), id: Date.now() };
            if (!tips[nodeId]) tips[nodeId] = [];
            tips[nodeId].push(tip);
            saveTips();
            return tip;
        },
        deleteTip(tipId) {
            if (!tips[nodeId]) return;
            tips[nodeId] = tips[nodeId].filter(t => t.id !== tipId);
            saveTips();
        },
        exportAll() {
            return tips;
        },
        importAll(data) {
            localStorage.setItem(key, JSON.stringify(data));
        }
    };
}

// === Resource Ratings ===
function initRatings(roadmapSlug) {
    const key = `ratings-${roadmapSlug}`;
    const ratings = JSON.parse(localStorage.getItem(key) || '{}');

    function save() { localStorage.setItem(key, JSON.stringify(ratings)); }

    return {
        getRating(nodeId, resourceIdx) {
            const nodeKey = `${nodeId}-${resourceIdx}`;
            return ratings[nodeKey] || 0;
        },
        setRating(nodeId, resourceIdx, stars) {
            const nodeKey = `${nodeId}-${resourceIdx}`;
            ratings[nodeKey] = stars;
            save();
        },
        getAverage(nodeId) {
            let sum = 0, count = 0;
            Object.keys(ratings).forEach(k => {
                if (k.startsWith(nodeId + '-')) { sum += ratings[k]; count++; }
            });
            return count > 0 ? (sum / count).toFixed(1) : null;
        },
        exportAll() { return ratings; }
    };
}

// === Learner Counter (motivational) ===
function getLearnerCount(roadmapSlug) {
    const key = `learner-count-${roadmapSlug}`;
    const stored = parseInt(localStorage.getItem(key) || '0');
    return stored;
}

function generateLearnerCount(roadmapSlug, percentComplete) {
    const key = `learner-count-${roadmapSlug}`;
    // Generate a plausible motivational number based on completion
    const base = Math.floor(percentComplete * 47 + Math.random() * 20);
    const count = Math.max(base, 1);
    localStorage.setItem(key, count.toString());
    return count;
}

// === Resource Type Filter ===
const RESOURCE_TYPES = [
    { id: 'all', label: 'All Types', icon: '📋' },
    { id: 'docs', label: 'Docs', icon: '📖' },
    { id: 'video', label: 'Video', icon: '🎥' },
    { id: 'course', label: 'Course', icon: '🎯' },
    { id: 'tutorial', label: 'Tutorial', icon: '🛠️' },
    { id: 'tool', label: 'Tool', icon: '🔧' }
];

function filterResources(resources, type) {
    if (type === 'all') return resources;
    return resources.filter(r => r.type === type);
}

// === Theme: Auto mode ===
function initAutoTheme() {
    const saved = localStorage.getItem('devroadmaps-theme');
    if (saved === 'auto' || !saved) {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');

        // Listen for system changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            const current = localStorage.getItem('devroadmaps-theme');
            if (current === 'auto' || !current) {
                document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
                updateThemeIcon();
            }
        });
    }
}

// === Enhanced Print ===
function printBooklet() {
    window.print();
}

function printChecklist(nodes, completed) {
    const w = window.open('', '_blank');
    let html = `<html><head><title>DevRoadmaps Checklist</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 40px auto; padding: 20px; }
        h1 { color: #333; } .item { padding: 8px 0; border-bottom: 1px solid #eee; display: flex; align-items: center; gap: 10px; }
        .item.done { text-decoration: line-through; color: #999; }
        .checkbox { width: 20px; height: 20px; border: 2px solid #333; display: inline-flex; align-items: center; justify-content: center; }
        .item.done .checkbox::after { content: '✓'; font-weight: bold; color: green; }
        .progress { margin: 20px 0; font-size: 18px; }
        @media print { body { margin: 20px; } }
    </style></head><body>`;
    const total = nodes.length;
    const done = Object.keys(completed).filter(k => completed[k]).length;
    html += `<h1>DevRoadmaps Study Checklist</h1>`;
    html += `<p class="progress">Progress: ${done}/${total} (${Math.round(done/total*100)}%)</p>`;
    nodes.forEach(n => {
        const isDone = completed[n.id];
        html += `<div class="item ${isDone ? 'done' : ''}"><span class="checkbox"></span><span>${n.icon} ${n.title}</span></div>`;
    });
    html += `</body></html>`;
    w.document.write(html);
    w.document.close();
    w.print();
}

function printBookmarksSummary(bookmarks) {
    const w = window.open('', '_blank');
    let html = `<html><head><title>Bookmarks Summary</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 40px auto; padding: 20px; }
        h1 { color: #333; } .bookmark { padding: 12px; margin: 8px 0; border: 1px solid #ddd; border-radius: 8px; }
        .bookmark h3 { margin: 0 0 4px; } .bookmark p { margin: 0; color: #666; }
        @media print { body { margin: 20px; } }
    </style></head><body>`;
    html += `<h1>📌 DevRoadmaps Bookmarks</h1><p>${bookmarks.length} bookmarked topics</p>`;
    bookmarks.forEach(b => {
        html += `<div class="bookmark"><h3>${b.icon} ${b.title}</h3><p>Roadmap: ${b.roadmap}</p></div>`;
    });
    html += `</body></html>`;
    w.document.write(html);
    w.document.close();
    w.print();
}

// === Community Tips UI ===
function renderCommunityTipSection(nodeId, roadmapSlug) {
    const tips = initCommunityTips(nodeId, roadmapSlug);
    const nodeTips = tips.getTips();

    let html = `<div class="community-tips-section">
        <h4 class="tips-title">💬 Community Tips <span class="tips-count">(${nodeTips.length})</span></h4>`;

    nodeTips.forEach(tip => {
        html += `<div class="tip-item">
            <p>${escapeHtml(tip.text)}</p>
            <span class="tip-date">${new Date(tip.date).toLocaleDateString()}</span>
        </div>`;
    });

    html += `<div class="tip-form">
        <input type="text" class="tip-input" placeholder="Share a tip for this topic..." maxlength="500">
        <button class="btn btn-sm tip-submit">Add Tip</button>
    </div></div>`;

    return { html, init(container) {
        container.querySelector('.tip-submit').addEventListener('click', () => {
            const input = container.querySelector('.tip-input');
            const text = input.value.trim();
            if (!text) return;
            tips.addTip(text);
            input.value = '';
            // Re-render
            const parent = container.closest('.node-body');
            const tipsEl = parent.querySelector('.community-tips-section');
            const result = renderCommunityTipSection(nodeId, roadmapSlug);
            tipsEl.outerHTML = result.html;
            result.init(parent.querySelector('.community-tips-section'));
        });
    }};
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
