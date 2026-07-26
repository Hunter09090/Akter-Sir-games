/* =====================================
   File : coin.js
   Game : Coin Toss
   Version : 1.0.0
===================================== */

"use strict";

/* =====================================
   DOM Elements
===================================== */

const coin = $("#coin");

const result = $("#result");

const selectedChoice = $("#selectedChoice");

const headBtn = $("#headBtn");

const tailBtn = $("#tailBtn");

const tossBtn = $("#tossBtn");

const playAgainBtn = $("#playAgainBtn");

const resetBtn = $("#resetBtn");

const headCount = $("#headCount");

const tailCount = $("#tailCount");

const totalCount = $("#totalCount");


/* =====================================
   Game State
===================================== */

const STORAGE_KEY = "coin_toss_stats";

let playerChoice = "";

let isFlipping = false;

let stats = loadData(STORAGE_KEY, {

    head: 0,

    tail: 0,

    total: 0

});


/* =====================================
   Initialize
===================================== */

init();

function init() {

    updateStatistics();

    bindEvents();

}


/* =====================================
   Events
===================================== */

function bindEvents() {

    on(headBtn, "click", () => {

        selectChoice("Head");

    });

    on(tailBtn, "click", () => {

        selectChoice("Tail");

    });

    on(tossBtn, "click", tossCoin);

    on(playAgainBtn, "click", resetRound);

    on(resetBtn, "click", resetStatistics);

}


/* =====================================
   Select Choice
===================================== */

function selectChoice(choice) {

    playerChoice = choice;

    selectedChoice.textContent = choice;

    headBtn.classList.remove("success");

    tailBtn.classList.remove("success");

    if (choice === "Head") {

        headBtn.classList.add("success");

    } else {

        tailBtn.classList.add("success");

    }

}
/* =====================================
   Toss Coin
===================================== */

async function tossCoin() {

    if (isFlipping) {

        return;

    }

    if (playerChoice === "") {

        toast("Please select Head or Tail", "error");

        vibrate(200);

        return;

    }

    isFlipping = true;

    disable(tossBtn);

    disable(headBtn);

    disable(tailBtn);

    loading(tossBtn, "Flipping...");

    result.textContent = "Flipping Coin...";

    coin.classList.add("rotate");

    await delay(1000);

    const coinSide =
        randomItem(["Head", "Tail"]);

    coin.classList.remove("rotate");

    showResult(coinSide);

}


/* =====================================
   Show Result
===================================== */

function showResult(coinSide) {

    coin.textContent =
        coinSide === "Head"
        ? "🙂"
        : "🦅";

    if (coinSide === "Head") {

        stats.head++;

    } else {

        stats.tail++;

    }

    stats.total++;

    saveData(STORAGE_KEY, stats);

    updateStatistics();

    if (playerChoice === coinSide) {

        result.innerHTML =
            "🎉 You Win!";

        result.className =
            "game-result success";

        toast("Congratulations!", "success");

        vibrate(100);

    } else {

        result.innerHTML =
            "😔 You Lose!";

        result.className =
            "game-result error";

        toast("Better Luck Next Time", "error");

        vibrate([120, 80, 120]);

    }

    stopLoading(tossBtn);

    enable(tossBtn);

    enable(headBtn);

    enable(tailBtn);

    isFlipping = false;

}


/* =====================================
   Update Statistics
===================================== */

function updateStatistics() {

    headCount.textContent =
        stats.head;

    tailCount.textContent =
        stats.tail;

    totalCount.textContent =
        stats.total;

                          }
/* =====================================
   Reset Current Round
===================================== */

function resetRound() {

    playerChoice = "";

    selectedChoice.textContent = "No Choice";

    result.textContent = "Select Head or Tail";

    result.className = "game-result";

    coin.textContent = "🪙";

    headBtn.classList.remove("success");

    tailBtn.classList.remove("success");

}


/* =====================================
   Reset Statistics
===================================== */

function resetStatistics() {

    const confirmReset = confirm(
        "Are you sure you want to reset all statistics?"
    );

    if (!confirmReset) {

        return;

    }

    stats = {

        head: 0,

        tail: 0,

        total: 0

    };

    saveData(STORAGE_KEY, stats);

    updateStatistics();

    resetRound();

    toast("Statistics Reset Successfully", "success");

}


/* =====================================
   Keyboard Shortcuts
===================================== */

document.addEventListener("keydown", (event) => {

    switch (event.key.toLowerCase()) {

        case "h":

            selectChoice("Head");

            break;

        case "t":

            selectChoice("Tail");

            break;

        case "enter":

        case " ":

            event.preventDefault();

            tossCoin();

            break;

        case "r":

            resetRound();

            break;

    }

});


/* =====================================
   Future Firebase Hook
===================================== */

/*
Future Example

async function saveOnlineStats(){

    // Firebase Firestore

}

async function loadOnlineStats(){

    // Firebase Firestore

}
*/


/* =====================================
   End Of File
===================================== */

console.log("Coin Toss Loaded Successfully");
