import Adw from 'gi://Adw';
import Gtk from 'gi://Gtk';

class PickImage {
    constructor(settings) {
        this._gsettings = settings;
        this._entryRow = null;
        this._imageChooseButton = null;
        this._fileChooser = null;
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
        this._imageChooseButton = new Gtk.Button({label: 'Browse Image'});
        this._imageChooseButton.set_has_frame(true);
        this._imageChooseButton.connect('clicked', this.showFileChooserDialog.bind(this));

        return this._imageChooseButton;
    }

    showFileChooserDialog() {
        this._fileChooser = new Gtk.FileDialog({title: 'Select Image File'});
        this._fileChooser.open(null, null, (dialog, result) => {
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
