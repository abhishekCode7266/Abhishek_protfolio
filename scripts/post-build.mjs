import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '..', 'dist');

if (fs.existsSync(distDir)) {
  // 1. Copy index.html to 404.html for GitHub Pages SPA fallback
  const indexPath = path.join(distDir, 'index.html');
  const notFoundPath = path.join(distDir, '404.html');
  if (fs.existsSync(indexPath)) {
    fs.copyFileSync(indexPath, notFoundPath);
    console.log('✅ Created dist/404.html from dist/index.html');
  }

  // 2. Create .nojekyll so GitHub Pages does not ignore files/folders starting with underscore
  const nojekyllPath = path.join(distDir, '.nojekyll');
  fs.writeFileSync(nojekyllPath, '');
  console.log('✅ Created dist/.nojekyll');
} else {
  console.error('❌ dist directory does not exist! Build might have failed.');
  process.exit(1);
}
