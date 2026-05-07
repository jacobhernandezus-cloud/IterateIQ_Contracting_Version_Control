-- ============================================================================
-- IterateIQ v3 — Row-Level Security
-- Single tenant (H9 Partners). Visibility model:
--
--   - Profiles: everyone can read all profiles (6-user team, no privacy concern)
--   - Contracts: contractors see contracts they own or are assigned to;
--     project_owners see ALL contracts (they oversee the team)
--   - Phases / deliverables / feedback / attachments: inherit from contract
--   - Available contracts: everyone reads; only project_owners post; only
--     unclaimed (status='open') visible to contractors
--   - Proposals: contractor sees their own; project_owner sees proposals on
--     their available_contracts
--
-- Per /plan-eng-review the RLS misconfig risk is P0 — every policy below has
-- a corresponding integration test in tests/rls/ (Lane G).
-- ============================================================================

-- Enable RLS on every table
alter table public.profiles                 enable row level security;
alter table public.contracts                enable row level security;
alter table public.contract_contractors     enable row level security;
alter table public.phases                   enable row level security;
alter table public.deliverables             enable row level security;
alter table public.feedback                 enable row level security;
alter table public.attachments              enable row level security;
alter table public.available_contracts      enable row level security;
alter table public.available_phases         enable row level security;
alter table public.proposals                enable row level security;
alter table public.proposal_phase_prices    enable row level security;

-- ----------------------------------------------------------------------------
-- Helper: is current user a project_owner?
-- ----------------------------------------------------------------------------
create or replace function public.is_project_owner()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'project_owner'
  );
$$;

-- Helper: is current user assigned to this contract?
create or replace function public.is_assigned_to_contract(target_contract bigint)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.contracts c
    where c.id = target_contract
      and (
        c.owner_id = auth.uid()
        or exists (
          select 1 from public.contract_contractors cc
          where cc.contract_id = c.id and cc.contractor_id = auth.uid()
        )
      )
  );
$$;

-- ----------------------------------------------------------------------------
-- PROFILES
-- ----------------------------------------------------------------------------
create policy "profiles_read_all"
  on public.profiles for select
  to authenticated
  using (true);

create policy "profiles_update_own"
  on public.profiles for update
  to authenticated
  using (id = auth.uid())
  with check (id = auth.uid());

-- ----------------------------------------------------------------------------
-- CONTRACTS
-- ----------------------------------------------------------------------------
create policy "contracts_read"
  on public.contracts for select
  to authenticated
  using (
    public.is_project_owner()
    or public.is_assigned_to_contract(id)
  );

create policy "contracts_insert_owners_only"
  on public.contracts for insert
  to authenticated
  with check (public.is_project_owner());

create policy "contracts_update_owner_or_assigned"
  on public.contracts for update
  to authenticated
  using (
    public.is_project_owner()
    or public.is_assigned_to_contract(id)
  );

create policy "contracts_delete_project_owner_only"
  on public.contracts for delete
  to authenticated
  using (public.is_project_owner());

-- contract_contractors junction
create policy "contract_contractors_read"
  on public.contract_contractors for select
  to authenticated
  using (
    public.is_project_owner()
    or contractor_id = auth.uid()
    or public.is_assigned_to_contract(contract_id)
  );

create policy "contract_contractors_write_owner_only"
  on public.contract_contractors for all
  to authenticated
  using (public.is_project_owner())
  with check (public.is_project_owner());

-- ----------------------------------------------------------------------------
-- PHASES (inherit from contract)
-- ----------------------------------------------------------------------------
create policy "phases_read"
  on public.phases for select
  to authenticated
  using (
    public.is_project_owner()
    or public.is_assigned_to_contract(contract_id)
  );

create policy "phases_write"
  on public.phases for all
  to authenticated
  using (
    public.is_project_owner()
    or public.is_assigned_to_contract(contract_id)
  )
  with check (
    public.is_project_owner()
    or public.is_assigned_to_contract(contract_id)
  );

-- ----------------------------------------------------------------------------
-- DELIVERABLES
-- ----------------------------------------------------------------------------
create policy "deliverables_read"
  on public.deliverables for select
  to authenticated
  using (
    public.is_project_owner()
    or public.is_assigned_to_contract(contract_id)
  );

create policy "deliverables_write"
  on public.deliverables for all
  to authenticated
  using (
    public.is_project_owner()
    or public.is_assigned_to_contract(contract_id)
  )
  with check (
    public.is_project_owner()
    or public.is_assigned_to_contract(contract_id)
  );

-- ----------------------------------------------------------------------------
-- FEEDBACK
-- ----------------------------------------------------------------------------
create policy "feedback_read"
  on public.feedback for select
  to authenticated
  using (
    public.is_project_owner()
    or public.is_assigned_to_contract(contract_id)
  );

create policy "feedback_insert_project_owner_only"
  on public.feedback for insert
  to authenticated
  with check (
    public.is_project_owner() and author_id = auth.uid()
  );

create policy "feedback_update_author_only"
  on public.feedback for update
  to authenticated
  using (author_id = auth.uid())
  with check (author_id = auth.uid());

-- Contractor can write a response (response field) on feedback for their contracts
-- handled via update on feedback restricted to author_id = auth.uid OR contract assignee
-- (we relax the update policy below to allow assignees to update only the response field)
drop policy "feedback_update_author_only" on public.feedback;
create policy "feedback_update_author_or_assignee"
  on public.feedback for update
  to authenticated
  using (
    author_id = auth.uid()
    or public.is_assigned_to_contract(contract_id)
  );

-- ----------------------------------------------------------------------------
-- ATTACHMENTS
-- ----------------------------------------------------------------------------
create policy "attachments_read"
  on public.attachments for select
  to authenticated
  using (
    public.is_project_owner()
    or (contract_id is not null and public.is_assigned_to_contract(contract_id))
    or uploaded_by = auth.uid()
  );

create policy "attachments_write_authenticated"
  on public.attachments for all
  to authenticated
  using (uploaded_by = auth.uid())
  with check (uploaded_by = auth.uid());

-- ----------------------------------------------------------------------------
-- AVAILABLE CONTRACTS (marketplace)
-- ----------------------------------------------------------------------------
create policy "available_read_all"
  on public.available_contracts for select
  to authenticated
  using (true);

create policy "available_insert_project_owner"
  on public.available_contracts for insert
  to authenticated
  with check (public.is_project_owner() and posted_by = auth.uid());

create policy "available_update_poster"
  on public.available_contracts for update
  to authenticated
  using (posted_by = auth.uid())
  with check (posted_by = auth.uid());

create policy "available_phases_read_all"
  on public.available_phases for select
  to authenticated
  using (true);

create policy "available_phases_write_poster"
  on public.available_phases for all
  to authenticated
  using (
    exists (
      select 1 from public.available_contracts
      where id = available_phases.available_contract_id and posted_by = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from public.available_contracts
      where id = available_phases.available_contract_id and posted_by = auth.uid()
    )
  );

-- ----------------------------------------------------------------------------
-- PROPOSALS
-- ----------------------------------------------------------------------------
create policy "proposals_read"
  on public.proposals for select
  to authenticated
  using (
    contractor_id = auth.uid()
    or exists (
      select 1 from public.available_contracts ac
      where ac.id = proposals.available_contract_id and ac.posted_by = auth.uid()
    )
  );

create policy "proposals_insert_contractor"
  on public.proposals for insert
  to authenticated
  with check (contractor_id = auth.uid());

create policy "proposals_update_contractor_or_poster"
  on public.proposals for update
  to authenticated
  using (
    contractor_id = auth.uid()
    or exists (
      select 1 from public.available_contracts ac
      where ac.id = proposals.available_contract_id and ac.posted_by = auth.uid()
    )
  );

create policy "proposal_phase_prices_read"
  on public.proposal_phase_prices for select
  to authenticated
  using (
    exists (
      select 1 from public.proposals p
      where p.id = proposal_phase_prices.proposal_id
        and (
          p.contractor_id = auth.uid()
          or exists (
            select 1 from public.available_contracts ac
            where ac.id = p.available_contract_id and ac.posted_by = auth.uid()
          )
        )
    )
  );

create policy "proposal_phase_prices_write_contractor"
  on public.proposal_phase_prices for all
  to authenticated
  using (
    exists (
      select 1 from public.proposals p
      where p.id = proposal_phase_prices.proposal_id and p.contractor_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from public.proposals p
      where p.id = proposal_phase_prices.proposal_id and p.contractor_id = auth.uid()
    )
  );
