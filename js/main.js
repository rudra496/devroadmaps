/* ========================================
   DevRoadmaps — Main JavaScript
   ======================================== */

const ROADMAPS = [
    { id: "frontend", slug: "frontend", icon: "🎨", title: "Frontend Developer" },
    { id: "backend", slug: "backend", icon: "⚙️", title: "Backend Developer" },
    { id: "fullstack", slug: "fullstack", icon: "🌐", title: "Full Stack Developer" },
    { id: "ml-ai", slug: "ml-ai", icon: "🧠", title: "ML / AI Engineer" },
    { id: "devops", slug: "devops", icon: "☁️", title: "DevOps / Cloud Engineer" },
    { id: "mobile", slug: "mobile", icon: "📱", title: "Mobile Developer" },
    { id: "cybersecurity", slug: "cybersecurity", icon: "🔒", title: "Cybersecurity" },
    { id: "data-engineer", slug: "data-engineer", icon: "🗃️", title: "Data Engineer" },
    { id: "blockchain", slug: "blockchain", icon: "⛓️", title: "Blockchain / Web3" },
    { id: "game-dev", slug: "game-dev", icon: "🎮", title: "Game Developer" },
    { id: "embedded-iot", slug: "embedded-iot", icon: "🔌", title: "Embedded / IoT" },
    { id: "product-manager", slug: "product-manager", icon: "📋", title: "Product Manager" },
];

// === Particle System ===
function initParticles() {
    const canvas = document.getElementById('particles');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [];
    let w, h;

    function resize() {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < 60; i++) {
        particles.push({
            x: Math.random() * w, y: Math.random() * h,
            vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
            r: Math.random() * 2 + 0.5,
        });
    }

    function draw() {
        ctx.clearRect(0, 0, w, h);
        const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
        const color = isDark ? '124,92,252' : '124,92,252';

        particles.forEach(p => {
            p.x += p.vx; p.y += p.vy;
            if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
            if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${color},0.3)`;
            ctx.fill();
        });

        // Draw connections
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 150) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(${color},${0.08 * (1 - dist / 150)})`;
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(draw);
    }
    draw();
}

// === Theme Toggle ===
function initTheme() {
    const toggle = document.getElementById('themeToggle');
    if (!toggle) return;
    const saved = localStorage.getItem('devroadmaps-theme');
    if (saved) document.documentElement.setAttribute('data-theme', saved);
    updateThemeIcon();

    toggle.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('devroadmaps-theme', next);
        updateThemeIcon();
    });

    function updateThemeIcon() {
        const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
        if (toggle) toggle.textContent = isDark ? '☀️' : '🌙';
    }
}

// === Hamburger Menu ===
function initHamburger() {
    const btn = document.getElementById('hamburger');
    const links = document.getElementById('navLinks');
    if (!btn || !links) return;
    btn.addEventListener('click', () => links.classList.toggle('open'));
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));
}

// === Back to Top ===
function initBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;
    window.addEventListener('scroll', () => {
        btn.classList.toggle('visible', window.scrollY > 400);
    });
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// === Scroll Animations ===
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }});
    }, { threshold: 0.1 });
    document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));
}

// === Animated Counters ===
function initCounters() {
    const counters = document.querySelectorAll('.stat-number[data-target]');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                animateCounter(e.target);
                observer.unobserve(e.target);
            }
        });
    }, { threshold: 0.5 });
    counters.forEach(c => observer.observe(c));
}

function animateCounter(el) {
    const target = parseInt(el.dataset.target);
    const duration = 2000;
    const start = performance.now();
    function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(target * eased);
        if (progress < 1) requestAnimationFrame(update);
        else el.textContent = target;
    }
    requestAnimationFrame(update);
}

// === FAQ Accordion ===
function initFAQ() {
    document.querySelectorAll('.faq-question').forEach(btn => {
        btn.addEventListener('click', () => {
            const item = btn.parentElement;
            const wasActive = item.classList.contains('active');
            document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
            if (!wasActive) item.classList.add('active');
        });
    });
}

// === Landing Page: Roadmaps Grid ===
async function initLandingRoadmaps() {
    const grid = document.getElementById('roadmapsGrid');
    if (!grid) return;

    for (const rm of ROADMAPS) {
        let nodeCount = 0;
        let resourceCount = 0;
        try {
            const resp = await fetch(`roadmaps/${rm.slug}.json`);
            const data = await resp.json();
            nodeCount = data.nodes.length;
            resourceCount = data.nodes.reduce((sum, n) => sum + n.resources.length, 0);
        } catch (e) {}

        const card = document.createElement('a');
        card.href = `roadmap.html?roadmap=${rm.slug}`;
        card.className = 'roadmap-card';
        card.setAttribute('data-animate', '');
        card.innerHTML = `
            <span class="roadmap-card-icon">${rm.icon}</span>
            <h3>${rm.title}</h3>
            <p>${nodeCount} topics • ${resourceCount} free resources</p>
            <div class="roadmap-card-meta">
                <span>📖 Free</span>
                <span>📊 ${nodeCount} nodes</span>
            </div>
        `;
        grid.appendChild(card);
    }
    initScrollAnimations();
}

// === Roadmap Viewer ===
async function initRoadmapViewer() {
    const params = new URLSearchParams(window.location.search);
    const slug = params.get('roadmap');
    if (!slug) { window.location.href = 'index.html'; return; }

    let data;
    try {
        const resp = await fetch(`roadmaps/${slug}.json`);
        data = await resp.json();
    } catch (e) { window.location.href = 'index.html'; return; }

    document.title = `${data.title} — DevRoadmaps`;
    document.getElementById('roadmapIcon').textContent = data.icon || '';
    document.getElementById('roadmapTitle').textContent = data.title;
    document.getElementById('roadmapDesc').textContent = data.description || '';

    const progressKey = `progress-${slug}`;
    let completed = JSON.parse(localStorage.getItem(progressKey) || '{}');

    function saveProgress() {
        localStorage.setItem(progressKey, JSON.stringify(completed));
        updateProgress();
    }

    function updateProgress() {
        const total = data.nodes.length;
        const done = Object.keys(completed).filter(k => completed[k]).length;
        const pct = total > 0 ? Math.round(done / total * 100) : 0;
        document.getElementById('progressFill').style.width = pct + '%';
        document.getElementById('progressText').textContent = pct + '%';
    }

    function renderNodes(nodes) {
        const container = document.getElementById('roadmapNodes');
        container.innerHTML = '';

        nodes.forEach((node, idx) => {
            // Connector
            if (idx > 0) {
                const conn = document.createElement('div');
                conn.className = 'node-connector';
                container.appendChild(conn);
            }

            const el = document.createElement('div');
            el.className = 'node' + (completed[node.id] ? ' completed' : '');
            el.dataset.category = node.category;
            el.dataset.id = node.id;

            const badgeClass = `badge-${node.category}`;
            const diff = node.difficulty || 'Beginner';

            let resourcesHtml = '';
            const typeIcons = { docs: '📖', video: '🎥', course: '🎯', tool: '🔧' };
            node.resources.forEach(res => {
                const icon = typeIcons[res.type] || '📖';
                resourcesHtml += `<a href="${res.url}" target="_blank" rel="noopener" class="resource-link">
                    <span>${icon}</span>
                    <span>${res.title}</span>
                    <span class="resource-type">${res.type}</span>
                </a>`;
            });

            el.innerHTML = `
                <div class="node-header">
                    <span class="node-icon">${node.icon}</span>
                    <span class="node-title">${node.title}</span>
                    <span class="node-badge ${badgeClass}">${node.category}</span>
                    <span class="node-expand-icon">▶</span>
                </div>
                <div class="node-body">
                    <div class="node-content">
                        <p class="node-desc">${node.description}</p>
                        <div class="node-resources">${resourcesHtml}</div>
                        <button class="btn btn-sm mark-complete" style="margin-top:12px">
                            ${completed[node.id] ? '✅ Completed' : '☐ Mark Complete'}
                        </button>
                    </div>
                </div>
            `;

            // Expand on header click
            el.querySelector('.node-header').addEventListener('click', (e) => {
                if (e.target.closest('.mark-complete')) return;
                el.classList.toggle('expanded');
            });

            // Mark complete
            el.querySelector('.mark-complete').addEventListener('click', () => {
                completed[node.id] = !completed[node.id];
                el.classList.toggle('completed', completed[node.id]);
                el.querySelector('.mark-complete').textContent = completed[node.id] ? '✅ Completed' : '☐ Mark Complete';
                saveProgress();
                updateMinimap();
            });

            container.appendChild(el);
        });

        updateProgress();
    }

    // Minimap
    function renderMinimap(nodes) {
        const container = document.getElementById('minimapContent');
        container.innerHTML = '<div class="minimap-title">Topics</div>';
        nodes.forEach(node => {
            const el = document.createElement('div');
            el.className = 'minimap-node' + (completed[node.id] ? ' completed' : '');
            el.textContent = `${node.icon} ${node.title}`;
            el.addEventListener('click', () => {
                document.querySelector(`.node[data-id="${node.id}"]`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            });
            container.appendChild(el);
        });
    }

    function updateMinimap() {
        document.querySelectorAll('.minimap-node').forEach((el, i) => {
            if (data.nodes[i]) {
                el.classList.toggle('completed', !!completed[data.nodes[i].id]);
            }
        });
    }

    // Active minimap node on scroll
    function initMinimapScroll() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    document.querySelectorAll('.minimap-node').forEach(n => n.classList.remove('active'));
                    const idx = data.nodes.findIndex(n => n.id === e.target.dataset.id);
                    if (idx >= 0 && document.querySelectorAll('.minimap-node')[idx + 1]) {
                        document.querySelectorAll('.minimap-node')[idx + 1].classList.add('active');
                    }
                }
            });
        }, { threshold: 0.5 });
        document.querySelectorAll('.node').forEach(n => observer.observe(n));
    }

    renderNodes(data.nodes);
    renderMinimap(data.nodes);
    setTimeout(initMinimapScroll, 100);

    // Search
    document.getElementById('searchInput').addEventListener('input', (e) => {
        const q = e.target.value.toLowerCase();
        const filtered = data.nodes.filter(n =>
            n.title.toLowerCase().includes(q) || n.description.toLowerCase().includes(q)
        );
        renderNodes(filtered);
        renderMinimap(filtered);
    });

    // Filter
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.dataset.filter;
            const filtered = filter === 'all' ? data.nodes : data.nodes.filter(n => n.category === filter);
            renderNodes(filtered);
            renderMinimap(filtered);
        });
    });

    // Reset
    document.getElementById('resetBtn').addEventListener('click', () => {
        if (confirm('Reset all progress for this roadmap?')) {
            completed = {};
            saveProgress();
            renderNodes(data.nodes);
            renderMinimap(data.nodes);
        }
    });

    // Print
    document.getElementById('printBtn').addEventListener('click', () => {
        document.querySelectorAll('.node').forEach(n => n.classList.add('expanded'));
        setTimeout(() => window.print(), 300);
    });

    // Expand All
    let allExpanded = false;
    document.getElementById('expandAllBtn').addEventListener('click', () => {
        allExpanded = !allExpanded;
        document.querySelectorAll('.node').forEach(n => n.classList.toggle('expanded', allExpanded));
        document.getElementById('expandAllBtn').textContent = allExpanded ? 'Collapse All' : 'Expand All';
    });

    // Keyboard navigation
    let currentIdx = -1;
    document.addEventListener('keydown', (e) => {
        const nodes = document.querySelectorAll('.node');
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            currentIdx = Math.min(currentIdx + 1, nodes.length - 1);
            nodes[currentIdx]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            currentIdx = Math.max(currentIdx - 1, 0);
            nodes[currentIdx]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else if (e.key === 'Enter' && currentIdx >= 0) {
            nodes[currentIdx]?.classList.toggle('expanded');
        } else if (e.key === ' ' && currentIdx >= 0) {
            e.preventDefault();
            const btn = nodes[currentIdx]?.querySelector('.mark-complete');
            if (btn) btn.click();
        }
    });
}

// === Init ===
document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initTheme();
    initHamburger();
    initBackToTop();
    initFAQ();

    const isRoadmapPage = document.querySelector('.roadmap-page');
    if (isRoadmapPage) {
        initRoadmapViewer();
    } else {
        initCounters();
        initLandingRoadmaps();
    }

    // Scroll animations (for non-roadmap elements)
    initScrollAnimations();
});
