# IterateIQ Design System

Locked design system for the IterateIQ v3 React + Vite + TypeScript + Tailwind + Supabase build. Extracted from the partner-approved MVP at [IterateIQ_MVP.html](IterateIQ_MVP.html) and reviewed via `/plan-design-review` on 2026-05-06.

**Posture:** This document is the source of truth. The implementer reads this before reaching for shadcn defaults. When in doubt, match what's in `IterateIQ_MVP.html` — partners already approved it.

---

## 1. Brand Foundation

| | |
|---|---|
| **Product** | IterateIQ — Contract Management Platform |
| **Audience** | Internal H9 Partners team (6 named users): George Sumner, Jon Whitney, Chris Donovan, Daniel Hernandez, Jacob H., Chuy Hernandez |
| **Tone** | Professional, calm, confident. No happy talk. No emoji as decoration. |
| **Density** | Information-dense by design. Partners need to see status at a glance. |

---

## 2. Color Tokens

All colors as Tailwind tokens. Use the named tokens, never raw hex.

### Brand
```ts
navy:    { DEFAULT: '#142338', deep: '#0f1f30', light: '#1e3a5f' }
amber:   { DEFAULT: '#FF8C00', soft: '#FFB347', wash: '#FFF8F0', dark: '#E07B00' }
cream:   { DEFAULT: '#FAF8F4', dark: '#EFE9DD' }
```

### Surface
```ts
surface: { DEFAULT: '#FFFFFF', muted: '#F8FAFC', sunken: '#F0F4F8' }
border:  { DEFAULT: '#E8ECF0', strong: '#CBD5E1' }
ink:     '#1a1a2e'  // canonical body text — distinct from navy
```

**Note on the navy/ink distinction:** `navy` is for surfaces (sidebar background, dark cards). `ink` (`#1a1a2e`) is for body text on light surfaces. Both are "dark navy" but serve different roles. The MVP used them interchangeably — the React port must not.

### Text
```ts
text: {
  primary:   '#1a1a2e',  // headings, body, primary content
  secondary: '#4B5563',  // descriptions, supporting text
  muted:     '#6B7280',  // metadata, captions, timestamps
  faint:     '#9CA3AF',  // placeholders, disabled, deemphasized
}
```

### Semantic States
```ts
success: { DEFAULT: '#16a34a', light: '#F0FDF4', dark: '#15803d' }
warning: { DEFAULT: '#f59e0b', light: '#FFFBEB', dark: '#92400e' }
danger:  { DEFAULT: '#dc2626', light: '#FEF2F2', dark: '#991b1b' }
info:    { DEFAULT: '#0ea5e9', light: '#EFF6FF', dark: '#0284c7' }
```

**Rule:** Status pills, alerts, and contextual color always use semantic tokens, never raw hex. New components needing color must use one of these.

---

## 3. Typography

### Font Families

```ts
fontFamily: {
  body:    ['Inter', 'system-ui', 'sans-serif'],   // primary — all body text
  display: ['Geologica', 'sans-serif'],            // logo, hero numbers, brand moments
  mono:    ['JetBrains Mono', 'monospace'],        // version badges, code, IDs
}
```

**Inter** is the default body font, matching the H9 brand standard in CLAUDE.md. The MVP loaded Geologica but never used it for body text; the React port aligns body to the documented H9 system.

### Type Scale

```ts
fontSize: {
  xxs:  ['9px',  { lineHeight: '12px', letterSpacing: '0.13em' }],  // section labels, status text
  xs:   ['11px', { lineHeight: '14px' }],                            // metadata, captions
  sm:   ['12px', { lineHeight: '16px' }],                            // table content, secondary
  base: ['13px', { lineHeight: '18px' }],                            // body, list items, buttons
  md:   ['14px', { lineHeight: '20px' }],                            // form inputs, primary content
  lg:   ['17px', { lineHeight: '22px' }],                            // page titles, card headers
  xl:   ['20px', { lineHeight: '26px' }],                            // sidebar logo, dashboard headers
  '2xl':['22px', { lineHeight: '28px' }],                            // hero stats
  '3xl':['28px', { lineHeight: '34px' }],                            // welcome banners
}
```

### Weight Conventions

| Weight | Use |
|---|---|
| 400 (regular) | Body paragraphs, descriptions |
| 500 (medium) | Form labels, secondary buttons |
| 600 (semibold) | Active nav items, emphasized inline text |
| 700 (bold) | Card titles, table headers, primary buttons |
| 800 (extrabold) | Hero numbers, page titles, brand logo |

### Letter-spacing Convention

- Section labels (`text-xxs`, ALL CAPS): `letter-spacing: 0.13em`
- Status pills: `letter-spacing: 0.07em`
- Body: default

---

## 4. Spacing Scale

Tailwind defaults (4px base). Use the scale below; do not introduce one-off pixel values.

| Token | Value | Use |
|---|---|---|
| `1` | 4px | Tight inline spacing, icon gaps |
| `2` | 8px | Form field internal padding |
| `2.5` | 10px | Compact button padding-y |
| `3` | 12px | Standard list-item padding-y |
| `3.5` | 14px | Card body padding-y |
| `4` | 16px | Section padding |
| `5` | 20px | Card body padding |
| `6` | 24px | Major section gaps |
| `7` | 28px | Page padding |

---

## 5. Border Radius

```ts
borderRadius: {
  sm:    '6px',     // small chips, status pills
  md:    '8px',     // buttons, inputs
  lg:    '10px',    // dropdowns, attach zones
  xl:    '14px',    // cards
  '2xl': '20px',    // modals, login card
  full:  '9999px',  // avatars, status dots
}
```

---

## 6. Shadows

Only the shadows the MVP actually uses. Don't add more.

```ts
boxShadow: {
  card:       '0 4px 18px rgba(0,0,0,0.06)',
  cardHover:  '0 4px 22px rgba(0,0,0,0.09)',
  amber:      '0 4px 16px rgba(255,140,0,0.12)',
  modal:      '0 24px 64px rgba(0,0,0,0.30)',
  focusAmber: '0 0 0 3px rgba(255,140,0,0.10)',
}
```

---

## 7. Component Library

**Stack:** [shadcn/ui](https://ui.shadcn.com) on top of Radix primitives, themed with the tokens above.

**Rule:** Every shadcn component must be themed before use. Do not ship a component that reads as "shadcn default" (purple ring, Inter-only typography on a generic surface). The cream background + navy sidebar + amber accent is what makes IterateIQ recognizably IterateIQ.

**Anti-pattern checklist** (from `/plan-design-review` AI Slop blacklist):
- ❌ No purple/violet/indigo gradients
- ❌ No 3-column feature grid with icon-in-colored-circle
- ❌ No centered-everything layouts (left-align body, center only headings + status)
- ❌ No decorative blobs, floating circles, wavy SVG dividers
- ❌ No emoji as design elements (`📭`, `🔍` etc. in empty states — replace with lucide-react icons)
- ❌ No colored left-border on cards as ornament (only when it semantically encodes status)

---

## 8. Layout Primitives

### App Shell

```
┌──────────┬──────────────────────────────────────────────┐
│          │  TOPBAR (sticky, white, 60px)                 │
│ SIDEBAR  ├──────────────────────────────────────────────┤
│ (238px,  │                                              │
│  navy)   │  CONTENT (cream bg, 28px padding)            │
│          │                                              │
│          │                                              │
└──────────┴──────────────────────────────────────────────┘
```

- **Sidebar:** fixed 238px, navy background, scrollable. Includes brand, primary nav, contract-nav (contractor view), user footer.
- **Topbar:** sticky, white, 60px tall, 28px horizontal padding. Holds page title, page-specific actions, share controls.
- **Content:** cream background, 22-28px padding, scrollable independently.

### Responsive Strategy

**Desktop-first, tablet-acceptable.** Lock at ≥1024px primary. Layout must remain usable down to 768px (tablet). **No mobile-specific layout for v3** — partners use IterateIQ at their desks.

Below 768px:
- Allow horizontal scroll on the main content area
- Sidebar may collapse to icon-only or hidden behind hamburger (deferred to v3.1)

This is an intentional scope cut. If partner usage patterns change post-launch, mobile is a v3.1 task.

---

## 9. Interaction State Coverage

Every feature must specify these 5 states. The MVP misses many of these — the React port closes the gap.

| State | Spec |
|---|---|
| **Loading** | Skeleton screens for lists/tables (not spinners). Buttons in submitting state show inline spinner + disable. Realtime updates animate-in with 150ms fade. |
| **Empty** | Icon (lucide, not emoji) + warm 1-line headline + 1-2 line context + primary action. Examples below. |
| **Error** | Inline error banner above the affected component. Toast for transient errors (network, save failures). NEVER `alert()`. |
| **Success** | Toast for transient success ("Phase shipped"). Inline confirmation for in-flow success (green check + brief text). |
| **Partial** | Visible loading indicator while remaining items load. Show what we have, not nothing. |

### Empty State Examples

| Screen | Empty state |
|---|---|
| Contractor dashboard, no active contracts | Icon: `Inbox`. Headline: "No active contracts yet." Body: "When a project owner posts work and you accept it, it'll show up here." Action: button → "View Open Contracts" |
| Project Owner dashboard, no posted contracts | Icon: `FileText`. Headline: "Post your first contract." Body: "Define the work, set the budget, break it into phases. The team takes it from there." Action: primary button → "Post Contract" |
| Feedback view, no feedback yet | Icon: `MessageSquare`. Headline: "No feedback yet." Body: "Once a deliverable is reviewed, feedback will appear here. You can search past feedback by star rating, project, or date." Action: none |
| Search results empty | Icon: `Search`. Headline: "Nothing matches." Body: "Try fewer filters or a different keyword." Action: "Clear filters" link |

### Error State Examples

| Failure | UI Response |
|---|---|
| Network error on save | Toast: "Couldn't save. Check your connection and try again." Retry button in toast. |
| Validation error on form submit | Inline error below the field. Red border on the field. Submit button stays enabled (so user can re-submit after fix). |
| Permission denied (RLS) | Full-page error with `Lock` icon. Headline: "You don't have access to this contract." Body: explanation + back button. |
| Realtime disconnect | Subtle yellow banner at top: "Reconnecting..." Auto-dismisses on reconnect. |

---

## 10. Status Pills

Exact specifications from the MVP. Use these consistently.

| Status | Background | Text | Use |
|---|---|---|---|
| `in-progress` | `info.light` (`#EFF6FF`) | `info.dark` (`#0284c7`) | Phase actively being worked |
| `review` | `#F3E8FF` | `#7c3aed` | Awaiting client review |
| `testing` | `warning.light` (`#FFFBEB`) | `warning.dark` (`#92400e`) | QA / verification |
| `complete` | `success.light` (`#F0FDF4`) | `success.dark` (`#15803d`) | Done, signed off |
| `paid` | `success` (`#16a34a`) bg | white | Done AND paid (most positive state) |
| `blocked` | `danger.light` (`#FEF2F2`) | `danger` (`#dc2626`) | Stopped, needs intervention |
| `upcoming` | `surface.sunken` (`#F0F4F8`) | `text.muted` (`#6B7280`) | Not yet started |
| `paused` | `cream.dark` (`#EFE9DD`) | `text.secondary` (`#4B5563`) | Temporarily on hold |

Pill geometry: `padding: 3px 10px`, `border-radius: 20px` (full), `font-size: 11px`, `font-weight: 700`, `letter-spacing: 0.07em`.

---

## 11. Accessibility Baseline (a11y)

The MVP scored 2/10 on accessibility. The React port must hit 8/10. Required:

- **Focus-visible:** every interactive element has a visible 3px amber focus ring (`shadow-focusAmber`). No exceptions.
- **Keyboard navigation:** every flow must be keyboard-completable. Tab order matches visual order. Escape closes modals and panels.
- **ARIA landmarks:** `nav`, `main`, `aside`, `banner`, `complementary` correctly applied. Use semantic HTML before reaching for ARIA.
- **Screen-reader labels:** every icon-only button has `aria-label`. Status pills have descriptive text, not just color.
- **Contrast:** body text ≥ 4.5:1 against background. Status pills ≥ 4.5:1 (verified for the palette above). Faint text (`#9CA3AF` on white = 3.4:1) used ONLY for non-essential metadata, never for content the user must read.
- **Touch targets:** minimum 44px tap area on tablet breakpoint, even if visual size is smaller.
- **Motion:** respect `prefers-reduced-motion`. Disable transitions for users who request it.

---

## 12. Iconography

**Library:** [lucide-react](https://lucide.dev). Use lucide icons for all UI iconography. Do not mix icon libraries.

**Sizing:** 14px (inline), 16px (default), 20px (emphasized), 24px (avatar/topbar).

**Color:** inherit `currentColor` from parent. Don't hardcode icon colors.

**Forbidden:** emoji as functional iconography (`📭`, `🔍`, `💵`). The MVP uses some — replace all with lucide equivalents in the port.

---

## 13. Information Architecture

### Two-role app shell

The product has two distinct dashboards. Routing is keyed off `activeUser.role`.

**Contractor (Marcus archetype, real user: Jacob, Chuy):**
- Primary nav: Dashboard / Open Contracts / My Contracts (collapsible list) / Earnings / Feedback / Contacts
- Landing: Contractor Dashboard with earnings hero, active work, recent activity

**Project Owner (Linda archetype, real users: George, Jon, Chris, Daniel):**
- Primary nav: Dashboard / Post Project / Posted Projects / Contractors / Feedback / Contacts
- Landing: Project Owner Dashboard with portfolio KPIs, posted projects, all contractor projects

### Hierarchy rules

- **Sidebar:** brand → role-specific nav → contract list (contractor only) → user/footer
- **Topbar:** breadcrumb/title (left) → primary action (right)
- **Content:** hero/KPIs → primary list/grid → secondary content
- **Modals:** title → close → body (scrollable) → footer with primary action right, cancel left

---

## 14. Animation & Motion

Used sparingly. The MVP uses motion only for fade-in on share panel, hover lift on cards, and loading skeletons.

| Motion | Use | Duration |
|---|---|---|
| Fade-in slide | Modal entry, share panel | 180ms ease-out |
| Hover lift | Cards, buttons | 140ms |
| Status change | Pill color transition when phase status changes | 200ms |
| Realtime update | New row appearing in list | 150ms fade-in |

No: parallax, scroll-triggered animations, autoplay carousels, decorative motion.

---

## 15. What's NOT Locked (deferred to v3.1+)

These are real design questions that v3 explicitly defers:

| Decision | Why deferred |
|---|---|
| Mobile/phone layout | Partners use desks. Re-evaluate post-launch based on observed usage. |
| Dark mode | Not requested by partners. Internal tool, single environment. |
| Multi-org branding | Single tenant (H9 Partners) for v3. Multi-org is post external launch. |
| Onboarding wizard | Pre-seeded users skip onboarding. |
| Marketing site | iterateiq-h9.netlify.app IS the app. No marketing surface. |
| Theming/customization | Hardcoded H9 brand. Theming comes with multi-org. |

---

## 16. Implementation Checklist (for the React port)

Before merging the v3 React app:

- [ ] All colors use named tokens, no raw hex
- [ ] All fonts use the family tokens
- [ ] All spacing uses the Tailwind scale
- [ ] All status pills use the semantic table above
- [ ] Every interactive element has `:focus-visible` styling
- [ ] Every icon is lucide-react (no emoji functional icons)
- [ ] Every empty state has icon + headline + body + action (where action exists)
- [ ] Every error path has a non-`alert()` UX
- [ ] Tablet breakpoint (768px) renders without horizontal scroll
- [ ] Keyboard navigation completes every primary flow
- [ ] Screen reader announces page titles and primary actions

---

## 17. Source-of-Truth Reference

**The partner-approved demo lives at [IterateIQ_MVP.html](IterateIQ_MVP.html).** When this DESIGN.md is silent on a specific component, match the MVP. When this DESIGN.md and the MVP disagree, this DESIGN.md wins (the MVP has hardcoded inconsistencies — navy drift, Geologica unused, etc.).

The persona deck at [IterateIQ_Personas.pptx](IterateIQ_Personas.pptx) and the persona login preview at [IterateIQ_Personas_Login.html](IterateIQ_Personas_Login.html) are **separate marketing artifacts** for hypothetical future external launches. They are not the design system. They are not what the partners use.
