const bdayMsg = `Wish you a very, very Happy Birthday, Baccha… 🎂💖✨
You may act all mature and strong 💫🤍,
but you’ll always be my little Baccha at heart 🥺🌸💕
I hope life gives you everything your heart quietly wishes for 🌷💭,
soft moments 🌙💞, big dreams 🌟🌈, and endless reasons to smile 😊✨
Thank you for being you… 🤍
for your warmth 🔥💗, your innocence 🕊️🌸,
and that smile that makes everything better 😌💖✨`;

// Typewriter Logic S1
function startTypewriter() {
    let i = 0;
    const target = document.getElementById('long-message');
    function type() {
        if (i < bdayMsg.length) {
            target.textContent += bdayMsg.charAt(i);
            i++;
            setTimeout(type, 50);
        }
    }
    type();
}

// Reveal logic for S4
function revealPhoto(container) {
    container.classList.add('clear');
}

// Scroll Transition Observer
const observerOptions = { threshold: 0.6 };
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            if(entry.target.id === 'sec1') startTypewriter();
            if(entry.target.id === 'sec6') startFireworks();
        }
    });
}, observerOptions);

document.querySelectorAll('.st-section').forEach(sec => sectionObserver.observe(sec));

// Minimal Gold Fireworks for S6
function startFireworks() {
    const canvas = document.getElementById('fireworks-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = canvas.height;
            this.speed = Math.random() * 3 + 2;
            this.radius = Math.random() * 2;
            this.alpha = 1;
        }
        draw() {
            ctx.fillStyle = `rgba(212, 175, 55, ${this.alpha})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
            ctx.fill();
        }
        update() {
            this.y -= this.speed;
            this.alpha -= 0.005;
        }
    }

    function animate() {
        if (particles.length < 50) particles.push(new Particle());
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach((p, i) => {
            p.update();
            p.draw();
            if (p.alpha <= 0) particles.splice(i, 1);
        });
        requestAnimationFrame(animate);
    }
    animate();
}
