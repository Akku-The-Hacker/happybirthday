const TARGET_TIME = new Date("2026-03-04T00:00:00").getTime();
const VIDEO_ID = "uBTEkj6Y2Kw";

const lines = [
    "Saja rakhi hain yaadein, bas tera intezaar hai... ❤️",
    "Faasle dil ke sabse paas hain... 🌸",
    "हर गुजरता पल बस तेरा इंतज़ार करता है… 💖",
    "वक़्त धीमे चले या तेज़, दिल सिर्फ़ तेरा ही रहता है… ✨"
];

let ytPlayer;
let isFinishing = false;

// Initialize
window.onload = () => {
    // Session Guard
    if (localStorage.getItem("shona_unlocked") !== "true") {
        window.location.href = "index.html";
        return;
    }
    
    document.getElementById('shayari-text').innerText = lines[Math.floor(Math.random()*lines.length)];
    
    updateTimer();
    setInterval(updateTimer, 1000);
};

function updateTimer() {
    const now = Date.now();
    const diff = TARGET_TIME - now;

    if (diff > 0) {
        const d = Math.floor(diff / 86400000);
        const h = Math.floor((diff % 86400000) / 3600000);
        const m = Math.floor((diff % 3600000) / 60000);
        const s = Math.floor((diff % 60000) / 1000);

        updateElement('days', d);
        updateElement('hours', h);
        updateElement('minutes', m);
        updateElement('seconds', s);
    } else if (!isFinishing) {
        triggerFinale();
    }
}

function updateElement(id, val) {
    const el = document.getElementById(id);
    const newStr = val.toString().padStart(2, '0');
    if (el.innerText !== newStr) {
        el.innerText = newStr;
        // Subtle pop animation
        el.style.transform = "scale(1.1)";
        setTimeout(() => el.style.transform = "scale(1)", 200);
    }
}

function triggerFinale() {
    isFinishing = true;
    document.querySelectorAll('.ring').forEach(r => r.classList.add('zero-burst'));
    document.getElementById('bgPhoto').style.filter = "blur(1px) brightness(0.8)";
    document.querySelector('.main-heading').innerText = "It’s finally your day… 💖";
    
    setTimeout(() => {
        document.body.style.opacity = "0";
        setTimeout(() => window.location.href = "main.html", 1500);
    }, 2000);
}

// YouTube API
function onYouTubeIframeAPIReady() {
    ytPlayer = new YT.Player('yt-player', {
        height: '0', width: '0', videoId: VIDEO_ID,
        playerVars: { 'autoplay': 1, 'loop': 1, 'playlist': VIDEO_ID, 'controls': 0 },
        events: { 'onReady': (e) => e.target.setVolume(35) }
    });
}

function toggleAudio() {
    if (ytPlayer.getPlayerState() === 1) ytPlayer.pauseVideo();
    else ytPlayer.playVideo();
}
