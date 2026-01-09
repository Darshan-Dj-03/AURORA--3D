const rings = document.querySelectorAll(".ring");
const ringLabels = document.querySelectorAll(".ring-label");
const closeBtn = document.getElementById("close");
const specsPanel = document.getElementById("specs-panel");
const footerText = document.getElementById("footer-text");
const subtextScene2 = document.getElementById("subtext-scene2");
const scene = document.querySelector("a-scene");
const focusShadow = document.getElementById("focus-shadow");


// ---------------- ORIGINAL PLACEMENT FIXES ---------------- //
const originalPlacement = {
  ring_gothic: { x: -3.5, y: -0.1, z: 0 },
  ring_women: { x: 0, y: -0.3, z: 0 },     // lowered slightly (visual center)
  ring_men: { x: 3.5, y: -0.1, z: 0 }
};


// ---------------- RING SPEC DATA ---------------- //
const ringContent = {
  "ring_women": {
    title: "AURIX ROSALIA <span style='display:block; font-size: 0.55em; opacity: 0.75;'>Rose Gold + Solitaire</span>",
    desc: "Slim. Elegant. Effortless.<br>Polished to a mirror rose sheen.<br>Designed to reflect modern grace.",
    specs: [
      { key: "Metal", val: "18K Rose Gold" },
      { key: "Stone", val: "Solitaire Diamond" },
      { key: "Finish", val: "High Polish" },
      { key: "Profile", val: "Slim Modern Band" }
    ]
  },

  "ring_men": {
    title: "AURIX ONYX <span style='display:block; font-size: 0.55em; opacity: 0.75;'>Silver + Onyx</span>",
    desc: "Minimal form. Maximum character.<br>Onyx set with refined precision.<br>A statement of quiet confidence.",
    specs: [
      { key: "Metal", val: "Sterling Silver 925" },
      { key: "Stone", val: "Black Onyx" },
      { key: "Finish", val: "Clean Satin Polish" },
      { key: "Style", val: "Modern Minimal" }
    ]
  },

  "ring_gothic": {
    title: "AURIX UMBRIS <span style='display:block; font-size: 0.55em; opacity: 0.75;'>Oxidized Silver + Dark Gemstone</span>",
    desc: "Forged in shadowed metal.<br>Refined with Gothic precision.<br>Engineered to command presence.",
    specs: [
      { key: "Metal", val: "Oxidized Sterling Silver 925" },
      { key: "Finish", val: "Oxidized Satin" },
      { key: "Style", val: "Gothic Signet" }
    ]
  }
};


// ---------------- STATE ---------------- //
let activeRing = null;
let isDragging = false;
let lastX = 0;
const originalPositions = new Map();


// ---------------- INIT ---------------- //
function initRings() {
  rings.forEach(ring => {
    
    const pos = originalPlacement[ring.id];
    const rot = ring.getAttribute("rotation");

    originalPositions.set(ring, { pos, rot });

    // ----------------------------------- //
    // MODEL LOADED MATERIAL TWEAKS
    // ----------------------------------- //
    ring.addEventListener("model-loaded", () => {
      ring.object3D.traverse(node => {
        if (node.isMesh) {
          node.material.metalness = 1.0;
          node.material.roughness = 0.18;
        }
      });

      // CENTER MODEL ADJUSTMENTS
      if (ring.id === "ring_women") {
        ring.object3D.rotation.x = THREE.MathUtils.degToRad(-90);
      }
    });


    // ----------------------------------- //
    // CLICK EVENT
    // ----------------------------------- //
    ring.addEventListener("click", () => {
      if (activeRing) return;

      activeRing = ring;
      rings.forEach(r => { if (r !== ring) r.object3D.visible = false; });
      ringLabels.forEach(l => l.object3D.visible = false);

      const data = ringContent[ring.id];
      if (data) {
        let specsHTML = "";
        data.specs.forEach(s => {
          specsHTML += `<div class="spec-row"><span class="spec-key">${s.key}:</span> <span class="spec-val">${s.val}</span></div>`;
        });
        specsPanel.innerHTML = `<h3>${data.title}</h3><p>${data.desc}</p>${specsHTML}`;
      }

      // MOVE TO LEFT FOCUS
      ring.setAttribute("animation__pos", {
        property: "position",
        to: "-1.4 0 3",
        dur: 800,
        easing: "easeInOutQuad"
      });

      specsPanel.style.display = "block";
      closeBtn.style.display = "block";
      focusShadow.setAttribute("visible", true);
      if (footerText) footerText.classList.remove("visible");
    });
  });
}


// ---------------- DRAG SPIN ---------------- //
window.addEventListener("mousedown", e => {
  if (!activeRing) return;
  isDragging = true;
  lastX = e.clientX;
});

window.addEventListener("mousemove", e => {
  if (!isDragging || !activeRing) return;
  const deltaX = e.clientX - lastX;
  lastX = e.clientX;

  const rot = activeRing.getAttribute("rotation");
  activeRing.setAttribute("rotation", {
    x: rot.x,
    y: rot.y + deltaX * 0.4,
    z: rot.z
  });
});

window.addEventListener("mouseup", () => {
  isDragging = false;
});


// ---------------- CLOSE ---------------- //
closeBtn.addEventListener("click", () => {
  if (!activeRing) return;
  const data = originalPositions.get(activeRing);

  activeRing.setAttribute("animation__pos", {
    property: "position",
    to: `${data.pos.x} ${data.pos.y} ${data.pos.z}`,
    dur: 800,
    easing: "easeInOutQuad"
  });

  setTimeout(() => {
    activeRing.setAttribute("position", data.pos);
    activeRing.setAttribute("rotation", data.rot);

    rings.forEach(r => r.object3D.visible = true);
    ringLabels.forEach(l => l.object3D.visible = true);

    activeRing = null;
  }, 820);

  specsPanel.style.display = "none";
  closeBtn.style.display = "none";
  focusShadow.setAttribute("visible", false);
  footerText.classList.add("visible");
});


// ---------------- SCENE LOADED ---------------- //
if (scene.hasLoaded) initRings();
else scene.addEventListener("loaded", initRings);
