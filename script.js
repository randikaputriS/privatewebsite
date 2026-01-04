// ============================================
// MONTHLY MESSAGE DISPLAY SCRIPT
// ============================================

function checkAndDisplayMessage() {
    const now = new Date();
    const day = now.getDate();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const monthKey = `${year}-${month}`;
    
    const dateDisplay = document.getElementById('currentDate');
    const messageBox = document.getElementById('messageBox');
    
    if (!dateDisplay || !messageBox) {
        console.log('Message elements not found');
        return;
    }
    
    // Display current date
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    dateDisplay.textContent = `Today is ${now.toLocaleDateString('en-US', options)}`;
    
    // Check if today is the 16th
    if (day === 16) {
        // Get message for this month, or use default
        const message = monthlyMessages[monthKey] || "You are amazing, Kamila! Never forget how special you are. Keep shining! 💕";
        
        messageBox.innerHTML = message;
        messageBox.style.background = "linear-gradient(135deg, #ffe0e9 0%, #ffd1dc 100%)";
    } else {
        // Show locked message
        messageBox.innerHTML = `<div class="locked-message">🔒 Your special message will unlock on the 16th of this month!<br>Come back then to read it 💕</div>`;
        messageBox.style.background = "linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)";
    }
}