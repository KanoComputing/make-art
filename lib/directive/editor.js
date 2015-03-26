var app = require('../app'),
    palette = require('../language/modules/palette.json'),
    docs = require('../../content/docs.json');

var EDITOR_DEFAULTS = {
        theme        : 'ace/theme/dawn',
        wrapMode     : false,
        highlighLine : false,
        showRuler    : true,
        readOnly     : false,
        mode         : 'ace/mode/coffee',
        softTabs     : true,
        autoSelect   : true
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

app.directive('editor', function () {
    return {
        require     : '^workspace',
        restrict    : 'E',
        templateUrl : '/directive/editor.html',
        scope       : { ngModel: '=', editable: '=', autoSelect: '=', ngChange: '&', startAtLine: '=' },
        link        : function (scope, element, attrs, workspaceCtl) {
            var options = EDITOR_DEFAULTS,
                editorElement = element[0].querySelector('.editor-area'),
                engine = window.ace.edit(editorElement),
                session = engine.getSession();

            /*
             * Initialise directive
             * @return void
             */
            function init() {
                if (!initialised) {
                    initialiseEditor();
                    initialised = true;
                }

                // Load autocomplete state from localStorage value
                scope.autocomplete = autoCompleteActive;
                // If model contains not value, set from editor HTML content
                scope.ngModel = scope.ngModel || editorElement.innerHTML;
                // Make editor session available
                workspaceCtl.scope.editorSession = session;

                configEditor();
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

            // Watch editor for changes
            engine.on('change', function () {
                var val = session.getValue();

                if (val !== scope.ngModel && !scope.$root.$$phase) {
                    scope.ngModel = val;
                    scope.$apply();
                }
            });

            // Watch for code changes in editor
            scope.$watch('ngModel', function () {
                if (scope.ngChange) {
                    scope.ngChange();
                }

                if (session.getValue() !== scope.ngModel) {
                    dont = true;
                    engine.setValue(scope.ngModel);
                    scope.focus();
                }
            });

            // Watch for editable state changes and enable / disable editor
            scope.$watch('editable', function () {
                engine.setReadOnly(!scope.editable);

                if (scope.editable) {
                    scope.focus(scope.autoSelect);
                } else {
                    engine.blur();
                }
            });

            // Watch for full-screen changes and toggle full screen body class
            scope.$watch('fullScreen', function (val) {
                angular.element(document.body).toggleClass('full-screen-editor', !!val);
                engine.resize(true);
            });

            // Watch for autocomplete on-state changes and save state in localStore
            scope.$watch('autocomplete', function (val) {
                autoCompleteActive = localStorage.autocomplete = val;
            });

            // Listen to key press
            window.addEventListener('keydown', function (e) {
                if (e.keyCode === 27 && scope.fullScreen) { // ESC
                    scope.fullScreen = false;
                }
            });

            // Disable full screen when directive is destroyed
            scope.$on('$destroy', function () {
                angular.element(document.body).removeClass('full-screen-editor');
            });

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