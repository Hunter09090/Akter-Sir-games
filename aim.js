
/* =====================================
   File : aim.js
   Game : Aim Trainer
   Version : 1.0.0
===================================== */

"use strict";

/* =====================================
   DOM Elements
===================================== */

const gameArea = $("#gameArea");
const target = $("#target");

const startBtn = $("#startBtn");
const playAgainBtn = $("#playAgainBtn");
const resetBtn = $("#resetBtn");

const result = $("#result");

const scoreText = $("#score");
const accuracyText = $("#accuracy");
const timeLeftText = $("#timeLeft");
const bestScoreText = $("#bestScore");


/* =====================================
   Storage
===================================== */

const STORAGE_KEY = "aim_trainer_stats";


/* =====================================
   Game State
===================================== */

let gameRunning = false;

let score = 0;

let hits = 0;

let misses = 0;

let timeLeft = 30;

let timer = null;

let bestScore = loadData(STORAGE_KEY, 0);


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

    on(startBtn, "click", startGame);

    on(playAgainBtn, "click", startGame);

    on(resetBtn, "click", resetStatistics);

    on(target, "click", hitTarget);

    on(gameArea, "click", missTarget);

}


/* =====================================
   Start Game
===================================== */

function startGame() {

    if (gameRunning) {

        return;

    }

    gameRunning = true;

    score = 0;

    hits = 0;

    misses = 0;

    timeLeft = 30;

    result.textContent = "Hit the target!";

    disable(startBtn);

    disable(playAgainBtn);

    moveTarget();

    target.style.display = "block";

    updateUI();

    timer = setInterval(updateTimer, 1000);

}
/* =====================================
   Move Target
===================================== */

function moveTarget() {

    if (!gameRunning) {

        return;

    }

    const targetSize = 60;

    const maxX = gameArea.clientWidth - targetSize;

    const maxY = gameArea.clientHeight - targetSize;

    const x = random(0, maxX);

    const y = random(0, maxY);

    target.style.left = `${x}px`;

    target.style.top = `${y}px`;

}


/* =====================================
   Hit Target
===================================== */

function hitTarget(event) {

    if (!gameRunning) {

        return;

    }

    event.stopPropagation();

    hits++;

    score++;

    toast("+1 Score", "success");

    vibrate(50);

    moveTarget();

    updateUI();

}


/* =====================================
   Miss Target
===================================== */

function missTarget(event) {

    if (!gameRunning) {

        return;

    }

    if (event.target === target) {

        return;

    }

    misses++;

    updateUI();

}


/* =====================================
   Update Timer
===================================== */

function updateTimer() {

    timeLeft--;

    updateUI();

    if (timeLeft <= 0) {

        endGame();

    }

}


/* =====================================
   Update UI
===================================== */

function updateUI() {

    scoreText.textContent = score;

    timeLeftText.textContent = `${timeLeft}s`;

    bestScoreText.textContent = bestScore;

    const totalShots = hits + misses;

    const accuracy =

        totalShots === 0

        ? 0

        : Math.round(

            (hits / totalShots) * 100

        );

    accuracyText.textContent = `${accuracy}%`;

}
/* =====================================
   End Game
===================================== */

function endGame() {

    gameRunning = false;

    clearInterval(timer);

    target.style.display = "none";

    enable(startBtn);

    enable(playAgainBtn);

    if (score > bestScore) {

        bestScore = score;

        saveData(STORAGE_KEY, bestScore);

        toast("🎉 New Best Score!", "success");

    } else {

        toast("Game Over!", "info");

    }

    result.textContent =
        `Game Over! Your Score: ${score}`;

    updateUI();

}


/* =====================================
   Reset Statistics
===================================== */

function resetStatistics() {

    const confirmReset = confirm(
        "Reset Best Score?"
    );

    if (!confirmReset) {

        return;

    }

    clearInterval(timer);

    gameRunning = false;

    score = 0;

    hits = 0;

    misses = 0;

    timeLeft = 30;

    bestScore = 0;

    saveData(STORAGE_KEY, bestScore);

    target.style.display = "none";

    result.textContent = "Press Start to Play";

    enable(startBtn);

    enable(playAgainBtn);

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

            if (!gameRunning) {

                startGame();

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
async function saveOnlineScore() {

    // Firestore Save

}

async function loadOnlineScore() {

    // Firestore Load

}
*/


/* =====================================
   Initialization Check
===================================== */

console.log("Aim Trainer Loaded Successfully");
