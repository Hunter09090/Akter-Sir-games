/* =====================================
   3D HIGHWAY RUNNER
===================================== */

"use strict";

/* =====================================
   DOM
===================================== */

const gameContainer = document.getElementById("gameContainer");
const scoreEl = document.getElementById("score");
const bestScoreEl = document.getElementById("bestScore");
const speedValueEl =
    document.getElementById("speedValue");
/* =====================================
   BEST SCORE
===================================== */

let bestScore =
    Number(localStorage.getItem("car3d-best")) || 0;

bestScoreEl.textContent = bestScore;

/* =====================================
   THREE.JS SETUP
===================================== */

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb);

const camera = new THREE.PerspectiveCamera(
    75,
    gameContainer.clientWidth / gameContainer.clientHeight,
    0.1,
    1000
);

const renderer = new THREE.WebGLRenderer({
    antialias: true
});

renderer.setSize(
    gameContainer.clientWidth,
    gameContainer.clientHeight
);

renderer.shadowMap.enabled = true;

gameContainer.appendChild(renderer.domElement);

/* =====================================
   LIGHTS
===================================== */

const ambientLight =
    new THREE.AmbientLight(0xffffff, 0.7);

scene.add(ambientLight);

const directionalLight =
    new THREE.DirectionalLight(0xffffff, 1);

directionalLight.position.set(5, 10, 7);
directionalLight.castShadow = true;

scene.add(directionalLight);

/* =====================================
   ROAD
===================================== */

const roadGeo =
    new THREE.PlaneGeometry(6, 50);

const roadMat =
    new THREE.MeshStandardMaterial({
        color: 0x2d2d2d
    });

const road =
    new THREE.Mesh(roadGeo, roadMat);

road.rotation.x = -Math.PI / 2;
road.receiveShadow = true;

scene.add(road);

/* Road Borders */

const borderGeo =
    new THREE.BoxGeometry(0.2, 0.2, 50);

const borderMat =
    new THREE.MeshStandardMaterial({
        color: 0xffffff
    });

const leftBorder =
    new THREE.Mesh(borderGeo, borderMat);

leftBorder.position.set(-3.1, 0.1, 0);

const rightBorder =
    new THREE.Mesh(borderGeo, borderMat);

rightBorder.position.set(3.1, 0.1, 0);

scene.add(leftBorder);
scene.add(rightBorder);

/* =====================================
   PLAYER CAR
===================================== */

const car = new THREE.Group();

/* Body */

const bodyGeo =
    new THREE.BoxGeometry(1.2, 0.5, 2);

const bodyMat =
    new THREE.MeshStandardMaterial({
        color: 0xff3333
    });

const body =
    new THREE.Mesh(bodyGeo, bodyMat);

body.castShadow = true;

car.add(body);

/* Roof */

const roofGeo =
    new THREE.BoxGeometry(0.8, 0.35, 1);

const roofMat =
    new THREE.MeshStandardMaterial({
        color: 0x111111
    });

const roof =
    new THREE.Mesh(roofGeo, roofMat);

roof.position.y = 0.42;
roof.castShadow = true;

car.add(roof);

car.position.set(0, 0.35, 8);

scene.add(car);

/* =====================================
   CAMERA
===================================== */

camera.position.set(0, 6, 12);
camera.lookAt(0, 0, 0);

/* =====================================
   GAME STATE
===================================== */

let score = 0;
let speed = 0.35;
let gameOver = false;

/* =====================================
   KEYBOARD CONTROL
===================================== */

window.addEventListener("keydown", (e) => {

    if (gameOver) return;

    if (e.key === "ArrowLeft") {

        car.position.x -= 2;

    }

    if (e.key === "ArrowRight") {

        car.position.x += 2;

    }

    car.position.x =
        Math.max(-2, Math.min(2, car.position.x));

});

/* =====================================
   MOBILE CONTROL
===================================== */

const leftBtn = document.getElementById("leftBtn");
const rightBtn = document.getElementById("rightBtn");

if (leftBtn) {

    leftBtn.addEventListener("click", () => {

        if (gameOver) return;

        car.position.x -= 2;

        car.position.x =
            Math.max(-2, Math.min(2, car.position.x));

    });

}

if (rightBtn) {

    rightBtn.addEventListener("click", () => {

        if (gameOver) return;

        car.position.x += 2;

        car.position.x =
            Math.max(-2, Math.min(2, car.position.x));

    });

}

/* =====================================
   SIDE TREES
===================================== */

function createTree(x, z) {

    const tree = new THREE.Group();

    const trunkGeo =
        new THREE.CylinderGeometry(0.1, 0.1, 0.8);

    const trunkMat =
        new THREE.MeshStandardMaterial({
            color: 0x8b5a2b
        });

    const trunk =
        new THREE.Mesh(trunkGeo, trunkMat);

    trunk.position.y = 0.4;

    tree.add(trunk);

    const leavesGeo =
        new THREE.SphereGeometry(0.45, 8, 8);

    const leavesMat =
        new THREE.MeshStandardMaterial({
            color: 0x22c55e
        });

    const leaves =
        new THREE.Mesh(leavesGeo, leavesMat);

    leaves.position.y = 1;

    tree.add(leaves);

    tree.position.set(x, 0, z);

    scene.add(tree);

}

for (let i = -25; i < 25; i += 4) {

    createTree(-5, i);
    createTree(5, i);

}

/* =====================================
   ENEMY CARS
===================================== */

const enemies = [];

function createEnemy() {

    if (gameOver) return;

    const enemy = new THREE.Group();

    const bodyGeo =
        new THREE.BoxGeometry(1.2, 0.5, 2);

    const bodyMat =
        new THREE.MeshStandardMaterial({
            color: Math.random() * 0xffffff
        });

    const body =
        new THREE.Mesh(bodyGeo, bodyMat);

    enemy.add(body);

    const roofGeo =
        new THREE.BoxGeometry(0.8, 0.35, 1);

    const roofMat =
        new THREE.MeshStandardMaterial({
            color: 0x222222
        });

    const roof =
        new THREE.Mesh(roofGeo, roofMat);

    roof.position.y = 0.42;

    enemy.add(roof);

    const lanes = [-2, 0, 2];

    enemy.position.set(
        lanes[Math.floor(Math.random() * lanes.length)],
        0.35,
        -30
    );

    scene.add(enemy);

    enemies.push(enemy);

}

setInterval(createEnemy, 1500);

/* =====================================
   COLLISION
===================================== */

function checkCollision(enemy) {

    const dx =
        Math.abs(car.position.x - enemy.position.x);

    const dz =
        Math.abs(car.position.z - enemy.position.z);

    return dx < 1 && dz < 1.5;

}

function updateEnemies() {

    enemies.forEach((enemy, index) => {

        enemy.position.z += speed;

        if (checkCollision(enemy)) {

            showGameOver();

        }

        if (enemy.position.z > 20) {

            scene.remove(enemy);

            enemies.splice(index, 1);

        }

    });

}

/* =====================================
   SPEED SYSTEM
===================================== */

function increaseSpeed() {

    speed += 0.005;

    speed = Math.min(speed, 0.9);

}

setInterval(() => {

    if (!gameOver) {

        increaseSpeed();

    }

}, 5000);

/* =====================================
   GAME OVER
===================================== */

function showGameOver() {

    if (gameOver) return;

    gameOver = true;

    const finalScore = Math.floor(score);

    if (finalScore > bestScore) {

        bestScore = finalScore;

        localStorage.setItem(
            "car3d-best",
            bestScore
        );

    }

    setTimeout(() => {

        const again = confirm(
            `💥 GAME OVER!\n\n` +
            `Your Score: ${finalScore}\n` +
            `Best Score: ${bestScore}\n\n` +
            `Play Again?`
        );

        if (again) {

            location.reload();

        }

    }, 100);

}

/* =====================================
   RESIZE
===================================== */

window.addEventListener("resize", () => {

    camera.aspect =
        gameContainer.clientWidth /
        gameContainer.clientHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
        gameContainer.clientWidth,
        gameContainer.clientHeight
    );

});

/* =====================================
   ANIMATION LOOP
===================================== */

function animate() {

    requestAnimationFrame(animate);

    /* Move Road */

    road.position.z += 0.2;

    if (road.position.z > 2) {

        road.position.z = 0;

    }

    /* Update Game */

    if (!gameOver) {

        score += 0.05;

        scoreEl.textContent =
            Math.floor(score);

        updateEnemies();

    }

    renderer.render(scene, camera);

}

animate();
