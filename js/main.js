// Cinematic Observer
const options = { threshold: 0.55 };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            if (entry.target.classList.contains('scene-wine')) initFinale();
        }
    });
}, options);

document.querySelectorAll('.scene').forEach(scene => observer.observe(scene));

// 💋 Intimacy Scene Logic
function triggerIntimacy() {
    const layer = document.querySelector('.interactive-zoom');
    const grade = document.getElementById('crimson-pulse');
    layer.style.transform = "scale(1.1)";
    grade.classList.add('heart-beat');
    
    // Simulate Heartbeat Vibration
    if (navigator.vibrate) navigator.vibrate([100, 30, 100]);
}

// 🪄 Gold Dust Particle Engine
function createDust() {
    const container = document.getElementById('gold-dust');
    for (let i = 0; i < 40; i++) {
        const dot = document.createElement('div');
        dot.style.cssText = `
            position: absolute;
            width: 2px; height: 2px;
            background: rgba(212, 175, 55, 0.3);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            box-shadow: 0 0 5px #d4af37;
            animation: drift ${10 + Math.random() * 15}s infinite linear;
        `;
        container.appendChild(dot);
    }
}

// 🎆 Gold Luxury Fireworks (Simplified Script for Section 6)
function initFinale() {
    setTimeout(() => {
        document.getElementById('sig-akki').classList.add('show-sig');
    }, 1500);

    const canvas = document.getElementById('luxury-fireworks');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];

    class Sparkle {
        constructor() {
            this.x = canvas.width / 2;
            this.y = canvas.height / 2;
            this.speedX = Math.random() * 4 - 2;
            this.speedY = Math.random() * -6;
            this.gravity = 0.05;
            this.life = 1;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.speedY += this.gravity;
            this.life -= 0.01;
        }
        draw() {
            ctx.fillStyle = `rgba(212, 175, 55, ${this.life})`;
            ctx.fillRect(this.x, this.y, 2, 2);
        }
    }

    function animate() {
        if (particles.length < 30) particles.push(new Sparkle());
        ctx.clearRect(0,0, canvas.width, canvas.height);
        particles = particles.filter(p => p.life > 0);
        particles.forEach(p => { p.update(); p.draw(); });
        requestAnimationFrame(animate);
    }
    animate();
}

createDust();
const driftStyle = document.createElement('style');
driftStyle.innerHTML = `@keyframes drift { from { transform: translateY(100vh) rotate(0); } to { transform: translateY(-10vh) rotate(360deg); } }`;
document.head.appendChild(driftStyle);
