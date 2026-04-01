# Design System Document: The Cinematic Canvas

## 1. Overview & Creative North Star: "The Digital Curator"
This design system is built upon the North Star of **"The Digital Curator."** In a mobile AI video editing environment, the interface must not compete with the content; it must frame it. We are moving away from the "tool-heavy" aesthetic of traditional editors toward a sophisticated, editorial experience that feels like a premium darkroom.

The system breaks the generic "template" look through **intentional asymmetry** and **tonal depth**. Instead of rigid grids and harsh dividers, we use expansive breathing room and overlapping glass layers. The goal is to make the user feel like a director, not a software operator. We prioritize high-contrast typography scales and "soft" depth to ensure that even the most complex AI features feel effortless and high-end.

---

## 2. Colors & Surface Philosophy

The palette is anchored in a deep charcoal foundation, punctuated by electric "AI" accents that signify machine intelligence at work.

### The Palette (Core Tokens)
*   **Background / Surface:** `#0e0e0e` (The Void)
*   **Primary (AI Core):** `#b6a0ff` (Electric Lavender)
*   **Secondary (Action):** `#00e3fd` (Neon Cyan)
*   **Tertiary (Support):** `#ff96bb` (Soft Rose)

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders to section off the UI. To define boundaries, you must use background color shifts or tonal transitions. For example, a `surface-container-low` section sitting directly on a `surface` background provides all the definition necessary. Lines create visual noise; tonal shifts create elegance.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers—stacked sheets of obsidian and frosted glass.
*   **Base Layer:** `surface` (#0e0e0e) for the main canvas.
*   **Secondary Layer:** `surface-container-low` (#131313) for the timeline track.
*   **Floating Elements:** `surface-container-high` (#20201f) for context menus.
*   **Active Overlays:** Glassmorphism (see below).

### The "Glass & Gradient" Rule
AI-related components—specifically the Prompt Bar—must use **Glassmorphism**. Apply `surface-variant` (#262626) at 60% opacity with a `20px` backdrop blur. 
**Signature Texture:** Main CTAs should not be flat. Use a subtle linear gradient transitioning from `primary` (#b6a0ff) to `primary-dim` (#7e51ff) at a 135-degree angle to provide a "soul" that feels alive.

---

## 3. Typography: The Editorial Voice

We utilize a dual-font strategy to balance high-end editorial style with functional clarity.

*   **Display & Headlines (Manrope):** Use Manrope for all large-scale type. Its geometric yet warm proportions convey authority. 
    *   *Scale:* `display-lg` (3.5rem) for splash moments; `headline-sm` (1.5rem) for section titles.
*   **Body & UI (Inter):** Use Inter for all functional text. It is precision-engineered for readability on mobile screens.
    *   *Scale:* `body-md` (0.875rem) is the workhorse for labels and descriptions.
*   **Hierarchy Note:** Use `on-surface-variant` (#adaaaa) for secondary labels to create a sophisticated "receded" effect, ensuring the primary content remains the hero.

---

## 4. Elevation & Depth: Tonal Layering

Traditional shadows are often a crutch for poor layout. In this system, we achieve depth through the **Layering Principle**.

*   **Tonal Stacking:** Place a `surface-container-lowest` (#000000) card onto a `surface-container-low` (#131313) section. This creates a "recessed" look that is perfect for the Smart Timeline.
*   **Ambient Shadows:** For floating elements (Modals/AI Suggestion Popups), use an extra-diffused shadow: `Y: 20px, Blur: 40px, Color: #000000 @ 15%`. This mimics natural light.
*   **The "Ghost Border":** If accessibility requires a border, use the `outline-variant` (#484847) at **15% opacity**. This creates a hint of an edge without breaking the "No-Line" rule.
*   **The Smart Timeline Blocks:** Scenes in the timeline should use the `tertiary-container` and `secondary-container` tokens but at 40% saturation. These "muted blocks" provide color-coding without overwhelming the video preview.

---

## 5. Components: The Primitive Set

### Buttons (The Interaction Core)
*   **Primary (AI Action):** `primary` gradient background, `on-primary` text, `xl` (1.5rem) roundedness.
*   **Secondary (Utility):** Glassmorphism background (60% opacity `surface-variant`) with a `label-md` Inter font.
*   **Tertiary (Minimal):** No background, `on-surface` text with 50% opacity.

### The AI Prompt Bar (Signature Component)
*   **Styling:** Full `xl` (1.5rem) roundedness. 
*   **Material:** Glassmorphism (Backdrop blur 24px) with a `px` Ghost Border at 10% opacity.
*   **Focus State:** The border glows with a `primary-dim` outer shadow (4px blur).

### Smart Timeline Blocks
*   **Styling:** `md` (0.75rem) roundedness.
*   **Spacing:** Use `spacing-1` (0.25rem) gaps between blocks. Never use dividers.
*   **Content:** Leading icon representing the scene type (e.g., "Face Detection") using `label-sm`.

### Input Fields
*   **Styling:** `surface-container-highest` (#262626) background. No bottom line.
*   **States:** Error states use `error` (#ff6e84) but apply it only to the helper text and a subtle 2% red tint to the background, rather than a thick red border.

---

## 6. Do's and Don'ts

### Do:
*   **DO** use whitespace as a functional separator. If you think you need a line, try adding `spacing-8` (2rem) of padding instead.
*   **DO** overlap elements. Let the AI Prompt Bar partially float over the Timeline to create a sense of Z-axis depth.
*   **DO** use `surface-bright` (#2c2c2c) for active states on navigation items.

### Don't:
*   **DON'T** use pure white (#ffffff) for large blocks of text; use `on-surface` which is slightly softened for dark mode eye-strain.
*   **DON'T** use the `none` or `sm` roundedness tokens for main containers. This system is fluid and organic; sharp corners are forbidden for primary containers.
*   **DON'T** use standard "Drop Shadows" on cards. Use Tonal Layering first. If you must use a shadow, it must be ambient and tinted.