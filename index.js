import Puppeteer from 'puppeteer';

async function init(url) {
    const browser = await Puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto(url);
    
        const fecha = await page.waitForSelector('#ctl00_MainContentHolder_txtPastDate');
        await fecha.type('30-06-2024')
        const fechaButton = await page.waitForSelector('#ctl00_MainContentHolder_butShowPastWeather');
        await fechaButton.click();

        try {
        const resultado = await page.evaluate(() => {
            const temp18 = document.querySelector('#aspnetForm > div.wrapper > section > div > div > div.col.main > div:nth-child(5) > div > div > div.days-details > table > tbody > tr:nth-child(9) > td:nth-child(1) > p.days-temp').innerText;
            const temp21 = document.querySelector('#aspnetForm > div.wrapper > section > div > div > div.col.main > div:nth-child(5) > div > div > div.days-details > table > tbody > tr:nth-child(10) > td:nth-child(1) > p.days-temp').innerText;
     
            
            console.log(temp18, temp21)

            const tempPromedio = (parseInt(temp18) + parseInt(temp21)) / 2;
            return tempPromedio;

        })


        console.log(`La temperatura promedio para el 30 de junio de 2024 en Los Ángeles fue de ${resultado}°C`);

        browser.close();


    } catch (error) {
        console.log('La página no se cargó o no se encontró el selector', error);
    }






}

init('https://www.worldweatheronline.com/los-angeles-weather-history/california/us.aspx')