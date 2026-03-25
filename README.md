# C++ Tutor

A SvelteKit web app where students solve C++ programming problems with AI guidance. Students pick a problem, write code in a browser editor, and chat with a Claude-powered Socratic tutor that guides through hints and questions — without giving away answers.

## Tech Stack

- **Frontend:** SvelteKit 2, Svelte 5 (runes), Tailwind CSS 4, CodeMirror 6
- **Backend:** SvelteKit server routes, Anthropic Claude SDK (streaming)
- **Database:** Turso (LibSQL) in production, local SQLite fallback
- **ORM:** Drizzle ORM
- **Deployment:** Vercel (adapter-vercel)
- **Fonts:** Source Sans Pro, Inter, JetBrains Mono

## Features

- **Interactive Learn Section** — 16 structured lessons teaching C++ from scratch (output → file I/O), each with runnable code examples and "Try it yourself" exercises
- **Concept-Based Linking** — Lessons and problems are tagged with concepts; the app dynamically links "Practice these problems" at the end of each lesson
- **Socratic AI Tutor** — Claude guides students with questions and progressive hints (4 levels), never giving direct solutions
- **Code Execution** — Run C++ code in the browser via Wandbox (GCC 12.3), with stdin support, output panel, and F5 shortcut
- **Browser Code Editor** — CodeMirror 6 with C++ syntax highlighting, line numbers, and font size controls
- **28 Problems** — 5 English introductory problems (Hello World → Arrays) and 23 Romanian competitive programming problems
- **Progress Tracking** — Per-student stats, lesson completion, problem tracking, and automatic solve detection
- **Dark/Light Theme** — LeanProductivity-branded color palette with WCAG AA contrast compliance
- **Bilingual Support** — Tutor auto-detects language from the problem description and responds accordingly
- **Admin Panel** — Sync bundled content or upload new `.md`/`.pdf` problems at runtime
- **Mobile Responsive** — Tabbed layout on small screens for problem/editor/chat panels

## Getting Started

### Prerequisites

- Node.js 18+
- An [Anthropic API key](https://console.anthropic.com/)

### Setup

```bash
npm install
```

Create a `.env` file:

```env
ANTHROPIC_API_KEY=sk-ant-...

# Optional — omit for local SQLite
TURSO_DATABASE_URL=libsql://...
TURSO_AUTH_TOKEN=...
```

### Development

```bash
npm run dev          # Start dev server (localhost:5173)
npm run build        # Production build
npm run preview      # Preview production build locally
npm run check        # Type-check with svelte-check
```

## Content

Problem files live in `content/problems/*.md` using YAML frontmatter:

```yaml
---
title: 'Hello, World!'
difficulty: beginner        # beginner | easy | medium | hard
sort_order: 1
hints: [...]                # progressive hint strings
starter_code: |
  #include <iostream>
  ...
solution_notes: '...'
---
Markdown problem description here.
```

The filename becomes the URL slug (e.g., `01-hello-world.md` → `/tutor/01-hello-world`). Content is bundled at build time via Vite `import.meta.glob` and synced to the database on cold start.

## Routes

| Route | Purpose |
|-------|---------|
| `/` | Student selection and creation |
| `/learn` | Lesson curriculum with progress tracking |
| `/learn/[lessonSlug]` | Interactive lesson with runnable examples and exercises |
| `/problems` | Problem list with difficulty badges and progress |
| `/tutor/[problemId]` | Three-panel view: problem description, code editor, AI chat |
| `/progress` | Student stats dashboard |
| `/admin` | Content management (sync/upload) |
| `api/execute` | POST — compile and run C++ code via Wandbox |

## License

Private project.
