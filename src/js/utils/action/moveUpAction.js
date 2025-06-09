import { displayContentWithTypingAnimation } from '../typeAnimation.js';

export function addMoveUpAction(section) {
    const elements = ['title', 'subtitle'].map(type => 
        document.querySelector('.' + section + '-' + type)
    );
        const sectionElement = document.querySelector('.' + section);

    
    const moveUpListener = (event) => {
        // Prevent click event from propagating to parent
        event.stopPropagation();
    
        
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
                    let content = sectionElement.querySelector(".introduction-content");
                    content.style.position = "absolute";
                    displayContentWithTypingAnimation(section);
                }, { once: true }); // Remove listener after first trigger
            }
        });
    };
    // Add click listener
    if (sectionElement) {
        sectionElement.addEventListener('click', moveUpListener);
    }
}

addMoveUpAction('introduction');
