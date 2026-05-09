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
      { roadmap: "cloud-architect", nodeIds: ["cloud-fundamentals", "cloud-iaas-paas-saas", "cloud-aws-core", "cloud-aws-advanced", "cloud-networking", "cloud-security", "cloud-well-architected", "cloud-storage", "cloud-database", "cloud-identity"] },
      { roadmap: "devops", nodeIds: ["dev-aws-core", "dev-aws-advanced", "dev-aws-s3", "dev-aws-ec2", "dev-aws-lambda"] }
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
      { roadmap: "cloud-architect", nodeIds: ["cloud-aws-core", "cloud-serverless", "cloud-storage", "cloud-api-gateway", "cloud-identity"] },
      { roadmap: "devops", nodeIds: ["dev-docker", "dev-ghactions", "dev-terraform", "dev-prometheus", "dev-aws-lambda"] }
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
      { roadmap: "cloud-architect", nodeIds: ["cloud-fundamentals", "cloud-iaas-paas-saas", "cloud-gcp", "cloud-storage", "cloud-networking"] },
      { roadmap: "devops", nodeIds: ["dev-gcp", "dev-gcp-compute"] }
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
      { roadmap: "devops", nodeIds: ["dev-docker", "dev-k8s", "dev-helm", "dev-istio", "dev-prometheus", "dev-networking", "dev-troubleshooting"] }
    ],
    totalStudyHours: 120,
    examCode: "CKA",
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
      { roadmap: "cybersecurity", nodeIds: ["sec-networking", "sec-linux", "sec-web-fundamentals", "sec-owasp", "sec-crypto", "sec-wireless", "sec-identity"] }
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
      { roadmap: "cybersecurity", nodeIds: ["sec-networking", "sec-web-fundamentals", "sec-owasp", "sec-crypto", "sec-pentest", "sec-malware", "sec-forensics"] }
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
      { roadmap: "devops", nodeIds: ["dev-terraform", "dev-aws-core"] },
      { roadmap: "cloud-architect", nodeIds: ["cloud-iac", "cloud-fundamentals"] }
    ],
    totalStudyHours: 40,
    examCode: "003",
    topics: ["IaC Concepts", "Terraform CLI", "Workflows", "State", "Modules", "Cloud Providers"]
  }
];

const CERT_STORAGE_KEY = 'devroadmaps_certifications';

function getTrackedCerts() {
  try {
    const data = localStorage.getItem(CERT_STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
}

function saveTrackedCerts(data) {
  localStorage.setItem(CERT_STORAGE_KEY, JSON.stringify(data));
}

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

function stopTracking(certId) {
  const tracked = getTrackedCerts();
  delete tracked[certId];
  saveTrackedCerts(tracked);
}

function getCertProgress(certId) {
  const cert = CERTIFICATIONS.find(c => c.id === certId);
  const tracked = getTrackedCerts();
  if (!cert || !tracked[certId]) return 0;

  const totalRequired = cert.requiredNodes.reduce((sum, r) => sum + r.nodeIds.length, 0);
  const completed = tracked[certId].completedNodes.length;
  return Math.round((completed / totalRequired) * 100);
}

function getRemainingHours(certId) {
  const cert = CERTIFICATIONS.find(c => c.id === certId);
  const tracked = getTrackedCerts();
  if (!cert || !tracked[certId]) return cert ? cert.totalStudyHours : 0;

  const pct = getCertProgress(certId);
  const studied = Math.round(cert.totalStudyHours * pct / 100);
  return Math.max(0, cert.totalStudyHours - studied);
}

function renderCertifications(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const progress = getTrackedCerts();

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
              ${isTracking ? 'Stop Tracking' : 'Start Tracking'}
            </button>
          </div>`;
      }).join('')}
    </div>
  `;

  container.innerHTML = html;
}

function toggleCert(certId) {
  const tracked = getTrackedCerts();
  if (tracked[certId]) {
    stopTracking(certId);
  } else {
    startTracking(certId);
  }
  renderCertifications('certifications');
}

document.addEventListener('DOMContentLoaded', () => {
  renderCertifications('certifications');
});
