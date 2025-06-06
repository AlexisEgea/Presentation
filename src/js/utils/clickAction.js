import { dezoomEffect } from './zoom.js';

// Update the addDezoomButton function to use the dezoom effect
export function addDezoomAction(classCard) {    
    const card = document.querySelector('.' + classCard);
    if (card) {
        card.addEventListener('click', (event) => {
            // Stop the click event from propagating to the parent
            event.stopPropagation();
            
            // Check if the element is not already zooming
            if (!card.classList.contains('zoom-animation')) {
                console.log("Click detected, starting dezoom");
                dezoomEffect(card);
            }
        });
    }
}
