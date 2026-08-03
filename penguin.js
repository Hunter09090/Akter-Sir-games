"use strict";

const gameArea = document.getElementById("gameArea");

const penguin = document.getElementById("penguin");

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

penguin.style.left = lanes[currentLane] + "%";

/* Best Score */

let bestScore =
Number(localStorage.getItem("penguin-best")) || 0;

bestScoreEl.textContent = bestScore;

/* Move */

function moveLeft() {

    if (currentLane > 0) {

        currentLane--;

        penguin.style.left = lanes[currentLane] + "%";

    }

}

function moveRight() {

    if (currentLane < lanes.length - 1) {

        currentLane++;

        penguin.style.left = lanes[currentLane] + "%";

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

/* Create Falling Item */

function createItem() {

    const item = document.createElement("div");

    item.className = "item";

    const isFish = Math.random() > 0.35;

    item.textContent = isFish ? "🐟" : "🧊";

    item.dataset.type = isFish ? "fish" : "ice";

    const lane = Math.floor(Math.random() * lanes.length);

    item.dataset.lane = lane;

    item.style.left = lanes[lane] + "%";

    item.style.animationDuration =
        (2 + Math.random()).toFixed(2) + "s";

    gameArea.appendChild(item);

    const collisionCheck = setInterval(() => {

        if (!gameRunning) {

            clearInterval(collisionCheck);

            return;

        }

        const itemRect = item.getBoundingClientRect();

        const penguinRect = penguin.getBoundingClientRect();

        const hit = !(

            itemRect.right < penguinRect.left ||
            itemRect.left > penguinRect.right ||
            itemRect.bottom < penguinRect.top ||
            itemRect.top > penguinRect.bottom

        );

        if (hit && Number(item.dataset.lane) === currentLane) {

            clearInterval(collisionCheck);

            if (item.dataset.type === "fish") {

                score += 5;

                scoreEl.textContent = score;

                item.remove();

            } else {

                item.remove();

                gameOver();

            }

        }

    }, 20);

    item.addEventListener("animationend", () => {

        clearInterval(collisionCheck);

        item.remove();

    });

}

/* Snow Effect */

function createSnow() {

    const snow = document.createElement("div");

    snow.className = "snow";

    snow.textContent = "❄";

    snow.style.left = Math.random() * 100 + "%";

    snow.style.animationDuration =
        (4 + Math.random() * 4).toFixed(2) + "s";

    gameArea.appendChild(snow);

    setTimeout(() => snow.remove(), 8000);

}

setInterval(createSnow, 300);

/* Start Game */

function startGame() {

    score = 0;

    scoreEl.textContent = score;

    currentLane = 1;

    penguin.classList.remove("hit");

    penguin.style.opacity = "1";

    penguin.style.left = lanes[currentLane] + "%";

    gameRunning = true;

    startOverlay.style.display = "none";

    document.querySelectorAll(".item")
        .forEach(i => i.remove());

    spawnTimer = setInterval(createItem, 850);

    scoreTimer = setInterval(() => {

        score++;

        scoreEl.textContent = score;

    }, 1000);

}

/* Game Over */

function gameOver() {

    gameRunning = false;

    clearInterval(spawnTimer);

    clearInterval(scoreTimer);

    penguin.classList.add("hit");

    if (score > bestScore) {

        bestScore = score;

        localStorage.setItem("penguin-best", bestScore);

        bestScoreEl.textContent = bestScore;

    }

    setTimeout(() => {

        const again = confirm(
            `🐧 OOPS! You fell into the ice hole!\\n\\nScore: ${score}\\nBest: ${bestScore}\\n\\nPlay Again?`
        );

        if (again) {

            penguin.style.opacity = "1";

            startGame();

        } else {

            startOverlay.style.display = "flex";

        }

    }, 900);

}

/* Button */

startBtn.addEventListener("click", startGame);
