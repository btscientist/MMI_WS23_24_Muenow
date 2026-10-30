// Ueberarbeitet fuer Aufgabe 2, Befunde siehe BEFUNDE.md
const ANZAHL_STUFEN = 4;

let temperature = 21, mode = "summer", level = 0, isOn = true;

const dateObj = document.getElementById("date");
const temperatureObj = document.getElementById("temperature");
const levelObj = document.getElementById("level");
const modusObj = document.getElementById("modus");

document.getElementById("on-off-button").addEventListener("click", turnOnOff);
document.getElementById("level-button").addEventListener("click", levelChange);
document.getElementById("mode-button").addEventListener("click", modeChange);
document.getElementById("plus-button").addEventListener("click", increaseTemperature);
document.getElementById("minus-button").addEventListener("click", decreaseTemperature);

function updateTime() {
    const jetzt = new Date();
    dateObj.innerText = jetzt.toLocaleString('en-GB') + " - " + getGreetingDependOnTime(jetzt);
}

setInterval(updateTime, 1000);

function turnOnOff() {
    isOn = !isOn;
    updateDisplay();
}

function updateDisplay() {
    if (isOn) {
        temperatureObj.innerText = `Temperatur: ${temperature} Celsius`
        levelObj.innerText = `Level: ${level}`
        modusObj.innerText = `Modus: ${mode}`
    } else {
        temperatureObj.innerText = ""
        levelObj.innerText = ""
        modusObj.innerText = ""
    }
}

function getGreetingDependOnTime(myDate) {
    const stunde = myDate.getHours();
    return (stunde >= 6 && stunde < 22) ? "Guten Morgen" : "Guten Abend";
}

function increaseTemperature() {
    temperature++;
    updateDisplay();
}

function decreaseTemperature() {
    temperature--;
    updateDisplay();
}

function levelChange() {
    level = (level + 1) % ANZAHL_STUFEN;
    updateDisplay();
}

function modeChange() {
    mode = (mode === "summer") ? "winter" : "summer";
    updateDisplay();
}

updateDisplay();
