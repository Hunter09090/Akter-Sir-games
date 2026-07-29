/* =====================================
   THUNDER TAP GAME
===================================== */

"use strict";

/* =====================================
   DOM
===================================== */

const thunderArea =
document.getElementById("thunderArea");

const lightning =
document.getElementById("lightning");

const messageEl =
document.getElementById("message");

const reactionEl =
document.getElementById("reaction");

const roundEl =
document.getElementById("round");

const bestTimeEl =
document.getElementById("bestTime");

const startBtn =
document.getElementById("startBtn");

/* =====================================
   GAME STATE
===================================== */

let currentRound = 1;
let totalRounds = 5;

let waiting = false;
let lightningVisible = false;

let startTime = 0;

let results = [];

let timeoutId = null;

/* Best Time */

let bestTime =
Number(localStorage.getItem("thunder-best")) || null;

bestTimeEl.textContent =
bestTime ? bestTime.toFixed(3) + "s" : "--";

/* =====================================
   START ROUND
===================================== */

function startRound() {

    waiting = true;
    lightningVisible = false;

    lightning.classList.add("hidden");

    messageEl.textContent =
        "Wait for the lightning...";

    reactionEl.textContent = "0.000s";

    /* Random Delay */

    const delay =
        Math.random() * 4000 + 1000;

    timeoutId =
    setTimeout(showLightning, delay);

}

/* =====================================
   SHOW LIGHTNING
===================================== */

function showLightning() {

    waiting = false;
    lightningVisible = true;

    lightning.classList.remove("hidden");

    messageEl.textContent =
        "⚡ TAP NOW!";

    startTime = performance.now();

}

/* =====================================
   HANDLE TAP
===================================== */

function handleTap() {

    /* Too Early */

    if (waiting) {

        clearTimeout(timeoutId);

        messageEl.textContent =
            "❌ Too Early! Wait for the lightning.";

        setTimeout(startRound, 1500);

        return;

    }

    /* Correct Tap */

    if (lightningVisible) {

        lightningVisible = false;

        lightning.classList.add("hidden");

        const reaction =
            (performance.now() - startTime) / 1000;

        results.push(reaction);

        reactionEl.textContent =
            reaction.toFixed(3) + "s";

        thunderArea.classList.add("flash");

setTimeout(() => {

    thunderArea.classList.remove("flash");

}, 150);

        /* Save Best */

        if (!bestTime || reaction < bestTime) {

            bestTime = reaction;

            localStorage.setItem(
                "thunder-best",
                bestTime
            );

            bestTimeEl.textContent =
                bestTime.toFixed(3) + "s";

        }

        /* Next Round */

        if (currentRound < totalRounds) {

            currentRound++;

            roundEl.textContent = currentRound;

            setTimeout(startRound, 1200);

        } else {

            finishGame();

        }

    }

}

/* =====================================
   FINISH GAME
===================================== */

function finishGame() {

    const average =
        results.reduce((a, b) => a + b, 0) / results.length;

    messageEl.textContent =
        "🎉 Challenge Complete!";

    setTimeout(() => {

        const again = confirm(
            `⚡ THUNDER TAP COMPLETE!\\n\\n` +
            `Best Reaction: ${Math.min(...results).toFixed(3)}s\\n` +
            `Average Reaction: ${average.toFixed(3)}s\\n\\n` +
            `Play Again?`
        );

        if (again) {

            startGame();

        } else {

            startBtn.disabled = false;

            startBtn.textContent =
                "▶ Start Challenge";

        }

    }, 300);

}

/* =====================================
   START GAME
===================================== */

function startGame() {

    currentRound = 1;

    results = [];

    roundEl.textContent = currentRound;

    startBtn.disabled = true;

    startBtn.textContent = "⚡ Challenge Running...";

    startRound();

}

/* =====================================
   EVENTS
===================================== */

thunderArea.addEventListener("click", handleTap);

startBtn.addEventListener("click", startGame);
