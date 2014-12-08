var app = require('../app');

/*
 * This directive is there to facilitate the communication between the
 * editor and display directives through an API without using the $rootScope.
 */
app.directive('workspace', function ($window) {
    return {
        restrict: 'A',
        controller: function ($scope, $element, $attrs) {
            $scope.customAnnotations = [];

            this.setCustomAnnotations = function (annotations) {
                $scope.customAnnotations = annotations;
                if ($scope.editorSession) {
                    var current = $scope.editorSession.getAnnotations();
                    $scope.editorSession.setAnnotations(current.concat(annotations));
                }
            };

            this.clearCustomAnnotations = function () {
                this.setCustomAnnotations([]);
            };


            this.setErrorCallback = function (callback) {
                $scope.showErrorOnCanvas = callback;
            };

            this.setEditorSession = function (session) {
                $scope.editorSession = session;

                /* Watch annotation changes and re-add our custom ones
                 * in case the ace background worker clears them.
                 */
                session.on('changeAnnotation', function () {
                    var current = session.getAnnotations();
                    var toBeAdded = [];
                    $scope.customAnnotations.forEach(function (cust_annot) {
                        var needsAdding;
                        needsAdding = current.every(function (curr_annot) {
                            return cust_annot.text != curr_annot.text;
                        });

                        if (needsAdding)
                            toBeAdded.push(cust_annot);
                    });

                    var allAnnotations = current.concat(toBeAdded);

                    if (toBeAdded.length > 0)
                        session.setAnnotations(allAnnotations);

                    if ($scope.showErrorOnCanvas) {
                        $scope.showErrorOnCanvas(allAnnotations[0])
                    }
                });
            };

            /* Returns the first error from the editor */
            this.getError = function () {
                var annotations = [];
                if ($scope.editorSession) {
                    annotations = $scope.editorSession.getAnnotations();
                }

                return annotations[0];
            };
        }
    };
});

