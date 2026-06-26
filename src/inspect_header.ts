import fs from 'fs';

function main() {
  const code = fs.readFileSync('temp_kidzy.js', 'utf8');

  // Search for V7 and q7 definitions
  const names = ['V7', 'q7'];
  for (const name of names) {
    const searchTerms = [
      `function ${name}(`,
      `const ${name}=`,
      `const ${name} =`
    ];
    let found = false;
    for (const term of searchTerms) {
      const idx = code.indexOf(term);
      if (idx !== -1) {
        console.log(`Matched term [${term}] at index ${idx}`);
        console.log(`--- Start of ${name} ---`);
        console.log(code.slice(idx, idx + 2000));
        console.log(`--- End of ${name} ---\n`);
        found = true;
        break;
      }
    }
  }
}

main();
