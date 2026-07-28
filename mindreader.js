/* =====================================
   MIND READER GAME
===================================== */

"use strict";

const revealBtn =
document.getElementById("revealBtn");

const resultBox =
document.getElementById("resultBox");

revealBtn.addEventListener("click", () => {

    resultBox.classList.remove("hidden");

    revealBtn.textContent = "✨ Mind Read Complete";

    revealBtn.disabled = true;

});
