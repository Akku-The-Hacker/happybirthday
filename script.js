document.addEventListener('DOMContentLoaded', () => {
    const layer1 = document.getElementById('layer1-password');
    const layer2 = document.getElementById('layer2-countdown');
    const layer3 = document.getElementById('layer3-main');
    
    const targetDate = new Date("March 04, 2026 00:00:00").getTime();

    // 1. PASSWORD LOGIC
    const loginBtn = document.getElementById('loginBtn');
    const passwordInput = document.getElementById('passwordInput');
    const loginCard = document.getElementById('login-card');

    function checkAccess() {
        if (sessionStorage.getItem('unlocked') === 'true') {
            transitionToCountdown();
        }
    }

    loginBtn.addEventListener('click', () => {
        if (passwordInput.value === 'Akki@7489') {
            sessionStorage.setItem('unlocked', 'true');
            transitionToCountdown();
        } else {
            loginCard.classList.add('shake');
            setTimeout(() => loginCard.classList.remove('shake'), 400);
            passwordInput.value = '';
        }
    });

    function transitionToCountdown() {
        layer1.style.opacity = '0';
        setTimeout(() => {
            layer1.classList.add('hidden');
            layer2.classList.remove('hidden');
            setTimeout(() => layer2.style.opacity = '1', 50);
            startCountdown();
        }, 1000);
    }

    // 2. COUNTDOWN LOGIC
    function startCountdown() {
        const timerInterval = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate - now;

            if (distance < 0) {
                clearInterval(timerInterval);
                transitionToMain();
                return;
            }

            const d = Math.floor(distance / (1000 * 60 * 60 * 24));
            const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const s = Math.floor((distance % (1000 * 60)) / 1000);

            document.getElementById('days').innerText = d.toString().padStart(2, '0');
            document.getElementById('hours').innerText = h.toString().padStart(2, '0');
            document.getElementById('minutes').innerText = m.toString().padStart(2, '0');
            document.getElementById('seconds').innerText = s.toString().padStart(2, '0');
        }, 1000);
    }

    function transitionToMain() {
        layer2.style.opacity = '0';
        setTimeout(() => {
            layer2.classList.add('hidden');
            layer3.classList.remove('hidden');
            setTimeout(() => {
                layer3.style.opacity = '1';
                initScrollAnimations();
            }, 50);
        }, 1000);
    }

    // 3. MAIN EXPERIENCE LOGIC
    function initScrollAnimations() {
        // Line by line reveal
        const revealLines = document.querySelectorAll('.reveal-line');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.5 });

        revealLines.forEach(line => observer.observe(line));

        // Intimate section tap
        const memoryImg = document.getElementById('memory-img');
        memoryImg.parentElement.addEventListener('click', () => {
            memoryImg.classList.toggle('clear');
        });

        // Signature Underline
        const underline = document.querySelector('.underline');
        const signObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) underline.classList.add('grow');
        });
        signObserver.observe(underline);

        // Fireworks Init
        const finale = document.getElementById('finale');
        const finaleObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) startFireworks();
        });
        finaleObserver.observe(finale);

        // Floating Hearts in Hero
        setInterval(createHeart, 500);
    }

    function createHeart() {
        const container = document.querySelector('.hearts-container');
        if (!container) return;
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerHTML = '❤️';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.fontSize = (Math.random() * 10 + 15) + 'px';
        container.appendChild(heart);
        setTimeout(() => heart.remove(), 4000);
    }

    // FIREWORKS CANVAS
    function startFireworks() {
        const canvas = document.getElementById('fireworksCanvas');
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let particles = [];
        class Particle {
            constructor(x, y, color) {
                this.x = x; this.y = y; this.color = color;
                this.velocity = { x: (Math.random() - 0.5) * 8, y: (Math.random() - 0.5) * 8 };
                this.alpha = 1;
            }
            draw() {
                ctx.save();
                ctx.globalAlpha = this.alpha;
                ctx.beginPath();
                ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();
                ctx.restore();
            }
            update() {
                this.x += this.velocity.x;
                this.y += this.velocity.y;
                this.alpha -= 0.01;
            }
        }

        function spawn() {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const colors = ['#ff0077', '#ffb6c1', '#ffd700', '#ffffff'];
            const color = colors[Math.floor(Math.random() * colors.length)];
            for (let i = 0; i < 30; i++) particles.push(new Particle(x, y, color));
        }

        function animate() {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            particles.forEach((p, i) => {
                if (p.alpha <= 0) particles.splice(i, 1);
                else { p.update(); p.draw(); }
            });
            requestAnimationFrame(animate);
        }
        setInterval(spawn, 600);
        animate();
    }

    checkAccess();
});
