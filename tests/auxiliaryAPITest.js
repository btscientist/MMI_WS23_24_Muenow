const expect = require('chai').expect;
const api = require('../public/js/auxiliaryAPI');

describe('celsiusToFahrenheit()', function () {
  it('0 Grad Celsius sind 32 Fahrenheit', function () {
    expect(api.celsiusToFahrenheit(0)).to.equal(32);
  });
  it('100 Grad Celsius sind 212 Fahrenheit', function () {
    expect(api.celsiusToFahrenheit(100)).to.equal(212);
  });
  it('minus 40 ist in beiden Skalen gleich', function () {
    expect(api.celsiusToFahrenheit(-40)).to.equal(-40);
  });
});

describe('fahrenheitToCelcius()', function () {
  it('32 Fahrenheit sind 0 Grad Celsius', function () {
    expect(api.fahrenheitToCelcius(32)).to.equal(0);
  });
  it('212 Fahrenheit sind 100 Grad Celsius', function () {
    expect(api.fahrenheitToCelcius(212)).to.equal(100);
  });
  it('minus 40 ist in beiden Skalen gleich', function () {
    expect(api.fahrenheitToCelcius(-40)).to.equal(-40);
  });
  it('98.6 Fahrenheit sind 37 Grad Celsius', function () {
    expect(api.fahrenheitToCelcius(98.6)).to.be.closeTo(37, 0.01);
  });
});

describe('hin und zurueck', function () {
  it('ergibt wieder denselben Wert', function () {
    const zurueck = api.fahrenheitToCelcius(api.celsiusToFahrenheit(37));
    expect(zurueck).to.be.closeTo(37, 0.01);
  });
});

describe('getGreetingDependOnTime()', function () {
  const um = (h, m) => new Date(2026, 9, 29, h, m, 0);

  it('morgens um 9 Uhr', function () {
    expect(api.getGreetingDependOnTime(um(9, 30))).to.equal('Guten Morgen');
  });
  it('nachmittags um 15 Uhr', function () {
    expect(api.getGreetingDependOnTime(um(15, 0))).to.equal('Guten Morgen');
  });
  it('nachts um 23 Uhr', function () {
    expect(api.getGreetingDependOnTime(um(23, 0))).to.equal('Guten Abend');
  });
  it('Grenze 06:00', function () {
    expect(api.getGreetingDependOnTime(um(6, 0))).to.equal('Guten Abend');
  });
  it('Grenze 22:00', function () {
    expect(api.getGreetingDependOnTime(um(22, 0))).to.equal('Guten Abend');
  });
});
