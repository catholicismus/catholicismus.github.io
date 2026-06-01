(function() {
    // 1. html2canvas லைப்ரரியைச் சேர்த்தல்
    const script = document.createElement('script');
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js";
    document.head.appendChild(script);

    script.onload = () => {
        // 2. CSS ஸ்டைல்ஸ்
        const style = document.createElement('style');
        style.innerHTML = `
            .menu-container { position: fixed; bottom: 30px; right: 30px; z-index: 99999; display: flex; flex-direction: column; gap: 10px; }
            .main-btn { width: 60px; height: 60px; border-radius: 50%; background: #d4af37; color: #630e10; border: 2px solid white; cursor: pointer; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 10px rgba(0,0,0,0.3); }
            .sub-menu { display: none; flex-direction: column; gap: 10px; margin-bottom: 10px; }
            .sub-btn { width: 50px; height: 50px; border-radius: 50%; border: none; background: white; color: #630e10; cursor: pointer; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 5px rgba(0,0,0,0.2); }
        `;
        document.head.appendChild(style);

        // 3. மெனுவை உருவாக்குதல்
        const container = document.createElement('div');
        container.className = 'menu-container';
        container.innerHTML = `
            <div id="subMenu" class="sub-menu">
                <button class="sub-btn" onclick="playSound()" title="Play Audio">🔊</button>
                <button class="sub-btn" onclick="downloadPage()" title="Download">⬇️</button>
                <button class="sub-btn" onclick="sharePage()" title="Share">📤</button>
            </div>
            <button class="main-btn" onclick="toggleMenu()">⚙️</button>
        `;
        document.body.appendChild(container);

        // 4. பங்க்ஷன்கள்
        window.toggleMenu = () => {
            const menu = document.getElementById('subMenu');
            menu.style.display = (menu.style.display === 'flex') ? 'none' : 'flex';
        };

        window.playSound = () => {
            const audio = new Audio('sound.mp3');
            audio.play();
        };

        window.downloadPage = async () => {
            const canvas = await html2canvas(document.body);
            const link = document.createElement('a');
            link.download = 'catholicism_page.jpg';
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
