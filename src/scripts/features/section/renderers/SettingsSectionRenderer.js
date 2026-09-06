import { fetchSectionData } from '../../../services/contentService.js';
import {
    applyTheme,
    readStoredTheme,
    resolveThemeColors,
    saveTheme
} from '../../theme/applyTheme.js';
import { Section } from './SectionRenderer.js';

let settingsControlsBound = false;

// Custom renderer for the Settings appearance controls.
export class SettingsSectionRenderer extends Section {
    async render() {
        const copy = await fetchSectionData(this.sectionName);
        const theme = readStoredTheme();

        this.container.classList.add('panel-grid');
        this.clear();

        this.container.appendChild(this.createColorThemePanel(copy, theme));
        this.container.appendChild(this.createLiquidGlassPanel(copy.liquidGlass, theme));

        this.syncCustomVisibility(theme.mode);
        this.syncLiquidGlass(Boolean(theme.liquidGlass));
        this.bindThemeControls();
    }

    createColorThemePanel(copy, theme) {
        const body = document.createElement('div');
        body.className = 'panel-body settings-body';

        const modes = document.createElement('div');
        modes.className = 'settings-modes';
        modes.setAttribute('role', 'radiogroup');
        modes.setAttribute('aria-label', 'Appearance');
        copy.modes.forEach((mode) => {
            modes.appendChild(this.createChoiceButton(mode, theme.mode, 'settings-mode'));
        });

        body.appendChild(modes);
        body.appendChild(this.createCustomFields(copy, theme));
        return this.createOptionPanel(copy.title, copy.details, body);
    }

    createLiquidGlassPanel(copy, theme) {
        const body = document.createElement('div');
        body.className = 'panel-body settings-body';

        const options = document.createElement('div');
        options.className = 'settings-modes';
        options.setAttribute('role', 'radiogroup');
        options.setAttribute('aria-label', 'Liquid Glass');

        const selected = theme.liquidGlass ? 'on' : 'off';
        copy.options.forEach((option) => {
            options.appendChild(
                this.createChoiceButton(option, selected, 'settings-liquid-option')
            );
        });

        body.appendChild(options);
        return this.createOptionPanel(copy.title, copy.details, body);
    }

    createOptionPanel(title, details, body) {
        const panel = document.createElement('article');
        panel.className = 'panel settings-option-panel';
        panel.appendChild(this.createElement('h2', 'panel-title', title));
        if (details) {
            panel.appendChild(this.createElement('p', 'panel-details', details));
        }
        panel.appendChild(body);
        return panel;
    }

    createChoiceButton(option, selectedId, className) {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = `settings-control settings-choice ${className}`;
        button.dataset.option = option.id;
        button.setAttribute('role', 'radio');
        button.setAttribute('aria-checked', String(option.id === selectedId));

        if (option.id === selectedId) {
            button.classList.add('is-selected');
        }

        button.appendChild(this.createElement('span', 'settings-mode-title', option.title));
        button.appendChild(this.createElement('span', 'settings-mode-details', option.details));
        return button;
    }

    createCustomFields(copy, theme) {
        const fields = document.createElement('div');
        fields.className = 'settings-colors';
        fields.appendChild(this.createElement('p', 'settings-colors-title', copy.customTitle));

        const colors = resolveThemeColors(theme);
        copy.colors.forEach((field) => {
            fields.appendChild(this.createColorRow(field, colors[field.id]));
        });

        return fields;
    }

    createColorRow(field, value) {
        const row = document.createElement('label');
        row.className = 'settings-control settings-color-row';
        row.appendChild(this.createElement('span', 'settings-color-label', field.label));

        const input = document.createElement('input');
        input.className = 'settings-color-input';
        input.type = 'color';
        input.name = field.id;
        input.value = value;
        input.setAttribute('aria-label', field.label);
        row.appendChild(input);
        return row;
    }

    bindThemeControls() {
        if (settingsControlsBound) {
            return;
        }
        settingsControlsBound = true;

        document.addEventListener(
            'click',
            (event) => {
                const liquidOption = event.target.closest('.settings-liquid-option');
                if (liquidOption) {
                    event.preventDefault();
                    event.stopPropagation();
                    this.setLiquidGlass(liquidOption.dataset.option === 'on');
                    return;
                }

                const modeButton = event.target.closest('.settings-mode');
                if (!modeButton) {
                    return;
                }
                event.preventDefault();
                event.stopPropagation();
                this.selectMode(modeButton.dataset.option);
            },
            true
        );

        document.addEventListener('input', (event) => {
            const input = event.target;
            if (!(input instanceof HTMLInputElement) || !input.classList.contains('settings-color-input')) {
                return;
            }
            this.updateCustomColor(input.name, input.value);
        });
    }

    selectMode(mode) {
        const theme = readStoredTheme();
        if (mode === 'custom' && theme.mode !== 'custom') {
            theme.custom = resolveThemeColors(theme);
        }

        theme.mode = mode;
        saveTheme(theme);
        applyTheme(theme);
        this.syncSelectedMode(mode);
        this.syncCustomVisibility(mode);
        this.syncColorInputs(resolveThemeColors(theme));
    }

    setLiquidGlass(enabled) {
        const theme = readStoredTheme();
        theme.liquidGlass = enabled;
        saveTheme(theme);
        applyTheme(theme);
        this.syncLiquidGlass(enabled);
    }

    updateCustomColor(key, value) {
        const theme = readStoredTheme();
        theme.mode = 'custom';
        theme.custom = {
            ...resolveThemeColors(theme),
            [key]: value
        };
        saveTheme(theme);
        applyTheme(theme);
        this.syncSelectedMode('custom');
        this.syncCustomVisibility('custom');
        this.syncColorInputs(theme.custom);
    }

    syncSelectedMode(mode) {
        document.querySelectorAll('.settings-mode').forEach((card) => {
            const selected = card.dataset.option === mode;
            card.classList.toggle('is-selected', selected);
            card.setAttribute('aria-checked', String(selected));
        });
    }

    syncLiquidGlass(enabled) {
        const selected = enabled ? 'on' : 'off';
        document.querySelectorAll('.settings-liquid-option').forEach((card) => {
            const isSelected = card.dataset.option === selected;
            card.classList.toggle('is-selected', isSelected);
            card.setAttribute('aria-checked', String(isSelected));
        });
    }

    syncCustomVisibility(mode) {
        const isCustom = mode === 'custom';
        document.querySelectorAll('.settings-colors').forEach((fields) => {
            fields.hidden = !isCustom;
            fields.setAttribute('aria-hidden', String(!isCustom));
        });
    }

    syncColorInputs(colors) {
        document.querySelectorAll('.settings-color-input').forEach((input) => {
            if (colors[input.name]) {
                input.value = colors[input.name];
            }
        });
    }
}
