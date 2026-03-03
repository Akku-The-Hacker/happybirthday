// SECTION CONTENT
const data = {
    s1: `Wish you a very, very\nHappy Birthday, Baccha… 🎂💖✨\n\nYou may stand strong\nin front of the world 💫🤍,\n\nbut to me, you’ll always be\nmy little Baccha at heart 🥺🌸💕\n\nThank you for being you… 🤍`,
    s2: `चाय की वो छोटी सी प्याली,\nऔर सामने बैठी तुम… ☕🌸\n\nहर घूँट में एहसास था —\nतुम साथ हो, तो लम्हा खास है… 💖✨`,
    s3: `हाथों की ये पकड़ बस आज की नहीं… 🤍\nये वादा है हर आने वाले कल का 💫\nमैं हमेशा तुम्हारे साथ रहूँगा… 💖✨`,
    s4: `ये बस एक निशान नहीं… 🌹\nये उस पल की कहानी है,\nजब मोहब्बत ने शब्दों की ज़रूरत नहीं समझी… 💞✨`,
    s5: `Once again… 💫\nWishing You a Very Very\nHappy Birthday, Baccha… 🎂❤️\n\n<span class="nick-span n1">Mera Betu… 💙</span><span class="nick-span n2">Meri Shona… 💖</span><span class="nick-span n3">Meri Lado… 🌹</span><span class="nick-span n4">Mera Babu… 🤍</span><span class="nick-span n5">Mera Sabkuch… 💍✨</span>\n\nTum sirf meri mohabbat nahi ho…\ntum meri zarurat ho 💞 sukoon ho 🌙\ndhadkan ho 💓 takdeer ho 🌟\n\n<span style="color:#ffafbd">I Love You beyond words. 🤍✨</span>`,
    s6: `हर जन्म में, हर मोड़ पर,\nबस तुम ही मेरी कहानी रहना… 💖\n\n<div class="signature-style">Only Yours, Akki 🤍</div>`
};

// TYPEWRITER SYSTEM
function type(id, text) {
    const el = document.getElementById(id);
    if (!el) return;
    let i = 0;
    function writing() {
        if (i < text.length) {
            if (text.charAt(i) === '<') { // Detect Tags
                let tag = text.indexOf('>', i) + 1;
                el.innerHTML += text.substring(i, tag);
                i = tag;
            } else if (text.charAt(i) === '\n') {
                el.innerHTML += '<br>'; i++;
            } else {
                el.innerHTML += text.charAt(i); i++;
            }
            setTimeout(writing, 50);
        }
    }
    writing();
}

// INTERSECTION OBSERVER
const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting && !e.target.dataset.done) {
            e.target.dataset.done = "true";
            const id = e.target.querySelector('[id^="typewriter"]').id;
            const key = id.replace('typewriter', 's');
            type(id, data[key]);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.st-scene').forEach(s => observer.observe(s));

// STAR ENGINE S2
const starField = document.getElementById('star-layer');
for (let i = 0; i < 50; i++) {
    const star = document.createElement('div');
    star.style.cssText = `position:absolute; width:2px; height:2px; background:#fff; left:${Math.random()*100}%; top:${Math.random()*100}%; border-radius:50%; animation: twinkle 3s infinite; opacity:${Math.random()}`;
    starField.appendChild(star);
}

// HEART ENGINE S3
const heartField = document.getElementById('heart-layer');
const emojis = ['👩‍❤️‍👨', '💕'];
for (let i = 0; i < 10; i++) {
    const h = document.createElement('div');
    h.innerHTML = emojis[i % 2];
    h.style.cssText = `position:absolute; left:${Math.random()*100}%; top:${Math.random()*100}%; font-size:25px; animation: floatUp 8s infinite; opacity:0.3`;
    heartField.appendChild(h);
}

// CSS ANIMATIONS Injection
const style = document.createElement('style');
style.innerHTML = `
@keyframes twinkle { 50% { opacity:0.2; transform:scale(0.8); } }
@keyframes floatUp { 0% { transform:translateY(100vh); opacity:0; } 100% { transform:translateY(-10vh); opacity:0.5; } }
@keyframes shimmer { 0% { background-position: -200%; } 100% { background-position: 200%; } }
`;
document.head.appendChild(style);
