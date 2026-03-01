// --- CONFIGURATION ---
// Explicit date format: Year, Month (0-11, so March is 2), Day, Hour, Min, Sec
const TARGET_DATE = new Date(2026, 2, 4, 0, 0, 0).getTime(); 
const VIDEO_ID = "uBTEkj6Y2Kw";

const SHAYARIS = [
    "Tere aane ki khushi, aur tera intezaar... 🌸",
    "Tumhaari hansi ka noor karega roshan ye jahaan... ✨",
    "Bas kuch hi ghante bache hain, mere chaand se milne mein... 💖",
    "Saja rakhi hain yaadein, bas tumhaara din aana baaki hai... ❤️"
];

// --- DEBUGGER: REMOVE THIS ONCE FIXED ---
function debugTime() {
    const now = new Date();
    const target = new Date(TARGET_DATE);
    console.log("Device Time: " + now);
    console.log("Target Time: " + target);
    console.log("Difference (ms): " + (TARGET_DATE - now.getTime()));
}

// --- YOUTUBE API ---
let player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '0', width: '0',
        videoId: VIDEO_ID,
        playerVars: { 'autoplay': 1, 'loop': 1, 'playlist': VIDEO_ID, 'controls': 0, 'modestbranding': 1 },
        events: {
            'onReady': (e) => { e.target.setVolume(35); e.target.playVideo(); },
            'onError': (e) => { console.log("YouTube Error: ", e); }
        }
    });
}

function toggleMusic() {
    if (!player) return;
    const btn = document.getElementById('music-icon');
    if (player.getPlayerState() === 1) { // Playing
        player.pauseVideo();
        btn.innerHTML = "🔇";
    } else {
        player.playVideo();
        btn.innerHTML = "🎵";
    }
}

// --- COUNTDOWN LOGIC ---
let isRedirecting = false;

function updateTimer() {
    const now = new Date().getTime();
    const diff = TARGET_DATE - now;

    // PROTECTION: If it's earlier than March 4, DO NOT REDIRECT
    if (diff <= 0) {
        if (!isRedirecting) {
            handleRedirect();
        }
        return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diff % (1000 * 60)) / 1000);

    // Update the numbers if the elements exist
    safeSetText('days', d);
    safeSetText('hours', h);
    safeSetText('minutes', m);
    safeSetText('seconds', s);
}

function safeSetText(id, value) {
    const el = document.getElementById(id);
    if (el) el.innerText = value.toString().padStart(2, '0');
}

function handleRedirect() {
    isRedirecting = true;
    console.log("Redirecting to Main Experience...");
    
    const bg = document.querySelector('.bg-image');
    if (bg) {
        bg.style.filter = "blur(0px)";
        bg.style.transform = "scale(1)";
    }

    setTimeout(() => {
        // IMPORTANT: Make sure you have created main.html in your folder!
        window.location.href = "main.html"; 
    }, 2000);
}

// --- INITIALIZE ---
function init() {
    debugTime();

    // 1. Session Protection (Is she logged in?)
    if (!sessionStorage.getItem("unlocked")) {
        console.warn("Unauthorized access - Redirecting to Lock Screen");
        window.location.href = "index.html";
        return;
    }

    // 2. Load random shayari
    const sDisplay = document.getElementById('shayari-display');
    if (sDisplay) {
        sDisplay.innerText = SHAYARIS[Math.floor(Math.random() * SHAYARIS.length)];
    }

    // 3. Start Heartbeat timer
    setInterval(updateTimer, 1000);
    updateTimer(); 
}

document.addEventListener('DOMContentLoaded', init);
