import Adw from 'gi://Adw';
import Gtk from 'gi://Gtk';
import Gio from 'gi://Gio';

class PickImage {
    constructor(settings) {
        this._gsettings = settings;
        this._entryRow = null;
    }

    addPictureUrl() {
        this._entryRow = new Adw.EntryRow({
            title: 'Please use square sized image',
        });

        this._entryRow.set_text(this._gsettings.get_string('logo-path'));
        this._entryRow.connect('changed', entry => {
            this._gsettings.set_string('logo-path', entry.get_text());
        });

        this._entryRow.add_suffix(this.addButton());

        return this._entryRow;
    }

    addButton() {
        const imageChooseButton = new Gtk.Button({label: 'Browse Image'});
        imageChooseButton.set_has_frame(true);
        imageChooseButton.connect('clicked', this.showFileChooserDialog.bind(this));

        return imageChooseButton;
    }

    showFileChooserDialog() {
        const fileChooser = new Gtk.FileDialog({title: 'Select Image File'});
        try {
            const lastFolder = Gio.File.new_for_path(this._gsettings.get_string('logo-path')).get_parent();
            fileChooser.set_initial_folder(lastFolder);
        } catch (e) {
            console.log(e);
        }
        fileChooser.open(null, null, (dialog, result) => {
            this.onSelectFileFinish(dialog, result);
        }, null);
    }

    onSelectFileFinish(dialog, result) {
        try {
            const file = dialog.open_finish(result);
            if (file)
                this._entryRow.set_text(file.get_path());

            else
                console.log('No file selected.');
        } catch (e) {
            console.log(`Error selecting file: ${e}`);
        } finally {
            dialog.destroy();
        }
    }
}

export default PickImage;
