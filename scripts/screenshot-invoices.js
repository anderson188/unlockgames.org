/**
 * 生成 32 张 VAT 发票截图（仅发票主体，不包含浏览器按钮/地址栏）
 * 运行: node scripts/screenshot-invoices.js
 */

const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const PROJECT_ROOT = path.resolve(__dirname, '..');
const HTML_FILE = path.join(PROJECT_ROOT, 'samsung-vat-invoice.html');
const OUT_DIR = path.join(PROJECT_ROOT, 'invoice-screenshots');
const htmlUrl = 'file:///' + HTML_FILE.replace(/\\/g, '/');

async function main() {
  if (!fs.existsSync(HTML_FILE)) {
    console.error('找不到 samsung-vat-invoice.html');
    process.exit(1);
  }
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 900, height: 1400, deviceScaleFactor: 2 });

  for (let i = 0; i < 32; i++) {
    const url = htmlUrl + (htmlUrl.indexOf('?') >= 0 ? '&' : '?') + 'invoice=' + i;
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 10000 });
    await new Promise(r => setTimeout(r, 500));
    const num = String(i + 1).padStart(2, '0');
    const outPath = path.join(OUT_DIR, num + '.png');
    await page.screenshot({ path: outPath, type: 'png' });
    console.log('已保存:', outPath);
  }

  await browser.close();
  console.log('完成，共 32 张发票截图在', OUT_DIR);
}

main().catch(function (err) {
  console.error(err);
  process.exit(1);
});
