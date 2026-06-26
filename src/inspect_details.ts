import fs from 'fs';

function main() {
  const content = fs.readFileSync('temp_kidzy.js', 'utf8');
  console.log("Searching JS content...");

  // Let's look for button names and headers
  // Usually buttons and headers are strings like "Create...", "Add...", "Save...", "Delete..."
  // Or text inside React components. Let's search for interesting strings:
  const searchTerms = [
    'Kidzy', 'Management', 'Dashboard', 'Admin', 'Staff', 'Task', 'Role', 'Cost', 'Profit', 
    'Workshop', 'Order', 'Shipping', 'Materials', 'Calculator', 'Log', 'Register'
  ];

  for (const term of searchTerms) {
    const regex = new RegExp(`[^a-zA-Z0-9]${term}[^a-zA-Z0-9]`, 'gi');
    const matches = content.match(regex);
    console.log(`Term "${term}": ${matches ? matches.length : 0} occurrences`);
  }

  // Find all strings containing "title" or "header" or "label" or specific menus
  // Let's extract substrings around "materialsCost"
  const idx = content.indexOf("materialsCost");
  if (idx !== -1) {
    console.log("\n--- Substring around materialsCost ---");
    console.log(content.slice(Math.max(0, idx - 400), Math.min(content.length, idx + 1000)));
  }

  const idxStaff = content.indexOf("staffRoles");
  if (idxStaff !== -1) {
    console.log("\n--- Substring around staffRoles ---");
    console.log(content.slice(Math.max(0, idxStaff - 400), Math.min(content.length, idxStaff + 1000)));
  }

  // Find occurrences of common icons or tabs
  const tabRegex = /tab|menu|view|screen/gi;
  // Let's search for any menu list:
  const menuKeywords = ['Overview', 'Products', 'Orders', 'Staff', 'Tasks', 'Roles', 'Settings', 'Inventory', 'Production'];
  console.log("\n--- Menu words search ---");
  for (const menu of menuKeywords) {
    const matches = content.match(new RegExp(`"${menu}"|'${menu}'`, 'g'));
    console.log(`${menu}: ${matches ? matches.length : 0} matches`);
  }
}

main();
