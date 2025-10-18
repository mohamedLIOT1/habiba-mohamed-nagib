// Animated star background
const starBg = document.getElementById('star-bg');
const numStars = 120;
for (let i = 0; i < numStars; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    const size = Math.random() * 2 + 1;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.left = `${Math.random() * 100}%`;
    star.style.position = 'absolute';
    star.style.background = 'white';
    star.style.borderRadius = '50%';
    star.style.opacity = Math.random() * 0.8 + 0.2;
    star.style.boxShadow = `0 0 ${Math.random()*12+8}px #fff`;
    starBg.appendChild(star);
    // Add mouse interaction
    star.addEventListener('mouseenter', () => {
        star.style.transition = 'transform 0.25s cubic-bezier(.4,2,.6,1), box-shadow 0.25s, filter 0.25s';
        star.style.transform = 'scale(2.2) rotate(-10deg)';
        star.style.boxShadow = '0 0 30px 10px #fff, 0 0 60px 20px #ffd700';
        star.style.filter = 'brightness(2) drop-shadow(0 0 8px #ffd700)';
    });
    star.addEventListener('mouseleave', () => {
        star.style.transform = '';
        star.style.boxShadow = `0 0 ${Math.random()*12+8}px #fff`;
        star.style.filter = '';
    });
    // Optional: click for shooting star effect
    star.addEventListener('click', () => {
        star.animate([
            { transform: 'scale(2.2) rotate(-10deg)', opacity: 1 },
            { transform: 'translateY(-80px) scale(0.5)', opacity: 0 }
        ], {
            duration: 700,
            easing: 'cubic-bezier(.4,2,.6,1)'
        });
    });
}
// Twinkle animation
setInterval(() => {
    const stars = document.querySelectorAll('.star');
    stars.forEach(star => {
        star.style.opacity = Math.random() * 0.8 + 0.2;
    });
}, 1200);

// Shooting stars effect
const shootingStarsContainer = document.getElementById('shooting-stars');
function spawnShootingStar() {
    const star = document.createElement('div');
    star.className = 'shooting-star';
    star.style.left = `${Math.random() * 90 + 5}%`;
    star.style.top = `${Math.random() * 20 + 2}%`;
    shootingStarsContainer.appendChild(star);
    setTimeout(() => star.remove(), 1300);
}
setInterval(() => {
    if (Math.random() > 0.6) spawnShootingStar();
}, 1800);

// Star burst (explosion) effect
function starBurst(x, y) {
    const burst = document.createElement('div');
    burst.className = 'star-burst';
    burst.style.left = `${x}px`;
    burst.style.top = `${y}px`;
    for (let i = 0; i < 18; i++) {
        const dot = document.createElement('div');
        dot.className = 'star-burst-dot';
        const angle = (i / 18) * 2 * Math.PI;
        const tx = Math.cos(angle) * (60 + Math.random()*30);
        const ty = Math.sin(angle) * (60 + Math.random()*30);
        dot.style.setProperty('--tx', `${tx}px`);
        dot.style.setProperty('--ty', `${ty}px`);
        burst.appendChild(dot);
    }
    document.body.appendChild(burst);
    setTimeout(() => burst.remove(), 900);
}

// Button event for star explosion
document.addEventListener('DOMContentLoaded', () => {
    const btn = document.querySelector('.star-explode-btn');
    if (btn) {
        btn.addEventListener('click', e => {
            const rect = btn.getBoundingClientRect();
            const x = rect.left + rect.width/2;
            const y = rect.top + rect.height/2 + window.scrollY;
            starBurst(x, y);
        });
    }
});