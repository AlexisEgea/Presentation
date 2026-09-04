import { PANEL_ENTRY_ANIMATIONS, PANEL_ENTRY_DURATION_MS } from '../../config/panel.js';
import { qsa, qs } from '../../shared/dom.js';

// Plays a fade-in reveal on panel items.
export function playPanelEntryAnimation(container) {
    if (!container) {
        return;
    }

    const intro = qs('.panel-intro', container);
    const panels = qsa('.panel', container);
    const items = intro ? [intro, ...panels] : panels;
    const animation = PANEL_ENTRY_ANIMATIONS[0];

    items.forEach((item) => {
        Object.assign(item.style, animation.enter);
        item.classList.add('is-revealed');
    });

    if (items[0]) {
        items[0].offsetHeight;
    }

    items.forEach((item) => {
        requestAnimationFrame(() => {
            Object.assign(item.style, animation.final);
        });

        setTimeout(() => {
            item.style.removeProperty('opacity');
            item.style.removeProperty('transition');
        }, PANEL_ENTRY_DURATION_MS);
    });
}
