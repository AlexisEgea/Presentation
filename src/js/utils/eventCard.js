import { zoomEffect } from './zoom.js';
import { createSectionObserver } from './observers.js';

const mainSection = document.querySelector('.main-section');
if (mainSection) {
    createSectionObserver(mainSection, () => {
        console.log("Section visible");
        const introductionSection = document.querySelector('.introduction-section');
        if (introductionSection) {
            // Add click event listener
            introductionSection.addEventListener('click', () => {
                if (introductionSection.classList.contains("dezoom-animation")) {
                    console.log("Click detected, starting zoom");
                    zoomEffect(introductionSection);
                }
            });
        }
    });
}