import { createClient } from "@supabase/supabase-js"

export function getSupabaseClient() {
  //const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  //const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseUrl = "https://komkuhwzllwqskaiftha.supabase.co"
  const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtvbWt1aHd6bGx3cXNrYWlmdGhhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAxNTkzMDUsImV4cCI6MjA4NTczNTMwNX0.t-C08578cnI7d0wyQDdE1Q52bFZ2iQs8OIsd4rKkLbM"

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Supabase environment variables are missing")
  }

  return createClient(supabaseUrl, supabaseAnonKey)
}
