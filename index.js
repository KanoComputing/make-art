class MakeArt {
    constructor(bus, config) {
        this.root = document.createElement('div');
        this.root.appendChild(document.createElement('ng-view'));
        window.CONFIG = config.CONFIG;
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = `${config.UI_ROOT}www/css/main.css`;
        document.head.appendChild(link);
        require([`${config.UI_ROOT}www/js/index.js`], () => {
            config.APP_ROOT = `${config.UI_ROOT}www/`;
            window.MakeArt.app.constant('_config', config);
            window.MakeArt.bootstrap(this.root);
            if (config.launchActivatedEventArgs) {
                if (config.launchActivatedEventArgs.kind === Windows.ApplicationModel.Activation.ActivationKind.file) {
                    const [file] = config.launchActivatedEventArgs.files;
                    this.loadFile(file);
                }
            }
        });
    }
    loadFile(file) {
        return file.openReadAsync()
            .then((stream) => {
                const inputStream = stream.getInputStreamAt(0);
                var dataReader = new Windows.Storage.Streams.DataReader(inputStream);
                return dataReader.loadAsync(stream.size)
                    .then((loaded) => {
                        const text = dataReader.readString(loaded);
                        window.MakeArt.app.loadCode(text);
                    });
            });
    }
}

Shell.define(MakeArt);
