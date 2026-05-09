// Community Forum — Community discussions stored locally

const FORUM_STORAGE_KEY = 'devroadmaps_forum';

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
const FORUM_CATEGORIES = ['General', 'Help', 'Show & Tell', 'Feedback', 'Resources'];

const DEFAULT_POSTS = [];

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
              <span class="post-category-tag">${escapeHtml(post.category)}</span>
              <span class="post-author-name">${escapeHtml(post.author)}</span>
              <span class="post-time">${timeAgo(post.timestamp)}</span>
            </div>
            <h3 class="post-title">${escapeHtml(post.title)}</h3>
            <p class="post-message">${escapeHtml(post.message)}</p>
            <div class="post-actions">
              <button onclick="likePost(${post.id}); renderForum('${containerId}')">❤️ ${post.likes || 0}</button>
              <span>💬 ${post.replies || 0}</span>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
    <p class="forum-note">Posts are stored locally in your browser. Share your learning journey!</p>
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
