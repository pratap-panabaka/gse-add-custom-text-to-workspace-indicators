import Gdk from 'gi://Gdk';
import Gtk from 'gi://Gtk';

const generateColorButton = (settings, gsKey) => {
    let button = null;

    let rgba = new Gdk.RGBA();
    let boolean = rgba.parse(settings.get_string(gsKey));
    if (!boolean)
        rgba.parse('#ABCDEF00');

    button = new Gtk.ColorDialogButton({
        dialog: new Gtk.ColorDialog(),
        rgba,
    });
    button.connect('notify::rgba', () => onPanelColorChanged(settings, button, gsKey));

    return button;
}

const onPanelColorChanged = (settings, button, gsKey) => {
    let rgba = button.rgba;
    let { red, green, blue, alpha } = rgba;
    if (red === 0 && green === 0 && blue === 0 && alpha === 0) {
        return;
    }
    let css = `rgba(${Math.round(rgba.red * 255)}, ${Math.round(rgba.green * 255)}, ${Math.round(rgba.blue * 255)}, ${rgba.alpha})`;
    settings.set_string(gsKey, css);
}

export default generateColorButton;