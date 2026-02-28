// CONFIGURATION
const BIRTHDAY_DATE = "March 4, 2026 00:00:00";
const PASSWORD = "Akki@7489";
const YOUTUBE_ID = "l482T0yNkeo"; // Change this to your YouTube Video ID

// DOM ELEMENTS
const lockScreen = document.getElementById('lock-screen');
const mainContent = document.getElementById('main-content');
const passwordField = document.getElementById('passwordField');
const unlockBtn = document.getElementById('unlockBtn');
const errorMsg = document.getElementById('errorMsg');

// --- 🔐 PASSWORD LOGIC ---
unlockBtn.addEventListener('click', () => {
    if (passwordField.value === PASSWORD) {
        sessionStorage.setItem('unlocked', 'true');
        lockScreen.style.transition = "opacity 1s ease";
        lockScreen.style.opacity = "0";
        setTimeout(() => {
            lockScreen.classList.add('hidden');
            showMainContent();
        }, 1000);
    } else {
        passwordField.classList.add('shake');
        errorMsg.style.display = 'block';
        setTimeout(() => passwordField.classList.remove('shake'), 400);
        passwordField.value = "";
    }
});

function showMainContent() {
    mainContent.classList.remove('hidden');
    initApp();
}

// --- 🎵 MUSIC (YOUTUBE API) ---
let player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('youtube-player', {
        height: '0', width: '0',
        videoId: YOUTUBE_ID,
        playerVars: { 'autoplay': 1, 'loop': 1, 'playlist': YOUTUBE_ID },
        events: { 'onReady': (e) => e.target.mute() }
    });
}

document.getElementById('musicToggle').addEventListener('click', () => {
    if (player.isMuted()) {
        player.unMute();
        player.playVideo();
    } else {
        player.mute();
    }
});

// --- 📸 SLIDESHOW ---
function initSlideshow() {
    const slides = document.querySelectorAll('#hero .slide');
    let current = 0;
    setInterval(() => {
        slides[current].classList.remove('active');
        current = (current + 1) % slides.length;
        slides[current].classList.add('active');
    }, 7000);
}

function initHerSlides() {
    const slides = document.querySelectorAll('.her-slide');
    let current = 0;
    setInterval(() => {
        slides[current].classList.remove('active');
        current = (current + 1) % slides.length;
        slides[current].classList.add('active');
    }, 4000);
}

// --- ⏳ COUNTDOWN ---
function initCountdown() {
    const target = new Date(BIRTHDAY_DATE).getTime();
    setInterval(() => {
        const now = new Date().getTime();
        const diff = target - now;

        if (diff <= 0) {
            document.getElementById('timer-wrapper').classList.add('hidden');
            document.getElementById('birthday-msg').classList.remove('hidden');
            return;
        }

        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);

        document.getElementById('days').innerText = d;
        document.getElementById('hours').innerText = h;
        document.getElementById('minutes').innerText = m;
        document.getElementById('seconds').innerText = s;
    }, 1000);
}

// --- ✍️ TYPEWRITER ---
function initTypewriter() {
    const text = "To the most amazing person in my life... Every day feels like a blessing with you. You are my joy, my peace, and my home. Today is all about you. Happy Birthday Shona! 💖";
    const container = document.getElementById('typed-text');
    let i = 0;

    const observer = new IntersectionObserver((entries) => {
        if(entries[0].isIntersecting) {
            function type() {
                if (i < text.length) {
                    container.innerHTML += text.charAt(i);
                    i++;
                    setTimeout(type, 50);
                }
            }
            type();
            observer.disconnect();
        }
    }, { threshold: 0.5 });
    observer.observe(document.getElementById('love-letter'));
}

// --- ✨ FIREWORKS ---
function initFireworks() {
    const canvas = document.getElementById('fireworksCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];
    class Particle {
        constructor(x, y, color) {
            this.x = x; this.y = y; this.color = color;
            this.velocity = { x: (Math.random() - 0.5) * 8, y: (Math.random() - 0.5) * 8 };
            this.alpha = 1;
        }
        draw() {
            ctx.globalAlpha = this.alpha;
            ctx.beginPath(); ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
            ctx.fillStyle = this.color; ctx.fill();
        }
        update() { this.x += this.velocity.x; this.y += this.velocity.y; this.alpha -= 0.01; }
    }

    function animate() {
        ctx.fillStyle = 'rgba(0,0,0,0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        if (Math.random() < 0.1) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            for(let i=0; i<30; i++) particles.push(new Particle(x, y, `hsl(${Math.random()*360}, 100%, 50%)`));
        }
        particles.forEach((p, idx) => {
            if (p.alpha <= 0) particles.splice(idx, 1);
            else { p.update(); p.draw(); }
        });
        requestAnimationFrame(animate);
    }

    const observer = new IntersectionObserver((entries) => {
        if(entries[0].isIntersecting) animate();
    });
    observer.observe(document.getElementById('finale'));
}

// --- 🖼️ LIGHTBOX ---
function initGallery() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = lightbox.querySelector('img');
    document.querySelectorAll('.gallery-card').forEach(img => {
        img.addEventListener('click', () => {
            lightboxImg.src = img.src;
            lightbox.style.display = 'flex';
        });
    });
    document.querySelector('.close-lightbox').onclick = () => lightbox.style.display = 'none';
}

// --- ❤️ HEART PARTICLES ---
function createHeart(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const heart = document.createElement('div');
    heart.className = 'heart-particle';
    heart.innerHTML = '❤️';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.fontSize = (Math.random() * 20 + 10) + 'px';
    container.appendChild(heart);
    setTimeout(() => heart.remove(), 4000);
}

function initApp() {
    initSlideshow();
    initCountdown();
    initTypewriter();
    initGallery();
    initHerSlides();
    initFireworks();
    setInterval(() => createHeart('hero-hearts'), 600);
}

window.onload = () => {
    if (sessionStorage.getItem('unlocked') === 'true') showMainContent();
};
