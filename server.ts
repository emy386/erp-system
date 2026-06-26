/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

// Set high limits for handling large base64 snapshot string payloads safely
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Server API Endpoint proxy for extraction using Gemini
app.post("/api/extract-order", async (req, res) => {
  const { source } = req.body;
  if (!source) {
    return res.status(400).json({ error: "لم يتم تزويد النظام بمدخلات الاستخراج الشاتي الصوري." });
  }

  // Ensure Gemini API key is configured
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ 
      error: "مفتاح Gemini API غير مفعّل أو مفقود في إعدادات الخادم السرية للسيستم. يرجى إضافته من قائمة Secrets المتاحة in AI Studio." 
    });
  }

  try {
    const ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });

    const parts: any[] = [];
    if (typeof source === "string") {
      parts.push({ 
        text: `الرجاء مراجعة المحادثة المكتوبة التالية لمحل/براند ملابس أطفال يدعى 'Kidzy'، واستخلاص تفاصيل طلب الأوردر الجديد المذكور بالكامل:\n${source}` 
      });
    } else if (source && typeof source === "object" && source.data && source.mimeType) {
      parts.push({
        inlineData: {
          mimeType: source.mimeType,
          data: source.data
        }
      });
      parts.push({ 
        text: "الرجاء مراجعة هذه لقطة الشاشة (Screenshot) بدقة واستخراج تفاصيل الأوردر الجديد لبراند ملابس أطفال كيدزي. استخلص اسم العميلة، الموديل، الألعاب أو الملابس المطلوبة، المقاس واللون المكتوب، العنوان بالتفصيل، المحافظة، وأي خصومات أو ملاحظات." 
      });
    } else {
      return res.status(400).json({ error: "تنسيق بيانات الاستخراج غير مدعوم على السيرفر." });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: parts,
      config: {
        systemInstruction: "You are an expert system that extracts order details from Arabic chats or screenshots of chats for an Egyptian children wear brand called Kidzy. Under items list, extract the item names, color, size, quantity of garments needed. Under governorate, try to match it directly to Egyptian governorates (e.g. القاهرة, الجيزة, الإسكندرية, الدقهلية, الغربية, المنوفية, الشرقية, القليوبية, البحيرة, كفر الشيخ, دمياط, بورسعيد, الإسماعيلية, السويس, الفيوم, بني سويف, المنيا, أسيوط, سوهاج, قنا, الأقصر, أسوان). Provide the response strictly matching the schema structure.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            customerName: { type: Type.STRING },
            childName: { type: Type.STRING },
            customerPhone: { type: Type.STRING },
            customerPhone2: { type: Type.STRING },
            governorate: { type: Type.STRING },
            address: { type: Type.STRING },
            discount: { type: Type.NUMBER },
            deliveryDuration: { type: Type.STRING, description: "either 'normal' or 'urgent'" },
            notes: { type: Type.STRING },
            items: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  quantity: { type: Type.NUMBER },
                  price: { type: Type.NUMBER },
                  color: { type: Type.STRING },
                  size: { type: Type.STRING }
                }
              }
            }
          }
        }
      }
    });

    const textResult = response.text || "{}";
    const data = JSON.parse(textResult);
    return res.json(data);
  } catch (err: any) {
    console.error("Error running server-side Gemini OCR extractor:", err);
    return res.status(500).json({ 
      error: `فشل استخراج تفاصيل الأورد بمساعدة الذكاء الاصطناعي: ${err.message || "خطأ غير معروف في خوادم Gemini"}` 
    });
  }
});

// Setup server-side Supabase connection and database proxy endpoint
import { createClient } from "@supabase/supabase-js";

const rawUrl = process.env.VITE_SUPABASE_URL || 'https://qzzkmbdbcpehgowfqxcy.supabase.co/rest/v1/';
const supabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/, '').trim();
const supabaseAnonKey = (process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF6emttYmRiY3BlaGdvd2ZxeGN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk1MzA1NTUsImV4cCI6MjA5NTEwNjU1NX0.jY1gb2gijGfV36J-gnOwNG4gKV77YmLH7VpvGZ9hsi8').trim();

const supabase = createClient(supabaseUrl, supabaseAnonKey);
const tableHasDataColumn: Record<string, boolean> = {};

// Detect column formats for robust schemas at startup
async function detectTableLayouts() {
  const tables = [
    "products", "orders", "transactions", "users", 
    "workers", "production_intakes", "inventory_movements", "general_expenses"
  ];
  for (const t of tables) {
    if (t === 'users') {
      tableHasDataColumn[t] = false;
      continue;
    }
    try {
      const { error } = await supabase.from(t).select("data").limit(1);
      if (error && (error.message.includes("Could not find the 'data' column") || error.code === "PGRST204" || error.code === "42703")) {
        tableHasDataColumn[t] = false;
      } else {
        tableHasDataColumn[t] = true;
      }
    } catch (e) {
      tableHasDataColumn[t] = false;
    }
  }
  console.log("[Kidzy Proxy] Table layouts detected:", tableHasDataColumn);
}

// REST Proxy getter endpoint
app.get("/api/db/:table", async (req, res) => {
  const { table } = req.params;
  try {
    const { data, error } = await supabase.from(table).select("*");
    if (error) {
      console.error(`Error loading table ${table} from Supabase:`, error);
      return res.status(500).json({ error: error.message });
    }

    const usesDoc = tableHasDataColumn[table];
    if (usesDoc && data) {
      const mapped = data.map((row: any) => {
        const payload = typeof row.data === 'string' ? JSON.parse(row.data) : row.data;
        return { ...payload, id: row.id };
      });
      return res.json(mapped);
    }
    return res.json(data || []);
  } catch (err: any) {
    console.error(`Crash loading table ${table} in proxy:`, err);
    return res.status(500).json({ error: err.message || "Internal server error" });
  }
});

// REST Proxy sync endpoint
app.post("/api/db/:table/sync", async (req, res) => {
  const { table } = req.params;
  const { dataList } = req.body;

  if (!Array.isArray(dataList)) {
    return res.status(400).json({ error: "Data list must be an array" });
  }

  try {
    const usesDoc = tableHasDataColumn[table];
    let uploadPayload = dataList;

    if (usesDoc) {
      uploadPayload = dataList.map((item: any) => ({
        id: String(item.id),
        data: item,
        updated_at: new Date().toISOString()
      }));
    }

    let { error } = await supabase.from(table).upsert(uploadPayload, { onConflict: "id" });

    // Safe fallback edit block for older schema columns
    if (error && !usesDoc && table === "orders" && (error.message.includes("screenshot") || error.message.includes("sentConfirmationMessage") || error.code === "42703")) {
      console.warn("Retrying orders upsert without optional columns...");
      const stripped = uploadPayload.map(({ screenshot, sentConfirmationMessage, ...rest }: any) => rest);
      error = (await supabase.from(table).upsert(stripped, { onConflict: "id" })).error;
    }

    if (error) {
      console.error(`Error upserting to table ${table}:`, error);
      return res.status(500).json({ error: error.message });
    }

    // Sync deletions: remove from Supabase if not in local list
    const { data: dbIds, error: selectError } = await supabase.from(table).select("id");
    if (!selectError && dbIds) {
      const localIdSet = new Set(dataList.map(item => String(item.id)));
      const extraIds = dbIds.map((item: any) => String(item.id)).filter(id => !localIdSet.has(id));
      if (extraIds.length > 0) {
        console.log(`[Kidzy Proxy] Deleting extra items from table ${table}:`, extraIds);
        await supabase.from(table).delete().in("id", extraIds);
      }
    }

    return res.json({ success: true, count: dataList.length });
  } catch (err: any) {
    console.error(`Crash syncing table ${table} in proxy:`, err);
    return res.status(500).json({ error: err.message || "Internal server error" });
  }
});

// Setup server environment routing
async function startServer() {
  await detectTableLayouts();

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Kidzy Backend Server Engine] Running fully operational on http://localhost:${PORT}`);
  });
}

startServer();
