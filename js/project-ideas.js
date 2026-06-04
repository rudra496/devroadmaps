/* ========================================
   DevRoadmaps — Project Ideas Generator
   Curated project ideas per roadmap
   ======================================== */

const PROJECT_IDEAS = {
    frontend: [
        { title: 'Weather Dashboard', difficulty: 'Beginner', desc: 'Build a weather app with geolocation, 5-day forecast, and animated icons using a free weather API.', tech: ['HTML', 'CSS', 'JavaScript', 'Fetch API'] },
        { title: 'Markdown Blog', difficulty: 'Intermediate', desc: 'Create a blog that renders markdown files with syntax highlighting, dark mode, and reading time estimate.', tech: ['HTML', 'CSS', 'JavaScript', 'Markdown'] },
        { title: 'Kanban Board', difficulty: 'Intermediate', desc: 'Drag-and-drop task board with columns, card editing, labels, and localStorage persistence.', tech: ['HTML', 'CSS', 'JavaScript', 'Drag & Drop API'] },
        { title: 'Real-time Chat UI', difficulty: 'Advanced', desc: 'Build a chat interface with message bubbles, typing indicators, emoji picker, and responsive design.', tech: ['HTML', 'CSS', 'JavaScript', 'WebSocket'] },
        { title: 'Portfolio with 3D', difficulty: 'Advanced', desc: 'Create a developer portfolio with 3D hero animation using Three.js, smooth scrolling, and dark mode.', tech: ['HTML', 'CSS', 'JavaScript', 'Three.js'] },
    ],
    backend: [
        { title: 'REST API with Auth', difficulty: 'Beginner', desc: 'Build a REST API with JWT authentication, CRUD operations, input validation, and rate limiting.', tech: ['Node.js', 'Express', 'MongoDB', 'JWT'] },
        { title: 'URL Shortener', difficulty: 'Intermediate', desc: 'Create a URL shortener with analytics, custom aliases, expiration dates, and click tracking.', tech: ['Node.js', 'Redis', 'PostgreSQL'] },
        { title: 'File Sharing Service', difficulty: 'Intermediate', desc: 'Build a file upload/download service with shareable links, expiration, and download limits.', tech: ['Node.js', 'AWS S3', 'Express'] },
        { title: 'Real-time Notifications', difficulty: 'Advanced', desc: 'Design a notification system with WebSocket delivery, preferences, batching, and read receipts.', tech: ['Node.js', 'WebSocket', 'Redis', 'PostgreSQL'] },
        { title: 'Microservices Architecture', difficulty: 'Advanced', desc: 'Build a multi-service e-commerce backend with service discovery, API gateway, and message queue.', tech: ['Node.js', 'Docker', 'RabbitMQ', 'Nginx'] },
    ],
    'ml-ai': [
        { title: 'Sentiment Analyzer', difficulty: 'Beginner', desc: 'Build a sentiment analysis tool that classifies text as positive, negative, or neutral using a pre-trained model.', tech: ['Python', 'NLTK', 'Flask'] },
        { title: 'Image Classifier', difficulty: 'Intermediate', desc: 'Train a CNN to classify images into categories, deploy as a web API with a simple upload interface.', tech: ['Python', 'TensorFlow', 'FastAPI'] },
        { title: 'Recommendation Engine', difficulty: 'Intermediate', desc: 'Build a collaborative filtering recommender for movies/books using matrix factorization.', tech: ['Python', 'scikit-learn', 'Pandas'] },
        { title: 'Chatbot with RAG', difficulty: 'Advanced', desc: 'Build a chatbot that retrieves relevant documents and generates answers using retrieval-augmented generation.', tech: ['Python', 'LangChain', 'Vector DB'] },
        { title: 'Real-time Object Detection', difficulty: 'Advanced', desc: 'Deploy a YOLO-based object detection model that processes webcam feed in real-time.', tech: ['Python', 'PyTorch', 'OpenCV'] },
    ],
    devops: [
        { title: 'CI/CD Pipeline', difficulty: 'Beginner', desc: 'Set up a GitHub Actions pipeline that tests, builds, and deploys a Node.js app to a cloud server.', tech: ['GitHub Actions', 'Docker', 'Linux'] },
        { title: 'Infrastructure as Code', difficulty: 'Intermediate', desc: 'Provision a complete AWS environment (VPC, EC2, RDS) using Terraform modules.', tech: ['Terraform', 'AWS', 'Git'] },
        { title: 'Monitoring Stack', difficulty: 'Intermediate', desc: 'Deploy Prometheus, Grafana, and Alertmanager to monitor a microservices application.', tech: ['Prometheus', 'Grafana', 'Docker'] },
        { title: 'Kubernetes Cluster', difficulty: 'Advanced', desc: 'Set up a production-ready K8s cluster with ingress, autoscaling, secrets management, and backup.', tech: ['Kubernetes', 'Helm', 'cert-manager'] },
        { title: 'GitOps Deployment', difficulty: 'Advanced', desc: 'Implement GitOps with ArgoCD for automated deployments from Git to Kubernetes.', tech: ['ArgoCD', 'Kubernetes', 'Helm'] },
    ],
    mobile: [
        { title: 'Habit Tracker', difficulty: 'Beginner', desc: 'Build a mobile app to track daily habits with streaks, reminders, and statistics charts.', tech: ['React Native', 'AsyncStorage'] },
        { title: 'Expense Tracker', difficulty: 'Intermediate', desc: 'Create an expense tracker with categories, budgets, charts, and CSV export.', tech: ['React Native', 'SQLite', 'Charts'] },
        { title: 'Social Photo App', difficulty: 'Advanced', desc: 'Build a photo sharing app with camera, filters, feed, likes, comments, and push notifications.', tech: ['React Native', 'Firebase', 'Camera API'] },
    ],
    cybersecurity: [
        { title: 'Password Strength Checker', difficulty: 'Beginner', desc: 'Build a tool that evaluates password strength with visual feedback and suggestions.', tech: ['JavaScript', 'Regex', 'Entropy calculation'] },
        { title: 'Vulnerability Scanner', difficulty: 'Intermediate', desc: 'Create a scanner that checks websites for common vulnerabilities like missing headers, XSS, CSRF.', tech: ['Python', 'Requests', 'BeautifulSoup'] },
        { title: 'Network Monitor', difficulty: 'Advanced', desc: 'Build a real-time network traffic analyzer that detects anomalies and alerts on suspicious activity.', tech: ['Python', 'Scapy', 'Flask'] },
    ],
    fullstack: [
        { title: 'Blog Platform', difficulty: 'Intermediate', desc: 'Full-stack blog with markdown editor, comments, user auth, admin panel, and SEO optimization.', tech: ['React', 'Node.js', 'PostgreSQL'] },
        { title: 'E-commerce Store', difficulty: 'Advanced', desc: 'Complete online store with product catalog, cart, checkout, payment integration, and order management.', tech: ['Next.js', 'Stripe', 'PostgreSQL'] },
        { title: 'Project Management Tool', difficulty: 'Advanced', desc: 'Build a Trello-like project tool with boards, tasks, assignments, deadlines, and team collaboration.', tech: ['React', 'Node.js', 'MongoDB', 'WebSocket'] },
    ],
    'data-engineer': [
        { title: 'ETL Pipeline', difficulty: 'Intermediate', desc: 'Build an ETL pipeline that extracts data from APIs, transforms it, and loads into a data warehouse.', tech: ['Python', 'Airflow', 'PostgreSQL'] },
        { title: 'Real-time Dashboard', difficulty: 'Advanced', desc: 'Create a real-time analytics dashboard processing streaming data with Kafka and Spark.', tech: ['Kafka', 'Spark', 'Python'] },
    ],
    blockchain: [
        { title: 'Token Dashboard', difficulty: 'Intermediate', desc: 'Build a dashboard showing token balances, transaction history, and gas prices for Ethereum wallets.', tech: ['Solidity', 'Ethers.js', 'React'] },
        { title: 'NFT Marketplace', difficulty: 'Advanced', desc: 'Create an NFT marketplace with minting, listing, buying, and auction functionality.', tech: ['Solidity', 'IPFS', 'React'] },
    ],
    'game-dev': [
        { title: '2D Platformer', difficulty: 'Intermediate', desc: 'Build a 2D platformer game with player movement, enemies, collectibles, and level progression.', tech: ['JavaScript', 'Canvas API', 'Game loop'] },
        { title: 'Multiplayer Card Game', difficulty: 'Advanced', desc: 'Create a multiplayer card game with real-time gameplay, chat, and matchmaking.', tech: ['JavaScript', 'WebSocket', 'Canvas'] },
    ],
    'cloud-architect': [
        { title: 'Serverless API', difficulty: 'Intermediate', desc: 'Build a serverless REST API using AWS Lambda, API Gateway, DynamoDB, and Cognito.', tech: ['AWS Lambda', 'API Gateway', 'DynamoDB'] },
        { title: 'Multi-Region Architecture', difficulty: 'Advanced', desc: 'Design and implement a highly available multi-region architecture with failover and data replication.', tech: ['AWS', 'Route53', 'DynamoDB Streams'] },
    ],
};

function renderProjectIdeas(containerId, roadmapSlug) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const ideas = PROJECT_IDEAS[roadmapSlug] || [];

    if (ideas.length === 0) {
        container.innerHTML = `
            <div class="projects-empty">
                <div class="projects-empty-icon">🔨</div>
                <h4>Coming Soon</h4>
                <p>Project ideas for this roadmap are being curated.</p>
            </div>
        `;
        return;
    }

    let html = '<div class="project-ideas-grid">';
    ideas.forEach((idea, idx) => {
        html += `
            <div class="project-idea-card">
                <div class="project-idea-header">
                    <span class="challenge-badge ${idea.difficulty.toLowerCase()}">${idea.difficulty}</span>
                    <span class="project-idea-num">#${idx + 1}</span>
                </div>
                <h4 class="project-idea-title">${idea.title}</h4>
                <p class="project-idea-desc">${idea.desc}</p>
                <div class="project-idea-tech">
                    ${idea.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}
                </div>
            </div>
        `;
    });
    html += '</div>';
    container.innerHTML = html;
}
