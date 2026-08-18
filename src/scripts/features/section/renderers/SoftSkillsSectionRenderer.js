import { Section } from './SectionRenderer.js';

// Custom renderer for the Soft Skills page panel layout.
export class SoftSkillsSectionRenderer extends Section {
    async render() {
        const entries = [
            {
                title: 'Problem-Solving',
                details: 'Approaching complex challenges with creativity, innovation, and rigor.'
            },
            {
                title: 'Adaptability',
                details: 'Quickly adjusting to new environments, tools, and constraints.'
            },
            {
                title: 'Autonomy',
                details: 'Taking initiative and moving tasks forward independently when required.'
            },
            {
                title: 'Time Management',
                details: 'Organizing work effectively to meet deadlines while maintaining quality.'
            },
            {
                title: 'Attention to Detail',
                details: 'Ensuring precision and reliability across all parts of a project.'
            },
            {
                title: 'Communication',
                details: 'Maintaining clear communication with technical teams and non-technical stakeholders.'
            },
            {
                title: 'Continuous Learning',
                details: 'Staying curious and continuously expanding skills and knowledge.'
            }
        ];

        this.container.classList.add('panel-grid');
        this.clear();

        entries.forEach(({ title, details }) => {
            const panel = document.createElement('article');
            panel.className = 'panel';

            const titleElement = this.createElement('h2', 'panel-title', title);
            const detailsElement = this.createElement('p', 'panel-details', details);

            panel.appendChild(titleElement);
            panel.appendChild(detailsElement);
            this.container.appendChild(panel);
        });
    }
}
