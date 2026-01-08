// ============================================
// BIRTHDAY PAGE SCRIPT
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('🎂 Birthday page loaded!');
    createConfetti();
});

function createConfetti() {
    const container = document.getElementById('confettiContainer');
    const colors = ['#ff6b9d', '#ffd1dc', '#ffb3c1', '#ff8fa3', '#e91e63', '#c2185b'];
    
    // Create confetti pieces
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
            confetti.style.animationDelay = (Math.random() * 2) + 's';
            container.appendChild(confetti);
            
            // Remove after animation
            setTimeout(() => confetti.remove(), 5000);
        }, i * 30);
    }
    
    // Continue creating confetti
    setInterval(() => {
        for (let i = 0; i < 5; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
            container.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 5000);
        }
    }, 1000);
}