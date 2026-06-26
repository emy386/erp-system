import fs from 'fs';

function main() {
  const code = fs.readFileSync('temp_kidzy.js', 'utf8');

  // We want to find where Fue, Gue, Xue, Zue, Que, ede are defined.
  // Example definitions: "const Fue=" or "const Fue = " or "function Fue" or "Fue =" or "Fue="
  const names = ['Fue', 'Gue', 'Xue', 'Zue', 'Que', 'ede'];

  for (const name of names) {
    const searchTerms = [
      `const ${name}=`,
      `const ${name} =`,
      `function ${name}`,
      `${name}=` // common in minified bundles if declared earlier
    ];

    let found = false;
    for (const term of searchTerms) {
      const idx = code.indexOf(term);
      if (idx !== -1) {
        console.log(`Matched term [${term}] at index ${idx}`);
        // Let's print out the next 1500 chars to understand if it is indeed the component
        console.log(`--- Start of ${name} definition ---`);
        console.log(code.slice(idx, idx + 2000));
        console.log(`--- End of ${name} definition snippet ---\n`);
        found = true;
        break;
      }
    }
    if (!found) {
      console.log(`Could not find definition for ${name}`);
    }
  }
}

main();
