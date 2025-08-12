import Gtk from 'gi://Gtk';

const generateGtkButton = (label, gsKey, predefinedString, settings, row) => {
    let gtkButton = new Gtk.Button();
    gtkButton.set_label(label);
    gtkButton.connect('clicked', () => {
        settings.set_string(gsKey, predefinedString);
        row.set_text(settings.get_string(gsKey));
    });

    return gtkButton;
}

export default generateGtkButton;