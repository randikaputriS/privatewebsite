// ============================================
// POEMS PAGE SCRIPT
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('Poems page loaded');
    
    // Continue music if it was playing
    continueMusicFromDashboard();
    
    // Add animations to poem cards
    animatePoemCards();
});

// Back to dashboard function
function goBack() {
    window.history.back();
}

// Continue music from dashboard
function continueMusicFromDashboard() {
    if (typeof musicPlayer !== 'undefined') {
        const wasPlaying = sessionStorage.getItem('musicPlaying');
        if (wasPlaying === 'true') {
            const currentTime = sessionStorage.getItem('musicTime');
            if (currentTime) {
                musicPlayer.audio.currentTime = parseFloat(currentTime);
            }
            musicPlayer.play();
        }
    }
}

// Animate poem cards on scroll
function animatePoemCards() {
    const cards = document.querySelectorAll('.poem-card');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    cards.forEach(card => {
        observer.observe(card);
    });
}