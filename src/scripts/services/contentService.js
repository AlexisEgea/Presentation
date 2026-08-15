import { formatContent } from '../shared/formatters.js';

// Resolves repository base path when hosted under GitHub Pages.
function resolveBasePath() {
    const pathParts = window.location.pathname.split('/').filter(Boolean);
    const isGitHubPages = window.location.hostname.endsWith('github.io');
    if (isGitHubPages && pathParts.length > 0) {
        return `/${pathParts[0]}`;
    }
    return '';
}

// Fetches and formats a section text file from the data/content directory.
export async function fetchSectionContent(sectionName) {
    const basePath = resolveBasePath();
    const response = await fetch(`${basePath}/data/content/${sectionName}.txt`);
    if (!response.ok) {
        throw new Error(`Unable to load content for section "${sectionName}"`);
    }
    const content = await response.text();
    return formatContent(content);
}
