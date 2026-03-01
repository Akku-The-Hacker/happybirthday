const CORRECT_PIN = "7489";
let currentInput = "";

// Generate Floating Particles (Hearts, Stars, Flowers)
function createParticles() {
    const container = document.getElementById('particles');
    const emojis = ['💕', '✨', '🌹', '💫', '🌸'];
    
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.fontSize = (Math.random() * 10 + 15) + 'px';
        particle.style.animationDuration = (Math.random() * 5 + 7) + 's';
        particle.style.animationDelay = Math.random() * 5 + 's';
        container.appendChild(particle);
    }
}

function updateDots() {
    for (let i = 0; i < 4; i++) {
        const dot = document.getElementById(`dot-${i}`);
        if (i < currentInput.length) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    }
}

function pressKey(num) {
    if (currentInput.length < 4) {
        currentInput += num;
        updateDots();
        
        if (currentInput.length === 4) {
            setTimeout(checkPin, 300);
        }
    }
}

function deleteKey() {
    currentInput = currentInput.slice(0, -1);
    updateDots();
}

function checkPin() {
    const card = document.getElementById('main-card');
    const status = document.getElementById('status-msg');

    if (currentInput === CORRECT_PIN) {
        handleSuccess(card, status);
    } else {
        handleError(card, status);
    }
}

function handleSuccess(card, status) {
    status.innerHTML = "Unlocking our world… 💫";
    status.style.color = "#d4af37";
    card.classList.add('success-glow');
    
    // Smooth cinematic transition
    document.querySelector('.bg-image').style.filter = "blur(2px) brightness(0.8)";
    sessionStorage.setItem("unlocked", "true");

    setTimeout(() => {
        document.body.style.opacity = "0";
        document.body.style.transition = "1.5s";
        setTimeout(() => {
            window.location.href = "countdown.html";
        }, 1500);
    }, 1000);
}

function handleError(card, status) {
    status.innerHTML = "Wrong PIN, Love. Try again. 💔";
    status.style.color = "#ff4d4d";
    card.classList.add('shake');
    
    setTimeout(() => {
        card.classList.remove('shake');
        currentInput = "";
        updateDots();
        status.innerHTML = "Enter Private PIN";
        status.style.color = "rgba(255,255,255,0.7)";
    }, 600);
}

// Init
createParticles();
