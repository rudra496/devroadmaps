/* ========================================
   DevRoadmaps — Learning Paths
   ======================================== */

const LEARNING_PATHS = [
  {
    id: "fullstack-6months",
    title: "Full Stack Developer in 6 Months",
    icon: "🌐",
    description: "Combine frontend, backend, and devops skills to become a full stack developer.",
    nodes: [
      { roadmap: "frontend", ids: ["html-basics", "html-semantic", "css-basics", "css-flexbox", "css-grid", "javascript-basics", "javascript-dom", "javascript-es6", "react-basics", "react-hooks"] },
      { roadmap: "backend", ids: ["nodejs-basics", "expressjs", "rest-api", "databases", "sql-basics", "mongodb"] },
      { roadmap: "devops", ids: ["git-basics", "docker-basics", "docker-compose", "github-actions"] }
    ]
  },
  {
    id: "zero-to-ml",
    title: "Zero to ML Engineer",
    icon: "🧠",
    description: "From Python basics to deploying ML models in production.",
    nodes: [
      { roadmap: "frontend", ids: ["html-basics", "javascript-basics"] },
      { roadmap: "backend", ids: ["python-basics", "python-data", "rest-api"] },
      { roadmap: "ml-ai", ids: ["python-data", "ml-basics", "supervised-learning", "unsupervised-learning", "deep-learning", "nlp-basics", "ml-deployment"] }
    ]
  },
  {
    id: "devops-switch",
    title: "DevOps Career Switch",
    icon: "☁️",
    description: "Transition to DevOps from any background — focus on cloud, containers, and automation.",
    nodes: [
      { roadmap: "frontend", ids: ["html-basics", "javascript-basics"] },
      { roadmap: "backend", ids: ["python-basics", "linux-basics"] },
      { roadmap: "devops", ids: ["git-basics", "linux-basics", "docker-basics", "kubernetes-basics", "terraform", "aws-core", "ci-cd", "monitoring"] }
    ]
  }
];

function getBookmarks() {
  return JSON.parse(localStorage.getItem('devroadmaps-bookmarks') || '[]');
}

function addBookmark(nodeId, roadmapSlug) {
  const bookmarks = getBookmarks();
  const key = `${roadmapSlug}::${nodeId}`;
  if (!bookmarks.includes(key)) {
    bookmarks.push(key);
    localStorage.setItem('devroadmaps-bookmarks', JSON.stringify(bookmarks));
  }
  updateBookmarkCounters();
}

function removeBookmark(nodeId, roadmapSlug) {
  let bookmarks = getBookmarks();
  const key = `${roadmapSlug}::${nodeId}`;
  bookmarks = bookmarks.filter(b => b !== key);
  localStorage.setItem('devroadmaps-bookmarks', JSON.stringify(bookmarks));
  updateBookmarkCounters();
}

function isBookmarked(nodeId, roadmapSlug) {
  const key = `${roadmapSlug}::${nodeId}`;
  return getBookmarks().includes(key);
}

function toggleBookmark(nodeId, roadmapSlug) {
  if (isBookmarked(nodeId, roadmapSlug)) {
    removeBookmark(nodeId, roadmapSlug);
    return false;
  } else {
    addBookmark(nodeId, roadmapSlug);
    return true;
  }
}

function updateBookmarkCounters() {
  document.querySelectorAll('.bookmark-count').forEach(el => {
    el.textContent = getBookmarks().length;
  });
}

function exportBookmarks() {
  const bookmarks = getBookmarks();
  if (bookmarks.length === 0) {
    alert('No bookmarks to export!');
    return;
  }
  let text = "# DevRoadmaps Study Plan\n\n## Bookmarked Topics\n\n";
  bookmarks.forEach(b => {
    const [roadmap, nodeId] = b.split('::');
    text += `- [ ] **${roadmap}** / ${nodeId}\n`;
  });
  const blob = new Blob([text], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'devroadmaps-study-plan.md'; a.click();
  URL.revokeObjectURL(url);
}

async function initLearningPaths() {
  const container = document.getElementById('learningPathsGrid');
  if (!container) return;

  for (const path of LEARNING_PATHS) {
    let totalNodes = 0;
    let completedNodes = 0;
    const roadmapDataCache = {};

    for (const group of path.nodes) {
      totalNodes += group.ids.length;
      if (!roadmapDataCache[group.roadmap]) {
        try {
          const resp = await fetch(`roadmaps/${group.roadmap}.json`);
          roadmapDataCache[group.roadmap] = await resp.json();
        } catch (e) { continue; }
      }
      const progress = JSON.parse(localStorage.getItem(`progress-${group.roadmap}`) || '{}');
      group.ids.forEach(id => { if (progress[id]) completedNodes++; });
    }

    const pct = totalNodes > 0 ? Math.round(completedNodes / totalNodes * 100) : 0;

    const card = document.createElement('div');
    card.className = 'roadmap-card learning-path-card';
    card.setAttribute('data-animate', '');
    card.innerHTML = `
      <span class="roadmap-card-icon">${path.icon}</span>
      <h3>${path.title}</h3>
      <p>${path.description}</p>
      <div class="roadmap-card-meta">
        <span>📚 ${totalNodes} topics</span>
        <span>📊 ${pct}% done</span>
      </div>
      <div class="progress-bar-container" style="margin-top:12px">
        <div class="progress-bar"><div class="progress-fill" style="width:${pct}%"></div></div>
        <span class="progress-text">${pct}%</span>
      </div>
    `;
    container.appendChild(card);
  }
}

// Bookmark panel
function initBookmarkPanel() {
  const toggle = document.getElementById('bookmarkToggle');
  const panel = document.getElementById('bookmarkPanel');
  if (!toggle || !panel) return;

  toggle.addEventListener('click', () => {
    panel.classList.toggle('open');
    renderBookmarkList();
  });

  document.addEventListener('click', (e) => {
    if (!panel.contains(e.target) && !toggle.contains(e.target)) {
      panel.classList.remove('open');
    }
  });
}

async function renderBookmarkList() {
  const list = document.getElementById('bookmarkList');
  if (!list) return;
  const bookmarks = getBookmarks();
  list.innerHTML = '';

  if (bookmarks.length === 0) {
    list.innerHTML = '<p style="text-align:center;color:var(--text-muted);padding:20px">No bookmarks yet. ⭐ nodes to save them!</p>';
    return;
  }

  for (const b of bookmarks) {
    const [slug, nodeId] = b.split('::');
    try {
      const resp = await fetch(`roadmaps/${slug}.json`);
      const data = await resp.json();
      const node = data.nodes.find(n => n.id === nodeId);
      if (!node) continue;
      const el = document.createElement('div');
      el.className = 'bookmark-item';
      el.innerHTML = `
        <div>
          <small style="color:var(--text-muted)">${data.icon} ${data.title}</small><br>
          <strong>${node.icon} ${node.title}</strong>
        </div>
        <a href="roadmap.html?roadmap=${slug}" class="btn btn-sm">Open →</a>
      `;
      list.appendChild(el);
    } catch (e) {}
  }
}
