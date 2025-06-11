import { zoomIn } from '../zoom.js';

// Function to initialize zoom on all boxes
function initZoom() {
    const boxes = document.querySelectorAll('.box');

    boxes.forEach(box => {
        if (box.classList.contains('no-zoom')) {
            return; 
        }

        box.addEventListener('click', () => {
            const classList = Array.from(box.classList);

            const sectionClass = classList.find(cls => 
                !['box', 'dezoom', 'zoom', 'fullscreen-active'].includes(cls)
            );

            if (sectionClass) {
                zoomIn(sectionClass);
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
