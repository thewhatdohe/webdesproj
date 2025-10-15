document.addEventListener("DOMContentLoaded", () => {
  // ----------------- Page views -----------------
  // (Removed Discord bot analytics tracking)

  // ----------------- Konami code -----------------
  const konamiCode = [38,38,40,40,37,39,37,39,66,65];
  let konamiIndex = 0;

  document.addEventListener("keydown", (e) => {
    if (e.keyCode === konamiCode[konamiIndex]) {
      konamiIndex++;
      if (konamiIndex === konamiCode.length) {
        konamiIndex = 0;
        triggerConfetti(); // Confetti effect
      }
    } else {
      konamiIndex = 0;
    }
  });

  // ----------------- Lightbox clicks -----------------
  const lightboxImages = ["img1","img2","img3","img4","img5"]; // your image IDs
  lightboxImages.forEach(id => {
    const img = document.getElementById(id);
    if (img) {
      img.style.cursor = "pointer";
      img.addEventListener("click", () => {
        // Simple lightbox
        const overlay = document.createElement("div");
        overlay.style.cssText = `
          position: fixed; top:0; left:0; width:100%; height:100%;
          background: rgba(0,0,0,0.8); display:flex; align-items:center; justify-content:center; z-index:10000;
        `;
        const largeImg = document.createElement("img");
        largeImg.src = img.src;
        largeImg.style.maxWidth = "90%";
        largeImg.style.maxHeight = "90%";
        largeImg.style.borderRadius = "8px";
        overlay.appendChild(largeImg);

        overlay.addEventListener("click", () => overlay.remove());

        document.body.appendChild(overlay);
      });
    }
  });

  // ================= GUIDE POPUP =================
  if (!localStorage.getItem("guideDismissed")) {
    const popup = document.createElement("div");
    popup.id = "guidePopup";
    popup.style.cssText = `
      position: fixed;
      top: 0; left: 0;
      width: 100%; height: 100%;
      background: rgba(0,0,0,0.6);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
    `;

    popup.innerHTML = `
      <div style="
        position: relative;
        background: white;
        padding: 25px;
        border-radius: 12px;
        max-width: 450px;
        text-align: center;
        box-shadow: 0 5px 20px rgba(0,0,0,0.3);
      ">
        <span id="closeGuideBtn" style="
          position: absolute;
          top: 12px;
          right: 15px;
          font-size: 22px;
          font-weight: bold;
          color: #555;
          cursor: pointer;
          transition: color 0.2s ease, transform 0.2s ease;
        ">&times;</span>

        <h2 style="margin-top: 10px;">Welcome!</h2>
        <p id="guideText" style="font-size: 16px;">
          This short guide will help you understand how to use the site.
        </p>

        <div style="margin-top: 20px; display: flex; justify-content: center; gap: 10px;">
          <button id="nextGuideBtn" style="
            background: #007BFF; color: white; border: none;
            padding: 10px 18px; border-radius: 6px; cursor: pointer;
          ">Next</button>

          <button id="skipGuideBtn" style="
            background: #6c757d; color: white; border: none;
            padding: 10px 18px; border-radius: 6px; cursor: pointer;
          ">Do Not Show Again</button>
        </div>
      </div>
    `;

    document.body.appendChild(popup);

    const guideSteps = [
      "This page shows your favorite subjects.",
      "Use the navigation bar at the top to move between sections.",
      "Click on a subject to learn more about it.",
      "Enjoy exploring!"
    ];

    let currentStep = 0;
    const guideText = document.getElementById("guideText");
    const nextBtn = document.getElementById("nextGuideBtn");
    const skipBtn = document.getElementById("skipGuideBtn");
    const closeBtn = document.getElementById("closeGuideBtn");

    nextBtn.addEventListener("click", () => {
      currentStep++;
      if (currentStep < guideSteps.length) {
        guideText.textContent = guideSteps[currentStep];
      } else {
        popup.remove();
      }
    });

    skipBtn.addEventListener("click", () => {
      localStorage.setItem("guideDismissed", "true");
      popup.remove();
    });

    closeBtn.addEventListener("mouseenter", () => {
      closeBtn.style.color = "#000";
      closeBtn.style.transform = "scale(1.1)";
    });
    closeBtn.addEventListener("mouseleave", () => {
      closeBtn.style.color = "#555";
      closeBtn.style.transform = "scale(1)";
    });
    closeBtn.addEventListener("click", () => popup.remove());
  }

  // ================= KONAMI CONFETTI =================
  function triggerConfetti() {
    const confettiCount = 150;
    const colors = ['#f94144','#f3722c','#f9c74f','#90be6d','#43aa8b','#577590','#277da1'];
    const confettiPieces = [];

    for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement('div');
      confetti.style.position = 'fixed';
      confetti.style.width = `${Math.random() * 10 + 8}px`;
      confetti.style.height = `${Math.random() * 4 + 8}px`;
      confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.opacity = Math.random() * 0.7 + 0.3;
      confetti.style.zIndex = 10000;
      confetti.style.pointerEvents = 'none';
      confetti.style.borderRadius = '2px';
      document.body.appendChild(confetti);

      const fromLeft = Math.random() < 0.5;
      const xStart = fromLeft ? Math.random() * 50 : window.innerWidth - Math.random() * 50;
      const yStart = window.innerHeight + 20;

      confetti.style.left = xStart + 'px';
      confetti.style.top = yStart + 'px';
      confetti.style.transform = `rotate(${Math.random() * 360}deg)`;

      confettiPieces.push({
        el: confetti,
        x: xStart,
        y: yStart,
        rotation: Math.random() * 360,
        rotationSpeed: Math.random() * 10 - 5,
        vx: (fromLeft ? 1 : -1) * (Math.random() * 2 + 1),
        vy: -(Math.random() * 7 + 6),
        gravity: 0.05 + Math.random() * 0.05,
        sway: Math.random() * 0.05 + 0.01,
        swayAngle: Math.random() * Math.PI * 2,
        life: 0
      });
    }

    const fadeDuration = 4000;
    function animate() {
      confettiPieces.forEach((c, i) => {
        c.vy += c.gravity;
        c.x += c.vx + Math.sin(c.swayAngle) * 1.5;
        c.y += c.vy;
        c.rotation += c.rotationSpeed;
        c.swayAngle += c.sway;

        c.life += 16;
        const fade = Math.max(0, 1 - c.life / fadeDuration);
        c.el.style.opacity = fade;

        c.el.style.top = c.y + 'px';
        c.el.style.left = c.x + 'px';
        c.el.style.transform = `rotate(${c.rotation}deg)`;

        if (fade <= 0) {
          c.el.remove();
          confettiPieces.splice(i, 1);
        }
      });

      if (confettiPieces.length > 0) requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
  }
});