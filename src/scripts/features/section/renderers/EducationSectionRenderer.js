import { Section } from './SectionRenderer.js';

// Custom renderer for the Education page panel layout.
export class EducationSectionRenderer extends Section {
    async render() {
        const entries = await this.loadEntries();

        this.container.classList.add('panel-grid');
        this.clear();

        entries.forEach(({ title, subtitle, school, details }) => {
            const panel = document.createElement('article');
            panel.className = 'panel';

            panel.appendChild(this.createElement('h2', 'panel-title', title));
            if (subtitle) {
                panel.appendChild(this.createElement('p', 'panel-subtitle', subtitle));
            }
            if (school) {
                panel.appendChild(this.createElement('p', 'panel-meta', school));
            }
            if (details) {
                panel.appendChild(this.createElement('p', 'panel-details', details));
            }

            this.container.appendChild(panel);
        });
    }
}
