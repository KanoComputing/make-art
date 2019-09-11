import { blobToString } from '../../util/file.js';

export function saveFile(blob, filename) {
    const savePicker = new Windows.Storage.Pickers.FileSavePicker();
    savePicker.SuggestedStartLocation = Windows.Storage.Pickers.PickerLocationId.DocumentsLibrary;
    // Dropdown of file types the user can save the file as
    savePicker.fileTypeChoices.insert('Make Art Creation', ['.draw']);
    // Default file name if the user does not type one in or select a file to replace
    savePicker.suggestedFileName = filename;

    return savePicker.pickSaveFileAsync()
        .then((file) => {
            if (!file) {
                throw new Error('Could not save file: User cancelled');
            }
            // Prevent updates to the remote version of the file until
            // we finish making changes and call CompleteUpdatesAsync.
            Windows.Storage.CachedFileManager.deferUpdates(file);

            return blobToString(blob)
                .then((contents) => Windows.Storage.FileIO.writeTextAsync(file, contents))
                .then(() => Windows.Storage.CachedFileManager.completeUpdatesAsync(file));
        });
}
