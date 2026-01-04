// ============================================
// BIOGRAPHY PAGE SCRIPT
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('Biography page loaded');
    
    // Handle image loading
    handleImageDisplay();
    
    // Add smooth scroll animations
    addScrollAnimations();
});

function handleImageDisplay() {
    const profileImage = document.getElementById('profileImage');
    const placeholder = document.getElementById('imagePlaceholder');
    
    // ⚠️ TO ADD YOUR IMAGE ⚠️
    // Replace "placeholder-image.jpg" in the HTML with your actual image filename
    // When image loads successfully, it will show. Otherwise, placeholder shows.
    
    profileImage.addEventListener('load', function() {
        console.log('Image loaded successfully');
        placeholder.style.display = 'none';
        profileImage.style.display = 'block';
    });
    
    profileImage.addEventListener('error', function() {
        console.log('No image found, showing placeholder');
        placeholder.style.display = 'flex';
        profileImage.style.display = 'none';
    });
    
    // Try to load the image
    if (profileImage.complete) {
        if (profileImage.naturalWidth === 0) {
            // Image failed to load
            placeholder.style.display = 'flex';
            profileImage.style.display = 'none';
        } else {
            // Image loaded successfully
            placeholder.style.display = 'none';
            profileImage.style.display = 'block';
        }
    }
}

function addScrollAnimations() {
    // Animate sections on scroll
    const sections = document.querySelectorAll('.bio-section');
    
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
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    });
}

function goBack() {
    // Go back to main website
    // This will be connected to the dashboard later
    window.history.back();
    
    // Alternative: If you want to reload main page
    // window.location.href = 'index.html';
}