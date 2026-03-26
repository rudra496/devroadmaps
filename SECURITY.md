# Security Policy

## Supported Versions

We take security seriously and will address vulnerabilities promptly.

| Version | Supported          |
| ------- | ------------------ |
| latest  | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability, please report it responsibly:

1. **Do NOT** open a public issue for security vulnerabilities.
2. Email us at [INSERT SECURITY EMAIL] with the subject line `[Security] Vulnerability Report`.
3. Include as much detail as possible: steps to reproduce, affected components, potential impact.
4. We will acknowledge receipt within 48 hours and aim to resolve within 7 days.

## What We Consider a Vulnerability

- Cross-site scripting (XSS)
- Cross-site request forgery (CSRF)
- Insecure data storage (localStorage)
- Broken authentication/authorization
- Content injection via roadmap JSON files
- Supply chain attacks via CDN dependencies
- Information disclosure

## Our Security Practices

- **No server-side components** — this is a static site (HTML/CSS/JS only)
- **No user data collection** — all data stored in browser localStorage
- **No cookies or tracking** — no analytics, no third-party cookies
- **Content Security Policy** — recommended for hosting (see below)
- **No build tools or dependencies** — no npm packages, no supply chain risk
- **JSON validation** — roadmap JSON files are validated on load

## Recommendations for Hosting

When deploying DevRoadmaps, we recommend:

```nginx
# Content Security Policy headers
Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' https://fonts.gstatic.com; connect-src 'self';
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
```

## Third-Party Resources

Roadmap data contains links to external educational resources. We do not control the content of these external sites. Users should exercise caution when visiting external links.

## Data Privacy

- All user data (progress, bookmarks, ratings, tips) is stored in `localStorage` on the user's device
- No data is transmitted to any server
- Clearing browser data removes all user data
- We have no access to any user's learning data

## Acknowledgments

We follow responsible disclosure practices. Security researchers who responsibly report vulnerabilities will be credited in our release notes.
