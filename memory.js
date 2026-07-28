/* =====================================
   MEMORY MATCH GAME
===================================== */

"use strict";

/* =====================================
   Emoji List
===================================== */

const emojis = [

    "😀",
    "🎮",
    "🚀",
    "🔥",
    "⚡",
    "🧠",
    "🎯",
    "🎲"

];

/* Duplicate + Shuffle */

let cards = [...emojis, ...emojis]

    .sort(() => Math.random() - 0.5);

/* =====================================
   DOM
===================================== */

const board =
document.getElementById("memoryBoard");

const movesEl =
document.getElementById("moves");

const restartBtn =
document.getElementById("restartBtn");

/* =====================================
   Game State
===================================== */

let firstCard = null;
let secondCard = null;

let lockBoard = false;

let moves = 0;
let matched = 0;

/* =====================================
   Create Board
===================================== */

function createBoard() {

    board.innerHTML = "";

    cards.forEach((emoji, index) => {

        const card =
        document.createElement("div");

        card.className = "memory-card";

        card.dataset.emoji = emoji;
        card.dataset.index = index;

        card.textContent = emoji;

        card.addEventListener(
            "click",
            flipCard
        );

        board.appendChild(card);

    });

}

/* =====================================
   Flip Card
===================================== */

function flipCard() {

    if (
        lockBoard ||
        this === firstCard ||
        this.classList.contains("matched")
    ) {
        return;
    }

    this.classList.add("flipped");

    if (!firstCard) {

        firstCard = this;

        return;

    }

    secondCard = this;

    moves++;

    movesEl.textContent = moves;

    checkMatch();

}

/* =====================================
   Check Match
===================================== */

function checkMatch() {

    const isMatch =
        firstCard.dataset.emoji ===
        secondCard.dataset.emoji;

    if (isMatch) {

        firstCard.classList.add("matched");
        secondCard.classList.add("matched");

        matched += 2;

        resetTurn();

        /* Win */

        if (matched === cards.length) {

            setTimeout(() => {

                alert(
                    `🎉 Congratulations!\\nYou completed the game in ${moves} moves.`
                );

            }, 300);

        }

    } else {

        lockBoard = true;

        setTimeout(() => {

            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");

            resetTurn();

        }, 900);

    }

}

/* =====================================
   Reset Turn
===================================== */

function resetTurn() {

    [firstCard, secondCard] = [null, null];

    lockBoard = false;

}

/* =====================================
   Restart Game
===================================== */

function restartGame() {

    cards = [...emojis, ...emojis]

        .sort(() => Math.random() - 0.5);

    firstCard = null;
    secondCard = null;

    lockBoard = false;

    moves = 0;
    matched = 0;

    movesEl.textContent = 0;

    createBoard();

}

restartBtn.addEventListener(
    "click",
    restartGame
);

/* =====================================
   Start Game
===================================== */

createBoard();
