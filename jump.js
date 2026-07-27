/* =====================================
   File : jump.js
   Game : Jump Game V2
   Version : 2.0.0
===================================== */

"use strict";

/* =====================================
   DOM Elements
===================================== */

const canvas = $("#gameCanvas");
const ctx = canvas.getContext("2d");

const scoreBox = $("#scoreBox");
const highScoreBox = $("#highScore");
const speedBox = $("#speedBox");
const result = $("#result");

const startBtn = $("#startBtn");
const restartBtn = $("#restartBtn");
const jumpBtn = $("#jumpBtn");


/* =====================================
   Canvas
===================================== */

const GAME = {

    width: canvas.width,

    height: canvas.height,

    ground: canvas.height - 40,

    fps: 60

};


/* =====================================
   Storage
===================================== */

const STORAGE = {

    HIGH_SCORE: "jump_high_score"

};


/* =====================================
   Game State
===================================== */

const state = {

    running: false,

    gameOver: false,

    score: 0,

    highScore: loadData(
        STORAGE.HIGH_SCORE,
        0
    ),

    speed: 6,

    animationId: null

};


/* =====================================
   Initialize
===================================== */

init();

function init() {

    highScoreBox.textContent =
        state.highScore;

    scoreBox.textContent =
        "Score : 0";

    speedBox.textContent =
        "1.0x";

    bindEvents();

}
/* =====================================
   Background Engine
===================================== */

const background = {

    sky: {

        color: "#dbeafe"

    },

    clouds: [

        {
            x: 120,
            y: 45,
            width: 80,
            height: 28,
            speed: 0.5
        },

        {
            x: 420,
            y: 75,
            width: 95,
            height: 32,
            speed: 0.7
        },

        {
            x: 720,
            y: 55,
            width: 85,
            height: 30,
            speed: 0.6
        }

    ],

    trees: [

        {
            x: 220,
            width: 24,
            height: 70,
            speed: 2
        },

        {
            x: 520,
            width: 24,
            height: 90,
            speed: 2
        },

        {
            x: 820,
            width: 24,
            height: 75,
            speed: 2
        }

    ]

};


/* =====================================
   Draw Sky
===================================== */

function drawSky() {

    ctx.fillStyle = background.sky.color;

    ctx.fillRect(
        0,
        0,
        GAME.width,
        GAME.ground
    );

}


/* =====================================
   Draw Clouds
===================================== */

function drawClouds() {

    ctx.fillStyle = "#ffffff";

    background.clouds.forEach((cloud) => {

        ctx.beginPath();

        ctx.arc(cloud.x, cloud.y, 15, 0, Math.PI * 2);

        ctx.arc(cloud.x + 22, cloud.y - 8, 18, 0, Math.PI * 2);

        ctx.arc(cloud.x + 45, cloud.y, 15, 0, Math.PI * 2);

        ctx.fill();

    });

}


/* =====================================
   Draw Trees
===================================== */

function drawTrees() {

    background.trees.forEach((tree) => {

        // Tree Trunk

        ctx.fillStyle = "#8b5a2b";

        ctx.fillRect(

            tree.x,

            GAME.ground - tree.height,

            tree.width,

            tree.height

        );

        // Leaves

        ctx.beginPath();

        ctx.fillStyle = "#16a34a";

        ctx.arc(

            tree.x + tree.width / 2,

            GAME.ground - tree.height,

            24,

            0,

            Math.PI * 2

        );

        ctx.fill();

    });

}
/* =====================================
   Update Background
===================================== */

function updateBackground() {

    /* ---------- Clouds ---------- */

    background.clouds.forEach((cloud) => {

        cloud.x -= cloud.speed;

        if (cloud.x + cloud.width < 0) {

            cloud.x = GAME.width + random(50, 200);

            cloud.y = random(30, 90);

        }

    });


    /* ---------- Trees ---------- */

    background.trees.forEach((tree) => {

        tree.x -= tree.speed;

        if (tree.x + tree.width < 0) {

            tree.x = GAME.width + random(150, 350);

            tree.height = random(60, 95);

        }

    });

}


/* =====================================
   Draw Ground
===================================== */

function drawGround() {

    // Grass

    ctx.fillStyle = "#22c55e";

    ctx.fillRect(

        0,

        GAME.ground,

        GAME.width,

        GAME.height - GAME.ground

    );

    // Ground Line

    ctx.fillStyle = "#15803d";

    ctx.fillRect(

        0,

        GAME.ground,

        GAME.width,

        4

    );

}
/* =====================================
   Render Frame
===================================== */

function render() {

    ctx.clearRect(

        0,

        0,

        GAME.width,

        GAME.height

    );

    drawSky();

    drawClouds();

    drawTrees();

    drawGround();

    // পরের Part-এ আসবে
    drawPlayer();

    drawObstacle();

}
/* =====================================
   Player Engine
===================================== */

const player = {

    x: 80,

    y: GAME.ground - 55,

    width: 40,

    height: 55,

    velocityY: 0,

    gravity: 0.8,

    jumpPower: -15,

    onGround: true,

    frame: 0,

    legOffset: 0

};


/* =====================================
   Update Player
===================================== */

function updatePlayer() {

    // Gravity

    player.velocityY += player.gravity;

    player.y += player.velocityY;

    // Ground

    if (player.y >= GAME.ground - player.height) {

        player.y = GAME.ground - player.height;

        player.velocityY = 0;

        player.onGround = true;

    } else {

        player.onGround = false;

    }

    // Run Animation

    if (player.onGround) {

        player.frame += 0.25;

        player.legOffset =

            Math.sin(player.frame) * 5;

    }

}


/* =====================================
   Jump
===================================== */

function jump() {

    if (!state.running) return;

    if (!player.onGround) return;

    player.velocityY =

        player.jumpPower;

}


/* =====================================
   Draw Cartoon Human
===================================== */

function drawPlayer() {

    const x = player.x;
    const y = player.y;

    /* Head */

    ctx.fillStyle = "#f4c28b";

    ctx.beginPath();

    ctx.arc(
        x + 20,
        y + 10,
        10,
        0,
        Math.PI * 2
    );

    ctx.fill();

    /* Hair */

    ctx.fillStyle = "#2d2d2d";

    ctx.beginPath();

    ctx.arc(
        x + 20,
        y + 7,
        10,
        Math.PI,
        0
    );

    ctx.fill();

    /* Eyes */

    ctx.fillStyle = "#000";

    ctx.beginPath();

    ctx.arc(x + 16, y + 10, 1.5, 0, Math.PI * 2);
    ctx.arc(x + 24, y + 10, 1.5, 0, Math.PI * 2);

    ctx.fill();

    /* Body */

    ctx.fillStyle = "#2563eb";

    ctx.fillRect(
        x + 12,
        y + 20,
        16,
        22
    );

    /* Arms */

    ctx.strokeStyle = "#f4c28b";

    ctx.lineWidth = 3;

    ctx.beginPath();

    ctx.moveTo(x + 12, y + 24);
    ctx.lineTo(x + 5, y + 32);

    ctx.moveTo(x + 28, y + 24);
    ctx.lineTo(x + 35, y + 32);

    ctx.stroke();

    /* Legs Animation */

    ctx.strokeStyle = "#1f2937";

    ctx.lineWidth = 4;

    ctx.beginPath();

    ctx.moveTo(x + 16, y + 42);

    ctx.lineTo(
        x + 16,
        y + 55 + player.legOffset
    );

    ctx.moveTo(x + 24, y + 42);

    ctx.lineTo(
        x + 24,
        y + 55 - player.legOffset
    );

    ctx.stroke();

}
/* =====================================
   Obstacle Engine
===================================== */

const obstacle = {

    x: GAME.width + 100,

    y: GAME.ground - 50,

    width: 35,

    height: 50

};


/* =====================================
   Update Obstacle
===================================== */

function updateObstacle() {

    obstacle.x -= state.speed;

    // Screen-এর বাইরে গেলে
    if (obstacle.x + obstacle.width < 0) {

        obstacle.x = GAME.width + random(150, 300);

        obstacle.height = random(40, 70);

        obstacle.y =

            GAME.ground - obstacle.height;

        state.score++;

        scoreBox.textContent =

            `Score : ${state.score}`;

        // প্রতি ৫ স্কোরে Speed বাড়বে
        if (state.score % 5 === 0) {

            state.speed += 0.5;

            speedBox.textContent =

                `${(state.speed / 6).toFixed(1)}x`;

        }

    }

}


/* =====================================
   Draw Obstacle
===================================== */

function drawObstacle() {

    ctx.fillStyle = "#dc2626";

    ctx.fillRect(

        obstacle.x,

        obstacle.y,

        obstacle.width,

        obstacle.height

    );

}


/* =====================================
   Collision Detection
===================================== */

function checkCollision() {

    return (

        player.x <
            obstacle.x + obstacle.width &&

        player.x + player.width >
            obstacle.x &&

        player.y <
            obstacle.y + obstacle.height &&

        player.y + player.height >
            obstacle.y

    );

}


/* =====================================
   Game Over
===================================== */

function endGame() {

    state.running = false;

    state.gameOver = true;

    cancelAnimationFrame(

        state.animationId

    );

    result.textContent =

        "💥 Game Over!";

    if (

        state.score >

        state.highScore

    ) {

        state.highScore =

            state.score;

        saveData(

            STORAGE.HIGH_SCORE,

            state.highScore

        );

        highScoreBox.textContent =

            state.highScore;

        toast(

            "🎉 New High Score!",

            "success"

        );

    }

   }
/* =====================================
   Start Game
===================================== */

function startGame() {

    if (state.running) {

        return;

    }

    state.running = true;

    state.gameOver = false;

    state.score = 0;

    state.speed = 6;

    scoreBox.textContent = "Score : 0";

    speedBox.textContent = "1.0x";

    result.textContent = "Playing...";

    player.y = GAME.ground - player.height;

    player.velocityY = 0;

    player.onGround = true;

    obstacle.x = GAME.width + 150;

    obstacle.height = 50;

    obstacle.y = GAME.ground - obstacle.height;

    gameLoop();

}


/* =====================================
   Restart Game
===================================== */

function restartGame() {

    cancelAnimationFrame(state.animationId);

    state.running = false;

    state.gameOver = false;

    startGame();

}


/* =====================================
   Game Loop
===================================== */

function gameLoop() {

    if (!state.running) {

        return;

    }

    updateBackground();

    updatePlayer();

    updateObstacle();

    if (checkCollision()) {

        endGame();

        return;

    }

    render();

    state.animationId = requestAnimationFrame(

        gameLoop

    );

}


/* =====================================
   Event Binding
===================================== */

function bindEvents() {

    on(startBtn, "click", startGame);

    on(restartBtn, "click", restartGame);

    on(jumpBtn, "click", jump);

    document.addEventListener(

        "keydown",

        (event) => {

            if (

                event.code === "Space" ||

                event.code === "ArrowUp"

            ) {

                event.preventDefault();

                jump();

            }

        }

    );

    canvas.addEventListener(

        "touchstart",

        () => {

            jump();

        },

        {

            passive: true

        }

    );

}


/* =====================================
   Draw Start Screen
===================================== */

function drawStartScreen() {

    render();

}


/* =====================================
   Ready
===================================== */

drawStartScreen();

console.log(

    "Jump Game V2 Loaded Successfully"

);
