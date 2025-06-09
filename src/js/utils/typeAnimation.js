import { formatContent, getContent } from './getContent.js';

// Simulates typing animation for the content
function typeWriter(sectionName, formattedContent, cursor, speed = 50) {
    let i = 0;
    let typingInterval;
    let isTyping = true;

    // Function to update the click text information
    const updateClick = () => {
        const clickElement = document.querySelector('.' + sectionName + '-click');
        if (clickElement) {
            clickElement.innerHTML = "Click to explore";
        }
    };

    // Add click event listener to skip typing
    const contentElement = cursor.parentElement;
    const sectionElement = document.querySelector('.' + sectionName);
    
    const skipTyping = (event) => {
        if (isTyping) {
            event.stopPropagation();
            clearTimeout(typingInterval);
            cursor.remove();
            contentElement.innerHTML = formattedContent;
            isTyping = false;
            sectionElement.removeEventListener('click', skipTyping);
            // Update click information text when skipping
            updateClick();
            if (sectionElement) {
                sectionElement.classList.add('ready');
            }
        }
    };

    if (sectionElement) {
        sectionElement.addEventListener('click', skipTyping);
    }

    const typeNextChar = () => {
        // Check if the cursor still exists in the DOM
        if (!cursor || !cursor.parentElement) {
            // If cursor is removed, stop the typing process and exit
            clearTimeout(typingInterval);
            isTyping = false; // Ensure isTyping is false
            return;
        }

        if (i < formattedContent.length) {
            const char = formattedContent[i];
            if (char === '<') {
                const endTagIndex = formattedContent.indexOf('>', i);
                if (endTagIndex !== -1) {
                    const tag = formattedContent.substring(i, endTagIndex + 1);
                    // Replace insertAdjacentHTML with creating and inserting a temporary div
                    const tempDiv = document.createElement('div');
                    tempDiv.innerHTML = tag;
                    while(tempDiv.firstChild) {
                         cursor.parentElement.insertBefore(tempDiv.firstChild, cursor);
                    }
                    i = endTagIndex + 1;
                } else {
                    // Replace insertAdjacentHTML with createTextNode and insertBefore
                    const textNode = document.createTextNode(char);
                    cursor.parentElement.insertBefore(textNode, cursor);
                    i++;
                }
            } else {
                 // Replace insertAdjacentHTML with createTextNode and insertBefore
                const textNode = document.createTextNode(char);
                cursor.parentElement.insertBefore(textNode, cursor);
                i++;
            }
            typingInterval = setTimeout(typeNextChar, speed);
        } else {
            // Remove cursor when typing is complete
            cursor.remove();
            isTyping = false;
            // Update click information text when typing is complete
            updateClick();

            if (sectionElement) {
                sectionElement.classList.add('ready');
            }
        }
    };
    typeNextChar();
}

// Displays the introduction content with typing animation
// If the section is already 'ready', displays the content directly 
export async function displayContentWithTypingAnimation(sectionName) {
    const content = await getContent(sectionName);
    const contentElement = document.querySelector('.' + sectionName + '-content');
    const sectionElement = document.querySelector('.' + sectionName);
    
    if (contentElement) {
        const formattedContent = formatContent(content);

        // Calculate the required height for the full content
        const tempElement = document.createElement('div');
        tempElement.style.visibility = 'hidden';
        tempElement.style.position = 'absolute';
        tempElement.style.left = '-9999px';
        tempElement.style.width = contentElement.offsetWidth + 'px';
        tempElement.innerHTML = formattedContent;
        document.body.appendChild(tempElement);

        const requiredHeight = tempElement.offsetHeight;
        document.body.removeChild(tempElement);

        // Set the minimum height of the content element
        contentElement.style.minHeight = requiredHeight + 'px';

        // If the section is already 'ready', display the text directly
        if (sectionElement && sectionElement.classList.contains('ready')) {
            contentElement.innerHTML = formattedContent;
            const clickElement = document.querySelector('.' + sectionName + '-click');
            if (clickElement) {
                clickElement.innerHTML = "Click to explore";
            }
            return;
        }

        // Otherwise, start the typing animation
        contentElement.innerHTML = '';
        const cursor = document.createElement('span');
        cursor.className = 'typing-cursor';
        cursor.innerText = '|';
        contentElement.appendChild(cursor);

        typeWriter(sectionName, formattedContent, cursor, 20);
    }
}