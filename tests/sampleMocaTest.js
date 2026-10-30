// Stufe 1: Beispieltest erweitert, Befunde siehe BEFUNDE.md
const expect = require('chai').expect;

function sum(arr) {
    let res = 0;
    for (let i = 0; i < arr.length; i++) {
        res += arr[i];
    }
    return res;
}

describe('#sum()', function () {

    beforeEach(function () {

    })

    it('should add numbers', function () {
        expect(sum([1, 2, 3, 4, 5])).to.equal(15);
    })

    it('gibt bei einem leeren Feld null zurueck', function () {
        expect(sum([])).to.equal(0);
    })

    it('gibt bei einem einzigen Wert diesen Wert zurueck', function () {
        expect(sum([42])).to.equal(42);
    })

    it('addiert negative Zahlen', function () {
        expect(sum([-1, -2, -3])).to.equal(-6);
    })

    it('hebt entgegengesetzte Werte auf', function () {
        expect(sum([-5, 5])).to.equal(0);
    })

    it('ist von der Reihenfolge unabhaengig', function () {
        expect(sum([5, 4, 3, 2, 1])).to.equal(sum([1, 2, 3, 4, 5]));
    })

    it('rechnet mit Kommazahlen nur ungefaehr genau', function () {
        expect(sum([0.1, 0.2])).to.not.equal(0.3);
        expect(sum([0.1, 0.2])).to.be.closeTo(0.3, 1e-9);
    })

});

describe('#sum() an den Raendern', function () {

    it('verkettet statt zu addieren, sobald eine Zeichenkette dabei ist', function () {
        expect(sum([1, '2', 3])).to.equal('123');
        expect(sum([1, '2', 3])).to.be.a('string');
    })

    it('nimmt eine Zeichenkette als Eingabe an und gibt Unsinn zurueck', function () {
        expect(sum('abc')).to.equal('0abc');
    })

    it('behandelt null wie eine Null', function () {
        expect(sum([1, null, 3])).to.equal(4);
    })

    it('wird von undefined unbrauchbar gemacht', function () {
        expect(sum([1, undefined, 3])).to.be.NaN;
    })

    it('gibt bei einer Zahl als Eingabe still null zurueck', function () {
        expect(sum(5)).to.equal(0);
    })

    it('wirft bei undefined als Eingabe einen TypeError', function () {
        expect(function () {
            sum(undefined);
        }).to.throw(TypeError);
    })

});
