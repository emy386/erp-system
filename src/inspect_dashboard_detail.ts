import fs from 'fs';

function main() {
  const content = fs.readFileSync('src/temp_components/Fue.js', 'utf8');
  console.log("Dashboard Start (up to 3500 chars):");
  // Print the top of Fue.js to read its variables and computations
  console.log(content.slice(0, 3500));
}

main();
