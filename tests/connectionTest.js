// Stufe 3: Verbindungstests, Befunde siehe BEFUNDE.md
const supertest = require('supertest');
const server = require('../index');
const chai = require('chai');
chai.should();
const api = supertest.agent(server);

describe('POST /api/fromCelsiusToFahrenheit', function () {
    it('rechnet 100 Grad Celsius in 212 Fahrenheit um', function () {
        return api.post('/api/fromCelsiusToFahrenheit')
            .send({temperature: 100})
            .expect(200)
            .then(function (res) {
                res.body.result.should.equal(212);
            });
    });

    it('rechnet 0 Grad Celsius in 32 Fahrenheit um', function () {
        return api.post('/api/fromCelsiusToFahrenheit')
            .send({temperature: 0})
            .expect(200)
            .then(function (res) {
                res.body.result.should.equal(32);
            });
    });

    it('antwortet ohne Eingabe trotzdem mit 200 und einem leeren Ergebnis', function () {
        return api.post('/api/fromCelsiusToFahrenheit')
            .send({})
            .expect(200)
            .then(function (res) {
                (res.body.result === null).should.equal(true);
            });
    });
});

describe('POST /api/fromFahrheitToCelsius', function () {
    it('rechnet 212 Fahrenheit in 100 Grad Celsius um', function () {
        return api.post('/api/fromFahrheitToCelsius')
            .send({temperature: 212})
            .expect(200)
            .then(function (res) {
                res.body.result.should.equal(100);
            });
    });

    it('ist im Pfad falsch geschrieben, der richtige Name trifft nichts', function () {
        return api.post('/api/fromFahrenheitToCelsius')
            .send({temperature: 212})
            .expect(404);
    });
});

describe('Startseite und Catch-all', function () {
    it('liefert unter / die Startseite als HTML aus', function () {
        return api.get('/')
            .expect(200)
            .expect('Content-Type', /html/);
    });

    it('antwortet auf einen unbekannten GET-Pfad mit 200 statt 404', function () {
        return api.get('/diesen-pfad-gibt-es-nicht')
            .expect(200)
            .then(function (res) {
                res.body.message.should.equal('A wrong link was entered');
            });
    });
});
