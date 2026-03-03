// --- INTERSECTION OBSERVER ---
const sceneObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('.pg-sec').forEach(section => sceneObserver.observe(section));

// --- FIREWORKS ENGINE ---
const fwCanvas = document.getElementById('fireworks-canvas');
const ctx = fwCanvas.getContext('2d');
fwCanvas.width = window.innerWidth; fwCanvas.height = window.innerHeight;

function animateFireworks() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, fwCanvas.width, fwCanvas.height);
    for (let i = 0; i < 4; i++) {
        ctx.fillStyle = `hsl(${Math.random() * 360}, 100%, 70%)`;
        ctx.beginPath();
        ctx.arc(Math.random() * fwCanvas.width, Math.random() * fwCanvas.height, 1, 0, Math.PI * 2);
        ctx.fill();
    }
    requestAnimationFrame(animateFireworks);
}
animateFireworks();

// --- STAR FIELD GENERATOR ---
const starLayer = document.getElementById('stars');
for (let i = 0; i < 80; i++) {
    const star = document.createElement('div');
    star.style.cssText = `
        position: absolute; width: 2px; height: 2px; background: white;
        left: ${Math.random() * 100}%; top: ${Math.random() * 100}%;
        opacity: 0.1; animation: twinkle ${2 + Math.random() * 3}s infinite alternate;
    `;
    starLayer.appendChild(star);
}

// --- HEART GENERATOR ---
const heartLayer = document.getElementById('hearts');
const emojis = ['💕', '❤️', '💞'];
for (let i = 0; i < 12; i++) {
    const heart = document.createElement('div');
    heart.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
    heart.style.cssText = `
        position: absolute; left: ${Math.random() * 100}%; top: ${Math.random() * 100}%;
        font-size: 25px; opacity: 0.2; animation: floatUp ${5 + Math.random() * 5}s infinite linear;
    `;
    heartLayer.appendChild(heart);
}

// Inline Animation Style Injection
const style = document.createElement('style');
style.innerHTML = `
    @keyframes twinkle { from { opacity: 0.1; transform: scale(1); } to { opacity: 0.8; transform: scale(1.3); } }
    @keyframes floatUp { from { transform: translateY(0); opacity: 0.2; } to { transform: translateY(-100vh); opacity: 0; } }
    @keyframes fadeIn-up { from { opacity:0; transform: translateY(20px); } to { opacity:1; transform: translateY(0); } }
    .fade-in-up { animation: fadeIn-up 1.5s ease forwards; }
`;
document.head.appendChild(style);
