import { formatContent, getContent } from '../utils/getContent.js';

// Simulates typing animation for the content
function typeWriter(sectionName, formattedContent, speed = 50) {
    let i = 0;
    let isTyping = true; // Flag to control typing state
    const contentElement = document.querySelector('.' + sectionName + '-content');
    
    // Set initial position and style
    contentElement.style.position = 'absolute';
    contentElement.style.top = '50%';
    contentElement.style.left = '50%';
    contentElement.style.transform = 'translate(-50%, -50%)';
    contentElement.style.width = '100%';
    contentElement.style.textAlign = 'left';
    
    function typeNextChar() {
        if (i < formattedContent.length && isTyping) {
            // Use innerHTML instead of innerText to properly render HTML tags
            contentElement.innerHTML = formattedContent.substring(0, i + 1) + '|';
            i++;
            setTimeout(typeNextChar, speed);
        } else if (isTyping) {
            contentElement.innerHTML = formattedContent;
            // Add the click text and class if typing is finished and no click has occurred
            const clickElement = document.querySelector('.' + sectionName + '-click');
            clickElement.innerText = 'Click to explore';

            const sectionElement = document.querySelector('.' + sectionName);
            sectionElement.classList.add('ready');
        }
    }

    // Return a function to stop typing
    const stopTyping = () => {
        isTyping = false;
        contentElement.innerHTML = formattedContent;

        const clickElement = document.querySelector('.' + sectionName + '-click');
        clickElement.innerText = 'Click to explore';

        const sectionElement = document.querySelector('.' + sectionName);
        sectionElement.classList.add('ready');
    };

    typeNextChar();
    
    return stopTyping;
}

// Displays the introduction content with typing animation
export async function displayContentWithTypingAnimation(sectionName) {
    const content = await getContent(sectionName);
    const formattedContent = formatContent(content);

    const contentElement = document.querySelector('.' + sectionName + '-content');
    let stopTypingFunction = null;
    
    if (contentElement) {
        contentElement.style.visibility = 'visible';
        contentElement.innerHTML = '';
        contentElement.innerText = '|';

        stopTypingFunction = typeWriter(sectionName, formattedContent, 20);
    }

    const sectionElement = document.querySelector('.' + sectionName);
    sectionElement.addEventListener('click', (event) => {
        event.stopPropagation();
        if (stopTypingFunction) {
            stopTypingFunction();
        }
    });
}
