/* ========================================
   DevRoadmaps — Daily Challenge System
   Daily coding challenges with streak tracking
   ======================================== */

const DAILY_CHALLENGES = [
    { id: 1, category: 'HTML', difficulty: 'Beginner', title: 'Semantic Structure', challenge: 'Create a blog post layout using only semantic HTML5 elements (header, article, section, nav, footer) without any div tags.', hints: ['Use <article> for the main post', 'Use <header> for title and meta', 'Use <section> for different content areas'] },
    { id: 2, category: 'CSS', difficulty: 'Beginner', title: 'Flexbox Center', challenge: 'Center a card both horizontally and vertically in the viewport using only Flexbox.', hints: ['Use display: flex on parent', 'justify-content: center', 'align-items: center'] },
    { id: 3, category: 'JavaScript', difficulty: 'Beginner', title: 'Array Methods', challenge: 'Write a function that takes an array of numbers and returns the sum of all even numbers using array methods.', hints: ['Use .filter() to get even numbers', 'Use .reduce() to sum them'] },
    { id: 4, category: 'JavaScript', difficulty: 'Intermediate', title: 'Debounce Function', challenge: 'Implement a debounce function that delays invoking a function until after a specified wait time has elapsed since the last call.', hints: ['Use setTimeout and clearTimeout', 'Return a wrapper function', 'Store the timeout ID in closure'] },
    { id: 5, category: 'CSS', difficulty: 'Intermediate', title: 'CSS Grid Dashboard', challenge: 'Create a responsive dashboard layout with a sidebar, header, main content, and footer using CSS Grid.', hints: ['Use grid-template-areas', 'Define named areas for each section', 'Use media queries for mobile'] },
    { id: 6, category: 'React', difficulty: 'Intermediate', title: 'Custom Hook', challenge: 'Create a custom React hook called useLocalStorage that syncs state with localStorage.', hints: ['Use useState for state', 'Use useEffect to sync', 'Handle JSON parse/stringify'] },
    { id: 7, category: 'Python', difficulty: 'Beginner', title: 'List Comprehension', challenge: 'Write a list comprehension that generates a list of all prime numbers from 2 to 100.', hints: ['Use a helper function to check primality', 'Use all() with a generator expression'] },
    { id: 8, category: 'Git', difficulty: 'Beginner', title: 'Branch Strategy', challenge: 'Describe a Git branching strategy for a team of 5 developers working on a web app with weekly releases.', hints: ['Consider GitFlow or trunk-based', 'Feature branches', 'Release and hotfix branches'] },
    { id: 9, category: 'API Design', difficulty: 'Intermediate', title: 'RESTful Endpoints', challenge: 'Design RESTful API endpoints for a task management app with users, projects, tasks, and comments.', hints: ['Use proper HTTP methods', 'Nest resources logically', 'Include pagination'] },
    { id: 10, category: 'Database', difficulty: 'Intermediate', title: 'SQL Query', challenge: 'Write a SQL query to find the top 5 customers who spent the most in the last 30 days, joining customers and orders tables.', hints: ['Use JOIN', 'Use GROUP BY and SUM', 'ORDER BY and LIMIT'] },
    { id: 11, category: 'JavaScript', difficulty: 'Advanced', title: 'Promise.all Polyfill', challenge: 'Implement your own version of Promise.all that takes an array of promises and resolves when all are resolved.', hints: ['Return a new Promise', 'Track resolved count', 'Handle rejection immediately'] },
    { id: 12, category: 'CSS', difficulty: 'Advanced', title: 'CSS Animation', challenge: 'Create a pure CSS loading spinner with three bouncing dots using only CSS animations and pseudo-elements.', hints: ['Use @keyframes', 'animation-delay for stagger', 'Use ::before and ::after'] },
    { id: 13, category: 'DevOps', difficulty: 'Intermediate', title: 'Docker Compose', challenge: 'Write a docker-compose.yml for a full-stack app with a React frontend, Node.js API, PostgreSQL database, and Redis cache.', hints: ['Define services for each', 'Use volumes for persistence', 'Set up networking'] },
    { id: 14, category: 'Security', difficulty: 'Intermediate', title: 'Input Validation', challenge: 'Implement server-side input validation for a registration form (email, password, username) using regex patterns.', hints: ['Validate email format', 'Password: min 8 chars, upper, lower, number', 'Username: alphanumeric'] },
    { id: 15, category: 'TypeScript', difficulty: 'Intermediate', title: 'Generic Function', challenge: 'Write a TypeScript generic function that takes an array and a key, then groups the array items by that key.', hints: ['Use Record<string, T[]>', 'Use generics with constraints'] },
    { id: 16, category: 'Python', difficulty: 'Advanced', title: 'Decorator Pattern', challenge: 'Write a Python decorator that caches function results with an optional TTL (time-to-live) parameter.', hints: ['Use functools.wraps', 'Store results in a dict', 'Check expiry time'] },
    { id: 17, category: 'System Design', difficulty: 'Advanced', title: 'URL Shortener', challenge: 'Design a URL shortening service like bit.ly. Describe the API, database schema, and URL generation algorithm.', hints: ['Use base62 encoding', 'Hash or auto-increment ID', 'Consider collision handling'] },
    { id: 18, category: 'JavaScript', difficulty: 'Beginner', title: 'DOM Manipulation', challenge: 'Create a todo list that allows adding, checking off, and deleting items using vanilla JavaScript DOM manipulation.', hints: ['Use createElement', 'addEventListener for events', 'classList.toggle for check'] },
    { id: 19, category: 'Testing', difficulty: 'Intermediate', title: 'Unit Test', challenge: 'Write unit tests for a function that validates email addresses. Include at least 5 test cases covering edge cases.', hints: ['Test valid emails', 'Test invalid formats', 'Test edge cases like @., spaces'] },
    { id: 20, category: 'React', difficulty: 'Advanced', title: 'Context + Reducer', challenge: 'Build a shopping cart using React Context and useReducer with actions: ADD_ITEM, REMOVE_ITEM, UPDATE_QUANTITY, CLEAR_CART.', hints: ['Define action types', 'Create reducer function', 'Provide through Context'] },
    { id: 21, category: 'CSS', difficulty: 'Beginner', title: 'Responsive Typography', challenge: 'Create a typography system with responsive font sizes using CSS clamp() for h1-h6 and paragraph text.', hints: ['Use clamp(min, preferred, max)', 'Use rem units', 'Consider viewport width'] },
    { id: 22, category: 'Node.js', difficulty: 'Intermediate', title: 'Express Middleware', challenge: 'Write an Express.js middleware that logs request method, URL, and response time for every incoming request.', hints: ['Use next() to continue', 'Record Date.now() at start', 'Hook into response finish event'] },
    { id: 23, category: 'Algorithms', difficulty: 'Intermediate', title: 'Two Sum', challenge: 'Given an array of integers and a target sum, find two numbers that add up to the target. Return their indices.', hints: ['Use a hash map', 'Store complements', 'O(n) time complexity'] },
    { id: 24, category: 'DevOps', difficulty: 'Advanced', title: 'CI/CD Pipeline', challenge: 'Write a GitHub Actions workflow that runs tests, builds a Docker image, and deploys to AWS ECS on push to main.', hints: ['Use jobs for stages', 'Cache dependencies', 'Use OIDC for AWS auth'] },
    { id: 25, category: 'JavaScript', difficulty: 'Intermediate', title: 'Event Emitter', challenge: 'Implement a simple EventEmitter class with on, off, emit, and once methods.', hints: ['Store listeners in a Map', 'Support multiple listeners per event', 'once removes after first call'] },
    { id: 26, category: 'HTML', difficulty: 'Beginner', title: 'Accessible Form', challenge: 'Build a fully accessible contact form with proper labels, ARIA attributes, and keyboard navigation.', hints: ['Use <label for="">', 'Add aria-required', 'Include aria-describedby for errors'] },
    { id: 27, category: 'Python', difficulty: 'Beginner', title: 'File Processing', challenge: 'Write a Python script that reads a CSV file, filters rows by a column value, and writes results to a new CSV.', hints: ['Use csv module or pandas', 'Use with open() for file handling'] },
    { id: 28, category: 'System Design', difficulty: 'Advanced', title: 'Rate Limiter', challenge: 'Design a rate limiter that allows N requests per minute per user. Implement using the sliding window algorithm.', hints: ['Use a sliding window counter', 'Store timestamps in a queue', 'Remove expired entries'] },
    { id: 29, category: 'CSS', difficulty: 'Intermediate', title: 'Dark Mode Toggle', challenge: 'Implement a dark/light mode toggle using CSS custom properties and JavaScript, with system preference detection.', hints: ['Use CSS variables', 'prefers-color-scheme media query', 'Store preference in localStorage'] },
    { id: 30, category: 'JavaScript', difficulty: 'Advanced', title: 'Virtual DOM', challenge: 'Implement a minimal virtual DOM that can diff two tree structures and apply patches to the real DOM.', hints: ['Represent nodes as objects', 'Implement diff algorithm', 'Apply patches recursively'] },
];

const STREAK_KEY = 'devroadmaps-streak';
const CHALLENGE_KEY = 'devroadmaps-challenges';

function getStreak() {
    try {
        const data = JSON.parse(localStorage.getItem(STREAK_KEY) || '{}');
        return data;
    } catch { return {}; }
}

function saveStreak(data) {
    localStorage.setItem(STREAK_KEY, JSON.stringify(data));
}

function getCompletedChallenges() {
    try {
        return JSON.parse(localStorage.getItem(CHALLENGE_KEY) || '[]');
    } catch { return []; }
}

function saveCompletedChallenges(arr) {
    localStorage.setItem(CHALLENGE_KEY, JSON.stringify(arr));
}

function getTodaysChallenge() {
    const today = new Date();
    const dayIndex = (today.getFullYear() * 366 + today.getMonth() * 31 + today.getDate()) % DAILY_CHALLENGES.length;
    return DAILY_CHALLENGES[dayIndex];
}

function markChallengeComplete(challengeId) {
    const completed = getCompletedChallenges();
    if (!completed.includes(challengeId)) {
        completed.push(challengeId);
        saveCompletedChallenges(completed);
    }
    updateStreak();
}

function updateStreak() {
    const streak = getStreak();
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();

    if (streak.lastDate === today) return;

    if (streak.lastDate === yesterday) {
        streak.count = (streak.count || 0) + 1;
    } else {
        streak.count = 1;
    }
    streak.lastDate = today;

    if (streak.count > (streak.best || 0)) {
        streak.best = streak.count;
    }
    saveStreak(streak);
}

function renderDailyChallenge(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const challenge = getTodaysChallenge();
    const completed = getCompletedChallenges();
    const isDone = completed.includes(challenge.id);
    const streak = getStreak();

    let hintsHtml = challenge.hints.map((h, i) =>
        `<div class="challenge-hint" style="display:none" id="hint-${i}">💡 ${h}</div>`
    ).join('');

    container.innerHTML = `
        <div class="daily-challenge-card">
            <div class="challenge-header">
                <div>
                    <span class="challenge-badge ${challenge.difficulty.toLowerCase()}">${challenge.difficulty}</span>
                    <span class="challenge-category">${challenge.category}</span>
                </div>
                <div class="streak-display">
                    <span class="streak-fire">🔥</span>
                    <span class="streak-count">${streak.count || 0}</span>
                    <span class="streak-label">day streak</span>
                </div>
            </div>
            <h3 class="challenge-title">${challenge.title}</h3>
            <p class="challenge-desc">${challenge.challenge}</p>
            <div class="challenge-hints">${hintsHtml}</div>
            <div class="challenge-actions">
                <button class="btn btn-sm" onclick="revealHints()">💡 Show Hints</button>
                ${isDone
                    ? '<span class="challenge-done">✅ Completed today!</span>'
                    : `<button class="btn btn-sm btn-primary" onclick="completeChallenge(${challenge.id})">✅ Mark Complete</button>`
                }
            </div>
            <div class="challenge-stats">
                <span>${completed.length} challenges completed</span>
                <span>Best streak: ${streak.best || 0} days</span>
            </div>
        </div>
    `;
}

function revealHints() {
    document.querySelectorAll('.challenge-hint').forEach((el, i) => {
        setTimeout(() => { el.style.display = 'block'; }, i * 300);
    });
}

function completeChallenge(challengeId) {
    markChallengeComplete(challengeId);
    const container = document.getElementById('daily-challenge');
    if (container) renderDailyChallenge('daily-challenge');
}

document.addEventListener('DOMContentLoaded', () => {
    renderDailyChallenge('daily-challenge');
});
