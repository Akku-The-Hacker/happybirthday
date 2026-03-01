const CORRECT_PIN = "7489";
let currentInput = "";

function keyPress(n) {
    if(currentInput.length < 4) {
        currentInput += n;
        updateUI();
        if(currentInput.length === 4) setTimeout(validate, 400);
    }
}
function backspace() { currentInput = currentInput.slice(0, -1); updateUI(); }

function updateUI() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((d, i) => i < currentInput.length ? d.classList.add('filled') : d.classList.remove('filled'));
}

function validate() {
    if(currentInput === CORRECT_PIN) {
        localStorage.setItem("shona_unlocked", "true");
        document.getElementById('mainUI').style.opacity = "0";
        document.getElementById('bgImage').style.filter = "blur(0) brightness(0.8)";
        setTimeout(() => window.location.href = "countdown.html", 1000);
    } else {
        document.getElementById('dots').classList.add('shake');
        setTimeout(() => {
            document.getElementById('dots').classList.remove('shake');
            currentInput = ""; updateUI();
        }, 500);
    }
}
