import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServerKey = process.env.SUPABASE_SERVER_API_KEY;

export default createClient(supabaseUrl, supabaseServerKey);
