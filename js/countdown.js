// MARCH 4, 2026 00:00:00
const targetDate = new Date(2026, 2, 4, 0, 0, 0).getTime();

const shayaris = [
    "Saja rakhi hain yaadein, bas tera intezaar hai... ❤️",
    "Tumhaari hansi ka noor karega roshan ye jahaan... ✨",
    "Meri duniya tumhare din ka intezaar kar rahi hai... 💖"
];

let player;

// YouTube API
function onYouTubeIframeAPIReady() {
    player = new YT.Player('audio-anchor', {
        height: '0', width: '0', videoId: "uBTEkj6Y2Kw",
        playerVars: { 'autoplay': 1, 'loop': 1, 'playlist': "uBTEkj6Y2Kw", 'controls': 0 },
        events: { 'onReady': (e) => { e.target.setVolume(30); e.target.playVideo(); }}
    });
}

function updateTimer() {
    const now = new Date().getTime();
    const diff = targetDate - now;

    // Elements check to prevent crashing
    const dEl = document.getElementById('d_val');
    const hEl = document.getElementById('h_val');
    const mEl = document.getElementById('m_val');
    const sEl = document.getElementById('s_val');

    if (diff > 0) {
        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);

        if (dEl) dEl.innerText = d.toString().padStart(2, '0');
        if (hEl) hEl.innerText = h.toString().padStart(2, '0');
        if (mEl) mEl.innerText = m.toString().padStart(2, '0');
        if (sEl) sEl.innerText = s.toString().padStart(2, '0');
    } else {
        // IT IS TIME!
        window.location.href = "main.html";
    }
}

// Simple Toggle
window.handleAudioControl = function() {
    if(!player) return;
    if(player.getPlayerState() === 1) player.pauseVideo();
    else player.playVideo();
}

// BOOTSTRAP
window.onload = function() {
    // REDIRECT PROTECTION
    const isUnlocked = sessionStorage.getItem("unlocked") || localStorage.getItem("unlocked");
    if (isUnlocked !== "true") {
        console.log("Not unlocked, returning...");
        // If it's still sending you back, uncomment the next line to debug
        // window.location.href = "index.html"; 
    }

    // Set Shayari safely
    const sBox = document.getElementById('shayari-inject');
    if (sBox) sBox.innerText = shayaris[Math.floor(Math.random() * shayaris.length)];

    // Start Ticking
    setInterval(updateTimer, 1000);
    updateTimer();
};
