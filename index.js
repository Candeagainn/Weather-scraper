import Puppeteer from 'puppeteer';

async function init(url) {
    const browser = await Puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto(url);
    try {
        const fecha = await page.waitForSelector('#ctl00_MainContentHolder_txtPastDate');
        fecha.type('30-06-2024')
    } catch (error) {
        console.log('La página no se cargó o no se encontró el selector');
    }
}

init('https://www.worldweatheronline.com/los-angeles-weather-history/california/us.aspx')