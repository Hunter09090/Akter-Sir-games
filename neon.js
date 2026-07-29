/* =====================================
   NEON CATCHER GAME
===================================== */

"use strict";

/* =====================================
   DOM
===================================== */

const gameArea =
document.getElementById("gameArea");

const basket =
document.getElementById("basket");

const scoreEl =
document.getElementById("score");

const lifeEl =
document.getElementById("life");

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
let life = 3;

let gameRunning = false;

let basketX = 50;

let orbInterval = null;

/* Best Score */

let bestScore =
Number(localStorage.getItem("neon-best")) || 0;

/* Orb Colors */

const orbColors = [
    "cyan",
    "purple",
    "pink",
    "blue",
    "green"
];

/* =====================================
   UPDATE BASKET
===================================== */

function updateBasket() {

    basket.style.left = basketX + "%";

}

/* =====================================
   CREATE ORB
===================================== */

function createOrb() {

    if (!gameRunning) return;

    const orb =
    document.createElement("div");

    orb.classList.add("orb");

    // Random Color
    const color =
    orbColors[Math.floor(Math.random() * orbColors.length)];

    orb.classList.add(color);

    // Random Position
    const maxX =
        gameArea.clientWidth - 40;

    let x =
        Math.random() * maxX;

    let y = -40;

    orb.style.left = x + "px";
    orb.style.top = y + "px";

    gameArea.appendChild(orb);

    /* Falling Animation */

    const fall =
    setInterval(() => {

        if (!gameRunning) {

            clearInterval(fall);

            orb.remove();

            return;

        }

        y += 4;

        orb.style.top = y + "px";

        /* Catch Detection */

        const basketRect =
            basket.getBoundingClientRect();

        const orbRect =
            orb.getBoundingClientRect();

        if (

            orbRect.bottom >= basketRect.top &&
            orbRect.left <= basketRect.right &&
            orbRect.right >= basketRect.left

        ) {

            clearInterval(fall);

            score++;

            scoreEl.textContent = score;

            // Glow Effect
            basket.style.boxShadow =
                "0 0 18px #22d3ee, 0 0 32px #3b82f6, 0 0 48px #8b5cf6";

            setTimeout(() => {

                basket.style.boxShadow =
                    "0 0 12px #06b6d4, 0 0 22px #3b82f6, 0 0 36px #8b5cf6";

            }, 120);

            orb.remove();

        }

        /* Miss Detection */

        if (y > gameArea.clientHeight) {

            clearInterval(fall);

            life--;

            lifeEl.textContent = life;

            orb.remove();

            if (life <= 0) {

                endGame();

            }

        }

    }, 20);

}

/* =====================================
   START GAME
===================================== */

function startGame() {

    score = 0;
    life = 3;

    scoreEl.textContent = score;
    lifeEl.textContent = life;

    basketX = 50;

    updateBasket();

    gameRunning = true;

    startBtn.disabled = true;
    startBtn.textContent = "🌌 Game Running...";

    // Remove old orbs
    document
        .querySelectorAll(".orb")
        .forEach(orb => orb.remove());

    // Spawn Orbs
    orbInterval =
    setInterval(createOrb, 700);

}

/* =====================================
   END GAME
===================================== */

function endGame() {

    gameRunning = false;

    clearInterval(orbInterval);

    let newRecord = false;

    if (score > bestScore) {

        bestScore = score;

        localStorage.setItem(
            "neon-best",
            bestScore
        );

        newRecord = true;

    }

    setTimeout(() => {

        const again = confirm(
            `🌌 GAME OVER!\\n\\n` +
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
   KEYBOARD CONTROL
===================================== */

window.addEventListener("keydown", (e) => {

    if (!gameRunning) return;

    if (e.key === "ArrowLeft") {

        basketX -= 6;

    }

    if (e.key === "ArrowRight") {

        basketX += 6;

    }

    basketX =
        Math.max(8, Math.min(92, basketX));

    updateBasket();

});

/* =====================================
   MOBILE CONTROL
===================================== */

leftBtn.addEventListener("click", () => {

    if (!gameRunning) return;

    basketX -= 8;

    basketX =
        Math.max(8, Math.min(92, basketX));

    updateBasket();

});

rightBtn.addEventListener("click", () => {

    if (!gameRunning) return;

    basketX += 8;

    basketX =
        Math.max(8, Math.min(92, basketX));

    updateBasket();

});

/* =====================================
   START BUTTON
===================================== */

startBtn.addEventListener("click", startGame);
