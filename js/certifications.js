// Certification Tracker — Track progress toward industry certifications
// Maps roadmap nodes to certification exam topics

const CERTIFICATIONS = [
  {
    id: "aws-sa",
    title: "AWS Solutions Architect Associate",
    provider: "Amazon",
    icon: "☁️",
    color: "#FF9900",
    roadmaps: ["cloud-architect", "devops"],
    requiredNodes: [
      { roadmap: "cloud-architect", nodeIds: ["cloud-fundamentals", "aws-core-ec2", "aws-core-s3", "aws-core-vpc", "aws-core-iam", "aws-core-lambda", "aws-networking", "aws-security", "iaas-paas-saas", "well-architected"] },
    ],
    totalStudyHours: 100,
    examCode: "SAA-C03",
    topics: ["Compute", "Storage", "Networking", "Security", "IAM", "Cost Management", "High Availability"]
  },
  {
    id: "aws-dev",
    title: "AWS Developer Associate",
    provider: "Amazon",
    icon: "🛠️",
    color: "#FF9900",
    roadmaps: ["devops", "cloud-architect"],
    requiredNodes: [
      { roadmap: "cloud-architect", nodeIds: ["aws-core-iam", "aws-core-lambda", "aws-core-s3", "api-gateway"] },
      { roadmap: "devops", nodeIds: ["docker", "ci-cd", "iac-terraform", "monitoring"] }
    ],
    totalStudyHours: 80,
    examCode: "DVA-C02",
    topics: ["Deployment", "Security", "Monitoring", "Troubleshooting", "CI/CD"]
  },
  {
    id: "gcp-cloud",
    title: "Google Cloud Associate Cloud Engineer",
    provider: "Google",
    icon: "🌐",
    color: "#4285F4",
    roadmaps: ["cloud-architect", "devops"],
    requiredNodes: [
      { roadmap: "cloud-architect", nodeIds: ["cloud-fundamentals", "iaas-paas-saas", "gcp-compute", "gcp-storage", "gcp-bigquery"] }
    ],
    totalStudyHours: 80,
    examCode: "ACE-GCE",
    topics: ["GCP Products", "Compute", "Storage", "Networking", "Security", "Pricing"]
  },
  {
    id: "cka",
    title: "Certified Kubernetes Administrator",
    provider: "CNCF",
    icon: "☸️",
    color: "#326CE5",
    roadmaps: ["devops"],
    requiredNodes: [
      { roadmap: "devops", nodeIds: ["docker", "kubernetes", "kubernetes-helm", "container-orchestration", "cloud-security", "monitoring", "networking"] }
    ],
    totalStudyHours: 120,
    examCode: "CKA-2024",
    topics: ["Cluster Architecture", "Workloads", "Networking", "Storage", "Security", "Troubleshooting"]
  },
  {
    id: "security-plus",
    title: "CompTIA Security+",
    provider: "CompTIA",
    icon: "🔐",
    color: "#C8102E",
    roadmaps: ["cybersecurity"],
    requiredNodes: [
      { roadmap: "cybersecurity", nodeIds: ["sec-networking", "sec-linux", "sec-web", "owasp", "cryptography", "wireless-security"] }
    ],
    totalStudyHours: 60,
    examCode: "SY0-701",
    topics: ["Threats", "Vulnerabilities", "Architecture", "Operations", "Security Program"]
  },
  {
    id: "ceh",
    title: "Certified Ethical Hacker",
    provider: "EC-Council",
    icon: "🎯",
    color: "#1A5276",
    roadmaps: ["cybersecurity"],
    requiredNodes: [
      { roadmap: "cybersecurity", nodeIds: ["sec-networking", "sec-web", "owasp", "cryptography", "penetration-testing", "malware-analysis", "forensics"] }
    ],
    totalStudyHours: 120,
    examCode: "312-50v13",
    topics: ["Reconnaissance", "Scanning", "Exploitation", "Web App Hacking", "Cryptography", "Cloud"]
  },
  {
    id: "terraform",
    title: "HashiCorp Terraform Associate",
    provider: "HashiCorp",
    icon: "🏗️",
    color: "#7B42BC",
    roadmaps: ["devops", "cloud-architect"],
    requiredNodes: [
      { roadmap: "devops", nodeIds: ["iac-terraform", "cloud-fundamentals", "iac-cloudformation"] }
    ],
    totalStudyHours: 40,
    examCode: "003",
    topics: ["IaC Concepts", "Terraform CLI", "Workflows", "State", "Modules", "Cloud Providers"]
  }
];

const CERT_STORAGE_KEY = 'devroadmaps_certifications';

// Get tracked certifications from localStorage
function getTrackedCerts() {
  try {
    const data = localStorage.getItem(CERT_STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
}

// Save tracking data
function saveTrackedCerts(data) {
  localStorage.setItem(CERT_STORAGE_KEY, JSON.stringify(data));
}

// Start tracking a certification
function startTracking(certId) {
  const tracked = getTrackedCerts();
  if (!tracked[certId]) {
    tracked[certId] = {
      startedAt: new Date().toISOString(),
      completedNodes: [],
      studyHours: 0
    };
    saveTrackedCerts(tracked);
  }
}

// Stop tracking a certification
function stopTracking(certId) {
  const tracked = getTrackedCerts();
  delete tracked[certId];
  saveTrackedCerts(tracked);
}

// Mark a node as studied for a cert
function markNodeStudied(certId, nodeId) {
  const tracked = getTrackedCerts();
  if (tracked[certId] && !tracked[certId].completedNodes.includes(nodeId)) {
    tracked[certId].completedNodes.push(nodeId);
    saveTrackedCerts(tracked);
  }
}

// Calculate completion percentage for a cert
function getCertProgress(certId) {
  const cert = CERTIFICATIONS.find(c => c.id === certId);
  const tracked = getTrackedCerts();
  if (!cert || !tracked[certId]) return 0;

  const totalRequired = cert.requiredNodes.reduce((sum, r) => sum + r.nodeIds.length, 0);
  const completed = tracked[certId].completedNodes.length;
  return Math.round((completed / totalRequired) * 100);
}

// Get all studied node IDs from progress
function getAllStudiedNodeIds() {
  const progress = getProgress();
  const studied = new Set();
  Object.values(progress).forEach(data => {
    data.completedNodes.forEach(id => studied.add(id));
  });
  return studied;
}

// Get progress for all certs
function getProgress() {
  return getTrackedCerts();
}

// Get study hours remaining for a cert
function getRemainingHours(certId) {
  const cert = CERTIFICATIONS.find(c => c.id === certId);
  const tracked = getTrackedCerts();
  if (!cert || !tracked[certId]) return cert ? cert.totalStudyHours : 0;

  const pct = getCertProgress(certId);
  const studied = Math.round(cert.totalStudyHours * pct / 100);
  return Math.max(0, cert.totalStudyHours - studied);
}

// Render certification cards
function renderCertifications(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const progress = getProgress();

  const html = `
    <div class="cert-grid">
      ${CERTIFICATIONS.map(cert => {
        const isTracking = !!progress[cert.id];
        const pct = getCertProgress(cert.id);
        const remaining = getRemainingHours(cert.id);
        const barColor = pct >= 80 ? '#22c55e' : pct >= 40 ? '#eab308' : '#6c63ff';

        return `
          <div class="cert-card ${isTracking ? 'tracking' : ''}" style="border-left: 4px solid ${cert.color}">
            <div class="cert-header">
              <span class="cert-icon">${cert.icon}</span>
              <div>
                <h3>${cert.title}</h3>
                <span class="cert-provider">${cert.provider} · ${cert.examCode}</span>
              </div>
            </div>
            <div class="cert-progress">
              <div class="cert-bar">
                <div class="cert-bar-fill" style="width: ${pct}%; background: ${barColor}"></div>
              </div>
              <div class="cert-stats">
                <span>${pct}% complete</span>
                <span>~${remaining}h remaining</span>
              </div>
            </div>
            <div class="cert-topics">
              ${cert.topics.map(t => `<span class="cert-topic">${t}</span>`).join('')}
            </div>
            <button class="cert-btn ${isTracking ? 'stop' : 'start'}"
                    onclick="toggleCert('${cert.id}')" style="background: ${cert.color}">
              ${isTracking ? '⏹ Stop Tracking' : '▶ Start Tracking'}
            </button>
          </div>`;
      }).join('')}
    </div>
  `;

  container.innerHTML = html;
}

// Toggle tracking
function toggleCert(certId) {
  const tracked = getTrackedCerts();
  if (tracked[certId]) {
    stopTracking(certId);
  } else {
    startTracking(certId);
  }
  renderCertifications('certifications');
}

// Export cert data
function exportCertProgress() {
  const progress = getProgress();
  const blob = new Blob([JSON.stringify(progress, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'cert-progress.json';
  a.click();
  URL.revokeObjectURL(url);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  renderCertifications('certifications');
});
