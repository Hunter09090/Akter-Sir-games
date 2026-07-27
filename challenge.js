
/* =====================================
   File : challenge.js
   Game : Random Challenge
===================================== */

"use strict";

/* =====================================
   DOM Elements
===================================== */

const challengeBox = $("#challengeBox");

const challengeBtn = $("#challengeBtn");

const playAgainBtn = $("#playAgainBtn");

const resetBtn = $("#resetBtn");

const result = $("#result");

const totalChallenges = $("#totalChallenges");

const lastChallenge = $("#lastChallenge");


/* =====================================
   Storage
===================================== */

const STORAGE_KEY = "random_challenge_stats";


/* =====================================
   Game State
===================================== */

let lastIndex = -1;

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

    on(challengeBtn, "click", showChallenge);

    on(playAgainBtn, "click", showChallenge);

    on(resetBtn, "click", resetStatistics);

}


/* =====================================
   Show Challenge
===================================== */

function showChallenge() {

    let index;

    do {

        index = random(
            0,
            CHALLENGES.length - 1
        );

    } while (

        CHALLENGES.length > 1 &&
        index === lastIndex

    );

    lastIndex = index;

    const challenge = CHALLENGES[index];

    challengeBox.textContent = challenge;

    stats.total++;

    stats.last = challenge;

    saveData(STORAGE_KEY, stats);

    updateUI();

    result.textContent =
        "নতুন Challenge তৈরি হয়েছে।";

    toast("Challenge Ready!", "success");

}
/* =====================================
   Update UI
===================================== */

function updateUI() {

    totalChallenges.textContent = stats.total;

    lastChallenge.textContent = stats.last;

}


/* =====================================
   Reset Statistics
===================================== */

function resetStatistics() {

    const confirmReset = confirm(

        "সব Challenge Statistics রিসেট করতে চান?"

    );

    if (!confirmReset) {

        return;

    }

    stats = {

        total: 0,

        last: "-"

    };

    lastIndex = -1;

    saveData(STORAGE_KEY, stats);

    challengeBox.textContent =
        "Start বাটনে চাপ দিন";

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

        case " ":

        case "enter":

            event.preventDefault();

            showChallenge();

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

async function saveChallengeHistory() {

    // Firestore Save

}

async function loadChallengeHistory() {

    // Firestore Load

}

*/


/* =====================================
   Initialization Check
===================================== */

console.log("Random Challenge Loaded Successfully");
