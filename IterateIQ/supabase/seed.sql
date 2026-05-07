-- ============================================================================
-- IterateIQ v3 — Seed Data
-- The 6 H9 Partners + 4 sample contracts (matching DEMO_WALKTHROUGH.md).
-- Auth users are pre-created via supabase CLI (see README.md). This seed
-- only populates the public.profiles + project data.
--
-- IMPORTANT: After running migrations, create the 6 auth users by running:
--   supabase/scripts/seed_auth_users.sh
-- That script issues 6 Admin API calls to create Supabase auth users with
-- the exact UUIDs referenced below. Run it BEFORE this seed.sql.
-- ============================================================================

-- Pre-seeded UUIDs (deterministic — must match auth.users created by the script)
-- These are arbitrary v4 UUIDs picked once and committed. Do not regenerate.
do $$
declare
  uid_george  uuid := '11111111-1111-4111-8111-111111111111';
  uid_jon     uuid := '22222222-2222-4222-8222-222222222222';
  uid_chris   uuid := '33333333-3333-4333-8333-333333333333';
  uid_daniel  uuid := '44444444-4444-4444-8444-444444444444';
  uid_jacob   uuid := '55555555-5555-4555-8555-555555555555';
  uid_chuy    uuid := '66666666-6666-4666-8666-666666666666';
begin

  -- Profiles
  insert into public.profiles (id, display_name, initials, role, role_label, avatar_gradient, description) values
    (uid_george, 'George Sumner',    'GS', 'project_owner', 'Project Owner', 'linear-gradient(135deg,#0f1f30,#1e3a5f)', 'Project Owner — post & manage projects'),
    (uid_jon,    'Jon Whitney',      'JW', 'project_owner', 'Project Owner', 'linear-gradient(135deg,#142338,#FF8C00)', 'Project Owner — post & manage projects'),
    (uid_chris,  'Chris Donovan',    'CD', 'project_owner', 'Project Owner', 'linear-gradient(135deg,#1e3a5f,#7c3aed)', 'Project Owner — post & manage projects'),
    (uid_daniel, 'Daniel Hernandez', 'DH', 'project_owner', 'Project Owner', 'linear-gradient(135deg,#0d9488,#1e3a5f)', 'Project Owner — post & manage projects'),
    (uid_jacob,  'Jacob H.',         'JH', 'contractor',    'Contractor',    'linear-gradient(135deg,#FF8C00,#142338)', 'Track projects, phases, earnings & feedback'),
    (uid_chuy,   'Chuy Hernandez',   'CH', 'contractor',    'Contractor',    'linear-gradient(135deg,#0ea5e9,#142338)', 'Track projects, phases, earnings & feedback')
  on conflict (id) do nothing;

  -- ===== Contract 1: Riviera Aviation — Site Updates (active, owned by Jacob) =====
  insert into public.contracts (id, name, client, description, category, tags, status, budget, rate_type, color, posted_by, owner_id) values
    (1, 'Riviera Aviation — Site Updates', 'Riviera Aviation',
     'Round of website updates: logo restoration, nav restructure, new Fractional Aircraft / Aircraft Charter / Aircraft Sales sections, About Us refresh.',
     'Web Design', array['web','copy','nav'], 'active', 4500, 'Phase-Based', '#FF8C00',
     uid_george, uid_jacob);

  insert into public.contract_contractors (contract_id, contractor_id) values (1, uid_jacob);

  insert into public.phases (contract_id, position, name, description, price, status, paid, due_date, deliverables) values
    (1, 1, 'Restore PC-24 Mountain Logo', 'Swap the homepage logo back to PC-24 in the mountains imagery.', 400,  'complete', true,  '2026-04-25', array['Updated hero logo','Source files']),
    (1, 2, 'Restore "Riviera Aviation" Wordmark', 'Revert wordmark site-wide.',                                300,  'complete', true,  '2026-04-26', array['Wordmark in header & footer']),
    (1, 3, 'Nav: "The Experience" -> "Aircraft Management"', 'Rename nav across desktop and mobile.',          200,  'complete', true,  '2026-04-27', array['Updated nav links','Mobile menu']),
    (1, 4, 'Move Aircraft Copy to Aircraft Management', 'Restructure section.',                                400,  'in_progress', false, '2026-04-30', array['Restructured page','Redirect for old anchor']),
    (1, 5, 'Nav: "The Aircraft" -> "Fractional Aircraft"', 'Rename nav and update page header.',               200,  'in_progress', false, '2026-04-30', array['Updated nav','Page title']),
    (1, 6, 'Fractional Aircraft Section Copy', 'Add long-form positioning copy.',                              600,  'in_progress', false, '2026-05-02', array['Section copy','Hero treatment']),
    (1, 7, 'Remove Citation Jet Series', 'Pull Citation Jet references.',                                      300,  'upcoming', false, '2026-05-04', array['Page removal','Cross-links cleaned']),
    (1, 8, 'Add Aircraft Charter Section', 'New nav item and section.',                                        700,  'upcoming', false, '2026-05-06', array['New /charter page','Nav entry','Section design']),
    (1, 9, 'Add Aircraft Sales Section', 'New nav item and section.',                                          800,  'upcoming', false, '2026-05-08', array['New /sales page','Nav entry','Section design']),
    (1,10, 'Update About Us Copy', 'Replace About Us with new positioning.',                                   600,  'upcoming', false, '2026-05-10', array['Updated About page','Photography review']);

  -- ===== Contract 2: Jay's Air Center — Marketing Refresh (complete, owned by Jacob, co-Chuy) =====
  insert into public.contracts (id, name, client, description, category, tags, status, budget, rate_type, color, posted_by, owner_id) values
    (2, 'Jay''s Air Center — Marketing Refresh', 'Jay''s Air Center',
     'Full marketing site refresh. Co-built with Chuy.',
     'Web Design', array['web','marketing','aviation'], 'complete', 7800, 'Phase-Based', '#0ea5e9',
     uid_george, uid_jacob);

  insert into public.contract_contractors (contract_id, contractor_id) values (2, uid_jacob), (2, uid_chuy);

  insert into public.phases (contract_id, position, name, price, status, paid, due_date, assigned_to, deliverables) values
    (2, 1, 'Discovery + Sitemap',          1800, 'complete', true, '2026-02-10', uid_jacob, array['Stakeholder interviews','Sitemap','Content brief']),
    (2, 2, 'Homepage + Services Design',   3500, 'complete', true, '2026-02-25', uid_jacob, array['Homepage HiFi','3 services pages','Mobile breakpoints']),
    (2, 3, 'Build + Launch',               2500, 'complete', true, '2026-03-15', uid_chuy,  array['Production build','SEO setup','Launch checklist']);

  -- ===== Contract 3: Whitney Capital — Investor Deck =====
  insert into public.contracts (id, name, client, description, category, tags, status, budget, rate_type, color, posted_by, owner_id) values
    (3, 'Whitney Capital — Investor Deck', 'Whitney Capital',
     'Polished investor pitch deck for Q2 fundraise.',
     'Pitch Deck', array['deck','investor','design'], 'active', 3200, 'Phase-Based', '#7c3aed',
     uid_jon, uid_jacob);

  insert into public.contract_contractors (contract_id, contractor_id) values (3, uid_jacob);

  insert into public.phases (contract_id, position, name, price, status, paid, due_date, deliverables) values
    (3, 1, 'Narrative + Outline',  1200, 'complete',    true,  '2026-04-18', array['Story outline','Section flow','Key metrics']),
    (3, 2, 'Full Deck Design',     2000, 'in_progress', false, '2026-05-05', array['Designed deck','Print-ready PDF','Editable source']);

  -- ===== Contract 4: Donovan Holdings — Brand (owned by Chuy) =====
  insert into public.contracts (id, name, client, description, category, tags, status, budget, rate_type, color, posted_by, owner_id) values
    (4, 'Donovan Holdings — Brand Refresh', 'Donovan Holdings',
     'Updated brand identity: refined wordmark, color system, brand guidelines.',
     'Branding', array['brand','identity','guidelines'], 'active', 4200, 'Phase-Based', '#f59e0b',
     uid_chris, uid_chuy);

  insert into public.contract_contractors (contract_id, contractor_id) values (4, uid_chuy);

  insert into public.phases (contract_id, position, name, price, status, paid, due_date, deliverables) values
    (4, 1, 'Wordmark + Palette',     1800, 'complete',    true,  '2026-04-25', array['Wordmark concepts','Final wordmark','Color palette']),
    (4, 2, 'Brand Guidelines Doc',   2400, 'in_progress', false, '2026-05-08', array['Guidelines PDF','Asset package','Usage examples']);

  -- ===== Sample feedback =====
  -- Phase ids are looked up by (contract_id, position) so this seed stays correct
  -- if phase counts ever change. Never hardcode bigserial-assigned phase ids.
  insert into public.feedback (contract_id, phase_id, author_id, rating, text, response, responded_at, created_at) values
    (1, (select id from public.phases where contract_id = 1 and position = 1), uid_george, 5, 'Looks great — exactly the version I had in mind. Thanks for moving fast on this.', 'Thanks George — pulling the next phase up to today.', '2026-04-23', '2026-04-23'),
    (1, (select id from public.phases where contract_id = 1 and position = 3), uid_george, 5, 'Perfect. Nav rename looks clean. Ready for the Fractional restructure.', null, null, '2026-04-27'),
    (2, (select id from public.phases where contract_id = 2 and position = 1), uid_george, 5, 'Sitemap is exactly what we wanted. Let''s keep moving.', 'Thanks — homepage HiFi coming in two weeks.', '2026-02-10', '2026-02-09'),
    (2, (select id from public.phases where contract_id = 2 and position = 2), uid_george, 5, 'Love the homepage hero. Ready to build.', null, null, '2026-02-23'),
    (2, (select id from public.phases where contract_id = 2 and position = 3), uid_george, 5, 'Site looks fantastic. Final invoice approved.', 'Appreciate it — invoice sent.', '2026-03-14', '2026-03-13'),
    (3, (select id from public.phases where contract_id = 3 and position = 1), uid_jon,    5, 'Great structure. Run with it. Investors will respond well to this flow.', null, null, '2026-04-18'),
    (4, (select id from public.phases where contract_id = 4 and position = 1), uid_chris,  5, 'Wordmark is perfect. Green-light the guidelines doc.', 'On it — first draft by end of next week.', '2026-04-25', '2026-04-25');

  -- ===== Sample available contracts (open marketplace) =====
  insert into public.available_contracts (id, posted_by, name, description, category, budget, urgency, status, posted_at) values
    (500, uid_george, 'Riviera Aviation — Owner Portal Mockups',
     'Design exploratory mockups for a future Riviera owner portal.',
     'Product Design', 5800, 'high', 'open', '2026-04-28'),
    (501, uid_jon, 'Whitney Capital — One-Pager Refresh',
     'Redesign the firm one-pager with updated AUM, partner bios, refreshed visuals.',
     'Print Design', 1800, 'medium', 'open', '2026-04-26'),
    (502, uid_chris, 'Donovan Holdings — Email Campaign Templates',
     'Three branded email templates with the new Donovan brand system.',
     'Email Design', 2200, 'low', 'open', '2026-04-20');

  insert into public.available_phases (available_contract_id, position, name, description, price, due_date, deliverables) values
    (500, 1, 'Discovery + User Flows', 'Interview 3 fractional owners and map flows.', 1800, '2026-05-12', array['3 owner interviews','Flow diagrams','Insights brief']),
    (500, 2, 'HiFi Mockups',            'Design 8 polished mockups.',                  2800, '2026-05-26', array['8 HiFi screens','Mobile breakpoints','Component notes']),
    (500, 3, 'Stakeholder Review',      'Walkthrough deck and revision pass.',         1200, '2026-06-02', array['Review deck','Revision round','Final files']),
    (501, 1, 'Layout + Copy Pass',      'New layout direction with refreshed copy.',    800, '2026-05-08', array['Layout v1','Copy edits']),
    (501, 2, 'Final Design + Print',    'Final designed PDF + print-ready files.',     1000, '2026-05-18', array['Final PDF','Print-ready files']),
    (502, 1, 'Template Designs',        'Three template designs in HiFi.',             1400, '2026-05-15', array['3 templates','Mobile previews']),
    (502, 2, 'HTML Build + QA',         'Coded templates with cross-client testing.',   800, '2026-05-25', array['HTML templates','Litmus QA']);

end $$;

-- Reset sequences past the manually-inserted ids
select setval('public.contracts_id_seq', (select max(id) from public.contracts));
select setval('public.available_contracts_id_seq', (select max(id) from public.available_contracts));
