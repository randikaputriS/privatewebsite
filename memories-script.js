// ============================================
// OUR MEMORIES SCRIPT
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('📸 Memories page loaded');
    calculateDaysTogether();
});

function calculateDaysTogether() {
    // The day you became girlfriends
    const startDate = new Date('2025-01-16');
    const today = new Date();
    
    // Calculate difference in milliseconds
    const diffTime = Math.abs(today - startDate);
    
    // Convert to days
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    // Update the display
    const daysElement = document.getElementById('daysTogether');
    if (daysElement) {
        // Animate counting up
        animateCounter(daysElement, 0, diffDays, 2000);
    }
}

function animateCounter(element, start, end, duration) {
    let startTime = null;
    
    function animation(currentTime) {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        
        // Ease out function
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(start + (end - start) * easeOut);
        
        element.textContent = current;
        
        if (progress < 1) {
            requestAnimationFrame(animation);
        } else {
            element.textContent = end;
        }
    }
    
    requestAnimationFrame(animation);
}