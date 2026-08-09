const canvas = document.getElementById('mainCanvas');
const ctx = canvas.getContext('2d');

let animationId;
let particles = [];

function resizeCanvas(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// ====================================
// Create Heart Shape
// ====================================

function createHeartParticles(){

    particles = [];

    const scale = 12;

    for(let t = 0; t < Math.PI * 2; t += 0.05){

        const x = 16 * Math.pow(Math.sin(t),3);

        const y = -(13*Math.cos(t) - 5*Math.cos(2*t) - 2*Math.cos(3*t) - Math.cos(4*t));

        particles.push({
            x: canvas.width / 2 + x * scale,
            y: canvas.height / 2 + y * scale,
            baseX: canvas.width / 2 + x * scale,
            baseY: canvas.height / 2 + y * scale,
            size: Math.random()*3 + 1,
            angle: Math.random() * Math.PI * 2,
            color: `hsl(${330 + Math.random()*30},100%,70%)`
        });
    }
}

// ====================================
// Animate Heart
// ====================================

function animateHeart(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    // Background glow
    const gradient = ctx.createRadialGradient(
        canvas.width/2,
        canvas.height/2,
        50,
        canvas.width/2,
        canvas.height/2,
        400
    );

    gradient.addColorStop(0,'rgba(255,20,147,.25)');
    gradient.addColorStop(1,'rgba(0,0,0,1)');

    ctx.fillStyle = gradient;
    ctx.fillRect(0,0,canvas.width,canvas.height);

    const time = Date.now() * 0.002;

    particles.forEach(p => {

        // Breathing effect
        const pulse = Math.sin(time + p.angle) * 6;

        p.x = p.baseX + Math.cos(time + p.angle) * 3;
        p.y = p.baseY + pulse;

        ctx.beginPath();
        ctx.arc(p.x,p.y,p.size + pulse*0.1,0,Math.PI*2);

        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 20;
        ctx.fill();
    });

    // Center text
    ctx.font = 'bold 48px Arial';
    ctx.fillStyle = '#fff';
    ctx.textAlign = 'center';
    ctx.shadowColor = '#ff5ea8';
    ctx.shadowBlur = 25;
    ctx.fillText('I ❤️ YOU', canvas.width/2, canvas.height/2 + 220);

    animationId = requestAnimationFrame(animateHeart);
}

// ====================================
// Play Animation
// ====================================

function playAnimation(type){

    canvas.style.display = 'block';
    document.getElementById('closeBtn').style.display = 'block';

    cancelAnimationFrame(animationId);

    if(type === 'heart'){
        createHeartParticles();
        animateHeart();
    }
}

// ====================================
// Close
// ====================================

function closeAnimation(){
    cancelAnimationFrame(animationId);
    canvas.style.display = 'none';
    document.getElementById('closeBtn').style.display = 'none';
}
