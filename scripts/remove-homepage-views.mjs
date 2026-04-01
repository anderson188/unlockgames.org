import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const p = path.join(root, 'index.html');
let s = fs.readFileSync(p, 'utf8');

// Remove eye view spans on homepage only.
s = s.replace(/<span class="view-count"[^>]*>[\s\S]*?<\/span>/g, '');

// Flatten wrapped date spans back to plain date text.
s = s.replace(/<span class="date-text">(\d{4}-\d{2}-\d{2})<\/span>/g, '$1');

// Clean leftover separators/spaces
s = s.replace(/\s*&nbsp;\s*&middot;\s*&nbsp;\s*/g, '');
s = s.replace(/\s*&middot;\s*/g, '');
s = s.replace(/(<span class="(?:article-item-date|date|sidebar-date)">)\s+/g, '$1');
s = s.replace(/\s+(<\/span>)/g, '$1');

fs.writeFileSync(p, s, 'utf8');
console.log('Removed homepage eye counts from index.html');
