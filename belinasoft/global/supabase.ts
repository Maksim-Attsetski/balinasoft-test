import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SB_PROJECT_URL!;
const supabaseKey = process.env.SP_API_KEY!;
export const supabase = createClient(supabaseUrl, supabaseKey);
