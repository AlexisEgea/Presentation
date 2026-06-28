// Converts plain text section content into simple HTML formatting.
function formatContent(content) {
    let formattedContent = content;
    formattedContent = formattedContent.replace(/\[Section\]\s*(.*)/g, '$1<hr>');
    formattedContent = formattedContent.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    formattedContent = formattedContent.replace(/\*(.*?)\*/g, '<em>$1</em>');
    formattedContent = formattedContent.replace(/\n/g, '<br>');
    return formattedContent;
}

// Fetches one section text file and returns formatted HTML content.
async function loadSectionContent(sectionName) {
    const response = await fetch(`../data/content/${sectionName}.txt`);
    if (!response.ok) {
        throw new Error(`Unable to load content for section "${sectionName}"`);
    }
    const content = await response.text();
    return formatContent(content);
}

// Binds interactions that return to the main grid (click anywhere or Escape key).
function bindReturnShortcut(sectionName) {
    const returnToGrid = () => {
        sessionStorage.setItem('presentation.returnSection', sectionName);
        window.location.href = `../index.html?from=${encodeURIComponent(sectionName)}`;
    };

    document.addEventListener('click', () => {
        returnToGrid();
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            returnToGrid();
        }
    });
}

// Initializes the section page by loading content and wiring return actions.
async function initSectionPage() {
    const root = document.querySelector('.section-page');
    if (!root) {
        return;
    }

    const sectionName = root.dataset.section;
    const contentElement = document.querySelector('#section-content');
    if (!sectionName || !contentElement) {
        return;
    }

    bindReturnShortcut(sectionName);

    try {
        contentElement.innerHTML = await loadSectionContent(sectionName);
    } catch (error) {
        console.error(error);
        contentElement.innerHTML = 'Content unavailable for this section.';
    }
}

document.addEventListener('DOMContentLoaded', initSectionPage);
