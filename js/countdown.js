// --- Security Check ---
const access = localStorage.getItem("birthday_access") || sessionStorage.getItem("birthday_access");
if (access !== "granted") window.location.href = "index.html";

// --- Configuration ---
const TARGET = new Date(2026, 2, 4, 0, 0, 0).getTime(); // March 4
const SHAYARIS = [
    "Saja rakhi hain yaadein, bas tera intezaar hai... ❤️",
    "Faasle dil ke sabse paas hain... 🌸",
    "Har pal tera kar jaata hai... ✨"
];

// --- Timer Engine ---
function update() {
    const now = new Date().getTime();
    const diff = TARGET - now;
    if (diff > 0) {
        document.getElementById('days').innerText = Math.floor(diff / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
        document.getElementById('hours').innerText = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
        document.getElementById('minutes').innerText = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
        document.getElementById('seconds').innerText = Math.floor((diff % (1000 * 60)) / 1000).toString().padStart(2, '0');
    } else {
        window.location.href = "main.html";
    }
}
setInterval(update, 1000);
update();

// --- Random Shayari ---
document.getElementById('shayari-text').innerText = SHAYARIS[Math.floor(Math.random() * SHAYARIS.length)];

// --- YouTube Logic ---
let player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '0', width: '0', videoId: 'uBTEkj6Y2Kw',
        playerVars: { 'autoplay': 1, 'loop': 1, 'playlist': 'uBTEkj6Y2Kw' },
        events: { 'onReady': e => { e.target.setVolume(35); e.target.playVideo(); } }
    });
}
function toggleMusic() {
    if(player.getPlayerState() === 1) player.pauseVideo();
    else player.playVideo();
}
