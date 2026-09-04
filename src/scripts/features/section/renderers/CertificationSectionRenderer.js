import { Section } from './SectionRenderer.js';

// Custom renderer for the Certification page panel layout.
export class CertificationSectionRenderer extends Section {
    async render() {
        const entries = await this.loadEntries();

        this.container.classList.add('panel-grid');
        this.clear();

        entries.forEach(({ title, subtitle, issuer, score }) => {
            const panel = document.createElement('article');
            panel.className = 'panel';

            panel.appendChild(this.createElement('h2', 'panel-title', title));
            if (subtitle) {
                panel.appendChild(this.createElement('p', 'panel-subtitle', subtitle));
            }
            if (issuer) {
                panel.appendChild(this.createElement('p', 'panel-meta', issuer));
            }
            if (score) {
                panel.appendChild(this.createElement('p', 'panel-details', score));
            }

            this.container.appendChild(panel);
        });
    }
}
