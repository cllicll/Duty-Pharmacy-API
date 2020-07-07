const Query = {
    getDutyPharmacy: async (parent, args, { API_URI, API_CITY_URI, fetch, cheerio, slugify }) => {
        var datas = [];
        if (args.town) {
            await fetch(API_URI.replace('{0}', slugify(args.city)).replace('{1}', slugify(args.town)))
            .then((response) => response.text())
            .then((body) => {
                const $ = cheerio.load(body);

                $('figure').each(function (i, elem) {
                    datas[i] = {
                        city:
                            args.city.charAt(0).toUpperCase() +
                            args.city.slice(1),
                        town:
                            args.town.charAt(0).toUpperCase() +
                            args.town.slice(1),
                        name: $(this).find('div[class=title] h3 a span').text(),
                        address: $(this)
                            .find('figcaption p')
                            .first()
                            .text()
                            .split('Adres: ')[1],
                        phone: $(this)
                            .find('figcaption p')
                            .last()
                            .text()
                            .split('Telefon: ')[1],
                    };
                });
            });
        } else {
            await fetch(API_CITY_URI.replace('{0}', slugify(args.city)))
            .then((response) => response.text())
            .then((body) => {
                const $ = cheerio.load(body);

                $('figure').each(function (i, elem) {
                    datas[i] = {
                        city:
                            args.city.charAt(0).toUpperCase() +
                            args.city.slice(1),
                        town:
                            args.town.charAt(0).toUpperCase() +
                            args.town.slice(1),
                        name: $(this).find('div[class=title] h3 a span').text(),
                        address: $(this)
                            .find('figcaption p')
                            .first()
                            .text()
                            .split('Adres: ')[1],
                        phone: $(this)
                            .find('figcaption p')
                            .last()
                            .text()
                            .split('Telefon: ')[1],
                    };
                });
            });
        }
        return datas;
    },
};

module.exports = Query;
