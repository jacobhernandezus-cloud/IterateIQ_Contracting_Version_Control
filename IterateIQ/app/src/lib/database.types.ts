/**
 * Placeholder database types. Generated automatically by:
 *   npx supabase gen types typescript --local > src/lib/database.types.ts
 *
 * Run that command after the migrations in /supabase/migrations are applied.
 * Until then, this minimal type lets the typed client compile.
 */
export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          display_name: string;
          initials: string;
          role: 'contractor' | 'project_owner';
          role_label: string | null;
          avatar_gradient: string | null;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['profiles']['Row'], 'created_at'> & {
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['profiles']['Row']>;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      user_role: 'contractor' | 'project_owner';
      contract_status: 'active' | 'paused' | 'complete';
      phase_status: 'upcoming' | 'in_progress' | 'review' | 'testing' | 'complete' | 'blocked';
    };
  };
};
