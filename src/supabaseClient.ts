import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://uwninjmnlyrqfdroerac.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV3bmluam1ubHlycWZkcm9lcmFjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ2MzYxMjcsImV4cCI6MjA1MDIxMjEyN30.4FpUpC8hDMyZ05Qs0_qMZP1bNPwh-8gUF1VkXZ5dAdk'
const supabase = createClient(supabaseUrl, supabaseKey)

//export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);