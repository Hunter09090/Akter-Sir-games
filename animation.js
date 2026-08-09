const canvas = document.getElementById('mainCanvas');
const ctx = canvas.getContext('2d');

let animationId;
let particles = [];
let mode = 'heart';

function resizeCanvas(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// =============================
// Heart Shape Particles
// =============================

function createHeart(){

    particles = [];

    const scale = 13;

    for(let t = 0; t < Math.PI*2; t += 0.04){

        const x = 16 * Math.pow(Math.sin(t),3);
        const y = -(13*Math.cos(t) - 5*Math.cos(2*t) - 2*Math.cos(3*t) - Math.cos(4*t));

        particles.push({
            x:canvas.width/2 + x*scale,
            y:canvas.height/2 + y*scale,
            ox:canvas.width/2 + x*scale,
            oy:canvas.height/2 + y*scale,
            size:Math.random()*3 + 1,
            angle:Math.random()*Math.PI*2,
            color:`hsl(${330+Math.random()*20},100%,70%)`
        });
    }
}

// =============================
// Star Particles
// =============================

function createStar(){

    particles = [];

    for(let i=0;i<350;i++){

        const angle = Math.random()*Math.PI*2;
        const radius = Math.random()*250;

        particles.push({
            x:canvas.width/2 + Math.cos(angle)*radius,
            y:canvas.height/2 + Math.sin(angle)*radius,
            vx:Math.cos(angle)*0.5,
            vy:Math.sin(angle)*0.5,
            size:Math.random()*3+1,
            color:'#ffe066'
        });
    }
}

// =============================
// Butterfly Particles
// =============================

function createButterfly(){

    particles = [];

    for(let i=0;i<300;i++){

        const side = i % 2 === 0 ? -1 : 1;
        const angle = Math.random()*Math.PI;

        particles.push({
            x:canvas.width/2 + side*(Math.cos(angle)*180),
            y:canvas.height/2 + Math.sin(angle)*140 - 60,
            size:Math.random()*3+1,
            phase:Math.random()*Math.PI*2,
            color:'#6bc8ff'
        });
    }
}

// =============================
// Spiral Galaxy
// =============================

function createSpiral(){

    particles = [];

    for(let i=0;i<600;i++){

        const angle = i*0.15;
        const radius = i*0.45;

        particles.push({
            angle,
            radius,
            size:Math.random()*2+1,
            color:`hsl(${250+Math.random()*40},100%,70%)`
        });
    }
}

// =============================
// Main Animation Loop
// =============================

function animate(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    const time = Date.now()*0.001;

    if(mode === 'heart'){

        particles.forEach(p=>{
            const pulse = Math.sin(time + p.angle)*5;

            p.x = p.ox + Math.cos(time + p.angle)*2;
            p.y = p.oy + pulse;

            ctx.beginPath();
            ctx.arc(p.x,p.y,p.size + pulse*0.1,0,Math.PI*2);
            ctx.fillStyle = p.color;
            ctx.shadowColor = p.color;
            ctx.shadowBlur = 18;
            ctx.fill();
        });

    }

    else if(mode === 'star'){

        particles.forEach(p=>{
            p.x += p.vx;
            p.y += p.vy;

            ctx.beginPath();
            ctx.arc(p.x,p.y,p.size,0,Math.PI*2);
            ctx.fillStyle = p.color;
            ctx.shadowColor = p.color;
            ctx.shadowBlur = 14;
            ctx.fill();
        });

    }

    else if(mode === 'butterfly'){

        particles.forEach(p=>{
            const wing = Math.sin(time*5 + p.phase)*18;

            ctx.beginPath();
            ctx.arc(p.x + wing,p.y,p.size,0,Math.PI*2);
            ctx.fillStyle = p.color;
            ctx.shadowColor = p.color;
            ctx.shadowBlur = 16;
            ctx.fill();
        });

    }

    else if(mode === 'spiral'){

        particles.forEach(p=>{
            const a = p.angle + time*0.8;

            const x = canvas.width/2 + Math.cos(a)*p.radius;
            const y = canvas.height/2 + Math.sin(a)*p.radius;

            ctx.beginPath();
            ctx.arc(x,y,p.size,0,Math.PI*2);
            ctx.fillStyle = p.color;
            ctx.shadowColor = p.color;
            ctx.shadowBlur = 12;
            ctx.fill();
        });
    }

    animationId = requestAnimationFrame(animate);
}

// =============================
// Play Animation
// =============================

function playAnimation(type){

    mode = type;

    canvas.style.display = 'block';
    document.getElementById('closeBtn').style.display = 'block';

    cancelAnimationFrame(animationId);

    if(type === 'heart') createHeart();
    if(type === 'star') createStar();
    if(type === 'butterfly') createButterfly();
    if(type === 'spiral') createSpiral();

    animate();
}

// =============================
// Close Animation
// =============================

function closeAnimation(){
    cancelAnimationFrame(animationId);
    canvas.style.display = 'none';
    document.getElementById('closeBtn').style.display = 'none';
}
