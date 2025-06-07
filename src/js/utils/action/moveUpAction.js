import { displayContent } from '../../introduction/typeAnimation.js';

export function addMoveUpAction(section) {
    const elements = ['title', 'subtitle'].map(type => 
        document.querySelector('.' + section + '-' + type)
    );
    
    const moveUpListener = (event) => {
        // Stop the click event from propagating to the parent
        event.stopPropagation();
        
        // Add move-up class to all elements
        elements.forEach(element => {
            if (element) {
                element.classList.add('move-up');
            }
        });
        
        // Remove the event listener from all elements after first click
        elements.forEach(element => {
            if (element) {
                element.removeEventListener('click', moveUpListener);
            }
        });

        const clickElement = document.querySelector('.' + section + '-click');
        // Wait for the move-up animation to complete using animationend event
        elements.forEach(element => {
            if (element) {
                element.addEventListener('animationend', () => {
                    clickElement.innerText = "Click to skip typing animation";
                    let content = document.querySelector(".introduction-content");
                    content.style.position = "absolute";
                    displayContent();
                }, { once: true }); // Remove listener after first trigger
            }
        });
    };
    // Add click listener
    const sectionElement = document.querySelector('.' + section + '-section');
    if (sectionElement) {
        sectionElement.addEventListener('click', moveUpListener);
    }
}

addMoveUpAction('introduction');
