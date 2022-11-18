const { request } = require('express');
const express = require('express');
const jsdom = require('jsdom');
const axios = require('axios');
const { JSDOM } = jsdom
// const axios = require('axios')
const app = express()


const URL = 'https://www.amazon.in/s?k=iphone+14+pro+max+phone&sprefix=iphone+14+pro+max+ph%2Caps%2C316&ref=nb_sb_ss_softlines-tsdoa-joint-contextual-iss_1_20'

//s-card-container  s-image
//s-card-containe h2 span
//s - card - containe   a - price - whole

async function fetchData() {
    try {
        const response = await axios.get(URL, {
            method: "GET",
            hearders: {
                "authority": " www.amazon.in",
                "upgrade-insecure-requests": 1,
                "User- Agent": " Mozilla/ 5.0(Linux; Android 6.0; Nexus 5 Build / MRA58N) AppleWebKit / 537.36(KHTML, like Gecko) Chrome / 107.0.0.0 Mobile Safari / 537.36",
                " Accept": " text / html, */*",
                "path ": " /hz/rhf ? currentPageType = Search & currentSubPageType=List & excludeAsin=& fieldKeywords=& k=iphone % 252014 % 2520pro % 2520max % 2520 % 252B & keywords=& search=& auditEnabled=& previewCampaigns=& forceWidgets=& searchAlias=aps & isAUI=1 & cardJSPresent=true & pageUrl=% 2F"
            }

        })
        const { document } = (new JSDOM(response.data)).window

        console.log(document.querySelector(".s-card-container .s-image").getAttribute("src"));

    } catch (error) {
        console.log(error, '====error');
    }

}
fetchData()
// console.log(fetchData());
// const dom = new JSDOM('html')




app.listen(3000, () => console.log('server started...'))