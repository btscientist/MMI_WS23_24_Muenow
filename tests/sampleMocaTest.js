const expect = require('chai').expect;

//Sample JUnit test
function sum(arr) {
    let res = 0;
    for (let i = 0; i < arr.length; i++) {
        res += arr[i];
    }
    return res;
}

// Etivity 12, Schwierigkeitsstufe 1: den mitgelieferten Beispieltest erweitern.
// Der erste Test ("should add numbers") ist der aus dem Original.
// Alle Erwartungen unten sind am tatsaechlichen Verhalten gemessen, nicht
// geraten. Wo das Verhalten fragwuerdig ist, steht es als Kommentar dabei.

describe('#sum()', function () {

    //  if needed logic before each test run
    beforeEach(function () {

    })

    // test a functionality
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
        // 0.1 + 0.2 ergibt 0.30000000000000004, nicht 0.3. Das ist kein Fehler
        // der Funktion, sondern Gleitkommaarithmetik. Ein Test auf Gleichheit
        // waere hier falsch, deshalb closeTo.
        expect(sum([0.1, 0.2])).to.not.equal(0.3);
        expect(sum([0.1, 0.2])).to.be.closeTo(0.3, 1e-9);
    })

});

describe('#sum() an den Raendern', function () {

    it('verkettet statt zu addieren, sobald eine Zeichenkette dabei ist', function () {
        // Befund: += unterscheidet nicht zwischen Addition und Verkettung.
        // Aus [1, "2", 3] wird die Zeichenkette "123", nicht die Zahl 6.
        expect(sum([1, '2', 3])).to.equal('123');
        expect(sum([1, '2', 3])).to.be.a('string');
    })

    it('nimmt eine Zeichenkette als Eingabe an und gibt Unsinn zurueck', function () {
        // Befund: Zeichenketten haben auch eine length, also laeuft die Schleife.
        // Aus "abc" wird "0abc", weil der Startwert 0 mitverkettet wird.
        expect(sum('abc')).to.equal('0abc');
    })

    it('behandelt null wie eine Null', function () {
        expect(sum([1, null, 3])).to.equal(4);
    })

    it('wird von undefined unbrauchbar gemacht', function () {
        // Befund: ein einziges undefined im Feld macht das ganze Ergebnis NaN,
        // und NaN wird in JSON zu null. Ein Aufrufer sieht keinen Fehler.
        expect(sum([1, undefined, 3])).to.be.NaN;
    })

    it('gibt bei einer Zahl als Eingabe still null zurueck', function () {
        // Befund: das ist der unangenehmste Fall. Eine Zahl hat keine length,
        // also laeuft die Schleife nie, und die Funktion gibt 0 zurueck statt
        // sich zu beschweren. Ein Tippfehler wie sum(5) statt sum([5]) faellt
        // damit nicht auf.
        expect(sum(5)).to.equal(0);
    })

    it('wirft bei undefined als Eingabe einen TypeError', function () {
        expect(function () {
            sum(undefined);
        }).to.throw(TypeError);
    })

});
