import { Section } from './SectionRenderer.js';

// Custom renderer for the Work Experience page panel layout.
export class WorkExperienceSectionRenderer extends Section {
    async render() {
        const entries = await this.loadEntries();

        this.container.classList.add('panel-grid');
        this.clear();

        entries.forEach(({ title, subtitle, meta, details = [] }) => {
            const panel = document.createElement('article');
            panel.className = 'panel';

            panel.appendChild(this.createElement('h2', 'panel-title', title));
            if (subtitle) {
                panel.appendChild(this.createElement('p', 'panel-subtitle', subtitle));
            }
            if (meta) {
                panel.appendChild(this.createElement('p', 'panel-meta', meta));
            }

            const body = document.createElement('div');
            body.className = 'panel-body';
            details.forEach((paragraph) => {
                body.appendChild(this.createElement('p', 'panel-details', paragraph));
            });
            panel.appendChild(body);

            this.container.appendChild(panel);
        });
    }
}
