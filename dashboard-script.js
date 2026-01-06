// ============================================
// DASHBOARD SCRIPT
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('Dashboard loaded');
    
    // Check birthday lock status
    checkBirthdayLock();
    
    // Update countdown every hour
    setInterval(checkBirthdayLock, 3600000);
});

function navigateTo(page) {
    console.log('Navigating to:', page);
    
    // Save music state before navigation
    if (typeof musicPlayer !== 'undefined' && musicPlayer.isPlaying) {
        sessionStorage.setItem('musicPlaying', 'true');
        sessionStorage.setItem('musicTime', musicPlayer.audio.currentTime);
    }
    
    // Navigate immediately (remove fade that might be causing issues)
    window.location.href = page;
}

function checkBirthdayLock() {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth(); // 0-11
    const currentDay = now.getDate();
    
    // Birthday is January 8 (month 0, day 8)
    const birthdayMonth = 0; // January
    const birthdayDay = 8;
    
    const birthdayCard = document.getElementById('birthdayCard');
    const lockOverlay = document.getElementById('lockOverlay');
    const countdownText = document.getElementById('countdownText');
    
    // Check if today is the birthday
    if (currentMonth === birthdayMonth && currentDay === birthdayDay) {
        // UNLOCK! It's her birthday!
        console.log("🎂 It's her birthday! Unlocking...");
        birthdayCard.classList.add('unlocked');
        birthdayCard.classList.remove('locked-card');
        birthdayCard.style.cursor = 'pointer';
        birthdayCard.onclick = function() {
            navigateTo('birthday.html');
        };
    } else {
        // Calculate days until next birthday
        let nextBirthday = new Date(currentYear, birthdayMonth, birthdayDay);
        
        // If birthday has passed this year, calculate for next year
        if (now > nextBirthday) {
            nextBirthday = new Date(currentYear + 1, birthdayMonth, birthdayDay);
        }
        
        // Calculate difference
        const diffTime = nextBirthday - now;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        // Update countdown text
        if (diffDays === 1) {
            countdownText.textContent = "Unlocks tomorrow! 🎂";
        } else if (diffDays <= 30) {
            countdownText.textContent = `Unlocks in ${diffDays} days`;
        } else {
            const monthsUntil = Math.floor(diffDays / 30);
            countdownText.textContent = `Unlocks in ~${monthsUntil} month${monthsUntil > 1 ? 's' : ''}`;
        }
        
        // Add click handler to show message
        birthdayCard.onclick = function() {
            showLockedMessage(diffDays);
        };
        
        console.log(`Birthday locked. ${diffDays} days remaining.`);
    }
}

function showLockedMessage(daysRemaining) {
    const message = daysRemaining === 1 
        ? "Come back tomorrow for a special birthday surprise! 🎂💕"
        : `This special gift unlocks on January 8th.\nCome back in ${daysRemaining} days! 🎂💕`;
    
    // Create temporary message overlay
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        animation: fadeIn 0.3s ease;
    `;
    
    const messageBox = document.createElement('div');
    messageBox.style.cssText = `
        background: white;
        padding: 40px;
        border-radius: 20px;
        text-align: center;
        max-width: 400px;
        box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        animation: slideUp 0.4s ease;
    `;
    
    messageBox.innerHTML = `
        <div style="font-size: 4em; margin-bottom: 20px;">🔒</div>
        <h2 style="color: #e91e63; margin-bottom: 15px; font-size: 1.8em;">Birthday Corner Locked</h2>
        <p style="color: #5d1f1f; font-size: 1.2em; line-height: 1.6; white-space: pre-line;">${message}</p>
        <button onclick="this.parentElement.parentElement.remove()" style="
            margin-top: 25px;
            padding: 12px 30px;
            background: linear-gradient(135deg, #e91e63 0%, #c2185b 100%);
            color: white;
            border: none;
            border-radius: 25px;
            font-size: 1.1em;
            cursor: pointer;
            font-family: Georgia, serif;
        ">Okay</button>
    `;
    
    overlay.appendChild(messageBox);
    document.body.appendChild(overlay);
    
    // Close on overlay click
    overlay.onclick = function(e) {
        if (e.target === overlay) {
            overlay.remove();
        }
    };
}

function navigateTo(page) {
    console.log('Navigating to:', page);
    
    // Fade out current page
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '0';
    
    // Navigate after fade
    setTimeout(() => {
        window.location.href = page;
    }, 500);
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateY(50px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);