"use strict";
import app from '../app.js';

// service is just a constructor function
// that will be called with 'new'
app.service('activationService', function ($rootScope) {

    /*
     *  helper funcs
     */

    let tryToActivate = () => {

        // Is this a Windows machine? if not return
        if (!this.featureSupported) {
            return false
        }
        
        const args = $rootScope._config.launchActivatedEventArgs;
        const { ActivationKind } = Windows.ApplicationModel.Activation;
        let isFile = args.kind === ActivationKind.file;
        let isShareTarget = args.kind === ActivationKind.shareTarget;

        let argsToProcess = !!$rootScope._config.launchActivatedEventArgs && !this.argsHandled;
        let relevantArgs = isFile || isShareTarget
        
        // we do NOT have argument so return
        if (!argsToProcess) {
            return false
        }
        // do we have arguments but we dont care about them
        if (argsToProcess && !relevantArgs) {
            this.argsHandled = true;
            return false
        }
        // We are in Windows, we have args we care not handled yet, so activate the service ps. it must return true
        activate(args, isFile, isShareTarget)

        return true
    }

    let activate = (args, isFile, isShareTarget) => {
        const [file] = args.files;

        if (isFile) {
            loadFile(file);
            this.argsHandled = true;

            return true;
        }

        // We want to share with right click on a file in Windows
        if (isShareTarget) {
            const { data } = args.shareOperation
            if (data.contains(StandardDataFormats.storageItems)) {
                data.getStorageItemsAsync()
                    .done((items) => {
                        const [item] = items;
                        shareFile(item, data.properties);
                    });
                this.argsHandled = true;

                return true;
            }
        }
        return false
    }

    let readFile = (file) => {
        let result = file.openReadAsync()
            .then((streamOfContent) => {
                const inputStream = streamOfContent.getInputStreamAt(0);
                // Reads data from an input stream.
                let dataReader = new Windows.Storage.Streams.DataReader(inputStream);
                return dataReader.loadAsync(streamOfContent.size)
                    .then((loaded) => {
                        // Note that the call to readString requires a length of "code units" 
                        // to read.
                        const text = dataReader.readString(loaded);
                        return text;
                    });
            });

        return result;
    }

    let loadFile = (file) => {
        return readFile(file)
            .then((text) => {
                // go to playground and paste the share's code
                window.MakeArt.app.loadCode(text);
            });
    }

    let shareFile = (file, properties) => {
        return readFile(file)
            .then((text) => {
                const share = {
                    code: text,
                    title: properties.title,
                    description: properties.description,
                }
                window.MakeArt.app.shareCode(share);
            });
    }

    /*
     *   object properties
     */

    this.featureSupported = !!window.Windows
    this.argsHandled = false;
    // Check if you have some activation event to do
    this.tryToActivate = tryToActivate
});