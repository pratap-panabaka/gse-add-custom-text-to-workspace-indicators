import Adw from 'gi://Adw';
import Gio from 'gi://Gio';
import Gtk from 'gi://Gtk';

import {ExtensionPreferences} from 'resource:///org/gnome/Shell/Extensions/js/extensions/prefs.js';

import {setButtonColor, colorButton, createGtkButton} from './prefs/helperFunctions.js';
import PickImage from './prefs/pickImage.js';

export default class AddCustomTextToWorkSpaceIndicatorsExtensionPreferences extends ExtensionPreferences {
    fillPreferencesWindow(window) {
        window._settings = this.getSettings();
        window.set_default_size(800, 1000);

        window._pillsColorButton = new Gtk.ColorButton();
        window._labelColorButton = new Gtk.ColorButton();
        window._indicatorColorButton = new Gtk.ColorButton();

        setButtonColor(window._pillsColorButton, 'pills-color', window._settings);
        setButtonColor(window._labelColorButton, 'label-color', window._settings);
        setButtonColor(window._indicatorColorButton, 'indicator-color', window._settings);

        const page = new Adw.PreferencesPage();

        window.add(page);

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
        systemIndicatorsGroup.add(colorButton('Reset', window._pillsColorButton, 'pills-color', window._settings, systemIndicatorColorRow));
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

        const customTextColor = new Adw.ActionRow({
            title: 'Custom Text Color',
        });
        customTextGroup.add(colorButton('Reset', window._labelColorButton, 'label-color', window._settings, customTextColor));

        const entryRow = new Adw.EntryRow({
            title: 'Enter your text or leave it blank for extensions default text',
            'enable-emoji-completion': true,
        });
        entryRow.set_text(window._settings.get_string('custom-text'));
        entryRow.connect('changed', entry => {
            window._settings.set_string('custom-text', entry.get_text());
        });
        entryRow.add_prefix(new Gtk.Label({label: 'Custom Text'}));
        entryRow.add_suffix(createGtkButton('Clear Text', 'custom-text', '', window._settings, entryRow));
        customTextGroup.add(entryRow);

        const customTextsPredefinedTitleRow = new Adw.ActionRow({
            title: 'Predefined Texts',
        });
        customTextGroup.add(customTextsPredefinedTitleRow);

        const customTextsPredefinedRow = new Adw.ActionRow();
        customTextsPredefinedRow.add_suffix(createGtkButton('User Name', 'custom-text', 'username', window._settings, entryRow));
        customTextsPredefinedRow.add_suffix(createGtkButton('Real Name', 'custom-text', 'realname', window._settings, entryRow));
        customTextsPredefinedRow.add_suffix(createGtkButton('Host Name', 'custom-text', 'hostname', window._settings, entryRow));
        customTextsPredefinedRow.add_suffix(createGtkButton('OS Name', 'custom-text', 'osname', window._settings, entryRow));
        customTextsPredefinedRow.add_suffix(createGtkButton('Kernel Version', 'custom-text', 'kernel', window._settings, entryRow));
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
        customIndicatorsGroup.add(colorButton('Reset', window._indicatorColorButton, 'indicator-color', window._settings, customIndicatorColorRow));
        //

        window._settings.bind('hide-pills', workSpaceIndicatorsRow, 'active', Gio.SettingsBindFlags.DEFAULT);
        window._settings.bind('show-logo', showLogoRow, 'active', Gio.SettingsBindFlags.DEFAULT);
        window._settings.bind('show-custom-text', showCustomTextRow, 'active', Gio.SettingsBindFlags.DEFAULT);
        window._settings.bind('show-custom-indicator', showCustomIndicatorsRow, 'active', Gio.SettingsBindFlags.DEFAULT);
    }
}
