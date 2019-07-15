"use strict";
import app from '../app.js';

// service is just a constructor function
// that will be called with 'new'
app.service('HandleActivationService', function ($rootScope) {
    this.featureSupported = !!window.Windows
    this.argsHandled = false;
    // Check if you have some activation event to do
    this.AreArguementsQueuedForProcessing = function () {
        if (!this.featureSupported){
            return false
        }
        return $rootScope._config.launchActivatedEventArgs && !this.argsHandled;
    }

    this.TestAndHandleArgs = function () {
        //Do I have arguments?
        // Have I already handled them?
        this.handleActivation($rootScope._config.launchActivatedEventArgs);
        this.argsHandled = true;
    }

    this.handleActivation = function (args) {
        if (!this.featureSupported){
            return;
        }
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
    this.readFile = function (file) {
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
    this.loadFile = function (file) {
        return this.readFile(file)
            .then((text) => {
                window.MakeArt.app.loadCode(text);
            });
    }
    this.shareFile = function (file, properties) {
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
});

