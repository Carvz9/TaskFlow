import { createClient } from '@supabase/supabase-js';
const SUPABASE_URL = 'https://dincrfgqascizvkaulsf.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRpbmNyZmdxYXNjaXp2a2F1bHNmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIxMDA5MjYsImV4cCI6MjA5NzY3NjkyNn0.icBD2rQOYNLE7bhocnWgZe43bqhwAQODm49QgiMqqKs';
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);