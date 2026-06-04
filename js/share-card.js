/* ========================================
   DevRoadmaps — Share Card Generator
   Generate beautiful shareable progress cards
   ======================================== */

function generateProgressCard(roadmapSlug, roadmapTitle, icon, completed, total) {
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 630;
    const ctx = canvas.getContext('2d');

    // Background gradient
    const grad = ctx.createLinearGradient(0, 0, 1200, 630);
    grad.addColorStop(0, '#0a0a1a');
    grad.addColorStop(0.5, '#111128');
    grad.addColorStop(1, '#1a1a3e');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1200, 630);

    // Decorative circles
    ctx.globalAlpha = 0.06;
    ctx.fillStyle = '#7c5cfc';
    ctx.beginPath();
    ctx.arc(1100, 100, 200, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ff6b9d';
    ctx.beginPath();
    ctx.arc(100, 530, 150, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#00d4ff';
    ctx.beginPath();
    ctx.arc(600, 50, 120, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;

    // Top accent bar
    const barGrad = ctx.createLinearGradient(0, 0, 1200, 0);
    barGrad.addColorStop(0, '#7c5cfc');
    barGrad.addColorStop(0.5, '#ff6b9d');
    barGrad.addColorStop(1, '#00d4ff');
    ctx.fillStyle = barGrad;
    ctx.fillRect(0, 0, 1200, 4);

    // Logo & branding
    ctx.font = '600 18px "Segoe UI", system-ui, sans-serif';
    ctx.fillStyle = '#a0a0cc';
    ctx.fillText('DevRoadmaps', 60, 55);

    // Icon
    ctx.font = '80px serif';
    ctx.fillText(icon || '🗺️', 60, 200);

    // Title
    ctx.font = '800 48px "Segoe UI", system-ui, sans-serif';
    ctx.fillStyle = '#e8e8ff';
    ctx.fillText(roadmapTitle, 180, 170);

    // Subtitle
    ctx.font = '400 22px "Segoe UI", system-ui, sans-serif';
    ctx.fillStyle = '#a0a0cc';
    ctx.fillText('My Learning Progress', 180, 210);

    // Progress bar background
    const barX = 60, barY = 290, barW = 1080, barH = 32;
    ctx.fillStyle = 'rgba(124, 92, 252, 0.15)';
    roundRect(ctx, barX, barY, barW, barH, 16);
    ctx.fill();

    // Progress bar fill
    const pct = total > 0 ? completed / total : 0;
    const fillGrad = ctx.createLinearGradient(barX, 0, barX + barW * pct, 0);
    fillGrad.addColorStop(0, '#7c5cfc');
    fillGrad.addColorStop(1, '#ff6b9d');
    ctx.fillStyle = fillGrad;
    roundRect(ctx, barX, barY, barW * pct, barH, 16);
    ctx.fill();

    // Percentage text
    ctx.font = '700 28px "Segoe UI", system-ui, sans-serif';
    ctx.fillStyle = '#7c5cfc';
    ctx.fillText(`${Math.round(pct * 100)}%`, barX, barY + 75);

    // Stats row
    ctx.font = '500 20px "Segoe UI", system-ui, sans-serif';
    ctx.fillStyle = '#a0a0cc';
    ctx.fillText(`${completed} completed`, barX + 120, barY + 75);
    ctx.fillText(`${total - completed} remaining`, barX + 320, barY + 75);
    ctx.fillText(`${total} total topics`, barX + 540, barY + 75);

    // Stats boxes
    const boxY = 420;
    drawStatBox(ctx, 60, boxY, '📚', 'Topics', `${total}`);
    drawStatBox(ctx, 330, boxY, '✅', 'Done', `${completed}`);
    drawStatBox(ctx, 600, boxY, '📊', 'Progress', `${Math.round(pct * 100)}%`);
    drawStatBox(ctx, 870, boxY, '🔥', 'Status', pct >= 0.8 ? 'On Fire!' : pct >= 0.4 ? 'Growing' : 'Starting');

    // Footer
    ctx.font = '400 16px "Segoe UI", system-ui, sans-serif';
    ctx.fillStyle = '#6a6a99';
    ctx.fillText('rudra496.github.io/devroadmaps', 60, 590);
    ctx.fillText('Free & Open Source Developer Roadmaps', 750, 590);

    return canvas;
}

function drawStatBox(ctx, x, y, icon, label, value) {
    ctx.fillStyle = 'rgba(124, 92, 252, 0.08)';
    roundRect(ctx, x, y, 240, 100, 12);
    ctx.fill();
    ctx.strokeStyle = 'rgba(124, 92, 252, 0.2)';
    ctx.lineWidth = 1;
    roundRect(ctx, x, y, 240, 100, 12);
    ctx.stroke();

    ctx.font = '32px serif';
    ctx.fillStyle = '#e8e8ff';
    ctx.fillText(icon, x + 20, y + 45);
    ctx.font = '700 24px "Segoe UI", system-ui, sans-serif';
    ctx.fillStyle = '#e8e8ff';
    ctx.fillText(value, x + 70, y + 42);
    ctx.font = '400 14px "Segoe UI", system-ui, sans-serif';
    ctx.fillStyle = '#a0a0cc';
    ctx.fillText(label, x + 70, y + 70);
}

function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
}

function shareProgressCard(slug, title, icon, completed, total) {
    const canvas = generateProgressCard(slug, title, icon, completed, total);

    // Download
    canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `devroadmaps-${slug}-progress.png`;
        a.click();
        URL.revokeObjectURL(url);
    }, 'image/png');
}

function generateOverallProgressCard() {
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 630;
    const ctx = canvas.getContext('2d');

    // Background
    const grad = ctx.createLinearGradient(0, 0, 1200, 630);
    grad.addColorStop(0, '#0a0a1a');
    grad.addColorStop(0.5, '#111128');
    grad.addColorStop(1, '#1a1a3e');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1200, 630);

    // Decorative
    ctx.globalAlpha = 0.05;
    ctx.fillStyle = '#7c5cfc';
    ctx.beginPath(); ctx.arc(1050, 120, 250, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#ff6b9d';
    ctx.beginPath(); ctx.arc(150, 500, 180, 0, Math.PI * 2); ctx.fill();
    ctx.globalAlpha = 1;

    // Top bar
    const barGrad = ctx.createLinearGradient(0, 0, 1200, 0);
    barGrad.addColorStop(0, '#7c5cfc');
    barGrad.addColorStop(0.5, '#ff6b9d');
    barGrad.addColorStop(1, '#00d4ff');
    ctx.fillStyle = barGrad;
    ctx.fillRect(0, 0, 1200, 4);

    // Header
    ctx.font = '800 44px "Segoe UI", system-ui, sans-serif';
    ctx.fillStyle = '#e8e8ff';
    ctx.fillText('🗺️ My DevRoadmaps Journey', 60, 80);

    ctx.font = '400 20px "Segoe UI", system-ui, sans-serif';
    ctx.fillStyle = '#a0a0cc';
    ctx.fillText('Overall Learning Progress Across All Roadmaps', 60, 115);

    // Gather stats
    const slugs = ['frontend','backend','fullstack','ml-ai','devops','mobile','cybersecurity',
                   'data-engineer','blockchain','game-dev','embedded-iot','product-manager',
                   'devsecops','qa-engineer','technical-writer','low-code-no-code','cloud-architect',
                   'platform-engineer','sre','ar-vr'];
    let totalDone = 0, totalNodes = 0, startedCount = 0;
    const roadmapStats = [];

    for (const slug of slugs) {
        const progress = JSON.parse(localStorage.getItem(`progress-${slug}`) || '{}');
        const done = Object.values(progress).filter(v => v).length;
        if (done > 0) startedCount++;
        totalDone += done;
    }

    // Stats boxes row 1
    const boxY1 = 150;
    drawStatBox(ctx, 60, boxY1, '🗺️', 'Roadmaps Started', `${startedCount}`);
    drawStatBox(ctx, 330, boxY1, '✅', 'Topics Completed', `${totalDone}`);
    drawStatBox(ctx, 600, boxY1, '⏱️', 'Study Time', formatTime(getTotalStudyTime()));
    drawStatBox(ctx, 870, boxY1, '📌', 'Bookmarks', `${getBookmarks().length}`);

    // Per-roadmap mini bars
    const labels = ['Frontend','Backend','Full Stack','ML/AI','DevOps','Mobile','Security','Data','Blockchain','Game','IoT','PM','DevSecOps','QA','Writer','Low-Code','Cloud'];
    const miniY = 310;
    ctx.font = '600 14px "Segoe UI", system-ui, sans-serif';

    for (let i = 0; i < slugs.length; i++) {
        const progress = JSON.parse(localStorage.getItem(`progress-${slugs[i]}`) || '{}');
        const done = Object.values(progress).filter(v => v).length;
        const y = miniY + (i % 6) * 48;
        const x = 60 + Math.floor(i / 6) * 380;

        ctx.fillStyle = '#a0a0cc';
        ctx.fillText(labels[i], x, y + 14);

        // Mini bar
        ctx.fillStyle = 'rgba(124,92,252,0.1)';
        roundRect(ctx, x + 100, y, 200, 18, 9);
        ctx.fill();

        const pct = done > 0 ? Math.min(done / 50, 1) : 0;
        if (pct > 0) {
            const miniGrad = ctx.createLinearGradient(x + 100, 0, x + 100 + 200 * pct, 0);
            miniGrad.addColorStop(0, '#7c5cfc');
            miniGrad.addColorStop(1, '#ff6b9d');
            ctx.fillStyle = miniGrad;
            roundRect(ctx, x + 100, y, 200 * pct, 18, 9);
            ctx.fill();
        }

        ctx.fillStyle = '#6a6a99';
        ctx.font = '400 12px "Segoe UI", system-ui, sans-serif';
        ctx.fillText(`${done}`, x + 310, y + 14);
        ctx.font = '600 14px "Segoe UI", system-ui, sans-serif';
    }

    // Footer
    ctx.font = '400 16px "Segoe UI", system-ui, sans-serif';
    ctx.fillStyle = '#6a6a99';
    ctx.fillText('rudra496.github.io/devroadmaps', 60, 600);
    ctx.fillText('Free & Open Source Developer Roadmaps', 750, 600);

    return canvas;
}

function shareOverallProgress() {
    const canvas = generateOverallProgressCard();
    canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'devroadmaps-progress.png';
        a.click();
        URL.revokeObjectURL(url);
    }, 'image/png');
}
