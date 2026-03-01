const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('active'); });
}, { threshold: 0.5 });

document.querySelectorAll('section').forEach(s => observer.observe(s));

// Basic Finale Sparkles
const canvas = document.getElementById('fireworks');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function sparkle() {
    ctx.fillStyle = 'rgba(0,0,0,0.1)';
    ctx.fillRect(0,0,canvas.width, canvas.height);
    for(let i=0; i<5; i++){
        ctx.fillStyle = `hsl(${Math.random()*360}, 100%, 50%)`;
        ctx.beginPath(); ctx.arc(Math.random()*canvas.width, Math.random()*canvas.height, 1, 0, Math.PI*2); ctx.fill();
    }
    requestAnimationFrame(sparkle);
}
sparkle();
