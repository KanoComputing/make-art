var app = require('../app');

/*
 * This directive is there to facilitate the communication between the
 * editor and display directives through an API without using the $rootScope.
 */
app.directive('workspace', function ($window) {
    return {
        restrict: 'A',
        controller: function ($scope, $element, $attrs) {
            $scope.editor_session = null;
            $scope.custom_annotations = [];

            this.setCustomAnnotations = function (annotations) {
                $scope.custom_annotations = annotations;
                if ($scope.editor_session) {
                    $scope.editor_session.setAnnotations(annotations);
                }
            };

            this.clearCustomAnnotations = function () {
                this.setCustomAnnotations([]);
            };

            this.setEditorSession = function (session) {
                $scope.editor_session = session;

                /* Watch annotation changes and re-add our custom ones
                 * in case the ace background worker clears them.
                 */
                session.on('changeAnnotation', function () {
                    var current = session.getAnnotations();
                    var toBeAdded = [];
                    $scope.custom_annotations.forEach(function (cust_annot) {
                        var needsAdding;
                        needsAdding = current.every(function (curr_annot) {
                            return cust_annot.text != curr_annot.text;
                        });

                        if (needsAdding)
                            toBeAdded.push(cust_annot);
                    });
                    if (toBeAdded.length > 0)
                        session.setAnnotations(current.concat(toBeAdded));
                });
            };
        }
    };
});

