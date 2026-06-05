# DevRoadmaps Documentation

Welcome to the DevRoadmaps documentation.

## Guides

- [Data Format Guide](DATA_FORMAT.md) — JSON schema for roadmap files
- [Contributing Guide](../CONTRIBUTING.md) — How to contribute
- [Security Policy](../SECURITY.md) — Reporting vulnerabilities
- [Support](../SUPPORT.md) — Getting help

## Architecture

DevRoadmaps is a **static site** built with:
- **HTML5** — Semantic markup with structured data (JSON-LD)
- **CSS3** — Custom properties, glassmorphism, responsive
- **Vanilla JavaScript** — Zero dependencies, modular architecture

### Module Overview

| Module | File | Purpose |
|--------|------|---------|
| Core | `js/main.js` | Particles, roadmaps grid, viewer, theme |
| Community | `js/community.js` | Tips, ratings, filters |
| Learning Paths | `js/learning-paths.js` | Curated paths & bookmarks |
| Timer | `js/timer.js` | Pomodoro timer & achievements |
| Certifications | `js/certifications.js` | Certification tracker |
| Forum | `js/community-forum.js` | Discussion board |
| Share Card | `js/share-card.js` | Canvas progress cards |
| Command Palette | `js/command-palette.js` | Ctrl+K navigation |
| Daily Challenge | `js/daily-challenge.js` | Daily challenges & streaks |
| Notes | `js/notes.js` | Per-roadmap notes |
| Comparison | `js/comparison.js` | Roadmap comparison |
| Project Ideas | `js/project-ideas.js` | Project suggestions |
| Interview Prep | `js/interview-prep.js` | Interview Q&A |
| Data Export | `js/data-export.js` | Export/import data |
| Skill Radar | `js/skill-radar.js` | SVG radar chart |

### Data Flow

1. User opens `index.html` → roadmaps grid renders from `roadmaps/index.json`
2. User clicks a roadmap → `roadmap.html` loads the specific JSON file
3. Progress is tracked in `localStorage` (no server, no cookies)
4. All features (timer, notes, bookmarks, challenges) read/write to `localStorage`

### Deployment

Hosted on **GitHub Pages** via the `pages.yml` workflow. Deploys automatically on push to `main`.
