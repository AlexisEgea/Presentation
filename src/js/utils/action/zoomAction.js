import { zoomEffect, dezoomEffect } from '../zoom.js';

// Function to handle the zoom/dezoom toggle
export function addZoomDezoomToggle(section) {   
    const sectionElement = document.querySelector('.' + section + '-section');
    /* TODO: Ensure only one listener is added (optional, depends on how this function is called)
    A robust way would be to remove previous listeners before adding a new one.
    For simplicity here, assuming this function is called only once per section after it's ready. */
    if(sectionElement) {
        sectionElement.addEventListener('click', (event) => {
            if (sectionElement.classList.contains('ready')) {
                if (sectionElement.classList.contains('zoom')) {
                    sectionElement.classList.remove('zoom');
                    dezoomEffect(sectionElement);
                    sectionElement.classList.add('dezoom');
                } 
                // This covers both !zoom && !dezoom (initial ready state) and !zoom && dezoom (dezoomed state)
                else { 
                    sectionElement.classList.remove('dezoom');
                    zoomEffect(sectionElement);
                    sectionElement.classList.add('zoom');
                }
            }
        });
    }
}

addZoomDezoomToggle('introduction');