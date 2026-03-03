const STICKY_MESSAGES = {
    Hero: [
        "Wish you a very, very Happy Birthday, Baccha… 🎂💖✨",
        "You may stand strong in front of the world 💫🤍,",
        "but to me, you’ll always be my little Baccha at heart 🥺🌸💕",
        "May life gently give you everything your heart quietly dreams of —",
        "and countless reasons to smile every single day 😊✨",
        "Thank you for being you… just the way you are 🤍"
    ],
    Tea: [
        "चाय की वो छोटी सी प्याली, और सामने बैठी तुम… ☕🌸",
        "हर घूँट में बस एक ही एहसास था —",
        "तुम साथ हो, तो हर लम्हा खास है… 💖✨"
    ],
    Together: [
        "हाथों की ये पकड़ बस आज की नहीं… 🤍",
        "ये वादा है हर आने वाले कल का 💫",
        "सफर लंबा हो या मुश्किल, मैं हमेशा तुम्हारे साथ रहूँगा… 💖✨"
    ],
    Hickey: [
        "ये बस एक निशान नहीं… 🌹",
        "ये उस पल की कहानी है,",
        "जब मोहब्बत ने शब्दों की ज़रूरत ही नहीं समझी… 💞✨"
    ],
    Flower: [
        "Once again… 💫",
        "Wishing You a Very Very Happy Birthday, Baccha… 🎂❤️",
        "Mera Betu… Meri Shona… Meri Lado… 🌹",
        "I Love You beyond words, beyond everything… 💖",
        "Bas tum hi ho. Aur tum hi rahogi. 🤍✨"
    ],
    Closing: [
        "हर जन्म में, हर मोड़ पर,",
        "बस तुम ही मेरी कहानी रहना… 💖",
        "",
        "Only Yours, Akki 🤍"
    ]
};

// Typewriter Engine
async function writeText(containerId, paragraphs) {
    const el = document.getElementById(containerId);
    if (!el || el.dataset.done) return;
    el.dataset.done = "true";

    for (let pIdx = 0; pIdx < paragraphs.length; pIdx++) {
        let p = document.createElement('p');
        p.style.marginBottom = "10px";
        el.appendChild(p);

        const line = paragraphs[pIdx];
        for (let charIdx = 0; charIdx < line.length; charIdx++) {
            p.textContent += line.charAt(charIdx);
            await new Promise(r => setTimeout(r, 45)); // Smooth typing speed
        }
        await new Promise(r => setTimeout(r, 500)); // Pause between lines
    }
}

// Reveal logic for Section 4
function revealPhoto(wrapper) {
    const img = wrapper.querySelector('img');
    const hint = wrapper.querySelector('.tap-hint');
    img.classList.remove('hickey-blur');
    hint.style.display = 'none';
    if(navigator.vibrate) navigator.vibrate(50);
}

// Intersection Observer (Scroll Drama)
const sceneObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            const scene = entry.target.dataset.scene;
            
            // Map Scene to Paragraphs
            if(scene === 'hero') writeText('tw1', STICKY_MESSAGES.Hero);
            if(scene === 'tea') writeText('tw2', STICKY_MESSAGES.Tea);
            if(scene === 'together') writeText('tw3', STICKY_MESSAGES.Together);
            if(scene === 'hickey') writeText('tw4', STICKY_MESSAGES.Hickey);
            if(scene === 'flower') writeText('tw5', STICKY_MESSAGES.Flower);
            if(scene === 'closing') writeText('tw6', STICKY_MESSAGES.Closing);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.cinematic-section').forEach(s => sceneObserver.observe(s));

// Particles
(function initParticles() {
    const container = document.getElementById('gold-dust-container');
    for (let i = 0; i < 30; i++) {
        const span = document.createElement('span');
        span.style.left = Math.random() * 100 + '%';
        span.style.top = Math.random() * 100 + '%';
        span.style.animationDelay = Math.random() * 10 + 's';
        container.appendChild(span);
    }
})();
