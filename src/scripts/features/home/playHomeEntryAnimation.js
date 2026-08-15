import { HOME_ENTRY_ANIMATIONS, HOME_ENTRY_ANIMATION_ORDER } from '../../config/sections.js';
import { qs } from '../../shared/dom.js';

// Plays the staggered reveal animation for the main grid on first load.
export function playHomeEntryAnimation() {
    const mainGrid = qs('.main-grid');
    if (!mainGrid) {
        return;
    }

    mainGrid.style.display = 'grid';
    mainGrid.style.opacity = '0';

    // Resolve card nodes in the configured reveal order.
    const gridItems = HOME_ENTRY_ANIMATION_ORDER
        .map((sectionClass) => qs('.' + sectionClass, mainGrid))
        .filter(Boolean);

    gridItems.forEach((item, index) => {
        // Identify which configured animation belongs to this card.
        const sectionClass = Array.from(item.classList).find((cls) => HOME_ENTRY_ANIMATIONS[cls]);
        if (!sectionClass) {
            return;
        }

        // Apply initial hidden/offscreen state, then animate to final state.
        Object.assign(item.style, HOME_ENTRY_ANIMATIONS[sectionClass].enter);
        setTimeout(() => {
            Object.assign(item.style, HOME_ENTRY_ANIMATIONS[sectionClass].final);
        }, 100 * index);
    });

    // Fade in the full grid wrapper once item transitions are queued.
    setTimeout(() => {
        mainGrid.style.transition = 'opacity 0.5s ease-out';
        mainGrid.style.opacity = '1';
    }, 100);
}
