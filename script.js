// --- CONFIGURATION ---
const birthdayDate = "2024-12-31T00:00:00"; // EDIT THIS DATE (YYYY-MM-DD)
const youtubeVideoId = "dQw4w9WgXcQ"; // Replace with your YouTube Video ID

// --- 1. COUNTDOWN SYSTEM ---
function updateCountdown() {
    const target = new Date(birthdayDate).getTime();
    const now = new Date().getTime();
    const diff = target - now;

    if (diff < 0) {
        document.getElementById('timer').innerHTML = "<h3 style='color:#ff8da1'>The Celebration Has Begun! 🎂</h3>";
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

setInterval(updateCountdown, 1000);
updateCountdown();

// --- 2. REVEAL ON SCROLL (Intersection Observer) ---
const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            // Trigger fireworks if the last section is reached
            if (entry.target.id === 'fireworks-section') {
                if (typeof startFireworks === "function") startFireworks();
            }
        }
    });
}, revealOptions);

document.querySelectorAll('.reveal-section').forEach(section => {
    revealObserver.observe(section);
});

// --- 3. YOUTUBE MUSIC INTEGRATION ---
let player;
function onYouTubeIframeAPIReady() {
    // This function is ready for future full API integration
}

function playYouTubeMusic(videoId) {
    const container = document.getElementById('music-container');
    container.innerHTML = `<iframe width="0" height="0" src="https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&playlist=${videoId}" frameborder="0" allow="autoplay"></iframe>`;
}

// --- 4. BUTTON BEHAVIOR ---
document.getElementById('surprise-btn').addEventListener('click', function() {
    // Smooth scroll to countdown
    document.getElementById('countdown-section').scrollIntoView({ behavior: 'smooth' });
    
    // Future Music Trigger
    // playYouTubeMusic(youtubeVideoId); 
});

// --- KEEP EXISTING HEARTS/FIREWORKS LOGIC BELOW ---
// (Ensure your existing heart/fireworks functions are pasted here)
