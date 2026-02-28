// --- CONFIGURATION ---
const birthdayDate = new Date("2026-03-04T00:00:00");
const VIDEO_ID = "dQw4w9WgXcQ"; // Your YouTube ID

// --- 1. DYNAMIC BACKGROUND SYSTEM ---
function applyRandomBackground() {
    const body = document.getElementById('dynamic-body');
    const backgrounds = ['bg-pastel-collage', 'bg-night-sky', 'bg-luxury-gold', 'bg-animated-emoji'];
    const randomBG = backgrounds[Math.floor(Math.random() * backgrounds.length)];
    
    body.classList.add(randomBG);

    // If "Night Sky" is chosen, add stars
    if (randomBG === 'bg-night-sky') {
        for(let i=0; i<50; i++) {
            let star = document.createElement('div');
            star.className = 'star';
            star.style.cssText = `position:fixed; width:2px; height:2px; background:white; top:${Math.random()*100}%; left:${Math.random()*100}%; opacity:${Math.random()}; border-radius:50%;`;
            document.body.appendChild(star);
        }
    }
}

// --- 2. DATE LOGIC & COUNTDOWN ---
function checkDateStatus() {
    const now = new Date();
    const overlay = document.getElementById('countdown-overlay');
    const mainWrapper = document.getElementById('main-wrapper');

    if (now < birthdayDate) {
        // COUNTDOWN MODE
        overlay.classList.remove('overlay-hidden');
        mainWrapper.classList.add('content-blurred');
        updateCountdownDisplay();
    } else {
        // BIRTHDAY MODE (UNLOCK)
        overlay.classList.add('overlay-hidden');
        mainWrapper.classList.remove('content-blurred');
        setTimeout(() => overlay.remove(), 1000); // Clean up DOM
    }
}

function updateCountdownDisplay() {
    const now = new Date().getTime();
    const diff = birthdayDate.getTime() - now;

    if (diff > 0) {
        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);

        // Update Overlay Timer
        document.getElementById('pre-days').innerText = d.toString().padStart(2, '0');
        document.getElementById('pre-hours').innerText = h.toString().padStart(2, '0');
        document.getElementById('pre-minutes').innerText = m.toString().padStart(2, '0');
        document.getElementById('pre-seconds').innerText = s.toString().padStart(2, '0');
    }
}

// --- 3. INITIALIZATION ---
window.onload = () => {
    applyRandomBackground();
    checkDateStatus();
    setInterval(checkDateStatus, 1000); // Real-time check for midnight transition
};

// --- 4. YOUTUBE & SURPRISE BUTTON ---
let player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '0', width: '0', videoId: VIDEO_ID,
        playerVars: { 'loop': 1, 'playlist': VIDEO_ID, 'controls': 0 },
        events: { 'onReady': (e) => e.target.setVolume(40) }
    });
}

document.getElementById('surprise-btn').addEventListener('click', () => {
    if (player && player.playVideo) player.playVideo();
    intensifyHearts(); // Use your existing heart function
    document.getElementById('message').scrollIntoView({ behavior: 'smooth' });
});

// --- KEEP YOUR EXISTING FIREWORKS AND HEARTS FUNCTIONS HERE ---
// Ensure createHeart() and startFireworks() logic remains from previous versions.
