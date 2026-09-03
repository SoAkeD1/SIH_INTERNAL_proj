/* Rudhira — Supabase project config.
   The publishable key is a PUBLIC client key: it is designed to ship in
   browser code and is safe to commit. Data access is governed by
   row-level security in Supabase, not by keeping this key secret.
   Values from Supabase → Project Settings → API Keys. */
window.SUPABASE_URL = "https://eixyqpfhtaoyblwjfehu.supabase.co";
window.SUPABASE_ANON_KEY = "sb_publishable_Ztd8VT_l_M3YWh79r1-DAg_sS-KbgBv";

/* true once real values are in place — auth pages fall back to a demo
   notice while this is false, so the site never looks broken. */
window.SUPABASE_READY = !/^REPLACE_WITH_/.test(window.SUPABASE_URL) &&
                        !/^REPLACE_WITH_/.test(window.SUPABASE_ANON_KEY);

/* Google provider is enabled in Supabase (Google Cloud OAuth client set up).
   Set false to hide the "Continue with Google" button. */
window.SUPABASE_GOOGLE = true;
