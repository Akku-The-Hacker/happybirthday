// --- CONFIGURATION ---
const TARGET_DATE = new Date("March 4, 2020 00:00:00").getTime();
const PASSWORD = "Akki@7489";

// --- LAYER HANDLERS ---
const L1 = document.getElementById('layer1-password');
const L2 = document.getElementById('layer2-countdown');
const L3 = document.getElementById('layer3-main');

function switchLayer(from, to) {
    from.classList.add('hidden');
    setTimeout(() => {
        from.style.display = 'none';
        to.style.display = 'block';
        setTimeout(() => to.classList.remove('hidden'), 50);
    }, 800);
}

// --- PASSWORD SYSTEM ---
document.getElementById('unlockBtn').addEventListener('click', handleUnlock);
document.getElementById('passwordInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleUnlock();
});

function handleUnlock() {
    const input = document.getElementById('passwordInput');
    const error = document.getElementById('login-error');
    
    if (input.value === PASSWORD) {
        sessionStorage.setItem('shona_unlocked', 'true');
        checkDateAndSwitch();
    } else {
        input.parentElement.classList.add('shake');
        error.classList.remove('hidden');
        setTimeout(() => input.parentElement.classList.remove('shake'), 400);
        input.value = "";
    }
}

function checkDateAndSwitch() {
    const now = new Date().getTime();
    if (now >= TARGET_DATE) {
        switchLayer(L1, L3);
        initMain();
    } else {
        switchLayer(L1, L2);
        startCountdown();
    }
}

// --- COUNTDOWN SYSTEM ---
function startCountdown() {
    const timerBox = document.getElementById('timer');
    
    const interval = setInterval(() => {
        const now = new Date().getTime();
        const diff = TARGET_DATE - now;

        if (diff <= 0) {
            clearInterval(interval);
            switchLayer(L2, L3);
            initMain();
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const secs = Math.floor((diff % (1000 * 60)) / 1000);

        timerBox.innerHTML = `
            <div class="time-unit"><span>${days}</span>Days</div>
            <div class="time-unit"><span>${hours}</span>Hrs</div>
            <div class="time-unit"><span>${mins}</span>Min</div>
            <div class="time-unit"><span>${secs}</span>Sec</div>
        `;
    }, 1000);
}

// --- MAIN WEBSITE INIT ---
function initMain() {
    initSlideshow();
    initMessage();
    initGallery();
    initPrivate();
    initFireworks();
}

// 1. Slideshow
function initSlideshow() {
    const slides = document.querySelectorAll('.slide');
    let idx = 0;
    setInterval(() => {
        slides[idx].classList.remove('active');
        idx = (idx + 1) % slides.length;
        slides[idx].classList.add('active');
    }, 7000);
}

// 2. Typewriter Message
function initMessage() {
    const lines = [
        "To my dearest Shona...",
        "Every day with you is a gift.",
        "You are my heart's greatest joy.",
        "Today we celebrate the best day...",
        "The day you were born. ❤️"
    ];
    const container = document.getElementById('animated-message');
    
    let lineIdx = 0;
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && lineIdx === 0) {
            const showLine = () => {
                if (lineIdx < lines.length) {
                    const p = document.createElement('p');
                    p.innerText = lines[lineIdx];
                    container.appendChild(p);
                    setTimeout(() => p.classList.add('visible'), 50);
                    lineIdx++;
                    setTimeout(showLine, 1500);
                }
            };
            showLine();
        }
    });
    observer.observe(container);
}

// 3. Gallery Lightbox
function initGallery() {
    const lb = document.getElementById('lightbox');
    const lbImg = document.getElementById('lightbox-img');
    
    document.querySelectorAll('.gallery-img').forEach(img => {
        img.addEventListener('click', () => {
            lbImg.src = img.src;
            lb.classList.remove('hidden');
        });
    });
    
    lb.addEventListener('click', () => lb.classList.add('hidden'));
}

// 4. Private Unlock
function initPrivate() {
    const container = document.querySelector('.private-container');
    const img = document.getElementById('private-img');
    const hint = document.getElementById('private-tap-hint');
    
    container.addEventListener('click', () => {
        img.classList.add('unblur');
        hint.style.display = 'none';
    });
}

// 5. Fireworks
function initFireworks() {
    const canvas = document.getElementById("fireworks");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = 300;

    let particles = [];

    class Particle {
        constructor() {
            this.reset();
        }
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = canvas.height;
            this.vx = Math.random() * 4 - 2;
            this.vy = -(Math.random() * 5 + 5);
            this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
            this.alpha = 1;
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.vy += 0.1;
            this.alpha -= 0.01;
            if (this.alpha <= 0) this.reset();
        }
        draw() {
            ctx.globalAlpha = this.alpha;
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    for (let i = 0; i < 50; i++) particles.push(new Particle());

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => { p.update(); p.draw(); });
        requestAnimationFrame(animate);
    }
    animate();
}

// --- GLOBAL HEARTS ---
function createHeart() {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.innerHTML = '❤️';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = (Math.random() * 2 + 2) + 's';
    document.getElementById('hearts-container').appendChild(heart);
    setTimeout(() => heart.remove(), 4000);
}
setInterval(createHeart, 600);

// Session check
if (sessionStorage.getItem('shona_unlocked') === 'true') {
    checkDateAndSwitch();
}
