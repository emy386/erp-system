import fs from 'fs';

function main() {
  const code = fs.readFileSync('temp_kidzy.js', 'utf8');

  // Let's search for "G$=" or "function G$" or just find the location of G$
  // Let's do a substring search for "G$"
  const searchTerms = [
    'const qG=',
    'const qG =',
    'function qG',
    'qG='
  ];

  for (const term of searchTerms) {
    const pos = code.indexOf(term);
    if (pos !== -1) {
      console.log(`Matched term [${term}] at index ${pos}`);
      console.log(code.slice(pos, pos + 3000));
      break;
    }
  }
}

main();
