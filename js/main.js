const STYLED_CONTENT = {
    s1: `Wish you a very, very\nHappy Birthday, Baccha… 🎂💖✨\n\nYou may stand strong\nin front of the world 💫🤍,\n\nbut to me, you’ll always be\nmy little Baccha at heart 🥺🌸💕\n\nThank you for being you… 🤍`,
    s2: `चाय की वो छोटी सी प्याली,\nऔर सामने बैठी तुम… ☕🌸\n\nहर घूँट में एहसास था —\nतुम साथ हो, तो लम्हा खास है… 💖✨`,
    s3: `हाथों की ये पकड़ बस आज की नहीं… 🤍\nये वादा है हर आने वाले कल का 💫\nमैं हमेशा तुम्हारे साथ रहूँगा… 💖✨`,
    s4: `<span style="background: linear-gradient(135deg, #fff, #ffafbd); -webkit-background-clip:text; -webkit-text-fill-color:transparent;">ये बस एक निशान नहीं… 🌹<br>ये उस पल की कहानी है,<br>जब मोहब्बत ने शब्दों की ज़रूरत नहीं समझी… 💞✨</span>`,
    s5: `<span style="font-size:1.8rem; color:#ffcf67">Once again... Wishing You a Very Very Happy Birthday, Baccha… 🎂❤️</span>\n\n<span class="nickname-span n1">Mera Betu… 💙</span><span class="nickname-span n2">Meri Shona… 💖</span><span class="nickname-span n3">Meri Lado… 🌹</span><span class="nickname-span n5">Mera Sabkuch… 💍✨</span>\n\n<span style="font-size:1.6rem; color:#ffafbd">I Love You beyond words, beyond everything… 💖</span>`,
    s6: `<div class="sig-block"><span class="sig-text">Our Forever Story ❤️</span><span class="akki-huge">Only Yours, Akki 🤍</span></div>`
};

// Intersection Observer Logic
const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if(e.isIntersecting && !e.target.dataset.done) {
            e.target.dataset.done = "true";
            const id = e.target.getAttribute('data-scene');
            typeWriter(`tw${id}`, STYLED_CONTENT[`s${id}`]);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.scene').forEach(s => observer.observe(s));

function typeWriter(id, text) {
    const el = document.getElementById(id);
    let i = 0;
    function play() {
        if (i < text.length) {
            if (text.charAt(i) === '<') {
                let tagEnd = text.indexOf('>', i) + 1;
                el.innerHTML += text.substring(i, tagEnd);
                i = tagEnd;
            } else if (text.charAt(i) === '\n') {
                el.innerHTML += '<br>'; i++;
            } else {
                el.innerHTML += text.charAt(i); i++;
            }
            setTimeout(play, 50);
        }
    }
    play();
}

function revealPhoto(el) {
    const img = el.querySelector('img');
    const mask = el.querySelector('.tap-hint');
    if(img) { img.classList.remove('hickey-blur'); mask.style.display="none"; }
}

// Particle Engine (Canvas)
const canvas = document.getElementById('fw-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth; canvas.height = window.innerHeight;

function animateParticles() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < 3; i++) {
        ctx.fillStyle = `hsl(${Math.random() * 360}, 100%, 70%)`;
        ctx.beginPath();
        ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, 1, 0, Math.PI * 2);
        ctx.fill();
    }
    requestAnimationFrame(animateParticles);
}
animateParticles();

// Floating Elements
const sField = document.getElementById('star-layer');
for(let i=0; i<60; i++) {
    const star = document.createElement('div');
    star.style.cssText = `position:absolute; width:2px; height:2px; background:white; left:${Math.random()*100}%; top:${Math.random()*100}%; border-radius:50%; animation: blinker 2s infinite; opacity:0.5;`;
    sField.appendChild(star);
}
const hField = document.getElementById('heart-layer');
for(let i=0; i<10; i++) {
    const heart = document.createElement('div');
    heart.innerHTML = "💕";
    heart.style.cssText = `position:absolute; left:${Math.random()*100}%; top:${Math.random()*100}%; font-size:25px; animation: floatUp 8s infinite; opacity:0.3;`;
    hField.appendChild(heart);
}

const styleTag = document.createElement('style');
styleTag.innerHTML = `
@keyframes blinker { 50% { opacity: 0; } }
@keyframes floatUp { 0% { transform: translateY(100vh); opacity: 0; } 100% { transform: translateY(-10vh); opacity: 0.4; } }
`;
document.head.appendChild(styleTag);
