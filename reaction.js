
/* =====================================
   File : reaction.js
   Game : Reaction Time Test
   Version : 1.0.0
===================================== */

"use strict";

/* =====================================
   DOM Elements
===================================== */

const reactionBox = $("#reactionBox");

const startBtn = $("#startBtn");

const playAgainBtn = $("#playAgainBtn");

const resetBtn = $("#resetBtn");

const result = $("#result");

const bestTime = $("#bestTime");

const averageTime = $("#averageTime");

const attemptCount = $("#attemptCount");


/* =====================================
   Storage
===================================== */

const STORAGE_KEY = "reaction_time_stats";


/* =====================================
   Game State
===================================== */

let timer = null;

let startTime = 0;

let isWaiting = false;

let isReady = false;

let stats = loadData(STORAGE_KEY, {

    best: null,

    totalTime: 0,

    attempts: 0

});


/* =====================================
   Initialize
===================================== */

init();

function init() {

    updateStatistics();

    bindEvents();

}


/* =====================================
   Events
===================================== */

function bindEvents() {

    on(startBtn, "click", startGame);

    on(playAgainBtn, "click", startGame);

    on(resetBtn, "click", resetStatistics);

    on(reactionBox, "click", handleReaction);

}


/* =====================================
   Start Game
===================================== */

function startGame() {

    if (isWaiting || isReady) {

        return;

    }

    result.textContent = "Wait for GREEN...";

    reactionBox.textContent = "Wait...";

    reactionBox.classList.remove("ready");

    reactionBox.classList.add("wait");

    disable(startBtn);

    disable(playAgainBtn);

    isWaiting = true;

    const delayTime = random(2000, 5000);

    timer = setTimeout(makeReady, delayTime);

}
/* =====================================
   Ready State
===================================== */

function makeReady() {

    isWaiting = false;

    isReady = true;

    reactionBox.classList.remove("wait");

    reactionBox.classList.add("ready");

    reactionBox.textContent = "CLICK NOW!";

    result.textContent = "GO!";

    startTime = performance.now();

}


/* =====================================
   Handle Click
===================================== */

function handleReaction() {

    /* Clicked Too Early */

    if (isWaiting) {

        clearTimeout(timer);

        isWaiting = false;

        enable(startBtn);

        enable(playAgainBtn);

        reactionBox.classList.remove("wait");

        reactionBox.textContent = "Too Early!";

        result.textContent = "❌ Too Early! Try Again.";

        toast("Too Early!", "error");

        vibrate([100, 50, 100]);

        return;

    }

    /* Not Ready */

    if (!isReady) {

        return;

    }

    isReady = false;

    const reactionTime = Math.round(

        performance.now() - startTime

    );

    updateGame(reactionTime);

}


/* =====================================
   Update Game
===================================== */

function updateGame(reactionTime) {

    stats.attempts++;

    stats.totalTime += reactionTime;

    if (

        stats.best === null ||

        reactionTime < stats.best

    ) {

        stats.best = reactionTime;

    }

    saveData(STORAGE_KEY, stats);

    updateStatistics();

    reactionBox.classList.remove("ready");

    reactionBox.textContent =

        `${reactionTime} ms`;

    result.textContent =

        `Your Reaction Time: ${reactionTime} ms`;

    toast("Great!", "success");

    vibrate(80);

    enable(startBtn);

    enable(playAgainBtn);

}
/* =====================================
   Update Statistics
===================================== */

function updateStatistics() {

    bestTime.textContent =

        stats.best === null

        ? "--"

        : `${stats.best} ms`;

    attemptCount.textContent =

        stats.attempts;

    if (stats.attempts === 0) {

        averageTime.textContent = "--";

        return;

    }

    const average = Math.round(

        stats.totalTime / stats.attempts

    );

    averageTime.textContent =

        `${average} ms`;

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

    clearTimeout(timer);

    stats = {

        best: null,

        totalTime: 0,

        attempts: 0

    };

    saveData(STORAGE_KEY, stats);

    updateStatistics();

    isWaiting = false;

    isReady = false;

    reactionBox.classList.remove("ready");

    reactionBox.classList.remove("wait");

    reactionBox.textContent = "Click Start";

    result.textContent = "Press Start to Begin";

    enable(startBtn);

    enable(playAgainBtn);

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

            if (!isWaiting && !isReady) {

                startGame();

            } else {

                handleReaction();

            }

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
async function saveOnlineReaction() {

    // Firestore Save

}

async function loadOnlineReaction() {

    // Firestore Load

}
*/


/* =====================================
   Initialization Check
===================================== */

console.log("Reaction Time Test Loaded Successfully");
