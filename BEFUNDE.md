# Befunde aus den Unit-Tests

Etivity 12, Modul 2, M_MI26. Getestet am 28.10.2026 mit Mocha und Chai.
Meine Tests liegen in `tests/auxiliaryAPITest.js`.

Ergebnis von `npm test`: **2 bestanden, 12 gefallen.**

## 1. celsiusToFahrenheit() stuerzt bei jedem Aufruf ab

```js
exports.celsiusToFahrenheit = function (x){
 return celsius*(9/5)+10
}
```

Der Parameter heisst `x`, gerechnet wird mit `celsius`. Die Variable gibt es
nirgends, also kommt immer `ReferenceError: celsius is not defined`.
Zusaetzlich steht dort `+10` statt `+32`.

Richtig: `celsius * 9/5 + 32`

## 2. fahrenheitToCelcius() teilt durch 5/9 statt zu multiplizieren

Das ist genau der Kehrwert, also mal 1.8 statt mal 0.5556.

| Eingabe | kommt raus | sollte sein |
|---|---|---|
| 32 F | 0 | 0 |
| 212 F | 324 | 100 |
| -40 F | -129.6 | -40 |
| 98.6 F | 119.88 | 37 |

Bei 32 Fahrenheit stimmt das Ergebnis zufaellig, weil dort mit null
multipliziert wird. Das ist der einzige meiner Tests, der gruen ist.

Richtig: `(fahrenheit - 32) * 5/9`

## 3. getGreetingDependOnTime() vertauscht Morgen und Abend

| Uhrzeit | kommt raus | sollte sein |
|---|---|---|
| 09:30 | Guten Abend | Guten Morgen |
| 15:00 | Guten Abend | Guten Morgen |
| 23:00 | Guten Morgen | Guten Abend |

Zwischen 6 und 22 Uhr sagt das Programm "Guten Abend", nachts "Guten Morgen".
An der Stelle, die "Guten Abend" zurueckgibt, steht im Code sogar der
Kommentar `//"guten morgen"`.

Im else-Zweig sind zwei Reste stehen geblieben: `newVariable = ...` ohne
Deklaration, also eine globale Variable aus Versehen, und ein
`console.log("For debugging: ") + ...`, bei dem die Verkettung ausserhalb der
Klammer steht. Im Testprotokoll erscheint darum nur "For debugging: " ohne Werte.

## 4. Nebenbei in calculation.js

`increaseTemperature()` macht `temperature--`, `decreaseTemperature()` macht
`temperature++`. Die beiden sind vertauscht. Und `updateDisplay()` zeigt die
Werte an, wenn `!isOn` gilt, also wenn das Geraet aus ist.

## Hinweis zur Aufgabenstellung

In Moodle heisst die Funktion `getGreetingsDependendOnTime()`. Im Code heisst
sie `getGreetingDependOnTime()`, ohne das s und ohne das zweite d. Mit der
Schreibweise aus der Aufgabe findet man sie nicht.
