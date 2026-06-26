import fs from 'fs';

function main() {
  const code = fs.readFileSync('temp_kidzy.js', 'utf8');

  // Find the exact provider code
  const providerPos = code.indexOf("_q=");
  if (providerPos !== -1) {
    console.log("--- Context Provider _q ---");
    // Print around 25000 chars from here to see the entire context logic
    console.log(code.slice(providerPos, providerPos + 25000));
  }

  // Find the custom hook _a
  // It is likely the consumer hook of T5 (the Kidzy Context)
  const hookPos = code.indexOf("_a=");
  if (hookPos !== -1) {
    console.log("\n--- Custom Hook _a ---");
    console.log(code.slice(hookPos, hookPos + 500));
  } else {
    // Let's search for "useContext(T5)"
    const useContextPos = code.indexOf("Context(T5)");
    if (useContextPos !== -1) {
      console.log("\n--- useContext(T5) Match ---");
      console.log(code.slice(useContextPos - 100, useContextPos + 200));
    }
  }
}

main();
