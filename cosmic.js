/* =====================================
   COSMIC ODYSSEY - REALISTIC VERSION
===================================== */

"use strict";

/* =====================================
   CANVAS
===================================== */

const canvas =
document.getElementById("spaceCanvas");

const ctx =
canvas.getContext("2d");

function resizeCanvas() {

    canvas.width = window.innerWidth;

    canvas.height = window.innerHeight;

}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);

/* =====================================
   HUD
===================================== */

const distanceEl =
document.getElementById("distance");

const energyEl =
document.getElementById("energy");

const startOverlay =
document.getElementById("startOverlay");

const startBtn =
document.getElementById("startBtn");

/* =====================================
   GAME STATE
===================================== */

let gameStarted = false;

let distance = 0;

let energy = 100;

/* =====================================
   ROCKET
===================================== */

const rocket = {

    x: window.innerWidth / 2,

    y: window.innerHeight * 0.72,

    width: 34,

    height: 80,

    speed: 7

};

/* =====================================
   STARS
===================================== */

const stars = [];

for (let i = 0; i < 350; i++) {

    stars.push({

        x: Math.random() * window.innerWidth,

        y: Math.random() * window.innerHeight,

        size: Math.random() * 2.5,

        speed: 0.5 + Math.random() * 3

    });

}

/* =====================================
   METEORS
===================================== */

const meteors = [];

function spawnMeteor() {

    meteors.push({

        x: Math.random() * window.innerWidth,

        y: -50,

        size: 15 + Math.random() * 35,

        speed: 3 + Math.random() * 5

    });

}

setInterval(() => {

    if (gameStarted) {

        spawnMeteor();

    }

}, 1400);

/* =====================================
   BLACK HOLE
===================================== */

let blackHolePhase = false;

let vortexAngle = 0;

/* =====================================
   CONTROLS
===================================== */

const keys = {};

window.addEventListener("keydown", (e) => {

    keys[e.key.toLowerCase()] = true;

});

window.addEventListener("keyup", (e) => {

    keys[e.key.toLowerCase()] = false;

});

/* Mobile */

document
.getElementById("leftBtn")
.addEventListener("click", () => {

    rocket.x -= 35;

});

document
.getElementById("rightBtn")
.addEventListener("click", () => {

    rocket.x += 35;

});

/* =====================================
   DRAW EARTH
===================================== */

function drawEarth() {

    const radius =
    canvas.height * 0.45;

    const cx =
    canvas.width / 2;

    const cy =
    canvas.height + radius * 0.35;

    /* Planet */

    const earthGrad =
    ctx.createRadialGradient(

        cx - 120,
        cy - 120,
        40,

        cx,
        cy,
        radius

    );

    earthGrad.addColorStop(0, "#4ade80");

    earthGrad.addColorStop(0.35, "#2563eb");

    earthGrad.addColorStop(0.8, "#1d4ed8");

    earthGrad.addColorStop(1, "#0f172a");

    ctx.fillStyle = earthGrad;

    ctx.beginPath();

    ctx.arc(cx, cy, radius, 0, Math.PI * 2);

    ctx.fill();

    /* Atmosphere Glow */

    ctx.strokeStyle = "rgba(125,211,252,.35)";

    ctx.lineWidth = 24;

    ctx.beginPath();

    ctx.arc(cx, cy, radius + 8, 0, Math.PI * 2);

    ctx.stroke();

}

/* =====================================
   DRAW STARS
===================================== */

function drawStars() {

    ctx.fillStyle = "white";

    stars.forEach(star => {

        ctx.globalAlpha = 0.6 + Math.random() * 0.4;

        ctx.beginPath();

        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);

        ctx.fill();

    });

    ctx.globalAlpha = 1;

}

/* =====================================
   UPDATE STARS
===================================== */

function updateStars() {

    stars.forEach(star => {

        star.y += star.speed;

        if (star.y > canvas.height) {

            star.y = 0;

            star.x = Math.random() * canvas.width;

        }

    });

}

/* =====================================
   DRAW ROCKET
===================================== */

function drawRocket() {

    ctx.save();

    ctx.translate(rocket.x, rocket.y);

    /* Flame */

    const flameGrad =
    ctx.createLinearGradient(0, 10, 0, 60);

    flameGrad.addColorStop(0, "#fef08a");

    flameGrad.addColorStop(0.4, "#f97316");

    flameGrad.addColorStop(1, "rgba(239,68,68,0)");

    ctx.fillStyle = flameGrad;

    ctx.beginPath();

    ctx.moveTo(-10, 26);

    ctx.lineTo(0, 60 + Math.random() * 8);

    ctx.lineTo(10, 26);

    ctx.closePath();

    ctx.fill();

    /* Body */

    ctx.fillStyle = "#e5e7eb";

    ctx.beginPath();

    ctx.moveTo(0, -38);

    ctx.lineTo(16, 10);

    ctx.lineTo(10, 34);

    ctx.lineTo(-10, 34);

    ctx.lineTo(-16, 10);

    ctx.closePath();

    ctx.fill();

    /* Nose */

    ctx.fillStyle = "#ef4444";

    ctx.beginPath();

    ctx.moveTo(0, -46);

    ctx.lineTo(10, -20);

    ctx.lineTo(-10, -20);

    ctx.closePath();

    ctx.fill();

    /* Window */

    ctx.fillStyle = "#60a5fa";

    ctx.beginPath();

    ctx.arc(0, -2, 7, 0, Math.PI * 2);

    ctx.fill();

    ctx.restore();

}

/* =====================================
   DRAW METEORS
===================================== */

function drawMeteors() {

    meteors.forEach(m => {

        const grad =
        ctx.createRadialGradient(

            m.x,
            m.y,
            2,

            m.x,
            m.y,
            m.size

        );

        grad.addColorStop(0, "#fde68a");

        grad.addColorStop(0.4, "#fb923c");

        grad.addColorStop(1, "rgba(239,68,68,0)");

        ctx.fillStyle = grad;

        ctx.beginPath();

        ctx.arc(m.x, m.y, m.size, 0, Math.PI * 2);

        ctx.fill();

    });

}

/* =====================================
   UPDATE METEORS
===================================== */

function updateMeteors() {

    for (let i = meteors.length - 1; i >= 0; i--) {

        const m = meteors[i];

        m.y += m.speed;

        /* Collision */

        if (

            Math.abs(m.x - rocket.x) < m.size &&
            Math.abs(m.y - rocket.y) < m.size

        ) {

            energy -= 12;

            energy = Math.max(0, energy);

            energyEl.textContent = energy + "%";

            meteors.splice(i, 1);

            if (energy <= 0) {

                gameOver();

            }

            continue;

        }

        if (m.y > canvas.height + 80) {

            meteors.splice(i, 1);

        }

    }

}

/* =====================================
   DRAW BLACK HOLE
===================================== */

function drawBlackHole() {

    const cx = canvas.width / 2;

    const cy = canvas.height * 0.28;

    vortexAngle += 0.05;

    for (let i = 0; i < 22; i++) {

        ctx.strokeStyle =
        `rgba(168,85,247,${0.05 + i * 0.02})`;

        ctx.lineWidth = 2;

        ctx.beginPath();

        ctx.arc(

            cx,
            cy,

            50 + i * 5,

            vortexAngle + i * 0.25,
            vortexAngle + Math.PI + i * 0.25

        );

        ctx.stroke();

    }

    /* Center */

    ctx.fillStyle = "black";

    ctx.beginPath();

    ctx.arc(cx, cy, 42, 0, Math.PI * 2);

    ctx.fill();

}

/* =====================================
   GAME OVER
===================================== */

function gameOver() {

    alert(
        `☠️ MISSION FAILED!\\n\\nDistance: ${Math.floor(distance)} km`
    );

    location.reload();

}

/* =====================================
   START GAME
===================================== */

startBtn.addEventListener("click", () => {

    startOverlay.style.display = "none";

    gameStarted = true;

});

/* =====================================
   UPDATE
===================================== */

function update() {

    if (!gameStarted) return;

    /* Keyboard */

    if (keys["arrowleft"] || keys["a"]) {

        rocket.x -= rocket.speed;

    }

    if (keys["arrowright"] || keys["d"]) {

        rocket.x += rocket.speed;

    }

    /* Bounds */

    rocket.x = Math.max(
        30,
        Math.min(canvas.width - 30, rocket.x)
    );

    updateStars();

    updateMeteors();

    distance += 2.4;

    distanceEl.textContent =
        Math.floor(distance) + " km";

    /* Black Hole After Long Distance */

    if (distance > 5000) {

        blackHolePhase = true;

    }

}

/* =====================================
   DRAW
===================================== */

function draw() {

    /* Deep Space */

    const bg =
    ctx.createLinearGradient(0, 0, 0, canvas.height);

    bg.addColorStop(0, "#020617");

    bg.addColorStop(0.4, "#0f172a");

    bg.addColorStop(1, "#000000");

    ctx.fillStyle = bg;

    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawStars();

    /* Earth Only At Beginning */

    if (distance < 1200) {

        drawEarth();

    }

    if (blackHolePhase) {

        drawBlackHole();

    }

    drawMeteors();

    drawRocket();

}

/* =====================================
   LOOP
===================================== */

function loop() {

    requestAnimationFrame(loop);

    update();

    draw();

}

loop();
