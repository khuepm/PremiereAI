# Design System Specification: Dimensional Modernism

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Dimensional Lab."** 

We are moving away from the flat, "card-on-canvas" layouts of the last decade. This system treats the digital interface as a high-tech viewport into a 3D workspace. It is characterized by deep tonal layering, kinetic accents, and a rejection of traditional structural lines. By utilizing intentional asymmetry and varying levels of translucency, we create an environment that feels premium, cinematic, and infinitely scalable. This isn't just a UI; it is an architectural space for creativity.

---

## 2. Color & Surface Theory

### Tonal Foundation
The palette is rooted in a deep, sophisticated dark theme. We avoid pure blacks for surfaces, opting instead for a range of "Ink" neutrals that allow for soft, ambient light interaction.

*   **Primary (Action):** `primary_container` (#3366ff) – Used for high-intent actions.
*   **Secondary (Vibrancy):** `secondary_container` (#dc027f) – Reserved for creative highlights and "pro" features.
*   **Tertiary (Success/Growth):** `tertiary_container` (#00863b) – Used for validation and positive feedback loops.

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders for sectioning or layout containment. 
Structure must be defined through:
1.  **Background Color Shifts:** Placing a `surface_container_high` element against a `surface` background.
2.  **Negative Space:** Utilizing the `spacing_scale` (specifically 12 and 16 units) to create "breathing" gutters that imply boundaries without drawing them.

### Glass & Gradient Rule
To achieve a "High-Tech" polish, main CTAs and hero elements must use **Signature Textures**. 
*   **Linear Gradients:** Transitioning from `primary` (#b7c4ff) to `primary_container` (#3366ff) at a 135-degree angle.
*   **Glassmorphism:** Floating panels (Modals, Navigation Bars) should use `surface_container_highest` at 70% opacity with a `20px` backdrop-blur. This allows the vibrant accents to "bleed" through the interface, creating a sense of physical depth.

---

## 3. Typography: The Editorial Voice

We lead with **Spline Sans** for a geometric, neo-grotesque feel that balances technical precision with warmth.

*   **The Display Scale:** Use `display-lg` (3.5rem) for hero moments. To break the "template" look, use `-2%` letter spacing and `900` weight.
*   **The Monospace Accent:** Use `ui-monospace` sparingly (Label-sm) for metadata, coordinates, or version numbers to reinforce the "Lab" aesthetic.
*   **Hierarchy as Identity:** 
    *   **Headlines:** High contrast. Always use `headline-lg` against `body-md` to create a dramatic, editorial rhythm.
    *   **Body:** `body-lg` (1rem) for readability, utilizing `on_surface_variant` (#c3c5d8) to reduce visual fatigue against the dark background.

---

## 4. Elevation & Depth: The Layering Principle

Depth is achieved through **Tonal Stacking**, mimicking the way light hits physical objects in a dark room.

*   **Surface Hierarchy:**
    *   **Level 0 (Base):** `surface` (#131313) - The infinite canvas.
    *   **Level 1 (Sections):** `surface_container_low` (#1b1b1b) - Content groupings.
    *   **Level 2 (Cards/Floating):** `surface_container_highest` (#353535) - Interactive objects.
*   **Ambient Shadows:** For floating elements, use a "Tinted Glow" instead of a drop shadow. Shadow color should be `primary` at 8% opacity with a `48px` blur.
*   **The Ghost Border Fallback:** If a container requires a edge for accessibility, use `outline_variant` at 15% opacity. Never use 100% opaque outlines.

---

## 5. Components

### Buttons
*   **Primary:** A gradient fill (Primary to Primary Container). `rounded-md` (0.75rem). No border.
*   **Secondary:** Ghost style. Transparent fill with a `Ghost Border` (outline-variant at 20%).
*   **Tertiary:** `ui-monospace` label, all caps, with a `secondary` color underline on hover.

### Inputs
*   **Styling:** Use `surface_container_lowest` for the field background. 
*   **Focus State:** Instead of a border glow, use a subtle `primary` underline (2px) and shift the background to `surface_container_high`.

### Cards & Lists
*   **No Dividers:** Prohibit the use of horizontal rules. Separate list items using `spacing-4` (1rem) of vertical white space.
*   **Interactive State:** On hover, a card should shift from `surface_container` to `surface_bright` with a soft ambient shadow.

### Floating Dock (Custom Component)
Inspired by 3D toolsets, the main navigation should be a floating "Dock" at the bottom of the viewport. 
*   **Style:** `surface_container_highest` with 60% opacity, `backdrop-blur: 24px`, and `rounded-full`.

---

## 6. Do’s and Don’ts

### Do
*   **DO** use intentional asymmetry. Align a headline to the left and a supporting body paragraph to the right to create a sophisticated, non-standard grid.
*   **DO** use vibrant accent colors (`secondary` and `tertiary`) for data visualization and micro-interactions only. 
*   **DO** lean into the `rounded-xl` (1.5rem) scale for large layout containers to soften the high-tech aesthetic.

### Don’t
*   **DON’T** use pure #000000 or #FFFFFF for UI elements. Use the surface and on-surface tokens to maintain tonal depth.
*   **DON’T** use traditional 1px dividers. If you feel the need for a line, use a spacing gap instead.
*   **DON’T** use "Standard" easing for animations. Use a custom cubic-bezier (0.2, 0.8, 0.2, 1) to mimic the weight and inertia of 3D objects.

---

## 7. Token Reference Summary

| Token | Value | Role |
| :--- | :--- | :--- |
| `surface` | #131313 | Main Background |
| `primary_container` | #3366ff | Key Action Surface |
| `secondary_container` | #dc027f | Creative Highlight |
| `outline_variant` | #434655 | Subtle Edge (at low opacity) |
| `rounded-md` | 0.75rem | Standard Component Radius |
| `spacing-12` | 3rem | Section Gutter |