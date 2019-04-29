class MakeArt {
    constructor(bus, config) {
        this.root = document.createElement('div');
        this.root.appendChild(document.createElement('ng-view'));
        window.CONFIG = config.CONFIG;
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = `${config.UI_ROOT}www/css/main.css`;
        document.head.appendChild(link);
        import('./lib/index.js').then(() => {
            config.APP_ROOT = `${config.UI_ROOT}www/`;
            window.MakeArt.app.constant('_config', config);
            window.MakeArt.bootstrap(this.root);
            if (config.launchActivatedEventArgs) {
                this.handleActivation(config.launchActivatedEventArgs)
            }
        });
    }
    handleActivation(args) {
        const { ActivationKind } = Windows.ApplicationModel.Activation;
        const { StandardDataFormats } = Windows.ApplicationModel.DataTransfer;
        if (args.kind === ActivationKind.file) {
            const [file] = args.files;
            this.loadFile(file);
        } else if (args.kind === ActivationKind.shareTarget) {
            const { data } = args.shareOperation
            if (data.contains(StandardDataFormats.storageItems)) {
                data.getStorageItemsAsync()
                    .done((items) => {
                        const [item] = items;
                        this.shareFile(item, data.properties);
                    });
            }
        }
    }
    readFile(file) {
        return file.openReadAsync()
            .then((stream) => {
                const inputStream = stream.getInputStreamAt(0);
                var dataReader = new Windows.Storage.Streams.DataReader(inputStream);
                return dataReader.loadAsync(stream.size)
                    .then((loaded) => {
                        const text = dataReader.readString(loaded);
                        return text;
                    });
            });
    }
    loadFile(file) {
        return this.readFile(file)
            .then((text) => {
                window.MakeArt.app.loadCode(text);
            });
    }
    shareFile(file, properties) {
        return this.readFile(file)
            .then((text) => {
                const share = {
                    code: text,
                    title: properties.title,
                    description: properties.description,
                }
                window.MakeArt.app.shareCode(share);
            });
    }
}

Shell.define(MakeArt);
