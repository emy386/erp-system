import fs from 'fs';

function main() {
  const content = fs.readFileSync('src/temp_components/Fue.js', 'utf8');
  
  // Search for the slice of code referencing "C.map" (the daily sales list)
  const codeIdx = content.indexOf('C.map');
  if (codeIdx !== -1) {
    console.log("Found C.map rendering at index", codeIdx);
    console.log(content.slice(codeIdx - 200, codeIdx + 2500));
  } else {
    // maybe it calls something else, let's check for standard layout details
    console.log("C.map not found, printing some sections near index 15000");
    console.log(content.slice(15000, 18000));
  }
}

main();
