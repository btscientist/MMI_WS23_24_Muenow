# MMI Demo project, Kopie mit eigenen Unit-Tests

Dieses Repository ist eine Kopie des Demoprojekts aus dem Modul Medizinische
Informatik, angelegt für **Etivity 12 (Unit-Tests)**, Modul 2, M_MI26,
UMIT TIROL.

**Quelle des Originals:** https://github.com/moniSt13/MMI_WS23_24

Beschreibung des Originals: *"Demo Project for MMI WS 26/27. We will use this
project to apply theoretical knowledge (e.g. versioning via Git, Refactoring,
Unit Tests, Usability Tests)."*

## Was von mir ist

| Datei | Inhalt |
|---|---|
| `tests/auxiliaryAPITest.js` | 13 eigene Unit-Tests zu `public/js/auxiliaryAPI.js`, Stufe 2 |
| `tests/connectionTest.js` | 7 Verbindungstests über supertest gegen `index.js`, Stufe 3 |
| `public/js/auxiliaryAPI.js` | die drei Funktionen neu definiert, Stufe 2 |
| `BEFUNDE.md` | die gefundenen Fehler, mit Zeilenangaben und Messwerten |

Alles andere ist unverändert aus dem Original übernommen, auch
`public/js/calculation.js` mit seinen eigenen Fehlern. Die habe ich in
`BEFUNDE.md` beschrieben, aber nicht angefasst, weil sie ausserhalb der
gewählten Schwierigkeitsstufe liegen.

## Zwei Zustände in der Historie

Gemessen mit dem vollständigen Testsatz von 21 Tests:

| Code in `auxiliaryAPI.js` | `npm test` |
|---|---|
| Original, unverändert | **6 bestanden, 15 fehlgeschlagen** |
| neu definiert, aktueller Stand | **21 bestanden, 0 fehlgeschlagen** |

Erst messen, dann reparieren. Hätte ich sofort repariert, wären mir die zwei
Tests entgangen, die am kaputten Code nur zufällig grün waren.

Zur Einordnung: bis Commit `1cbda8f` gab es nur die 14 Tests ohne die
Verbindungstests, dort lautete das Ergebnis 3 bestanden und 11 fehlgeschlagen.

## Tests ausführen

```bash
npm install
npm test
```

Das Testskript ist `mocha tests/*.js --exit`, die Zusicherungen kommen von Chai.

**Stand 28.10.2026: 21 bestanden, 0 fehlgeschlagen.** Von den 21 Tests gehört
einer zum Projekt (`sum()` in `tests/sampleMocaTest.js`), die übrigen 20 sind
meine, davon 13 Unit-Tests und 7 Verbindungstests.

Wer den Zustand vor der Reparatur sehen will, kann die Tests gegen den
unveränderten Code laufen lassen:

```bash
git checkout 1cbda8f -- public/js/auxiliaryAPI.js
npm test
git checkout HEAD -- public/js/auxiliaryAPI.js
```

Dann sind es 6 bestanden und 15 fehlgeschlagen, und die Fehlermeldungen
entsprechen den Befunden in [BEFUNDE.md](BEFUNDE.md).

`npm test` gibt in beiden Fällen "App started on port 8080" aus, weil
`tests/connectionTest.js` mit `require('../index')` den Express-Server startet.
Deshalb ist `--exit` im Testskript notwendig.
