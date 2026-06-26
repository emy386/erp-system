/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

const { GoogleGenAI } = require("@google/genai");

module.exports = async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { source } = req.body;
  if (!source) {
    return res.status(400).json({ error: "لم يتم تزويد النظام بمدخلات الاستخراج الشاتي الصوري." });
  }

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

    const parts = [];
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
          type: "OBJECT",
          properties: {
            customerName: { type: "STRING" },
            childName: { type: "STRING" },
            customerPhone: { type: "STRING" },
            customerPhone2: { type: "STRING" },
            governorate: { type: "STRING" },
            address: { type: "STRING" },
            discount: { type: "NUMBER" },
            deliveryDuration: { type: "STRING", description: "either 'normal' or 'urgent'" },
            notes: { type: "STRING" },
            items: {
              type: "ARRAY",
              items: {
                type: "OBJECT",
                properties: {
                  name: { type: "STRING" },
                  quantity: { type: "NUMBER" },
                  price: { type: "NUMBER" },
                  color: { type: "STRING" },
                  size: { type: "STRING" }
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
  } catch (err) {
    console.error("Error running server-side Gemini OCR extractor:", err);
    return res.status(500).json({ 
      error: `فشل استخراج تفاصيل الأورد بمساعدة الذكاء الاصطناعي: ${err.message || "خطأ غير معروف في خوادم Gemini"}` 
    });
  }
}
