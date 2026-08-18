import { PANEL_ENTRY_ANIMATIONS, PANEL_ENTRY_DURATION_MS } from '../../config/panel.js';
import { qsa, qs } from '../../shared/dom.js';

// Plays a staggered reveal on panel items, matching the main-grid entry style.
export function playPanelEntryAnimation(container) {
    if (!container) {
        return;
    }

    const intro = qs('.panel-intro', container);
    const panels = qsa('.panel', container);
    const items = intro ? [intro, ...panels] : panels;

    items.forEach((item, index) => {
        const animation = PANEL_ENTRY_ANIMATIONS[index % PANEL_ENTRY_ANIMATIONS.length];
        Object.assign(item.style, animation.enter);
        item.classList.add('is-revealed');

        setTimeout(() => {
            Object.assign(item.style, animation.final);
        }, 100 * index);

        // Drop inline styles after the transition so CSS hover scale works again.
        setTimeout(() => {
            item.style.removeProperty('opacity');
            item.style.removeProperty('transform');
            item.style.removeProperty('transition');
        }, 100 * index + PANEL_ENTRY_DURATION_MS);
    });
}
