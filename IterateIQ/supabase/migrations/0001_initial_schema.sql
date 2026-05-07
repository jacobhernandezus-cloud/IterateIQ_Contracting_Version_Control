-- ============================================================================
-- IterateIQ v3 — Initial Schema
-- Lane A foundation. Models the MVP data shape (G.projects, G.iters, G.feedback,
-- G.available, G.proposals) for a 6-user internal H9 deployment.
--
-- Single tenant (H9 Partners). RLS scopes:
--   - Contractors see contracts they're on + open marketplace
--   - Project owners see all contracts + everything they posted
--   - Everyone sees their own proposals + feedback they authored or received
-- ============================================================================

-- ----------------------------------------------------------------------------
-- ENUMS
-- ----------------------------------------------------------------------------

create type public.user_role as enum ('contractor', 'project_owner');

create type public.contract_status as enum ('active', 'paused', 'complete');

create type public.phase_status as enum (
  'upcoming',
  'in_progress',
  'review',
  'testing',
  'complete',
  'blocked'
);

create type public.available_status as enum ('open', 'claimed', 'expired');

create type public.proposal_status as enum (
  'pending',
  'boss_accepted',
  'accepted',
  'declined',
  'contractor_declined'
);

create type public.urgency as enum ('low', 'medium', 'high');

-- ----------------------------------------------------------------------------
-- PROFILES — extends auth.users with display info
-- ----------------------------------------------------------------------------

create table public.profiles (
  id            uuid primary key references auth.users(id) on delete cascade,
  display_name  text not null,
  initials      text not null,
  role          public.user_role not null,
  role_label    text,                          -- "Freelancer", "Project Owner"
  avatar_gradient text,                        -- CSS gradient string, see DESIGN.md §2
  description   text,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index profiles_role_idx on public.profiles(role);

-- ----------------------------------------------------------------------------
-- CONTRACTS — accepted/active work (was G.projects)
-- ----------------------------------------------------------------------------

create table public.contracts (
  id              bigserial primary key,
  name            text not null,
  client          text not null,
  description     text,
  category        text,
  tags            text[] default array[]::text[],
  status          public.contract_status not null default 'active',
  budget          numeric(12,2) not null,
  rate_type       text,                            -- "Phase-Based", "Hourly", etc.
  color           text,                            -- accent dot color, see DESIGN.md
  posted_by       uuid references public.profiles(id) on delete set null,
  owner_id        uuid not null references public.profiles(id) on delete restrict,
  from_avail_id   bigint,                          -- back-ref to available_contracts when claimed
  rating          numeric(2,1),
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create index contracts_owner_idx on public.contracts(owner_id);
create index contracts_posted_by_idx on public.contracts(posted_by);
create index contracts_status_idx on public.contracts(status);

-- Many-to-many: contractors assigned to a contract (was project.contractors[])
create table public.contract_contractors (
  contract_id   bigint references public.contracts(id) on delete cascade,
  contractor_id uuid references public.profiles(id) on delete cascade,
  primary key (contract_id, contractor_id)
);

-- ----------------------------------------------------------------------------
-- PHASES — milestones within contracts (was project.milestones[])
-- ----------------------------------------------------------------------------

create table public.phases (
  id            bigserial primary key,
  contract_id   bigint not null references public.contracts(id) on delete cascade,
  position      int not null,                      -- order within contract
  name          text not null,
  description   text,
  price         numeric(12,2) not null,
  status        public.phase_status not null default 'upcoming',
  paid          boolean not null default false,
  due_date      date,
  assigned_to   uuid references public.profiles(id) on delete set null,
  deliverables  text[] default array[]::text[],    -- bullet items
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index phases_contract_idx on public.phases(contract_id);
create index phases_assigned_idx on public.phases(assigned_to);
create unique index phases_contract_position_uq on public.phases(contract_id, position);

-- ----------------------------------------------------------------------------
-- DELIVERABLES — activity log entries (was G.iters)
-- ----------------------------------------------------------------------------

create table public.deliverables (
  id            bigserial primary key,
  contract_id   bigint not null references public.contracts(id) on delete cascade,
  phase_id      bigint references public.phases(id) on delete set null,
  version       text not null,                     -- "v0.1", "v1.0"
  title         text not null,
  status        public.phase_status not null default 'in_progress',
  hours         numeric(6,2) default 0,
  notes         text,
  changes       text[] default array[]::text[],    -- bullet changelog
  logged_by     uuid references public.profiles(id) on delete set null,
  logged_at     date not null default current_date,
  created_at    timestamptz not null default now()
);

create index deliverables_contract_idx on public.deliverables(contract_id);
create index deliverables_phase_idx on public.deliverables(phase_id);
create index deliverables_logged_at_idx on public.deliverables(logged_at desc);

-- ----------------------------------------------------------------------------
-- FEEDBACK — client reviews on deliverables (was G.feedback)
-- ----------------------------------------------------------------------------

create table public.feedback (
  id              bigserial primary key,
  contract_id     bigint not null references public.contracts(id) on delete cascade,
  deliverable_id  bigint references public.deliverables(id) on delete set null,
  phase_id        bigint references public.phases(id) on delete set null,
  author_id       uuid not null references public.profiles(id) on delete restrict,
  rating          int check (rating between 1 and 5),
  text            text not null,
  response        text,
  responded_at    date,
  created_at      timestamptz not null default now()
);

create index feedback_contract_idx on public.feedback(contract_id);
create index feedback_author_idx on public.feedback(author_id);

-- ----------------------------------------------------------------------------
-- ATTACHMENTS — file uploads on phases or feedback
-- DESIGN.md §15: required for v3 (walkthrough commitment)
-- ----------------------------------------------------------------------------

create table public.attachments (
  id              bigserial primary key,
  uploaded_by     uuid not null references public.profiles(id) on delete restrict,
  storage_path    text not null,                   -- path in `attachments` bucket
  filename        text not null,
  mime_type       text,
  size_bytes      bigint,
  -- exactly one of these is set (CHECK constraint below)
  contract_id     bigint references public.contracts(id) on delete cascade,
  phase_id        bigint references public.phases(id) on delete cascade,
  deliverable_id  bigint references public.deliverables(id) on delete cascade,
  feedback_id     bigint references public.feedback(id) on delete cascade,
  created_at      timestamptz not null default now(),
  constraint attachment_target_required check (
    num_nonnulls(contract_id, phase_id, deliverable_id, feedback_id) = 1
  )
);

create index attachments_contract_idx on public.attachments(contract_id);
create index attachments_phase_idx on public.attachments(phase_id);
create index attachments_deliverable_idx on public.attachments(deliverable_id);
create index attachments_feedback_idx on public.attachments(feedback_id);

-- ----------------------------------------------------------------------------
-- AVAILABLE CONTRACTS — marketplace (was G.available)
-- ----------------------------------------------------------------------------

create table public.available_contracts (
  id            bigserial primary key,
  posted_by     uuid not null references public.profiles(id) on delete restrict,
  name          text not null,
  description   text,
  category      text,
  budget        numeric(12,2) not null,
  urgency       public.urgency not null default 'medium',
  status        public.available_status not null default 'open',
  posted_at     timestamptz not null default now(),
  claimed_by    uuid references public.profiles(id) on delete set null,
  claimed_at    timestamptz,
  expires_at    timestamptz
);

create index available_status_idx on public.available_contracts(status);
create index available_posted_by_idx on public.available_contracts(posted_by);

-- Phase templates within available contracts
create table public.available_phases (
  id                    bigserial primary key,
  available_contract_id bigint not null references public.available_contracts(id) on delete cascade,
  position              int not null,
  name                  text not null,
  description           text,
  price                 numeric(12,2) not null,
  due_date              date,
  deliverables          text[] default array[]::text[]
);

create unique index available_phases_position_uq
  on public.available_phases(available_contract_id, position);

-- ----------------------------------------------------------------------------
-- PROPOSALS — contractor responses to available contracts (was G.proposals)
-- ----------------------------------------------------------------------------

create table public.proposals (
  id                    bigserial primary key,
  available_contract_id bigint not null references public.available_contracts(id) on delete cascade,
  contractor_id         uuid not null references public.profiles(id) on delete cascade,
  total_proposed        numeric(12,2) not null,
  cover_note            text,
  status                public.proposal_status not null default 'pending',
  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now()
);

create index proposals_available_idx on public.proposals(available_contract_id);
create index proposals_contractor_idx on public.proposals(contractor_id);

-- Per-phase proposed prices (contractor can quote a different price per phase)
create table public.proposal_phase_prices (
  proposal_id          bigint references public.proposals(id) on delete cascade,
  available_phase_id   bigint references public.available_phases(id) on delete cascade,
  price                numeric(12,2) not null,
  primary key (proposal_id, available_phase_id)
);

-- ----------------------------------------------------------------------------
-- updated_at triggers
-- ----------------------------------------------------------------------------

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

create trigger profiles_set_updated_at before update on public.profiles
  for each row execute function public.set_updated_at();
create trigger contracts_set_updated_at before update on public.contracts
  for each row execute function public.set_updated_at();
create trigger phases_set_updated_at before update on public.phases
  for each row execute function public.set_updated_at();
create trigger proposals_set_updated_at before update on public.proposals
  for each row execute function public.set_updated_at();
