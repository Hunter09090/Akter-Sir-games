/* =====================================
   3D HIGHWAY RUNNER - PART 2
===================================== */

"use strict";

/* =====================================
   DOM
===================================== */

const container =
document.getElementById("gameContainer");

const scoreEl =
document.getElementById("score");

/* =====================================
   Scene
===================================== */

const scene = new THREE.Scene();

scene.background =
new THREE.Color(0x87ceeb); // Sky Blue

/* =====================================
   Camera
===================================== */

const camera = new THREE.PerspectiveCamera(
    75,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
);

camera.position.set(0, 5, 10);

/* =====================================
   Renderer
===================================== */

const renderer = new THREE.WebGLRenderer({
    antialias: true
});

renderer.setSize(
    container.clientWidth,
    container.clientHeight
);

renderer.shadowMap.enabled = true;

container.appendChild(renderer.domElement);

/* =====================================
   Lights
===================================== */

// Sun Light

const light =
new THREE.DirectionalLight(0xffffff, 1);

light.position.set(5, 10, 7);

light.castShadow = true;

scene.add(light);

// Soft Ambient Light

const ambient =
new THREE.AmbientLight(0xffffff, 0.4);

scene.add(ambient);

/* =====================================
   Road
===================================== */

const roadGeometry =
new THREE.PlaneGeometry(6, 60);

const roadMaterial =
new THREE.MeshStandardMaterial({
    color: 0x333333
});

const road =
new THREE.Mesh(
    roadGeometry,
    roadMaterial
);

road.rotation.x = -Math.PI / 2;

road.receiveShadow = true;

scene.add(road);

/* =====================================
   Road Side Borders
===================================== */

function createBorder(x) {

    const geo =
    new THREE.BoxGeometry(0.3, 0.3, 60);

    const mat =
    new THREE.MeshStandardMaterial({
        color: 0xffffff
    });

    const border =
    new THREE.Mesh(geo, mat);

    border.position.set(x, 0.15, 0);

    scene.add(border);

}

createBorder(-3);
createBorder(3);

/* =====================================
   Player Car
===================================== */

const car =
new THREE.Group();

// Car Body

const bodyGeo =
new THREE.BoxGeometry(1.2, 0.5, 2);

const bodyMat =
new THREE.MeshStandardMaterial({
    color: 0xff0000
});

const body =
new THREE.Mesh(bodyGeo, bodyMat);

body.castShadow = true;

car.add(body);

// Car Roof

const roofGeo =
new THREE.BoxGeometry(0.8, 0.35, 1);

const roofMat =
new THREE.MeshStandardMaterial({
    color: 0xaa0000
});

const roof =
new THREE.Mesh(roofGeo, roofMat);

roof.position.y = 0.42;

roof.castShadow = true;

car.add(roof);

// Car Position

car.position.set(0, 0.35, 5);

scene.add(car);

/* =====================================
   Controls
===================================== */

let moveLeft = false;
let moveRight = false;

document.addEventListener("keydown", e => {

    if (e.key === "ArrowLeft") {
        moveLeft = true;
    }

    if (e.key === "ArrowRight") {
        moveRight = true;
    }

});

document.addEventListener("keyup", e => {

    if (e.key === "ArrowLeft") {
        moveLeft = false;
    }

    if (e.key === "ArrowRight") {
        moveRight = false;
    }

});

/* Mobile Buttons */

document
.getElementById("leftBtn")
.addEventListener("touchstart", () => {
    moveLeft = true;
});

document
.getElementById("leftBtn")
.addEventListener("touchend", () => {
    moveLeft = false;
});

document
.getElementById("rightBtn")
.addEventListener("touchstart", () => {
    moveRight = true;
});

document
.getElementById("rightBtn")
.addEventListener("touchend", () => {
    moveRight = false;
});

/* =====================================
   Score
===================================== */

let score = 0;

/* =====================================
   Animation
===================================== */

function animate() {

    requestAnimationFrame(animate);

    /* Move Car */

    if (moveLeft) {

        car.position.x -= 0.08;

    }

    if (moveRight) {

        car.position.x += 0.08;

    }

    /* Keep Inside Road */

    car.position.x = Math.max(
        -2.3,
        Math.min(2.3, car.position.x)
    );

    /* Fake Road Movement */

    road.position.z += 0.2;

    if (road.position.z > 5) {

        road.position.z = 0;

    }

    /* Score */

    score += 0.05;

    scoreEl.textContent =
        Math.floor(score);

   /* Update Enemies */

if (!gameOver) {

    updateEnemies();

}
    /* Render */

    renderer.render(scene, camera);

}

animate();

/* =====================================
   Resize
===================================== */

window.addEventListener("resize", () => {

    camera.aspect =
        container.clientWidth / container.clientHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
        container.clientWidth,
        container.clientHeight
    );

});
/* =====================================
   ENEMY CARS
===================================== */

const enemies = [];

/* Create Enemy */

function createEnemy() {

    const enemy = new THREE.Group();

    // Body
    const bodyGeo = new THREE.BoxGeometry(1.2, 0.5, 2);
    const bodyMat = new THREE.MeshStandardMaterial({
        color: Math.random() * 0xffffff
    });

    const body = new THREE.Mesh(bodyGeo, bodyMat);
    enemy.add(body);

    // Roof
    const roofGeo = new THREE.BoxGeometry(0.8, 0.35, 1);
    const roofMat = new THREE.MeshStandardMaterial({
        color: 0x222222
    });

    const roof = new THREE.Mesh(roofGeo, roofMat);
    roof.position.y = 0.42;

    enemy.add(roof);

    // Random Lane
    const lanes = [-2, 0, 2];

    enemy.position.set(
        lanes[Math.floor(Math.random() * lanes.length)],
        0.35,
        -30
    );

    scene.add(enemy);

    enemies.push(enemy);

}

/* Spawn Every 1.5 Seconds */

setInterval(createEnemy, 1500);

/* =====================================
   COLLISION
===================================== */

let gameOver = false;

function checkCollision(enemy) {

    const dx = Math.abs(car.position.x - enemy.position.x);

    const dz = Math.abs(car.position.z - enemy.position.z);

    return dx < 1 && dz < 1.5;

}

/* =====================================
   GAME OVER
===================================== */

function showGameOver() {

    if (gameOver) return;

    gameOver = true;

    setTimeout(() => {

        const again = confirm(
            `💥 GAME OVER!\\n\\nYour Score: ${Math.floor(score)}\\n\\nPlay Again?`
        );

        if (again) {

            location.reload();

        }

    }, 100);

}

/* =====================================
   UPDATE ENEMIES
===================================== */

function updateEnemies() {

    enemies.forEach((enemy, index) => {

        // Move Forward
        enemy.position.z += 0.35;

        // Collision
        if (checkCollision(enemy)) {

            showGameOver();

        }

        // Remove Passed Enemy
        if (enemy.position.z > 20) {

            scene.remove(enemy);

            enemies.splice(index, 1);

        }

    });

}
