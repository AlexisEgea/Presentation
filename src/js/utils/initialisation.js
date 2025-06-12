import { displayContent } from './getContent.js';

function initContent(sectionName) {
    displayContent(sectionName);
    
    const section = document.querySelector('.' + sectionName);
    section.scrollTop = 0;

    if (section) {
        const boxDataElement = section.querySelector('.box-data');
        const boxCoverElement = section.querySelector('.box-cover');

        if (boxDataElement) {
            boxDataElement.style.opacity = 0;
            boxDataElement.style.visibility ='hidden';
        }

        if (boxCoverElement) {
            boxCoverElement.style.opacity = 1;
            boxCoverElement.style.visibility = 'visible';
        }
    }
}

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

sections.forEach(section => {
    initContent(section);
});