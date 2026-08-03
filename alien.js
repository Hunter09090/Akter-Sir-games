"use strict";

const holes = document.querySelectorAll(".hole");

const scoreEl = document.getElementById("score");

const timeEl = document.getElementById("time");

const startBtn = document.getElementById("startBtn");

const startOverlay = document.getElementById("startOverlay");

let score = 0;

let timeLeft = 30;

let gameRunning = false;

let alienTimer = null;

let countdownTimer = null;

/* Show Random Alien */

function showAlien() {

    holes.forEach(h => {

        h.classList.remove("show");

        h.innerHTML = "";

    });

    const randomHole =
        holes[Math.floor(Math.random() * holes.length)];

    const alien = document.createElement("div");

    alien.className = "alien";

    alien.textContent = "👾";

    alien.addEventListener("click", () => {

        if (!gameRunning) return;

        score++;

        scoreEl.textContent = score;

        alien.classList.add("hit");

        setTimeout(() => {

            randomHole.classList.remove("show");

            randomHole.innerHTML = "";

        }, 120);

    });

    randomHole.appendChild(alien);

    randomHole.classList.add("show");

}

/* Start Game */

function startGame() {

    score = 0;

    timeLeft = 30;

    gameRunning = true;

    scoreEl.textContent = score;

    timeEl.textContent = timeLeft;

    startOverlay.style.display = "none";

    showAlien();

    alienTimer = setInterval(showAlien, 700);

    countdownTimer = setInterval(() => {

        timeLeft--;

        timeEl.textContent = timeLeft;

        if (timeLeft <= 0) {

            endGame();

        }

    }, 1000);

}

/* End Game */

function endGame() {

    gameRunning = false;

    clearInterval(alienTimer);

    clearInterval(countdownTimer);

    holes.forEach(h => {

        h.classList.remove("show");

        h.innerHTML = "";

    });

    setTimeout(() => {

        const again = confirm(
            `👽 TIME UP!\\n\\nYour Score: ${score}\\n\\nPlay Again?`
        );

        if (again) {

            startGame();

        } else {

            startOverlay.style.display = "flex";

        }

    }, 200);

}

/* Button */

startBtn.addEventListener("click", startGame);
