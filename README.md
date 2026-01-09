# **AURORA — Interactive 3D Jewellery Viewer**

Premium ring visualization experience built using **A-Frame**.  
Designed for product-level inspection with focus mode, controlled rotation, and deterministic UI state behavior.  

---

## **Overview**

AURORA showcases three distinct ring models arranged in a static idle layout.  
Users can click any ring to enter **focus mode**, enabling 360° rotation for inspection and revealing product specifications in a right-side panel.

The interaction sequence is designed to be predictable and gated:

idle → focus → inspect → exit → idle


---

## **Key Features**

- Static idle layout on load
- Click-to-focus interaction
- 360° drag rotation (constrained to Y-axis)
- Non-focused models hidden during focus mode
- Smooth position transitions (forward & restore)
- UI-based specification panel
- Close action returns to exact original layout
- No external templates, tools, or engines
- Lightweight metallic rendering configuration

---

## **Assessment Requirements Satisfied**

✔ Rings stationary when loaded  
✔ Focused ring moves to foreground  
✔ Only focused ring rotatable  
✔ Non-focused rings are visually gated & non-interactive  
✔ UI panel toggles automatically  
✔ Close restores layout & visibility  
✔ Deterministic state logic  
✔ PBR/metallic rendering  
✔ No external frameworks or templates  
✔ Pure A-Frame ECS approach  

---

## **Tech Stack**

| Layer | Choice |
|---|---|
| Framework | A-Frame |
| Rendering | WebGL |
| UI | HTML + CSS |
| Interaction | Pointer/Mouse |
| Models | GLB |

---



---

## **Interaction Model**

- **Click** a ring → move to focus position
- **Drag** horizontally → rotate ring
- **Close** panel → restore idle layout

Rotation is continuous, non-snap, and does not rely on physics or tween libraries.

---

## **UI Behavior**

**Idle Mode**
- All three rings visible
- Labels visible
- Footer text visible

**Focus Mode**
- One ring visible
- Specification panel visible
- Close button visible
- Rotation enabled
- Footer hidden

**Exit Mode**
- Restore original position & rotation
- Re-enable idle labels
- Re-enable footer

---

## **Rendering Notes**

- Ambient + directional + rim-light balance
- Metallic properties using PBR values
- No HDR environment map
- Dark background for contour separation
- No shadows/post-processing for performance

## **Future Extensions (Optional)**

- HDRI reflections for enhanced PBR
- AR (WebXR) try-on mode
- Variant selection (color/material)
- Touch inertial rotation
- Product carousel
- Multi-model product line




## 🔗 Live Demo

Experience the live interactive demo here:  
👉 https://aurora-3-d.vercel.app/









