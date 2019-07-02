"use strict";
import { app } from '../app.js';

export function createService(config, handleActivation) {


    app.factory('HandleActivationService', function ($scope) {
        $scope.argsHandled = false;
        // Check if you have some activation event to do
        function AreArguementsQueuedForProcessing() {
            return config.launchActivatedEventArgs && !$scope.argsHandled;
        }

        function TestAndHandleArgs() {
            //Do I have arguments?
            // Have I already handled them?
            handleActivation(config.launchActivatedEventArgs);
            $scope.argsHandled = true;
        }

        return {
            TestAndHandleArgs: TestAndHandleArgs,
            AreArguementsQueuedForProcessing: AreArguementsQueuedForProcessing
        };
    });
}