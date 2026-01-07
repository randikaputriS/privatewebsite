// ============================================
// MONTHLY MESSAGES SCRIPT
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('📬 Monthly Messages loaded');
    displayCurrentDate();
    checkAndDisplayMessage();
    loadPastMessages();
});

function displayCurrentDate() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateString = now.toLocaleDateString('en-US', options);
    
    const dateElement = document.getElementById('currentDate');
    if (dateElement) {
        dateElement.textContent = `Today is ${dateString}`;
    }
}

function checkAndDisplayMessage() {
    const now = new Date();
    const day = now.getDate();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const monthKey = `${year}-${month}`;
    
    const envelope = document.getElementById('envelope');
    const messageContent = document.getElementById('messageContent');
    const messageText = document.getElementById('messageText');
    const statusText = document.getElementById('statusText');
    
    // Check if today is the 16th
    if (day === 16) {
        // UNLOCKED! Show message
        console.log('✅ Today is the 16th! Message unlocked!');
        
        // Hide envelope, show message
        setTimeout(() => {
            envelope.style.display = 'none';
            messageContent.classList.add('show');
            
            // Get message for this month
            const message = monthlyMessages[monthKey] || 
                "You are amazing! Never forget how special you are. Keep shining! 💕";
            
            messageText.innerHTML = `
                <div style="font-size: 2.5em; margin-bottom: 20px;">💌</div>
                <p>${message}</p>
                <div style="margin-top: 30px; font-size: 0.9em; color: #c2185b; font-style: italic;">
                    — Written with love, just for you
                </div>
            `;
            
            statusText.textContent = '✨ Today\'s message is now unlocked!';
        }, 2000);
        
    } else {
        // LOCKED - Show countdown
        console.log('🔒 Message is locked');
        
        // Calculate days until 16th
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();
        let targetDate;
        
        if (day < 16) {
            // 16th is this month
            targetDate = new Date(currentYear, currentMonth, 16);
        } else {
            // 16th is next month
            targetDate = new Date(currentYear, currentMonth + 1, 16);
        }
        
        const diffTime = targetDate - now;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        // Show locked message
        setTimeout(() => {
            envelope.style.display = 'none';
            messageContent.classList.add('show');
            messageContent.classList.add('locked');
            
            const countdownText = diffDays === 1 
                ? 'Your message unlocks tomorrow!' 
                : `Your message unlocks in ${diffDays} days`;
            
            messageText.innerHTML = `
                <div style="font-size: 3em; margin-bottom: 20px;">🔒</div>
                <p class="locked-message">
                    This month's special message is locked.<br><br>
                    ${countdownText}<br><br>
                    Come back on the 16th to read it! 💕
                </p>
            `;
            messageText.classList.add('locked-message');
            
            statusText.textContent = `🗓️ Next message available: ${targetDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`;
        }, 2000);
    }
}

function loadPastMessages() {
    const archiveGrid = document.getElementById('archiveGrid');
    if (!archiveGrid) return;
    
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;
    
    // Get all past messages (only months that have passed)
    const pastMessages = [];
    
    for (let monthKey in monthlyMessages) {
        const [year, month] = monthKey.split('-').map(Number);
        
        // Only show if:
        // 1. It's from a previous year, OR
        // 2. It's from this year but a previous month, OR
        // 3. It's from this month but we're past the 16th
        if (year < currentYear || 
            (year === currentYear && month < currentMonth) ||
            (year === currentYear && month === currentMonth && now.getDate() >= 16)) {
            
            pastMessages.push({
                key: monthKey,
                message: monthlyMessages[monthKey],
                date: new Date(year, month - 1, 16)
            });
        }
    }
    
    // Sort by date (newest first)
    pastMessages.sort((a, b) => b.date - a.date);
    
    // Display past messages
    if (pastMessages.length === 0) {
        archiveGrid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 40px; color: white; font-size: 1.2em;">
                <div style="font-size: 3em; margin-bottom: 15px; opacity: 0.5;">📭</div>
                No past messages yet.<br>
                Check back after the 16th!
            </div>
        `;
    } else {
        pastMessages.forEach(item => {
            const card = document.createElement('div');
            card.className = 'archive-card';
            
            const dateStr = item.date.toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long' 
            });
            
            // Create preview (first 100 characters)
            const preview = item.message.length > 100 
                ? item.message.substring(0, 100) + '...'
                : item.message;
            
            card.innerHTML = `
                <div class="archive-date">💌 ${dateStr}</div>
                <div class="archive-preview">${preview}</div>
            `;
            
            // Click to show full message
            card.addEventListener('click', () => {
                showArchiveMessage(dateStr, item.message);
            });
            
            archiveGrid.appendChild(card);
        });
    }
}

function showArchiveMessage(date, message) {
    // Create overlay
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
        border-radius: 25px;
        max-width: 600px;
        max-height: 80vh;
        overflow-y: auto;
        box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        animation: slideUp 0.4s ease;
    `;
    
    messageBox.innerHTML = `
        <div style="text-align: center; margin-bottom: 20px;">
            <div style="font-size: 3em; margin-bottom: 10px;">💌</div>
            <h2 style="color: #e91e63; font-size: 1.5em;">${date}</h2>
        </div>
        <div style="
            font-size: 1.2em;
            line-height: 2;
            color: #5d1f1f;
            padding: 25px;
            background: linear-gradient(135deg, #fff5f7 0%, #ffe8ef 100%);
            border-radius: 15px;
            border-left: 5px solid #e91e63;
        ">
            ${message}
        </div>
        <button onclick="this.parentElement.parentElement.remove()" style="
            margin-top: 25px;
            width: 100%;
            padding: 12px;
            background: linear-gradient(135deg, #e91e63 0%, #c2185b 100%);
            color: white;
            border: none;
            border-radius: 25px;
            font-size: 1.1em;
            cursor: pointer;
            font-family: Georgia, serif;
        ">Close</button>
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