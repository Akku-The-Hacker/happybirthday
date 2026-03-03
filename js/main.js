// CINEMATIC TEXT CONTENT
const heroText = `Wish you a very, very Happy Birthday, Baccha… 🎂💖✨\n\nYou may act all mature and strong 💫🤍,\nbut you’ll always be my little Baccha at heart 🥺🌸💕\n\nI hope life gives you everything your heart quietly wishes for —\nand endless reasons to smile 😊✨\n\nThank you for being you… 🤍`;

// Observer for triggering entrance effects
const sceneOptions = { threshold: 0.5 };
const sceneObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            if(entry.target.id === 'hero') triggerTypewriter();
            if(entry.target.id === 'hickey') triggerCrimsonFade();
            if(entry.target.id === 'forever') startFinalSparkles();
        }
    });
}, sceneOptions);

document.querySelectorAll('.scene').forEach(s => sceneObserver.observe(s));

// PARALLAX MOUSE/SCROLL TILT (Subtle 3D Feel)
window.addEventListener('scroll', () => {
    let scrolled = window.pageYOffset;
    document.querySelectorAll('.media-container').forEach(media => {
        media.style.transform = `translateY(${scrolled * 0.1}px)`;
    });
});

// TYPEWRITER ENGINE
let typewriterRun = false;
function triggerTypewriter() {
    if (typewriterRun) return;
    typewriterRun = true;
    let i = 0;
    const target = document.getElementById('hero-typewriter');
    function type() {
        if (i < heroText.length) {
            target.innerHTML += heroText.charAt(i) === '\n' ? '<br>' : heroText.charAt(i);
            i++;
            setTimeout(type, 60);
        }
    }
    setTimeout(type, 1500); // 1.5s delay after entrance
}

// HICKEY TRANSITION
function triggerCrimsonFade() {
    const crimson = document.querySelector('.crimson-pulse');
    setTimeout(() => {
        crimson.style.opacity = "1";
        crimson.style.background = "rgba(100, 0, 0, 0.3)";
    }, 1000);
}

// GOLD LUXURY SPARKLES FOR FINALE
function startFinalSparkles() {
    const canvas = document.getElementById('finale-sparkles');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = canvas.height + 10;
            this.speed = Math.random() * 1.5 + 0.5;
            this.alpha = Math.random() * 0.8 + 0.2;
            this.size = Math.random() * 1.5;
        }
        draw() {
            ctx.fillStyle = `rgba(212, 175, 55, ${this.alpha})`;
            ctx.shadowBlur = 5;
            ctx.shadowColor = "#d4af37";
            ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI*2); ctx.fill();
        }
        update() {
            this.y -= this.speed;
            this.alpha -= 0.001;
        }
    }

    function animate() {
        if (particles.length < 50) particles.push(new Particle());
        ctx.clearRect(0,0, canvas.width, canvas.height);
        particles.forEach((p, i) => {
            p.update(); p.draw();
            if (p.alpha <= 0) particles.splice(i, 1);
        });
        requestAnimationFrame(animate);
    }
    animate();
}

// 🪄 Gold Dust Generator
(function initGoldDust() {
    const dust = document.getElementById('gold-dust');
    for (let i = 0; i < 15; i++) {
        const dot = document.createElement('div');
        dot.style.cssText = `
            position: fixed; background: #d4af37; opacity: 0.15;
            width: 1.5px; height: 1.5px; border-radius: 50%;
            top: ${Math.random() * 100}vh; left: ${Math.random() * 100}vw;
            pointer-events: none; z-index: 50;
            animation: drift ${15 + Math.random() * 20}s infinite linear;
        `;
        dust.appendChild(dot);
    }
})();

const driftStyle = document.createElement('style');
driftStyle.innerHTML = `@keyframes drift { from { transform: translate(0,0); } to { transform: translate(100px, -200px); } }`;
document.head.appendChild(driftStyle);
