/* =====================================
   TARGET STORM GAME
===================================== */

"use strict";

/* =====================================
   DOM
===================================== */

const gameArea =
document.getElementById("gameArea");

const scoreEl =
document.getElementById("score");

const comboEl =
document.getElementById("combo");

const timerEl =
document.getElementById("timer");

const startBtn =
document.getElementById("startBtn");

/* =====================================
   GAME STATE
===================================== */

let score = 0;
let combo = 0;
let timeLeft = 30;

let gameRunning = false;

let spawnInterval = null;
let timerInterval = null;

/* Best Score */

let bestScore =
Number(localStorage.getItem("target-best")) || 0;

/* =====================================
   CREATE TARGET
===================================== */

function createTarget() {

    if (!gameRunning) return;

    const target =
    document.createElement("div");

    target.classList.add("target");

    const maxX =
        gameArea.clientWidth - 90;

    const maxY =
        gameArea.clientHeight - 120;

    target.style.left =
        Math.random() * maxX + "px";

    target.style.top =
        Math.random() * maxY + "px";

    /* Click Event */

    target.addEventListener("click", () => {

        if (!gameRunning) return;

        target.classList.add("hit");

        combo++;

        // Combo Bonus
        score += 1 + Math.floor(combo / 5);

        scoreEl.textContent = score;

        comboEl.textContent = combo;

        setTimeout(() => {

            target.remove();

        }, 200);

    });

    gameArea.appendChild(target);

    // Remove After 1.5s
    setTimeout(() => {

        target.remove();

    }, 1500);

}

/* =====================================
   CREATE BOMB
===================================== */

function createBomb() {

    if (!gameRunning) return;

    const bomb =
    document.createElement("div");

    bomb.classList.add("bomb");

    const maxX =
        gameArea.clientWidth - 80;

    const maxY =
        gameArea.clientHeight - 120;

    bomb.style.left =
        Math.random() * maxX + "px";

    bomb.style.top =
        Math.random() * maxY + "px";

    /* Click Event */

    bomb.addEventListener("click", () => {

        if (!gameRunning) return;

        createExplosion(
            bomb.offsetLeft,
            bomb.offsetTop
        );

        // Penalty
        score = Math.max(0, score - 2);

        combo = 0;

        scoreEl.textContent = score;

        comboEl.textContent = combo;

        bomb.remove();

    });

    gameArea.appendChild(bomb);

    // Remove After 1.8s
    setTimeout(() => {

        bomb.remove();

    }, 1800);

}

/* =====================================
   EXPLOSION EFFECT
===================================== */

function createExplosion(x, y) {

    const explosion =
    document.createElement("div");

    explosion.classList.add("explosion");

    explosion.style.left = x + "px";
    explosion.style.top = y + "px";

    gameArea.appendChild(explosion);

    setTimeout(() => {

        explosion.remove();

    }, 350);

}

/* =====================================
   SPAWN OBJECTS
===================================== */

function spawnObject() {

    // 25% chance bomb
    if (Math.random() < 0.25) {

        createBomb();

    } else {

        createTarget();

    }

}

/* =====================================
   START GAME
===================================== */

function startGame() {

    score = 0;
    combo = 0;
    timeLeft = 30;

    scoreEl.textContent = score;
    comboEl.textContent = combo;
    timerEl.textContent = timeLeft;

    gameRunning = true;

    startBtn.disabled = true;
    startBtn.textContent = "🎯 Storm Running...";

    // Clear old objects
    gameArea.innerHTML = "";

    /* Spawn System */

    spawnInterval =
    setInterval(spawnObject, 450);

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

    clearInterval(spawnInterval);
    clearInterval(timerInterval);

    let newRecord = false;

    if (score > bestScore) {

        bestScore = score;

        localStorage.setItem(
            "target-best",
            bestScore
        );

        newRecord = true;

    }

    setTimeout(() => {

        const again = confirm(
            `🎯 TARGET STORM OVER!\\n\\n` +
            `Your Score: ${score}\\n` +
            `Best Score: ${bestScore}\\n` +
            `Best Combo: ${combo}\\n\\n` +
            `${newRecord ? "🏆 NEW RECORD!\\n\\n" : ""}` +
            `Play Again?`
        );

        if (again) {

            startGame();

        } else {

            startBtn.disabled = false;
            startBtn.textContent = "▶ Start Storm";

        }

    }, 300);

}

/* =====================================
   START BUTTON
===================================== */

startBtn.addEventListener("click", startGame);
