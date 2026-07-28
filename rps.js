/* =====================================
   ROCK PAPER SCISSORS GAME
===================================== */

"use strict";

const choices = ["rock", "paper", "scissors"];

let playerScore = 0;
let computerScore = 0;

const playerScoreEl =
document.getElementById("playerScore");

const computerScoreEl =
document.getElementById("computerScore");

const playerChoiceEl =
document.getElementById("playerChoice");

const computerChoiceEl =
document.getElementById("computerChoice");

const resultText =
document.getElementById("resultText");

const buttons =
document.querySelectorAll(".rps-btn");

const resetBtn =
document.getElementById("resetBtn");

/* =====================================
   Emoji Helper
===================================== */

function getEmoji(choice) {

    if (choice === "rock") return "✊";
    if (choice === "paper") return "✋";

    return "✌️";

}

/* =====================================
   Determine Winner
===================================== */

function getWinner(player, computer) {

    if (player === computer) {
        return "draw";
    }

    if (
        (player === "rock" && computer === "scissors") ||
        (player === "paper" && computer === "rock") ||
        (player === "scissors" && computer === "paper")
    ) {

        return "player";

    }

    return "computer";

}

/* =====================================
   Play Game
===================================== */

function playGame(playerChoice) {

    const computerChoice =
        choices[Math.floor(Math.random() * choices.length)];

    playerChoiceEl.textContent =
        getEmoji(playerChoice);

    computerChoiceEl.textContent =
        getEmoji(computerChoice);

    const winner =
        getWinner(playerChoice, computerChoice);

    if (winner === "player") {

        playerScore++;

        resultText.textContent = "🎉 You Win!";

    }

    else if (winner === "computer") {

        computerScore++;

        resultText.textContent = "😢 Computer Wins!";

    }

    else {

        resultText.textContent = "🤝 It's a Draw!";

    }

    playerScoreEl.textContent = playerScore;

    computerScoreEl.textContent = computerScore;

}

/* =====================================
   Button Events
===================================== */

buttons.forEach(button => {

    button.addEventListener("click", () => {

        playGame(button.dataset.choice);

    });

});

/* =====================================
   Reset Game
===================================== */

resetBtn.addEventListener("click", () => {

    playerScore = 0;
    computerScore = 0;

    playerScoreEl.textContent = 0;
    computerScoreEl.textContent = 0;

    playerChoiceEl.textContent = "-";
    computerChoiceEl.textContent = "-";

    resultText.textContent = "Make your move!";

});
