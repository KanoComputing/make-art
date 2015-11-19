"use strict";

var app = require('../app'),
    palette = require('../language/modules/palette.json'),
    config,
    docs = require('../../content/docs.json'),
    equal = require('deep-equal'),
    domUtil = require('../util/dom'),
    stringUtil = require('../util/string'),
    tokenHandlers = {
        number : require('../editor/token-handler/NumberHandler'),
        color  : require('../editor/token-handler/ColorHandler')
    },

/*
 * Editor directive
 *
 * Initialises, configures and binds ACE editor and binds its value to a model
 */

    EDITOR_DEFAULTS = {
        mode         : 'ace/mode/coffee',
        theme        : 'ace/theme/dawn',
        wrapMode     : false,
        highlighLine : false,
        readOnly     : false,
        showRuler    : true,
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
 *
 * @return void
 */
function initialiseEditor() {
    langTools.setCompleters([{ getCompletions: getAutoComplete }]);
}

app.directive('editor', function ($rootScope, $controller, $compile, $routeParams, contentService) {
    config = $rootScope.cfg;
    /*
     * Disable number handler on Pi version
     */
    if (config.OFFLINE) {
        delete tokenHandlers.number;
    }

    return {
        require     : '?workspace',
        restrict    : 'E',
        templateUrl : '/directive/editor.html',
        scope       : {
            ngModel     : '=',
            editable    : '=',
            autoSelect  : '=',
            ngChange    : '&',
            startAtLine : '=',
            tabbed      : '=',
            controls    : '=',
            title       : '='
        },
        link        : function (scope, element, attrs, workspaceCtl) {
            var options = EDITOR_DEFAULTS,
                editorElement = element[0].querySelector('[editor]'),
                scrollable = angular.element(element[0].querySelector('[scrollable-pane]')),
                engine, session, activeToken, tokenHandler, lastFocused,
                keepToken, preventMove, tokenHandlerTimeout, clickTimer,
                clicked;

            /*
             * Initialise directive
             *
             * @return void
             */
            function init() {
                // Select code tab
                scope.switchTab('code');
                // Expose docs to vm
                scope.docs = docs;
                // Set autocomplete state to false on init
                scope.autocomplete = false;
                // If model contains not value, set from editor HTML content
                scope.ngModel = scope.ngModel || editorElement.innerHTML;
                // Select first docs category
                scope.selectDocsCategory(scope.docs[0]);
                // Set guide to an empty string
                scope.guide = '';
                // Set challengeId & worldId from the route params
                scope.challengeId = $routeParams.id;
                scope.worldId = $routeParams.world;
                // Get the guide from a challenge
                contentService.challenge.get(scope.worldId, scope.challengeId).then(function (challenge) {
                    if (challenge.guide) {
                        scope.guide = challenge.guide;
                    }
                });
                // Initialise docs tab scrollable pane
                initScrollablePane();
                // Initialise ACE editor
                initEditor();

                // Make editor session available
                if (workspaceCtl && !workspaceCtl.scope.editorSession) {
                    workspaceCtl.scope.editorSession = session;
                }
                // Bind callbacks on property changes and dom events
                bind();

                // Attach editor to workspace controller
                if (workspaceCtl) {
                    workspaceCtl.scope.editor = scope;
                }

                // Next tick..
                setTimeout(function () {
                    if (workspaceCtl && workspaceCtl.scope._shareCache) {
                        scope.ngModel = workspaceCtl.scope._shareCache.code;
                    }
                });
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
             *
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
             *
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
             *
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
             *
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
             *
             * @param {String} line
             * @return void
             */
            function getLineIndentation(line) {
                var indent = line.match(/^(\s*).*$/ || [])[1] || '';
                return indent.length;
            }

            /*
             * Add command from docs
             *
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
                scope.switchTab('code');

                setTimeout(function () {
                    // Go at the end of added line
                    engine.selection.moveTo(line + 1, 0);
                    engine.execCommand('gotolineend');
                });
            };

            /*
             * Toggle fullscreen state
             *
             * @return void
             */
            scope.toggleFullScreen = function () {
                scope.fullScreen = !scope.fullScreen;
            };

            /*
             * Toggle autocomplete state
             *
             * @return void
             */
            scope.toggleAutocomplete = function () {
                scope.autocomplete = !scope.autocomplete;
            };

            /*
             * Switch tab
             *
             * @param {String} tabId
             * @return void
             */
            scope.switchTab = function (tabId) {
                scope.tab = tabId;
            };

            /*
             * Select a category in the editor docs
             *
             * @param {Object} catgory
             * @return void
             */
            scope.selectDocsCategory = function (category) {
                scope.docsCategory = category.label;
            };

            /*
             * Focus on editor and select all content if specified
             *
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
             *
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

                onCursorMove();
            }

            /*
             * Update editor editable state
             *
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
             *
             * @param {Boolean} state
             * @return void
             */
            function updateAutocompleteState(state) {
                autoCompleteActive = localStorage.autocomplete = state;
            }

            /*
             * Update full-scree state
             *
             * @param {Boolean} state
             * @return void
             */
            function updateFullscreenState(state) {
                angular.element(document.body).toggleClass('full-screen-editor', !!state);
                onResize();
            }

            /*
             * Keypress handler
             *
             * @param {Object} e
             * @return void
             */
            function onKeyPress(e) {
                if (e.keyCode === 27) { // ESC

                    if (scope.fullScreen) {
                        scope.fullScreen = false;
                    }

                    closeTokenHandler();
                }
            }

            /*
             * Callback for directive destroy event
             *
             * @param {Boolean} state
             * @return void
             */
            function destroy() {
                angular.element(document.body).removeClass('full-screen-editor');
            }

            function onCursorMove() {
                var range = engine.getSelectionRange(),
                    token;

                if (preventMove || !scope.editable) { return; }


                // Return if selection is active
                if (!equal(range.start, range.end)) { return; }

                // Get token at current position
                token = session.getTokenAt(range.start.row, range.start.column);

                if (token) {
                    // Add line property to token for token handler to know
                    token.line = range.start.row;
                }

                // No reason to do proceed if token is already active
                if (activeToken === token) { return; }

                // Set new token to pre-existing token handler
                if (keepToken && tokenHandler) {
                    activeToken = token;
                    tokenHandler.token = token;
                    keepToken = false;
                    return;
                }

                // Close current token if it's a different one
                if (activeToken && activeToken !== token) {
                    closeTokenHandler();
                }

                if (tokenHandlerTimeout) {
                    clearTimeout(tokenHandlerTimeout);
                    tokenHandlerTimeout = null;
                }

                tokenHandlerTimeout = setTimeout(function () {
                    // Open handler for new token
                    if (token && clicked) {
                        openTokenHandler(token);
                    }
                }, 500);
            }

            /*
             * Close currently open token handler
             *
             * @return void
             */
            function closeTokenHandler() {
                activeToken = null;

                if (tokenHandler) {
                    tokenHandler.close();
                    tokenHandler = null;
                }
            }

            /*
             * Look for available token handler constructors for given token
             *
             * @param {Object} token
             * @return {Function|void}
             */
            function getTokenHandlerType(token) {
                if (token.type === 'constant.numeric') {
                    return tokenHandlers.number;
                } else if (isColorToken(token)) {
                    return tokenHandlers.color;
                }
            }

            /*
             * Open a token handler if there's one available for token
             *
             * @param {Object} token
             * @return void
             */
            function openTokenHandler(token) {
                var Constructor = getTokenHandlerType(token);

                if (!Constructor) { return; }

                activeToken = token;
                tokenHandler = new Constructor(engine, token, $rootScope, $controller, $compile);
                tokenHandler.open();

                tokenHandler.scope.$watch('value', function (val) {
                    if (!val || !activeToken || val + '' === activeToken.value) { return; }

                    val += '';

                    keepToken = true;

                    var token = tokenHandler.token,
                        value = replaceToken(token, val),
                        pos = { row: token.line, column: token.start + 1 };

                    preventMove = true;

                    engine.setValue(value, 0);
                    engine.moveCursorTo(pos.row, pos.column);
                    session.selection.clearSelection();

                    preventMove = false;

                    // Next tick..
                    setTimeout(function () {
                        onEditorChange();
                    });
                });
            }

            /*
             * Return editor value after replacing token with new value
             *
             * @param {Object} token
             * @param {*} value
             * @return {String}
             */
            function replaceToken(token, value) {
                var lines = engine.getValue().split('\n'),
                    line = token.line,
                    start = token.start,
                    length = token.value.length;

                lines[line] = stringUtil.splice(lines[line], start, length, value);

                return lines.join('\n');
            }

            /*
             * Check if token value represents a color
             *
             * @param {Object} token
             * @return {Boolean}
             */
            function isColorToken(token) {
                var value = token.value,
                    isHexa, isRgbOrHsl;

                if (value.substr(0, 1) === '\'') {
                    value = value.substr(1);
                }

                if (value.substr(-1) === '\'') {
                    value = value.substr(0, value.length - 1);
                }

                isHexa = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value);
                isRgbOrHsl = /^(rgba?|hsl)\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/.test(value);

                return palette[value] || isHexa || isRgbOrHsl;
            }

            /*
             * Handle editor blur event
             *
             * @return void
             */
            function onBlur() {
                if (tokenHandler) {
                    if (!domUtil.isIncludedBy(lastFocused, tokenHandler.el)) {
                        closeTokenHandler();
                    }
                }
            }

            /*
             * Handle resize events
             *
             * @return void
             */
            function onResize() {
                engine.resize(true);
                if (tokenHandler) tokenHandler.resize();
            }

            /*
             * Handle all window mousedown events
             *
             * @param {MouseEvent}
             * @return void
             */
            function onMouseDownAnywhere(e) {
                lastFocused = e.target;
            }

            /*
             * Handle editor mousedown events
             *
             * @param {MouseEvent}
             * @return void
             */
            function onMouseDown() {
                clicked = true;

                if (clickTimer) {
                    clearTimeout(clickTimer);
                }

                clickTimer = setTimeout(function () {
                    clickTimer = null;
                    clicked = false;
                }, 700);
            }

            /*
             * Bind value change and dom events callbacks
             *
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
                // Watch for editor blur event
                engine.on('blur', onBlur);
                // Bind callback to cursor position changes
                engine.on('changeSelection', onCursorMove);
                // Bind window resize event
                window.addEventListener('resize', onResize);
                // Bind window mousedown events
                window.addEventListener('mousedown', onMouseDownAnywhere);
                // Bind editor mousedown events
                element.on('mousedown', onMouseDown);
            }

            init();
        }
    };
});

/*
 * Asynchronously load autocomplete list for given editor, session and prefix that's being typed
 *
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
 *
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
