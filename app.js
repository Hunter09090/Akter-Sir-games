
/* =====================================
   File : app.js
===================================== */

"use strict";
/* =====================================
   Load Header & Footer
===================================== */

async function loadLayout() {

    try {

        const headerContainer =
            document.getElementById("header");

        if (headerContainer) {

            const response =
                await fetch("header.html");

            headerContainer.innerHTML =
                await response.text();

            if (typeof initHeader === "function") {

                initHeader();

            }

        }

        const footerContainer =
            document.getElementById("footer");

        if (footerContainer) {

            const response =
                await fetch("footer.html");

            footerContainer.innerHTML =
                await response.text();

            if (typeof initFooter === "function") {

                initFooter();

            }

        }

    } catch (error) {

        console.error(

            "Layout Load Error:",

            error

        );

    }

}
/* =====================================
   Game List
===================================== */

const games = [

    {
        id: 1,
        name: "Reaction Time Test",
        icon: "⚡",
        description: "Test your reaction speed.",
        page: "reaction.html"
    },

    {
        id: 2,
        name: "Coin Toss",
        icon: "🪙",
        description: "Flip a virtual coin.",
        page: "coin.html"
    },

    {
        id: 3,
        name: "Dice Roller",
        icon: "🎲",
        description: "Roll a random dice.",
        page: "dice.html"
    },

    {
        id: 4,
        name: "Tic Tac Toe",
        icon: "❌",
        description: "Classic XO Game.",
        page: "tic.html"
    },

    {
        id: 5,
        name: "Spin The Wheel",
        icon: "🎡",
        description: "Spin and get a surprise.",
        page: "wheel.html"
    },

    {
        id: 6,
        name: "Truth Or Dare",
        icon: "🤔",
        description: "Play with friends.",
        page: "truth.html"
    },

    {
        id: 7,
        name: "Random Challenge",
        icon: "🎯",
        description: "Complete fun challenges.",
        page: "challenge.html"
    },

    {
        id: 8,
        name: "Aim Trainer",
        icon: "🎯",
        description: "Improve your aiming skill.",
        page: "aim.html"
    },

    {
        id: 9,
        name: "Jump Game",
        icon: "🦘",
        description: "Jump over obstacles.",
        page: "jump.html"
    },
{
    id: 10,
    name: "Memory Match",
    icon: "🧠",
    description: "Find matching emoji pairs and train your brain.",
    page: "memory.html"
},
   {
    id: 11,
    name: "Rock Paper Scissors",
    icon: "✊",
    description: "Play against the computer and test your luck.",
    page: "rps.html"
   },
   {
    id: 12,
    name: "Mind Reader",
    icon: "🔮",
    description: "Think of a number and let the magic read your mind.",
    page: "mindreader.html"
   },
   {
    id: 13,
    name: "3D Highway Runner",
    icon: "🏎️",
    description: "Drive a 3D car and avoid obstacles.",
    page: "car3d.html"
   },
   {
    id: 14,
    name: "Balloon Pop",
    icon: "🎈",
    description: "Pop balloons before the timer ends.",
    page: "balloon.html"
   },
   {
    id: 15,
    name: "Neon Catcher",
    icon: "🌌",
    description: "Catch glowing neon orbs in this cyberpunk arcade game.",
    page: "neon.html"
},
   {
    id: 16,
    name: "Rocket Dodge",
    icon: "🚀",
    description: "Dodge falling asteroids in this endless space runner.",
    page: "rocket.html"
   },
   {
    id: 17,
    name: "Thunder Tap",
    icon: "⚡",
    description: "Test your lightning-fast reaction speed.",
    page: "thunder.html"
   }

   
];


/* =====================================
   DOM
===================================== */

const gamesContainer =
document.getElementById("gamesContainer");

const searchInput =
document.getElementById("searchInput");


/* =====================================
   Start App
===================================== */
window.onload = () => {

    loadGames(games);

};


/* =====================================
   Load Game Cards
===================================== */

function loadGames(gameList) {

    // যদি Container না থাকে তাহলে বন্ধ
    if (!gamesContainer) return;

    // আগের Card মুছে ফেলো
    gamesContainer.innerHTML = "";

    // যদি কোন Game না থাকে
    if (gameList.length === 0) {

        gamesContainer.innerHTML = `

            <div class="no-game">

                <h2>No Game Found 😔</h2>

                <p>Please try another search.</p>

            </div>

        `;

        return;

    }

    // Loop করে সব Game Card তৈরি
    gameList.forEach(game => {

        const card = document.createElement("div");

        card.className = "game-card";

        card.innerHTML = `

            <div class="game-icon">

                ${game.icon}

            </div>

            <h2 class="game-title">

                ${game.name}

            </h2>

            <p class="game-description">

                ${game.description}

            </p>

            <button
                class="play-btn"
                data-page="${game.page}">

                ▶ Play Now

            </button>

        `;

        // Card Click করলে Game Page Open হবে
        card.addEventListener("click", () => {

            window.location.href = game.page;

        });

        gamesContainer.appendChild(card);

    });

}
/* =====================================
   Search Games
===================================== */

if (searchInput) {

    searchInput.addEventListener("input", function () {

        const keyword = this.value
            .trim()
            .toLowerCase();

        const filteredGames = games.filter(game => {

            return (
                game.name.toLowerCase().includes(keyword) ||
                game.description.toLowerCase().includes(keyword)
            );

        });

        loadGames(filteredGames);

    });

}


/* =====================================
   Open Game
===================================== */

document.addEventListener("click", function (event) {

    if (!event.target.classList.contains("play-btn")) {
        return;
    }

    event.stopPropagation();

    const page = event.target.dataset.page;

    if (page) {

        window.location.href = page;

    }

});


/* =====================================
   Future Ready
===================================== */

// এখানে ভবিষ্যতে যোগ করা হবে:
// - Category Filter
// - Favorite Games
// - Recently Played
// - Most Played
// - Game Rating
// - Game Search History
// - Firebase Sync
