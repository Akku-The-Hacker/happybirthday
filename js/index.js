const PIN = "7489";
let currentInput = "";

// Floating Romantic Sparkles/Emojis
function initDrama() {
    const layer = document.getElementById('emoji-layer');
    const items = ['✨', '💖', '🌸', '💫', '🌹'];
    
    for (let i = 0; i < 15; i++) {
        const span = document.createElement('span');
        span.innerHTML = items[Math.floor(Math.random() * items.length)];
        span.style.position = 'absolute';
        span.style.left = Math.random() * 100 + 'vw';
        span.style.top = Math.random() * 100 + 'vh';
        span.style.opacity = '0.2';
        span.style.fontSize = '20px';
        span.style.pointerEvents = 'none';
        span.style.animation = `floatBreath ${5 + Math.random() * 5}s infinite ease-in-out`;
        layer.appendChild(span);
    }
}

function updateDots() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((d, i) => {
        i < currentInput.length ? d.classList.add('active') : d.classList.remove('active');
    });
}

function tap(n) {
    if (currentInput.length < 4) {
        currentInput += n;
        updateDots();
        // Feedback haptic visual
        if (currentInput.length === 4) setTimeout(verify, 300);
    }
}

function del() {
    currentInput = currentInput.slice(0, -1);
    updateDots();
}

function verify() {
    const body = document.body;
    const label = document.getElementById('status-label');
    const dots = document.getElementById('dot-row');

    if (currentInput === PIN) {
        // CORRECT: SUCCESS ANIMATION
        label.innerHTML = "Our Story Unfolds… 🕊️";
        label.style.color = "#e2c08d";
        label.style.textShadow = "0 0 10px gold";
        
        const bg = document.querySelector('.bg-image');
        bg.style.filter = "blur(0px) brightness(1)"; // Final clarity
        bg.style.transform = "scale(1)"; 
        bg.style.transition = "2s ease";

        setTimeout(() => {
            body.style.opacity = "0";
            body.style.transition = "1.5s ease-out";
            setTimeout(() => window.location.href = "countdown.html", 1500);
        }, 1000);

    } else {
        // WRONG: DRAMATIC REJECTION
        label.innerHTML = "Not yet, my love. 💔";
        label.style.color = "#ff4d4d";
        dots.classList.add('shake-dramatic');
        
        setTimeout(() => {
            dots.classList.remove('shake-dramatic');
            currentInput = "";
            updateDots();
            label.innerHTML = "Enter our little secret… 🔐";
            label.style.color = "rgba(255,255,255,0.6)";
        }, 800);
    }
}

// Float Animation Script
const style = document.createElement('style');
style.innerHTML = `
    @keyframes floatBreath {
        0%, 100% { transform: translateY(0) scale(1); opacity: 0.1; }
        50% { transform: translateY(-30px) scale(1.2); opacity: 0.4; }
    }
`;
document.head.appendChild(style);

initDrama();
