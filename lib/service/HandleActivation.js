"use strict";
import app from '../app.js';

// service is just a constructor function
// that will be called with 'new'
app.service('activationService', function($rootScope) {
    // Is this a Windows machine?
    this.featureSupported = !!window.Windows
    this.argsHandled = false;
    // Check if you have some activation event to do
    this.tryToActivate = function() {
        if(this.isActivationRequired()){
            this.activate();
            return true
        }
        return false
    }

    this.isActivationRequired = function() {
        if (!this.featureSupported) {
            return false
        }
        // Do I have arguments? Have I already handled them?
        return !!$rootScope._config.launchActivatedEventArgs && !this.argsHandled;
    }

    this.activate = function() {
        const args = $rootScope._config.launchActivatedEventArgs;
        const { ActivationKind } = Windows.ApplicationModel.Activation;
        const { StandardDataFormats } = Windows.ApplicationModel.DataTransfer;

        if (args.kind === ActivationKind.file) {
            const [file] = args.files;
            this.loadFile(file);
            this.argsHandled = true;

            return true;
        }

        if (args.kind !== ActivationKind.shareTarget) {
            this.argsHandled = true;
            return false;
        }

        const { data } = args.shareOperation
        if (data.contains(StandardDataFormats.storageItems)) {
            data.getStorageItemsAsync()
                .done((items) => {
                    const [item] = items;
                    this.shareFile(item, data.properties);
                });
            this.argsHandled = true;

            return true;
        }

        return false;
    }
    this.readFile = function(file) {
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
    this.loadFile = function(file) {
        return this.readFile(file)
            .then((text) => {
                window.MakeArt.app.loadCode(text);
            });
    }
    this.shareFile = function(file, properties) {
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