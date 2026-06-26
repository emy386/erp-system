import fs from 'fs';

function main() {
  const content = fs.readFileSync('src/temp_components/Fue.js', 'utf8');
  
  // Let's find all ".map" inside Fue.js and output their surroundings
  let pos = content.indexOf('.map');
  while (pos !== -1) {
    console.log(`\nFound .map at ${pos}:`);
    console.log(content.slice(pos - 150, pos + 400));
    pos = content.indexOf('.map', pos + 1);
  }
}

main();
