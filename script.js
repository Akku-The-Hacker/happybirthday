// --- CONFIGURATION & STATE ---
const targetDate = new Date("March 4, 2026 00:00:00").getTime();
const correctPassword = "Akki@7489";

const shayaris = [
    "Har subah tera naam lekar shuru hoti hai,\nHar raat teri yaadon mein khatam hoti hai…\nBas ek din aur kam ho gaya,\nTujhe gale lagane ke liye ❤️",
    "Waqt bhi ruk sa jaata hai,\nJab tera khayal aata hai…\nYeh countdown nahi chal raha,\nMera dil tere din ka intezaar kar raha hai 💖",
    "Har second jo beet raha hai,\nMujhe tere aur kareeb la raha hai…\nAane do woh khaas din,\nJab duniya sirf ‘Shona’ ka naam le ❤️✨",
    "Chaand bhi sharma jaaye,\nPhool bhi jhuk jaaye…\nJab tera birthday aaye,\nAur main sirf tujhe dekhte reh jaaun 💕",
    "Yeh din sirf calendar pe nahi,\nMere dil pe likha hai…\nAur har dhadkan ke saath,\Tera birthday aur kareeb aa raha hai 💓"
];

// --- AUTHENTICATION SYSTEM ---
function checkPassword() {
    const input = document.getElementById('passwordInput').value;
    const card = document.querySelector('.glass-card');
    const errorMsg = document.getElementById('error-msg');

    if (input === correctPassword) {
        sessionStorage.setItem('unlocked', 'true');
        transitionToCountdown();
        playMusic();
    } else {
        card.classList.add('shake');
        errorMsg.classList.remove('hidden');
        setTimeout(() => card.classList.remove('shake'), 400);
    }
}

function transitionToCountdown() {
    document.getElementById('layer1-password').classList.add('hidden');
    document.getElementById('layer2-countdown').classList.remove('hidden');
    document.getElementById('layer2-countdown').classList.add('active');
    initCountdown();
}

// --- COUNTDOWN LOGIC ---
function initCountdown() {
    const shayariText = shayaris[Math.floor(Math.random() * shayaris.length)];
    document.getElementById('shayari-container').innerText = shayariText;

    const interval = setInterval(() => {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            clearInterval(interval);
            showMainExperience();
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').innerText = days.toString().padStart(2, '0');
        document.getElementById('hours').innerText = hours.toString().padStart(2, '0');
        document.getElementById('minutes').innerText = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').innerText = seconds.toString().padStart(2, '0');
    }, 1000);
}

function showMainExperience() {
    document.getElementById('layer2-countdown').classList.add('hidden');
    document.getElementById('layer3-main').classList.remove('hidden');
    document.getElementById('layer3-main').classList.add('active');
    // Scroll fix
    document.body.style.overflow = "auto";
}

// --- MAIN EXPERIENCE ENHANCEMENTS ---

// Intimate memory reveal on tap
const intimateSec = document.getElementById('intimate-sec');
intimateSec.addEventListener('click', () => {
    intimateSec.classList.add('active-reveal');
    intimateSec.querySelector('.tap-hint').style.display = 'none';
});

// Scroll Reveal Animations
const observerOptions = { threshold: 0.3 };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            if (entry.target.id === 'finale') initFireworks();
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Line by line poetry reveal
const poetryObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const lines = entry.target.querySelectorAll('.poem-line');
            lines.forEach((line, index) => {
                setTimeout(() => {
                    line.style.opacity = '1';
                    line.style.transform = 'translateY(0)';
                }, index * 800);
            });
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.poetry-reveal').forEach(el => poetryObserver.observe(el));

// --- FIREWORKS SYSTEM ---
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

    function createFirework(x, y) {
        const color = `hsl(${Math.random() * 360}, 50%, 50%)`;
        for (let i = 0; i < 30; i++) particles.push(new Particle(x, y, color));
    }

    function animate() {
        requestAnimationFrame(animate);
        ctx.fillStyle = 'rgba(0,0,0,0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        particles.forEach((p, i) => {
            if (p.alpha <= 0) particles.splice(i, 1);
            else { p.update(); p.draw(); }
        });
        if (Math.random() < 0.05) createFirework(Math.random() * canvas.width, Math.random() * canvas.height);
    }
    animate();
}

// --- OPTIONAL MUSIC SYSTEM ---
let musicPlaying = false;
// To use YouTube, we replace the background with an invisible player.
function playMusic() {
    // Note: To actually use YouTube API, you'd need the iframe_api scripts. 
    // Here is a simple approach: toggle sound emoji.
    musicPlaying = true;
    const btn = document.getElementById('music-toggle');
    btn.innerText = "🎵 On";
    // console.log("Music logic: Append YouTube iframe here with &autoplay=1");
}

document.getElementById('music-toggle').addEventListener('click', () => {
    musicPlaying = !musicPlaying;
    document.getElementById('music-toggle').innerText = musicPlaying ? "🎵 On" : "🔇 Off";
});

// Check if already unlocked on refresh
window.onload = () => {
    if (sessionStorage.getItem('unlocked') === 'true') {
        transitionToCountdown();
    }
}
