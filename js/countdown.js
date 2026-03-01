// --- LOGIC CONSTANTS ---
// Explicit Epoch Timestamp for March 4, 2026, 00:00:00 (GMT+5:30)
// This value is mathematically Mar 4, 2026 in Indian Time.
const TARGET_EPOCH = 1772582400000; 

const YOUTUBE_ID = "uBTEkj6Y2Kw";

const SHAYARIS = [
    "Saja rakhi hain yaadein, bas tera intezaar hai... ❤️",
    "Tumhaari hansi ka noor, meri har khushi ka raaz... ✨",
    "Faasle chaahe kitne ho, tum dil ke sabse paas ho... 🌸",
    "Wait is short, for an eternal birthday surprise... 💫",
    "Meri duniya tumhare din ka intezaar kar rahi hai... 💖"
];

// --- MUSIC LOGIC (YouTube) ---
let ytPlayer;
function onYouTubeIframeAPIReady() {
    ytPlayer = new YT.Player('yt-music-player', {
        height: '0', width: '0',
        videoId: YOUTUBE_ID,
        playerVars: { 'autoplay': 1, 'loop': 1, 'playlist': YOUTUBE_ID, 'controls': 0, 'modestbranding': 1 },
        events: {
            'onReady': (e) => { e.target.setVolume(35); e.target.playVideo(); }
        }
    });
}

function musicToggle() {
    const label = document.getElementById('music-label');
    const state = ytPlayer.getPlayerState();
    if (state === 1) { // 1 = Playing
        ytPlayer.pauseVideo();
        label.innerHTML = "🔇";
    } else {
        ytPlayer.playVideo();
        label.innerHTML = "🎵";
    }
}

// --- CORE TIMER ---
let lock_Redirect = false;

function refreshTimer() {
    const currentTime = Date.now();
    const remainingTime = TARGET_EPOCH - currentTime;

    // IF Target has NOT arrived yet
    if (remainingTime > 0) {
        const d = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
        const h = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((remainingTime % (1000 * 60)) / 1000);

        setVal('d', d); setVal('h', h); setVal('m', m); setVal('s', s);
    } 
    // IF Target arrives right NOW
    else if (!lock_Redirect) {
        fireRedirectAnimation();
    }
}

function setVal(id, v) {
    document.getElementById(id).innerText = v.toString().padStart(2, '0');
}

function fireRedirectAnimation() {
    lock_Redirect = true;
    const t = document.getElementById('main-timer');
    const h = document.querySelector('.top-heading');
    
    h.innerText = "It’s finally your day… 💖";
    t.style.transition = "2s ease";
    t.style.transform = "scale(1.2) translateY(-20px)";
    t.style.opacity = "0";

    document.querySelector('.handhold-bg').style.filter = "blur(1px) brightness(0.9)";
    
    setTimeout(() => {
        document.body.style.opacity = "0";
        document.body.style.transition = "2s ease";
        setTimeout(() => { window.location.href = "main.html"; }, 2000);
    }, 1500);
}

// --- BOOTSTRAP ---
function initializePage() {
    // 1. Double check security session from PIN page
    if (!sessionStorage.getItem("unlocked")) {
        window.location.href = "index.html";
        return;
    }

    // 2. Select Shayari
    document.getElementById('shayari-box').innerText = SHAYARIS[Math.floor(Math.random() * SHAYARIS.length)];

    // 3. Floating Sparkles Generator
    const container = document.getElementById('particles');
    for (let i = 0; i < 20; i++) {
        let p = document.createElement('span');
        p.innerText = "✨";
        p.style.left = Math.random() * 100 + 'vw';
        p.style.top = Math.random() * 100 + 'vh';
        p.style.animation = `floatingP ${8 + Math.random() * 8}s infinite ease-in-out`;
        container.appendChild(p);
    }

    // 4. Start Internal Ticking
    setInterval(refreshTimer, 1000);
    refreshTimer();
}

// Particle Floating Keyframe
const s = document.createElement('style');
s.innerHTML = `@keyframes floatingP { 0%, 100% { transform: translate(0,0); opacity: 0; } 50% { transform: translate(10px, -20px); opacity: 0.3; } }`;
document.head.appendChild(s);

document.addEventListener('DOMContentLoaded', initializePage);
