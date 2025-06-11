export function formatContent(content) {
    let formattedContent = content;

    // Replace [Section] headers with <h2> + <hr>
    formattedContent = formattedContent.replace(/\[Section\]\s*(.*)/g, '$1<hr>');

    // Replace bold markers **text** with <strong>text</strong>
    formattedContent = formattedContent.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // Replace italic markers *text* with <em>text</em>
    formattedContent = formattedContent.replace(/\*(.*?)\*/g, '<em>$1</em>');

    // Replace newlines with <br> tags
    formattedContent = formattedContent.replace(/\n/g, '<br>');

    return formattedContent;
}

// Fetches the introduction content from the server
export async function getContent(sectionName) {
    try {
        // const response = await fetch(`https://alexisegea.github.io/Presentation/data/content/${sectionName}.txt`);
        // For local testing
        const response = await fetch(`data/content/${sectionName}.txt`);
        const content = await response.text();
        // console.log(content);
        return formatContent(content);
    } catch (error) {
        console.error('Error loading content:', error);
        return null;
    }
}

export async function displayContent(sectionName){
    const content = await getContent(sectionName);
    const formattedContent = formatContent(content); 
    // console.log(content);
    const element = document.querySelector('.' + sectionName + ' .content');
    element.innerHTML = formattedContent; 
}