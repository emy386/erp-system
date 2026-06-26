import fs from 'fs';

function main() {
  const code = fs.readFileSync('temp_kidzy.js', 'utf8');

  // Let's find occurrences of '/orders', '/inventory', '/production', '/staff', '/accounts' but in a routing context
  // e.g., Route rendering or path matching
  const searchTerms = [
    'path:"/"',
    'path:"/orders"',
    'path:"/inventory"',
    'path:"/production"',
    'path:"/staff"',
    'path:"/accounts"'
  ];

  for (const term of searchTerms) {
    let startIdx = 0;
    while (true) {
      const idx = code.indexOf(term, startIdx);
      if (idx === -1) break;
      console.log(`Found "${term}" at index ${idx}`);
      // skip the sidebar occurrence which is around index 504000
      if (idx < 504000 || idx > 505500) {
        console.log("--- Surrounding context ---");
        console.log(code.slice(Math.max(0, idx - 100), Math.min(code.length, idx + 400)));
        console.log("==============================\n");
      }
      startIdx = idx + term.length;
    }
  }
}

main();
