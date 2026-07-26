
/* =====================================
   File : wheel.js
   Game : Spin The Wheel
   Version : 1.0.0
===================================== */

"use strict";

/* =====================================
   DOM Elements
===================================== */

const wheel = $("#wheel");

const spinBtn = $("#spinBtn");

const playAgainBtn = $("#playAgainBtn");

const resetBtn = $("#resetBtn");

const result = $("#result");

const totalSpins = $("#totalSpins");

const lastResult = $("#lastResult");


/* =====================================
   Storage
===================================== */

const STORAGE_KEY = "wheel_game_stats";


/* =====================================
   Wheel Items
===================================== */

const wheelItems = [

    "100 Coins",

    "Try Again",

    "Bonus",

    "Gift",

    "Winner",

    "Mystery",

    "Lucky",

    "Jackpot"

];


/* =====================================
   Game State
===================================== */

let spinning = false;

let currentRotation = 0;

let stats = loadData(STORAGE_KEY, {

    total: 0,

    last: "-"

});


/* =====================================
   Initialize
===================================== */

init();

function init() {

    updateUI();

    bindEvents();

}


/* =====================================
   Events
===================================== */

function bindEvents() {

    on(spinBtn, "click", spinWheel);

    on(playAgainBtn, "click", spinWheel);

    on(resetBtn, "click", resetStatistics);

}


/* =====================================
   Spin Wheel
===================================== */

function spinWheel() {

    if (spinning) {

        return;

    }

    spinning = true;

    disable(spinBtn);

    disable(playAgainBtn);

    result.textContent = "Spinning...";

    loading(spinBtn, "Spinning...");

    const segmentAngle =

        360 / wheelItems.length;

    const randomIndex =

        random(0, wheelItems.length - 1);

    const extraRotation =

        random(5, 8) * 360;

    currentRotation +=

        extraRotation +

        (360 - (randomIndex * segmentAngle));

    wheel.style.transform =

        `rotate(${currentRotation}deg)`;

    setTimeout(() => {

        finishSpin(randomIndex);

    }, 5000);

}
/* =====================================
   Finish Spin
===================================== */

function finishSpin(index) {

    const prize = wheelItems[index];

    stats.total++;

    stats.last = prize;

    saveData(STORAGE_KEY, stats);

    result.textContent = `🎉 You Got: ${prize}`;

    toast(`Winner: ${prize}`, "success");

    vibrate([80, 50, 80]);

    spinning = false;

    stopLoading(spinBtn);

    enable(spinBtn);

    enable(playAgainBtn);

    updateUI();

}


/* =====================================
   Update UI
===================================== */

function updateUI() {

    totalSpins.textContent = stats.total;

    lastResult.textContent = stats.last;

}


/* =====================================
   Reset Statistics
===================================== */

function resetStatistics() {

    const confirmReset = confirm(

        "Reset all wheel statistics?"

    );

    if (!confirmReset) {

        return;

    }

    stats = {

        total: 0,

        last: "-"

    };

    saveData(STORAGE_KEY, stats);

    currentRotation = 0;

    wheel.style.transform = "rotate(0deg)";

    result.textContent = 'Press "Spin Now"';

    updateUI();

    toast("Statistics Reset", "success");

}


/* =====================================
   Keyboard Shortcut
===================================== */

document.addEventListener("keydown", (event) => {

    switch (event.key.toLowerCase()) {

        case " ":

        case "enter":

            event.preventDefault();

            spinWheel();

            break;

        case "r":

            resetStatistics();

            break;

    }

});


/* =====================================
   Future Firebase Hook
===================================== */

/*
async function saveSpinHistory() {

    // Firestore Save

}

async function loadSpinHistory() {

    // Firestore Load

}
*/


/* =====================================
   Initialization Check
===================================== */

console.log("Spin The Wheel Loaded Successfully");
