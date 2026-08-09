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

function createParticles(color,count=180){
    particles = [];

    for(let i=0;i<count;i++){
        particles.push({
            x:Math.random()*canvas.width,
            y:Math.random()*canvas.height,
            size:Math.random()*4+1,
            vx:(Math.random()-.5)*2,
            vy:(Math.random()-.5)*2,
            color
        });
    }
}

function animateParticles(){
    ctx.clearRect(0,0,canvas.width,canvas.height);

    particles.forEach(p=>{
        p.x += p.vx;
        p.y += p.vy;

        if(p.x<0 || p.x>canvas.width) p.vx *= -1;
        if(p.y<0 || p.y>canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x,p.y,p.size,0,Math.PI*2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 12;
        ctx.fill();
    });

    animationId = requestAnimationFrame(animateParticles);
}

function playAnimation(type){

    canvas.style.display = 'block';
    document.getElementById('closeBtn').style.display = 'block';

    cancelAnimationFrame(animationId);

    switch(type){
        case 'heart':
            createParticles('#ff5ea8');
            break;

        case 'star':
            createParticles('#ffe066');
            break;

        case 'butterfly':
            createParticles('#6bc8ff');
            break;

        case 'spiral':
            createParticles('#b57dff');
            break;
    }

    animateParticles();
}

function closeAnimation(){
    cancelAnimationFrame(animationId);
    canvas.style.display = 'none';
    document.getElementById('closeBtn').style.display = 'none';
}
