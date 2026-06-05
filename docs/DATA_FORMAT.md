# Roadmap Data Format Guide

This document describes the JSON schema used for all roadmap data files in DevRoadmaps.

## File Location

All roadmap files are located in the `roadmaps/` directory. Each roadmap has its own JSON file (e.g., `frontend.json`, `backend.json`).

## Schema

### Root Object

```json
{
  "title": "Roadmap Title",
  "description": "Brief description of the roadmap",
  "icon": "emoji",
  "categories": ["fundamentals", "intermediate", "advanced", "tools"],
  "nodes": [...]
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | Yes | Display name of the roadmap |
| `description` | string | Yes | Short description shown on the card |
| `icon` | string | Yes | Emoji icon for the roadmap |
| `categories` | string[] | Yes | Ordered list of category names |
| `nodes` | Node[] | Yes | Array of topic nodes |

### Node Object

```json
{
  "id": "unique-kebab-case-id",
  "title": "Node Title",
  "icon": "emoji",
  "category": "fundamentals",
  "description": "What this topic covers",
  "difficulty": "Beginner",
  "resources": [...],
  "children": ["next-node-id"]
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | Yes | Unique kebab-case identifier |
| `title` | string | Yes | Display name of the topic |
| `icon` | string | Yes | Emoji icon |
| `category` | string | Yes | Must match one of the root `categories` |
| `description` | string | Yes | Brief explanation of the topic |
| `difficulty` | string | Yes | `"Beginner"`, `"Intermediate"`, or `"Advanced"` |
| `resources` | Resource[] | Yes | Array of 2-4 free learning resources |
| `children` | string[] | No | IDs of child/next nodes |

### Resource Object

```json
{
  "title": "Resource Title",
  "url": "https://example.com",
  "type": "docs",
  "free": true
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | Yes | Name of the resource |
| `url` | string | Yes | Valid HTTPS URL |
| `type` | string | Yes | `"docs"`, `"video"`, `"course"`, or `"tool"` |
| `free` | boolean | Yes | Must be `true` (paid resources not accepted) |

## Categories

| Category | Color | Description |
|----------|-------|-------------|
| `fundamentals` | Purple | Core concepts and basics |
| `intermediate` | Blue | Intermediate-level topics |
| `advanced` | Pink | Advanced and specialized topics |
| `tools` | Yellow | Tools, services, and platforms |

## Resource Types

| Type | Icon | Description |
|------|------|-------------|
| `docs` | 📖 | Documentation or written guide |
| `video` | 🎥 | Video tutorial |
| `course` | 🎯 | Full course |
| `tool` | 🔧 | Tool or software |

## Adding a New Roadmap

1. Create `roadmaps/your-roadmap.json` following the schema above
2. Add an entry to `roadmaps/index.json`
3. Update the roadmap table in `README.md`
4. Test by opening `index.html` locally
5. Submit a pull request

## Validation

All roadmap JSON files are validated during CI. Ensure:
- Valid JSON syntax
- All required fields present
- Unique node IDs (no duplicates)
- Valid URLs for all resources
- Categories match the root `categories` array
