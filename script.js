// --- CONFIGURATION ---
const birthdayDate = new Date("2026-03-04T00:00:00");
const youtubeVideoId = "l482T0yNkeo"; 
const correctPassword = "Akki@7489";

// --- PASSWORD LOCK LOGIC ---
const lockOverlay = document.getElementById('lock-overlay');
const passwordInput = document.getElementById('passwordInput');
const unlockBtn = document.getElementById('unlockBtn');
const errorMsg = document.getElementById('error-msg');
const lockCard = document.querySelector('.lock-card');

function checkPassword() {
    const entered = passwordInput.value;
    if (entered === correctPassword) {
        // Correct Password
        lockOverlay.classList.add('lock-hidden');
        document.body.classList.remove('locked');
        setTimeout(() => {
            lockOverlay.remove(); // Clear from DOM
        }, 1000);
    } else {
        // Wrong Password
        errorMsg.innerText = "Wrong password… Try again 💔";
        lockCard.classList.add('shake');
        passwordInput.value = "";
        
        // Remove shake class after animation so it can be re-triggered
        setTimeout(() => {
            lockCard.classList.remove('shake');
        }, 400);
    }
}

unlockBtn.addEventListener('click', checkPassword);
passwordInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') checkPassword();
});

// Create hearts specifically for the lock screen background
function createLockHeart() {
    if(!document.getElementById('lock-hearts')) return;
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = '❤️';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = Math.random() * 3 + 4 + 's';
    heart.style.opacity = "0.2";
    document.getElementById('lock-hearts').appendChild(heart);
    setTimeout(() => heart.remove(), 6000);
}
setInterval(createLockHeart, 600);


// --- YOUTUBE API ---
let player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('youtube-player', {
        height: '0',
        width: '0',
        videoId: youtubeVideoId,
        playerVars: { 'autoplay': 0, 'loop': 1, 'playlist': youtubeVideoId, 'controls': 0 },
        events: { 'onReady': (e) => e.target.setVolume(40) }
    });
}

function startMusic() {
    if (player && player.playVideo) player.playVideo();
}

// --- COUNTDOWN LOGIC ---
function updateCountdown() {
    const now = new Date().getTime();
    const distance = birthdayDate - now;
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = days < 10 ? "0" + days : days;
    document.getElementById("hours").innerText = hours < 10 ? "0" + hours : hours;
    document.getElementById("minutes").innerText = minutes < 10 ? "0" + minutes : minutes;
    document.getElementById("seconds").innerText = seconds < 10 ? "0" + seconds : seconds;
}
setInterval(updateCountdown, 1000);

// --- HERO BUTTON ACTION ---
const startBtn = document.getElementById('startBtn');
startBtn.addEventListener('click', () => {
    startBtn.classList.add('active-glow');
    startMusic();
    const nextSection = document.getElementById('countdown-trigger');
    window.scrollTo({ top: nextSection.offsetTop, behavior: 'smooth' });
});

// --- FLOATING HEARTS (MAIN SITE) ---
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = '❤️';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = Math.random() * 3 + 3 + 's';
    document.getElementById('hearts-container').appendChild(heart);
    setTimeout(() => heart.remove(), 6000);
}
setInterval(createHeart, 500);

// --- SCROLL ANIMATIONS ---
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            if (entry.target.id === 'finale') triggerFireworks();
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.fade-in-up').forEach(el => observer.observe(el));
observer.observe(document.getElementById('finale'));

// --- LIGHTBOX ---
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
document.querySelectorAll('.gallery-item img').forEach(img => {
    img.addEventListener('click', () => {
        lightbox.style.display = 'flex';
        lightboxImg.src = img.src;
        document.body.style.overflow = 'hidden';
    });
});
lightbox.addEventListener('click', () => {
    lightbox.style.display = 'none';
    if(!document.getElementById('lock-overlay')) document.body.style.overflow = 'auto';
});

// --- FIREWORKS ---
const canvas = document.getElementById('fireworksCanvas');
const ctx = canvas.getContext('2d');
let fireworksTriggered = false;

function triggerFireworks() {
    if (fireworksTriggered) return;
    fireworksTriggered = true;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let particles = [];
    const colors = ['#ff85a2', '#d4af37', '#ffffff', '#ffb3c6'];

    class Particle {
        constructor(x, y, color) {
            this.x = x; this.y = y; this.color = color;
            this.velocity = { x: (Math.random() - 0.5) * 8, y: (Math.random() - 0.5) * 8 };
            this.alpha = 1; this.friction = 0.95;
        }
        draw() {
            ctx.globalAlpha = this.alpha; ctx.beginPath();
            ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
            ctx.fillStyle = this.color; ctx.fill();
        }
        update() {
            this.velocity.x *= this.friction; this.velocity.y *= this.friction;
            this.x += this.velocity.x; this.y += this.velocity.y;
            this.alpha -= 0.01;
        }
    }

    function animate() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        if (Math.random() < 0.05) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * (canvas.height / 2);
            for (let i = 0; i < 40; i++) particles.push(new Particle(x, y, colors[Math.floor(Math.random() * colors.length)]));
        }
        particles.forEach((p, i) => { if (p.alpha > 0) { p.update(); p.draw(); } else { particles.splice(i, 1); } });
        requestAnimationFrame(animate);
    }
    animate();
}
