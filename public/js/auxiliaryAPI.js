// Neu definiert fuer Etivity 12, Schwierigkeitsstufe 2.
// Die urspruengliche Fassung steht in der Git-Historie, Commit 1cbda8f und
// davor. Welche Fehler sie hatte, ist in BEFUNDE.md dokumentiert.

exports.celsiusToFahrenheit = function (celsius) {
    // war: Parameter x, gerechnet mit celsius, und +10 statt +32
    return celsius * 9 / 5 + 32;
};

exports.fahrenheitToCelcius = function (fahrenheit) {
    // war: geteilt durch 5/9 statt multipliziert, also der Kehrwert,
    // und umgeben von einem wirkungslosen if (true)
    return (fahrenheit - 32) * 5 / 9;
};

exports.getGreetingDependOnTime = function (myDate) {
    // war: Morgen und Abend vertauscht. Ausserdem wurden die Grenzen aus
    // zusammengebauten Textstuecken als Date-Objekte verglichen, aussen mit
    // < und innen mit >=, also uneinheitlich. Hier gilt 06:00 bis 21:59 als
    // Morgen, 06:00 eingeschlossen.
    const stunde = myDate.getHours();
    return (stunde >= 6 && stunde < 22) ? 'Guten Morgen' : 'Guten Abend';
};
