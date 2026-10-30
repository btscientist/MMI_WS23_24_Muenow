const express = require('express');
const bodyParser = require('body-parser');
const auxiliaryAPI = require('./public/js/auxiliaryAPI.js')

const {urlencoded, json} = bodyParser;
const port = process.env.PORT || 8080;

const app = express();

app.use(json());
app.use(urlencoded({extended: false}));
app.use('/public', express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.sendFile("index.html", {root: __dirname })
});

app.post('/api/fromCelsiusToFahrenheit', (req, res) => {
    const {temperature} = req.body;
    const result = auxiliaryAPI.celsiusToFahrenheit(temperature);
    return res.status(200).send({
        result
    });
});

app.post('/api/fromFahrheitToCelsius', (req, res) => {
    const {temperature} = req.body;
    const result = auxiliaryAPI.fahrenheitToCelsius(temperature);
    return res.status(200).send({
        result
    });
});

app.get('*', (req, res) => res.status(200).send({
    message: 'A wrong link was entered',
}));

app.listen(port, (err) => {
    if (!err) {
        console.log(`App started on port ${port}`);
    } else {
        console.log(err);
    }
});

module.exports = app;
