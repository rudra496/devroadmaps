/* ========================================
   DevRoadmaps — Skill Radar Chart
   Visual skill assessment using radar/spider chart
   ======================================== */

const SKILL_AREAS = [
    { id: 'frontend', label: 'Frontend', roadmaps: ['frontend'], maxScore: 52 },
    { id: 'backend', label: 'Backend', roadmaps: ['backend'], maxScore: 50 },
    { id: 'devops', label: 'DevOps', roadmaps: ['devops', 'devsecops', 'platform-engineer', 'sre'], maxScore: 139 },
    { id: 'data', label: 'Data & AI', roadmaps: ['ml-ai', 'data-engineer'], maxScore: 100 },
    { id: 'mobile', label: 'Mobile', roadmaps: ['mobile', 'ar-vr'], maxScore: 72 },
    { id: 'security', label: 'Security', roadmaps: ['cybersecurity'], maxScore: 50 },
    { id: 'cloud', label: 'Cloud', roadmaps: ['cloud-architect'], maxScore: 36 },
    { id: 'quality', label: 'Quality', roadmaps: ['qa-engineer'], maxScore: 42 },
];

function getSkillScores() {
    return SKILL_AREAS.map(area => {
        let total = 0;
        area.roadmaps.forEach(slug => {
            const progress = JSON.parse(localStorage.getItem(`progress-${slug}`) || '{}');
            total += Object.values(progress).filter(v => v).length;
        });
        return Math.round((total / area.maxScore) * 100);
    });
}

function renderSkillRadar(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const scores = getSkillScores();
    const labels = SKILL_AREAS.map(a => a.label);
    const n = labels.length;
    const size = 320;
    const cx = size / 2;
    const cy = size / 2;
    const maxR = size / 2 - 40;

    function polarToXY(angle, radius) {
        const x = cx + radius * Math.cos(angle - Math.PI / 2);
        const y = cy + radius * Math.sin(angle - Math.PI / 2);
        return { x, y };
    }

    // Build SVG
    let svg = `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">`;

    // Background rings
    [0.2, 0.4, 0.6, 0.8, 1.0].forEach(pct => {
        let points = [];
        for (let i = 0; i < n; i++) {
            const angle = (2 * Math.PI * i) / n;
            const p = polarToXY(angle, maxR * pct);
            points.push(`${p.x},${p.y}`);
        }
        svg += `<polygon points="${points.join(' ')}" fill="none" stroke="rgba(124,92,252,0.1)" stroke-width="1"/>`;
    });

    // Axis lines
    for (let i = 0; i < n; i++) {
        const angle = (2 * Math.PI * i) / n;
        const p = polarToXY(angle, maxR);
        svg += `<line x1="${cx}" y1="${cy}" x2="${p.x}" y2="${p.y}" stroke="rgba(124,92,252,0.15)" stroke-width="1"/>`;
    }

    // Data polygon
    let dataPoints = [];
    for (let i = 0; i < n; i++) {
        const angle = (2 * Math.PI * i) / n;
        const r = (scores[i] / 100) * maxR;
        const p = polarToXY(angle, r);
        dataPoints.push(`${p.x},${p.y}`);
    }
    svg += `<polygon points="${dataPoints.join(' ')}" fill="rgba(124,92,252,0.2)" stroke="#7c5cfc" stroke-width="2"/>`;

    // Data points
    for (let i = 0; i < n; i++) {
        const angle = (2 * Math.PI * i) / n;
        const r = (scores[i] / 100) * maxR;
        const p = polarToXY(angle, r);
        svg += `<circle cx="${p.x}" cy="${p.y}" r="4" fill="#7c5cfc" stroke="#fff" stroke-width="1"/>`;
    }

    // Labels
    for (let i = 0; i < n; i++) {
        const angle = (2 * Math.PI * i) / n;
        const p = polarToXY(angle, maxR + 22);
        const anchor = p.x < cx - 5 ? 'end' : p.x > cx + 5 ? 'start' : 'middle';
        svg += `<text x="${p.x}" y="${p.y}" text-anchor="${anchor}" dominant-baseline="middle" fill="var(--text-secondary, #a0a0cc)" font-size="11" font-weight="600">${labels[i]}</text>`;
        svg += `<text x="${p.x}" y="${p.y + 13}" text-anchor="${anchor}" dominant-baseline="middle" fill="var(--text-muted, #6a6a99)" font-size="9">${scores[i]}%</text>`;
    }

    svg += '</svg>';

    // Score summary
    const avgScore = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
    const topSkill = SKILL_AREAS[scores.indexOf(Math.max(...scores))];

    container.innerHTML = `
        <div class="skill-radar-container">
            <div class="skill-radar-chart">${svg}</div>
            <div class="skill-radar-summary">
                <div class="skill-stat">
                    <span class="skill-stat-value">${avgScore}%</span>
                    <span class="skill-stat-label">Average Skill Level</span>
                </div>
                <div class="skill-stat">
                    <span class="skill-stat-value">${topSkill.label}</span>
                    <span class="skill-stat-label">Strongest Area</span>
                </div>
            </div>
        </div>
    `;
}
