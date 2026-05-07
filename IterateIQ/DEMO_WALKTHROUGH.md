# IterateIQ Demo Walkthrough — 5-Tool Script

**URL:** https://iterateiq-h9.netlify.app
**Audience:** George, Jon, Chris, Daniel
**Time:** ~6 minutes

> **Before the call:** Open the URL, `localStorage.clear()` in DevTools, hard-refresh (Cmd+Shift+R). All 6 profiles should appear on the login picker.

---

## Frame (20 sec)

> "Right now our work lives in email — I lose track of what's approved, what's paid, what's next. IterateIQ is one place where you post work, I track progress, and we both see every project's status. Let me show you the five things I'd actually use day-to-day."

---

## Tool 1 · Phase Tracker — *the "where do things stand" view* (60 sec)

**Login as Jacob H. → click the Riviera Aviation contract.**

- 10 phases, color-coded: green = complete + paid, blue = in-progress, gray = upcoming.
- Point at phases 1–3 (paid), 4–6 (in progress), 7–10 (upcoming).
- "One glance, you know exactly where every dollar of the contract is."

## Tool 2 · Log Update — *the polish moment* (90 sec)

**Same contract → click "+ Log Update".**

- Type a quick update note.
- **Drag a screenshot or PDF into the attachment area.** This is the new media attachment feature — works for screenshots, video, PDFs.
- Toggle "Request feedback from Project Owner" → submit.
- "When I finish work, this is how George reviews it. The attachment shows up in the Activity Log and triggers a feedback request."

## Tool 3 · Phase Builder (Post Project) — *George's flow* (90 sec)

**Logout → login as George Sumner → "Post Contract" in sidebar.**

- Show the form: name, client, description, budget, rate type (Phase-Based / Hourly / Retainer).
- Add 2 phases inline — name, price, due date, deliverables.
- "George sets the price, timeline, attachments, per-phase pricing. No more 'I think we said $4,500 in that email last week.'"
- Don't submit — just walk through it.

## Tool 4 · Proposals Review — *the cleanest interaction* (60 sec)

**George view → click "Proposals" in sidebar.**

- Pending / Accepted / Declined columns.
- Click into a pending proposal → contractor cover note + per-phase pricing.
- Hover the **Accept** / **Decline** buttons (don't click).
- "When I respond to an Open Contract, George reviews it here. One click to accept, contract goes live."

## Tool 5 · Feedback Hub — *closes the quality loop* (45 sec)

**Logout → login as Jacob H. → "Feedback" in sidebar.**

- Show all reviews from George, Jon, Chris, Daniel — star ratings + text.
- Filter by contract or rating.
- "Every piece of feedback you four leave is searchable here. No more 'wait, what did you say last time?'"

## Bonus · Share Project (15 sec)

**Any contract page → "Share" button at top right.**
- Generates a shareable URL or assigns directly to a contractor.

---

## The pitch (45 sec)

> "Today this is a working prototype with seed data. Two weeks of focused build gets it onto a real backend with auth, file storage, and email notifications — Daniel just joined as a Project Owner so the four of you all use it day-to-day. The point isn't the prototype, the point is: **this is how I think we should work together.** Less email, more clarity, every dollar tracked."

**Ask:** *"What's missing? What would make this an obvious yes?"*

---

## Quick FAQ

**"Who pays for the platform?"** I do — it's my tool. You use it free. Hosting + Supabase ≈ $25/mo at this scale.

**"Can multiple contractors work on one contract?"** Yes — show the Jay's Air Center contract; Jacob + Chuy stacked avatars at top.

**"What if I want to see only my contracts, not Jon's?"** v2 has per-owner filtered view + a firm-wide toggle. Today everyone sees everything.

**"How do payments happen?"** Phase 1: marked-as-paid is manual. Phase 2 (post-launch): Stripe Connect for direct payouts.

---

## If the live URL looks broken

```bash
cd "/Users/jakeher831/Documents/H9 Contract Work/IterateIQ"
netlify deploy --prod --dir "."
```

Then in browser: DevTools → Application → Local Storage → clear `iterateiq-h9.netlify.app` → hard refresh.
