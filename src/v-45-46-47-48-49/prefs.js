import Adw from 'gi://Adw';
import Gio from 'gi://Gio';
import Gtk from 'gi://Gtk';

import { ExtensionPreferences } from 'resource:///org/gnome/Shell/Extensions/js/extensions/prefs.js';

import PickImage from './preferences/pickImage.js';
import generateColorButton from './preferences/generateColorButton.js';
import generateResetColorButton from './preferences/generateResetColorButton.js';
import generateGtkButton from './preferences/generateGtkButton.js';

export default class AddCustomTextToWorkSpaceIndicatorsExtensionPreferences extends ExtensionPreferences {
    fillPreferencesWindow(window) {
        window._settings = this.getSettings();
        window.set_default_size(800, 1000);

        const page = new Adw.PreferencesPage();

        window.add(page);

        let button;
        let reset;

        // system indicators
        const systemIndicatorsGroup = new Adw.PreferencesGroup({
            title: 'System Workspace Indicators (Pills)',
        });
        page.add(systemIndicatorsGroup);

        const workSpaceIndicatorsRow = new Adw.SwitchRow({
            title: 'Hide System Workspace Indicators (Pills)',
        });
        systemIndicatorsGroup.add(workSpaceIndicatorsRow);

        const systemIndicatorColorRow = new Adw.ActionRow({
            title: 'Pills Color',
        });
        button = generateColorButton(window._settings, 'pills-color');
        reset = generateResetColorButton(window._settings, button, 'pills-color');
        systemIndicatorColorRow.add_suffix(button);
        systemIndicatorColorRow.add_suffix(reset);
        systemIndicatorsGroup.add(systemIndicatorColorRow);
        //

        // Logo
        const logoGroup = new Adw.PreferencesGroup({
            title: 'Logo',
            hexpand_set: true,
            hexpand: true,
        });

        const showLogoRow = new Adw.SwitchRow({
            title: 'Show Logo',
        });
        logoGroup.add(showLogoRow);

        const folderThing = new PickImage(window._settings);
        logoGroup.add(folderThing.addPictureUrl());

        page.add(logoGroup);
        //

        // custom text group
        const customTextGroup = new Adw.PreferencesGroup({
            title: 'Custom Text',
        });
        page.add(customTextGroup);

        const showCustomTextRow = new Adw.SwitchRow({
            title: 'Show Custom Text',
        });
        customTextGroup.add(showCustomTextRow);

        const customTextColorRow = new Adw.ActionRow({
            title: 'Custom Text Color',
        });
        button = generateColorButton(window._settings, 'label-color');
        reset = generateResetColorButton(window._settings, button, 'label-color');
        customTextColorRow.add_suffix(button);
        customTextColorRow.add_suffix(reset);
        customTextGroup.add(customTextColorRow);

        const entryRow = new Adw.EntryRow({
            title: 'Enter your text or leave it blank for extensions default text',
            'enable-emoji-completion': true,
        });
        entryRow.set_text(window._settings.get_string('custom-text'));
        entryRow.connect('changed', entry => {
            window._settings.set_string('custom-text', entry.get_text());
        });
        entryRow.add_prefix(new Gtk.Label({ label: 'Custom Text' }));
        entryRow.add_suffix(generateGtkButton('Clear Text', 'custom-text', '', window._settings, entryRow));
        customTextGroup.add(entryRow);

        const customTextsPredefinedTitleRow = new Adw.ActionRow({
            title: 'Predefined Texts',
        });
        customTextGroup.add(customTextsPredefinedTitleRow);

        const customTextsPredefinedRow = new Adw.ActionRow();
        customTextsPredefinedRow.add_suffix(generateGtkButton('User Name', 'custom-text', 'username', window._settings, entryRow));
        customTextsPredefinedRow.add_suffix(generateGtkButton('Real Name', 'custom-text', 'realname', window._settings, entryRow));
        customTextsPredefinedRow.add_suffix(generateGtkButton('Host Name', 'custom-text', 'hostname', window._settings, entryRow));
        customTextsPredefinedRow.add_suffix(generateGtkButton('OS Name', 'custom-text', 'osname', window._settings, entryRow));
        customTextsPredefinedRow.add_suffix(generateGtkButton('Kernel Version', 'custom-text', 'kernel', window._settings, entryRow));
        customTextGroup.add(customTextsPredefinedRow);
        //

        // custom indicators group
        const customIndicatorsGroup = new Adw.PreferencesGroup({
            title: 'Custom Indicators',
        });
        page.add(customIndicatorsGroup);

        const showCustomIndicatorsRow = new Adw.SwitchRow({
            title: 'Show Custom Indicator',
        });

        customIndicatorsGroup.add(showCustomIndicatorsRow);
        const customIndicatorColorRow = new Adw.ActionRow({
            title: 'Custom Indicator Color',
        });
        button = generateColorButton(window._settings, 'indicator-color');
        reset = generateResetColorButton(window._settings, button, 'indicator-color');
        customIndicatorColorRow.add_suffix(button);
        customIndicatorColorRow.add_suffix(reset);
        customIndicatorsGroup.add(customIndicatorColorRow);
        //

        window._settings.bind('hide-pills', workSpaceIndicatorsRow, 'active', Gio.SettingsBindFlags.DEFAULT);
        window._settings.bind('show-logo', showLogoRow, 'active', Gio.SettingsBindFlags.DEFAULT);
        window._settings.bind('show-custom-text', showCustomTextRow, 'active', Gio.SettingsBindFlags.DEFAULT);
        window._settings.bind('show-custom-indicator', showCustomIndicatorsRow, 'active', Gio.SettingsBindFlags.DEFAULT);
    }
}
