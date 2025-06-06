import { createSectionObserver } from './utils/observers.js';
import { addDezoomAction } from './utils/clickAction.js';

function formatContent(content) {
    // Replace newlines with <br> tags
    let formattedContent = content.replace(/\n/g, '<br>');
    
    // Format text between dashes and colons
    formattedContent = formattedContent.replace(/- (.*?):/g, '- <strong>$1</strong>:');
    
    return formattedContent;
}

async function getContent() {
    try {
        const response = await fetch('../../data/introduction-content/content.txt');
        const content = await response.text();
        return formatContent(content);
    } catch (error) {
        console.error('Error loading content:', error);
        return null;
    }
}

function typeWriter(formattedContent, cursor, speed = 50) {
    let i = 0;
    let typingInterval;
    let isTyping = true;

    // Fonction pour mettre à jour le texte de welcome-click
    const updateWelcomeClick = () => {
        const welcomeClick = document.querySelector(".introduction-click");
        if (welcomeClick) {
            welcomeClick.innerHTML = "Click to explore";
        }
    };

    // Add click event listener to skip typing
    const contentElement = cursor.parentElement;
    const skipTyping = (event) => {
        if (isTyping) {
            // Stop the click event from propagating to prevent triggering addDezoomAction
            event.stopPropagation();
            clearTimeout(typingInterval);
            cursor.remove();
            contentElement.innerHTML = formattedContent;
            isTyping = false;
            contentElement.removeEventListener('click', skipTyping);
            // Update welcome-click text when skipping
            updateWelcomeClick();
            // Add click action after typing is complete or skipped
            addDezoomAction('introduction-section');
        }
    };
    
    contentElement.addEventListener('click', skipTyping);

    const typeNextChar = () => {
        if (i < formattedContent.length) {
            // Insert the current character before the cursor
            const char = formattedContent[i];
            if (char === '<') {
                // Find the end of the HTML tag
                const endTagIndex = formattedContent.indexOf('>', i);
                if (endTagIndex !== -1) {
                    // Insert the entire tag at once
                    const tag = formattedContent.substring(i, endTagIndex + 1);
                    cursor.insertAdjacentHTML('beforebegin', tag);
                    i = endTagIndex + 1;
                } else {
                    cursor.insertAdjacentHTML('beforebegin', char);
                    i++;
                }
            } else {
                cursor.insertAdjacentHTML('beforebegin', char);
                i++;
            }
            typingInterval = setTimeout(typeNextChar, speed);
        } else {
            // Remove cursor when typing is complete
            cursor.remove();
            isTyping = false;
            // Update welcome-click text when typing is complete
            updateWelcomeClick();
            // Add button after typing is complete
            addDezoomAction('introduction-section');
        }
    };
    
    typeNextChar();
}

async function displayContent() {
    const content = await getContent();
    const contentElement = document.querySelector('.introduction-content');
    if (contentElement) {
        const formattedContent = formatContent(content);
        contentElement.innerHTML = ''; // Clear the content first
        
        // Create a blinking cursor element
        const cursor = document.createElement('span');
        cursor.className = 'typing-cursor';
        cursor.innerText = '|';
        contentElement.appendChild(cursor);

        typeWriter(formattedContent, cursor, 20);
    }
}

// Initialize observer when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const mainSection = document.querySelector('.main-section');
    if (mainSection) {
        createSectionObserver(mainSection, displayContent);
    }
});