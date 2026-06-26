import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const url = process.env.VITE_SUPABASE_URL || "";
const key = process.env.VITE_SUPABASE_ANON_KEY || "";
const cleanUrl = url.replace(/\/rest\/v1\/?$/, "").trim();
const supabase = createClient(cleanUrl, key);

async function testAll() {
  const tables = [
    "products",
    "orders",
    "transactions",
    "users",
    "workers",
    "production_intakes",
    "inventory_movements",
    "general_expenses"
  ];

  console.log("=== Checking erp_ Prefixed Tables ===");
  for (const t of tables) {
    const table = `erp_${t}`;
    // Try to SELECT id from erp_ prefixed table
    const { data, error } = await supabase.from(table).select("id").limit(1);
    if (error) {
      console.log(`❌ Table [${table}]: ERROR - Code: ${error.code} | Message: ${error.message}`);
    } else {
      console.log(`✅ Table [${table}]: SUCCESS | Rows:`, data.length);
    }
  }
}

testAll();
