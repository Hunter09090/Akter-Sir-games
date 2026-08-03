"use strict";

const gameArea = document.getElementById("gameArea");

const runner = document.getElementById("runner");

const scoreEl = document.getElementById("score");

const bestScoreEl = document.getElementById("bestScore");

const startBtn = document.getElementById("startBtn");

const startOverlay = document.getElementById("startOverlay");

let score = 0;

let gameRunning = false;

let spawnTimer = null;

let scoreTimer = null;

/* Lanes */

const lanes = [35, 50, 65];

let currentLane = 1;

runner.style.left = lanes[currentLane] + "%";

/* Best Score */

let bestScore =
Number(localStorage.getItem("banana-best")) || 0;

bestScoreEl.textContent = bestScore;

/* Move */

function moveLeft() {

    if (currentLane > 0) {

        currentLane--;

        runner.style.left = lanes[currentLane] + "%";

    }

}

function moveRight() {

    if (currentLane < lanes.length - 1) {

        currentLane++;

        runner.style.left = lanes[currentLane] + "%";

    }

}

/* Keyboard */

window.addEventListener("keydown", e => {

    if (!gameRunning) return;

    if (e.key === "ArrowLeft" || e.key.toLowerCase() === "a") {

        moveLeft();

    }

    if (e.key === "ArrowRight" || e.key.toLowerCase() === "d") {

        moveRight();

    }

});

/* Mobile */

document.getElementById("leftBtn")
.addEventListener("click", moveLeft);

document.getElementById("rightBtn")
.addEventListener("click", moveRight);

/* Create Banana */

function createBanana() {

    const banana = document.createElement("div");

    banana.className = "banana";

    banana.textContent = "🍌";

    const lane = Math.floor(Math.random() * lanes.length);

    banana.dataset.lane = lane;

    banana.style.left = lanes[lane] + "%";

    banana.style.animationDuration =
        (2 + Math.random()).toFixed(2) + "s";

    gameArea.appendChild(banana);

    const collisionCheck = setInterval(() => {

        if (!gameRunning) {

            clearInterval(collisionCheck);

            return;

        }

        const bananaRect = banana.getBoundingClientRect();

        const runnerRect = runner.getBoundingClientRect();

        const hit = !(

            bananaRect.right < runnerRect.left ||
            bananaRect.left > runnerRect.right ||
            bananaRect.bottom < runnerRect.top ||
            bananaRect.top > runnerRect.bottom

        );

        if (hit && Number(banana.dataset.lane) === currentLane) {

            clearInterval(collisionCheck);

            banana.remove();

            gameOver();

        }

    }, 20);

    banana.addEventListener("animationend", () => {

        clearInterval(collisionCheck);

        banana.remove();

    });

}

/* Start Game */

function startGame() {

    score = 0;

    scoreEl.textContent = score;

    currentLane = 1;

    runner.classList.remove("slip");

    runner.style.opacity = "1";

    runner.style.left = lanes[currentLane] + "%";

    gameRunning = true;

    startOverlay.style.display = "none";

    /* Remove Old Bananas */

    document.querySelectorAll(".banana")
        .forEach(b => b.remove());

    spawnTimer = setInterval(createBanana, 850);

    scoreTimer = setInterval(() => {

        score++;

        scoreEl.textContent = score;

    }, 500);

}

/* Game Over */

function gameOver() {

    gameRunning = false;

    clearInterval(spawnTimer);

    clearInterval(scoreTimer);

    runner.classList.add("slip");

    if (score > bestScore) {

        bestScore = score;

        localStorage.setItem("banana-best", bestScore);

        bestScoreEl.textContent = bestScore;

    }

    setTimeout(() => {

        const again = confirm(
            `🍌 OOPS! You slipped!\\n\\nScore: ${score}\\nBest: ${bestScore}\\n\\nPlay Again?`
        );

        if (again) {

            runner.style.opacity = "1";

            startGame();

        } else {

            startOverlay.style.display = "flex";

        }

    }, 900);

}

/* Button */

startBtn.addEventListener("click", startGame);
