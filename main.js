(function() {
    const script = document.createElement('script');
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js";
    document.head.appendChild(script);

    // கூகுள் டிரான்ஸ்லேட் ஸ்கிரிப்ட்
    const transScript = document.createElement('script');
    transScript.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    document.head.appendChild(transScript);

    window.googleTranslateElementInit = () => {
        new google.translate.TranslateElement({pageLanguage: 'en'}, 'google_translate_element');
    };

    script.onload = () => {
        const style = document.createElement('style');
        style.innerHTML = `
            .menu-container { position: fixed; bottom: 30px; right: 30px; z-index: 99999; display: flex; flex-direction: column; gap: 12px; align-items: center; }
            .main-btn { width: 60px; height: 60px; border-radius: 50%; background: #d4af37; color: #630e10; border: 3px solid white; cursor: pointer; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 10px rgba(0,0,0,0.3); transition: transform 0.2s; }
            .main-btn:active { transform: scale(0.9); }
            .sub-menu { display: none; flex-direction: column; gap: 10px; margin-bottom: 5px; }
            .sub-btn { width: 50px; height: 50px; border-radius: 50%; border: none; background: #fff; color: #8b0000; cursor: pointer; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 5px rgba(0,0,0,0.2); transition: transform 0.2s; }
            .sub-btn:active { transform: scale(0.9); }
            
            /* Pop-up Box */
            .overlay { position: fixed; top:0; left:0; width:100%; height:100%; background: rgba(0,0,0,0.6); display:none; justify-content:center; align-items:center; z-index: 100000; }
            .popup { background: white; padding: 20px; border-radius: 10px; text-align: center; color: #333; }
            .popup-btns { margin-top: 15px; display: flex; gap: 20px; justify-content: center; }
            .p-btn { padding: 8px 20px; cursor: pointer; border: none; border-radius: 5px; font-weight: bold; }
            
            /* Translate Box */
            #google_translate_element { margin-top: 15px; }
        `;
        document.head.appendChild(style);

        const container = document.createElement('div');
        container.className = 'menu-container';
        container.innerHTML = `
            <div id="subMenu" class="sub-menu">
                <button class="sub-btn" onclick="playSound()" title="Audio"><svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg></button>
                <button class="sub-btn" onclick="confirmDownload()" title="Download"><svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M5 20h14v-2H5v2zM19 9h-4V3H9v6H5l7 7 7-7z"/></svg></button>
                <button class="sub-btn" onclick="sharePage()" title="Share"><svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/></svg></button>
                <button class="sub-btn" onclick="showTranslate()" title="Translate"><svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04z"/></svg></button>
            </div>
            <button class="main-btn" onclick="toggleMenu()"><svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.63l-1.92-3.33c-.12-.22-.38-.31-.61-.22l-2.38.96c-.5-.38-1.03-.7-1.6-.96l-.36-2.52c-.04-.24-.25-.42-.5-.42h-3.84c-.26 0-.47.18-.5-.42l-.36 2.52c-.57.26-1.1.59-1.6.96l-2.38-.96c-.24-.1-.5-.01-.61.22l-1.92 3.33c-.11.22-.06.49.12.63l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.63l1.92 3.33c.12.22.38.31.61.22l2.38-.96c.5.38 1.03.7 1.6.96l.36 2.52c.04.24.25.42.5.42h3.84c.26 0 .47-.18.5-.42l.36-2.52c.57-.26 1.1-.59 1.6-.96l2.38.96c.24.1.5.01.61-.22l1.92-3.33c.11-.22.06-.49-.12-.63l-2.03-1.58zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"/></svg></button>
        `;
        document.body.appendChild(container);

        // Pop-up HTML
        const overlay = document.createElement('div');
        overlay.className = 'overlay';
        overlay.innerHTML = `
            <div class="popup" id="mainPopup">
                <p>Do you want to download this page as a picture?</p>
                <div class="popup-btns">
                    <button class="p-btn" style="background:#d4af37; color:white;" onclick="downloadPage()">Yes</button>
                    <button class="p-btn" style="background:#8b0000; color:white;" onclick="closePopup()">No</button>
                </div>
            </div>
            <div class="popup" id="translatePopup" style="display:none;">
                <p>Select Language</p>
                <div id="google_translate_element"></div>
                <div class="popup-btns">
                    <button class="p-btn" style="background:#8b0000; color:white;" onclick="closePopup()">Close</button>
                </div>
            </div>
        `;
        document.body.appendChild(overlay);

        window.toggleMenu = () => {
            const menu = document.getElementById('subMenu');
            menu.style.display = (menu.style.display === 'flex') ? 'none' : 'flex';
        };

        window.showTranslate = () => {
            document.getElementById('mainPopup').style.display = 'none';
            document.getElementById('translatePopup').style.display = 'block';
            overlay.style.display = 'flex';
        };

        let currentAudio = null;
        let isPlaying = false;

        window.playSound = () => {
            const btn = event.currentTarget;
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

        window.confirmDownload = () => {
            document.getElementById('mainPopup').style.display = 'block';
            document.getElementById('translatePopup').style.display = 'none';
            overlay.style.display = 'flex';
        };
        
        window.closePopup = () => overlay.style.display = 'none';

        window.downloadPage = async () => {
            closePopup();
            const canvas = await html2canvas(document.body);
            const link = document.createElement('a');
            link.download = 'catholicism.jpg';
            link.href = canvas.toDataURL("image/jpeg");
            link.click();
        };

        window.sharePage = async () => {
            const canvas = await html2canvas(document.body);
            canvas.toBlob(async (blob) => {
                const file = new File([blob], "page.jpg", { type: "image/jpeg" });
                if (navigator.canShare) await navigator.share({ files: [file] });
            });
        };
    };
})();
