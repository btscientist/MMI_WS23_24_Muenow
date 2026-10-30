// Neu definiert fuer Etivity 12, Befunde siehe BEFUNDE.md
exports.celsiusToFahrenheit = function (celsius) {
    return celsius * 9 / 5 + 32;
};

exports.fahrenheitToCelsius = function (fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
};

exports.getGreetingDependOnTime = function (myDate) {
    const stunde = myDate.getHours();
    return (stunde >= 6 && stunde < 22) ? 'Guten Morgen' : 'Guten Abend';
};
