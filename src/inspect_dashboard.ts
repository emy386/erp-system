import fs from 'fs';

function main() {
  const content = fs.readFileSync('src/temp_components/Fue.js', 'utf8');
  console.log("Dashboard size:", content.length);

  // Search for charting keywords: "LineChart", "BarChart", "PieChart", "ResponsiveContainer", "XAxis"
  const chartTerms = ['ResponsiveContainer', 'LineChart', 'Bar', 'Line', 'XAxis', 'YAxis', 'Tooltip', 'Legend', 'PieChart'];
  console.log("--- Chart library references inside Dashboard (Fue) ---");
  for (const term of chartTerms) {
    console.log(`${term}: ${content.includes(term)}`);
  }

  // Find some key Arabic text headings inside Fue to check the sections in Dashboard:
  // e.g., "نظرة عامة", "إجمالي المبيعات", "الأرباح", "الطلبات", "مبيعات"
  const arabicHeadings = [
    'إجمالي المبيعات', 'الطلبات النشطة', 'التكاليف الإجمالية', 'صافي الأرباح', 'حالة الطلبات', 
    'مصادر الطلبات', 'أهم الموديلات مبيعاً', 'الطلبات المتأخرة', 'أحدث الأوردرات', 'تفاعلية'
  ];
  console.log("\n--- Arabic headings in Fue (Dashboard) ---");
  for (const heading of arabicHeadings) {
    const idx = content.indexOf(heading);
    console.log(`Heading "${heading}": Found: ${idx !== -1} (at ${idx})`);
    if (idx !== -1) {
      console.log(`  Context: ${content.slice(idx - 100, idx + 200)}`);
    }
  }
}

main();
