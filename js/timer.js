/* ========================================
   DevRoadmaps — Study Timer (Pomodoro)
   ======================================== */

const POMODORO_WORK = 25 * 60; // 25 minutes
const POMODORO_BREAK = 5 * 60; // 5 minutes

let timerInterval = null;
let timerSeconds = 0;
let timerRunning = false;
let timerRoadmap = '';
let timerMode = 'work'; // 'work' or 'break'

function getStudyTime() {
  return JSON.parse(localStorage.getItem('devroadmaps-study-time') || '{}');
}

function addStudyTime(roadmap, seconds) {
  const times = getStudyTime();
  times[roadmap] = (times[roadmap] || 0) + seconds;
  localStorage.setItem('devroadmaps-study-time', JSON.stringify(times));
  updateStudyTimeDisplay();
}

function getTotalStudyTime() {
  const times = getStudyTime();
  return Object.values(times).reduce((a, b) => a + b, 0);
}

function formatTime(totalSeconds) {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m ${s}s`;
}

function formatTimerDisplay(seconds) {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

function updateStudyTimeDisplay() {
  document.querySelectorAll('.total-study-time').forEach(el => {
    el.textContent = formatTime(getTotalStudyTime());
  });
}

function startTimer(roadmap) {
  if (timerRunning) return;
  timerRoadmap = roadmap;
  timerMode = 'work';
  timerSeconds = POMODORO_WORK;
  timerRunning = true;
  updateTimerUI();

  const elapsedAtStart = Date.now();
  timerInterval = setInterval(() => {
    timerSeconds--;
    if (timerSeconds <= 0) {
      clearInterval(timerInterval);
      timerRunning = false;
      if (timerMode === 'work') {
        addStudyTime(timerRoadmap, POMODORO_WORK);
        alert('🍅 Pomodoro complete! Take a 5-minute break.');
        // Auto start break
        timerMode = 'break';
        timerSeconds = POMODORO_BREAK;
        timerRunning = true;
        timerInterval = setInterval(arguments.callee, 1000);
      } else {
        timerMode = 'work';
        alert('☕ Break over! Ready for another session?');
        resetTimerUI();
      }
    }
    updateTimerUI();
  }, 1000);
}

function stopTimer() {
  if (!timerRunning) return;
  // Save partial time if work mode
  if (timerMode === 'work') {
    const elapsed = POMODORO_WORK - timerSeconds;
    addStudyTime(timerRoadmap, elapsed);
  }
  clearInterval(timerInterval);
  timerRunning = false;
  resetTimerUI();
}

function updateTimerUI() {
  const display = document.getElementById('timerDisplay');
  const label = document.getElementById('timerLabel');
  if (!display) return;

  display.textContent = formatTimerDisplay(timerSeconds);
  if (label) label.textContent = timerMode === 'work' ? '🍅 Focus' : '☕ Break';
  display.style.color = timerMode === 'work' ? 'var(--accent)' : 'var(--green)';

  const btn = document.getElementById('timerToggle');
  if (btn) btn.textContent = timerRunning ? '⏸ Pause' : '▶ Start';
}

function resetTimerUI() {
  const display = document.getElementById('timerDisplay');
  if (display) display.textContent = formatTimerDisplay(POMODORO_WORK);
  const label = document.getElementById('timerLabel');
  if (label) label.textContent = '🍅 Focus';
  if (display) display.style.color = 'var(--accent)';
  const btn = document.getElementById('timerToggle');
  if (btn) btn.textContent = '▶ Start';
}

function toggleTimer(roadmap) {
  if (timerRunning) {
    stopTimer();
  } else {
    startTimer(roadmap);
  }
}

function initTimerWidget() {
  updateStudyTimeDisplay();
  resetTimerUI();
}

// Achievements check
function checkAchievements() {
  const achievements = [];
  const studyTotal = getTotalStudyTime();

  if (studyTotal >= 3600) achievements.push('study_hour');

  // Check completed nodes across all roadmaps
  const ROADMAP_SLUGS = ['frontend','backend','fullstack','ml-ai','devops','mobile','cybersecurity','data-engineer','blockchain','game-dev','embedded-iot','product-manager','devsecops','qa-engineer','technical-writer'];
  let totalCompleted = 0;
  let startedRoadmaps = 0;
  let completedAnyRoadmap = false;

  for (const slug of ROADMAP_SLUGS) {
    const progress = JSON.parse(localStorage.getItem(`progress-${slug}`) || '{}');
    const completed = Object.values(progress).filter(v => v).length;
    totalCompleted += completed;
    if (completed > 0) startedRoadmaps++;
  }

  if (totalCompleted >= 1) achievements.push('first_complete');
  if (totalCompleted >= 10) achievements.push('ten_nodes');
  if (getBookmarks().length >= 10) achievements.push('bookmark_10');
  if (startedRoadmaps >= 5) achievements.push('five_roadmaps');

  return achievements;
}

async function initAchievements() {
  const container = document.getElementById('achievementsGrid');
  if (!container) return;

  try {
    const resp = await fetch('achievements.json');
    const all = await resp.json();
    const unlocked = checkAchievements();

    all.forEach(a => {
      const isUnlocked = unlocked.includes(a.id);
      const card = document.createElement('div');
      card.className = 'achievement-card' + (isUnlocked ? ' unlocked' : '');
      card.innerHTML = `
        <span class="achievement-icon">${isUnlocked ? a.icon : '🔒'}</span>
        <strong>${a.title}</strong>
        <small>${a.description}</small>
        ${isUnlocked ? '<span class="achievement-badge">✅ Unlocked</span>' : '<span class="achievement-badge locked">Locked</span>'}
      `;
      container.appendChild(card);
    });
  } catch (e) {}
}
