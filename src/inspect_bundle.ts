import fs from 'fs';
import path from 'path';

async function main() {
  console.log("Fetching Kidzy website resources...");
  try {
    const htmlUrl = 'https://kidzy-568603641788.europe-west2.run.app';
    const htmlRes = await fetch(htmlUrl);
    const htmlText = await htmlRes.text();
    console.log("HTML length:", htmlText.length);

    // Parse assets from HTML
    const jsRegex = /\/assets\/index-[a-zA-Z0-9_\-]+\.js/;
    const cssRegex = /\/assets\/index-[a-zA-Z0-9_\-]+\.css/;
    
    const jsMatch = htmlText.match(jsRegex);
    const cssMatch = htmlText.match(cssRegex);
    
    console.log("JS Asset Match:", jsMatch ? jsMatch[0] : "None");
    console.log("CSS Asset Match:", cssMatch ? cssMatch[0] : "None");

    const jsUrl = jsMatch ? `${htmlUrl}${jsMatch[0]}` : null;
    const cssUrl = cssMatch ? `${htmlUrl}${cssMatch[0]}` : null;

    if (jsUrl) {
      console.log(`Fetching JS from ${jsUrl}...`);
      const jsRes = await fetch(jsUrl);
      const jsText = await jsRes.text();
      console.log("JS length:", jsText.length);
      
      // Save it to a file temporarily so we can grep it or read it
      fs.writeFileSync('temp_kidzy.js', jsText);
      console.log("Saved JS bundle to temp_kidzy.js");

      // Extract string constants from the minified js
      // We look for string patterns (e.g. "...", '...')
      // Or we can just log a list of unique words/phrases to get a summary
      const doubleQuoteStrings = [...jsText.matchAll(/"([^"\\]|\\.)*"/g)].map(m => m[0]);
      const singleQuoteStrings = [...jsText.matchAll(/'([^'\\]|\\.)*'/g)].map(m => m[0]);
      const backtickStrings = [...jsText.matchAll(/`([^`\\]|\\.)*`/g)].map(m => m[0]);
      
      const allStrings = [...doubleQuoteStrings, ...singleQuoteStrings, ...backtickStrings]
        .map(s => s.slice(1, -1))
        .filter(s => s.length > 2 && /^[a-zA-Z0-9\s.,!?'"\-()#%@:;[\]{}]+$/.test(s));
      
      console.log(`Found ${allStrings.length} simple string literals.`);
      
      // Let's filter strings that look like english texts or UI elements
      const uiStrings = Array.from(new Set(allStrings))
        .filter(s => s.trim().split(/\s+/).length >= 2 || s.length > 10);
      
      console.log("\n--- SIGNATURE RECURRING STRINGS ---");
      // Pick strings containing interesting terms
      const keyWords = ['kid', 'quiz', 'game', 'score', 'parent', 'activity', 'learn', 'play', 'task', 'avatar', 'reward', 'theme', 'level', 'question', 'setting', 'api'];
      const themedStrings = uiStrings.filter(s => keyWords.some(k => s.toLowerCase().includes(k)));
      console.log(themedStrings.slice(0, 100).join("\n"));
      
      console.log("\n--- LONG UI STRINGS / PROMPTS ---");
      const longStrings = uiStrings.filter(s => s.length > 30);
      console.log(longStrings.slice(0, 100).join("\n"));
    }

    if (cssUrl) {
      console.log(`Fetching CSS from ${cssUrl}...`);
      const cssRes = await fetch(cssUrl);
      const cssText = await cssRes.text();
      console.log("CSS length:", cssText.length);
      fs.writeFileSync('temp_kidzy.css', cssText);
      console.log("Saved CSS to temp_kidzy.css");
    }

  } catch (error) {
    console.error("Error running inspection script:", error);
  }
}

main();
