// ============================================
// MUSIC SYSTEM - FIXED VERSION
// Music continues across all pages
// ============================================

class MusicPlayer {
    constructor() {
        this.audio = null;
        this.isPlaying = false;
        this.fadeTimeout = null;
        this.initialVolume = 0.8; // 80%
        this.quietVolume = 0.35; // 35%
        this.fadeDuration = 8000; // 8 seconds
    }
    
    init() {
        console.log('Initializing music player...');
        
        // Create audio element
        this.audio = new Audio('shs.mp3');
        this.audio.loop = true;
        this.audio.volume = this.initialVolume;
        
        // Create music control button
        this.createMusicButton();
        
        // Try to restore playing state if coming from another page
        this.checkAndResumeMusic();
    }
    
    createMusicButton() {
        // Create floating music button
        const button = document.createElement('button');
        button.id = 'musicButton';
        button.className = 'music-button';
        button.innerHTML = '🎵';
        button.title = 'Pause Music';
        button.style.display = 'none'; // Hidden until music starts
        
        button.addEventListener('click', () => {
            this.toggle();
        });
        
        document.body.appendChild(button);
    }
    
    checkAndResumeMusic() {
        // Check if music should be playing (from sessionStorage)
        const shouldPlay = sessionStorage.getItem('musicPlaying');
        const currentTime = sessionStorage.getItem('musicTime');
        
        if (shouldPlay === 'true') {
            console.log('Resuming music on dashboard...');
            if (currentTime) {
                this.audio.currentTime = parseFloat(currentTime);
            }
            this.play();
        }
    }
    
    async play() {
        console.log('Attempting to play music...');
        
        try {
            // Reset volume to initial
            this.audio.volume = this.initialVolume;
            
            // Try to play
            await this.audio.play();
            this.isPlaying = true;
            
            // Save state
            sessionStorage.setItem('musicPlaying', 'true');
            
            // Show music button
            const button = document.getElementById('musicButton');
            if (button) {
                button.style.display = 'flex';
                button.innerHTML = '🎵';
                button.title = 'Pause Music';
            }
            
            console.log('Music playing!');
            
            // Start fade to quiet after 3 seconds
            setTimeout(() => {
                this.fadeToQuiet();
            }, 3000);
            
            // Keep saving current time for page transitions
            setInterval(() => {
                if (this.isPlaying) {
                    sessionStorage.setItem('musicTime', this.audio.currentTime);
                }
            }, 1000);
            
        } catch (error) {
            console.log('Auto-play blocked, showing play button...');
            this.showPlayPrompt();
        }
    }
    
    fadeToQuiet() {
        console.log('Fading music to quiet...');
        
        const startVolume = this.audio.volume;
        const volumeDiff = startVolume - this.quietVolume;
        const steps = 60;
        const stepDuration = this.fadeDuration / steps;
        let currentStep = 0;
        
        const fadeInterval = setInterval(() => {
            currentStep++;
            const progress = currentStep / steps;
            
            // Ease out curve
            const easedProgress = 1 - Math.pow(1 - progress, 3);
            
            this.audio.volume = startVolume - (volumeDiff * easedProgress);
            
            if (currentStep >= steps) {
                clearInterval(fadeInterval);
                this.audio.volume = this.quietVolume;
                console.log('Fade complete. Volume:', this.audio.volume);
            }
        }, stepDuration);
    }
    
    fadeOut(duration = 1000) {
        console.log('Fading music out...');
        
        const startVolume = this.audio.volume;
        const steps = 30;
        const stepDuration = duration / steps;
        let currentStep = 0;
        
        const fadeInterval = setInterval(() => {
            currentStep++;
            const progress = currentStep / steps;
            this.audio.volume = startVolume * (1 - progress);
            
            if (currentStep >= steps) {
                clearInterval(fadeInterval);
                this.audio.volume = 0;
            }
        }, stepDuration);
    }
    
    fadeIn(duration = 1000) {
        console.log('Fading music in...');
        
        this.audio.volume = 0;
        const targetVolume = this.quietVolume;
        const steps = 30;
        const stepDuration = duration / steps;
        let currentStep = 0;
        
        const fadeInterval = setInterval(() => {
            currentStep++;
            const progress = currentStep / steps;
            this.audio.volume = targetVolume * progress;
            
            if (currentStep >= steps) {
                clearInterval(fadeInterval);
                this.audio.volume = targetVolume;
            }
        }, stepDuration);
    }
    
    toggle() {
        if (this.isPlaying) {
            this.pause();
        } else {
            this.resume();
        }
    }
    
    pause() {
        console.log('Pausing music...');
        this.audio.pause();
        this.isPlaying = false;
        sessionStorage.setItem('musicPlaying', 'false');
        
        const button = document.getElementById('musicButton');
        if (button) {
            button.innerHTML = '🔇';
            button.title = 'Play Music';
        }
    }
    
    resume() {
        console.log('Resuming music...');
        this.audio.play();
        this.isPlaying = true;
        sessionStorage.setItem('musicPlaying', 'true');
        
        const button = document.getElementById('musicButton');
        if (button) {
            button.innerHTML = '🎵';
            button.title = 'Pause Music';
        }
    }
    
    showPlayPrompt() {
        // Show the music button as a play prompt
        const button = document.getElementById('musicButton');
        if (button) {
            button.style.display = 'flex';
            button.innerHTML = '▶️';
            button.title = 'Click to Play Music';
            button.classList.add('play-prompt');
            
            // Pulse animation to draw attention
            button.style.animation = 'pulse 2s ease-in-out infinite';
            
            // When clicked, actually start the music
            button.addEventListener('click', () => {
                this.play();
                button.classList.remove('play-prompt');
                button.style.animation = '';
            }, { once: true });
        }
    }
}

// Create global music player instance
const musicPlayer = new MusicPlayer();

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    musicPlayer.init();
});