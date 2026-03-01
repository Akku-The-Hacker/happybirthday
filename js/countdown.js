const TARGET = new Date(2026, 2, 4, 0, 0, 0).getTime(); // Mar 4
const LINES = ["Saja rakhi hain yaadein... ❤️", "Faasle sabse paas hain... 🌸", "Waiting for your day... ✨"];

if(localStorage.getItem("shona_unlocked") !== "true") window.location.href = "index.html";

document.getElementById('shayari').innerText = LINES[Math.floor(Math.random()*LINES.length)];

function updateTimer() {
    const diff = TARGET - Date.now();
    if(diff > 0) {
        document.getElementById('days').innerText = Math.floor(diff / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
        document.getElementById('hours').innerText = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
        document.getElementById('mins').innerText = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
        document.getElementById('secs').innerText = Math.floor((diff % (1000 * 60)) / 1000).toString().padStart(2, '0');
    } else {
        window.location.href = "main.html";
    }
}
setInterval(updateTimer, 1000); updateTimer();

let player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('yt-player', { height: '0', width: '0', videoId: 'uBTEkj6Y2Kw',
        playerVars: {'autoplay': 1, 'loop': 1, 'playlist': 'uBTEkj6Y2Kw'},
        events: {'onReady': e => e.target.setVolume(35)}
    });
}
function toggleAudio() { 
    if(player.getPlayerState() === 1) player.pauseVideo(); 
    else player.playVideo(); 
}
