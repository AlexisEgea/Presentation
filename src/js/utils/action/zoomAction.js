import { dezoomFromFullscreen, zoomIn } from '../zoom.js';

// Maps each section CSS class to its dedicated full-page destination
const sectionToPage = {
    'presentation': 'pages/presentation.html',
    'soft-skills': 'pages/soft-skills.html',
    'hard-skills': 'pages/hard-skills.html',
    'education': 'pages/education.html',
    'introduction': 'pages/introduction.html',
    'certification': 'pages/certification.html',
    'programming': 'pages/programming.html',
    'resume': 'pages/resume.html',
    'work-experience': 'pages/work-experience.html',
    'personal-project': 'pages/personal-project.html'
};

// Session key used to restore the section that should dezoom on return
const RETURN_SECTION_KEY = 'presentation.returnSection';
let isNavigating = false;

// Extracts the section identifier from a clicked grid card
function getSectionClassFromBox(box) {
    const classList = Array.from(box.classList);
    return classList.find(cls => Object.prototype.hasOwnProperty.call(sectionToPage, cls));
}

// Forces the home grid to visible state (skip intro screen) for return flow
function showGridOnly() {
    const initSection = document.querySelector('.init');
    const mainGrid = document.querySelector('.main-grid');

    if (initSection) {
        initSection.style.display = 'none';
    }
    if (mainGrid) {
        mainGrid.style.display = 'grid';
        mainGrid.style.opacity = '1';
        mainGrid.style.transition = 'none';
    }
}

// Restores dezoom animation when user returns from a section page
function handleReturnFromSection() {
    // Read return section from URL first, then fallback to session storage
    const params = new URLSearchParams(window.location.search);
    const sectionFromQuery = params.get('from');
    const sectionFromStorage = sessionStorage.getItem(RETURN_SECTION_KEY);
    const sectionClass = sectionFromQuery || sectionFromStorage;
    if (!sectionClass || !Object.prototype.hasOwnProperty.call(sectionToPage, sectionClass)) {
        return;
    }

    // Prevent stale value reuse on future visits
    sessionStorage.removeItem(RETURN_SECTION_KEY);
    showGridOnly();
    // Wait one extra frame to ensure grid layout is fully applied.
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            dezoomFromFullscreen(sectionClass);
        });
    });
    window.history.replaceState({}, document.title, window.location.pathname);
}

// Wires click interactions on grid cards for zoom + navigation flow
function initZoom() {
    // If came back from a section page, replay the dezoom animation
    handleReturnFromSection();

    const boxes = document.querySelectorAll('.box');

    boxes.forEach(box => {
        // Social cards are plain links and should not trigger zoom navigation
        if (box.classList.contains('no-zoom')) {
            return; 
        }

        box.addEventListener('click', () => {
            // Resolve target section and associated destination page
            const sectionClass = getSectionClassFromBox(box);
            const destination = sectionClass ? sectionToPage[sectionClass] : null;

            if (sectionClass && destination && !isNavigating) {
                // Lock navigation to prevent double-click race conditions
                isNavigating = true;
                zoomIn(sectionClass, {
                    disableZoomOutClick: true,
                    onZoomInComplete: () => {
                        // Persist return section before leaving the home page
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

// Wait for DOM to be fully loaded before initializing zoom
document.addEventListener('DOMContentLoaded', () => {
    initZoom();
});
