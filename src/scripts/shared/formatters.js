// Applies markdown-like emphasis used in content JSON strings.
function formatInline(text) {
    return String(text)
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>');
}

function renderBlocks(blocks = []) {
    return blocks
        .map((block) => {
            if (block.type === 'paragraph') {
                return `${formatInline(block.text)}<br><br>`;
            }

            if (block.type === 'list' || block.type === 'ordered-list') {
                const items = block.items || [];
                const lines = items.map((item, index) => {
                    const prefix = block.type === 'ordered-list' ? `${index + 1}. ` : '- ';
                    return `${prefix}${formatInline(item)}`;
                });
                return `${lines.join('<br>')}<br><br>`;
            }

            return '';
        })
        .join('');
}

// Converts structured section JSON into simple HTML for display.
export function formatContent(data) {
    if (!data || typeof data !== 'object') {
        return '';
    }

    if (Array.isArray(data.sections)) {
        return data.sections
            .map((section) => {
                const title = section.title ? `${formatInline(section.title)}<hr>` : '';
                return `${title}${renderBlocks(section.blocks)}`;
            })
            .join('');
    }

    return renderBlocks(data.blocks);
}
