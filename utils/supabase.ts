import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://qobbaazuartbxzhbgtlh.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFvYmJhYXp1YXJ0Ynh6aGJndGxoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY2OTgzMTcsImV4cCI6MjA1MjI3NDMxN30.7MxCGFfx2YcnaQWmFijdVsTdQO8L2cJhH45n7C5SdME";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {});
