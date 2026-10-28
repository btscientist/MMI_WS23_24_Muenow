# Befunde aus den Unit-Tests

Etivity 12, Modul 2, M_MI26. Getestet am 28.10.2026 mit Mocha und Chai.
Meine Tests liegen in `tests/auxiliaryAPITest.js`.

## Zwei Zustände, zwei Ergebnisse

Die Aufgabe verlangt, die Funktionen zu erweitern **und neu zu definieren**.
Deshalb gibt es in diesem Repository zwei Zustände, und die Historie zeigt beide.

| Zustand | Code | `npm test` |
|---|---|---|
| **vorher**, bis Commit `1cbda8f` | Original, unverändert | **3 bestanden, 11 fehlgeschlagen** |
| **nachher**, ab dem Folgecommit | `auxiliaryAPI.js` neu definiert | **14 bestanden, 0 fehlgeschlagen** |

Das sind jeweils 14 Tests, denn der mitgelieferte `sum()`-Test aus
`sampleMocaTest.js` zählt mit und läuft in beiden Zuständen durch.

Im Zustand vorher waren von meinen 13 Tests also nur zwei grün, und beide nur
zufällig. Welche und warum, steht unten. Genau das ist der Grund, warum ich die
Befunde zuerst gegen den unveränderten Code gemessen habe: hätte ich sofort
repariert, hätte ich die Zufallstreffer nie gesehen.

Alles Folgende beschreibt den Zustand **vorher**, also die gefundenen Fehler.

## 1. celsiusToFahrenheit() stürzt bei jedem Aufruf ab

```js
exports.celsiusToFahrenheit = function (x){
 return celsius*(9/5)+10
}
```

Der Parameter heisst `x`, gerechnet wird mit `celsius`. Die Variable gibt es
nirgends, also kommt immer `ReferenceError: celsius is not defined`.
Zusätzlich steht dort `+10` statt `+32`.

Richtig: `x * 9/5 + 32`

## 2. fahrenheitToCelcius() teilt durch 5/9 statt zu multiplizieren

Das ist genau der Kehrwert, also mal 1.8 statt mal 0.5556.

| Eingabe | kommt raus | sollte sein |
|---|---|---|
| 32 F | 0 | 0 |
| 212 F | 324 | 100 |
| -40 F | -129.6 | -40 |
| 98.6 F | 119.87999999999998 | 37 |

Bei 32 Fahrenheit stimmt das Ergebnis zufällig, weil die Differenz
`fahrenheit - 32` dort genau null ergibt. Null bleibt null, egal ob danach mit
9/5 multipliziert oder durch 5/9 geteilt wird, deshalb fällt der falsche Faktor
an dieser einen Stelle nicht auf. Einer meiner zwei grünen Tests.

Richtig: `(fahrenheit - 32) * 5/9`

Das `if (true)` um die Rückgabe tut nichts. Stünde dort `false`, käme still
`undefined` zurück.

## 3. getGreetingDependOnTime() vertauscht Morgen und Abend

Gemessen, nicht gelesen:

| Uhrzeit | kommt raus | sollte sein |
|---|---|---|
| 00:00 bis 06:00 | Guten Morgen | 06:00 ist richtig, davor falsch |
| 09:30 | Guten Abend | Guten Morgen |
| 15:00 | Guten Abend | Guten Morgen |
| 22:00 | Guten Morgen | Guten Abend |
| 23:00 | Guten Morgen | Guten Abend |

Die äussere Bedingung lautet `dateBegin.getTime() < dateCurrent.getTime()`, also
strikt später als 06:00; die innere vergleicht dagegen mit `>=`, also
einschliesslich 22:00. Das Programm behandelt seine zwei Grenzen somit
unterschiedlich, und nirgends ist festgelegt, ob 06:00 selbst zum Morgen zählt.
Genau 06:00 fällt in den else-Zweig und liefert "Guten Morgen". Ob das richtig
ist, hängt von der Grenzkonvention ab, und deshalb ist mein Grenztest auf 06:00
grün. Von 06:01 bis 21:59 kommt "Guten Abend", ab 22:00 wieder "Guten Morgen".

Im else-Zweig sind zwei Reste stehen geblieben: `newVariable = ...` ohne
Deklaration, also eine globale Variable aus Versehen, und ein
`console.log("For debugging: ") + ...`, bei dem die Verkettung ausserhalb der
Klammer steht. Im Testprotokoll erscheint darum nur "For debugging: " ohne
Werte, und zwar nur beim 06:00-Test, weil nur der in den else-Zweig läuft.

## 4. Nebenbei in calculation.js

`calculation.js` enthält die Begrüssungslogik ein zweites Mal. **Nur dort**, in
Zeile 52, steht am äusseren `if` der Kommentar `//"guten morgen"`. In
`auxiliaryAPI.js` steht kein solcher Kommentar. Weil der Kommentar an der
Bedingung mit dem strikten `<` hängt, spricht er dafür, dass 06:00 nach der
Absicht des Autors **nicht** zum Morgen gehört. Als Spezifikation taugt er
trotzdem nur bedingt: der einzige andere Kommentar in der Datei lautet
`// this should be a very helpful comment`.

Dieselbe Begrüssungsfunktion ist in Zeile 45 ohne `let`, `const` oder `function`
zugewiesen, also eine zweite unbeabsichtigte globale Variable neben
`newVariable`.

Ausserdem: `increaseTemperature()` macht `temperature--` (Zeile 70),
`decreaseTemperature()` macht `temperature++` (Zeile 75). Die beiden sind
vertauscht. Und `updateDisplay()` zeigt die Werte an, wenn `!isOn` gilt
(Zeile 32), also wenn das Gerät aus ist.

## Hinweis zur Aufgabenstellung

In Moodle heisst die Funktion `getGreetingsDependendOnTime()`. Im Code heisst
sie `getGreetingDependOnTime()`, ohne das s und ohne das zweite d. Mit der
Schreibweise aus der Aufgabe findet man sie nicht.

## Hinweis zum Testlauf

`npm test` gibt "App started on port 8080" aus. Ursache ist das
`require('../index')` in `tests/connectionTest.js`: `index.js` ruft beim
Einbinden `app.listen()` auf. Deshalb braucht das Testskript `--exit`, sonst
beendet sich Mocha nicht.
