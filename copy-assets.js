const fs = require('fs');
const path = require('path');

const src = path.resolve(__dirname, 'assets');
const dst = path.resolve(__dirname, 'dist/assets');

if (fs.existsSync(src)) {
  fs.cpSync(src, dst, { recursive: true });
  console.log('Static assets synchronized successfully into dist/assets');
} else {
  console.warn('Assets directory not found at', src);
}
