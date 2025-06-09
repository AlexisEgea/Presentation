import { zoomEffect, dezoomEffect } from '../zoom.js';
import { updateBoxBackground } from '../colorBackground.js';

// Function to handle the zoom/dezoom toggle
export function addZoomDezoomToggle(section) {   
    const sectionElement = document.querySelector('.' + section);
    if(sectionElement) {
        // Temporarily commented out for testing purposes
        // updateBoxBackground(sectionElement);

        sectionElement.addEventListener('click', (event) => {
            // For introduction section, use the original logic with ready check
            if (section === 'introduction') {
                if (sectionElement.classList.contains('ready')) {
                    if (sectionElement.classList.contains('zoom')) {
                        // Reset scroll when dezooming
                        sectionElement.scrollTop = 0;

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
                    // Reset scroll when dezooming
                    sectionElement.scrollTop = 0;

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

// Apply zoom/dezoom toggle to all sections
const sections = [
    'presentation',
    'hard-skills',
    'soft-skills',
    'education',
    'introduction',
    'certification',
    'programming',
    'resume',
    'work-experience',
    'personal-project'
];

sections.forEach(sectionName => addZoomDezoomToggle(sectionName));