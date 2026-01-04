// ============================================
// LOGIN SYSTEM WITH CINEMATIC HEART ANIMATION
// ============================================

// The ONLY correct name (must be exact!)
const CORRECT_NAME = "Melati Safa Kamila Ali Yanuar";

// Get personalized greeting based on time of day
function getTimeBasedGreeting() {
    const now = new Date();
    const hour = now.getHours();
    
    // Morning: 5 AM - 11 AM
    if (hour >= 5 && hour < 12) {
        return {
            line1: "Good morning, my love.",
            line2: "Welcome Home"
        };
    }
    // Afternoon: 12 PM - 5 PM
    else if (hour >= 12 && hour < 17) {
        return {
            line1: "Hi there, beautiful.",
            line2: "Welcome Home"
        };
    }
    // Evening: 5 PM - 9 PM
    else if (hour >= 17 && hour < 21) {
        return {
            line1: "Good evening, someone I love.",
            line2: "Welcome Home"
        };
    }
    // Night: 9 PM - 5 AM
    else {
        return {
            line1: "Still thinking of me?",
            line2: "Welcome Home"
        };
    }
}

// Wait for page to load
document.addEventListener('DOMContentLoaded', function() {
    console.log('Login system loaded');
    
    const nameInput = document.getElementById('nameInput');
    const submitBtn = document.getElementById('submitBtn');
    const errorMessage = document.getElementById('errorMessage');
    
    // Focus on input
    if (nameInput) {
        nameInput.focus();
    }
    
    // Add click event to button
    if (submitBtn) {
        submitBtn.addEventListener('click', checkName);
    }
    
    // Allow pressing Enter to submit
    if (nameInput) {
        nameInput.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                checkName();
            }
        });
    }
});

function checkName() {
    console.log('Checking name...');
    
    const nameInput = document.getElementById('nameInput');
    const errorMessage = document.getElementById('errorMessage');
    const enteredName = nameInput.value.trim();
    
    console.log('Entered:', enteredName);
    console.log('Correct:', CORRECT_NAME);
    
    // Check if the entered name matches EXACTLY
    if (enteredName === CORRECT_NAME) {
        console.log('Access granted!');
        errorMessage.textContent = '';
        showHeartAnimation();
    } else {
        console.log('Access denied!');
        // WRONG! Show error message
        errorMessage.textContent = "Access Denied. This Page Is Not For You.";
        nameInput.value = "";
        
        // Shake the login box
        const loginBox = document.querySelector('.login-box');
        if (loginBox) {
            loginBox.style.animation = 'shake 0.5s ease-in-out';
            setTimeout(() => {
                loginBox.style.animation = '';
            }, 500);
        }
    }
}

function showHeartAnimation() {
    console.log('Starting cinematic heart animation...');
    
    const loginPage = document.getElementById('loginPage');
    const welcomePage = document.getElementById('welcomePage');
    
    // Slow fade out login page
    loginPage.style.transition = 'opacity 1.5s ease-out';
    loginPage.style.opacity = '0';
    
    setTimeout(() => {
        loginPage.style.display = 'none';
        welcomePage.style.display = 'flex';
        
        // Start heart particle animation
        createHeartAnimation();
    }, 1500);
}

function createHeartAnimation() {
    console.log('Creating cinematic heart particles...');
    
    const welcomePage = document.getElementById('welcomePage');
    
    // Create canvas
    const canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    welcomePage.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    const particles = [];
    const particleCount = 250; // More particles for fuller effect
    
    // Create particles with heart shape
    for (let i = 0; i < particleCount; i++) {
        const t = (i / particleCount) * Math.PI * 2;
        const targetX = 16 * Math.pow(Math.sin(t), 3);
        const targetY = -(13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t));
        
        const scale = 15; // Bigger heart
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2 - 80;
        
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            targetX: centerX + targetX * scale,
            targetY: centerY + targetY * scale,
            vx: (Math.random() - 0.5) * 3, // Slower initial movement
            vy: (Math.random() - 0.5) * 3,
            color: `hsl(${330 + Math.random() * 30}, 100%, ${50 + Math.random() * 20}%)`,
            size: Math.random() * 4 + 2, // Slightly bigger particles
            forming: false,
            formProgress: 0
        });
    }
    
    let startTime = Date.now();
    let textShown = false;
    
    function animate() {
        // Slower fade for trail effect (more cinematic)
        ctx.fillStyle = 'rgba(255, 209, 220, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        const elapsed = Date.now() - startTime;
        let allFormed = true;
        
        particles.forEach(particle => {
            // Wait 3 seconds before forming (longer chaotic phase)
            if (!particle.forming && elapsed > 3000) {
                particle.forming = true;
            }
            
            if (!particle.forming) {
                // Chaotic phase - slower movement
                particle.x += particle.vx;
                particle.y += particle.vy;
                
                if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
                if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
            } else {
                // Forming phase - MUCH slower
                particle.formProgress += 0.008; // Slower formation (was 0.02)
                
                if (particle.formProgress < 1) {
                    allFormed = false;
                    // Smooth easing
                    const eased = particle.formProgress < 0.5 
                        ? 4 * particle.formProgress * particle.formProgress * particle.formProgress
                        : 1 - Math.pow(-2 * particle.formProgress + 2, 3) / 2;
                    
                    particle.x += (particle.targetX - particle.x) * eased * 0.05; // Slower movement
                    particle.y += (particle.targetY - particle.y) * eased * 0.05;
                } else {
                    particle.x = particle.targetX;
                    particle.y = particle.targetY;
                }
            }
            
            // Draw particle with glow effect
            ctx.shadowBlur = 15;
            ctx.shadowColor = particle.color;
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = particle.color;
            ctx.fill();
            ctx.shadowBlur = 0;
            
            // Draw connecting lines when forming
            if (particle.forming && particle.formProgress > 0.3) {
                particles.forEach(other => {
                    if (other !== particle && other.forming && other.formProgress > 0.3) {
                        const dx = other.x - particle.x;
                        const dy = other.y - particle.y;
                        const distance = Math.sqrt(dx * dx + dy * dy);
                        
                        if (distance < 40) {
                            ctx.beginPath();
                            ctx.moveTo(particle.x, particle.y);
                            ctx.lineTo(other.x, other.y);
                            ctx.strokeStyle = `rgba(233, 30, 99, ${0.3 * (1 - distance / 40)})`;
                            ctx.lineWidth = 1;
                            ctx.stroke();
                        }
                    }
                });
            }
        });
        
        // Show text when heart is fully formed
        if (allFormed && !textShown) {
            textShown = true;
            console.log('Heart formed! Showing text...');
            
            // Wait 1.5 seconds to let viewer admire the heart
            setTimeout(() => {
                showWelcomeText();
                
                // Stay on this screen for 5 seconds total (longer to enjoy)
                setTimeout(() => {
                    transitionToMainWebsite();
                }, 5000);
            }, 1500);
        }
        
        // Keep animating
        if (!textShown || elapsed < 20000) {
            requestAnimationFrame(animate);
        }
    }
    
    animate();
}

function showWelcomeText() {
    console.log('Showing cinematic welcome text...');
    
    const welcomePage = document.getElementById('welcomePage');
    
    // Get personalized greeting based on time
    const greetings = getTimeBasedGreeting();
    
    const textContainer = document.createElement('div');
    textContainer.className = 'welcome-text-container';
    textContainer.style.opacity = '0';
    
    const line1 = document.createElement('h1');
    line1.className = 'welcome-text';
    line1.textContent = greetings.line1;
    line1.style.opacity = '0';
    
    const line2 = document.createElement('h2');
    line2.className = 'welcome-home';
    line2.textContent = greetings.line2;
    line2.style.opacity = '0';
    
    textContainer.appendChild(line1);
    textContainer.appendChild(line2);
    welcomePage.appendChild(textContainer);
    
    // Fade in container first
    setTimeout(() => {
        textContainer.style.transition = 'opacity 1s ease-in';
        textContainer.style.opacity = '1';
    }, 100);
    
    // Then fade in first line
    setTimeout(() => {
        line1.style.transition = 'opacity 1.5s ease-in, transform 1.5s ease-out';
        line1.style.opacity = '1';
        line1.style.transform = 'translateY(0)';
    }, 500);
    
    // Then second line (with delay for drama)
    setTimeout(() => {
        line2.style.transition = 'opacity 1.5s ease-in, transform 1.5s ease-out';
        line2.style.opacity = '1';
        line2.style.transform = 'scale(1)';
    }, 1500);
}

function transitionToMainWebsite() {
    console.log('Transitioning to dashboard...');
    
    // Start music before transition
    if (typeof musicPlayer !== 'undefined') {
        console.log('Starting music...');
        musicPlayer.play();
    }
    
    const welcomePage = document.getElementById('welcomePage');
    
    // Slow, cinematic fade out
    welcomePage.style.transition = 'opacity 2s ease-out';
    welcomePage.style.opacity = '0';
    
    setTimeout(() => {
        // Redirect to dashboard
        console.log('Redirecting to dashboard.html...');
        window.location.href = 'dashboard.html';
    }, 2000);
}