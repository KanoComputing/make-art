var app = require('../app');

var dont = false,
    defaults = {
        theme        : 'ace/theme/dawn',
        wrapMode     : false,
        highlighLine : false,
        showRuler    : true,
        readOnly     : false,
        mode         : 'ace/mode/coffee',
        softTabs     : true,
        autoSelect   : true
    };

app.directive('editor', function () {
    return {
        restrict    : 'E',
        templateUrl : '/directive/editor.html',
        scope       : { ngModel: '=', editable: '=', autoSelect: '=', ngChange: '&', startAtLine: '=' },
        link        : function (scope, element, attrs) {
            var options = defaults;

            scope.ngModel = scope.ngModel || element[0].innerHTML;

            var engine = window.ace.edit(element[0]),
                session = engine.getSession();

            engine.setTheme(options.theme);
            session.setUseWrapMode(options.wrapMode);
            engine.setHighlightActiveLine(options.highlighLine);
            engine.setShowPrintMargin(options.showRuler);
            engine.setReadOnly(options.readOnly);

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
        }
    };
});