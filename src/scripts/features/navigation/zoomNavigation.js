import { SECTION_PAGE_MAP } from '../../config/sections.js';
import { RETURN_SECTION_KEY } from '../../config/storage.js';
import { dezoomFromFullscreen } from './dezoom.js';
import { zoomIn } from './zoom.js';
import { qsa, qs } from '../../shared/dom.js';

// Guards against repeated clicks while a zoom navigation is already in progress.
let isNavigating = false;

// Extracts the logical section identifier from a card class list.
function getSectionClassFromBox(box) {
    const classList = Array.from(box.classList);
    return classList.find(cls => Object.prototype.hasOwnProperty.call(SECTION_PAGE_MAP, cls));
}

// Forces the home grid visible state before running dezoom.
function showGridOnly() {
    const initSection = qs('.init');
    const mainGrid = qs('.main-grid');

    if (initSection) {
        initSection.style.display = 'none';
    }
    if (mainGrid) {
        mainGrid.style.display = 'grid';
        mainGrid.style.opacity = '1';
        mainGrid.style.transition = 'none';
    }
}

// Handles return flow from section pages and triggers the matching dezoom.
export function restoreFromReturnFlow() {
    const params = new URLSearchParams(window.location.search);
    const sectionFromQuery = params.get('from');
    const sectionFromStorage = sessionStorage.getItem(RETURN_SECTION_KEY);
    // Prefer explicit query parameter, fallback to stored section id.
    const sectionClass = sectionFromQuery || sectionFromStorage;
    if (!sectionClass || !Object.prototype.hasOwnProperty.call(SECTION_PAGE_MAP, sectionClass)) {
        return false;
    }

    // Consume stored return marker to avoid stale replays.
    sessionStorage.removeItem(RETURN_SECTION_KEY);
    showGridOnly();
    // Wait for layout to settle before launching dezoom animation.
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            dezoomFromFullscreen(sectionClass);
        });
    });
    window.history.replaceState({}, document.title, window.location.pathname);
    return true;
}

// Binds click navigation on every zoomable card of the home grid.
export function bindZoomNavigation() {
    const boxes = qsa('.box');

    boxes.forEach(box => {
        // Social links are direct anchors and do not use zoom-page navigation.
        if (box.classList.contains('no-zoom')) {
            return;
        }

        box.addEventListener('click', () => {
            // Resolve destination page from section mapping.
            const sectionClass = getSectionClassFromBox(box);
            const destination = sectionClass ? SECTION_PAGE_MAP[sectionClass] : null;

            if (sectionClass && destination && !isNavigating) {
                // Lock navigation until zoom callback redirects to target page.
                isNavigating = true;
                zoomIn(sectionClass, {
                    disableZoomOutClick: true,
                    onZoomInComplete: () => {
                        // Persist section id so home can replay dezoom on return.
                        sessionStorage.setItem(RETURN_SECTION_KEY, sectionClass);
                        window.location.href = `${destination}?from=${encodeURIComponent(sectionClass)}`;
                    }
                });
            } else {
                console.warn('Unable to find a valid section for zoom:', box);
            }
        });
    });
}

// Compatibility helper for callers that still expect a single init function.
export function initZoomNavigation() {
    restoreFromReturnFlow();
    bindZoomNavigation();
}
