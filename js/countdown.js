// SAFETY CHECK: Redirect back if they haven't logged in
if (!sessionStorage.getItem("unlocked")) {
    window.location.href = "index.html";
}

// 🎯 TARGET DATE: 4 March 2026 00:00:00
const birthdayDate = new Date("March 4, 2026 00:00:00").getTime();

// List of Shayari for the Countdown (Feel free to edit/add more)
const shayaris = [
    "Sajh gayi hain yaadein, bas tera intezaar hai... ❤️",
    "Tumhaari hansi ka noor, meri har khushi ka raaz... ✨",
    "Faasle chaahe kitne ho, tum dil ke sabse paas ho... 🌸",
    "Woh din kareeb aa raha hai, jab meri duniya ne saans li... 💖",
    "Wait is short, for an eternal birthday surprise... 💫"
];

// Display Random Shayari on load
function displayShayari() {
    const randomNum = Math.floor(Math.random() * shayaris.length);
    document.getElementById("shayari-text").innerHTML = shayaris[randomNum];
}

function updateCountdown() {
    const now = new Date().getTime();
    const distance = birthdayDate - now;

    // Time Calculations
    const d = Math.floor(distance / (1000 * 60 * 60 * 24));
    const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((distance % (1000 * 60)) / 1000);

    // Update UI
    document.getElementById("days").innerText = d < 10 ? "0"+d : d;
    document.getElementById("hours").innerText = h < 10 ? "0"+h : h;
    document.getElementById("minutes").innerText = m < 10 ? "0"+m : m;
    document.getElementById("seconds").innerText = s < 10 ? "0"+s : s;

    // 🔥 REDIRECT LOGIC: If countdown is finished
    if (distance <= 0) {
        clearInterval(timerInterval);
        window.location.href = "main.html";
    }
}

// Initialize
displayShayari();
const timerInterval = setInterval(updateCountdown, 1000);
updateCountdown();
