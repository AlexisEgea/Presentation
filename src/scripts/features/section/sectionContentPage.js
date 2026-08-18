import { RETURN_SECTION_KEY } from '../../config/storage.js';
import { fetchSectionContent } from '../../services/contentService.js';
import { CertificationSectionRenderer } from './renderers/CertificationSectionRenderer.js';
import { EducationSectionRenderer } from './renderers/EducationSectionRenderer.js';
import { HardSkillsSectionRenderer } from './renderers/HardSkillsSectionRenderer.js';
import { ProgrammingSectionRenderer } from './renderers/ProgrammingSectionRenderer.js';
import { SoftSkillsSectionRenderer } from './renderers/SoftSkillsSectionRenderer.js';
import { qs } from '../../shared/dom.js';

// Binds "click anywhere / Escape" return behavior for section pages.
function bindReturnShortcut(sectionName) {
    const returnToGrid = () => {
        // Persist source section so home page can replay correct dezoom.
        sessionStorage.setItem(RETURN_SECTION_KEY, sectionName);
        window.location.href = `../../index.html?from=${encodeURIComponent(sectionName)}`;
    };

    document.addEventListener('click', returnToGrid);
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            returnToGrid();
        }
    });
}

// Loads and renders section content, then enables section-specific features.
export async function initSectionContentPage() {
    const root = qs('.section-page');
    if (!root) {
        return;
    }

    // Read section metadata from page root.
    const sectionName = root.dataset.section;
    const contentElement = qs('#section-content');
    if (!sectionName || !contentElement) {
        return;
    }

    bindReturnShortcut(sectionName);

    try {
        if (sectionName === 'education') {
            // Education is rendered by a dedicated class with hard-coded panels.
            const renderer = new EducationSectionRenderer(sectionName, contentElement);
            await renderer.render();
            return;
        }
        if (sectionName === 'certification') {
            const renderer = new CertificationSectionRenderer(sectionName, contentElement);
            await renderer.render();
            return;
        }
        if (sectionName === 'soft-skills') {
            const renderer = new SoftSkillsSectionRenderer(sectionName, contentElement);
            await renderer.render();
            return;
        }
        if (sectionName === 'hard-skills') {
            const renderer = new HardSkillsSectionRenderer(sectionName, contentElement);
            await renderer.render();
            return;
        }
        if (sectionName === 'programming') {
            const renderer = new ProgrammingSectionRenderer(sectionName, contentElement);
            await renderer.render();
            return;
        }

        // Other sections keep the simple text-based rendering.
        contentElement.innerHTML = await fetchSectionContent(sectionName);
    } catch (error) {
        console.error(error);
        contentElement.innerHTML = 'Content unavailable for this section.';
    }
}
