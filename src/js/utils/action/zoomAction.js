import { zoomEffect, dezoomEffect } from '../zoom.js';

// Function to handle the zoom/dezoom toggle
export function addZoomDezoomToggle(section) {   
    const sectionElement = document.querySelector('.' + section);
    if(sectionElement) {
        sectionElement.addEventListener('click', (event) => {
            // For introduction section, use the original logic with ready check
            if (section === 'introduction') {
                if (sectionElement.classList.contains('ready')) {
                    if (sectionElement.classList.contains('zoom')) {
                        sectionElement.classList.remove('zoom');
                        dezoomEffect(section);
                        sectionElement.classList.add('dezoom');
                    } else { 
                        sectionElement.classList.remove('dezoom');
                        zoomEffect(section);
                        sectionElement.classList.add('zoom');
                    }
                }
            }
            // For all other sections, use the same logic without ready check
            else {
                if (sectionElement.classList.contains('zoom')) {
                    sectionElement.classList.remove('zoom');
                    dezoomEffect(section);
                    sectionElement.classList.add('dezoom');
                } else { 
                    sectionElement.classList.remove('dezoom');
                    zoomEffect(section);
                    sectionElement.classList.add('zoom');
                }
            }
        });
    }
}

addZoomDezoomToggle('presentation');
addZoomDezoomToggle('hard-skill');
addZoomDezoomToggle('soft-skill');
addZoomDezoomToggle('education');
addZoomDezoomToggle('interests');
addZoomDezoomToggle('introduction');
addZoomDezoomToggle('certification');
addZoomDezoomToggle('programming');
addZoomDezoomToggle('resume');
addZoomDezoomToggle('work-experience');
addZoomDezoomToggle('perso-project');