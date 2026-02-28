const targetDate = new Date("March 4, 2026 00:00:00").getTime();
const correctPassword = "Akki@7489";

const shayaris = [
    "Har subah tera naam lekar shuru hoti hai,\nHar raat teri yaadon mein khatam hoti hai… ❤️",
    "Waqt bhi ruk sa jaata hai,\nJab tera khayal aata hai… 💖",
    "Har second jo beet raha hai,\nMujhe tere aur kareeb la raha hai… ✨",
    "Chaand bhi sharma jaaye, phool bhi jhuk jaaye…\nJab tera birthday aaye 💕",
    "Yeh din mere dil pe likha hai…\nHar dhadkan ke saath, tumhare kareeb laata hai 💓"
];

// 1. Password Protection
function checkPassword() {
    const input = document.getElementById('passwordInput').value;
    const loginCard = document.querySelector('.login-card');
    const errorMsg = document.getElementById('error-msg');

    if (input === correctPassword) {
        sessionStorage.setItem('surpriseUnlocked', 'true');
        proceed();
    } else {
        loginCard.classList.add('shake');
        errorMsg.classList.remove('hidden');
        setTimeout(() => loginCard.classList.remove('shake'), 500);
    }
}

function proceed() {
    const now = new Date().getTime();
    if (now >= targetDate) {
        showMainExperience();
    } else {
        showCountdown();
    }
}

// 2. Navigation
function showCountdown() {
    document.getElementById('layer1-password').classList.replace('active', 'hidden');
    document.getElementById('layer2-countdown').classList.replace('hidden', 'active');
    
    // Pick random Shayari
    document.getElementById('shayari-text').innerText = shayaris[Math.floor(Math.random() * shayaris.length)];
    
    startTimer();
}

function startTimer() {
    const timer = setInterval(() => {
        const now = new Date().getTime();
        const diff = targetDate - now;

        if (diff < 0) {
            clearInterval(timer);
            showMainExperience();
            return;
        }

        document.getElementById('days').innerText = Math.floor(diff / (86400000)).toString().padStart(2, '0');
        document.getElementById('hours').innerText = Math.floor((diff % 86400000) / 3600000).toString().padStart(2, '0');
        document.getElementById('minutes').innerText = Math.floor((diff % 3600000) / 60000).toString().padStart(2, '0');
        document.getElementById('seconds').innerText = Math.floor((diff % 60000) / 1000).toString().padStart(2, '0');
    }, 1000);
}

function showMainExperience() {
    document.getElementById('layer1-password').classList.add('hidden');
    document.getElementById('layer2-countdown').classList.add('hidden');
    document.getElementById('layer3-main').classList.replace('hidden', 'active');
}

// 3. Scroll Interactions & Reveal Animations
const observerOptions = { threshold: 0.2 };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            if(entry.target.id === 'finale-sec') startFireworks();
        }
    });
}, observerOptions);

document.querySelectorAll('.content-reveal, .poetry-container').forEach(el => observer.observe(el));

// 4. Memory Section Reveal (Tap to unblur)
document.getElementById('memory-sec').addEventListener('click', function() {
    this.classList.add('revealed');
    this.querySelector('.tap-hint').style.display = 'none';
});

// 5. Simple Fireworks
function startFireworks() {
    const canvas = document.getElementById('fireworksCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let particles = [];

    function Particle(x, y) {
        this.x = x; this.y = y;
        this.vx = (Math.random() - 0.5) * 10;
        this.vy = (Math.random() - 0.5) * 10;
        this.alpha = 1;
        this.color = `hsl(${Math.random() * 360}, 70%, 50%)`;
        this.update = function() {
            this.x += this.vx; this.y += this.vy; this.alpha -= 0.015;
        };
        this.draw = function() {
            ctx.globalAlpha = this.alpha;
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
            ctx.fill();
        };
    }

    function animate() {
        if(particles.length < 50) {
            for(let i=0; i<5; i++) particles.push(new Particle(Math.random()*canvas.width, Math.random()*canvas.height));
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles = particles.filter(p => p.alpha > 0);
        particles.forEach(p => { p.update(); p.draw(); });
        requestAnimationFrame(animate);
    }
    animate();
}

// 6. Audio Toggle
const musicToggle = document.getElementById('music-toggle');
let isMusicOn = false;
musicToggle.addEventListener('click', () => {
    if(!isMusicOn) {
        // Replacement for real YT audio (user replaces VIDEO_ID)
        document.getElementById('player').innerHTML = `<iframe src="https://www.youtube.com/embed/SOf-hD8mX0Y?autoplay=1&loop=1" allow="autoplay"></iframe>`;
        musicToggle.innerText = "🔊 Playing";
        isMusicOn = true;
    } else {
        document.getElementById('player').innerHTML = "";
        musicToggle.innerText = "🔇 Paused";
        isMusicOn = false;
    }
});
