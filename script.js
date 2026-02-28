// REPLACE WITH YOUR ACTUAL YOUTUBE VIDEO ID
const VIDEO_ID = 'yvVn8v79Dmc'; // Example: 'dQw4w9WgXcQ'

let player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '0',
        width: '0',
        videoId: VIDEO_ID,
        playerVars: { 'autoplay': 0, 'loop': 1, 'playlist': VIDEO_ID },
        events: { 'onReady': onPlayerReady }
    });
}

function onPlayerReady(event) {
    // Music is loaded but waiting for user interaction to play
}

document.addEventListener('DOMContentLoaded', () => {
    const layer1 = document.getElementById('layer1-password');
    const layer2 = document.getElementById('layer2-countdown');
    const layer3 = document.getElementById('layer3-main');

    // 1. PASSWORD LOGIC
    document.getElementById('unlockBtn').addEventListener('click', () => {
        const pass = document.getElementById('passwordInput').value;
        if (pass === 'Akki@7489') {
            // Start Music
            if (player && player.playVideo) player.playVideo();
            
            layer1.classList.add('hidden');
            checkDateAndTransition();
        } else {
            const card = document.querySelector('.card');
            card.classList.add('shake');
            setTimeout(() => card.classList.remove('shake'), 400);
        }
    });

    function checkDateAndTransition() {
        const target = new Date("March 04, 2026 00:00:00").getTime();
        const now = new Date().getTime();

        if (now >= target) {
            showLayer(layer3);
            initMainAnimations();
        } else {
            showLayer(layer2);
            startCountdown(target);
        }
    }

    function showLayer(layer) {
        layer.classList.remove('hidden');
        window.scrollTo(0, 0);
    }

    // 2. COUNTDOWN LOGIC
    function startCountdown(target) {
        const timer = setInterval(() => {
            const now = new Date().getTime();
            const diff = target - now;

            if (diff <= 0) {
                clearInterval(timer);
                layer2.classList.add('hidden');
                showLayer(layer3);
                initMainAnimations();
                return;
            }

            document.getElementById('days').innerText = Math.floor(diff / (1000 * 60 * 60 * 24));
            document.getElementById('hours').innerText = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            document.getElementById('mins').innerText = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            document.getElementById('secs').innerText = Math.floor((diff % (1000 * 60)) / 1000);
        }, 1000);
    }

    // 3. MAIN ANIMATIONS (Intersection Observer)
    function initMainAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    if (entry.target.id === 'fireworks') startFireworks();
                }
            });
        }, { threshold: 0.5 });

        document.querySelectorAll('.reveal-text').forEach(t => observer.observe(t));
        const canvas = document.getElementById('fireworks');
        if(canvas) observer.observe(canvas);
    }
});

// MEMORY REVEAL
function revealMemory() {
    const img = document.getElementById('intimate-img');
    img.classList.toggle('clear');
    const btn = document.querySelector('.reveal-btn');
    btn.innerText = img.classList.contains('clear') ? "Hide Memory" : "Tap to Feel";
}

// FIREWORKS SIMPLE ENGINE
function startFireworks() {
    const canvas = document.getElementById('fireworks');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];
    function createParticle(x, y) {
        for (let i = 0; i < 20; i++) {
            particles.push({
                x, y,
                vx: (Math.random() - 0.5) * 5,
                vy: (Math.random() - 0.5) * 5,
                life: 1,
                color: `hsl(${Math.random() * 360}, 100%, 70%)`
            });
        }
    }

    function animate() {
        ctx.fillStyle = 'rgba(0,0,0,0.1)';
        ctx.fillRect(0,0,canvas.width, canvas.height);
        particles.forEach((p, i) => {
            p.x += p.vx; p.y += p.vy; p.life -= 0.02;
            if (p.life <= 0) particles.splice(i, 1);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.life;
            ctx.fillRect(p.x, p.y, 3, 3);
        });
        if (Math.random() < 0.05) createParticle(Math.random() * canvas.width, Math.random() * canvas.height);
        requestAnimationFrame(animate);
    }
    animate();
}
