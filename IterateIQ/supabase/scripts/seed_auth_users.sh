#!/usr/bin/env bash
# ============================================================================
# Seed the 6 H9 auth.users to match the deterministic UUIDs in seed.sql.
# Run AFTER `supabase db reset` and BEFORE applying seed.sql.
#
# Usage (local):
#   SUPABASE_URL=http://127.0.0.1:54321 \
#   SERVICE_ROLE_KEY="$(supabase status -o json | jq -r .service_role_key)" \
#   ./seed_auth_users.sh
#
# Usage (remote):
#   SUPABASE_URL=https://YOUR_PROJECT.supabase.co \
#   SERVICE_ROLE_KEY=<your service role key> \
#   ./seed_auth_users.sh
# ============================================================================

set -euo pipefail

: "${SUPABASE_URL:?Set SUPABASE_URL}"
: "${SERVICE_ROLE_KEY:?Set SERVICE_ROLE_KEY (NOT the anon key — service role only)}"

# Default password — partners change this on first login
DEFAULT_PASSWORD="${SEED_PASSWORD:-iterate-iq-h9}"

declare -a USERS=(
  "11111111-1111-4111-8111-111111111111|george@h9partners.com|George Sumner"
  "22222222-2222-4222-8222-222222222222|jon@h9partners.com|Jon Whitney"
  "33333333-3333-4333-8333-333333333333|chris@h9partners.com|Chris Donovan"
  "44444444-4444-4444-8444-444444444444|daniel@h9partners.com|Daniel Hernandez"
  "55555555-5555-4555-8555-555555555555|jacob@h9partners.com|Jacob H."
  "66666666-6666-4666-8666-666666666666|chuy@h9partners.com|Chuy Hernandez"
)

for entry in "${USERS[@]}"; do
  IFS='|' read -r uid email name <<< "$entry"
  echo "Creating auth.users -> $email ($uid)"
  curl -sS -X POST "$SUPABASE_URL/auth/v1/admin/users" \
    -H "apikey: $SERVICE_ROLE_KEY" \
    -H "Authorization: Bearer $SERVICE_ROLE_KEY" \
    -H "Content-Type: application/json" \
    -d "{
      \"id\": \"$uid\",
      \"email\": \"$email\",
      \"password\": \"$DEFAULT_PASSWORD\",
      \"email_confirm\": true,
      \"user_metadata\": { \"display_name\": \"$name\" }
    }" \
    | jq -r '.id // .msg // "ERROR"'
done

echo ""
echo "Done. Default password for all 6 users: $DEFAULT_PASSWORD"
echo "Distribute via Slack and have partners change it on first login."
