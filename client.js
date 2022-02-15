/**
 * @param {number} size
 */
function createURL(size) {
  const baseURL = 'http://localhost:8080/?';
  const params = 'a'.repeat(size - baseURL.length);
  return baseURL + params;
}

/**
 * @param {number} size
 */
function createURL2(size) {
  const baseURL = 'https://localhost:8443/?';
  const params = 'a'.repeat(size - baseURL.length);
  return baseURL + params;
}

const _2KB = 2 * 1024; // 2048
const _2083 = 2083;
const _8182 = 8182;
const _8KB = 8 * 1024; // 8192
const _16KB = 16 * 1024; // 16384
const _32KB = 32 * 1024; // 32768
const _64KB = 64 * 1024; // 65536
const _1MB = 1 * 1024 * 1024; // 1048576  Error: spawn E2BIG
const _2MB = 2 * 1024 * 1024; // 2097152  Error: spawn E2BIG
const _4MB = 4 * 1024 * 1024; // 4194304

/**
 * @param {string} url
 */
function openBrowser(url) {
  const open = require('open');
  return open(url, {
    app: {
      // name: open.apps.chrome
      name: open.apps.firefox
    }
  });
}

/**
 * @param {string} url
 */
function openChrome(url) {
  const childProcess = require('child_process');
  switch (process.platform) {
    case 'win32':
      return childProcess.exec(`start chrome ${url}`);
    case 'darwin':
      return childProcess.exec(`open -a "Google Chrome" ${url}`);
    default:
      throw new Error('not supported');
  }
}

/**
 * @param {string} url
 */
async function openPuppeteer(url) {
  const puppeteer = require('puppeteer');
  const browser = await puppeteer.launch({
    headless: false
  });
  const page = await browser.newPage();
  return await page.goto(url);
  // other actions...
  // await browser.close();
}

/**
 * @param {string} url
 */
async function openPlaywright(url) {
  const { chromium, firefox, webkit } = require('playwright-core');
  const browser = await firefox.launch(); // Or 'firefox' or 'webkit'.
  const page = await browser.newPage();
  await page.goto(url);
  // other actions...
  // await browser.close();
}

// try {
//   openPuppeteer(url);
// } catch(err) {
//   console.error(err.message);
// }

document.getElementById('http-link').href = createURL(_2MB);

document.getElementById('https-link').href = createURL2(_2MB);
