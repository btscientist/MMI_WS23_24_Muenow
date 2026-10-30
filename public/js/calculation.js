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
    dateObj.innerText = new Date().toLocaleString('en-GB', {timeZone: 'UTC'}) + " - "
        + getGreetingDependOnTime(new Date());
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


getGreetingDependOnTime = function (myDate) {
    let timeBegin = '06:00';
    let timeEnd = '22:00';
    const dateBegin = new Date('2020-01-01 ' + timeBegin);
    const dateEnd = new Date('2020-01-01 ' + timeEnd);
    const dateCurrent = new Date('2020-01-01 ' + myDate.getHours() + ":" + myDate.getMinutes());

    if (dateBegin.getTime() < dateCurrent.getTime()) {
        if (dateCurrent.getTime() >= dateEnd.getTime()) {
            return "Guten Morgen"
        }
        else {
            return "Guten Abend"
        }
    } else {
        return "Guten Morgen"
    }
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
