/**
 * 为 32 笔订单生成收据截图（不包含上方按钮），保存为 receipt-screenshots/01.png .. 32.png
 * 需要先安装: npm install puppeteer
 * 在项目根目录运行: node scripts/screenshot-orders.js
 */

const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const PROJECT_ROOT = path.resolve(__dirname, '..');
const HTML_FILE = path.join(PROJECT_ROOT, 'samsung-receipt.html');
const OUT_DIR = path.join(PROJECT_ROOT, 'receipt-screenshots');

const htmlUrl = 'file:///' + HTML_FILE.replace(/\\/g, '/');

async function main() {
  if (!fs.existsSync(HTML_FILE)) {
    console.error('找不到 samsung-receipt.html，路径:', HTML_FILE);
    process.exit(1);
  }
  if (!fs.existsSync(OUT_DIR)) {
    fs.mkdirSync(OUT_DIR, { recursive: true });
    console.log('已创建文件夹:', OUT_DIR);
  }

  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 480, height: 900, deviceScaleFactor: 2 });

  for (let i = 0; i < 32; i++) {
    const url = htmlUrl + '?order=' + i;
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 10000 });
    await new Promise(function (r) { setTimeout(r, 400); });
    const num = String(i + 1).padStart(2, '0');
    const outPath = path.join(OUT_DIR, num + '.png');
    await page.screenshot({ path: outPath, type: 'png' });
    console.log('已保存:', outPath);
  }

  await browser.close();
  console.log('完成，共 32 张截图在', OUT_DIR);
}

main().catch(function (err) {
  console.error(err);
  process.exit(1);
});
