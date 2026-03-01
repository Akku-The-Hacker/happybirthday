const CORRECT_PIN = "7489";
let currentInput = "";

// Generate Cinematic Floating Particles
function createParticles() {
    const container = document.getElementById('particles');
    const emojis = ['💕', '✨', '🌹', '💫', '🌸'];
    
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.top = '100vh';
        particle.style.fontSize = (Math.random() * 10 + 15) + 'px';
        particle.style.animationDuration = (Math.random() * 5 + 7) + 's';
        particle.style.animationDelay = Math.random() * 5 + 's';
        container.appendChild(particle);
    }
}

// Update Dots and Progressive Focus
function updateDots() {
    const bgImage = document.querySelector('.bg-image');
    
    // Adjust blur as she types: 0 digits (4px) -> 4 digits (0px)
    const blurLevels = ["4px", "3px", "2px", "1px", "0px"];
    bgImage.style.filter = `blur(${blurLevels[currentInput.length]}) brightness(0.6)`;

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
            // Wait slightly so the 4th dot glows before checking
            setTimeout(checkPin, 400);
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
    const bgImage = document.querySelector('.bg-image');
    status.innerHTML = "Unlocking our world… 💫";
    status.style.color = "#d4af37";
    card.classList.add('success-glow');
    
    // Zoom and clarify background dramatically
    bgImage.style.filter = "blur(0px) brightness(0.9)";
    bgImage.style.transform = "scale(1.1)";
    
    sessionStorage.setItem("unlocked", "true");

    setTimeout(() => {
        document.body.style.opacity = "0";
        document.body.style.transition = "1.5s ease-in-out";
        setTimeout(() => {
            window.location.href = "countdown.html";
        }, 1500);
    }, 1200);
}

function handleError(card, status) {
    status.innerHTML = "Not yet, my love. 💔";
    status.style.color = "#ff4d4d";
    card.classList.add('shake');
    
    setTimeout(() => {
        card.classList.remove('shake');
        currentInput = "";
        updateDots(); // Will reset blur back to 4px
        status.innerHTML = "Enter Private PIN";
        status.style.color = "rgba(255,255,255,0.7)";
    }, 800);
}

// Initialization
createParticles();
