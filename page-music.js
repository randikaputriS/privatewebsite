// ============================================
// PAGE MUSIC PLAYER - SIMPLE VERSION
// ============================================

function startPageMusic(songFile) {
    console.log('🎵 Trying to play:', songFile);

    var audio = new Audio(songFile);
    audio.loop = true;
    audio.volume = 0.4;
    var isPlaying = false;

    // Create music button
    var btn = document.createElement('button');
    btn.id = 'pageMusicBtn';
    btn.innerHTML = '🎵';
    btn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: linear-gradient(135deg, #e91e63 0%, #c2185b 100%);
        color: white;
        border: none;
        font-size: 1.8em;
        cursor: pointer;
        box-shadow: 0 5px 20px rgba(233, 30, 99, 0.4);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        transition: transform 0.3s ease;
    `;
    document.body.appendChild(btn);

    // Try autoplay first
    audio.play().then(function() {
        console.log('✅ Music is playing!');
        isPlaying = true;
        btn.innerHTML = '🎵';
    }).catch(function(err) {
        console.log('⚠️ Autoplay blocked. Click the button to play.');
        console.log('Error:', err);
        isPlaying = false;
        btn.innerHTML = '▶️';
    });

    // Button click toggle
    btn.addEventListener('click', function() {
        if (isPlaying) {
            audio.pause();
            isPlaying = false;
            btn.innerHTML = '🔇';
        } else {
            audio.play();
            isPlaying = true;
            btn.innerHTML = '🎵';
        }
    });

    // Log if file not found
    audio.addEventListener('error', function(e) {
        console.log('❌ ERROR: Could not load song file!');
        console.log('❌ Make sure the file exists:', songFile);
        console.log('❌ Error details:', e);
    });
}