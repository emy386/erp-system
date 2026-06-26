import { createClient } from '@supabase/supabase-js';

// Clean the URL if it contains the "/rest/v1" suffix so Auth and API endpoints can resolve correctly.
const rawUrl = (import.meta as any).env.VITE_SUPABASE_URL || '';
const supabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/, '').trim();
const supabaseAnonKey = ((import.meta as any).env.VITE_SUPABASE_ANON_KEY || '').trim();

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
