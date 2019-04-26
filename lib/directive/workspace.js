import app from '../app';

/*
 * Workspace directive
 *
 * This directive is there to facilitate the communication between the
 * editor and display directives through an API without using the $rootScope.
 */

app.directive('workspace', function () {
    return {
        restrict   : 'A',
        controller : function ($scope) {
            this.scope = $scope;

            if (localStorage._shareCache) {
                $scope._shareCache = JSON.parse(localStorage._shareCache);
                localStorage.removeItem('_shareCache');
            }

            // Watch for errors and store relative annotations
            $scope.$watch('error', function (err) {
                if (!err) {
                    return;
                }

                if ($scope.editorSession) {
                    var annotations = $scope.editorSession.getAnnotations();
                    annotations.push(err);
                    $scope.editorSession.setAnnotations(annotations);
                }
            });

            /*
             * Set a callback to call when errors occur
             *
             * @param {Function} callback
             * @return void
             */
            this.setErrorCallback = function (callback) {
                $scope.showErrorOnCanvas = callback;
            };

            /*
             * Handle editor session changes
             *
             * @param {Object} session
             * @return void
             */
            $scope.$watch('editorSession', function (session) {
                if (!session) { return; }

                /*
                 * Watch annotation changes and re-add our custom ones
                 *
                 * in case the ace background worker clears them.
                 */
                session.on('changeAnnotation', function () {
                    var current,
                        needsAdding;

                    if ($scope.error) {
                        current = session.getAnnotations();

                        needsAdding = current.every(function (curr_annot) {
                            return $scope.error.text != curr_annot.text;
                        });

                        if (needsAdding) {
                            current.push($scope.error);
                            session.setAnnotations(current);
                        }
                    }

                    current = session.getAnnotations();

                    if (current.length > 0) {
                        current[0].type = 'syntax';
                        $scope.showErrorOnCanvas(current[0]);
                    }
                });
            });

            /*
             * Returns the first error from the editor
             *
             * @return void
             */
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