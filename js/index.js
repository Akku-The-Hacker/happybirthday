const CORRECT_PIN = "7489";
let currentInput = "";

function pressKey(num) {
    if (currentInput.length < 4) {
        currentInput += num;
        updateUI();
        if (currentInput.length === 4) setTimeout(validate, 300);
    }
}

function deleteKey() {
    currentInput = currentInput.slice(0, -1);
    updateUI();
}

function updateUI() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, i) => i < currentInput.length ? dot.classList.add('filled') : dot.classList.remove('filled'));
    // Background clarity increases with dots
    document.getElementById('bgImage').style.filter = `blur(${10 - (currentInput.length * 2.5)}px) brightness(0.6)`;
}

function validate() {
    if (currentInput === CORRECT_PIN) {
        localStorage.setItem("birthday_access", "granted");
        sessionStorage.setItem("birthday_access", "granted");
        document.querySelector('.gate-wrapper').style.opacity = "0";
        document.getElementById('bgImage').style.filter = "blur(0) brightness(0.8)";
        setTimeout(() => window.location.href = "countdown.html", 1000);
    } else {
        document.querySelector('.gate-wrapper').classList.add('shake');
        document.getElementById('status-msg').innerText = "Incorrect PIN 💔";
        setTimeout(() => {
            document.querySelector('.gate-wrapper').classList.remove('shake');
            currentInput = "";
            updateUI();
            document.getElementById('status-msg').innerText = "Enter our little secret… 🔐";
        }, 500);
    }
}
