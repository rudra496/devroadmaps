// Community Forum — Simulated community discussions

const FORUM_STORAGE_KEY = 'devroadmaps_forum';
const FORUM_CATEGORIES = ['General', 'Help', 'Show & Tell', 'Feedback', 'Resources'];

const DEFAULT_POSTS = [
  {
    id: 1, category: 'Show & Tell',
    title: 'Just completed the Full Stack roadmap in 4 months!',
    author: 'dev_alex',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex',
    message: 'Started with zero web dev experience. The roadmap structure made it so easy to follow. Built 3 portfolio projects along the way. Just landed my first junior developer role!',
    timestamp: '2026-03-20T10:30:00Z',
    replies: 23, likes: 47
  },
  {
    id: 2, category: 'Help',
    title: 'Struggling with Kubernetes — any tips?',
    author: 'learn_k8s',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=k8s',
    message: 'I\'m on the DevOps roadmap and hitting the Kubernetes section. The concepts are overwhelming. What resources helped you understand pods, services, and ingress?',
    timestamp: '2026-03-22T14:15:00Z',
    replies: 15, likes: 12
  },
  {
    id: 3, category: 'General',
    title: 'Which roadmap should I start with if I want to go into AI?',
    author: 'future_ml_eng',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ml',
    message: 'I have basic Python skills and want to become an ML engineer. Should I do the ML/AI roadmap directly or start with backend first?',
    timestamp: '2026-03-25T09:00:00Z',
    replies: 31, likes: 28
  },
  {
    id: 4, category: 'Resources',
    title: 'Free alternatives to paid courses for React',
    author: 'budget_dev',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=react',
    message: 'Found some amazing free resources not in the roadmap: Scrimba has great interactive React tutorials, and EpicWeb.dev by Kent C. Dodds is now free!',
    timestamp: '2026-03-24T16:45:00Z',
    replies: 8, likes: 35
  },
  {
    id: 5, category: 'Feedback',
    title: 'Suggestion: Add estimated completion time per node',
    author: 'planner_mike',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mike',
    message: 'It would be really helpful if each node showed how long it typically takes to learn that topic. Would make planning study schedules much easier.',
    timestamp: '2026-03-26T11:20:00Z',
    replies: 5, likes: 19
  }
];

function getPosts() {
  try {
    const data = localStorage.getItem(FORUM_STORAGE_KEY);
    return data ? JSON.parse(data) : [...DEFAULT_POSTS];
  } catch {
    return [...DEFAULT_POSTS];
  }
}

function savePosts(posts) {
  localStorage.setItem(FORUM_STORAGE_KEY, JSON.stringify(posts));
}

function addPost(category, title, message, author) {
  const posts = getPosts();
  posts.unshift({
    id: Date.now(),
    category,
    title,
    author: author || 'anonymous',
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(author || 'anon' + Date.now())}`,
    message,
    timestamp: new Date().toISOString(),
    replies: 0,
    likes: 0
  });
  savePosts(posts);
}

function likePost(postId) {
  const posts = getPosts();
  const post = posts.find(p => p.id === postId);
  if (post) {
    post.likes = (post.likes || 0) + 1;
    savePosts(posts);
  }
}

function timeAgo(dateStr) {
  const now = new Date();
  const date = new Date(dateStr);
  const diff = Math.floor((now - date) / 1000);
  if (diff < 60) return 'just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

function renderForum(containerId, filterCategory) {
  const container = document.getElementById(containerId);
  if (!container) return;

  let posts = getPosts();
  if (filterCategory && filterCategory !== 'All') {
    posts = posts.filter(p => p.category === filterCategory);
  }

  const html = `
    <div class="forum-header">
      <div class="forum-filters">
        <button class="forum-filter active" onclick="filterForum('All', '${containerId}')">All</button>
        ${FORUM_CATEGORIES.map(cat =>
          `<button class="forum-filter" onclick="filterForum('${cat}', '${containerId}')">${cat}</button>`
        ).join('')}
      </div>
      <button class="forum-new-post" onclick="showNewPostForm()">+ New Post</button>
    </div>
    <div id="new-post-form" style="display:none" class="new-post-form">
      <select id="post-category">
        ${FORUM_CATEGORIES.map(c => `<option value="${c}">${c}</option>`).join('')}
      </select>
      <input id="post-title" type="text" placeholder="Post title..." maxlength="200">
      <textarea id="post-message" placeholder="Share your thoughts..." rows="3" maxlength="2000"></textarea>
      <input id="post-author" type="text" placeholder="Your name (optional)" maxlength="50">
      <div class="form-actions">
        <button onclick="submitPost('${containerId}')">Post</button>
        <button onclick="hideNewPostForm()">Cancel</button>
      </div>
    </div>
    <div class="forum-posts">
      ${posts.slice(0, 20).map(post => `
        <div class="forum-post" data-category="${post.category}">
          <div class="post-avatar"><img src="${post.avatar}" alt="${post.author}" onerror="this.style.display='none'"></div>
          <div class="post-content">
            <div class="post-meta">
              <span class="post-category-tag">${post.category}</span>
              <span class="post-author-name">${post.author}</span>
              <span class="post-time">${timeAgo(post.timestamp)}</span>
            </div>
            <h3 class="post-title">${post.title}</h3>
            <p class="post-message">${post.message}</p>
            <div class="post-actions">
              <button onclick="likePost(${post.id}); renderForum('${containerId}')">❤️ ${post.likes || 0}</button>
              <span>💬 ${post.replies || 0}</span>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
    <p class="forum-note">🌐 Community features coming soon — real accounts, replies, and moderation.</p>
  `;

  container.innerHTML = html;
}

function filterForum(category, containerId) {
  renderForum(containerId, category);
  document.querySelectorAll('.forum-filter').forEach(btn => {
    btn.classList.toggle('active', btn.textContent === category);
  });
}

function showNewPostForm() {
  document.getElementById('new-post-form').style.display = 'block';
}

function hideNewPostForm() {
  document.getElementById('new-post-form').style.display = 'none';
}

function submitPost(containerId) {
  const category = document.getElementById('post-category').value;
  const title = document.getElementById('post-title').value.trim();
  const message = document.getElementById('post-message').value.trim();
  const author = document.getElementById('post-author').value.trim() || 'anonymous';

  if (!title || !message) { alert('Please fill in title and message'); return; }

  addPost(category, title, message, author);
  hideNewPostForm();
  renderForum(containerId);
}

document.addEventListener('DOMContentLoaded', () => {
  renderForum('community-forum');
});
