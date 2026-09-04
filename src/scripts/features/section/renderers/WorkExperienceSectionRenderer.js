import { Section } from './SectionRenderer.js';

// Custom renderer for the Work Experience page panel layout.
export class WorkExperienceSectionRenderer extends Section {
    async render() {
        const entries = [
            {
                title: 'Software Development Engineer in Apprenticeship',
                subtitle: 'Profile Login',
                meta: 'Paris, France, 2022–2025',
                details: [
                    'Artificial Intelligence: design and implementation of preprocessing pipelines, custom evaluation metrics, and post-processing workflows for LLMs in a text-to-SQL project. The system generates and displays complex SQL queries from natural language questions.',
                    'Complete automation of metadata collection and enrichment (definitions, types, relationships). Design of retrieval and optimization techniques (RAG, embedding-based filtering, LLM-as-a-judge) to adapt context, reduce token usage, and improve model performance.',
                    'Automation: design and maintenance of an automated testing platform using Robot Framework (Python), with scripts replicating human behavior to validate treasury management software. Requirements, implementation, testing, validation, and Jira documentation.'
                ]
            },
            {
                title: 'Artificial Intelligence Development Engineer in Internship',
                subtitle: 'Profile Software',
                meta: 'Athens, Greece, July–September 2024',
                details: [
                    'Complete integration of an artificial intelligence project into treasury management software, generating complex SQL queries from natural language questions.',
                    'Development and optimization of language models (LLMs) to maximize system performance.',
                    'Design and implementation of instruction prompts and structured metadata for AI model training, based on software database schemas and relationships.'
                ]
            },
            {
                title: 'Computer Science Researcher in Internship',
                subtitle: 'CNRS x Oracle',
                meta: 'Lyon, France, May–June 2022',
                details: [
                    'Development and testing of advanced graph accessibility and optimization techniques in Java.',
                    'Design and implementation of indexing strategies and stopping-rule mechanisms to improve graph processing efficiency.'
                ]
            }
        ];

        this.container.classList.add('panel-grid');
        this.clear();

        entries.forEach(({ title, subtitle, meta, details }) => {
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
