function saveWallpaper(canvas) {
    const { Storage } = window.Windows;
    const blob = canvas.msToBlob();
    const input = blob.msDetachStream();
    return Storage.ApplicationData.current.localFolder.createFileAsync('wallpaper.png', Storage.CreationCollisionOption.generateUniqueName)
        .then(f => f.openAsync(Storage.FileAccessMode.readWrite)
            .then((stream) => {
                const output = stream.getOutputStreamAt(0);
                return Storage.Streams.RandomAccessStream.copyAsync(input, output)
                    .then(() => stream.flushAsync())
                    .then(() => {
                        output.close();
                        stream.close();
                        return f;
                    });
            }));
}

export function setWallpaper(canvas) {
    const { System } = window.Windows;
    const { UserProfilePersonalizationSettings } = System.UserProfile;
    return saveWallpaper(canvas)
        .then((f) => {
            const profileSettings = UserProfilePersonalizationSettings.current;
            return profileSettings.trySetWallpaperImageAsync(f);
        });
}

export default { setWallpaper };