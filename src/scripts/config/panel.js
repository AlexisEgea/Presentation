import { CertificationSectionRenderer } from '../features/section/renderers/CertificationSectionRenderer.js';
import { EducationSectionRenderer } from '../features/section/renderers/EducationSectionRenderer.js';
import { HardSkillsSectionRenderer } from '../features/section/renderers/HardSkillsSectionRenderer.js';
import { ProgrammingSectionRenderer } from '../features/section/renderers/ProgrammingSectionRenderer.js';
import { SoftSkillsSectionRenderer } from '../features/section/renderers/SoftSkillsSectionRenderer.js';

export const PANEL_RENDERERS = {
    education: EducationSectionRenderer,
    certification: CertificationSectionRenderer,
    'soft-skills': SoftSkillsSectionRenderer,
    'hard-skills': HardSkillsSectionRenderer,
    programming: ProgrammingSectionRenderer
};

export const PANEL_ENTRY_TRANSITION = 'opacity 0.5s ease-out, transform 0.5s ease-out';

// Direction variants aligned with the home grid reveal.
export const PANEL_ENTRY_ANIMATIONS = [
    {
        enter: { opacity: '0', transform: 'translateX(-70px)', transition: PANEL_ENTRY_TRANSITION },
        final: { opacity: '1', transform: 'translateX(0)' }
    }
];

export const PANEL_ENTRY_DURATION_MS = 500;