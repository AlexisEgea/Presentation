import { Section } from './SectionRenderer.js';

// Custom renderer for the Personal Project page panel layout.
export class PersonalProjectSectionRenderer extends Section {
    async render() {
        const entries = await this.loadEntries();

        this.container.classList.add('panel-grid');
        this.clear();

        entries.forEach(({ title, subtitle, details = [] }) => {
            const panel = document.createElement('article');
            panel.className = 'panel';

            panel.appendChild(this.createElement('h2', 'panel-title', title));
            if (subtitle) {
                panel.appendChild(this.createElement('p', 'panel-subtitle', subtitle));
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
