const puppeteer = require('puppeteer');

// change the url

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
    /**
     * i think we don't need to have multiple photos 
     * in storage. because the purpose of this program is
     * just to see the progress at the time and we dont need
     * to save any progress.
     * 
     */
    // path: './ss/' + new Date() + '-ss.png',
    path: __basedir + '/ss/photo.png',
    fullPage: true
  });
  browser.close();
  console.log('screenshot-taken!!! at ' + new Date());
  return true;
  } 
};


module.exports = task;