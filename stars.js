const canvas = document.getElementById('stars-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const stars = [];
const shootingStars = [];

for (let i = 0; i < 250; i++) {
    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5,
        opacity: Math.random(),
        twinkleSpeed: 0.005 + Math.random() * 0.015,
        twinkleDir: Math.random() > 0.5 ? 1 : -1
    });
}

function createShootingStar() {
    shootingStars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height * 0.5,
        length: 80 + Math.random() * 100,
        speed: 6 + Math.random() * 6,
        opacity: 1,
        angle: Math.PI / 5
    });
}

setInterval(createShootingStar, 3000);

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Stars only — NO background fill here
    stars.forEach(star => {
        star.opacity += star.twinkleSpeed * star.twinkleDir;
        if (star.opacity >= 1 || star.opacity <= 0.1) {
            star.twinkleDir *= -1;
        }
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();
    });

    // Shooting stars
    for (let i = shootingStars.length - 1; i >= 0; i--) {
        const s = shootingStars[i];
        const grad = ctx.createLinearGradient(
            s.x, s.y,
            s.x - Math.cos(s.angle) * s.length,
            s.y - Math.sin(s.angle) * s.length
        );
        grad.addColorStop(0, `rgba(255,255,255,${s.opacity})`);
        grad.addColorStop(1, 'transparent');

        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x - Math.cos(s.angle) * s.length, s.y - Math.sin(s.angle) * s.length);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        s.x += Math.cos(s.angle) * s.speed;
        s.y += Math.sin(s.angle) * s.speed;
        s.opacity -= 0.018;

        if (s.opacity <= 0) shootingStars.splice(i, 1);
    }

    requestAnimationFrame(draw);
}

draw();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});