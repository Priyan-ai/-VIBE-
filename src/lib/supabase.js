import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://nugdooaokynbttouyazo.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im51Z2Rvb2Fva3luYnR0b3V5YXpvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM2NzQwMzYsImV4cCI6MjA4OTI1MDAzNn0.0uBiLeAIAZsM2_G_PYiE1ORDnxms9kNE0iQuZJyoVwo'

// ✅ Always export a valid client (fallback keys are hardcoded above)
export const supabase = createClient(supabaseUrl, supabaseKey)