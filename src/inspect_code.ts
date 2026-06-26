import fs from 'fs';

function main() {
  const code = fs.readFileSync('temp_kidzy.js', 'utf8');
  console.log("File length:", code.length);

  // Let's find words in Arabic (Arabic characters range: \u0600-\u06FF)
  // We want to find Arabic phrases of length > 5, which represents UI labels, headers, etc.
  const arabicRegex = /[\u0600-\u06FF\s0-9%:\-(),.!]{2,}/g;
  const arabicMatches = code.match(/[\u0600-\u06FF][\u0600-\u06FF\s0-9%:\-(),.!]{3,}/g) || [];
  const uniqueArabicText = Array.from(new Set(arabicMatches))
    .map(t => t.trim())
    .filter(t => t.length > 3);

  console.log(`Found ${uniqueArabicText.length} Arabic phrases in the bundle.`);
  console.log("\nSome sample Arabic phrases (UI text):");
  console.log(uniqueArabicText.slice(0, 150).join(" | "));

  // Let's search for specific keys to find the layout, like:
  // "activeTab" or state holding the current tab
  const activeTabIdx = code.indexOf("activeTab") !== -1 ? code.indexOf("activeTab") : code.indexOf("Tab");
  console.log("\nactiveTab index in js:", activeTabIdx);
  if (activeTabIdx !== -1) {
    console.log(code.slice(activeTabIdx - 100, activeTabIdx + 200));
  }

  // Let's search for "dashboard" or "products" or "orders" tabs in Arabic
  // Arabic meanings for tabs:
  // Overview: نظرة عامة or الرئيسية or لوحة التحكم
  // Products: المنتجات
  // Orders: الطلبات
  // Staff / Employees: الموظفين or الموظفون or طاقم العمل
  // Tasks: المهام
  // Roles: الأدوار
  // Finance: المالية or الحسابات or المعاملات
  const customSearch = [
    'نظرة عامة', 'المنتجات', 'الطلبات', 'الموظفين', 'المهام', 'الأدوار', 'المالية', 'الحسابات', 
    'لوحة التحكم', 'الإعدادات', 'إضافة منتج', 'إضافة طلب', 'إضافة موظف', 'إضافة مهمة', 'إضافة دور'
  ];
  console.log("\nArabic Keyword occurrences:");
  for (const item of customSearch) {
    const termIdx = code.indexOf(item);
    console.log(`Keyword "${item}": Found at index ${termIdx}`);
    if (termIdx !== -1) {
      // Find the surrounding 150 chars
      console.log(`  Context: ${code.slice(termIdx - 50, termIdx + 150)}`);
    }
  }

  // Let's write a finder that gets blocks of React layout
  // We want to inspect the structure of the Tabs and page rendering to match it perfectly.
  // We can search for the layout JSX:
  const flexRow = code.indexOf("flex h-screen");
  if (flexRow !== -1) {
    console.log("\nFound 'flex h-screen' layout:");
    console.log(code.slice(flexRow - 100, flexRow + 400));
  } else {
    // let's look for grid / flex layouts in index.css or search for classes like "sidebar" or "bg-slate" or "bg-gray"
    const bgClasses = ['bg-indigo', 'bg-blue', 'bg-emerald', 'bg-slate', 'bg-violet', 'bg-pink', 'bg-purple'];
    bgClasses.forEach(cl => {
      const pos = code.indexOf(cl);
      if (pos !== -1) {
        console.log(`Class "${cl}": Found at ${pos} -> Context: ${code.slice(pos - 50, pos + 100)}`);
      }
    });
  }

  // Find all state declarations using "useState" or "useState("
  const stateHooks: string[] = [];
  const stateRegex = /const\s+\[([a-zA-Z0-9_,\s]+)\]\s*=\s*[a-zA-Z0-9_]*\.useState\((.*?)\)/g;
  let match;
  while ((match = stateRegex.exec(code)) !== null) {
    stateHooks.push(`${match[1]} = useState(${match[2]})`);
  }
  console.log(`\nFound State Hooks (${stateHooks.length}):`);
  console.log(stateHooks.slice(0, 50).join("\n"));
}

main();
