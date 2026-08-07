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

        results.replaceChildren();

        const table = document.createElement('div');
        table.className = 'comparison-table';

        const headerRow = document.createElement('div');
        headerRow.className = 'comparison-row header';

        const cellMetric = document.createElement('div');
        cellMetric.className = 'comparison-cell';
        cellMetric.textContent = 'Metric';

        const cellA = document.createElement('div');
        cellA.className = 'comparison-cell';
        cellA.textContent = `${statsA.icon || ''} ${statsA.title || ''}`;

        const cellB = document.createElement('div');
        cellB.className = 'comparison-cell';
        cellB.textContent = `${statsB.icon || ''} ${statsB.title || ''}`;

        headerRow.appendChild(cellMetric);
        headerRow.appendChild(cellA);
        headerRow.appendChild(cellB);
        table.appendChild(headerRow);

        const rowsData = [
            ['Total Topics', statsA.nodes, statsB.nodes],
            ['Free Resources', statsA.resources, statsB.resources],
            ['📖 Fundamentals', statsA.fundamentals, statsB.fundamentals],
            ['📘 Intermediate', statsA.intermediate, statsB.intermediate],
            ['📕 Advanced', statsA.advanced, statsB.advanced],
            ['🔧 Tools', statsA.tools, statsB.tools],
            ['Resources/Topic', (statsA.resources / statsA.nodes).toFixed(1), (statsB.resources / statsB.nodes).toFixed(1)]
        ];

        for (const [lbl, vA, vB] of rowsData) {
            const row = document.createElement('div');
            row.className = 'comparison-row';

            const cLbl = document.createElement('div');
            cLbl.className = 'comparison-cell label';
            cLbl.textContent = lbl;

            const cA = document.createElement('div');
            cA.className = 'comparison-cell' + (parseFloat(vA) > parseFloat(vB) ? ' winner' : '');
            cA.textContent = String(vA);

            const cB = document.createElement('div');
            cB.className = 'comparison-cell' + (parseFloat(vB) > parseFloat(vA) ? ' winner' : '');
            cB.textContent = String(vB);

            row.appendChild(cLbl);
            row.appendChild(cA);
            row.appendChild(cB);
            table.appendChild(row);
        }

        const actions = document.createElement('div');
        actions.className = 'comparison-actions';

        const linkA = document.createElement('a');
        linkA.href = `roadmap.html?roadmap=${encodeURIComponent(slugA)}`;
        linkA.className = 'btn btn-sm';
        linkA.textContent = `Open ${statsA.title || ''} →`;

        const linkB = document.createElement('a');
        linkB.href = `roadmap.html?roadmap=${encodeURIComponent(slugB)}`;
        linkB.className = 'btn btn-sm';
        linkB.textContent = `Open ${statsB.title || ''} →`;

        actions.appendChild(linkA);
        actions.appendChild(linkB);

        results.appendChild(table);
        results.appendChild(actions);
    } catch (e) {
        results.replaceChildren();
        const pErr = document.createElement('p');
        pErr.style.textAlign = 'center';
        pErr.style.color = 'var(--text-muted)';
        pErr.textContent = 'Error loading roadmaps. Please try again.';
        results.appendChild(pErr);
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
