const birthdayShayaris = [
    "Khuda kaise karoon shukriya is din ke liye,<br>Jisne tumhe bheja hai sirf mere liye...<br>Happy Birthday Shona! ❤️",
    "Gul ne gulshan se gulfaam bheja hai,<br>Sitaaron ne aasmaan se salaam bheja hai,<br>Mubarak ho tumhe tumhara janamdin... ❤️",
    "Tumhari surat ki tarah tumhara din bhi haseen ho,<br>Khushiyon se bhari tumhari ye zindagi ho... ❤️",
    "Har din naya sa ho, har pal suhana ho,<br>Tumhare janamdin par khushiyon ka thikana ho... ❤️",
    "Zindagi ka har pal khushiyan de aapko,<br>Janamdin ki dher saari duayein aapko... ❤️"
];

function initCountdownLayer() {
    // 1. Random Shayari Selection
    const display = document.getElementById('shayari-display');
    const randomIdx = Math.floor(Math.random() * birthdayShayaris.length);
    display.innerHTML = birthdayShayaris[randomIdx];

    // 2. Create Floating Particles
    createParticles();

    // 3. Start Timer
    const target = new Date("March 04, 2026 00:00:00").getTime();
    
    const x = setInterval(() => {
        const now = new Date().getTime();
        const diff = target - now;

        if (diff <= 0) {
            clearInterval(x);
            // Transition to Layer 3 logic here...
            return;
        }

        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);

        // Update with pulse effect logic
        updateElement('days', d);
        updateElement('hours', h);
        updateElement('mins', m);
        updateElement('secs', s);

    }, 1000);
}

function updateElement(id, value) {
    const el = document.getElementById(id);
    const valString = value.toString().padStart(2, '0');
    if (el.innerText !== valString) {
        el.innerText = valString;
        // Re-trigger animation
        el.style.animation = 'none';
        el.offsetHeight; /* trigger reflow */
        el.style.animation = null;
    }
}

function createParticles() {
    const container = document.getElementById('particles-container');
    for (let i = 0; i < 30; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        const size = Math.random() * 5 + 2 + 'px';
        p.style.width = size;
        p.style.height = size;
        p.style.left = Math.random() * 100 + 'vw';
        p.style.animationDuration = Math.random() * 5 + 5 + 's';
        p.style.animationDelay = Math.random() * 5 + 's';
        p.style.boxShadow = '0 0 10px rgba(255,255,255,0.8)';
        container.appendChild(p);
    }
}

// Call initCountdownLayer when Layer 2 is shown
// Inside your existing password logic:
// transitionToLayer2() {
//    ... existing logic ...
//    initCountdownLayer();
// }
