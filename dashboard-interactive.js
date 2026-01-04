// ============================================
// LOOPY'S CORNER - INTERACTIVE EFFECTS
// FINAL VERSION - CLEAN & ORGANIZED
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('🎨 Interactive effects loaded!');
    
    initCursorTrail();
    initCardHoverEffects();
    initCharacterInteractions();
    initFloatingHearts();
});

// ============================================
// PAW PRINT CURSOR TRAIL
// ============================================
function initCursorTrail() {
    const canvas = document.getElementById('cursorCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '9998';
    
    const paws = [];
    const maxPaws = 15;
    
    document.addEventListener('mousemove', function(e) {
        paws.push({
            x: e.clientX,
            y: e.clientY,
            size: 20,
            opacity: 1,
            rotation: Math.random() * 360
        });
        
        if (paws.length > maxPaws) {
            paws.shift();
        }
    });
    
    function animatePaws() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        paws.forEach((paw) => {
            paw.opacity -= 0.02;
            paw.size -= 0.2;
            
            if (paw.opacity > 0) {
                ctx.save();
                ctx.translate(paw.x, paw.y);
                ctx.rotate((paw.rotation * Math.PI) / 180);
                ctx.globalAlpha = paw.opacity;
                ctx.font = `${paw.size}px Arial`;
                ctx.fillText('🐾', -paw.size/2, paw.size/2);
                ctx.restore();
            }
        });
        
        requestAnimationFrame(animatePaws);
    }
    
    animatePaws();
    
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// ============================================
// CARD HOVER EFFECTS WITH HEARTS
// ============================================
function initCardHoverEffects() {
    const cards = document.querySelectorAll('.dashboard-card');
    
    cards.forEach(card => {
        const heartsContainer = card.querySelector('.card-hearts');
        
        card.addEventListener('mouseenter', function() {
            for (let i = 0; i < 3; i++) {
                setTimeout(() => {
                    createFloatingHeart(heartsContainer);
                }, i * 100);
            }
            
            reactCharacters(card.getAttribute('data-card'));
        });
        
        card.addEventListener('click', function(e) {
            if (!card.classList.contains('locked-card')) {
                for (let i = 0; i < 5; i++) {
                    setTimeout(() => {
                        createClickHeart(e.clientX, e.clientY);
                    }, i * 50);
                }
            }
        });
    });
}

function createFloatingHeart(container) {
    if (!container) return;
    
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.textContent = ['💕', '💖', '💗', '💝'][Math.floor(Math.random() * 4)];
    heart.style.left = Math.random() * 100 + '%';
    heart.style.animationDuration = (Math.random() * 2 + 2) + 's';
    container.appendChild(heart);
    
    setTimeout(() => heart.remove(), 3000);
}

function createClickHeart(x, y) {
    const heart = document.createElement('div');
    heart.className = 'click-heart';
    heart.textContent = '💕';
    heart.style.left = x + 'px';
    heart.style.top = y + 'px';
    document.body.appendChild(heart);
    
    setTimeout(() => heart.remove(), 1000);
}

// ============================================
// CHARACTER INTERACTIONS
// ============================================
function initCharacterInteractions() {
    const characters = document.querySelectorAll('.character');
    
    characters.forEach(char => {
        const speech = char.querySelector('.character-speech');
        
        char.addEventListener('mouseenter', function() {
            speech.style.opacity = '1';
            speech.style.transform = 'translateY(-10px) scale(1)';
            char.style.transform = 'scale(1.1) rotate(5deg)';
        });
        
        char.addEventListener('mouseleave', function() {
            speech.style.opacity = '0';
            speech.style.transform = 'translateY(0) scale(0.8)';
            char.style.transform = 'scale(1) rotate(0deg)';
        });
    });
}

function reactCharacters(cardType) {
    const loopy = document.querySelector('.loopy-char .character-speech');
    const snoopyFlower = document.querySelector('.snoopy-flower-char .character-speech');
    
    const reactions = {
        bio: { loopy: 'Hi\'Twin ! 🥰', flower: 'Adorable! 🌸' },
        birthday: { loopy: 'Yay! 🎂', flower: 'Celebrate! 🎊' },
        messages: { loopy: 'Love notes! 💌', flower: 'Aww! 💖' },
        love: { loopy: 'I\'m loved! 💕', flower: 'Beautiful! 🌸' },
        memories: { loopy: 'Remember! 📸', flower: 'Precious! 💕' },
        foryou: { loopy: 'For me? ✨', flower: 'Thank you! 🌸' }
    };
    
    if (reactions[cardType]) {
        if (loopy) loopy.textContent = reactions[cardType].loopy;
        if (snoopyFlower) snoopyFlower.textContent = reactions[cardType].flower;
    }
}

// ============================================
// RANDOM FLOATING HEARTS & FLOWERS
// ============================================
function initFloatingHearts() {
    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'random-floating-heart';
        heart.textContent = ['💕', '💖', '💗', '💝', '🌸', '🌺'][Math.floor(Math.random() * 6)];
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = (Math.random() * 3 + 3) + 's';
        heart.style.fontSize = (Math.random() * 20 + 20) + 'px';
        document.body.appendChild(heart);
        
        setTimeout(() => heart.remove(), 6000);
    }, 2000);
}

// ============================================
// DYNAMIC STYLES
// ============================================
const style = document.createElement('style');
style.textContent = `
    .floating-heart {
        position: absolute;
        bottom: 0;
        animation: floatUpHeart 3s ease-out forwards;
        pointer-events: none;
        font-size: 1.5em;
        z-index: 100;
    }
    
    @keyframes floatUpHeart {
        0% {
            bottom: 0;
            opacity: 1;
            transform: translateY(0) scale(0.5);
        }
        50% {
            opacity: 1;
            transform: translateY(-100px) scale(1);
        }
        100% {
            bottom: 200px;
            opacity: 0;
            transform: translateY(-200px) scale(0.5);
        }
    }
    
    .click-heart {
        position: fixed;
        animation: burstHeart 1s ease-out forwards;
        pointer-events: none;
        font-size: 2em;
        z-index: 10000;
    }
    
    @keyframes burstHeart {
        0% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(0);
        }
        50% {
            opacity: 1;
            transform: translate(-50%, -100px) scale(1.5);
        }
        100% {
            opacity: 0;
            transform: translate(-50%, -150px) scale(0.5);
        }
    }
    
    .random-floating-heart {
        position: fixed;
        bottom: -50px;
        animation: floatUpRandom 6s ease-out forwards;
        pointer-events: none;
        z-index: 1;
        opacity: 0.3;
    }
    
    @keyframes floatUpRandom {
        0% {
            bottom: -50px;
            opacity: 0;
            transform: translateX(0) rotate(0deg);
        }
        25% {
            opacity: 0.4;
            transform: translateX(-30px) rotate(10deg);
        }
        75% {
            opacity: 0.4;
            transform: translateX(30px) rotate(-10deg);
        }
        100% {
            bottom: 110vh;
            opacity: 0;
            transform: translateX(0) rotate(0deg);
        }
    }
    
    .card-hearts {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        overflow: hidden;
    }
`;
document.head.appendChild(style);