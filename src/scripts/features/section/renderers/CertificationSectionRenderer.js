import { Section } from './SectionRenderer.js';

// Custom renderer for the Certification page panel layout.
export class CertificationSectionRenderer extends Section {
    async render() {
        const entries = [
            {
                title: 'Building RAG Agents with LLMs',
                subtitle: '',
                issuer: 'NVIDIA',
            },
            {
                title: 'Augment your LLM Using Retrieval Augmented Generation',
                subtitle: '',
                issuer: 'NVIDIA',
            },
            {
                title: 'Adding New Knowledge to LLMs',
                subtitle: '',
                issuer: 'NVIDIA',
            },
            {
                title: 'TOEIC',
                subtitle: 'Test of English for International Communication',
                issuer: 'ETS Global',
                score: 'Score: 830/990'
            }
        ];

        this.container.classList.add('panel-grid');
        this.clear();

        entries.forEach(({ title, subtitle, issuer, score }) => {
            const panel = document.createElement('article');
            panel.className = 'panel';

            const titleElement = this.createElement('h2', 'panel-title', title);
            const subtitleElement = this.createElement('p', 'panel-subtitle', subtitle);
            const issuerElement = this.createElement('p', 'panel-meta', issuer);
            const scoreElement = this.createElement('p', 'panel-details', score);

            panel.appendChild(titleElement);
            if (subtitle) {
                panel.appendChild(subtitleElement);
            }
            if (issuer) {
                panel.appendChild(issuerElement);
            }
            if (score) {
                panel.appendChild(scoreElement);
            }

            this.container.appendChild(panel);
        });
    }
}
