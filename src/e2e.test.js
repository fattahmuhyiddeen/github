import puppeteer from 'puppeteer';

describe('Contact Form', () => {
  test('Can submit contact form', async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('http://localhost:3000/');
    await page.type('#language', 'java');
    await page.click('button#search');
    await page.waitForSelector('.result');
    await browser.close();
  });
});
