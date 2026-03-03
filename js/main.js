const FILM_MESSAGES = {
    s1: `Wish you a very, very Happy Birthday, Baccha… 🎂💖✨\nYou may stand strong in front of the world 💫🤍,\nbut to me, you’ll always be my little Baccha at heart 🥺🌸💕\nMay life gently give you everything your heart quietly dreams of —\nand countless reasons to smile every single day 😊✨\nThank you for being you… just the way you are 🤍`,
    
    s2: `चाय की वो छोटी सी प्याली, और सामने बैठी तुम… ☕🌸\nहर घूँट में एहसास था —\nतुम साथ हो, तो हर लम्हा खास है… 💖✨`,
    
    s3: `हाथों की ये पकड़ बस आज की नहीं… 🤍\nये वादा है हर आने वाले कल का 💫\nमैं हमेशा तुम्हारे साथ रहूँगा… 💖✨`,
    
    s4: `ये बस एक निशान नहीं… 🌹\nये उस पल की कहानी है,\nजब मोहब्बत ने शब्दों की ज़रूरत ही नहीं समझी… 💞✨`,
    
    s5: `Once again... \nWishing You a Very Very Happy Birthday Baccha. 🎂❤️\n\n✨ Mera Betu, Meri Beti, Mera Baccha,\nMeri Shona, Meri Mona, Meri Lado,\nMera Babu, Mera Sabkuch…\n\nI Love You So Much Baccha… 💖`,

    s6: `Our Forever Story ❤️✨\nहर जन्म में, हर मोड़ पर,\nबस तुम ही मेरी कहानी रहना… 💖\n\n<div class='signature-box'><span class='akki-name'>Akki 🤍</span></div>`
};

// Intersection Observer (Dramatic Triggers)
const options = { threshold: 0.6 };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            const sceneNum = entry.target.dataset.scene;
            typeEffect(`tw${sceneNum}`, FILM_MESSAGES[`s${sceneNum}`]);
            if (sceneNum == 6) launchLuxuryFireworks();
        }
    });
}, options);

document.querySelectorAll('.scene').forEach(scene => observer.observe(scene));

async function typeEffect(id, text) {
    const el = document.getElementById(id);
    if (!el || el.dataset.done) return;
    el.dataset.done = "true";

    const lines = text.split('\n');
    for (let line of lines) {
        let p = document.createElement('p');
        p.style.marginBottom = "10px";
        p.style.opacity = "0";
        p.style.transform = "translateY(10px)";
        p.style.transition = "1s ease";
        el.appendChild(p);
        
        // Custom typewriter line logic
        for (let i = 0; i <= line.length; i++) {
            p.innerHTML = line.slice(0, i);
            p.style.opacity = "1";
            p.style.transform = "translateY(0)";
            if(line.includes('तुम साथ हो')) p.style.color = '#ffcf67';
            await new Promise(r => setTimeout(r, 45));
        }
        await new Promise(r => setTimeout(r, 800)); // Pacing
    }
}

function launchLuxuryFireworks() {
    const canvas = document.getElementById('luxury-fireworks');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];
    function create() {
        if(particles.length > 50) return;
        const x = Math.random() * canvas.width;
        const color = Math.random() > 0.5 ? '#ffcf67' : '#ffafbd';
        for(let i=0; i<30; i++) particles.push({ x, y: canvas.height, dx: Math.random()*4-2, dy: Math.random()*-8-5, c: color, alpha: 1 });
    }

    function animate() {
        ctx.clearRect(0,0,canvas.width, canvas.height);
        particles.forEach((p, i) => {
            p.x += p.dx; p.y += p.dy; p.dy += 0.15; p.alpha -= 0.01;
            ctx.fillStyle = p.c;
            ctx.globalAlpha = p.alpha;
            ctx.beginPath(); ctx.arc(p.x, p.y, 1.5, 0, Math.PI*2); ctx.fill();
            if(p.alpha <= 0) particles.splice(i, 1);
        });
        create();
        requestAnimationFrame(animate);
    }
    animate();
    setTimeout(() => { document.body.style.background = 'black'; document.body.style.transition='5s'; }, 10000);
}

// Global Dust Generator
const dust = document.getElementById('gold-dust-particles');
for(let i=0; i<30; i++) {
    const s = document.createElement('span');
    s.style.left = Math.random() * 100 + 'vw';
    s.style.top = Math.random() * 100 + 'vh';
    s.style.animationDelay = Math.random() * 10 + 's';
    dust.appendChild(s);
}
