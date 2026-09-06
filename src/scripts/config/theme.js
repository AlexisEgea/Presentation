// Default appearance matches the current dark site.
export const THEME_PRESETS = {
    dark: {
        background: '#000000',
        section: '#000000',
        panel: '#000000'
    },
    light: {
        background: '#ffffff',
        section: '#ffffff',
        panel: '#ffffff'
    }
};

export const THEME_MODES = ['dark', 'light', 'custom'];
export const THEME_SCHEMA = 2;

export function getDefaultTheme() {
    return {
        mode: 'dark',
        custom: { ...THEME_PRESETS.dark },
        liquidGlass: true,
        schema: THEME_SCHEMA
    };
}
