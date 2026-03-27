# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

A SvelteKit C++ tutoring app where students solve programming problems with AI guidance. Students pick a problem, write C++ code in a browser editor, and chat with a Claude-powered Socratic tutor that guides without giving answers.

## Commands

```bash
npm run dev          # Start dev server (localhost:5173)
npm run build        # Production build (Vercel adapter)
npm run preview      # Preview production build locally
npm run check        # Type-check with svelte-check
```

No test framework or linter is configured.

## Architecture

**Stack:** SvelteKit 2 + Svelte 5 (runes), Turso/LibSQL + Drizzle ORM, Anthropic Claude SDK, CodeMirror 6, Tailwind CSS 4, deployed via adapter-vercel.

### Content Pipeline

Problem content lives in `content/problems/*.md` as YAML frontmatter + markdown body. At **build time**, Vite `import.meta.glob` bundles all markdown files as strings into the JS output (no filesystem access at runtime). On **cold start**, `hooks.server.ts` calls `initDb()` (DDL) then `syncMarkdownFiles()` which parses frontmatter via gray-matter and upserts each problem to the DB by slug.

Content can also be added at runtime via the admin panel (`/admin`) — upload `.md` or `.pdf` files through the API.

### Database

Turso (remote LibSQL) in production, falls back to local SQLite (`file:data/cpp-tutor.db`) when `TURSO_DATABASE_URL` is empty. Schema is defined in `src/lib/server/schema.ts` with 6 tables: students, problems, student_progress, conversations, messages, urlCredentials. Tables are created via `CREATE TABLE IF NOT EXISTS` in `initDb()` — no migration files needed.

The DB client uses a lazy-init Proxy pattern in `src/lib/server/db.ts` to avoid module-scope errors on Vercel.

### AI Tutor

`src/lib/server/tutor.ts` streams Claude Sonnet 4 responses via `ReadableStream`. The system prompt enforces Socratic method: guide with questions, never give solutions, 4-level hint escalation, max 3-5 lines of code. Responses containing `[PROBLEM_SOLVED]` trigger automatic progress tracking. The tutor auto-detects language (English/Romanian) from the problem description.

### Key Routes

| Route | Purpose |
|-------|---------|
| `/` | Student selection/creation (cookie-based sessions) |
| `/problems` | Problem list with difficulty badges and progress |
| `/tutor/[problemId]` | Three-panel view: problem description, CodeMirror editor, AI chat |
| `/progress` | Student stats dashboard |
| `/admin` | Content management (sync/upload) |
| `api/chat` | POST — streams AI tutor response, persists messages |
| `api/students` | POST/PUT — create or select student |
| `api/content/sync` | POST — rescan bundled markdown |
| `api/content/upload` | POST — upload .md/.pdf files |

### Problem Content Format

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

Filename becomes the slug (e.g., `01-hello-world.md` → slug `01-hello-world`). Missing frontmatter fields get sensible defaults via `normalizeMarkdown()`.

## Environment Variables

| Variable | Required | Purpose |
|----------|----------|---------|
| `ANTHROPIC_API_KEY` | Yes | Claude API for tutoring |
| `TURSO_DATABASE_URL` | No | Turso DB URL (empty = local SQLite fallback) |
| `TURSO_AUTH_TOKEN` | No | Turso auth (required if URL is set) |

## Bilingual Content

The app has 5 English introductory problems, 23 Romanian competitive programming problems, and 16 English interactive lessons. The tutor auto-detects and responds in the problem's language.

## Learn Section

Interactive lessons live in `content/lessons/*.md` with frontmatter fields: title, slug, sort_order, concepts, summary, estimated_minutes, prev_lesson, next_lesson. Lessons use `<!-- run -->` markers for runnable code examples and `<!-- exercise -->` / `<!-- /exercise -->` markers for try-it-yourself blocks. Both lessons and problems have `concepts` arrays that enable dynamic cross-linking.

## Agile Artifacts

Epics, User Stories, NFRs, and Test Cases live in `D:\Lean Notes\01 Projects\CPP Tutor\`. Artifact files use Obsidian Flavored Markdown with YAML frontmatter. Tags use `cpptutor/` prefix (e.g., `cpptutor/userStory`, `cpptutor/epic`).
