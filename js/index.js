const PIN = "7489";
let currentInput = "";

// Generate Sparse Cinematic Sparkles
function createSparkles() {
    const container = document.getElementById('sparkles');
    for (let i = 0; i < 8; i++) {
        const s = document.createElement('div');
        s.style.position = 'absolute';
        s.style.width = '2px';
        s.style.height = '2px';
        s.style.background = '#fff';
        s.style.left = Math.random() * 100 + '%';
        s.style.top = Math.random() * 100 + '%';
        s.style.opacity = '0.2';
        s.style.borderRadius = '50%';
        s.style.animation = `float ${5 + Math.random() * 5}s infinite alternate ease-in-out`;
        container.appendChild(s);
    }
}

function updateDots() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        index < currentInput.length ? dot.classList.add('filled') : dot.classList.remove('filled');
    });
}

function append(num) {
    if (currentInput.length < 4) {
        currentInput += num;
        updateDots();
        if (currentInput.length === 4) setTimeout(validate, 300);
    }
}

function backspace() {
    currentInput = currentInput.slice(0, -1);
    updateDots();
}

function validate() {
    const screen = document.getElementById('lock-screen');
    const msg = document.getElementById('status-msg');
    
    if (currentInput === PIN) {
        // Success Sequence
        document.body.classList.add('unlocked');
        msg.innerHTML = "Unlocking our world… 💫";
        msg.style.color = "#d4af37";
        
        const bg = document.querySelector('.bg-image');
        bg.style.filter = "blur(1px) brightness(0.8)";
        bg.style.transform = "scale(1.1)";

        sessionStorage.setItem("unlocked", "true");

        setTimeout(() => {
            document.body.style.opacity = "0";
            document.body.style.transition = "1.5s";
            setTimeout(() => window.location.href = "countdown.html", 1500);
        }, 1000);

    } else {
        // Error Sequence
        screen.classList.add('shake');
        document.body.classList.add('red-tint');
        msg.innerHTML = "Not yet, my love. 💔";
        
        setTimeout(() => {
            screen.classList.remove('shake');
            document.body.classList.remove('red-tint');
            currentInput = "";
            updateDots();
            msg.innerHTML = "Enter our little secret… ✨";
        }, 600);
    }
}

createSparkles();
