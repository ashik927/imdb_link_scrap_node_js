const request = require("request-promise")
const cheerio = require("cheerio")
const fs = require("fs")
const json2csv = require("json2csv").Parser;


const movie = "https://www.imdb.com/title/tt3480822/?ref_=tt_sims_tt_i_1";

    (async () => {
        let imdbData = []
        const response = await request({
            uri: movie,
            headers: {
                "accept": "text / html, application/ xhtml + xml, application/ xml; q = 0.9, image / avif, image / webp, image / apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                "accept-encoding": "gzip, deflate, br",
                "accept-language": "en-US,en;q=0.9",
        },
        gzip:true
    });
    //*[@id="__next"]/main/div[2]/div[3]/div[6]/div/div/div/div[2]/div[1]
    let $ = cheerio.load(response)
    let title = $('h1[class="TitleHeader__TitleText-sc-1wu6n3d-0 dxSWFG"]').text().trim();
    let summary = $('span[class="GenresAndPlot__TextContainerBreakpointXL-cum89p-2 gCtawA"]').text().trim();
    let rating = $('span[class="AggregateRatingButton__RatingScore-sc-1ll29m0-1 iTLWoV"] > strong > span').text();
    let director = $('a[class="ipc-metadata-list-item__list-content-item ipc-metadata-list-item__list-content-item--link"]').text().trim();
    imdbData.push( {title: title, summary: summary, rating: rating, director:director})

    const j2cp = new json2csv
    const csv = j2cp.parse(imdbData)
    fs.writeFileSync("./imdb.csv", csv,"utf-8")
})();

