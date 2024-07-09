import Puppeteer from 'puppeteer';

async function init(url) {
    const browser = await Puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto(url);
    try {
        const fecha = await page.waitForSelector('#ctl00_MainContentHolder_txtPastDate');
        await fecha.type('30-06-2024')
        const fechaButton = await page.waitForSelector('#ctl00_MainContentHolder_butShowPastWeather');
        await fechaButton.click();

        await page.waitForSelector('.days-details-table > tbody > tr:nth-child(9) > td > .days-temp');
        await page.waitForSelector('.days-details-table > tbody > tr:nth-child(10) > td > .days-temp');

        const temp18 = await page.evaluate(()=>{
           return page.querySelector('.days-details-table > tbody > tr:nth-child(9) > td > .days-temp').innerText;
        })
        
        const temp21 = await page.evaluate(()=>{
            return page.querySelector('.days-details-table > tbody > tr:nth-child(10) > td > .days-temp').innerText;
         })

        const tempPromedio = (parseInt(temp18) + parseInt(temp21)) / 2;

        console.log(`La temperatura promedio para el 30 de junio de 2024 en Los Ángeles fue de ${tempPromedio}°C`);


    } catch (error) {
        console.log('La página no se cargó o no se encontró el selector');
    }



    


}   

init('https://www.worldweatheronline.com/los-angeles-weather-history/california/us.aspx')