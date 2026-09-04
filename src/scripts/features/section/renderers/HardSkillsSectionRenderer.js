import { Section } from './SectionRenderer.js';

// Custom renderer for the Hard Skills page panel layout.
export class HardSkillsSectionRenderer extends Section {
    async render() {
        const entries = await this.loadEntries();

        this.container.classList.add('panel-grid');
        this.clear();

        entries.forEach(({ title, details }) => {
            const panel = document.createElement('article');
            panel.className = 'panel';

            panel.appendChild(this.createElement('h2', 'panel-title', title));
            panel.appendChild(this.createElement('p', 'panel-details', details));
            this.container.appendChild(panel);
        });
    }
}
