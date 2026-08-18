import { Section } from './SectionRenderer.js';

// Custom renderer for the Programming page panel layout.
export class ProgrammingSectionRenderer extends Section {
    async render() {
        const entries = [
            {
                title: 'Programming Paradigms',
                details:
                    'Imperative, Recursive, Object-Oriented, Functional, Concurrent, and Logical programming.'
            },
            {
                title: 'Machine Learning Approaches',
                details:
                    'Supervised Learning, Unsupervised Learning, Reinforcement Learning, Deep Learning, and Transfer Learning.'
            },
            {
                title: 'Learning Mindset',
                details:
                    'Continuous learning, adaptability, and language-agnostic problem-solving in daily practice.'
            },
            {
                title: 'Most Used Languages',
                details: 'Python, Java, and C++.'
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
