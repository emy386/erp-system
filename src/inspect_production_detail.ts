import fs from 'fs';

function main() {
  const content = fs.readFileSync('src/temp_components/Zue.js', 'utf8');
  console.log("Production Start (first 4000 chars):");
  console.log(content.slice(0, 4000));
}

main();
