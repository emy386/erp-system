import fs from 'fs';

function main() {
  const content = fs.readFileSync('temp_kidzy.js', 'utf8');
  console.log("Searching for Kue definition:");
  
  const pos = content.indexOf('function Kue');
  if (pos !== -1) {
    console.log(`Found function Kue at index ${pos}:`);
    console.log(content.slice(pos, pos + 3000));
  } else {
    const rx = /const\s+Kue\s*=/g;
    const m = rx.exec(content);
    if (m) {
      console.log(`Found const Kue at index ${m.index}:`);
      console.log(content.slice(m.index, m.index + 3000));
    } else {
      console.log("Kue declaration not directly found, searching for general keyword 'Kue'");
      // print first 5 occurrences of Kue
      let start = 0;
      for (let i = 0; i < 5; i++) {
        const p = content.indexOf('Kue', start);
        if (p === -1) break;
        console.log(`Occurrence ${i} of Kue at ${p}:`);
        console.log(content.slice(p - 100, p + 250));
        start = p + 3;
      }
    }
  }
}

main();
