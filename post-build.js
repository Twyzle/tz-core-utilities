const fs = require('fs');
const path = require('path');

try {
  const filePath = path.join(__dirname, 'dist', 'index.mjs');
  const data = fs.readFileSync(filePath, 'utf8');
  const updatedData = data.replace(/(from ")lodash-es\/([^\"]+)(")/g, '$1lodash-es/$2.js$3');
  fs.writeFileSync(filePath, updatedData, 'utf8');
} catch (err) {
  console.error('An error occurred in the post-build script:', err);
  process.exit(1);
}
