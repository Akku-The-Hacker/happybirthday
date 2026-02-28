document.addEventListener('DOMContentLoaded', () => {
    const layer1 = document.getElementById('layer1-password');
    const layer2 = document.getElementById('layer2-countdown');
    const layer3 = document.getElementById('layer3-main');

    // 1. PASSWORD CHECK
    document.getElementById('unlockBtn').addEventListener('click', () => {
        const pass = document.getElementById('passwordInput').value;
        if (pass === 'Akki@7489') {
            transitionLayers(layer1, layer2);
            startCountdown();
        } else {
            document.getElementById('login-card').classList.add('shake');
            setTimeout(() => document.getElementById('login-card').classList.remove('shake'), 400);
        }
    });

    // 2. TRANSITION LOGIC (The Fix for the Black Screen)
    function transitionLayers(off, on) {
        off.style.opacity = '0';
        setTimeout(() => {
            off.classList.add('hidden');
            on.classList.remove('hidden');
            // Small delay to let 'display block' register before fading in
            setTimeout(() => {
                on.style.opacity = '1';
                window.scrollTo(0, 0);
            }, 50);
        }, 800);
    }

    // 3. COUNTDOWN LOGIC
    function startCountdown() {
        const target = new Date("March 04, 2026 00:00:00").getTime();
        
        const timer = setInterval(() => {
            const now = new Date().getTime();
            const diff = target - now;

            if (diff <= 0) {
                clearInterval(timer);
                transitionLayers(layer2, layer3);
                return;
            }

            document.getElementById('days').innerText = Math.floor(diff / (1000 * 60 * 60 * 24));
            document.getElementById('hours').innerText = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            document.getElementById('minutes').innerText = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            document.getElementById('seconds').innerText = Math.floor((diff % (1000 * 60)) / 1000);
        }, 1000);
    }

    // 4. MEMORY REVEAL (Layer 3)
    const memImg = document.getElementById('memory-img');
    if(memImg) {
        memImg.parentElement.addEventListener('click', () => {
            memImg.classList.toggle('clear');
        });
    }
});
