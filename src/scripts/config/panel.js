import { CertificationSectionRenderer } from '../features/section/renderers/CertificationSectionRenderer.js';
import { EducationSectionRenderer } from '../features/section/renderers/EducationSectionRenderer.js';
import { HardSkillsSectionRenderer } from '../features/section/renderers/HardSkillsSectionRenderer.js';
import { SoftSkillsSectionRenderer } from '../features/section/renderers/SoftSkillsSectionRenderer.js';

export const PANEL_RENDERERS = {
    education: EducationSectionRenderer,
    certification: CertificationSectionRenderer,
    'soft-skills': SoftSkillsSectionRenderer,
    'hard-skills': HardSkillsSectionRenderer
};

export const PANEL_ENTRY_TRANSITION = 'opacity 0.5s ease-out';

export const PANEL_ENTRY_ANIMATIONS = [
    {
        enter: { opacity: '0', transition: PANEL_ENTRY_TRANSITION },
        final: { opacity: '1' }
    }
];

export const PANEL_ENTRY_DURATION_MS = 500;

// Timing and geometry used by the App Store-style panel expansion.
export const PANEL_EXPAND_DURATION_MS = 1000;
export const PANEL_EXPAND_EASING = 'cubic-bezier(0.32, 0.72, 0, 1)';
export const PANEL_EXPAND_INSET_MOBILE = 16;
export const PANEL_EXPAND_HEIGHT_RATIO = 0.76;
export const PANEL_EXPAND_MAX_HEIGHT = 720;