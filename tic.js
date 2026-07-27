
/* =====================================
   File : tic.js
   Game : Tic Tac Toe
   Version : 1.0.0
===================================== */

"use strict";

/* =====================================
   DOM Elements
===================================== */

const boardElement = $("#ticBoard");

const cells = document.querySelectorAll(".tic-cell");

const turnBox = $("#turnBox");

const result = $("#result");

const xWinsText = $("#xWins");

const oWinsText = $("#oWins");

const drawsText = $("#draws");

const totalMatchesText = $("#totalMatches");

const restartBtn = $("#restartBtn");

const newGameBtn = $("#newGameBtn");

const resetBtn = $("#resetBtn");


/* =====================================
   Storage
===================================== */

const STORAGE_KEY = "tic_tac_toe_stats";


/* =====================================
   Winning Patterns
===================================== */

const WIN_PATTERNS = [

    [0,1,2],

    [3,4,5],

    [6,7,8],

    [0,3,6],

    [1,4,7],

    [2,5,8],

    [0,4,8],

    [2,4,6]

];


/* =====================================
   Game State
===================================== */

let board = [

    "", "", "",

    "", "", "",

    "", "", ""

];

let currentPlayer = "X";

let gameOver = false;


/* =====================================
   Statistics
===================================== */

let stats = loadData(STORAGE_KEY, {

    xWins: 0,

    oWins: 0,

    draws: 0,

    totalMatches: 0

});


/* =====================================
   Initialize
===================================== */

init();

function init() {

    bindEvents();

    updateStatistics();

    updateTurn();

}


/* =====================================
   Bind Events
===================================== */

function bindEvents() {

    cells.forEach((cell) => {

        on(cell, "click", handleCellClick);

    });

    on(restartBtn, "click", restartMatch);

    on(newGameBtn, "click", newGame);

    on(resetBtn, "click", resetStatistics);

}
/* =====================================
   Handle Cell Click
===================================== */

function handleCellClick(event) {

    const cell = event.currentTarget;

    const index = Number(

        cell.dataset.index

    );

    if (gameOver) {

        return;

    }

    if (board[index] !== "") {

        return;

    }

    placeMove(index);

}


/* =====================================
   Place Move
===================================== */

function placeMove(index) {

    board[index] = currentPlayer;

    const cell = cells[index];

    cell.textContent = currentPlayer;

    cell.classList.add(

        currentPlayer.toLowerCase()

    );

    cell.disabled = true;

    if (checkWinner()) {

        return;

    }

    if (checkDraw()) {

        return;

    }

    changeTurn();

}


/* =====================================
   Change Turn
===================================== */

function changeTurn() {

    currentPlayer =

        currentPlayer === "X"

        ? "O"

        : "X";

    updateTurn();

}


/* =====================================
   Update Turn UI
===================================== */

function updateTurn() {

    turnBox.textContent =

        `বর্তমান টার্ন : Player ${currentPlayer}`;

}
/* =====================================
   Check Winner
===================================== */

function checkWinner() {

    for (const pattern of WIN_PATTERNS) {

        const [a, b, c] = pattern;

        if (
            board[a] !== "" &&
            board[a] === board[b] &&
            board[b] === board[c]
        ) {

            gameOver = true;

            highlightWinner(pattern);

            finishGame(board[a]);

            return true;

        }

    }

    return false;

}


/* =====================================
   Check Draw
===================================== */

function checkDraw() {

    const isDraw = board.every(

        (cell) => cell !== ""

    );

    if (!isDraw) {

        return false;

    }

    gameOver = true;

    stats.draws++;

    stats.totalMatches++;

    saveData(STORAGE_KEY, stats);

    updateStatistics();

    result.textContent = "🤝 ম্যাচ ড্র হয়েছে!";

    toast("Draw Match", "info");

    return true;

}


/* =====================================
   Finish Game
===================================== */

function finishGame(player) {

    stats.totalMatches++;

    if (player === "X") {

        stats.xWins++;

    } else {

        stats.oWins++;

    }

    saveData(STORAGE_KEY, stats);

    updateStatistics();

    result.textContent =
        `🎉 Player ${player} জয়ী হয়েছে!`;

    toast(`Player ${player} Wins!`, "success");

}


/* =====================================
   Highlight Winner
===================================== */

function highlightWinner(pattern) {

    pattern.forEach((index) => {

        cells[index].classList.add("winner");

    });

}


/* =====================================
   Update Statistics
===================================== */

function updateStatistics() {

    xWinsText.textContent = stats.xWins;

    oWinsText.textContent = stats.oWins;

    drawsText.textContent = stats.draws;

    totalMatchesText.textContent =
        stats.totalMatches;

}
/* =====================================
   Restart Match
===================================== */

function restartMatch() {

    board = [

        "", "", "",

        "", "", "",

        "", "", ""

    ];

    gameOver = false;

    currentPlayer = "X";

    cells.forEach((cell) => {

        cell.textContent = "";

        cell.disabled = false;

        cell.classList.remove(

            "x",
            "o",
            "winner"

        );

    });

    result.textContent =

        "নতুন ম্যাচ শুরু হয়েছে";

    updateTurn();

}


/* =====================================
   New Game
===================================== */

function newGame() {

    restartMatch();

}


/* =====================================
   Reset Statistics
===================================== */

function resetStatistics() {

    const ok = confirm(

        "সব Statistics রিসেট করতে চান?"

    );

    if (!ok) {

        return;

    }

    stats = {

        xWins: 0,

        oWins: 0,

        draws: 0,

        totalMatches: 0

    };

    saveData(STORAGE_KEY, stats);

    updateStatistics();

    restartMatch();

    toast("Statistics Reset", "success");

}


/* =====================================
   Keyboard Support
===================================== */

document.addEventListener("keydown", (event) => {

    switch (event.key.toLowerCase()) {

        case "r":

            restartMatch();

            break;

        case "n":

            newGame();

            break;
    }

});


/* =====================================
   Future Firebase Hooks
===================================== */

/*

async function saveMatchHistory() {

    // Firestore Save

}

async function loadMatchHistory() {

    // Firestore Load

}

async function playOnline() {

    // Multiplayer

}

*/


/* =====================================
   Ready
===================================== */

console.log("Tic Tac Toe Loaded Successfully");
