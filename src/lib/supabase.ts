import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Use placeholders if variables are missing to prevent 'createClient' from throwing a fatal error
// during the initial build/load. This allows the app to render and show a configuration warning.
const finalUrl = supabaseUrl || 'https://your-project-id.supabase.co';
const finalKey = supabaseAnonKey || 'your-anon-key';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    "Supabase configuration is missing! Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in the AI Studio Settings (Secrets)."
  );
}

export const supabase = createClient(finalUrl, finalKey);

export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey);
