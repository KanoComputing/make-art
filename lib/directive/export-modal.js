var app = require('../app');

/*
 * Share modal directive
 *
 * Share modal directive under display
 */

app.directive('exportModal', function () {
    return {
        restrict    : 'E',
        templateUrl : '/directive/export-modal.html',
        scope       : {
            display : '=',
            action  : '='
        },
        link        : function (scope) {
            // Setup scope
            scope.open = false;
            scope.meta = {};

            // Initialise
            bind();

            /*
             * Submit form
             *
             * @return void
             */
            scope.submit = function () {
                if (!scope.meta.title) {
                    return showError('Please choose a title');
                } else if (scope.meta.title.length > 100) {
                    return showError('Title is too long');
                }

                resetError();
                performAction();
            };

            /*
             * Perform modal export action
             *
             * @return void
             */
            function performAction() {
                if (scope.action === 'share') {
                    share();
                } else if (scope.action === 'save') {
                    save();
                }
            }

            /*
             * Show an error message
             *
             * @return void
             */
            function showError(err) {
                scope.error = err;
            }

            /*
             * Remove displayed error message
             *
             * @return void
             */
            function resetError() {
                scope.error = null;
            }

            /*
             * Open modal, load parent display's source and canvas
             *
             * @return void
             */
            function open() {
                scope.meta.title = '';
                scope.meta.description = '';
                scope.open = true;
                scope.source = scope.display.source;
                scope.canvas = scope.display.canvas;
                scope.imageURL = getImageURL();
            }

            /*
             * Close modal
             *
             * @return void
             */
            scope.close = function() {
                scope.open = false;
            };

            /*
             * Get image data URL
             *
             * @return {String}
             */
            function getImageURL() {
                return scope.canvas.toDataURL('image/png');
            }

            /*
             * Listen to parent display's state changes and DOM events
             *
             * @return void
             */
            function bind() {

                // Open or close on parent display modal state change 
                scope.display.$watch('openModal', function (modalId) {
                    if (modalId === scope.action && !scope.open) {
                        open();
                    } else {
                        scope.close();
                    }
                });

                // Reset error on title change
                scope.$watch('title', function () {
                    resetError();
                });

                // Listen for keydown events, close when ESC is pressed
                window.addEventListener('keydown', function (e) {
                    if (e.keyCode === 27) { // ESC
                        scope.display.setOpenModal(null);
                        scope.close();
                        scope.$apply();
                    }
                });

            }

            /*
             * Share creation on Kano World
             *
             * @return void
             */
            function share() {
                console.log('SHARE');
                // ...
            }

            /*
             * Save creation locally
             *
             * @return void
             */
            function save() {
                console.log('SAVE');
                // ...
            }
        }
    };
});