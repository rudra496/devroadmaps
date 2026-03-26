# Contributing to DevRoadmaps

Thank you for your interest in contributing! This guide will help you get started.

## How to Add a New Roadmap

1. Create a new JSON file in `roadmaps/` directory
2. Follow the JSON schema below
3. Add your roadmap to the `ROADMAPS` array in `js/main.js`
4. Test by opening `index.html` locally
5. Submit a pull request

## How to Add Nodes to an Existing Roadmap

1. Open the roadmap JSON file in `roadmaps/`
2. Add your node to the `nodes` array
3. Follow the node schema below
4. Submit a pull request

## JSON Schema

### Roadmap Structure
```json
{
  "title": "Roadmap Title",
  "description": "Brief description of the roadmap",
  "icon": "🗺️",
  "categories": ["fundamentals", "intermediate", "advanced", "tools"],
  "nodes": [...]
}
```

### Node Structure
```json
{
  "id": "unique-kebab-case-id",
  "title": "Node Title",
  "icon": "🔤",
  "category": "fundamentals",
  "description": "What this topic covers",
  "difficulty": "Beginner",
  "resources": [
    {
      "title": "Resource Title",
      "url": "https://example.com",
      "type": "docs",
      "free": true
    }
  ],
  "children": ["next-node-id"]
}
```

### Categories
- `fundamentals` — Core concepts (purple)
- `intermediate` — Intermediate topics (blue)
- `advanced` — Advanced topics (pink)
- `tools` — Tools and services (yellow)

### Resource Types
- `docs` — Documentation or written guide (📖)
- `video` — Video tutorial (🎥)
- `course` — Full course (🎯)
- `tool` — Tool or software (🔧)

## Resource Guidelines

✅ **Do:**
- Use permanent, stable URLs (official docs, MDN, freeCodeCamp)
- Prefer free resources
- Use well-known sources (YouTube channels like Traversy Media, Fireship)
- Verify URLs work before submitting
- Include 2-4 resources per node

❌ **Don't:**
- Link to paid/courses behind paywalls
- Use URL shorteners
- Link to content that requires login
- Use low-quality or spammy resources

## Pull Request Template

```
### What does this PR do?
[Describe your changes]

### Type of change
- [ ] Bug fix (broken link, typo)
- [ ] New node(s) added
- [ ] New roadmap added
- [ ] Design/styling improvement
- [ ] Documentation update

### Checklists
- [ ] All resource URLs are valid and working
- [ ] JSON files are valid
- [ ] Node IDs are unique and kebab-case
- [ ] Each node has 2-4 resources
- [ ] Tested locally
```

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on the technical content
- Help others learn and grow

Thank you for contributing to DevRoadmaps! 🎉
