import { displayContent } from '../typeAnimation.js';

export function addMoveUpAction(section) {
    const elements = ['title', 'subtitle'].map(type => 
        document.querySelector('.' + section + '-' + type)
    );
    
    const moveUpListener = (event) => {
        // Prevent click event from propagating to parent
        event.stopPropagation();
        
        // TODO: Upgrade this section for content, it doesn't fix the position of content
        const sectionElement = document.querySelector('.' + section);
        // If section is already 'ready', place elements directly at the top
        if (sectionElement && sectionElement.classList.contains('ready')) {
            elements.forEach(element => {
                if (element) {
                    element.style.transform = 'translateY(-35vh)';
                }
            });
            let content = document.querySelector(".introduction-content");
            content.style.position = "absolute";
            displayContent(section);
            return;
        }
        
        // Add move-up class to all elements
        elements.forEach(element => {
            if (element) {
                element.classList.add('move-up');
            }
        });
        
        // Remove event listener from all elements after first click
        elements.forEach(element => {
            if (element) {
                element.removeEventListener('click', moveUpListener);
            }
        });

        const clickElement = document.querySelector('.' + section + '-click');
        // Wait for move-up animation to complete using animationend event
        elements.forEach(element => {
            if (element) {
                element.addEventListener('animationend', () => {
                    clickElement.innerText = "Click to skip typing animation";
                    let content = document.querySelector(".introduction-content");
                    content.style.position = "absolute";
                    displayContent(section);
                }, { once: true }); // Remove listener after first trigger
            }
        });
    };
    // Add click listener
    const sectionElement = document.querySelector('.' + section);
    if (sectionElement) {
        sectionElement.addEventListener('click', moveUpListener);
    }
}

addMoveUpAction('introduction');
