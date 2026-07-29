/* =====================================
   3D ARENA SHOOTER
===================================== */

"use strict";

/* =====================================
   DOM
===================================== */

const gameCanvas =
document.getElementById("gameCanvas");

const killsEl =
document.getElementById("kills");

const healthEl =
document.getElementById("health");

/* =====================================
   THREE.JS SETUP
===================================== */

const scene = new THREE.Scene();

scene.background =
new THREE.Color(0x0f172a);

/* Camera */

const camera =
new THREE.PerspectiveCamera(
    75,
    gameCanvas.clientWidth / gameCanvas.clientHeight,
    0.1,
    1000
);

camera.position.set(0, 8, 10);

camera.lookAt(0, 0, 0);

/* Renderer */

const renderer =
new THREE.WebGLRenderer({
    antialias: true
});

renderer.setSize(
    gameCanvas.clientWidth,
    gameCanvas.clientHeight
);

renderer.shadowMap.enabled = true;

gameCanvas.appendChild(renderer.domElement);

/* =====================================
   LIGHTING
===================================== */

/* Ambient Light */

const ambientLight =
new THREE.AmbientLight(0xffffff, 0.6);

scene.add(ambientLight);

/* Directional Light */

const dirLight =
new THREE.DirectionalLight(0xffffff, 1);

dirLight.position.set(5, 10, 5);

dirLight.castShadow = true;

scene.add(dirLight);

/* =====================================
   ARENA FLOOR
===================================== */

const floorGeo =
new THREE.PlaneGeometry(20, 20);

const floorMat =
new THREE.MeshStandardMaterial({
    color: 0x1e293b
});

const floor =
new THREE.Mesh(floorGeo, floorMat);

floor.rotation.x = -Math.PI / 2;

floor.receiveShadow = true;

scene.add(floor);

/* Grid */

const grid =
new THREE.GridHelper(
    20,
    20,
    0x334155,
    0x334155
);

scene.add(grid);

/* =====================================
   PLAYER
===================================== */

const playerGeo =
new THREE.BoxGeometry(1, 1, 1);

const playerMat =
new THREE.MeshStandardMaterial({
    color: 0x2563eb
});

const player =
new THREE.Mesh(playerGeo, playerMat);

player.position.y = 0.5;

player.castShadow = true;

scene.add(player);

/* =====================================
   ENEMY
===================================== */

const enemyGeo =
new THREE.BoxGeometry(1, 1, 1);

const enemyMat =
new THREE.MeshStandardMaterial({
    color: 0xdc2626
});

const enemy =
new THREE.Mesh(enemyGeo, enemyMat);

enemy.position.set(0, 0.5, -5);

enemy.castShadow = true;

scene.add(enemy);

/* =====================================
   GAME STATE
===================================== */

let kills = 0;
let health = 100;

killsEl.textContent = kills;
healthEl.textContent = health;

/* =====================================
   PLAYER MOVEMENT
===================================== */

const keys = {};

window.addEventListener("keydown", (e) => {

    keys[e.key.toLowerCase()] = true;

});

window.addEventListener("keyup", (e) => {

    keys[e.key.toLowerCase()] = false;

});

function movePlayer() {

    const speed = 0.12;

    if (keys["arrowleft"] || keys["a"]) {

        player.position.x -= speed;

    }

    if (keys["arrowright"] || keys["d"]) {

        player.position.x += speed;

    }

    if (keys["arrowup"] || keys["w"]) {

        player.position.z -= speed;

    }

    if (keys["arrowdown"] || keys["s"]) {

        player.position.z += speed;

    }

    /* Arena Boundary */

    player.position.x =
        Math.max(-8, Math.min(8, player.position.x));

    player.position.z =
        Math.max(-8, Math.min(8, player.position.z));

}

/* =====================================
   ENEMY AI
===================================== */

function updateEnemy() {

    /* Follow Player */

    const dx =
        player.position.x - enemy.position.x;

    const dz =
        player.position.z - enemy.position.z;

    enemy.position.x += dx * 0.01;

    enemy.position.z += dz * 0.01;

}

/* =====================================
   ANIMATION LOOP
===================================== */

function animate() {

    requestAnimationFrame(animate);

    movePlayer();

    updateEnemy();

    updateBullets();

    checkPlayerDamage();

    renderer.render(scene, camera);

}

/* =====================================
   RESPONSIVE
===================================== */

window.addEventListener("resize", () => {

    camera.aspect =
        gameCanvas.clientWidth / gameCanvas.clientHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
        gameCanvas.clientWidth,
        gameCanvas.clientHeight
    );

});
/* =====================================
   BULLET SYSTEM
===================================== */

const bullets = [];

/* Create Bullet */

function shoot() {

    const bulletGeo =
    new THREE.SphereGeometry(0.15, 8, 8);

    const bulletMat =
    new THREE.MeshStandardMaterial({
        color: 0xfacc15,
        emissive: 0xf59e0b,
        emissiveIntensity: 1
    });

    const bullet =
    new THREE.Mesh(bulletGeo, bulletMat);

    /* Start from Player */

    bullet.position.copy(player.position);

    bullet.position.y = 0.7;

    /* Direction */

    const direction =
    new THREE.Vector3(
        enemy.position.x - player.position.x,
        0,
        enemy.position.z - player.position.z
    ).normalize();

    bullet.userData.velocity =
        direction.multiplyScalar(0.35);

    scene.add(bullet);

    bullets.push(bullet);

}

/* Shoot with Space */

window.addEventListener("keydown", (e) => {

    if (e.code === "Space") {

        shoot();

    }

});

/* =====================================
   UPDATE BULLETS
===================================== */

function updateBullets() {

    bullets.forEach((bullet, index) => {

        /* Move Bullet */

        bullet.position.add(
            bullet.userData.velocity
        );

        /* Distance Check */

        const distance =
        bullet.position.distanceTo(enemy.position);

        /* Hit Enemy */

        if (distance < 0.8) {

            scene.remove(bullet);

            bullets.splice(index, 1);

            enemyHit();

        }

        /* Remove Far Bullets */

        if (

            Math.abs(bullet.position.x) > 20 ||
            Math.abs(bullet.position.z) > 20

        ) {

            scene.remove(bullet);

            bullets.splice(index, 1);

        }

    });

}

/* =====================================
   ENEMY HIT
===================================== */

function enemyHit() {

    kills++;

    killsEl.textContent = kills;

    /* Flash Effect */

    enemy.material.color.set(0xffffff);

    setTimeout(() => {

        enemy.material.color.set(0xdc2626);

    }, 120);

    /* Respawn Enemy */

    respawnEnemy();

}

/* =====================================
   RESPAWN ENEMY
===================================== */

function respawnEnemy() {

    enemy.position.set(

        (Math.random() - 0.5) * 12,
        0.5,
        -5 - Math.random() * 6

    );

}

/* =====================================
   PLAYER DAMAGE
===================================== */

function checkPlayerDamage() {

    const distance =
    player.position.distanceTo(enemy.position);

    if (distance < 1.2) {

        health -= 1;

        healthEl.textContent = health;

        /* Push Enemy Back */

        enemy.position.z -= 2;

        if (health <= 0) {

            gameOver();

        }

    }

}

/* =====================================
   GAME OVER
===================================== */

function gameOver() {

    alert(
        `💀 GAME OVER!\\n\\nKills: ${kills}`
    );

    location.reload();

}

/* =====================================
   MOBILE BUTTONS
===================================== */

document
.getElementById("leftBtn")
.addEventListener("click", () => {

    player.position.x -= 0.5;

});

document
.getElementById("rightBtn")
.addEventListener("click", () => {

    player.position.x += 0.5;

});

document
.getElementById("shootBtn")
.addEventListener("click", shoot);

/* =====================================
   UPDATE ANIMATE FUNCTION
===================================== */

/*
   আগের animate() ফাংশনটি
   Replace করে নিচেরটা বসাও
*/

