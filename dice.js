
/* =====================================
   File : dice.js
   Game : Dice Roller
   Version : 1.0.0
===================================== */

"use strict";

/* =====================================
   DOM Elements
===================================== */

const dice = $("#dice");

const diceNumber = $("#diceNumber");

const result = $("#result");

const rollBtn = $("#rollBtn");

const playAgainBtn = $("#playAgainBtn");

const resetBtn = $("#resetBtn");

const totalRolls = $("#totalRolls");

const lastRoll = $("#lastRoll");

const highestRoll = $("#highestRoll");

const historyList = $("#historyList");


/* =====================================
   Constants
===================================== */

const STORAGE_KEY = "dice_roller_stats";


/* =====================================
   Game State
===================================== */

let isRolling = false;

let stats = loadData(STORAGE_KEY, {

    total: 0,

    last: 0,

    highest: 0,

    history: []

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

    on(rollBtn, "click", rollDice);

    on(playAgainBtn, "click", rollDice);

    on(resetBtn, "click", resetStatistics);

}


/* =====================================
   Roll Dice
===================================== */

async function rollDice() {

    if (isRolling) {

        return;

    }

    isRolling = true;

    loading(rollBtn, "Rolling...");

    disable(playAgainBtn);

    dice.classList.add("rotate");

    result.textContent = "Rolling...";

    await delay(1000);

    const value = random(1, 6);

    showResult(value);

}
/* =====================================
   Show Result
===================================== */

function showResult(value) {

    const faces = {

        1: "⚀",
        2: "⚁",
        3: "⚂",
        4: "⚃",
        5: "⚄",
        6: "⚅"

    };

    dice.classList.remove("rotate");

    dice.textContent = faces[value];

    diceNumber.textContent = value;

    result.textContent = `You rolled ${value}`;

    stats.total++;

    stats.last = value;

    if (value > stats.highest) {

        stats.highest = value;

    }

    stats.history.unshift(value);

    // Keep only last 20 rolls
    if (stats.history.length > 20) {

        stats.history.pop();

    }

    saveData(STORAGE_KEY, stats);

    updateUI();

    toast(`Dice: ${value}`, "success");

    vibrate(100);

    stopLoading(rollBtn);

    enable(playAgainBtn);

    isRolling = false;

}


/* =====================================
   Update UI
===================================== */

function updateUI() {

    totalRolls.textContent = stats.total;

    lastRoll.textContent =

        stats.last === 0

        ? "-"

        : stats.last;

    highestRoll.textContent =

        stats.highest === 0

        ? "-"

        : stats.highest;

    updateHistory();

}


/* =====================================
   Roll History
===================================== */

function updateHistory() {

    if (stats.history.length === 0) {

        historyList.textContent =

            "No rolls yet.";

        return;

    }

    historyList.innerHTML =

        stats.history

        .map(number => {

            const faces = {

                1: "⚀",
                2: "⚁",
                3: "⚂",
                4: "⚃",
                5: "⚄",
                6: "⚅"

            };

            return `

                <span class="badge">

                    ${faces[number]}

                </span>

            `;

        })

        .join(" ");

}
/* =====================================
   Reset Statistics
===================================== */

function resetStatistics() {

    const confirmReset = confirm(
        "Are you sure you want to reset all statistics?"
    );

    if (!confirmReset) {

        return;

    }

    stats = {

        total: 0,

        last: 0,

        highest: 0,

        history: []

    };

    saveData(STORAGE_KEY, stats);

    updateUI();

    dice.textContent = "🎲";

    diceNumber.textContent = "Ready";

    result.textContent = "Press Roll Dice";

    toast("Statistics Reset Successfully", "success");

}


/* =====================================
   Keyboard Shortcuts
===================================== */

document.addEventListener("keydown", (event) => {

    switch (event.key.toLowerCase()) {

        case " ":

        case "enter":

            event.preventDefault();

            rollDice();

            break;

        case "r":

            resetStatistics();

            break;

    }

});


/* =====================================
   Future Firebase Hooks
===================================== */

/*
async function saveOnlineStats() {

    // Firestore Save

}

async function loadOnlineStats() {

    // Firestore Load

}
*/


/* =====================================
   Initialization Check
===================================== */

console.log("Dice Roller Loaded Successfully");
