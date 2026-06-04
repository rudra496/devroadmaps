/* ========================================
   DevRoadmaps — Interview Prep
   Curated interview questions per roadmap
   ======================================== */

const INTERVIEW_QUESTIONS = {
    frontend: [
        { q: 'Explain the difference between == and === in JavaScript.', a: '== performs type coercion before comparison, while === checks both value and type without coercion. Always prefer === for predictable comparisons.', difficulty: 'Beginner' },
        { q: 'What is the Virtual DOM and why is it used?', a: 'The Virtual DOM is a lightweight JavaScript representation of the real DOM. Libraries like React use it to batch DOM updates efficiently by computing the minimal set of changes needed.', difficulty: 'Intermediate' },
        { q: 'Explain CSS Box Model and box-sizing: border-box.', a: 'The box model consists of content, padding, border, and margin. box-sizing: border-box includes padding and border in the element total width/height, making layout calculations easier.', difficulty: 'Beginner' },
        { q: 'What are closures in JavaScript?', a: 'A closure is a function that retains access to variables from its outer scope even after the outer function has returned. Closures enable data privacy and function factories.', difficulty: 'Intermediate' },
        { q: 'How does event delegation work?', a: 'Event delegation attaches a single event listener to a parent element instead of individual listeners on each child. Events bubble up from the target to the parent, where the handler checks event.target.', difficulty: 'Intermediate' },
    ],
    backend: [
        { q: 'What is the difference between REST and GraphQL?', a: 'REST uses multiple endpoints for different resources, while GraphQL uses a single endpoint where clients specify exactly what data they need. REST is simpler for caching; GraphQL reduces over-fetching.', difficulty: 'Intermediate' },
        { q: 'Explain database normalization.', a: 'Normalization organizes data to reduce redundancy. 1NF eliminates repeating groups, 2NF removes partial dependencies, 3NF removes transitive dependencies. Higher normal forms exist for complex cases.', difficulty: 'Intermediate' },
        { q: 'What is JWT and how does authentication work?', a: 'JWT (JSON Web Token) is a signed token containing user claims. The server issues it on login, the client sends it in subsequent requests, and the server verifies the signature without database lookup.', difficulty: 'Beginner' },
        { q: 'How would you handle rate limiting?', a: 'Use algorithms like Token Bucket or Sliding Window. Store counters in Redis per user/IP. Return 429 status when limit exceeded. Include Retry-After and X-RateLimit headers.', difficulty: 'Advanced' },
        { q: 'Explain CAP theorem.', a: 'CAP theorem states that a distributed system can guarantee only 2 of 3 properties: Consistency, Availability, Partition tolerance. Choose based on use case: CP for banking, AP for social media.', difficulty: 'Advanced' },
    ],
    devops: [
        { q: 'What is Infrastructure as Code (IaC)?', a: 'IaC manages infrastructure through machine-readable configuration files rather than manual processes. Tools like Terraform and CloudFormation enable version control, testing, and automation of infrastructure.', difficulty: 'Beginner' },
        { q: 'Explain Docker vs Virtual Machines.', a: 'Docker containers share the host OS kernel and are lightweight. VMs include a full OS and hypervisor. Containers start faster, use less resources, but VMs provide stronger isolation.', difficulty: 'Beginner' },
        { q: 'What is a blue-green deployment?', a: 'Blue-green deployment maintains two identical environments. Traffic switches from blue (current) to green (new version) after testing. Enables instant rollback by switching back.', difficulty: 'Intermediate' },
        { q: 'How does Kubernetes handle service discovery?', a: 'Kubernetes creates DNS entries for Services. Pods can reach other services by name. kube-proxy manages network rules for load balancing across pod replicas.', difficulty: 'Advanced' },
    ],
    'ml-ai': [
        { q: 'What is overfitting and how to prevent it?', a: 'Overfitting occurs when a model memorizes training data but fails on new data. Prevention: regularization (L1/L2), dropout, early stopping, cross-validation, more training data, simpler model.', difficulty: 'Beginner' },
        { q: 'Explain bias-variance tradeoff.', a: 'Bias is error from wrong assumptions (underfitting). Variance is sensitivity to training data (overfitting). The goal is to find the sweet spot that minimizes total error on unseen data.', difficulty: 'Intermediate' },
        { q: 'What is transfer learning?', a: 'Transfer learning reuses a pre-trained model on a new task. The model learned features from a large dataset are fine-tuned on a smaller domain-specific dataset, saving time and data.', difficulty: 'Intermediate' },
    ],
    cybersecurity: [
        { q: 'Explain the OWASP Top 10.', a: 'OWASP Top 10 includes: Injection, Broken Auth, Sensitive Data Exposure, XML External Entities, Broken Access Control, Security Misconfiguration, XSS, Insecure Deserialization, Using Components with Known Vulns, Insufficient Logging.', difficulty: 'Beginner' },
        { q: 'What is the difference between symmetric and asymmetric encryption?', a: 'Symmetric uses the same key for encryption and decryption (AES). Asymmetric uses a key pair — public for encryption, private for decryption (RSA). Symmetric is faster; asymmetric enables secure key exchange.', difficulty: 'Intermediate' },
        { q: 'How does a CSRF attack work and how to prevent it?', a: 'CSRF tricks a logged-in user into making unintended requests. Prevention: CSRF tokens, SameSite cookies, checking Origin/Referer headers, requiring re-authentication for sensitive actions.', difficulty: 'Intermediate' },
    ],
};

function renderInterviewPrep(containerId, roadmapSlug) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const questions = INTERVIEW_QUESTIONS[roadmapSlug] || [];

    if (questions.length === 0) {
        container.innerHTML = `
            <div class="interview-empty">
                <div class="interview-empty-icon">🎤</div>
                <h4>Coming Soon</h4>
                <p>Interview questions for this roadmap are being curated.</p>
            </div>
        `;
        return;
    }

    let html = '<div class="interview-questions">';
    questions.forEach((item, idx) => {
        html += `
            <div class="interview-card" id="iq-${idx}">
                <div class="interview-card-header">
                    <span class="challenge-badge ${item.difficulty.toLowerCase()}">${item.difficulty}</span>
                    <span class="interview-num">Q${idx + 1}</span>
                </div>
                <h4 class="interview-question">${item.q}</h4>
                <div class="interview-answer" style="display:none">
                    <p>${item.a}</p>
                </div>
                <button class="btn btn-sm" onclick="toggleInterviewAnswer(${idx})">👁️ Show Answer</button>
            </div>
        `;
    });
    html += '</div>';
    container.innerHTML = html;
}

function toggleInterviewAnswer(idx) {
    const card = document.getElementById(`iq-${idx}`);
    if (!card) return;
    const answer = card.querySelector('.interview-answer');
    const btn = card.querySelector('button');
    if (answer.style.display === 'none') {
        answer.style.display = 'block';
        btn.textContent = '🙈 Hide Answer';
    } else {
        answer.style.display = 'none';
        btn.textContent = '👁️ Show Answer';
    }
}
