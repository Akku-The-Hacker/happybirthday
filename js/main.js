const CONTENT_SOURCE = {
    s1: `Wish you a very, very\nHappy Birthday, Baccha… 🎂💖✨\n\nYou may stand strong\nin front of the world 💫🤍,\n\nbut to me, you’ll always be\nmy little Baccha at heart 🥺🌸💕\n\nThank you for being you… 🤍`,
    
    s2: `चाय की वो छोटी सी प्याली,\nऔर सामने बैठी तुम… ☕🌸\n\nहर घूँट में एहसास था —\nतुम साथ हो, तो लम्हा खास hai… 💖✨`,
    
    s3: `हाथों की ये पकड़ बस आज की नहीं… 🤍\nये वादा hai हर आने वाले कल का 💫\nमैं हमेशा तुम्हारे साथ रहूँगा… 💖✨`,
    
    s4: `ये बस एक निशान नहीं… 🌹\nये उस पल ki kahani hai,\njab mohabbat ne shabdo ki zaroorat nahi samjhi… 💞✨`,
    
    s5: `<span style="font-size:1.4rem; color:#ffcf67">Once again… 💫</span>\n<span style="font-size:1.8rem; font-weight:800; display:block; margin-bottom:20px;">Wishing You a Very Very Happy Birthday, Baccha… 🎂❤️</span>\n<span class="nick-row n1">Mera Betu… 💙</span><span class="nick-row n2">Meri Shona… 💖</span><span class="nick-row n3">Meri Lado… 🌹</span><span class="nick-row n4">Mera Babu… 🤍</span><span class="nick-row n5">Mera Sabkuch… 💍✨</span>\n\n<span style="font-size:1.6rem; color:#ffafbd; font-weight:600">I Love You beyond words. 💖🔥</span>\n<span style="font-size:1.5rem">Bas tum hi ho. Aur tum hi rahogi. 🤍✨</span>`,
    
    s6: `<span class="s6-sig-title">Our Forever Story ❤️</span>\n<span style="font-style:italic; font-size:1.1rem; opacity:0.8">हर जन्म में, हर मोड़ पर,<br>बस तुम ही मेरी कहानी रहना… 💖</span>\n<div class="akki-box" style="margin-top:40px;">\n<span style="font-size:1.5rem">Only Yours,</span>\n<span class="huge-akki">Akki 🤍</span>\n</div>`
};

// Intersection Observer logic
const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if(e.isIntersecting && !e.target.dataset.run) {
            e.target.dataset.run = "true";
            const sId = e.target.getAttribute('data-id');
            const target = document.getElementById(`tw${sId.substring(1)}`);
            typeWriter(target, CONTENT_SOURCE[sId]);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.st-scene').forEach(s => observer.observe(s));

function typeWriter(el, text) {
    let i = 0;
    function play() {
        if (i < text.length) {
            if (text.charAt(i) === '<') {
                let end = text.indexOf('>', i) + 1;
                el.innerHTML += text.substring(i, end);
                i = end;
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

// Particle Layers Logic (Stars/Hearts/Fireworks)
function initFx() {
    // S2 Stars
    const sLayer = document.getElementById('star-layer');
    for(let i=0; i<60; i++) {
        const star = document.createElement('div');
        star.style.cssText = `position:absolute; width:2px; height:2px; background:white; left:${Math.random()*100}%; top:${Math.random()*100}%; border-radius:50%; animation: blink ${2+Math.random()*2}s infinite alternate; opacity:0.6;`;
        sLayer.appendChild(star);
    }
    // S3 Hearts
    const hLayer = document.getElementById('heart-layer');
    for(let i=0; i<12; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = "💕";
        heart.style.cssText = `position:absolute; left:${Math.random()*100}%; top:${Math.random()*100}%; font-size:25px; animation: floatH 6s infinite linear; opacity:0.3;`;
        hLayer.appendChild(heart);
    }
}
initFx();

// Global Animation Canvas for Fireworks
const canvas = document.getElementById('fw-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth; canvas.height = window.innerHeight;
function fireworks() {
    ctx.fillStyle = 'rgba(0,0,0,0.08)';
    ctx.fillRect(0,0,canvas.width, canvas.height);
    for(let i=0; i<3; i++) {
        ctx.fillStyle = `hsl(${Math.random()*360}, 100%, 70%)`;
        ctx.beginPath(); ctx.arc(Math.random()*canvas.width, Math.random()*canvas.height, 1, 0, Math.PI*2); ctx.fill();
    }
    requestAnimationFrame(fireworks);
}
fireworks();

// Injected Keyframes
const style = document.createElement('style');
style.innerHTML = `
@keyframes blink { from {opacity:0.2;} to {opacity:0.9; transform:scale(1.2);} }
@keyframes floatH { from {transform:translateY(100vh); opacity:0;} to {transform:translateY(-10vh); opacity:0.5;} }
`;
document.head.appendChild(style);
