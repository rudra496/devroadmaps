/* ========================================
   DevRoadmaps — Roadmap Comparison Tool
   Compare two roadmaps side by side
   ======================================== */

function renderComparisonTool(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const roadmapOptions = [
        { id: 'frontend', title: 'Frontend Developer', icon: '🎨' },
        { id: 'backend', title: 'Backend Developer', icon: '⚙️' },
        { id: 'fullstack', title: 'Full Stack Developer', icon: '🌐' },
        { id: 'ml-ai', title: 'ML / AI Engineer', icon: '🧠' },
        { id: 'devops', title: 'DevOps / Cloud Engineer', icon: '☁️' },
        { id: 'mobile', title: 'Mobile Developer', icon: '📱' },
        { id: 'cybersecurity', title: 'Cybersecurity', icon: '🔒' },
        { id: 'data-engineer', title: 'Data Engineer', icon: '🗃️' },
        { id: 'blockchain', title: 'Blockchain / Web3', icon: '⛓️' },
        { id: 'game-dev', title: 'Game Developer', icon: '🎮' },
        { id: 'embedded-iot', title: 'Embedded / IoT', icon: '🔌' },
        { id: 'product-manager', title: 'Product Manager', icon: '📋' },
        { id: 'devsecops', title: 'DevSecOps Engineer', icon: '🛡️' },
        { id: 'qa-engineer', title: 'QA / Test Engineer', icon: '🧪' },
        { id: 'technical-writer', title: 'Technical Writer', icon: '✍️' },
        { id: 'low-code-no-code', title: 'Low-Code / No-Code', icon: '⚡' },
        { id: 'cloud-architect', title: 'Cloud Architect', icon: '🏗️' },
    ];

    let optionsHtml = roadmapOptions.map(r =>
        `<option value="${r.id}">${r.icon} ${r.title}</option>`
    ).join('');

    container.innerHTML = `
        <div class="comparison-tool">
            <div class="comparison-selectors">
                <div class="comparison-select">
                    <label>Roadmap A</label>
                    <select id="compare-a">${optionsHtml}</select>
                </div>
                <div class="comparison-vs">VS</div>
                <div class="comparison-select">
                    <label>Roadmap B</label>
                    <select id="compare-b">
                        <option value="backend">⚙️ Backend Developer</option>
                        ${optionsHtml}
                    </select>
                </div>
                <button class="btn btn-primary" onclick="compareRoadmaps()">Compare</button>
            </div>
            <div id="comparison-results"></div>
        </div>
    `;

    document.getElementById('compare-b').value = 'backend';
}

async function compareRoadmaps() {
    const slugA = document.getElementById('compare-a').value;
    const slugB = document.getElementById('compare-b').value;
    const results = document.getElementById('comparison-results');

    if (slugA === slugB) {
        results.innerHTML = '<p style="text-align:center;color:var(--text-muted);">Please select two different roadmaps to compare.</p>';
        return;
    }

    try {
        const [dataA, dataB] = await Promise.all([
            fetch(`roadmaps/${slugA}.json`).then(r => r.json()),
            fetch(`roadmaps/${slugB}.json`).then(r => r.json())
        ]);

        const statsA = {
            title: dataA.title,
            icon: dataA.icon,
            nodes: dataA.nodes.length,
            resources: dataA.nodes.reduce((s, n) => s + n.resources.length, 0),
            fundamentals: dataA.nodes.filter(n => n.category === 'fundamentals').length,
            intermediate: dataA.nodes.filter(n => n.category === 'intermediate').length,
            advanced: dataA.nodes.filter(n => n.category === 'advanced').length,
            tools: dataA.nodes.filter(n => n.category === 'tools').length,
        };

        const statsB = {
            title: dataB.title,
            icon: dataB.icon,
            nodes: dataB.nodes.length,
            resources: dataB.nodes.reduce((s, n) => s + n.resources.length, 0),
            fundamentals: dataB.nodes.filter(n => n.category === 'fundamentals').length,
            intermediate: dataB.nodes.filter(n => n.category === 'intermediate').length,
            advanced: dataB.nodes.filter(n => n.category === 'advanced').length,
            tools: dataB.nodes.filter(n => n.category === 'tools').length,
        };

        results.innerHTML = `
            <div class="comparison-table">
                <div class="comparison-row header">
                    <div class="comparison-cell">Metric</div>
                    <div class="comparison-cell">${statsA.icon} ${statsA.title}</div>
                    <div class="comparison-cell">${statsB.icon} ${statsB.title}</div>
                </div>
                ${comparisonRow('Total Topics', statsA.nodes, statsB.nodes)}
                ${comparisonRow('Free Resources', statsA.resources, statsB.resources)}
                ${comparisonRow('📖 Fundamentals', statsA.fundamentals, statsB.fundamentals)}
                ${comparisonRow('📘 Intermediate', statsA.intermediate, statsB.intermediate)}
                ${comparisonRow('📕 Advanced', statsA.advanced, statsB.advanced)}
                ${comparisonRow('🔧 Tools', statsA.tools, statsB.tools)}
                ${comparisonRow('Resources/Topic', (statsA.resources / statsA.nodes).toFixed(1), (statsB.resources / statsB.nodes).toFixed(1))}
            </div>
            <div class="comparison-actions">
                <a href="roadmap.html?roadmap=${slugA}" class="btn btn-sm">Open ${statsA.title} →</a>
                <a href="roadmap.html?roadmap=${slugB}" class="btn btn-sm">Open ${statsB.title} →</a>
            </div>
        `;
    } catch (e) {
        results.innerHTML = '<p style="text-align:center;color:var(--text-muted);">Error loading roadmaps. Please try again.</p>';
    }
}

function comparisonRow(label, valA, valB) {
    const aNum = parseFloat(valA);
    const bNum = parseFloat(valB);
    const aClass = aNum > bNum ? 'winner' : '';
    const bClass = bNum > aNum ? 'winner' : '';
    return `
        <div class="comparison-row">
            <div class="comparison-cell label">${label}</div>
            <div class="comparison-cell ${aClass}">${valA}</div>
            <div class="comparison-cell ${bClass}">${valB}</div>
        </div>
    `;
}
