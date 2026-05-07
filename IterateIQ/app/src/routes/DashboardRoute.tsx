import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Palette, Database, Zap } from 'lucide-react';

/**
 * Lane A token verification page. Renders every major DESIGN.md token
 * so we can verify Tailwind + fonts + colors are wired before Lane C
 * builds the real dashboard.
 */
export default function DashboardRoute() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Topbar */}
      <header className="sticky top-0 z-10 border-b border-border bg-surface px-7 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-lg font-extrabold text-ink">
              Iterate<span className="text-amber">IQ</span>
            </h1>
            <p className="mt-0.5 text-xs text-text-muted">Lane A — Foundation Smoke Test</p>
          </div>
          <Link
            to="/login"
            className="rounded-md border border-border px-3.5 py-1.5 text-sm font-medium text-text-secondary transition-colors hover:border-border-strong hover:text-ink"
          >
            ← Back to login
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-7 py-7">
        {/* Hero */}
        <section className="mb-6 rounded-xl bg-gradient-to-br from-navy-deep to-navy-light p-7 text-white">
          <p className="text-xxs font-bold uppercase tracking-widest text-amber-soft">
            LANE A · FOUNDATION
          </p>
          <h2 className="mt-2 font-display text-3xl font-extrabold">
            React + Vite + Tailwind wired up.
          </h2>
          <p className="mt-2 max-w-2xl text-md text-white/72">
            All DESIGN.md tokens compile, Inter and Geologica load, the focus ring is amber, and the
            cream background renders correctly. Lane B (auth) starts next.
          </p>
        </section>

        {/* Foundation checklist */}
        <h3 className="mb-3 text-xxs font-bold uppercase tracking-widest text-text-muted">
          FOUNDATION COMPLETE
        </h3>
        <div className="grid grid-cols-1 gap-3.5 md:grid-cols-2">
          <FoundationCard
            icon={<Palette className="h-5 w-5 text-amber" />}
            title="Design tokens"
            body="Navy, amber, cream, ink, semantic states, Inter + Geologica + JetBrains Mono."
          />
          <FoundationCard
            icon={<Database className="h-5 w-5 text-info" />}
            title="Supabase scaffold"
            body="Schema, RLS policies, seed users, migrations ready in /supabase/."
          />
          <FoundationCard
            icon={<Zap className="h-5 w-5 text-success" />}
            title="Tooling"
            body="ESLint, Prettier, Vitest, Playwright, TypeScript strict mode."
          />
          <FoundationCard
            icon={<CheckCircle2 className="h-5 w-5 text-success" />}
            title="Ready for Lane B"
            body="Auth + protected routes start next. Real partner login in ~0.5 days."
          />
        </div>

        {/* Status pill swatches — verify §10 of DESIGN.md */}
        <h3 className="mt-7 mb-3 text-xxs font-bold uppercase tracking-widest text-text-muted">
          STATUS PILLS · DESIGN.md §10
        </h3>
        <div className="flex flex-wrap gap-2 rounded-xl border border-border bg-surface p-5 shadow-card">
          <Pill label="In Progress" bg="bg-info-light" text="text-info-dark" />
          <Pill label="Review" bg="bg-review-light" text="text-review-dark" />
          <Pill label="Testing" bg="bg-warning-light" text="text-warning-dark" />
          <Pill label="Complete" bg="bg-success-light" text="text-success-dark" />
          <Pill label="Paid" bg="bg-success" text="text-white" />
          <Pill label="Blocked" bg="bg-danger-light" text="text-danger" />
          <Pill label="Upcoming" bg="bg-surface-sunken" text="text-text-muted" />
          <Pill label="Paused" bg="bg-cream-dark" text="text-text-secondary" />
        </div>
      </main>
    </div>
  );
}

function FoundationCard({ icon, title, body }: { icon: ReactNode; title: string; body: string }) {
  return (
    <div className="rounded-xl border border-border bg-surface p-5 shadow-card transition-shadow hover:shadow-card-hover">
      <div className="flex items-center gap-2">
        {icon}
        <h4 className="text-md font-bold text-ink">{title}</h4>
      </div>
      <p className="mt-1.5 text-sm text-text-secondary">{body}</p>
    </div>
  );
}

function Pill({ label, bg, text }: { label: string; bg: string; text: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-2xl px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider ${bg} ${text}`}
    >
      {label}
    </span>
  );
}
