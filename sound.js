(function() {
    const style = document.createElement('style');
    style.innerHTML = `
        .menu-container { position: fixed; bottom: 30px; right: 30px; z-index: 99999; display: flex; flex-direction: column; gap: 12px; align-items: center; }
        .main-btn { width: 60px; height: 60px; border-radius: 50%; background: #d4af37; color: #630e10; border: 3px solid white; cursor: pointer; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 10px rgba(0,0,0,0.3); transition: transform 0.2s; }
        .main-btn:active { transform: scale(0.9); }
        .sub-menu { display: none; flex-direction: column; gap: 10px; margin-bottom: 5px; }
        .sub-btn { width: 50px; height: 50px; border-radius: 50%; border: none; background: #fff; color: #8b0000; cursor: pointer; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 5px rgba(0,0,0,0.2); transition: transform 0.2s; }
        .sub-btn:active { transform: scale(0.9); }
    `;
    document.head.appendChild(style);

    // கூகுள் டிரான்ஸ்லேட் ஸ்கிரிப்ட்
    const transScript = document.createElement('script');
    transScript.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    document.head.appendChild(transScript);
    window.googleTranslateElementInit = () => {
        new google.translate.TranslateElement({pageLanguage: 'en'}, 'google_translate_element');
    };

    const container = document.createElement('div');
    container.className = 'menu-container';
    container.innerHTML = `
        <div id="subMenu" class="sub-menu" style="display: flex;">
            <button class="sub-btn" onclick="playSound(this)" title="Audio"><svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg></button>
            <div id="google_translate_element" style="display:block; position:fixed; bottom:100px; right:30px; z-index:99999;"></div>
            <button class="sub-btn" onclick="openTranslate()" title="Translate"><svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04z"/></svg></button>
        </div>
        <button class="main-btn" onclick="toggleMenu()"><svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.63l-1.92-3.33c-.12-.22-.38-.31-.61-.22l-2.38.96c-.5-.38-1.03-.7-1.6-.96l-.36-2.52c-.04-.24-.25-.42-.5-.42h-3.84c-.26 0-.47.18-.5-.42l-.36 2.52c-.57.26-1.1.59-1.6.96l-2.38-.96c-.24-.1-.5-.01-.61.22l-1.92 3.33c-.11.22-.06.49.12.63l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.63l1.92 3.33c.12.22.38.31.61.22l2.38-.96c.5.38 1.03.7 1.6.96l.36 2.52c.04.24.25.42.5.42h3.84c.26 0 .47-.18.5-.42l.36-2.52c.57-.26 1.1-.59 1.6-.96l2.38.96c.24.1.5.01.61-.22l1.92-3.33c.11-.22.06-.49-.12-.63l-2.03-1.58zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"/></svg></button>
    `;
    document.body.appendChild(container);

    window.toggleMenu = () => {
        const menu = document.getElementById('subMenu');
        menu.style.display = (menu.style.display === 'flex') ? 'none' : 'flex';
    };

    window.openTranslate = () => {
        const select = document.querySelector('.goog-te-combo');
        if (select) {
            select.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
        } else {
            alert("மொழிபெயர்ப்புத் தளம் தயாராகிறது, ஒரு நிமிடம் காத்திருக்கவும்.");
        }
    };

    let currentAudio = null;
    let isPlaying = false;

    window.playSound = (btn) => {
        if (isPlaying) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
            btn.style.backgroundColor = "#fff";
            btn.style.color = "#8b0000";
            isPlaying = false;
        } else {
            if (!currentAudio) {
                currentAudio = new Audio('sound.mp3');
                currentAudio.loop = true;
            }
            currentAudio.play();
            btn.style.backgroundColor = "#d4af37";
            btn.style.color = "#fff";
            isPlaying = true;
        }
    };
})();
