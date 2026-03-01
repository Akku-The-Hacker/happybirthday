/**
 * TARGET: March 4, 2026, 00:00:00 
 * In JS, months are 0-11. Jan=0, Feb=1, Mar=2.
 */
const TARGET = new Date(2027, 2, 4, 0, 0, 0); 
const VIDEO_ID = "uBTEkj6Y2Kw";

const lines = [
    "Saja rakhi hain yaadein, bas tera intezaar hai... ❤️",
    "Faasle chaahe kitne ho, tum dil ke sabse paas ho... 🌸",
    "Meri duniya tumhare din ka intezaar kar rahi hai... 💖"
];

let player;
let hasRedirected = false;

// 1. YouTube Setup
function onYouTubeIframeAPIReady() {
    player = new YT.Player('yt-player', {
        height: '0', width: '0', videoId: VIDEO_ID,
        playerVars: { 'autoplay': 1, 'loop': 1, 'playlist': VIDEO_ID, 'controls': 0 },
        events: { 'onReady': (e) => { e.target.setVolume(30); e.target.playVideo(); } }
    });
}

function handleMusic() {
    const btn = document.getElementById('music-state');
    if (player.getPlayerState() === 1) { player.pauseVideo(); btn.innerHTML = "🔇"; }
    else { player.playVideo(); btn.innerHTML = "🎵"; }
}

// 2. The Fixed Timer Logic
function runTimer() {
    const now = new Date();
    const diff = TARGET.getTime() - now.getTime();

    // STABILITY GATE: 
    // If we haven't hit the target yet, strictly keep the numbers moving
    if (diff > 0) {
        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);

        // Explicitly setting innerHTML by ID
        document.getElementById('days').textContent = d.toString().padStart(2, '0');
        document.getElementById('hours').textContent = h.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = m.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = s.toString().padStart(2, '0');
    } 
    // This is ONLY for March 4 or later
    else if (!hasRedirected) {
        beginTheDayTransition();
    }
}

function beginTheDayTransition() {
    hasRedirected = true;
    document.querySelector('.header-text').innerHTML = "It's finally your day... 💖";
    
    setTimeout(() => {
        document.body.style.opacity = "0";
        document.body.style.transition = "2s ease";
        setTimeout(() => {
            window.location.href = "main.html";
        }, 2000);
    }, 1000);
}

function start() {
    // Session Guard (Check if unlocked)
    if (sessionStorage.getItem("unlocked") !== "true") {
        window.location.href = "index.html";
        return;
    }

    // Set Random Shayari
    document.getElementById('shayari-text').innerText = lines[Math.floor(Math.random() * lines.length)];

    // Initial check
    runTimer();
    // Reliable ticking
    setInterval(runTimer, 1000);
}

window.onload = start;
