const CORRECT_PASSWORD = "Akki@7489";

function checkPassword() {
    const input = document.getElementById("pass-input");
    const card = document.getElementById("auth-card");
    const error = document.getElementById("error-msg");

    if (input.value === CORRECT_PASSWORD) {
        // Save session
        sessionStorage.setItem("unlocked", "true");
        // Redirect to countdown
        window.location.href = "countdown.html";
    } else {
        // Error visual feedback
        error.style.display = "block";
        input.style.borderColor = "#ff6b6b";
        card.classList.add("shake");
        
        // Remove shake class after animation finishes
        setTimeout(() => {
            card.classList.remove("shake");
        }, 400);

        // Clear input
        input.value = "";
    }
}

// Allow "Enter" key to submit
document.getElementById("pass-input").addEventListener("keypress", (e) => {
    if (e.key === "Enter") checkPassword();
});
