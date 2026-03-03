// --- INTERSECTION OBSERVER TO TRIGGER FADES ---
const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if(e.isIntersecting) e.target.classList.add('active');
    });
}, { threshold: 0.5 });

document.querySelectorAll('.page-section').forEach(s => obs.observe(s));

// --- S1 FIREWORKS ENGINE ---
const fwCanvas = document.getElementById('fireworks-canvas');
const fwCtx = fwCanvas.getContext('2d');
fwCanvas.width = window.innerWidth;
fwCanvas.height = window.innerHeight;

function createFirework() {
    fwCtx.fillStyle = 'rgba(0,0,0,0.1)';
    fwCtx.fillRect(0,0,fwCanvas.width, fwCanvas.height);
    for(let i=0; i<3; i++) {
        fwCtx.fillStyle = `hsl(${Math.random()*360}, 100%, 70%)`;
        fwCtx.beginPath();
        fwCtx.arc(Math.random()*fwCanvas.width, Math.random()*fwCanvas.height, 1.5, 0, Math.PI*2);
        fwCtx.fill();
    }
    requestAnimationFrame(createFirework);
}
createFirework();

// --- S2 STAR FIELD ---
function initStars() {
    const field = document.getElementById('star-field');
    for(let i=0; i<100; i++){
        let star = document.createElement('div');
        star.style.position = 'absolute';
        star.style.left = Math.random()*100 + '%';
        star.style.top = Math.random()*100 + '%';
        star.style.width = '2px'; star.style.height = '2px';
        star.style.background = '#fff';
        star.style.borderRadius = '50%';
        star.style.animation = `twinkle ${Math.random()*5+2}s infinite alternate`;
        field.appendChild(star);
    }
}
initStars();

// --- S3 HEART FIELD ---
function initHearts() {
    const field = document.getElementById('heart-field');
    const emojis = ['👩‍❤️‍👨', '💕', '❤️'];
    for(let i=0; i<15; i++){
        let heart = document.createElement('div');
        heart.innerHTML = emojis[Math.floor(Math.random()*emojis.length)];
        heart.style.position = 'absolute';
        heart.style.left = Math.random()*100 + '%';
        heart.style.top = Math.random()*100 + '%';
        heart.style.opacity = '0.2';
        heart.style.fontSize = Math.random()*20+15 + 'px';
        heart.style.animation = `float ${Math.random()*10+5}s infinite linear`;
        field.appendChild(heart);
    }
}
initHearts();

// CSS Animations Injected
const styles = `
@keyframes twinkle { from { opacity: 0; } to { opacity: 0.8; transform: scale(1.2); } }
@keyframes float { 
    from { transform: translateY(0); }
    to { transform: translateY(-100vh); opacity: 0; }
}
`;
const sheet = document.createElement('style'); sheet.innerText = styles; document.head.appendChild(sheet);
