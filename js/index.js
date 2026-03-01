const CORRECT_PIN = "7489";
let currentInput = "";

// 1. Create Romance Particles
function initParticles() {
    const container = document.getElementById('particles');
    const emojis = ['💕', '✨', '🌹', '💫'];
    for (let i = 0; i < 12; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        p.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
        p.style.left = Math.random() * 100 + 'vw';
        p.style.top = '100vh';
        p.style.fontSize = (Math.random() * 10 + 15) + 'px';
        p.style.animationDuration = (Math.random() * 5 + 6) + 's';
        p.style.animationDelay = Math.random() * 5 + 's';
        container.appendChild(p);
    }
}

// 2. Progressive Clear & Dots
function updateState() {
    const bg = document.querySelector('.bg-image');
    // Reduce blur progressively: 4px -> 3px -> 2px -> 1px -> 0px
    const blurs = ["4px", "3px", "2px", "1px", "0px"];
    bg.style.filter = `blur(${blurs[currentInput.length]}) brightness(0.6)`;

    for (let i = 0; i < 4; i++) {
        const dot = document.getElementById(`dot-${i}`);
        i < currentInput.length ? dot.classList.add('active') : dot.classList.remove('active');
    }
}

// 3. Logic
function pressKey(num) {
    if (currentInput.length < 4) {
        currentInput += num;
        updateState();
        if (currentInput.length === 4) setTimeout(checkPin, 400);
    }
}

function deleteKey() {
    currentInput = currentInput.slice(0, -1);
    updateState();
}

function checkPin() {
    const card = document.getElementById('main-card');
    const status = document.getElementById('status-msg');

    if (currentInput === CORRECT_PIN) {
        status.innerHTML = "Accessing our world… 💫";
        status.style.color = "#d4af37";
        card.style.borderColor = "#d4af37";
        document.querySelector('.bg-image').style.transform = "scale(1.15)";
        document.querySelector('.bg-image').style.filter = "blur(0px) brightness(0.8)";
        
        sessionStorage.setItem("unlocked", "true");
        setTimeout(() => {
            document.body.style.opacity = "0";
            document.body.style.transition = "1.2s ease";
            setTimeout(() => window.location.href = "countdown.html", 1200);
        }, 1000);
    } else {
        status.innerHTML = "Not for you, stranger. 💔";
        status.style.color = "#ff4d4d";
        card.classList.add('shake');
        setTimeout(() => {
            card.classList.remove('shake');
            currentInput = "";
            updateState();
            status.innerHTML = "Enter Private PIN";
            status.style.color = "rgba(255,255,255,0.6)";
        }, 800);
    }
}

initParticles();
