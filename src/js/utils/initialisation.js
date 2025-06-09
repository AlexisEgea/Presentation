function initContent(sectionName) {
    const section = document.querySelector('.' + sectionName);

    if (section) {
        const isZoom = section.classList.contains('zoom');
        const isDezoom = section.classList.contains('dezoom');

        if (isZoom || isDezoom) {
            const boxDataElement = section.querySelector('.box-data');
            const boxCoverElement = section.querySelector('.box-cover');

            if (boxDataElement) {
                boxDataElement.style.opacity = isZoom ? 1 : 0;
                boxDataElement.style.visibility = isZoom ? 'visible' : 'hidden';
            }

            if (boxCoverElement) {
                boxCoverElement.style.opacity = isZoom ? 0 : 1;
                boxCoverElement.style.visibility = isZoom ? 'hidden' : 'visible';
            }
        }
    }
}

const sections = [
    'presentation',
    'hard-skill',
    'soft-skill',
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
