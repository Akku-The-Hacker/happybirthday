const PIN = "7489";
let currentInput = "";

function keyPress(num) {
    if (currentInput.length < 4) {
        currentInput += num;
        updateDots();
        
        // Haptic feedback feel
        if (currentInput.length === 4) {
            setTimeout(validate, 400);
        }
    }
}

function backspace() {
    currentInput = currentInput.slice(0, -1);
    updateDots();
}

function updateDots() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, i) => {
        if (i < currentInput.length) {
            dot.classList.add('filled');
        } else {
            dot.classList.remove('filled');
        }
    });
}

function validate() {
    const mainUI = document.getElementById('mainUI');
    const bg = document.getElementById('bgImage');
    const dots = document.getElementById('dotsContainer');

    if (currentInput === PIN) {
        // SUCCESS SEQUENCE
        sessionStorage.setItem("unlocked", "true");
        localStorage.setItem("unlocked", "true");

        // Moment of Clarity
        bg.style.transition = "2s ease";
        bg.style.filter = "blur(0px) brightness(0.9)";
        mainUI.style.transition = "1s ease";
        mainUI.style.opacity = "0";
        mainUI.style.transform = "scale(0.9)";

        setTimeout(() => {
            window.location.href = "countdown.html";
        }, 1200);

    } else {
        // ERROR SEQUENCE
        dots.classList.add('shake');
        currentInput = "";
        
        setTimeout(() => {
            dots.classList.remove('shake');
            updateDots();
        }, 500);
    }
}
