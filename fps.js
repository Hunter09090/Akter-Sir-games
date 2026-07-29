/* =====================================
   PROFESSIONAL FPS ARENA
===================================== */

"use strict";

/* =====================================
   DOM
===================================== */

const gameContainer =
document.getElementById("gameContainer");

const healthEl =
document.getElementById("health");

const killsEl =
document.getElementById("kills");

const ammoEl =
document.getElementById("ammo");

const startOverlay =
document.getElementById("startOverlay");

const startBtn =
document.getElementById("startBtn");

/* =====================================
   THREE.JS SETUP
===================================== */

const scene = new THREE.Scene();

scene.fog =
new THREE.Fog(0x0f172a, 15, 40);

/* Camera */

const camera =
new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    100
);

camera.position.set(0, 1.7, 6);

/* Renderer */

const renderer =
new THREE.WebGLRenderer({
    antialias: true
});

renderer.setSize(
    window.innerWidth,
    window.innerHeight
);

renderer.shadowMap.enabled = true;

gameContainer.appendChild(renderer.domElement);

/* =====================================
   LIGHTING
===================================== */

const ambient =
new THREE.AmbientLight(0xffffff, 0.45);

scene.add(ambient);

const sun =
new THREE.DirectionalLight(0xffffff, 1.2);

sun.position.set(10, 15, 5);

sun.castShadow = true;

scene.add(sun);

/* =====================================
   REALISTIC GROUND
===================================== */

const groundGeo =
new THREE.PlaneGeometry(80, 80);

const groundMat =
new THREE.MeshStandardMaterial({
    color: 0x4b5563,
    roughness: 0.9,
    metalness: 0.05
});

const ground =
new THREE.Mesh(groundGeo, groundMat);

ground.rotation.x = -Math.PI / 2;

ground.receiveShadow = true;

scene.add(ground);

/* Grid */

const grid =
new THREE.GridHelper(
    80,
    80,
    0x64748b,
    0x334155
);

scene.add(grid);

/* =====================================
   WALLS
===================================== */

function createWall(x, z, w, h, d) {

    const geo =
    new THREE.BoxGeometry(w, h, d);

    const mat =
    new THREE.MeshStandardMaterial({
        color: 0x475569
    });

    const wall =
    new THREE.Mesh(geo, mat);

    wall.position.set(x, h / 2, z);

    wall.castShadow = true;

    wall.receiveShadow = true;

    scene.add(wall);

}

createWall(0, -15, 30, 4, 1);

createWall(0, 15, 30, 4, 1);

createWall(-15, 0, 1, 4, 30);

createWall(15, 0, 1, 4, 30);

/* =====================================
   CRATES
===================================== */

function createCrate(x, z) {

    const geo =
    new THREE.BoxGeometry(2, 2, 2);

    const mat =
    new THREE.MeshStandardMaterial({
        color: 0x8b5a2b
    });

    const crate =
    new THREE.Mesh(geo, mat);

    crate.position.set(x, 1, z);

    crate.castShadow = true;

    crate.receiveShadow = true;

    scene.add(crate);

}

createCrate(4, -4);

createCrate(-5, -6);

createCrate(6, 4);

createCrate(-6, 5);

/* =====================================
   GUN MODEL
===================================== */

const gun =
new THREE.Group();

const gunBody =
new THREE.Mesh(
    new THREE.BoxGeometry(0.3, 0.2, 1.2),
    new THREE.MeshStandardMaterial({
        color: 0x111827
    })
);

gunBody.position.z = -0.4;

gun.add(gunBody);

const barrel =
new THREE.Mesh(
    new THREE.CylinderGeometry(0.05, 0.05, 0.8),
    new THREE.MeshStandardMaterial({
        color: 0x374151
    })
);

barrel.rotation.x = Math.PI / 2;

barrel.position.z = -1;

gun.add(barrel);

gun.position.set(0.45, -0.35, -0.9);

camera.add(gun);

scene.add(camera);

/* =====================================
   ENEMY
===================================== */

function createEnemy() {

    const enemy =
    new THREE.Group();

    const body =
    new THREE.Mesh(
        new THREE.BoxGeometry(1, 1.6, 1),
        new THREE.MeshStandardMaterial({
            color: 0xdc2626
        })
    );

    body.position.y = 0.8;

    enemy.add(body);

    enemy.position.set(
        (Math.random() - 0.5) * 16,
        0,
        -10 - Math.random() * 10
    );

    scene.add(enemy);

    return enemy;

}

let enemy = createEnemy();

/* =====================================
   PLAYER STATE
===================================== */

let health = 100;

let kills = 0;

let ammo = 30;

healthEl.textContent = health;

killsEl.textContent = kills;

ammoEl.textContent = ammo;

/* =====================================
   MOVEMENT
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

    if (keys["a"] || keys["arrowleft"]) {

        camera.position.x -= speed;

    }

    if (keys["d"] || keys["arrowright"]) {

        camera.position.x += speed;

    }

    if (keys["w"] || keys["arrowup"]) {

        camera.position.z -= speed;

    }

    if (keys["s"] || keys["arrowdown"]) {

        camera.position.z += speed;

    }

    camera.position.x =
        Math.max(-12, Math.min(12, camera.position.x));

    camera.position.z =
        Math.max(-12, Math.min(12, camera.position.z));

}

/* =====================================
   BULLETS
===================================== */

const bullets = [];

function shoot() {

    if (ammo <= 0) return;

    ammo--;

    ammoEl.textContent = ammo;

    /* Gun Recoil */

    gun.position.z = -0.7;

    setTimeout(() => {

        gun.position.z = -0.9;

    }, 60);

    const bullet =
    new THREE.Mesh(

        new THREE.SphereGeometry(0.08, 8, 8),

        new THREE.MeshStandardMaterial({
            color: 0xfacc15,
            emissive: 0xf59e0b,
            emissiveIntensity: 1
        })

    );

    bullet.position.copy(camera.position);

    bullet.position.y -= 0.1;

    bullet.userData.velocity =
    new THREE.Vector3(0, 0, -0.9);

    scene.add(bullet);

    bullets.push(bullet);

}

window.addEventListener("keydown", (e) => {

    if (e.code === "Space") {

        shoot();

    }

});

/* Mobile Shoot */

document
.getElementById("shootBtn")
.addEventListener("click", shoot);

/* =====================================
   UPDATE BULLETS
===================================== */

function updateBullets() {

    bullets.forEach((bullet, index) => {

        bullet.position.add(
            bullet.userData.velocity
        );

        /* Hit Enemy */

        if (
            bullet.position.distanceTo(enemy.position)
            < 1
        ) {

            scene.remove(bullet);

            bullets.splice(index, 1);

            enemyHit();

        }

        /* Remove Far */

        if (bullet.position.z < -50) {

            scene.remove(bullet);

            bullets.splice(index, 1);

        }

    });

}

/* =====================================
   ENEMY AI
===================================== */

function updateEnemy() {

    const dx =
        camera.position.x - enemy.position.x;

    const dz =
        camera.position.z - enemy.position.z;

    enemy.position.x += dx * 0.004;

    enemy.position.z += dz * 0.004;

    /* Damage Player */

    if (
        enemy.position.distanceTo(camera.position)
        < 1.5
    ) {

        health -= 1;

        healthEl.textContent = health;

        enemy.position.z -= 2;

        if (health <= 0) {

            gameOver();

        }

    }

}

/* =====================================
   ENEMY HIT
===================================== */

function enemyHit() {

    kills++;

    killsEl.textContent = kills;

    scene.remove(enemy);

    enemy = createEnemy();

    /* Reload Ammo */

    ammo = 30;

    ammoEl.textContent = ammo;

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
   MOBILE MOVEMENT
===================================== */

document
.getElementById("leftBtn")
.addEventListener("click", () => {

    camera.position.x -= 0.5;

});

document
.getElementById("rightBtn")
.addEventListener("click", () => {

    camera.position.x += 0.5;

});

document
.getElementById("forwardBtn")
.addEventListener("click", () => {

    camera.position.z -= 0.5;

});

/* =====================================
   START GAME
===================================== */

let gameStarted = false;

startBtn.addEventListener("click", () => {

    startOverlay.style.display = "none";

    gameStarted = true;

});

/* =====================================
   ANIMATION LOOP
===================================== */

function animate() {

    requestAnimationFrame(animate);

    if (gameStarted) {

        movePlayer();

        updateBullets();

        updateEnemy();

    }

    renderer.render(scene, camera);

}

animate();

/* =====================================
   RESPONSIVE
===================================== */

window.addEventListener("resize", () => {

    camera.aspect =
        window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );

});
