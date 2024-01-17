import fs from 'fs';
import puppeteer from 'puppeteer';

const { FILES_FOLDER, CHROME_IMAGE } = process.env;
if (!FILES_FOLDER || !CHROME_IMAGE) throw new Error('Missing environment variables');
fs.mkdirSync(FILES_FOLDER, { recursive: true });

async function main(filesFolder: string, chromeImage: string) {
  console.log('Connecting to browser...');
  const browser = await puppeteer.launch({ headless: "new" });

  console.log('Opening new page...');
  const page = await browser.newPage();
  await page.goto('http://www.example.com/');

  console.log('Taking screenshot...');
  await page.screenshot({path: `${filesFolder}/screenshot.png`});
  await browser.close();
}

main(FILES_FOLDER, CHROME_IMAGE).catch(console.error);
