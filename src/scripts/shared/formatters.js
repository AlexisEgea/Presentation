// Converts raw section text markup into simple HTML for display.
export function formatContent(content) {
    let formattedContent = content;
    // "[Section] ..." lines are converted to title + separator.
    formattedContent = formattedContent.replace(/\[Section\]\s*(.*)/g, '$1<hr>');
    // Markdown-like emphasis support.
    formattedContent = formattedContent.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    formattedContent = formattedContent.replace(/\*(.*?)\*/g, '<em>$1</em>');
    // Preserve line breaks from source text files.
    formattedContent = formattedContent.replace(/\n/g, '<br>');
    return formattedContent;
}
