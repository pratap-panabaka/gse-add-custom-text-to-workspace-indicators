import Gdk from 'gi://Gdk';
import Gtk from 'gi://Gtk';

const generateResetColorButton = (settings, button, gsKey) => {

    let resetButton = new Gtk.Button({
        label: 'Reset',
    });

    resetButton.connect('clicked', () => {
        settings.set_string(gsKey, '');
        let rgba = new Gdk.RGBA();
        button.set_rgba(rgba);
    });

    return resetButton;
}

export default generateResetColorButton;