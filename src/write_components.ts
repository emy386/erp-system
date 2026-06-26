import fs from 'fs';
import path from 'path';

function main() {
  const code = fs.readFileSync('temp_kidzy.js', 'utf8');
  console.log("File length:", code.length);

  const names = ['Fue', 'Gue', 'Xue', 'Zue', 'Que', 'ede'];
  const dir = './src/temp_components';
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // Let's find definition markers and approximate ends:
  // Since they are defined as "function Fue()" or "function Gue()" etc, we can find "function Name" and matching closing braces or just extract a large chunk.
  // Actually, since JavaScript is written as a sequence of function declarations or assignments, we can find the start of function Fue and find the start of the next component or some other marker, or we can just extract 150000 characters from each start.
  // To be safe, we can find the index of "function Fue()" and copy up to the next component function start.
  // Let's sort the component indices to see their order.
  
  const matches: { name: string, index: number }[] = [];
  
  for (const name of names) {
    const searchTerms = [
      `function ${name}()`,
      `function ${name}(`,
      `const ${name}=`,
      `const ${name} =`
    ];
    for (const term of searchTerms) {
      const idx = code.indexOf(term);
      if (idx !== -1) {
        matches.push({ name, index: idx });
        break;
      }
    }
  }

  // Also look for login component or main App routing component (e.g. "nde" or similar at the end)
  const ndeIdx = code.indexOf("function nde()");
  if (ndeIdx !== -1) {
    matches.push({ name: 'nde', index: ndeIdx });
  }
  const loginIdx = code.indexOf("function IP("); // wait, we saw IP in the previous log: "isTaskModalOpen:m,setIsTaskModalOpen:v... editingTask:D,editingRole:K"
  if (loginIdx !== -1) {
    matches.push({ name: 'IP', index: loginIdx });
  }

  // Sort by index descending (or ascending)
  matches.sort((a, b) => a.index - b.index);

  console.log("Found components order:");
  console.log(matches.map(m => `${m.name} at ${m.index}`).join("\n"));

  for (let i = 0; i < matches.length; i++) {
    const current = matches[i];
    const next = matches[i + 1];
    const start = current.index;
    const end = next ? next.index : code.length;

    const compCode = code.slice(start, end);
    const filePath = path.join(dir, `${current.name}.js`);
    fs.writeFileSync(filePath, compCode);
    console.log(`Wrote ${current.name} to ${filePath} (${compCode.length} chars)`);
  }
}

main();
