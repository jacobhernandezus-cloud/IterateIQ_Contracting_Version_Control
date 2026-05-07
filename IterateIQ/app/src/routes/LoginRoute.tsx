import { useNavigate } from 'react-router-dom';

/**
 * Lane A smoke-test login. Real Supabase auth lands in Lane B.
 * This page exists to verify the navy + amber + cream tokens
 * + Inter/Geologica fonts render correctly.
 */
export default function LoginRoute() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-navy-deep via-navy to-navy-light p-4">
      <div className="w-full max-w-[420px] rounded-2xl bg-surface px-9 py-10 shadow-modal">
        <h1 className="text-center font-display text-xl font-extrabold tracking-tight text-ink">
          Iterate<span className="text-amber">IQ</span>
        </h1>
        <p className="mt-1 text-center text-sm text-text-faint">Pick a profile to continue</p>

        <p className="mt-7 rounded-md border border-border bg-amber-wash px-4 py-3 text-xs text-text-secondary">
          <span className="font-semibold text-amber-dark">Lane A foundation.</span> Real auth + 6 H9
          Partner profiles ship in Lane B. This screen confirms the design tokens compile.
        </p>

        <button
          type="button"
          onClick={() => navigate('/dashboard')}
          className="mt-5 flex w-full items-center justify-center rounded-md bg-amber px-4 py-2.5 text-base font-semibold text-white transition-colors hover:bg-amber-dark"
        >
          Continue to dashboard preview
        </button>
      </div>
    </main>
  );
}
