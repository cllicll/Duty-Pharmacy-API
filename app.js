const express = require('express');
const fetch = require('node-fetch');
const cheerio = require('cheerio');

const { ApolloServer } = require('apollo-server-express');
const { importSchema } = require('graphql-import');

const resolvers = require('./graphql/resolvers');

const API_URI = 'https://www.haberturk.com/nobetci-eczaneler/{0}/{1}';
const API_CITY_URI = 'https://www.haberturk.com/nobetci-eczaneler/{0}';

const server = new ApolloServer({
    typeDefs: importSchema('./graphql/schema.graphql'),
    resolvers,
    context: {
        API_URI,
        fetch,
        cheerio,
    },
    introspection: true,
    playground: true,
});

const app = express();

app.get('/:city', async (req, res) => {
    var city = req.params.city;

    var datas = [];
    await fetch(API_CITY_URI.replace('{0}', city))
        .then((response) => response.text())
        .then((body) => {
            const $ = cheerio.load(body);

            $('figure').each(function (i, elem) {
                datas[i] = {
                    city: city.charAt(0).toUpperCase() + city.slice(1),
                    town: town.charAt(0).toUpperCase() + town.slice(1),
                    name: $(this).find('div[class=title] h3 a span').text(),
                    address: $(this)
                        .find('figure figcaption p')
                        .first()
                        .text()
                        .split('Adres: ')[1],
                    phone: $(this)
                        .find('figure figcaption p')
                        .last()
                        .text()
                        .split('Telefon: ')[1],
                };
            });
        });
    res.send(datas);
});

app.get('/:city/:town', async (req, res) => {
    var city = req.params.city;
    var town = req.params.town;

    var datas = [];
    await fetch(API_URI.replace('{0}', city).replace('{1}', town))
        .then((response) => response.text())
        .then((body) => {
            const $ = cheerio.load(body);

            $('figure').each(function (i, elem) {
                datas[i] = {
                    city: city.charAt(0).toUpperCase() + city.slice(1),
                    town: town.charAt(0).toUpperCase() + town.slice(1),
                    name: $(this).find('div[class=title] h3 a span').text(),
                    address: $(this)
                        .find('figure figcaption p')
                        .first()
                        .text()
                        .split('Adres: ')[1],
                    phone: $(this)
                        .find('figure figcaption p')
                        .last()
                        .text()
                        .split('Telefon: ')[1],
                };
            });
        });
    res.send(datas);
});

server.applyMiddleware({
    app,
    path: '/graphql',
    cors: {
        origin: true,
        credentials: true,
    },
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(
        `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
    );
});
