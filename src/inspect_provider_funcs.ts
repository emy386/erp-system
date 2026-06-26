import fs from 'fs';

function main() {
  const code = fs.readFileSync('temp_kidzy.js', 'utf8');

  // Let's find T5.Provider
  // We can search for "value:" inside the Provider JSX. For example ".Provider,{value:" or "T5.Provider"
  const providerTag = "T5.Provider";
  const pos = code.indexOf(providerTag);
  if (pos !== -1) {
    console.log(`Found "${providerTag}" at index ${pos}`);
    console.log(code.slice(pos - 1000, pos + 1000));
  } else {
    // maybe it is minified as .Provider,{value:
    const providerRegex = /\.Provider/g;
    let m;
    while ((m = providerRegex.exec(code)) !== null) {
      console.log(`Found .Provider at index ${m.index}`);
      console.log(code.slice(m.index - 500, m.index + 500));
    }
  }
}

main();
