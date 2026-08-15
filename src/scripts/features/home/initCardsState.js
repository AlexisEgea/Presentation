import { CONTENT_SECTION_IDS } from '../../config/sections.js';
import { qs } from '../../shared/dom.js';

// Resets one card to its default state: cover visible, content hidden.
function initCardState(sectionName) {
    const section = qs('.' + sectionName);
    if (!section) {
        return;
    }

    // Ensure expanded content starts from top when re-opened later.
    section.scrollTop = 0;

    const boxDataElement = qs('.box-data', section);
    const boxCoverElement = qs('.box-cover', section);

    if (boxDataElement) {
        boxDataElement.style.opacity = 0;
        boxDataElement.style.visibility = 'hidden';
    }

    if (boxCoverElement) {
        boxCoverElement.style.opacity = 1;
        boxCoverElement.style.visibility = 'visible';
    }
}

export function initCardsState() {
    // Apply default state to all content-driven cards.
    CONTENT_SECTION_IDS.forEach(initCardState);
}
