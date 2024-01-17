import fs from 'fs';
import puppeteer from 'puppeteer';
import { GenericContainer } from 'testcontainers';

const { FILES_FOLDER, CHROME_IMAGE } = process.env;
if (!FILES_FOLDER || !CHROME_IMAGE) throw new Error('Missing environment variables');
fs.mkdirSync(FILES_FOLDER, { recursive: true });

async function main(filesFolder: string, chromeImage: string) {
  const container = await new GenericContainer(chromeImage).withExposedPorts(3000).start();
  try {
    const host = container.getHost();
    const port = container.getMappedPort(3000);
    const browserWSEndpoint = `ws://${host}:${port}`;
  
    console.log('Connecting to browser...');
    const browser = await puppeteer.connect({ browserWSEndpoint });
  
    console.log('Opening new page...');
    const page = await browser.newPage();
    await page.goto('http://www.example.com/');
  
    await page.screenshot({path: `${filesFolder}/screenshot.png`});
    await browser.close();

  } finally {
    await container.stop();
  }
}

main(FILES_FOLDER, CHROME_IMAGE).catch(console.error);
