// --- CONFIGURATION ---
// Use the ISO format (YYYY-MM-DDTHH:MM:SS) for the best browser compatibility
const TARGET_DATE_STRING = "2026-03-04T00:00:00";
const TARGET_DATE = new Date(TARGET_DATE_STRING).getTime();
const VIDEO_ID = "uBTEkj6Y2Kw";

const SHAYARIS = [
    "Tere aane ki khushi, aur tera intezaar... 🌸",
    "Tumhaari hansi ka noor karega roshan ye jahaan... ✨",
    "Bas kuch hi ghante bache hain, mere chaand se milne mein... 💖",
    "Meri duniya tumhare din ka intezaar kar rahi hai... 💫",
    "Saja rakhi hain yaadein, bas tumhaara din aana baaki hai... ❤️"
];

// Debugging: View this in your browser console (F12) to see why it redirects
console.log("Target Date:", new Date(TARGET_DATE));
console.log("Current System Date:", new Date());

// --- YOUTUBE API ---
let player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '0',
        width: '0',
        videoId: VIDEO_ID,
        playerVars: {
            'autoplay': 1,
            'loop': 1,
            'playlist': VIDEO_ID,
            'controls': 0,
            'showinfo': 0,
            'modestbranding': 1
        },
        events: {
            'onReady': (event) => {
                event.target.setVolume(35);
                event.target.playVideo();
            }
        }
    });
}

function toggleMusic() {
    const btn = document.getElementById('music-icon');
    if (player && player.getPlayerState() === YT.PlayerState.PLAYING) {
        player.pauseVideo();
        btn.innerHTML = "🔇";
    } else {
        player.playVideo();
        btn.innerHTML = "🎵";
    }
}

// --- COUNTDOWN LOGIC ---
function updateTimer() {
    const now = new Date().getTime();
    const diff = TARGET_DATE - now;

    // Log the diff to see why it might be triggering redirect
    // If diff is negative, it means the target date has passed
    if (diff <= 0) {
        console.log("Redirect triggered. Diff is: " + diff);
        handleRedirect();
        return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('days').innerText = d.toString().padStart(2, '0');
    document.getElementById('hours').innerText = h.toString().padStart(2, '0');
    document.getElementById('minutes').innerText = m.toString().padStart(2, '0');
    document.getElementById('seconds').innerText = s.toString().padStart(2, '0');
}

let redirecting = false;
function handleRedirect() {
    if (redirecting) return; // Prevent loop
    redirecting = true;

    const timer = document.getElementById('timer');
    const bg = document.querySelector('.bg-image');
    
    // Check if the timer element exists to avoid errors
    if(timer) {
        document.querySelector('.hero-header h1').innerHTML = "It's finally your day… 💖";
        timer.style.transform = "scale(1.1)";
        timer.style.opacity = "0.5";
    }
    
    // Emotional Pause: Wait 3 seconds before moving to main.html
    setTimeout(() => {
        document.body.style.opacity = "0";
        document.body.style.transition = "2s ease";
        setTimeout(() => {
            window.location.href = "main.html";
        }, 2000);
    }, 3000);
}

// --- UI INIT ---
function init() {
    // 1. Session Safety check
    if (!sessionStorage.getItem("unlocked")) {
        window.location.href = "index.html";
        return;
    }

    // 2. Load Shayari
    const shayariDisplay = document.getElementById('shayari-display');
    if (shayariDisplay) {
        const randomShayari = SHAYARIS[Math.floor(Math.random() * SHAYARIS.length)];
        shayariDisplay.innerText = randomShayari;
    }

    // 3. Generate Particles
    const sparkleContainer = document.getElementById('sparkles');
    for (let i = 0; i < 20; i++) {
        let s = document.createElement('div');
        s.className = 'sparkle';
        s.style.left = Math.random() * 100 + 'vw';
        s.style.width = Math.random() * 3 + 'px';
        s.style.height = s.style.width;
        s.style.top = Math.random() * 100 + 'vh';
        s.style.animation = `float ${10 + Math.random() * 10}s infinite linear`;
        sparkleContainer.appendChild(s);
    }

    // 4. Start Interval
    setInterval(updateTimer, 1000);
    updateTimer();
}

document.addEventListener('DOMContentLoaded', init);
