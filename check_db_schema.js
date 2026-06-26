import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const url = process.env.VITE_SUPABASE_URL || "";
const key = process.env.VITE_SUPABASE_ANON_KEY || "";
const cleanUrl = url.replace(/\/rest\/v1\/?$/, "").trim();
const supabase = createClient(cleanUrl, key);

async function inspectSchema() {
  console.log("=== Inspecting Database Tables and Columns ===");
  
  // We can query postgrest info, or query a custom sql if RPC exists, or we can use the rest API to see if we can get list of tables.
  // Wait, let's query the supabase API or call select on tables, or let's try reading the tables by selecting column names if possible.
  // Wait, let's query the supabase pg_catalog or information_schema if we have access via select.
  // Let's do a SELECT on a non-existent column, or let's select from information_schema.columns over rest!
  // Wait, does PostgREST allow querying information_schema? Let's check!
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .limit(1);

  console.log("Sample product row:", data, "Error:", error);

  const { data: cols, error: colsErr } = await supabase
    .rpc("get_columns_info_test"); // probably doesn't exist, let's try running direct select on information_schema if allowed (usually blocked by RLS/PostgREST API rules unless view is exposed)
}

inspectSchema();
