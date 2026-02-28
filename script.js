// --- CONFIGURATION ---
const TARGET_DATE = "December 31, 2025 00:00:00"; // Edit this date!
const FIREWORKS_DURATION = 8000; // 8 seconds

// --- PRELOADER ---
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => preloader.style.display = 'none', 500);
    }, 1000);
});

// --- FLOATING HEARTS ---
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = '💖';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.fontSize = (Math.random() * 20 + 10) + 'px';
    heart.style.animationDuration = (Math.random() * 5 + 5) + 's';
    document.getElementById('hearts-container').appendChild(heart);
    
    setTimeout(() => heart.remove(), 10000);
}

let heartInterval = setInterval(createHeart, 600);

// --- HERO BUTTON ACTION ---
const surpriseBtn = document.getElementById('surprise-btn');
const music = document.getElementById('bg-music');

surpriseBtn.addEventListener('click', () => {
    // Unlock scrolling
    document.body.classList.remove('loading');
    
    // Play Music (Handled via user interaction)
    music.play().catch(e => console.log("Music play blocked:", e));
    
    // Intensify hearts
    clearInterval(heartInterval);
    heartInterval = setInterval(createHeart, 200);
    
    // Reveal sections
    document.querySelectorAll('.section').forEach(sec => sec.classList.remove('hidden'));
    
    // Scroll to next section
    document.getElementById('countdown-section').scrollIntoView({ behavior: 'smooth' });
});

// --- COUNTDOWN TIMER ---
function updateCountdown() {
    const now = new Date().getTime();
    const distance = new Date(TARGET_DATE).getTime() - now;

    if (distance < 0) {
        document.getElementById('countdown').innerHTML = "<h3>It's Your Day! 🎂</h3>";
        return;
    }

    const d = Math.floor(distance / (1000 * 60 * 60 * 24));
    const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').innerText = d.toString().padStart(2, '0');
    document.getElementById('hours').innerText = h.toString().padStart(2, '0');
    document.getElementById('minutes').innerText = m.toString().padStart(2, '0');
    document.getElementById('seconds').innerText = s.toString().padStart(2, '0');
}
setInterval(updateCountdown, 1000);

// --- SCROLL ANIMATIONS (Intersection Observer) ---
const observerOptions = { threshold: 0.2 };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            if (entry.target.id === 'fireworks-section') {
                startFireworks();
            }
        }
    });
}, observerOptions);

document.querySelectorAll('.section').forEach(section => observer.observe(section));

// --- LIGHTBOX ---
const modal = document.getElementById('lightbox');
const modalImg = document.getElementById('modal-img');
document.querySelectorAll('.lightbox-trigger').forEach(img => {
    img.onclick = function() {
        modal.style.display = "flex";
        modalImg.src = this.src;
    }
});

document.querySelector('.close-modal').onclick = () => modal.style.display = "none";
window.onclick = (e) => { if (e.target == modal) modal.style.display = "none"; }

// --- FIREWORKS SYSTEM ---
const canvas = document.getElementById('fireworks-canvas');
const ctx = canvas.getContext('2d');
let fireworksActive = false;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
    constructor(x, y, color) {
        this.x = x; this.y = y;
        this.color = color;
        this.velocity = {
            x: (Math.random() - 0.5) * 8,
            y: (Math.random() - 0.5) * 8
        };
        this.alpha = 1;
        this.friction = 0.95;
    }
    draw() {
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
    update() {
        this.velocity.x *= this.friction;
        this.velocity.y *= this.friction;
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.alpha -= 0.01;
    }
}

let particles = [];
function startFireworks() {
    if (fireworksActive) return;
    fireworksActive = true;
    
    const colors = ['#ff8da1', '#ff4d6d', '#fff', '#ffd1dc'];
    
    let endTimer = setTimeout(() => { fireworksActive = false; }, FIREWORKS_DURATION);

    function animate() {
        if (!fireworksActive && particles.length === 0) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            return;
        }
        requestAnimationFrame(animate);
        ctx.fillStyle = 'rgba(255, 245, 247, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        if (fireworksActive && Math.random() < 0.05) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * (canvas.height / 2);
            const color = colors[Math.floor(Math.random() * colors.length)];
            for (let i = 0; i < 40; i++) particles.push(new Particle(x, y, color));
        }

        particles.forEach((p, i) => {
            if (p.alpha <= 0) particles.splice(i, 1);
            else { p.update(); p.draw(); }
        });
    }
    animate();
}
