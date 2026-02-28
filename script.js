// --- CONFIGURATION ---
const birthdayDate = new Date("2026-03-04T00:00:00");
const youtubeVideoId = "l482T0yNkeo"; // INSERT YOUR YOUTUBE VIDEO ID HERE (Romantic Song)

// --- YOUTUBE API ---
let player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('youtube-player', {
        height: '0',
        width: '0',
        videoId: youtubeVideoId,
        playerVars: {
            'autoplay': 0,
            'loop': 1,
            'playlist': youtubeVideoId,
            'controls': 0
        },
        events: {
            'onReady': onPlayerReady
        }
    });
}

function onPlayerReady(event) {
    event.target.setVolume(40);
}

function startMusic() {
    if (player && player.playVideo) {
        player.playVideo();
    }
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

    if (distance < 0) {
        document.querySelector(".countdown-container").innerHTML = "<h3>The Special Day is Here! 💖</h3>";
    }
}
setInterval(updateCountdown, 1000);

// --- HERO BUTTON ACTION ---
const startBtn = document.getElementById('startBtn');
startBtn.addEventListener('click', () => {
    startBtn.classList.add('active-glow');
    startMusic();
    
    // Smooth scroll to next section
    const nextSection = document.getElementById('countdown-trigger');
    window.scrollTo({
        top: nextSection.offsetTop,
        behavior: 'smooth'
    });
});

// --- FLOATING HEARTS ---
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = '❤️';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = Math.random() * 3 + 3 + 's';
    heart.style.fontSize = Math.random() * 20 + 10 + 'px';
    document.getElementById('hearts-container').appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 6000);
}
setInterval(createHeart, 500);

// --- INTERSECTION OBSERVER (Scroll Animations) ---
const observerOptions = {
    threshold: 0.15
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            if (entry.target.id === 'finale') {
                triggerFireworks();
            }
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in-up').forEach(el => observer.observe(el));
observer.observe(document.getElementById('finale'));

// --- GALLERY LIGHTBOX ---
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.close-lightbox');

document.querySelectorAll('.gallery-item img').forEach(img => {
    img.addEventListener('click', () => {
        lightbox.style.display = 'flex';
        lightboxImg.src = img.src;
        document.body.style.overflow = 'hidden'; // Prevent scroll
    });
});

lightbox.addEventListener('click', (e) => {
    if (e.target !== lightboxImg) {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// --- FIREWORKS SYSTEM ---
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
            this.x = x;
            this.y = y;
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

    function createFirework() {
        const x = Math.random() * canvas.width;
        const y = Math.random() * (canvas.height / 2);
        const color = colors[Math.floor(Math.random() * colors.length)];
        for (let i = 0; i < 40; i++) {
            particles.push(new Particle(x, y, color));
        }
    }

    let animationId;
    let startTime = Date.now();

    function animate() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        if (Math.random() < 0.05 && (Date.now() - startTime) < 7000) {
            createFirework();
        }

        particles.forEach((p, i) => {
            if (p.alpha > 0) {
                p.update();
                p.draw();
            } else {
                particles.splice(i, 1);
            }
        });

        if ((Date.now() - startTime) < 8000 || particles.length > 0) {
            animationId = requestAnimationFrame(animate);
        } else {
            cancelAnimationFrame(animationId);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }
    animate();
}
