import fs from 'fs';

function main() {
  const code = fs.readFileSync('temp_kidzy.js', 'utf8');

  // Let's search for "vU=" or "vU =" or look for the imports in the bundle
  const symbols = ['vU', 'qG', 'G$', 'ks', 'yl'];
  for (const sym of symbols) {
    const rx = new RegExp(`const\\s+${sym}\\s*=`, 'g');
    let m = rx.exec(code);
    if (m) {
      console.log(`Symbol ${sym} defined at ${m.index}:`);
      console.log(code.slice(m.index, m.index + 200));
    } else {
      // maybe it's defined like "function sym" or "let sym" or in destructuring:
      const rx2 = new RegExp(`[,{]\\s*${sym}\\s*[:=]`, 'g');
      let m2 = rx2.exec(code);
      if (m2) {
        console.log(`Symbol ${sym} matched des/assign at ${m2.index}:`);
        console.log(code.slice(m2.index - 50, m2.index + 250));
      }
    }
  }
}

main();
