import { fetchSectionEntries } from '../../../services/contentService.js';

// Base class for section page renderers.
export class Section {
    constructor(sectionName, container) {
        this.sectionName = sectionName;
        this.container = container;
    }

    clear() {
        this.container.innerHTML = '';
    }

    createElement(tagName, className, textContent) {
        const element = document.createElement(tagName);
        if (className) {
            element.className = className;
        }
        element.textContent = textContent;
        return element;
    }

    async loadEntries() {
        return fetchSectionEntries(this.sectionName);
    }

    // Must be implemented by child renderers.
    async render() {
        throw new Error('render() must be implemented by a Section subclass');
    }
}
