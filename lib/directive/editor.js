var app = require('../app'),
    palette = require('../language/modules/palette.json'),
    docs = require('../../content/docs.json');

var dont = false,
    langTools = window.ace.require('ace/ext/language_tools'),
    defaults = {
        theme        : 'ace/theme/dawn',
        wrapMode     : false,
        highlighLine : false,
        showRuler    : true,
        readOnly     : false,
        mode         : 'ace/mode/coffee',
        softTabs     : true,
        autoSelect   : true
    },
    autoCompleteList = null,
    autoCompleteActive = localStorage.autocomplete === 'false' ? false : true,
    initialised = false;

function init() {
    langTools.setCompleters([ { getCompletions: getAutoComplete } ]);
}

app.directive('editor', function () {
    return {
        require     : '^workspace',
        restrict    : 'E',
        templateUrl : '/directive/editor.html',
        scope       : { ngModel: '=', editable: '=', autoSelect: '=', ngChange: '&', startAtLine: '=' },
        link        : function (scope, element, attrs, workspaceCtl) {
            var options = defaults,
                editorElement = element[0].querySelector('.editor-area');

            scope.autocomplete = autoCompleteActive;

            if (!initialised) {
                init();
                initialised = true;
            }

            scope.ngModel = scope.ngModel || editorElement.innerHTML;

            var engine = window.ace.edit(editorElement),
                session = engine.getSession();

            workspaceCtl.scope.editorSession = session;

            engine.setTheme(options.theme);
            session.setUseWrapMode(options.wrapMode);
            engine.setHighlightActiveLine(options.highlighLine);
            engine.setShowPrintMargin(options.showRuler);
            engine.setReadOnly(options.readOnly);

            engine.setOptions({
                enableLiveAutocompletion : true
            });

            session.setMode(options.mode);
            session.setUseSoftTabs(options.softTabs);

            scope.focus = function (selectAll) {
                engine.focus();

                if (!selectAll) {
                    engine.getSession().selection.clearSelection();
                    engine.moveCursorTo(scope.startAtLine - 1 || 0, 0);
                } else {
                    engine.getSession().selection.selectAll();
                }
            };

            engine.on('change', function () {
                var val = session.getValue();

                if (val !== scope.ngModel && !scope.$root.$$phase) {
                    scope.ngModel = val;
                    scope.$apply();
                }
            });

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

            scope.$watch('editable', function () {
                engine.setReadOnly(!scope.editable);

                if (scope.editable) {
                    scope.focus(scope.autoSelect);
                } else {
                    engine.blur();
                }
            });

            scope.$watch('fullScreen', function (val) {
                angular.element(document.body).toggleClass('full-screen-editor', !!val);
                engine.resize(true);
            });

            scope.$watch('autocomplete', function (val) {
                autoCompleteActive = localStorage.autocomplete = val;
            });

            window.addEventListener('keydown', function (e) {
                if (e.keyCode === 27 && scope.fullScreen) {
                    scope.fullScreen = false;
                }
            });

            scope.$on('$destroy', function () {
                angular.element(document.body).removeClass('full-screen-editor');
            });
        }
    };
});

function getAutoComplete(editor, session, pos, prefix, callback) {
    if (!autoCompleteList) { autoCompleteList = getAutoCompleteList(); }

    if (!autoCompleteActive) {
        return callback(null, []);
    }

    callback(null, autoCompleteList);
}

function getAutoCompleteList() {
    var out = [];

    Object.keys(palette).forEach(function (color) {
        out.push({
            value      : color,
            meta       : 'Color',
            className  : 'color'
        });
    });

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