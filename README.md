# MMI Demo project, Kopie mit eigenen Unit-Tests

Dieses Repository ist eine Kopie des Demoprojekts aus dem Modul Medizinische
Informatik, angelegt für **Etivity 12 (Unit-Tests)**, Modul 2, M_MI26,
UMIT TIROL.

**Quelle des Originals:** https://github.com/moniSt13/MMI_WS23_24

Beschreibung des Originals: *"Demo Project for MMI WS 26/27. We will use this
project to apply theoretical knowledge (e.g. versioning via Git, Refactoring,
Unit Tests, Usability Tests)."*

Der Anwendungscode ist unverändert übernommen. Hinzugefügt habe ich nur die
eigene Testdatei und die Dokumentation der Befunde.

## Was von mir ist

| Datei | Inhalt |
|---|---|
| `tests/auxiliaryAPITest.js` | 13 eigene Unit-Tests zu `public/js/auxiliaryAPI.js` |
| `BEFUNDE.md` | die gefundenen Fehler, mit Zeilenangaben und Messwerten |

## Tests ausführen

```bash
npm install
npm test
```

Das Testskript ist `mocha tests/*.js --exit`, die Zusicherungen kommen von Chai.

**Stand 28.10.2026: 3 bestanden, 11 fehlgeschlagen.** Das ist so gewollt. Die
Tests prüfen den Originalcode, und der enthält Fehler. Von den 14 Tests gehört
einer zum Projekt (`sum()` in `tests/sampleMocaTest.js`), die übrigen 13 sind
meine. Zwei meiner Tests sind grün, und beide nur zufällig. Warum das so ist,
steht in [BEFUNDE.md](BEFUNDE.md).

`npm test` gibt dabei "App started on port 8080" aus, weil
`tests/connectionTest.js` mit `require('../index')` den Express-Server startet.
Deshalb ist `--exit` im Testskript notwendig.

Eine reparierte Fassung der drei Funktionen liegt **nicht** in diesem
Repository. Sie steht in der Abgabe zur Etivity, damit der Originalcode hier
unverändert nachvollziehbar bleibt.
