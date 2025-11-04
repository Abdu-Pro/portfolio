<!--
  Auto-generated guidance for AI coding agents working in this repository.
  NOTES:
  - The workspace was initially empty; this document contains concise,
    discoverable heuristics and concrete search examples an agent should
    use to become productive once files are added.
  - When repository files are present, prefer concrete references (paths,
    configuration keys) instead of these heuristic rules; update this file
    by merging existing content if one already exists.
-->

# Copilot / AI agent instructions (short & actionable)

Purpose: help an AI agent quickly infer project structure, dev workflows,
and integration points so it can safely make edits, generate features, and
write tests.

Key assumptions
- The instructions below are intentionally prescriptive and tied to
  *discoverable* files. Apply a rule only if the referenced file/folder
  exists in the repository.

Quick start (what to do first)
- Search for these files/paths and read them if present: `README.md`,
  `package.json`, `pyproject.toml`, `requirements.txt`, `setup.py`,
  `Dockerfile`, `Makefile`, `.github/workflows/**`, `src/`, `app/`, `server/`,
  `pages/`, `public/`, `components/`, `pkg/`, `packages/`.
- If `package.json` exists: prefer Node/npm flows (install -> test -> build).
  Example (PowerShell):
  - `npm ci; npm test` or `npm ci; npm run build` if a `build` script exists.
- If `pyproject.toml` or `requirements.txt` exists: prefer Python venv flows.
  Example (PowerShell):
  - `python -m venv .venv; .\\.venv\\Scripts\\Activate.ps1; pip install -r requirements.txt; pytest`

How to infer architecture and service boundaries
- Look for top-level directories named `api`, `server`, `backend`, `functions`,
  or `services` — treat these as backend/service boundaries.
- `pages/api` (or `app/api`) indicates Next.js serverless API routes.
- `packages/*` or `workspace:` entries in `package.json` indicate a monorepo.
- Presence of `Dockerfile` + `docker-compose.yml` suggests containerized
  services — check service names in compose to map boundaries.

Project-specific conventions to check (apply only when files exist)
- Tests: look for `__tests__`, `tests/`, `spec/`. If `jest` is in
  `package.json` use `npm test`; if `pytest` is present use `pytest`.
- Typescript: `tsconfig.json` present -> prefer `.ts`/`.tsx` and respect
  `paths` mappings during import fixes.
- Linting/formatting: prefer project configs in `.eslintrc*`, `.prettierrc`,
  or `pyproject.toml`[tool.black]. Use them for edits rather than global rules.

Integration points & external dependencies
- Look in `package.json`/`requirements.txt` for third-party services (e.g.
  `@aws-sdk`, `stripe`, `firebase`, `pg`, `.env` usage). If secrets are
  referenced in code, don't attempt to access or create them — report them.
- Check `.github/workflows` for CI steps — these show canonical build/test
  commands and matrix/os details. Follow the workflow's commands for local
  reproduction.

Editing & commit guidance for agents
- If `.github/copilot-instructions.md` already exists, merge by preserving
  any repo-specific lines. Append new heuristics under a clearly labeled
  'AI-updated' section. Keep the file concise (20–50 lines total ideally).
- When adding code, prefer minimal, well-tested changes. Run the project's
  test command locally before committing. Commit messages should be concise
  and reference the ticket/issue when present.

Examples of concrete searches to run (copy/paste)
- Find the project's entry point: `git grep -n "(main|app|createServer|listen)" || ls -Name src, app, server`
- Find configs: `git ls-files "**/package.json" "**/pyproject.toml" "**/.github/workflows/**"`

If you need more context
- Ask the human for: (1) the intended framework (React/Next/Express/Flask/etc),
  (2) what commands they use locally to run/build/tests, and (3) any CI
  secrets or external services you should be aware of.

Next step for a human reviewer
- Tell me what framework or files you expect to be in this repo (or push
  a small sample), and I will update these instructions to include concrete
  file references and exact commands.

----
Generated on: 2025-11-02
