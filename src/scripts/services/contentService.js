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

// Fetches structured JSON content from the data/content directory.
export async function fetchSectionData(sectionName) {
    const basePath = resolveBasePath();
    const response = await fetch(`${basePath}/data/content/${sectionName}.json`);
    if (!response.ok) {
        throw new Error(`Unable to load content for section "${sectionName}"`);
    }
    return response.json();
}

// Fetches and formats a text-based section (introduction, presentation).
export async function fetchSectionContent(sectionName) {
    const data = await fetchSectionData(sectionName);
    return formatContent(data);
}

// Fetches structured panel entries from a JSON file in data/content.
export async function fetchSectionEntries(sectionName) {
    const data = await fetchSectionData(sectionName);
    return Array.isArray(data) ? data : data.entries;
}
