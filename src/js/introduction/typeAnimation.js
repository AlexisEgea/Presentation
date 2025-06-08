function formatContent(content) {
    // Replace newlines with <br> tags
    let formattedContent = content.replace(/\n/g, '<br>');
    
    // Format text between dashes and colons
    formattedContent = formattedContent.replace(/- (.*?):/g, '- <strong>$1</strong>:');
    
    return formattedContent;
}

async function getContent() {
    try {
        const response = await fetch('https://alexisegea.github.io/Presentation/data/introduction-content/content.txt');
        const content = await response.text();
        // console.log(content);
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

    // Function to update the click text information
    const updateClick = () => {
        const clickElement = document.querySelector('.' + 'introduction' + '-click');
        if (clickElement) {
            clickElement.innerHTML = "Click to explore";
        }
    };

    // Add click event listener to skip typing
    const contentElement = cursor.parentElement;
    const sectionElement = document.querySelector('.' + 'introduction');
    
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

export async function displayContent() {
    const content = await getContent();
    const contentElement = document.querySelector('.' + 'introduction' +'-content');
    if (contentElement) {
        const formattedContent = formatContent(content);

        // Calculate the required height for the full content
        const tempElement = document.createElement('div');
        tempElement.style.visibility = 'hidden';
        tempElement.style.position = 'absolute';
        tempElement.style.left = '-9999px';
        tempElement.style.width = contentElement.offsetWidth + 'px'; // Use the actual container width
        tempElement.innerHTML = formattedContent;
        document.body.appendChild(tempElement);

        const requiredHeight = tempElement.offsetHeight;

        document.body.removeChild(tempElement);

        // Set the minimum height of the content element
        contentElement.style.minHeight = requiredHeight + 'px';

        contentElement.innerHTML = '';
        
        // Create a blinking cursor element
        const cursor = document.createElement('span');
        cursor.className = 'typing-cursor';
        cursor.innerText = '|';
        contentElement.appendChild(cursor);

        typeWriter(formattedContent, cursor, 20);
    }
}