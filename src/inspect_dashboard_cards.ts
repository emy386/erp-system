import fs from 'fs';

function main() {
  const content = fs.readFileSync('src/temp_components/Fue.js', 'utf8');
  console.log("Dashboard Cards & Layout Section:");
  console.log(content.slice(3200, 11500));
}

main();
