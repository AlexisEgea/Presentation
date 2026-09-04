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
    const content = await fetchSectionText(sectionName);
    return formatContent(content);
}

// Fetches raw text content for a section (no formatting applied).
export async function fetchSectionText(sectionName) {
    const basePath = resolveBasePath();
    const response = await fetch(`${basePath}/data/content/${sectionName}.txt`);
    if (!response.ok) {
        throw new Error(`Unable to load content for section "${sectionName}"`);
    }
    return response.text();
}

// Fetches structured panel entries from a JSON file in data/content.
export async function fetchSectionEntries(sectionName) {
    const basePath = resolveBasePath();
    const response = await fetch(`${basePath}/data/content/${sectionName}.json`);
    if (!response.ok) {
        throw new Error(`Unable to load entries for section "${sectionName}"`);
    }

    const data = await response.json();
    return Array.isArray(data) ? data : data.entries;
}
