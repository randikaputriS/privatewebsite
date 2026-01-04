// ============================================
// HEART ANIMATION WITH PARTICLES
// ============================================
// Creates a beautiful particle animation that forms into a heart

class HeartAnimation {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.animationComplete = false;
        
        this.init();
    }
    
    init() {
        // Setup canvas
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.canvas.style.position = 'absolute';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.zIndex = '1';
        this.container.appendChild(this.canvas);
        
        // Create particles
        this.createParticles();
        
        // Start animation
        this.animate();
    }
    
    createParticles() {
        const particleCount = 200;
        
        for (let i = 0; i < particleCount; i++) {
            // Calculate heart position using parametric equations
            const t = (i / particleCount) * Math.PI * 2;
            const targetX = 16 * Math.pow(Math.sin(t), 3);
            const targetY = -(13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t));
            
            // Scale and center the heart
            const scale = 15;
            const centerX = this.canvas.width / 2;
            const centerY = this.canvas.height / 2 - 50;
            
            this.particles.push({
                // Start at random position
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                // Target position (heart shape)
                targetX: centerX + targetX * scale,
                targetY: centerY + targetY * scale,
                // Random velocity
                vx: (Math.random() - 0.5) * 4,
                vy: (Math.random() - 0.5) * 4,
                // Color (pink/red gradient)
                color: `hsl(${330 + Math.random() * 30}, 100%, ${50 + Math.random() * 20}%)`,
                size: Math.random() * 3 + 2,
                // Animation progress
                forming: false,
                formProgress: 0
            });
        }
    }
    
    animate() {
        this.ctx.fillStyle = 'rgba(255, 209, 220, 0.1)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        let allFormed = true;
        
        this.particles.forEach(particle => {
            // First phase: chaotic movement (2 seconds)
            if (!particle.forming && Date.now() - this.startTime > 2000) {
                particle.forming = true;
            }
            
            if (!particle.forming) {
                // Chaotic phase
                particle.x += particle.vx;
                particle.y += particle.vy;
                
                // Bounce off edges
                if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
                if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;
            } else {
                // Forming phase: move toward heart position
                particle.formProgress += 0.02;
                
                if (particle.formProgress < 1) {
                    allFormed = false;
                    const progress = this.easeInOutCubic(particle.formProgress);
                    particle.x += (particle.targetX - particle.x) * progress * 0.1;
                    particle.y += (particle.targetY - particle.y) * progress * 0.1;
                } else {
                    // Reached target
                    particle.x = particle.targetX;
                    particle.y = particle.targetY;
                }
            }
            
            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = particle.color;
            this.ctx.fill();
            
            // Draw connecting lines for nearby particles
            if (particle.forming) {
                this.particles.forEach(other => {
                    if (other !== particle && other.forming) {
                        const dx = other.x - particle.x;
                        const dy = other.y - particle.y;
                        const distance = Math.sqrt(dx * dx + dy * dy);
                        
                        if (distance < 30) {
                            this.ctx.beginPath();
                            this.ctx.moveTo(particle.x, particle.y);
                            this.ctx.lineTo(other.x, other.y);
                            this.ctx.strokeStyle = `rgba(233, 30, 99, ${0.2 * (1 - distance / 30)})`;
                            this.ctx.lineWidth = 0.5;
                            this.ctx.stroke();
                        }
                    }
                });
            }
        });
        
        // Check if animation is complete
        if (allFormed && !this.animationComplete) {
            this.animationComplete = true;
            this.showText();
        }
        
        if (!this.animationComplete || Date.now() - this.textShowTime < 2000) {
            requestAnimationFrame(() => this.animate());
        } else {
            // Animation complete, transition to main website
            this.transitionToWebsite();
        }
    }
    
    easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }
    
    showText() {
        this.textShowTime = Date.now();
        const textContainer = document.createElement('div');
        textContainer.style.position = 'absolute';
        textContainer.style.top = '70%';
        textContainer.style.left = '50%';
        textContainer.style.transform = 'translate(-50%, -50%)';
        textContainer.style.textAlign = 'center';
        textContainer.style.zIndex = '2';
        textContainer.style.animation = 'textFadeIn 1s ease-in forwards';
        
        const line1 = document.createElement('h1');
        line1.textContent = 'Hi there someone I love,';
        line1.style.fontSize = '2.5em';
        line1.style.color = 'white';
        line1.style.marginBottom = '10px';
        line1.style.textShadow = '2px 2px 10px rgba(0,0,0,0.3)';
        line1.style.fontFamily = 'Georgia, serif';
        
        const line2 = document.createElement('h2');
        line2.textContent = 'Welcome Home';
        line2.style.fontSize = '3.5em';
        line2.style.color = 'white';
        line2.style.fontWeight = 'bold';
        line2.style.textShadow = '3px 3px 15px rgba(0,0,0,0.3)';
        line2.style.fontFamily = 'Georgia, serif';
        
        textContainer.appendChild(line1);
        textContainer.appendChild(line2);
        this.container.appendChild(textContainer);
    }
    
    transitionToWebsite() {
        const welcomePage = document.getElementById('welcomePage');
        const mainWebsite = document.getElementById('mainWebsite');
        
        // Fade out welcome page
        welcomePage.style.transition = 'opacity 1s ease-out';
        welcomePage.style.opacity = '0';
        
        setTimeout(() => {
            welcomePage.style.display = 'none';
            mainWebsite.style.display = 'block';
            
            // Initialize the monthly message checker
            if (typeof checkAndDisplayMessage === 'function') {
                checkAndDisplayMessage();
            }
        }, 1000);
    }
    
    start() {
        this.startTime = Date.now();
    }
}

// Add CSS for text animation
const style = document.createElement('style');
style.textContent = `
    @keyframes textFadeIn {
        from {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.8);
        }
        to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
    }
`;
document.head.appendChild(style);