/**
 * RE-BUILD LOGIC
 * Month in JS is index-based (March = 2).
 * Day is normal (4).
 */
const TARGET_YEAR  = 2026;
const TARGET_MONTH = 2; // March
const TARGET_DAY   = 4;

const VIDEO_ID = "uBTEkj6Y2Kw";
const LINES = [
    "Saja rakhi hain yaadein, bas tera intezaar hai... ❤️",
    "Faasle chaahe kitne ho, tum dil ke sabse paas ho... 🌸",
    "Tumhaari hansi ka noor karega roshan ye jahaan... ✨",
    "Meri duniya tumhare din ka intezaar kar rahi hai... 💖"
];

let player;
let isRedirecting = false;

// 1. YouTube Audio Setup
function onYouTubeIframeAPIReady() {
    player = new YT.Player('audio-anchor', {
        height: '0', width: '0', videoId: VIDEO_ID,
        playerVars: { 'autoplay': 1, 'loop': 1, 'playlist': VIDEO_ID, 'controls': 0, 'modestbranding': 1 },
        events: {
            'onReady': (e) => { e.target.setVolume(35); e.target.playVideo(); }
        }
    });
}

function handleAudioControl() {
    if (!player) return;
    const icon = document.getElementById('music-icon-state');
    const state = player.getPlayerState();
    if (state === 1) { player.pauseVideo(); icon.innerHTML = "🔇"; } 
    else { player.playVideo(); icon.innerHTML = "🎵"; }
}

// 2. THE STABLE TIMER ENGINE
function updateDisplay() {
    const targetDate = new Date(TARGET_YEAR, TARGET_MONTH, TARGET_DAY, 0, 0, 0);
    const now = new Date();
    
    // Difference in Milliseconds
    const diff = targetDate.getTime() - now.getTime();

    // ERROR PROTECTION: 
    // If browser creates a weird NaN result, STOP logic from redirecting
    if (isNaN(diff)) {
        console.error("Timer Math Failed: Invalid Date calculation.");
        return;
    }

    // SCENARIO 1: Target time has NOT arrived yet (Future)
    if (diff > 0) {
        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);

        document.getElementById('d_val').textContent = d.toString().padStart(2, '0');
        document.getElementById('h_val').textContent = h.toString().padStart(2, '0');
        document.getElementById('m_val').textContent = m.toString().padStart(2, '0');
        document.getElementById('s_val').textContent = s.toString().padStart(2, '0');
    } 
    // SCENARIO 2: IT IS THE BIRTHDAY!
    else {
        if (!isRedirecting) {
            triggerBirthdayTransition();
        }
    }
}

function triggerBirthdayTransition() {
    isRedirecting = true;
    
    // Update visual text first
    document.querySelector('.intro-title').innerHTML = "It’s finally your day… 💖";
    const view = document.getElementById('countdown-view');
    view.style.opacity = "0";
    view.style.transform = "scale(1.1)";
    view.style.transition = "2s ease";

    // 2-Second Delay for transition effect
    setTimeout(() => {
        document.body.style.opacity = "0";
        document.body.style.transition = "1.5s ease";
        setTimeout(() => {
            window.location.href = "main.html"; // Final Landing Page
        }, 1500);
    }, 1000);
}

// 3. PAGE LOAD BOOTSTRAP
function initCountdown() {
    // Session Guard (Checks for PIN Unlock)
    if (sessionStorage.getItem("unlocked") !== "true") {
        window.location.href = "index.html";
        return;
    }

    // Set Shayari
    document.getElementById('shayari-inject').innerText = LINES[Math.floor(Math.random() * LINES.length)];

    // Fire Timer Every Second
    updateDisplay(); 
    setInterval(updateDisplay, 1000);
}

// Standard Browser Initiation
window.onload = initCountdown;
