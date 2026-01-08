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
            window.navigateTo('birthday.html');
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
        const diffHours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        
        // Update countdown text with MORE DETAIL
        if (diffDays === 0) {
            countdownText.innerHTML = `Unlocks in ${diffHours} hours! 🎂`;
        } else if (diffDays === 1) {
            countdownText.innerHTML = `Unlocks tomorrow!<br><span style="font-size: 0.9em;">${diffHours} hours remaining</span>`;
        } else if (diffDays <= 7) {
            countdownText.innerHTML = `Unlocks in ${diffDays} days<br><span style="font-size: 0.9em;">Coming soon! 🎉</span>`;
        } else if (diffDays <= 30) {
            countdownText.innerHTML = `Unlocks in ${diffDays} days`;
        } else {
            const monthsUntil = Math.floor(diffDays / 30);
            const remainingDays = diffDays % 30;
            countdownText.innerHTML = `Unlocks in ${monthsUntil} month${monthsUntil > 1 ? 's' : ''}<br><span style="font-size: 0.9em;">and ${remainingDays} days</span>`;
        }
        
        // Set cursor to not-allowed
        birthdayCard.style.cursor = 'not-allowed';
        
        // Add click handler to show message
        birthdayCard.onclick = function() {
            showLockedMessage(diffDays, diffHours);
        };
        
        console.log(`Birthday locked. ${diffDays} days and ${diffHours} hours remaining.`);
    }
}

function showLockedMessage(daysRemaining, hoursRemaining) {
    let message;
    if (daysRemaining === 0) {
        message = `Just ${hoursRemaining} more hours until your special day! 🎂💕\n\nCome back soon!`;
    } else if (daysRemaining === 1) {
        message = `Your birthday surprise unlocks tomorrow!\n\nJust ${hoursRemaining} more hours to wait! 🎂💕`;
    } else {
        message = `This special gift unlocks on January 8th.\n\nCome back in ${daysRemaining} days! 🎂💕`;
    }
    
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