import { Section } from './SectionRenderer.js';

// Custom renderer for the Education page panel layout.
export class EducationSectionRenderer extends Section {
    async render() {
        const entries = [
            {
                title: "Master's Degree",
                subtitle: 'Computer Science and Telecommunications',
                school: "Mines Telecom Institute Nord Europe, Villeneuve-d'Ascq, France",
                details: 'Specialization: Artificial Intelligence and Computer Vision'
            },
            {
                title: "Bachelor's Degree",
                subtitle: 'Mathematics and Computer Science',
                school: 'Claude Bernard University Lyon 1, Lyon, France',
                details: 'Specialization: Computer Science'
            },
            {
                title: 'Scientific Baccalaureat',
                subtitle: 'Mathematics',
                school: 'Centre Scolaire Saint-Marc High School, Lyon, France',
                details: ''
            }
        ];

        this.container.classList.add('panel-grid');
        this.clear();

        entries.forEach(({ title, subtitle, school, details }) => {
            const panel = document.createElement('article');
            panel.className = 'panel';

            const titleElement = this.createElement('h2', 'panel-title', title);
            const subtitleElement = this.createElement('p', 'panel-subtitle', subtitle);
            const schoolElement = this.createElement('p', 'panel-meta', school);
            const detailsElement = this.createElement('p', 'panel-details', details);

            panel.appendChild(titleElement);
            if (subtitle) {
                panel.appendChild(subtitleElement);
            }
            if (school) {
                panel.appendChild(schoolElement);
            }
            if (details) {
                panel.appendChild(detailsElement);
            }

            this.container.appendChild(panel);
        });
    }
}
