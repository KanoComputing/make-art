"use strict";
import app from '../app.js';


// service is just a constructor function
// that will be called with 'new'
app.service('HandleActivationService', function ($rootScope) {
    this.argsHandled = false;
    // Check if you have some activation event to do
    this.AreArguementsQueuedForProcessing = function () {
        console.log($rootScope)
        return $rootScope._config.launchActivatedEventArgs && !this.argsHandled;
    }

    this.TestAndHandleArgs = function () {
        //Do I have arguments?
        // Have I already handled them?
        this.handleActivation($rootScope._config.launchActivatedEventArgs);
        this.argsHandled = true;
    }

    this.handleActivation = function (args) {
        console.log('handleActivation() => 1')
        const { ActivationKind } = Windows.ApplicationModel.Activation;
        const { StandardDataFormats } = Windows.ApplicationModel.DataTransfer;
        if (args.kind === ActivationKind.file) {
            const [file] = args.files;
            this.loadFile(file);
            // for test
            let thisLoadFile = this.loadFile(file);
            console.log('this.loadFile(file) =>', thisLoadFile)
        } else if (args.kind === ActivationKind.shareTarget) {
            const { data } = args.shareOperation
            console.log('data =>')
            if (data.contains(StandardDataFormats.storageItems)) {
                data.getStorageItemsAsync()
                    .done((items) => {
                        const [item] = items;
                        console.log('item =>', [item])
                        this.shareFile(item, data.properties);
                    });
            }
        }
    }
    this.readFile = function (file) {
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
                        console.log('text =>', text.length)
                        return text;
                    });
            });
    }
    this.loadFile = function (file) {
        return this.readFile(file)
            .then((text) => {
                console.log('index.js loadFile text =>', text.length)
                console.log('window.MakeArt loadFile  =>', window.MakeArt)
                window.MakeArt.app.loadCode(text);
            });
    }
    this.shareFile = function (file, properties) {
        // for test
        let thisShareFile = this.loadFile(file);
        console.log('shareFile()/loadfile => ', thisShareFile)
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


});

