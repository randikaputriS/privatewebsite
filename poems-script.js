// ============================================
// POEMS BOOK - REAL PAGE FLIP SCRIPT 📖
// ============================================

let currentPageIndex = 0;
const pages = [];

document.addEventListener('DOMContentLoaded', function() {
    console.log('📖 Book loaded - Click to flip pages!');
    
    // Get all pages
    const pageElements = document.querySelectorAll('.page');
    pageElements.forEach(page => pages.push(page));
    
    // Add click handlers
    setupPageFlipping();
    setupLeftSideClick();
});

// Back to dashboard
function goBack() {
    window.history.back();
}

// Setup page flipping on right side
function setupPageFlipping() {
    pages.forEach((page, index) => {
        page.addEventListener('click', function(e) {
            // Only flip if this is the current top page
            if (index === currentPageIndex && !page.classList.contains('flipped')) {
                flipPageForward(page, index);
            }
        });
    });
}

// Setup click on left side to flip back
function setupLeftSideClick() {
    const bookLeft = document.getElementById('bookLeft');
    
    bookLeft.addEventListener('click', function() {
        flipPageBackward();
    });
}

// Flip page forward (to the right)
function flipPageForward(page, index) {
    console.log('📄 Flipping page forward:', index + 1);
    
    // Add flipped class
    page.classList.add('flipped');
    
    // Update current page index
    currentPageIndex++;
    
    // Update left side content to show previous page
    updateLeftSide(index);
    
    // Play flip sound (optional)
    playFlipSound();
}

// Flip page backward (to the left)
function flipPageBackward() {
    if (currentPageIndex > 0) {
        currentPageIndex--;
        const page = pages[currentPageIndex];
        
        console.log('📄 Flipping page backward:', currentPageIndex + 1);
        
        // Remove flipped class
        page.classList.remove('flipped');
        
        // Update left side
        if (currentPageIndex === 0) {
            showCover();
        } else {
            updateLeftSide(currentPageIndex - 1);
        }
        
        // Play flip sound (optional)
        playFlipSound();
    }
}

// Update left side to show the back of previous page
function updateLeftSide(pageIndex) {
    const bookLeft = document.getElementById('bookLeft');
    const page = pages[pageIndex];
    
    // Get the content from the back of the flipped page
    const backContent = page.querySelector('.page-back .page-content');
    
    if (backContent) {
        bookLeft.innerHTML = '';
        const clone = backContent.cloneNode(true);
        bookLeft.appendChild(clone);
        bookLeft.style.background = '#fffef5';
        bookLeft.style.backgroundImage = `
            linear-gradient(90deg, rgba(200,160,130,0.05) 1px, transparent 1px),
            linear-gradient(rgba(200,160,130,0.05) 1px, transparent 1px)
        `;
        bookLeft.style.backgroundSize = '20px 20px';
    }
}

// Show the original cover
function showCover() {
    const bookLeft = document.getElementById('bookLeft');
    bookLeft.innerHTML = `
        <div class="book-cover">
            <h2 class="cover-title">Poems<br>For You</h2>
            <div class="cover-decoration">
                <span>🌸</span>
                <span>💕</span>
                <span>🌸</span>
            </div>
            <p class="cover-subtitle">Click to open →</p>
        </div>
    `;
    bookLeft.style.background = '#8b6f47';
    bookLeft.style.backgroundImage = 'none';
}

// Optional: Page flip sound
function playFlipSound() {
    // You can add a subtle page turn sound here
    // const sound = new Audio('page-flip.mp3');
    // sound.volume = 0.3;
    // sound.play();
    console.log('🔊 Page flip sound');
}

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        // Flip forward if there are more pages
        if (currentPageIndex < pages.length) {
            const page = pages[currentPageIndex];
            if (!page.classList.contains('flipped')) {
                flipPageForward(page, currentPageIndex);
            }
        }
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        // Flip backward
        flipPageBackward();
    }
});

// Touch/Swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    
    if (touchStartX - touchEndX > swipeThreshold) {
        // Swipe left - flip forward
        if (currentPageIndex < pages.length) {
            const page = pages[currentPageIndex];
            if (!page.classList.contains('flipped')) {
                flipPageForward(page, currentPageIndex);
            }
        }
    }
    
    if (touchEndX - touchStartX > swipeThreshold) {
        // Swipe right - flip backward
        flipPageBackward();
    }
}