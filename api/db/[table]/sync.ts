import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "@supabase/supabase-js";

const ALLOWED_TABLES = new Set([
  "products", "orders", "transactions", "users", "workers",
  "production_intakes", "inventory_movements", "general_expenses",
]);

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, x-db-key",
};

function getSupabase() {
  const url = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
  const key = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url.replace(/\/rest\/v1\/?$/, "").trim(), key.trim());
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "OPTIONS") {
    res.writeHead(204, CORS_HEADERS);
    res.end();
    return;
  }

  Object.entries(CORS_HEADERS).forEach(([k, v]) => res.setHeader(k, v));

  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const table = req.query.table as string;
  if (!ALLOWED_TABLES.has(table)) {
    return res.status(400).json({ error: `Table '${table}' is not accessible via this proxy.` });
  }

  const supabase = getSupabase();
  if (!supabase) return res.json({ success: true, count: 0, note: "Supabase not configured" });

  const { dataList } = req.body;
  if (!Array.isArray(dataList)) return res.status(400).json({ error: "Data list must be an array" });
  if (dataList.length === 0) {
    const { data: dbIds } = await supabase.from(table).select("id");
    if (dbIds && dbIds.length > 0) {
      await supabase.from(table).delete().in("id", dbIds.map((r: Record<string, unknown>) => r.id));
    }
    return res.json({ success: true, count: 0 });
  }

  try {
    const uploadPayload = dataList.map((item: Record<string, unknown>) => ({
      id: String(item.id),
      data: item,
      updated_at: new Date().toISOString(),
    }));

    const { error } = await supabase.from(table).upsert(uploadPayload, { onConflict: "id" });
    if (error) return res.status(500).json({ error: error.message });

    const { data: dbIds, error: selectError } = await supabase.from(table).select("id");
    if (!selectError && dbIds) {
      const localIdSet = new Set(dataList.map((item: Record<string, unknown>) => String(item.id)));
      const extraIds = dbIds
        .map((item: Record<string, unknown>) => String(item.id))
        .filter((id: string) => !localIdSet.has(id));
      if (extraIds.length > 0) {
        await supabase.from(table).delete().in("id", extraIds);
      }
    }

    return res.json({ success: true, count: dataList.length });
  } catch (err: unknown) {
    return res.status(500).json({ error: err instanceof Error ? err.message : "Internal server error" });
  }
}
