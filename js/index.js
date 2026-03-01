const CORRECT_PIN = "7489";
let currentInput = "";

function append(num) {
    if (currentInput.length < 4) {
        currentInput += num;
        updateDots();
        if (currentInput.length === 4) setTimeout(verify, 300);
    }
}

function backspace() {
    currentInput = currentInput.slice(0, -1);
    updateDots();
}

function updateDots() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        if (index < currentInput.length) dot.classList.add('filled');
        else dot.classList.remove('filled');
    });
}

function verify() {
    if (currentInput === CORRECT_PIN) {
        // STRONG SET: Save the unlock state
        sessionStorage.setItem("unlocked", "true");
        localStorage.setItem("unlocked", "true"); // Double insurance
        
        document.getElementById('status-msg').innerHTML = "Unlocking... ✨";
        
        // Force a direct jump
        window.location.href = "countdown.html";
    } else {
        const card = document.getElementById('main-card') || document.getElementById('lock-screen');
        card.classList.add('shake');
        document.getElementById('status-msg').innerHTML = "Incorrect PIN 💔";
        setTimeout(() => {
            card.classList.remove('shake');
            currentInput = "";
            updateDots();
            document.getElementById('status-msg').innerHTML = "Enter Private PIN";
        }, 600);
    }
}
