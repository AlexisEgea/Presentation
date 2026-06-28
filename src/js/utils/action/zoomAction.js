import { dezoomFromFullscreen, zoomIn } from '../zoom.js';

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

const RETURN_SECTION_KEY = 'presentation.returnSection';
let isNavigating = false;

function getSectionClassFromBox(box) {
    const classList = Array.from(box.classList);
    return classList.find(cls => Object.prototype.hasOwnProperty.call(sectionToPage, cls));
}

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

function handleReturnFromSection() {
    const params = new URLSearchParams(window.location.search);
    const sectionFromQuery = params.get('from');
    const sectionFromStorage = sessionStorage.getItem(RETURN_SECTION_KEY);
    const sectionClass = sectionFromQuery || sectionFromStorage;
    if (!sectionClass || !Object.prototype.hasOwnProperty.call(sectionToPage, sectionClass)) {
        return;
    }

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

// Function to initialize zoom on all boxes
function initZoom() {
    handleReturnFromSection();

    const boxes = document.querySelectorAll('.box');

    boxes.forEach(box => {
        if (box.classList.contains('no-zoom')) {
            return; 
        }

        box.addEventListener('click', () => {
            const sectionClass = getSectionClassFromBox(box);
            const destination = sectionClass ? sectionToPage[sectionClass] : null;

            if (sectionClass && destination && !isNavigating) {
                isNavigating = true;
                zoomIn(sectionClass, {
                    disableZoomOutClick: true,
                    onZoomInComplete: () => {
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
