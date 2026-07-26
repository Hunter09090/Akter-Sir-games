
/* =====================================
   File : truth.js
   Game : Truth or Dare
===================================== */

"use strict";

/* =====================================
   DOM Elements
===================================== */

const questionBox = $("#questionBox");

const truthBtn = $("#truthBtn");

const dareBtn = $("#dareBtn");

const playAgainBtn = $("#playAgainBtn");

const resetBtn = $("#resetBtn");

const result = $("#result");

const totalPlayed = $("#totalPlayed");

const truthCount = $("#truthCount");

const dareCount = $("#dareCount");


/* =====================================
   Storage
===================================== */

const STORAGE_KEY = "truth_or_dare_stats";


/* =====================================
   Game State
===================================== */

let lastTruthIndex = -1;

let lastDareIndex = -1;

let currentMode = "";

let stats = loadData(STORAGE_KEY, {

    total: 0,

    truth: 0,

    dare: 0

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

    on(truthBtn, "click", showTruth);

    on(dareBtn, "click", showDare);

    on(playAgainBtn, "click", playAgain);

    on(resetBtn, "click", resetStatistics);

}


/* =====================================
   Truth
===================================== */

function showTruth() {

    currentMode = "truth";

    let index;

    do {

        index = random(0, TRUTHS.length - 1);

    }

    while (

        TRUTHS.length > 1 &&

        index === lastTruthIndex

    );

    lastTruthIndex = index;

    questionBox.textContent =

        TRUTHS[index];

    stats.total++;

    stats.truth++;

    saveData(STORAGE_KEY, stats);

    updateUI();

    result.textContent =

        "Truth নির্বাচিত হয়েছে।";

    toast("Truth", "success");

}


/* =====================================
   Dare
===================================== */

function showDare() {

    currentMode = "dare";

    let index;

    do {

        index = random(0, DARES.length - 1);

    }

    while (

        DARES.length > 1 &&

        index === lastDareIndex

    );

    lastDareIndex = index;

    questionBox.textContent =

        DARES[index];

    stats.total++;

    stats.dare++;

    saveData(STORAGE_KEY, stats);

    updateUI();

    result.textContent =

        "Dare নির্বাচিত হয়েছে।";

    toast("Dare", "success");

}
/* =====================================
   Play Again
===================================== */

function playAgain() {

    if (currentMode === "truth") {

        showTruth();

        return;

    }

    if (currentMode === "dare") {

        showDare();

        return;

    }

    toast("আগে Truth অথবা Dare নির্বাচন করুন।", "info");

}


/* =====================================
   Update UI
===================================== */

function updateUI() {

    totalPlayed.textContent = stats.total;

    truthCount.textContent = stats.truth;

    dareCount.textContent = stats.dare;

}


/* =====================================
   Reset Statistics
===================================== */

function resetStatistics() {

    const confirmReset = confirm(

        "সব পরিসংখ্যান রিসেট করতে চান?"

    );

    if (!confirmReset) {

        return;

    }

    stats = {

        total: 0,

        truth: 0,

        dare: 0

    };

    saveData(STORAGE_KEY, stats);

    currentMode = "";

    lastTruthIndex = -1;

    lastDareIndex = -1;

    questionBox.textContent =

        "Truth অথবা Dare নির্বাচন করুন";

    result.textContent =

        "Waiting...";

    updateUI();

    toast("Statistics Reset", "success");

}


/* =====================================
   Keyboard Shortcuts
===================================== */

document.addEventListener("keydown", (event) => {

    switch (event.key.toLowerCase()) {

        case "t":

            showTruth();

            break;

        case "d":

            showDare();

            break;

        case " ":

        case "enter":

            event.preventDefault();

            playAgain();

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
async function saveHistory() {

    // Firestore Save

}

async function loadHistory() {

    // Firestore Load

}
*/


/* =====================================
   Initialization Check
===================================== */

console.log("Truth or Dare Loaded Successfully");
