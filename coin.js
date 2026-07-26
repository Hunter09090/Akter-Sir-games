
/* =====================================
   File : coin.js
===================================== */

"use strict";

/* =====================================
   DOM Elements
===================================== */

const coin = document.getElementById("coin");

const headBtn = document.getElementById("headBtn");
const tailBtn = document.getElementById("tailBtn");

const tossBtn = document.getElementById("tossBtn");

const resultText = document.getElementById("resultText");

const headCount = document.getElementById("headCount");
const tailCount = document.getElementById("tailCount");
const totalCount = document.getElementById("totalCount");


/* =====================================
   Variables
===================================== */

let selectedChoice = "";

let head = 0;
let tail = 0;
let total = 0;

let isPlaying = false;


/* =====================================
   Select Head
===================================== */

headBtn.addEventListener("click", () => {

    selectedChoice = "Head";

    headBtn.style.background = "#16a34a";
    tailBtn.style.background = "#2563eb";

});


/* =====================================
   Select Tail
===================================== */

tailBtn.addEventListener("click", () => {

    selectedChoice = "Tail";

    tailBtn.style.background = "#16a34a";
    headBtn.style.background = "#2563eb";

});


/* =====================================
   Toss Button
===================================== */

tossBtn.addEventListener("click", tossCoin);


/* =====================================
   Toss Coin
===================================== */

function tossCoin() {

    if (isPlaying) return;

    if (selectedChoice === "") {

        alert("Please select Head or Tail.");

        return;

    }

    isPlaying = true;

    resultText.textContent = "Flipping...";

    coin.style.transform = "rotateY(0deg)";

    setTimeout(() => {

        const result =
            Math.random() < 0.5 ? "Head" : "Tail";

        showResult(result);

    }, 1500);

}


/* =====================================
   Show Result
===================================== */

function showResult(result) {

    total++;

    if (result === "Head") {

        head++;

        coin.textContent = "🙂";

    } else {

        tail++;

        coin.textContent = "🦅";

    }

    updateStats();

    if (selectedChoice === result) {

        resultText.textContent =
            `🎉 You Win! (${result})`;

    } else {

        resultText.textContent =
            `😢 You Lose! (${result})`;

    }

    isPlaying = false;

}
