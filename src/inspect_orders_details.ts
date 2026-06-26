import fs from 'fs';

function main() {
  const content = fs.readFileSync('src/temp_components/Gue.js', 'utf8');
  console.log("Orders Component Start (first 4000 characters):");
  console.log(content.slice(0, 4000));
}

main();
