const puppeteer = require('puppeteer');

const task = { run: async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  await page.setViewport({
    width: 1280,
    height: 800
  });
  await page.goto('http://localhost:8080/#/login');
  await page.type('#username', 'admin');
  await page.type('#password', 'password');
  await page.click('#submit-form');
  await page.waitForNavigation();
  await page.goto('http://localhost:8080/#/orders', {
    waitUntil: "networkidle0",
    timeout: 10000,
  });
  // await page.waitFor(2000);
  await page.screenshot({
    // path: './ss/' + new Date() + '-ss.png',
    path: './ss/photo.png',
    fullPage: true
  });
  browser.close();
  console.log('screenshot-taken!!!');
  } 
};


module.exports = task;