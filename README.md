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
| `tests/auxiliaryAPITest.js` | 13 eigene Unit-Tests zu `public/js/auxiliaryAPI.js` |
| `BEFUNDE.md` | die gefundenen Fehler, mit Zeilenangaben und Messwerten |
| `public/js/auxiliaryAPI.js` | die drei Funktionen neu definiert, Schwierigkeitsstufe 2 |

Alles andere ist unverändert aus dem Original übernommen, auch
`public/js/calculation.js` mit seinen eigenen Fehlern. Die habe ich in
`BEFUNDE.md` beschrieben, aber nicht angefasst, weil sie ausserhalb der
gewählten Schwierigkeitsstufe liegen.

## Zwei Zustände in der Historie

| Zustand | `npm test` |
|---|---|
| bis Commit `1cbda8f`, Original unverändert | 3 bestanden, 11 fehlgeschlagen |
| ab dem Folgecommit, neu definiert | 14 bestanden, 0 fehlgeschlagen |

Erst messen, dann reparieren. Hätte ich sofort repariert, wären mir die zwei
Tests entgangen, die am kaputten Code nur zufällig grün waren.

## Tests ausführen

```bash
npm install
npm test
```

Das Testskript ist `mocha tests/*.js --exit`, die Zusicherungen kommen von Chai.

**Stand 28.10.2026: 14 bestanden, 0 fehlgeschlagen.** Von den 14 Tests gehört
einer zum Projekt (`sum()` in `tests/sampleMocaTest.js`), die übrigen 13 sind
meine.

Wer den Zustand vor der Reparatur sehen will, kann die Tests gegen den
unveränderten Code laufen lassen:

```bash
git checkout 1cbda8f -- public/js/auxiliaryAPI.js
npm test
git checkout HEAD -- public/js/auxiliaryAPI.js
```

Dann sind es 3 bestanden und 11 fehlgeschlagen, und die Fehlermeldungen
entsprechen den Befunden in [BEFUNDE.md](BEFUNDE.md).

`npm test` gibt in beiden Fällen "App started on port 8080" aus, weil
`tests/connectionTest.js` mit `require('../index')` den Express-Server startet.
Deshalb ist `--exit` im Testskript notwendig.
