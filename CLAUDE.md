# H9 Contract Work — Claude Code Instructions

This repo contains multiple projects for **H9 Partners**:

| Project | Path | Status |
|---------|------|--------|
| **IterateIQ** — Contract management platform | `IterateIQ/` (and root `IterateIQ_*` files) | v2.0 production spec |
| **H9 Hangars** — Zillow-equivalent for airplane hangars | `H9_Hangars/` | New (Apr 2026) — design system done; research plan + prototype next |
| **KCHD Developer Deep Dives** — Hangar market research | `KCHD_Developer_Deep_Dives_OFFICIAL/` | Research artifacts |
| **Riviera Aircraft Management Website** | `Riviera Aircraft Management Website/` | Client work |

## Design System

**H9 Hangars has a documented design system** at `H9_Hangars/DESIGN.md`.
Always read it before making any visual or UI decision for the hangar marketplace.
All font choices, colors, spacing, and aesthetic direction are defined there.
Do not deviate without explicit user approval.
In QA mode, flag any code that doesn't match `DESIGN.md`.

The H9 brand language (navy `#142338`, amber `#FF8C00`, cream `#FAF8F4`, Inter) also lives in:
- `kchd-market-dashboard.html` (KCHD market intelligence dashboard — original H9 brand reference)
- IterateIQ's H9 Design System (see `IterateIQ - Product Specification v2.docx` Section 10)

## Conventions across projects

- **Stack default:** React 18 + Vite + TypeScript, Supabase backend, Netlify deploy.
- **Brand anchor:** H9 navy/amber/cream + Inter (extend, don't replace).
- **Aviation conventions** (H9 Hangars only): airport codes in JetBrains Mono; hangar-spec data architecture per `H9_Hangars/DESIGN.md`.

## When suggesting next steps

- After design-consultation → suggest `/office-hours` (research plan) or `/plan-eng-review` (prototype architecture).
- After plan → suggest `/design-review` or build prototype.
- After prototype → suggest `/qa` then `/ship`.
