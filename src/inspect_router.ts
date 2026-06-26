import fs from 'fs';

function main() {
  const code = fs.readFileSync('temp_kidzy.js', 'utf8');

  // Let's search for Routes / Route bindings in the JS
  // It usually looks like {path:"/",element:...} or c.jsx(Route,{path:"/",element:...})
  const routePatterns = [
    'path:"/"',
    'path:"/orders"',
    'path:"/inventory"',
    'path:"/production"',
    'path:"/staff"',
    'path:"/accounts"',
    '<Route'
  ];

  for (const pat of routePatterns) {
    const pos = code.indexOf(pat);
    console.log(`Pattern [${pat}] found: ${pos !== -1} (at ${pos})`);
    if (pos !== -1) {
      console.log(code.slice(pos - 150, pos + 350));
      console.log("------------------------");
    }
  }
}

main();
