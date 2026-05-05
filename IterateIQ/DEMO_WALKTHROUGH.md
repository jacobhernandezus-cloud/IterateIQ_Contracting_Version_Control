# IterateIQ Demo Walkthrough — George, Jon, Chris

**URL:** https://iterateiq-h9.netlify.app
**Posture:** *"This is the working prototype. Once you all say yes, I'll wire it to a real backend in the next two weeks so you can actually use it day-to-day."*

> **Before the call:** Open the URL once, click around, then `localStorage.clear()` in DevTools console + hard-refresh (Cmd+Shift+R). This guarantees a clean state with all 5 default users visible on the login screen.

---

## Frame the demo (30 sec)

> "I built this to make our work together more organized. Right now everything lives in email — I lose track of what's been approved, what's been paid, what's next. IterateIQ replaces that mess with one place where you post work, I track progress, and we both see exactly where every project stands. Let me show you."

---

## Act 1 — The Manager view (your investor pitch) — ~3 min

**Click:** *George Sumner* on the login screen.

**Talking points as you click through:**

1. **Manager Dashboard** (lands here automatically)
   - "This is what George sees when he logs in. KPIs at the top — active contracts, total spend, pending phases."
   - Point at the active project list — Riviera Aviation Site Updates is right there.

2. **Click "Post Contract"** in the sidebar
   - "When George wants me to do work, he posts a contract here. He sets the price, the timeline, breaks the work into phases, attaches files. No more 'can you take a look at the email I sent last week.'"
   - Don't actually fill it out — just show the form.

3. **Click "Assigned"** in sidebar
   - "Once a contractor accepts, the work shows up here. He can see who's on what, what's in progress, what's blocked."

4. **Click "Contractors"** (boss-overview)
   - "This is the contractor leaderboard. He can see total spend by contractor, completion rate, average rating. Helps with future hire decisions."

5. **Click "Contacts"** (NEW — directory)
   - "Quick directory of everyone in the system. He can DM Jon or Chris about a shared project, or message me directly."

---

## Act 2 — Logout, log in as Jacob (the contractor side) — ~5 min

**Click:** Logout (bottom of sidebar) → click *Jacob H.*

1. **Contractor Dashboard**
   - Point at the earnings hero number, active contracts.
   - "This is my view. I see what I'm working on, what I've earned, what's outstanding."

2. **Click the Riviera Aviation contract** (in sidebar or main grid)
   - **THIS IS THE KEY MOMENT.** George's email is now a real contract.
   - "This contract was posted by George — see it right there. The 10 phases come straight from his email last week:"
     - First 3 phases ✅ done and paid (logo, wordmark, nav rename)
     - Phases 4–6 in progress (Aircraft Management restructure, Fractional Aircraft copy)
     - Phases 7–10 upcoming
   - Scroll down to the **Activity Log** — show the work history with George's actual feedback ("Looks great — exactly the version I had in mind").
   - Point at the **+ Log Update** button. "When I finish a phase, I log an update here. George gets notified, reviews, approves, and the payment gets marked."

3. **Click "Earnings"** in sidebar
   - "Outstanding payments, completed payments, year-over-year totals. No more chasing invoices."

4. **Click "Open Contracts"** in sidebar
   - "These are unclaimed contracts your three are posting. I see Riviera owner portal mockups (George), Whitney Capital one-pager (Jon), Donovan Holdings email templates (Chris). I claim what I can take on."

5. **Click "Feedback"** in sidebar
   - "Every piece of feedback George/Jon/Chris leaves on my work lives here. Searchable, with star ratings. Ends the 'wait what did you say last time' problem."

6. **Click into the Jay's Air Center contract** (completed, paid)
   - Show the **multi-contractor "Team" badge** at the top — Jacob + Chuy avatars stacked.
   - "When work needs more than one contractor, both get assigned. Both can log updates. Manager sees the team at a glance."

---

## Act 3 — The pitch — ~1 min

> "Today this is a working prototype with seed data. The next step is the real version — passwords, real database, email notifications when George posts work or I log a phase, file uploads. Two weeks of focused build, you all start using it day-to-day. The point isn't the prototype, the point is: **this is how I think we should work together.** Less email, more clarity, every dollar tracked."

**Then ask:** *"What's missing? What would make this an obvious yes?"*

---

## Quick FAQ (anticipated questions)

**"Who pays for the platform?"**
You do — it's your tool. They use it free. Hosting + Supabase = ~$25/mo at this scale.

**"Can we use it for [other contractor]?"**
Yes — that's the point. They post one contract, multiple contractors can apply. They pick.

**"What if I want to see only my contracts, not Jon's?"**
"In v2, each manager has their own filtered view by default + a 'firm-wide' toggle. Right now everyone sees everything."

**"What about file attachments?"**
"V2. Supabase Storage. Drag-drop on phase updates, contract postings, feedback."

**"How do payments actually happen?"**
"Phase 1: marked-as-paid is manual. Phase 2 (after we're using it): Stripe Connect for direct payouts."

---

## If anything looks broken on the live URL

```bash
# Hard reset and redeploy
cd "/Users/jakeher831/Documents/H9 Contract Work/IterateIQ"
netlify deploy --prod --dir "."
```

Then in the browser: DevTools → Application → Local Storage → clear `iterateiq-h9.netlify.app` → hard refresh.
