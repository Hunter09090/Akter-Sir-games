
/* =====================================
   File : jump.js
   Game : Jump Game
   Version : 1.0.0
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
const jumpBtn = $("#jumpBtn");
const restartBtn = $("#restartBtn");


/* =====================================
   Storage
===================================== */

const STORAGE_KEY = "jump_game_high_score";


/* =====================================
   Canvas Size
===================================== */

const WIDTH = canvas.width;
const HEIGHT = canvas.height;
const GROUND_Y = HEIGHT - 40;
/* =====================================
   Background Engine
===================================== */

const clouds = [

    {
        x: 120,
        y: 40,
        width: 70,
        height: 25,
        speed: 0.5
    },

    {
        x: 420,
        y: 70,
        width: 90,
        height: 30,
        speed: 0.8
    },

    {
        x: 720,
        y: 50,
        width: 80,
        height: 28,
        speed: 0.6
    }

];

const trees = [

    {
        x: 250,
        width: 22,
        height: 65,
        speed: 2
    },

    {
        x: 620,
        width: 22,
        height: 80,
        speed: 2
    }

];

/* =====================================
   Player
===================================== */

const player = {

    x: 80,

    y: GROUND_Y - 50,

    width: 40,

    height: 50,

    velocityY: 0,

    gravity: 0.8,

    jumpPower: -15,

    onGround: true

};


/* =====================================
   Obstacle
===================================== */

const obstacle = {

    x: WIDTH,

    y: GROUND_Y - 45,

    width: 30,

    height: 45,

    speed: 6

};


/* =====================================
   Game State
===================================== */

let score = 0;

let highScore = loadData(
    STORAGE_KEY,
    0
);

let gameStarted = false;

let gameOver = false;

let animationId = null;


/* =====================================
   Initialize
===================================== */

init();

function init() {

    highScoreBox.textContent = highScore;

    speedBox.textContent = "1x";

    bindEvents();

    drawStartScreen();

}


/* =====================================
   Events
===================================== */

function bindEvents() {

    on(startBtn, "click", startGame);

    on(restartBtn, "click", restartGame);

    on(jumpBtn, "click", jump);

}
/* =====================================
   Clear Canvas
===================================== */

function clearCanvas() {

    ctx.clearRect(0, 0, WIDTH, HEIGHT);

}

/* =====================================
   Draw Sky
===================================== */

function drawSky() {

    ctx.fillStyle = "#dbeafe";

    ctx.fillRect(

        0,

        0,

        WIDTH,

        GROUND_Y

    );

}


/* =====================================
   Draw Clouds
===================================== */

function drawClouds() {

    ctx.fillStyle = "#ffffff";

    clouds.forEach((cloud) => {

        ctx.beginPath();

        ctx.arc(

            cloud.x,

            cloud.y,

            cloud.height / 2,

            0,

            Math.PI * 2

        );

        ctx.arc(

            cloud.x + 25,

            cloud.y - 8,

            cloud.height / 2,

            0,

            Math.PI * 2

        );

        ctx.arc(

            cloud.x + 50,

            cloud.y,

            cloud.height / 2,

            0,

            Math.PI * 2

        );

        ctx.fill();

    });

}


/* =====================================
   Draw Trees
===================================== */

function drawTrees() {

    trees.forEach((tree) => {

        // Trunk

        ctx.fillStyle = "#8b5a2b";

        ctx.fillRect(

            tree.x,

            GROUND_Y - tree.height,

            tree.width,

            tree.height

        );

        // Leaves

        ctx.fillStyle = "#16a34a";

        ctx.beginPath();

        ctx.arc(

            tree.x + 11,

            GROUND_Y - tree.height,

            22,

            0,

            Math.PI * 2

        );

        ctx.fill();

    });

}
/* =====================================
   Draw Ground
===================================== */

function drawGround() {

    ctx.fillStyle = "#16a34a";

    ctx.fillRect(

        0,

        GROUND_Y,

        WIDTH,

        HEIGHT - GROUND_Y

    );

}


/* =====================================
   Draw Player
===================================== */

function drawPlayer() {

    ctx.fillStyle = "#2563eb";

    ctx.fillRect(

        player.x,

        player.y,

        player.width,

        player.height

    );

}


/* =====================================
   Draw Obstacle
===================================== */

function drawObstacle() {

    ctx.fillStyle = "#ef4444";

    ctx.fillRect(

        obstacle.x,

        obstacle.y,

        obstacle.width,

        obstacle.height

    );

}


/* =====================================
   Jump
===================================== */

function jump() {

    if (

        !gameStarted ||

        gameOver ||

        !player.onGround

    ) {

        return;

    }

    player.velocityY =

        player.jumpPower;

    player.onGround = false;

}


/* =====================================
   Apply Gravity
===================================== */

function applyGravity() {

    player.velocityY +=

        player.gravity;

    player.y +=

        player.velocityY;

    if (

        player.y >=

        GROUND_Y - player.height

    ) {

        player.y =

            GROUND_Y -

            player.height;

        player.velocityY = 0;

        player.onGround = true;

    }

}
/* =====================================
   Move Obstacle
===================================== */

function moveObstacle() {

    obstacle.x -= obstacle.speed;

    // Obstacle পার হয়ে গেলে
    if (obstacle.x + obstacle.width < 0) {

        obstacle.x = WIDTH + random(80, 220);

        score++;

        scoreBox.textContent =
            `Score : ${score}`;

        // Speed Increase
        obstacle.speed = Math.min(
            obstacle.speed + 0.2,
            15
        );

        speedBox.textContent =
            `${(obstacle.speed / 6).toFixed(1)}x`;

    }

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

    gameOver = true;

    cancelAnimationFrame(animationId);

    result.textContent =
        "💥 Game Over!";

    if (score > highScore) {

        highScore = score;

        saveData(
            STORAGE_KEY,
            highScore
        );

        highScoreBox.textContent =
            highScore;

        toast(
            "🎉 New High Score!",
            "success"
        );

    }

}


/* =====================================
   Draw Frame
===================================== */

function render() {

    clearCanvas();

    drawGround();

    drawPlayer();

    drawObstacle();

}
/* =====================================
   Start Game
===================================== */

function startGame() {

    if (gameStarted && !gameOver) {

        return;

    }

    gameStarted = true;

    gameOver = false;

    score = 0;

    scoreBox.textContent = "Score : 0";

    speedBox.textContent = "1.0x";

    result.textContent = "Playing...";

    player.y = GROUND_Y - player.height;

    player.velocityY = 0;

    player.onGround = true;

    obstacle.x = WIDTH;

    obstacle.speed = 6;

    gameLoop();

}


/* =====================================
   Restart Game
===================================== */

function restartGame() {

    cancelAnimationFrame(animationId);

    gameStarted = false;

    gameOver = false;

    startGame();

}


/* =====================================
   Game Loop
===================================== */

function gameLoop() {

    applyGravity();

    moveObstacle();

    if (checkCollision()) {

        endGame();

        return;

    }

    render();

    animationId = requestAnimationFrame(

        gameLoop

    );

}


/* =====================================
   Start Screen
===================================== */

function drawStartScreen() {

    clearCanvas();

    drawGround();

    drawPlayer();

    drawObstacle();

}


/* =====================================
   Keyboard Controls
===================================== */

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


/* =====================================
   Mobile Touch
===================================== */

canvas.addEventListener(

    "touchstart",

    () => {

        jump();

    },

    {

        passive: true

    }

);


/* =====================================
   Ready
===================================== */

console.log(

    "Jump Game Loaded Successfully"

);
