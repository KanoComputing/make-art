var app = require('../app'),
    palette = require('../language/modules/palette.json'),
    docs = require('../../content/docs.json');

var EDITOR_DEFAULTS = {
        mode         : 'ace/mode/coffee',
        theme        : 'ace/theme/dawn',
        wrapMode     : false,
        highlighLine : false,
        readOnly     : false,
        showRuler    : true,
        softTabs     : true,
        autoSelect   : true,
    },
    dont = false,
    langTools = window.ace.require('ace/ext/language_tools'),
    autoCompleteList = null,
    autoCompleteActive = localStorage.autocomplete === 'false' ? false : true,
    initialised = false;

/*
 * Init editor configuration
 * @return void
 */
function initialiseEditor() {
    langTools.setCompleters([ { getCompletions: getAutoComplete } ]);
}

/*
 * Editor directive
 * Initialises, configures and binds ACE editor and binds its value to a model 
 */
app.directive('editor', function () {
    return {
        require     : '^workspace',
        restrict    : 'E',
        templateUrl : '/directive/editor.html',
        scope       : { ngModel: '=', editable: '=', autoSelect: '=', ngChange: '&', startAtLine: '=' },
        link        : function (scope, element, attrs, workspaceCtl) {
            var options = EDITOR_DEFAULTS,
                editorElement = element[0].querySelector('[editor]'),
                scrollable = angular.element(element[0].querySelector('[scrollable-pane]')),
                engine, session;
            /*
             * Initialise directive
             * @return void
             */
            function init() {
                // Expose docs to vm
                scope.docs = docs;
                // Load autocomplete state from localStorage value
                scope.autocomplete = autoCompleteActive;
                // If model contains not value, set from editor HTML content
                scope.ngModel = scope.ngModel || editorElement.innerHTML;
                // Select first docs category
                scope.selectDocsCategory(scope.docs[0]);
                // Initialise docs tab scrollable pane
                initScrollablePane();
                // Initialise ACE editor
                initEditor();
                // Make editor session available
                workspaceCtl.scope.editorSession = session;
                // Bind callbacks on property changes and dom events
                bind();
            }

            function initEditor() {
                // Call one-off editor global configuration
                if (!initialised) {
                    initialiseEditor();
                    initialised = true;
                }

                // Instanciate editor on element
                engine = window.ace.edit(editorElement);
                // Get editor session
                session = engine.getSession();
                // Configure ACE editor
                configEditor();
                // Watch editor for changes
                engine.on('change', onEditorChange);
            }

            /*
             * Configure ACE editor with directive options
             * @return void
             */
            function configEditor() {
                engine.setTheme(options.theme);
                session.setUseWrapMode(options.wrapMode);
                engine.setHighlightActiveLine(options.highlighLine);
                engine.setShowPrintMargin(options.showRuler);
                engine.setReadOnly(options.readOnly);
                session.setMode(options.mode);
                session.setUseSoftTabs(options.softTabs);
                engine.setOptions({
                    enableLiveAutocompletion : true
                });
            }

            /*
             * Callback for editor changes
             * @return void
             */
            function onEditorChange() {
                var val = session.getValue();

                if (val !== scope.ngModel && !scope.$root.$$phase) {
                    scope.ngModel = val;
                    scope.$apply();
                }
            }

            /*
             * Initialise docs scrollable pane
             * @return void
             */
            function initScrollablePane() {
                scope.docsScrolled = false;

                scrollable.on('scroll', function () {
                    scope.docsScrolled = scrollable[0].scrollTop > 0;
                    scope.$apply();
                });
            }

            /*
             * Form a string with command and default params from docs command entry
             * @param {Object} command
             * @return void
             */
            function formCommandFromDocs(command) {
                return command.call + ' ' + command.defaults.map(function (val) {
                    return typeof val === 'string' ? '\'' + val + '\'' : val;
                }).join(', ');
            }

            /*
             * Detect line indentation from given line content
             * @param {String} line
             * @return void
             */
            function getLineIndentation(line) {
                var indent = line.match(/^(\s*).*$/ || [])[1] || '';
                return indent.length;
            }

            /*
             * Add command from docs
             * @param {Object} command
             * @return void
             */
            scope.addCommand = function (command) {
                var range = engine.getSelectionRange(),
                    line = range.end.row,
                    lines = scope.ngModel.split('\n'),
                    indentation = getLineIndentation(lines[line]) / 4,
                    val = Array(indentation + 1).join('\t') + formCommandFromDocs(command);

                // If line is empty, remove it before adding new one
                if (!lines[line].replace(/\s/g, '').length) {
                    lines.splice(line, 1);
                }

                // Insert new line
                lines.splice(line + 1, 0, val).join('\n');

                // Update editor content
                scope.ngModel = lines.join('\n');

                // Switch back to code tab
                scope.showDocs = false;

                setTimeout(function () {
                    // Go at the end of added line
                    engine.selection.moveTo(line + 1, 0);
                    engine.execCommand('gotolineend');
                });
            };

            /*
             * Select a category in the editor docs
             * @param {Object} catgory
             * @return void
             */
            scope.selectDocsCategory = function (category) {
                scope.docsCategory = category.label;
            };

            /*
             * Focus on editor and select all content if specified
             * @param {Boolean} selectAll
             * @return void
             */
            scope.focus = function (selectAll) {
                engine.focus();

                if (!selectAll) {
                    engine.getSession().selection.clearSelection();
                    engine.moveCursorTo(scope.startAtLine - 1 || 0, 0);
                } else {
                    engine.getSession().selection.selectAll();
                }
            };

            /*
             * Value change callback - Binds editor value to directive model
             * @return void
             */
            function onChange() {
                if (scope.ngChange) {
                    scope.ngChange();
                }

                if (session.getValue() !== scope.ngModel) {
                    dont = true;
                    engine.setValue(scope.ngModel);
                    scope.focus();
                }
            }

            /*
             * Update editor editable state
             * @param {Boolean} state
             * @return void
             */
            function updateEditableState(state) {
                engine.setReadOnly(!state);

                if (state) {
                    scope.focus(scope.autoSelect);
                } else {
                    engine.blur();
                }
            }

            /*
             * Update editor autocomplete state
             * @param {Boolean} state
             * @return void
             */
            function updateAutocompleteState(state) {
                autoCompleteActive = localStorage.autocomplete = state;
            }

            /*
             * Update full-scree state
             * @param {Boolean} state
             * @return void
             */
            function updateFullscreenState(state) {
                angular.element(document.body).toggleClass('full-screen-editor', !!state);
                engine.resize(true);
            }

            /*
             * Keypress handler
             * @param {Object} e
             * @return void
             */
            function onKeyPress(e) {
                if (e.keyCode === 27 && scope.fullScreen) { // ESC
                    scope.fullScreen = false;
                }
            }

            /*
             * Callback for directive destroy event
             * @param {Boolean} state
             * @return void
             */
            function destroy() {
                angular.element(document.body).removeClass('full-screen-editor');
            }

            /*
             * Bind value change and dom events callbacks
             * @param {Boolean} state
             * @return void
             */
            function bind() {
                // Watch for code changes in editor
                scope.$watch('ngModel', onChange);
                // Watch for editable state changes and enable / disable editor
                scope.$watch('editable', updateEditableState);
                // Watch for full-screen changes and toggle full screen body class
                scope.$watch('fullScreen', updateFullscreenState);
                // Watch for autocomplete on-state changes and save state in localStore
                scope.$watch('autocomplete', updateAutocompleteState);
                // Listen to key press
                window.addEventListener('keydown', onKeyPress);
                // Disable full screen when directive is destroyed
                scope.$on('$destroy', destroy);
            }

            init();
        }
    };
});

/*
 * Asynchronously load autocomplete list for given editor, session and prefix that's being typed
 * @param {Object} editor
 * @param {Object} session
 * @param {Object} pos
 * @param {String} prefix
 * @param {Function} callback
 * @return void
 */
function getAutoComplete(editor, session, pos, prefix, callback) {
    if (!autoCompleteList) { autoCompleteList = getAutoCompleteList(); }

    if (!autoCompleteActive) {
        return callback(null, []);
    }

    callback(null, autoCompleteList);
}

/*
 * Load complete list of autocomplete options
 * @return [{Object}]
 */
function getAutoCompleteList() {
    var out = [];

    // Add colors from palette
    Object.keys(palette).forEach(function (color) {
        out.push({
            value      : color,
            meta       : 'Color',
            className  : 'color'
        });
    });

    // Add commands from documentation
    docs.forEach(function (category) {
        category.commands.forEach(function (command) {
            var args = [],
                cmd;

            command.args.forEach(function (arg) {
                var val = arg[0];

                if (!arg[3]) {
                    val = '[ ' + val + ' ]';
                }

                args.push(val);
            });

            cmd = command.call + ' ' + args.join(', ');

            out.push({
                caption   : cmd,
                value     : cmd.replace(/((,\ )*\[.*\])/, ''),
                meta      : category.label,
                className : 'command'
            });
        });
    });

    return out;
}