// ===== DevRoadmaps — Main JS =====

const ROADMAPS = [
  {id:"frontend",title:"Frontend Developer",icon:"🎨",color:"#61dafb",desc:"Master the art of building user interfaces with modern web technologies",time:"6-12 months",nodes:52},
  {id:"backend",title:"Backend Developer",icon:"⚙️",color:"#68a063",desc:"Build robust servers, APIs, and database systems that power applications",time:"6-12 months",nodes:50},
  {id:"fullstack",title:"Full Stack Developer",icon:"🚀",color:"#f59e0b",desc:"Become a complete developer who can build entire applications from scratch",time:"12-18 months",nodes:60},
  {id:"ml-ai",title:"ML / AI Engineer",icon:"🤖",color:"#10b981",desc:"Build intelligent systems using machine learning and artificial intelligence",time:"8-14 months",nodes:50},
  {id:"devops",title:"DevOps / Cloud Engineer",icon:"☁️",color:"#3b82f6",desc:"Master infrastructure, deployment, and cloud computing at scale",time:"6-12 months",nodes:50},
  {id:"mobile",title:"Mobile Developer",icon:"📱",color:"#ec4899",desc:"Build native and cross-platform mobile apps for iOS and Android",time:"6-12 months",nodes:40},
  {id:"cybersecurity",title:"Cybersecurity Analyst",icon:"🔒",color:"#ef4444",desc:"Protect systems and networks from security threats and vulnerabilities",time:"8-14 months",nodes:40},
  {id:"data-engineer",title:"Data Engineer",icon:"📊",color:"#8b5cf6",desc:"Design and build data pipelines, warehouses, and streaming systems",time:"6-12 months",nodes:40},
  {id:"blockchain",title:"Blockchain / Web3 Developer",icon:"⛓️",color:"#6366f1",desc:"Build decentralized applications and smart contracts on blockchain",time:"6-12 months",nodes:35},
  {id:"game-dev",title:"Game Developer",icon:"🎮",color:"#f97316",desc:"Create interactive games from concept to publication and monetization",time:"8-14 months",nodes:35},
  {id:"embedded-iot",title:"Embedded / IoT Developer",icon:"🔌",color:"#14b8a6",desc:"Build firmware and IoT systems for microcontrollers and edge devices",time:"8-14 months",nodes:35},
  {id:"product-manager",title:"Product Manager (Tech)",icon:"📋",color:"#eab308",desc:"Lead product strategy, user research, and cross-functional teams",time:"4-8 months",nodes:30}
];

// ===== Theme Toggle =====
function initTheme() {
  const saved = localStorage.getItem('devroadmaps-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = saved || (prefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', theme);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('devroadmaps-theme', next);
}

// ===== Particle Background =====
function initParticles(canvas) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let particles = [];
  const count = window.innerWidth < 768 ? 30 : 60;

  function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      r: Math.random() * 2 + 1,
      alpha: Math.random() * 0.5 + 0.1
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p, i) => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(124, 58, 237, ${p.alpha})`;
      ctx.fill();

      for (let j = i + 1; j < particles.length; j++) {
        const dx = p.x - particles[j].x;
        const dy = p.y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(124, 58, 237, ${0.08 * (1 - dist / 120)})`;
          ctx.stroke();
        }
      }
    });
    requestAnimationFrame(draw);
  }
  draw();
}

// ===== Search =====
function initSearch() {
  const input = document.getElementById('search-input');
  const results = document.getElementById('search-results');
  if (!input || !results) return;

  let allNodes = [];
  ROADMAPS.forEach(rm => {
    allNodes.push({ type: 'roadmap', ...rm });
  });

  input.addEventListener('input', async () => {
    const q = input.value.toLowerCase().trim();
    if (q.length < 2) { results.classList.remove('active'); return; }

    const matches = allNodes.filter(n =>
      n.title.toLowerCase().includes(q) || n.desc.toLowerCase().includes(q)
    );

    if (matches.length === 0) {
      results.innerHTML = '<div style="padding:16px;text-align:center;color:var(--text-muted)">No results found</div>';
    } else {
      results.innerHTML = matches.slice(0, 8).map(m => `
        <a href="roadmap.html?path=${m.id}" class="search-result-item">
          <span class="emoji">${m.icon}</span>
          <div class="info">
            <div class="title">${m.title}</div>
            <div class="roadmap">${m.desc}</div>
          </div>
        </a>
      `).join('');
    }
    results.classList.add('active');
  });

  document.addEventListener('click', e => {
    if (!e.target.closest('.search-container')) results.classList.remove('active');
  });
}

// ===== FAQ =====
function initFAQ() {
  document.querySelectorAll('.faq-question').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.parentElement;
      const wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });
}

// ===== Scroll Animations =====
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1 });
  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

// ===== Roadmap Page =====
function getParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

async function loadRoadmap(path) {
  try {
    const res = await fetch(`roadmaps/${path}.json`);
    if (!res.ok) throw new Error('Not found');
    return await res.json();
  } catch {
    document.getElementById('roadmap-content').innerHTML = `
      <div style="text-align:center;padding:80px 24px">
        <h2>Roadmap not found</h2>
        <p style="color:var(--text-secondary);margin:12px 0 24px">The roadmap "${path}" doesn't exist yet.</p>
        <a href="index.html" class="btn btn-primary">← Back to Home</a>
      </div>`;
    return null;
  }
}

function getProgress(roadmapId) {
  const key = `devroadmaps-progress-${roadmapId}`;
  return JSON.parse(localStorage.getItem(key) || '{}');
}

function toggleNodeProgress(roadmapId, nodeId) {
  const progress = getProgress(roadmapId);
  progress[nodeId] = !progress[nodeId];
  localStorage.setItem(`devroadmaps-progress-${roadmapId}`, JSON.stringify(progress));
  return progress;
}

function renderRoadmap(data) {
  const progress = getProgress(data.id);
  const completedCount = Object.values(progress).filter(Boolean).length;
  const total = data.nodes.length;
  const pct = total ? Math.round((completedCount / total) * 100) : 0;

  // Header
  document.getElementById('roadmap-title').textContent = data.title;
  document.getElementById('roadmap-icon').textContent = data.icon;
  document.getElementById('roadmap-desc').textContent = data.description;
  document.getElementById('roadmap-time').textContent = '⏱ ' + data.time;
  document.getElementById('roadmap-difficulty').textContent = '📊 ' + data.difficulty;
  document.getElementById('roadmap-progress-text').textContent = `${completedCount}/${total} completed`;
  document.getElementById('roadmap-progress-fill').style.width = pct + '%';

  // Nodes
  const container = document.getElementById('roadmap-nodes');
  container.innerHTML = data.nodes.map((node, i) => {
    const isComplete = progress[node.id];
    const catClass = `cat-${node.category || 'default'}`;
    return `
      <div class="roadmap-node ${isComplete ? 'completed' : ''}" 
           style="--node-color:${data.color};animation-delay:${i * 0.04}s"
           data-node-id="${node.id}">
        <div class="node-dot">${isComplete ? '' : node.title.charAt(0)}</div>
        <div class="node-card">
          <div class="node-header" onclick="toggleNode(this.parentElement.parentElement)">
            <div class="node-title-area">
              <span class="node-emoji">${node.icon || '📌'}</span>
              <span class="node-title">${node.title}</span>
              <span class="node-category-badge ${catClass}">${node.category || 'general'}</span>
            </div>
            <span class="node-expand-icon">▼</span>
          </div>
          <div class="node-body">
            <div class="node-content">
              <p class="node-description">${node.description}</p>
              <div class="node-resources">
                <h4>📚 Resources</h4>
                <div class="resource-list">
                  ${(node.resources || []).map(r => `
                    <a href="${r.url}" target="_blank" rel="noopener" class="resource-item">
                      <span class="resource-type">${r.type}</span>
                      <span class="resource-title">${r.title}</span>
                      <span class="resource-arrow">↗</span>
                    </a>
                  `).join('')}
                </div>
              </div>
              <div class="node-actions">
                <button class="node-btn btn-complete" onclick="event.stopPropagation();markNode('${data.id}','${node.id}',this)">
                  ${isComplete ? '✓ Completed' : 'Mark Complete'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>`;
  }).join('');
}

function toggleNode(nodeEl) {
  const wasExpanded = nodeEl.classList.contains('expanded');
  // Collapse all others
  document.querySelectorAll('.roadmap-node.expanded').forEach(n => n.classList.remove('expanded'));
  if (!wasExpanded) nodeEl.classList.add('expanded');
}

function markNode(roadmapId, nodeId, btn) {
  const progress = toggleNodeProgress(roadmapId, nodeId);
  const nodeEl = btn.closest('.roadmap-node');
  const isComplete = progress[nodeId];

  nodeEl.classList.toggle('completed', isComplete);
  btn.textContent = isComplete ? '✓ Completed' : 'Mark Complete';

  // Update progress bar
  const total = nodeEl.parentElement.querySelectorAll('.roadmap-node').length;
  const completed = document.querySelectorAll('.roadmap-node.completed').length;
  const pct = Math.round((completed / total) * 100);
  document.getElementById('roadmap-progress-fill').style.width = pct + '%';
  document.getElementById('roadmap-progress-text').textContent = `${completed}/${total} completed`;
}

function printRoadmap() {
  // Expand all nodes for printing
  document.querySelectorAll('.roadmap-node').forEach(n => n.classList.add('expanded'));
  setTimeout(() => window.print(), 300);
}

function resetProgress() {
  if (!confirm('Reset all progress for this roadmap?')) return;
  const path = getParam('path');
  localStorage.removeItem(`devroadmaps-progress-${path}`);
  location.reload();
}

// ===== Init =====
document.addEventListener('DOMContentLoaded', () => {
  initTheme();

  const themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) themeBtn.addEventListener('click', toggleTheme);

  const canvas = document.getElementById('hero-canvas');
  if (canvas) initParticles(canvas);

  initSearch();
  initFAQ();
  initScrollAnimations();

  // Render roadmap cards on index page
  const grid = document.getElementById('roadmaps-grid');
  if (grid) {
    grid.innerHTML = ROADMAPS.map(r => `
      <a href="roadmap.html?path=${r.id}" class="roadmap-card fade-in" style="--card-color:${r.color}">
        <div class="card-icon">${r.icon}</div>
        <h3>${r.title}</h3>
        <p class="card-desc">${r.desc}</p>
        <div class="card-meta">
          <span class="card-tag">⏱ ${r.time}</span>
          <span class="card-tag">📌 ${r.nodes} nodes</span>
        </div>
      </a>
    `).join('');
    // Trigger scroll anim
    setTimeout(initScrollAnimations, 100);
  }

  // Load roadmap page
  const path = getParam('path');
  if (path) {
    loadRoadmap(path).then(data => { if (data) renderRoadmap(data); });
  }
});
