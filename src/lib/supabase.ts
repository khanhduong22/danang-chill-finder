import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

/**
 * Supabase browser client.
 *
 * Setup instructions:
 * 1. Copy `.env.local.example` → `.env.local`
 * 2. Fill in your Supabase project URL and anon key from:
 *    https://app.supabase.com → Your Project → Settings → API
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
