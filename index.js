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
                console.log('launchActivatedEventArgs() => 1')
                this.handleActivation(config.launchActivatedEventArgs)
            }
        });
    }
    handleActivation(args) {
        console.log('handleActivation() => 1')
        const { ActivationKind } = Windows.ApplicationModel.Activation;
        const { StandardDataFormats } = Windows.ApplicationModel.DataTransfer;
        if (args.kind === ActivationKind.file) {
            const [file] = args.files;
            this.loadFile(file);
            // for test
            let thisLoadFile = this.loadFile(file);
            console.log('this.loadFile(file) =>',thisLoadFile)
        } else if (args.kind === ActivationKind.shareTarget) {
            const { data } = args.shareOperation
            console.log('data =>')
            if (data.contains(StandardDataFormats.storageItems)) {
                data.getStorageItemsAsync()
                    .done((items) => {
                        const [item] = items;
                        console.log('item =>',[item])
                        this.shareFile(item, data.properties);
                    });
            }
        }
    }
    readFile(file) {
        console.log('readFile() => 1')
        return file.openReadAsync()
            .then((stream) => {
                console.log('stream =>', stream)
                const inputStream = stream.getInputStreamAt(0);
                console.log('inputStream =>', inputStream)
                var dataReader = new Windows.Storage.Streams.DataReader(inputStream);
                console.log('dataReader =>', dataReader)
                return dataReader.loadAsync(stream.size)
                    .then((loaded) => {
                        const text = dataReader.readString(loaded);
                        console.log('text =>',text.length)
                        return text;
                    });
            });
    }
    loadFile(file) {
        console.log('loadFile() => 1')
        return this.readFile(file)
            .then((text) => {
                console.log('index.js loadFile text =>',text.length)
                console.log('window.MakeArt loadFile  =>',window.MakeArt)
                window.MakeArt.app.loadCode(text);
            });
    }
    shareFile(file, properties) {
        // for test
        let thisShareFile = this.loadFile(file);
        console.log('shareFile()/loadfile => ',thisShareFile)
        return this.readFile(file)
            .then((text) => {
                const share = {
                    code: text,
                    title: properties.title,
                    description: properties.description,
                }
                console.log('share() 1x =>', share)
                window.MakeArt.app.shareCode(share);
                console.log('share() 2x =>', share)
            });
    }
}

Shell.define(MakeArt);
