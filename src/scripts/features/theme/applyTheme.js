import { THEME_STORAGE_KEY } from '../../config/storage.js';
import { THEME_MODES, THEME_PRESETS, THEME_SCHEMA, getDefaultTheme } from '../../config/theme.js';

const HEX_PATTERN = /^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;

// Normalizes a hex color to #rrggbb, or returns null when invalid.
export function parseHexColor(value) {
    if (typeof value !== 'string' || !HEX_PATTERN.test(value.trim())) {
        return null;
    }

    const hex = value.trim().replace('#', '');
    const full = hex.length === 3 ? hex.split('').map((digit) => `${digit}${digit}`).join('') : hex;
    return `#${full.toLowerCase()}`;
}

// Uses YIQ so light surfaces get black text and dark surfaces get white text.
export function isColorDark(hex) {
    const parsed = parseHexColor(hex);
    if (!parsed) {
        return true;
    }

    const numeric = parseInt(parsed.slice(1), 16);
    const red = (numeric >> 16) & 255;
    const green = (numeric >> 8) & 255;
    const blue = numeric & 255;
    const yiq = (red * 299 + green * 587 + blue * 114) / 1000;
    return yiq < 128;
}

export function contrastTextColor(hex) {
    return isColorDark(hex) ? '#ffffff' : '#000000';
}

function hexToRgb(hex) {
    const parsed = parseHexColor(hex);
    if (!parsed) {
        return null;
    }

    const numeric = parseInt(parsed.slice(1), 16);
    return {
        red: (numeric >> 16) & 255,
        green: (numeric >> 8) & 255,
        blue: numeric & 255
    };
}

// Section and panel text: white if any RGB channel is below 255/2, otherwise black.
export function contrastSectionPanelText(hex) {
    const rgb = hexToRgb(hex);
    if (!rgb) {
        return '#000000';
    }

    const threshold = 255 / 2;
    if (rgb.red < threshold || rgb.green < threshold || rgb.blue < threshold) {
        return '#ffffff';
    }

    return '#000000';
}

function sanitizeCustomColors(custom) {
    return {
        background: parseHexColor(custom?.background) || THEME_PRESETS.dark.background,
        section: parseHexColor(custom?.section) || THEME_PRESETS.dark.section,
        panel: parseHexColor(custom?.panel) || THEME_PRESETS.dark.panel
    };
}

export function readStoredTheme() {
    try {
        const raw = localStorage.getItem(THEME_STORAGE_KEY);
        if (!raw) {
            return getDefaultTheme();
        }

        const parsed = JSON.parse(raw);
        const mode = THEME_MODES.includes(parsed.mode) ? parsed.mode : 'dark';
        const schema = Number(parsed.schema) || 1;
        const liquidGlass = schema < 2 ? true : Boolean(parsed.liquidGlass);

        return {
            mode,
            custom: sanitizeCustomColors(parsed.custom),
            liquidGlass,
            schema: THEME_SCHEMA
        };
    } catch {
        return getDefaultTheme();
    }
}

export function saveTheme(theme) {
    localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(theme));
}

export function resolveThemeColors(theme) {
    if (theme?.mode === 'light') {
        return { ...THEME_PRESETS.light };
    }

    if (theme?.mode === 'custom') {
        return sanitizeCustomColors(theme.custom);
    }

    return { ...THEME_PRESETS.dark };
}

export function applyTheme(theme) {
    const colors = resolveThemeColors(theme);
    const root = document.documentElement;
    const mode = theme?.mode || 'dark';

    root.style.setProperty('--color-background', colors.background);
    root.style.setProperty('--color-section', colors.section);
    root.style.setProperty('--color-panel', colors.panel);
    root.style.setProperty('--color-background-text', contrastSectionPanelText(colors.background));
    root.style.setProperty('--color-section-text', contrastSectionPanelText(colors.section));
    root.style.setProperty('--color-panel-text', contrastSectionPanelText(colors.panel));
    root.style.colorScheme = isColorDark(colors.background) ? 'dark' : 'light';
    root.dataset.theme = mode;
    root.dataset.liquidGlass = theme?.liquidGlass ? 'on' : 'off';
}

export function applyStoredTheme() {
    applyTheme(readStoredTheme());
}
