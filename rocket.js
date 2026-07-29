/* =====================================
   ROCKET DODGE GAME
===================================== */

"use strict";

/* =====================================
   DOM
===================================== */

const gameArea =
document.getElementById("gameArea");

const rocket =
document.getElementById("rocket");

const scoreEl =
document.getElementById("score");

const bestScoreEl =
document.getElementById("bestScore");

const startBtn =
document.getElementById("startBtn");

const leftBtn =
document.getElementById("leftBtn");

const rightBtn =
document.getElementById("rightBtn");

/* =====================================
   GAME STATE
===================================== */

let score = 0;

let gameRunning = false;

let rocketX = 50;

let asteroidInterval = null;
let scoreInterval = null;

let fallSpeed = 4;

/* Best Score */

let bestScore =
Number(localStorage.getItem("rocket-best")) || 0;

bestScoreEl.textContent = bestScore;

/* =====================================
   UPDATE ROCKET
===================================== */

function updateRocket() {

    rocket.style.left = rocketX + "%";

}

/* =====================================
   CREATE ASTEROID
===================================== */

function createAsteroid() {

    if (!gameRunning) return;

    const asteroid =
    document.createElement("div");

    asteroid.classList.add("asteroid");

    const maxX =
        gameArea.clientWidth - 50;

    let x =
        Math.random() * maxX;

    let y = -50;

    asteroid.style.left = x + "px";
    asteroid.style.top = y + "px";

    gameArea.appendChild(asteroid);

    /* Falling Animation */

    const fall =
    setInterval(() => {

        if (!gameRunning) {

            clearInterval(fall);

            asteroid.remove();

            return;

        }

        y += fallSpeed;

        asteroid.style.top = y + "px";

        /* Collision */

        const rocketRect =
            rocket.getBoundingClientRect();

        const asteroidRect =
            asteroid.getBoundingClientRect();

        const hit =

            asteroidRect.bottom >= rocketRect.top &&
            asteroidRect.top <= rocketRect.bottom &&
            asteroidRect.left <= rocketRect.right &&
            asteroidRect.right >= rocketRect.left;

        if (hit) {

            clearInterval(fall);

            asteroid.remove();

            endGame();

        }

        /* Remove Passed Asteroid */

        if (y > gameArea.clientHeight) {

            clearInterval(fall);

            asteroid.remove();

        }

    }, 20);

}

/* =====================================
   START GAME
===================================== */

function startGame() {

    score = 0;

    scoreEl.textContent = score;

    rocketX = 50;

    updateRocket();

    fallSpeed = 4;

    gameRunning = true;

    startBtn.disabled = true;

    startBtn.textContent = "🚀 Flying...";

    /* Remove Old Asteroids */

    document
        .querySelectorAll(".asteroid")
        .forEach(a => a.remove());

    /* Spawn Asteroids */

    asteroidInterval =
    setInterval(createAsteroid, 800);

    /* Score System */

    scoreInterval =
    setInterval(() => {

        if (!gameRunning) return;

        score++;

        scoreEl.textContent = score;

        /* Increase Difficulty */

        if (score % 10 === 0) {

            fallSpeed += 0.5;

        }

    }, 1000);

}

/* =====================================
   END GAME
===================================== */

function endGame() {

    gameRunning = false;

    clearInterval(asteroidInterval);
    clearInterval(scoreInterval);

    let newRecord = false;

    if (score > bestScore) {

        bestScore = score;

        localStorage.setItem(
            "rocket-best",
            bestScore
        );

        newRecord = true;

        bestScoreEl.textContent = bestScore;

    }

    setTimeout(() => {

        const again = confirm(
            `☄️ CRASHED!\\n\\n` +
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

    }, 200);

}

/* =====================================
   KEYBOARD CONTROL
===================================== */

window.addEventListener("keydown", (e) => {

    if (!gameRunning) return;

    if (e.key === "ArrowLeft") {

        rocketX -= 6;

    }

    if (e.key === "ArrowRight") {

        rocketX += 6;

    }

    rocketX =
        Math.max(8, Math.min(92, rocketX));

    updateRocket();

});

/* =====================================
   MOBILE CONTROL
===================================== */

leftBtn.addEventListener("click", () => {

    if (!gameRunning) return;

    rocketX -= 8;

    rocketX =
        Math.max(8, Math.min(92, rocketX));

    updateRocket();

});

rightBtn.addEventListener("click", () => {

    if (!gameRunning) return;

    rocketX += 8;

    rocketX =
        Math.max(8, Math.min(92, rocketX));

    updateRocket();

});

/* =====================================
   START BUTTON
===================================== */

startBtn.addEventListener("click", startGame);
