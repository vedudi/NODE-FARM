const http = require('http')
const fs = require('fs')
const url = require('url')
const replaceTemplate = require('./modules/replaceTemplate.js')



let tempOverview = fs.readFileSync("./templates/template-overview.html", 'utf-8')
let tempProduct = fs.readFileSync("./templates/template-product.html", 'utf-8')
let tempCard = fs.readFileSync("./templates/template-card.html", 'utf-8')
let data = fs.readFileSync("./dev-data/data.json", 'utf-8')
let dataObj = JSON.parse(data)




const server = http.createServer((req, res) => {
    const { pathname, query } = url.parse(req.url, true)


    switch (pathname) {
        case '/overview':
            const cardHTML = dataObj.map((el) => replaceTemplate(tempCard, el))


            tempOverview = tempOverview.replace('{%PRODUCT_CARDS%}', cardHTML)

            res.end(tempOverview)
            break
        case '/product':

            const item = dataObj.find((item) => item.id == query.id)

            const output = replaceTemplate(tempProduct, item)

            res.end(output)
            break

        default:
            res.end('aradiginiz sayfa bulunamadi')
            break
    }
})











server.listen(4000, '127.0.0.1', () => {
    console.log('4000. porta gelen istekler')
})