# Contributing to DevRoadmaps 🎉

Thank you for your interest in contributing! DevRoadmaps is community-driven and your help makes it better for everyone.

## How to Contribute

### 1. Add Resources to an Existing Roadmap

1. Open the roadmap JSON file in `roadmaps/`
2. Find the node you want to add resources to
3. Add a new resource object to the `resources` array:
   ```json
   {
     "title": "Resource Name",
     "url": "https://example.com",
     "type": "docs|course|video|interactive|tools",
     "free": true
   }
   ```
4. **Important:** Only add resources that are:
   - ✅ Free (no paywall, no sign-up required)
   - ✅ From reputable sources
   - ✅ Directly relevant to the topic
   - ✅ Accessible (URL works)

### 2. Add a New Roadmap

1. Create a new JSON file in `roadmaps/` (e.g., `roadmaps/devops.json`)
2. Follow the schema below
3. Include 25-50 nodes minimum
4. Each node should have 2-3 free resources
5. Open a pull request

### 3. Fix Errors

Found a broken link or typo? Open a PR with the fix.

## JSON Schema

```json
{
  "id": "unique-slug",
  "title": "Roadmap Title",
  "description": "A clear description of the roadmap",
  "icon": "🎨",
  "color": "#hexcolor",
  "time": "6-12 months",
  "difficulty": "Beginner to Advanced",
  "nodes": [
    {
      "id": "unique-node-id",
      "title": "Node Title",
      "icon": "📌",
      "category": "fundamentals|tools|frameworks|testing|deployment|advanced|databases|security|ai|cloud|devops|design|business",
      "description": "What to learn and why it matters",
      "resources": [
        {
          "title": "Resource Title",
          "url": "https://example.com",
          "type": "docs|course|video|interactive|tools",
          "free": true
        }
      ],
      "children": ["next-node-id"]
    }
  ],
  "connections": [["node-id-1", "node-id-2"]]
}
```

### Field Reference

| Field | Required | Description |
|-------|----------|-------------|
| `id` | ✅ | Unique slug (kebab-case) |
| `title` | ✅ | Display title |
| `icon` | ✅ | Single emoji |
| `category` | ✅ | One of the predefined categories |
| `description` | ✅ | 1-2 sentences explaining the topic |
| `resources` | ✅ | Array of 2-3 free resource objects |
| `children` | ✅ | Array of next node IDs (can be empty `[]`) |

### Valid `type` values for resources
- `docs` — Documentation or reference material
- `course` — Structured course or tutorial series
- `video` — Video content (YouTube, etc.)
- `interactive` — Interactive tutorial or playground
- `tools` — Tools or software

### Valid `category` values
`fundamentals`, `tools`, `frameworks`, `testing`, `deployment`, `advanced`, `databases`, `security`, `ai`, `cloud`, `devops`, `design`, `business`, `default`

## PR Template

```
## Description
[Brief description of changes]

## Type
- [ ] Added resources to existing roadmap
- [ ] Created new roadmap
- [ ] Fixed broken link
- [ ] Fixed typo/error
- [ ] Improved design/code

## Changes
[List specific changes]

## Checklist
- [ ] All URLs are valid and free
- [ ] JSON is valid (no syntax errors)
- [ ] Node IDs are unique within the roadmap
- [ ] Resources are from reputable sources
```

## Guidelines

1. **Quality over quantity** — A few great resources > many mediocre ones
2. **Verify URLs** — Make sure every link works before submitting
3. **Free only** — No paid courses, no premium content, no paywalls
4. **Be descriptive** — Good descriptions help learners understand context
5. **Logical flow** — Nodes should build on each other in a logical learning path

## Need Help?

Open an issue and we'll help you get started! 🙌
