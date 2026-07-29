/* =====================================
   BALLOON POP GAME
===================================== */

"use strict";

/* =====================================
   DOM
===================================== */

const gameArea =
document.getElementById("gameArea");

const scoreEl =
document.getElementById("score");

const timerEl =
document.getElementById("timer");

const startBtn =
document.getElementById("startBtn");

/* =====================================
   GAME STATE
===================================== */

let score = 0;
let timeLeft = 30;
let gameRunning = false;

let balloonInterval = null;
let timerInterval = null;

/* Best Score */

let bestScore =
Number(localStorage.getItem("balloon-best")) || 0;

/* Balloon Colors */

const colors = [
    "red",
    "blue",
    "green",
    "yellow",
    "purple",
    "pink",
    "orange"
];

/* =====================================
   CREATE BALLOON
===================================== */

function createBalloon() {

    if (!gameRunning) return;

    const balloon =
    document.createElement("div");

    balloon.classList.add("balloon");

    // Random Color
    const color =
    colors[Math.floor(Math.random() * colors.length)];

    balloon.classList.add(color);

    // Random Position
    const maxX =
        gameArea.clientWidth - 80;

    balloon.style.left =
        Math.random() * maxX + "px";

    balloon.style.bottom = "-120px";

    // Random Speed
    const duration =
        (Math.random() * 2 + 4).toFixed(1);

    balloon.style.animationDuration =
        duration + "s";

    /* Click Event */

    balloon.addEventListener("click", () => {

        if (!gameRunning) return;

        balloon.classList.add("pop");

        // Bonus Balloon
        if (color === "yellow") {

            score += 5;

        } else {

            score += 1;

        }

        scoreEl.textContent = score;

        setTimeout(() => {

            balloon.remove();

        }, 200);

    });

    // Remove After Animation
    balloon.addEventListener("animationend", () => {

        balloon.remove();

    });

    gameArea.appendChild(balloon);

}

/* =====================================
   START GAME
===================================== */

function startGame() {

    // Reset
    score = 0;
    timeLeft = 30;

    scoreEl.textContent = score;
    timerEl.textContent = timeLeft;

    gameRunning = true;

    startBtn.disabled = true;
    startBtn.textContent = "🎈 Game Running...";

    // Clear Old Balloons
    gameArea.innerHTML = "";

    /* Create Balloons */

    balloonInterval =
    setInterval(createBalloon, 700);

    /* Timer */

    timerInterval =
    setInterval(() => {

        timeLeft--;

        timerEl.textContent = timeLeft;

        if (timeLeft <= 0) {

            endGame();

        }

    }, 1000);

}

/* =====================================
   END GAME
===================================== */

function endGame() {

    gameRunning = false;

    clearInterval(balloonInterval);
    clearInterval(timerInterval);

    // Save Best Score
    let newRecord = false;

    if (score > bestScore) {

        bestScore = score;

        localStorage.setItem(
            "balloon-best",
            bestScore
        );

        newRecord = true;

    }

    setTimeout(() => {

        const again = confirm(
            `🎈 TIME UP!\\n\\n` +
            `Your Score: ${score}\\n` +
            `Best Score: ${bestScore}\\n` +
            `${newRecord ? "🏆 NEW RECORD!\\n\\n" : "\\n"}` +
            `Play Again?`
        );

        if (again) {

            startGame();

        } else {

            startBtn.disabled = false;
            startBtn.textContent = "▶ Start Game";

        }

    }, 300);

}

/* =====================================
   START BUTTON
===================================== */

startBtn.addEventListener("click", startGame);
