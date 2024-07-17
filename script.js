let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;
let lapCounter = 0;

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const lapBtn = document.getElementById('lapBtn');
const resetBtn = document.getElementById('resetBtn');
const laps = document.getElementById('laps');

startStopBtn.addEventListener('click', startStop);
lapBtn.addEventListener('click', lap);
resetBtn.addEventListener('click', reset);

function startStop() {
    if (!running) {
        startTime = new Date().getTime() - difference;
        tInterval = setInterval(updateTime, 10);
        startStopBtn.textContent = 'Pause';
        lapBtn.disabled = false;
        resetBtn.disabled = true;
        running = true;
    } else {
        clearInterval(tInterval);
        difference = new Date().getTime() - startTime;
        startStopBtn.textContent = 'Start';
        lapBtn.disabled = true;
        resetBtn.disabled = false;
        running = false;
    }
}

function updateTime() {
    updatedTime = new Date().getTime() - startTime;
    const hours = Math.floor((updatedTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((updatedTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((updatedTime % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((updatedTime % 1000) / 10);

    display.textContent = 
        (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + 
        (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + 
        (seconds > 9 ? seconds : "0" + seconds) + "." + 
        (milliseconds > 9 ? milliseconds : "0" + milliseconds);
}

function lap() {
    lapCounter++;
    const lapItem = document.createElement('li');
    lapItem.textContent = `Lap ${lapCounter}: ${display.textContent}`;
    laps.appendChild(lapItem);
}

function reset() {
    clearInterval(tInterval);
    difference = 0;
    startTime = 0;
    lapCounter = 0;
    display.textContent = '00:00:00.00';
    startStopBtn.textContent = 'Start';
    lapBtn.disabled = true;
    resetBtn.disabled = true;
    laps.innerHTML = '';
}
