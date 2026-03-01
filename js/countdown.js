// --- CONFIGURATION ---
const TARGET_DATE = new Date("March 4, 2026 00:00:00").getTime();
const VIDEO_ID = "uBTEkj6Y2Kw";

const SHAYARIS = [
    "Tere aane ki khushi, aur tera intezaar... 🌸",
    "Tumhaari hansi ka noor karega roshan ye jahaan... ✨",
    "Bas kuch hi ghante bache hain, mere chaand se milne mein... 💖",
    "Meri duniya tumhare din ka intezaar kar rahi hai... 💫",
    "Saja rakhi hain yaadein, bas tumhaara din aana baaki hai... ❤️"
];

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
    if (player.getPlayerState() === YT.PlayerState.PLAYING) {
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

    if (diff <= 0) {
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

function handleRedirect() {
    const timer = document.getElementById('timer');
    const bg = document.querySelector('.bg-image');
    
    document.querySelector('.hero-header h1').innerHTML = "It's finally your day… 💖";
    timer.style.transform = "scale(1.2)";
    timer.style.opacity = "0";
    timer.style.transition = "1s ease-in-out";
    
    bg.style.filter = "blur(2px) brightness(0.8)";
    bg.style.transform = "scale(1.15)";
    
    setTimeout(() => {
        document.body.style.background = "white";
        document.body.style.transition = "2s ease";
        document.body.style.opacity = "0";
        setTimeout(() => {
            window.location.href = "main.html";
        }, 2000);
    }, 1500);
}

// --- UI INIT ---
function init() {
    // Session Safety
    if (!sessionStorage.getItem("unlocked")) {
        window.location.href = "index.html";
    }

    // Shayari
    const randomShayari = SHAYARIS[Math.floor(Math.random() * SHAYARIS.length)];
    document.getElementById('shayari-display').innerText = randomShayari;

    // Particles
    const sparkleContainer = document.getElementById('sparkles');
    for (let i = 0; i < 20; i++) {
        let s = document.createElement('div');
        s.className = 'sparkle';
        s.style.left = Math.random() * 100 + 'vw';
        s.style.width = Math.random() * 3 + 'px';
        s.style.height = s.style.width;
        s.style.animationDelay = Math.random() * 10 + 's';
        sparkleContainer.appendChild(s);
    }

    setInterval(updateTimer, 1000);
    updateTimer();
}

document.addEventListener('DOMContentLoaded', init);
