const { request } = require('express');
const express = require('express');
const jsdom = require('jsdom');
const axios = require('axios');
const { JSDOM } = jsdom
// const axios = require('axios')
const app = express()

app.set('view engine', 'ejs')


const URL = 'https://www.amazon.in/s?k=iphone+14+pro+max+phone&sprefix=iphone+14+pro+max+ph%2Caps%2C638&ref=nb_sb_ss_softlines-tsdoa-joint-contextual-iss_1_20'


async function fetchData() {
    try {
        const response = await axios.get(URL, {
            method: "GET",
            headers: {
                "method": " GET",
                "authority": " www.amazon.in",
                "upgrade-insecure-requests": 1,
                "User- Agent": " Mozilla/ 5.0(Linux; Android 6.0; Nexus 5 Build / MRA58N) AppleWebKit / 537.36(KHTML, like Gecko) Chrome / 107.0.0.0 Mobile Safari / 537.36",
                " Accept": " text / html, */*",

            }

        })
        const { document } = (new JSDOM(response.data)).window

        const products = []

        document.querySelectorAll(".s-card-container ").forEach(element => {

            products.push({
                image: element.querySelector(".s-image").src,
                title: document.querySelector(" h2 span").textContent,
                price: document.querySelector(".a-price-whole").textContent
            })
        })
        return products

    } catch (error) {
        console.log(error, '====error');
    }

}
// const products = fetchData()
// console.log(products);

app.get('/', async (req, res) => {
    const products = await fetchData()
    // res.send(products)
    res.send(products)

    // res.render('pages/file.ejs', { products })
})





// console.log(fetchData());
// const dom = new JSDOM('html')




app.listen(3000, () => console.log('server started...'))