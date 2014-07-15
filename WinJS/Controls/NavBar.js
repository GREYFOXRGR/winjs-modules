
define('require-style!less/desktop/controls',[],function(){});

define('require-style!less/phone/controls',[],function(){});
// Copyright (c) Microsoft Open Technologies, Inc.  All Rights Reserved. Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
define('WinJS/Controls/NavBar/_Command',[
    'exports',
    '../../Core/_Global',
    '../../Core/_Base',
    '../../Core/_ErrorFromName',
    '../../Core/_Resources',
    '../../ControlProcessor',
    '../../Navigation',
    '../../Utilities/_Control',
    '../../Utilities/_ElementUtilities',
    '../AppBar/_Icon'
    ], function NavBarCommandInit(exports, _Global, _Base, _ErrorFromName, _Resources, ControlProcessor, Navigation, _Control, _ElementUtilities, _Icon) {
    "use strict";

    _Base.Namespace._moduleDefine(exports, "WinJS.UI", {
        _WinPressed: _Base.Namespace._lazy(function () {
            var WinPressed = _Base.Class.define(function _WinPressed_ctor(element) {
                // WinPressed is the combination of :hover:active
                // :hover is delayed by trident for touch by 300ms so if you want :hover:active to work quickly you need to
                // use this behavior.
                // :active does not bubble to its parent like :hover does so this is also useful for that scenario.
                this._element = element;
                _ElementUtilities._addEventListener(this._element, "pointerdown", this._MSPointerDownButtonHandler.bind(this));
            }, {
                _MSPointerDownButtonHandler: function _WinPressed_MSPointerDownButtonHandler(ev) {
                    if (!this._pointerUpBound) {
                        this._pointerUpBound = this._MSPointerUpHandler.bind(this);
                        this._pointerCancelBound = this._MSPointerCancelHandler.bind(this);
                        this._pointerOverBound = this._MSPointerOverHandler.bind(this);
                        this._pointerOutBound = this._MSPointerOutHandler.bind(this);
                    }

                    if (ev.isPrimary) {
                        if (this._pointerId) {
                            this._resetPointer();
                        }

                        if (!_ElementUtilities._matchesSelector(ev.target, ".win-interactive, .win-interactive *")) {
                            this._pointerId = ev.pointerId;

                            _ElementUtilities._addEventListener(_Global, "pointerup", this._pointerUpBound, true);
                            _ElementUtilities._addEventListener(_Global, "pointercancel", this._pointerCancelBound), true;
                            _ElementUtilities._addEventListener(this._element, "pointerover", this._pointerOverBound, true);
                            _ElementUtilities._addEventListener(this._element, "pointerout", this._pointerOutBound, true);

                            _ElementUtilities.addClass(this._element, WinPressed.winPressed);
                        }
                    }
                },

                _MSPointerOverHandler: function _WinPressed_MSPointerOverHandler(ev) {
                    if (this._pointerId === ev.pointerId) {
                        _ElementUtilities.addClass(this._element, WinPressed.winPressed);
                    }
                },

                _MSPointerOutHandler: function _WinPressed_MSPointerOutHandler(ev) {
                    if (this._pointerId === ev.pointerId) {
                        _ElementUtilities.removeClass(this._element, WinPressed.winPressed);
                    }
                },

                _MSPointerCancelHandler: function _WinPressed_MSPointerCancelHandler(ev) {
                    if (this._pointerId === ev.pointerId) {
                        this._resetPointer();
                    }
                },

                _MSPointerUpHandler: function _WinPressed_MSPointerUpHandler(ev) {
                    if (this._pointerId === ev.pointerId) {
                        this._resetPointer();
                    }
                },

                _resetPointer: function _WinPressed_resetPointer() {
                    this._pointerId = null;

                    _Global.removeEventListener("pointerup", this._pointerUpBound, true);
                    _Global.removeEventListener("pointercancel", this._pointerCancelBound, true);
                    this._element.removeEventListener("pointerover", this._pointerOverBound, true);
                    this._element.removeEventListener("pointerout", this._pointerOutBound, true);

                    _ElementUtilities.removeClass(this._element, WinPressed.winPressed);
                },

                dispose: function _WinPressed_dispose() {
                    if (this._disposed) {
                        return;
                    }
                    this._disposed = true;

                    this._resetPointer();
                }
            }, {
                winPressed: "win-pressed"
            });

            return WinPressed;
        }),
        /// <field>
        /// <summary locid="WinJS.UI.NavBarCommand">
        /// Represents a navigation command in an NavBarContainer.
        /// </summary>
        /// <compatibleWith platform="Windows" minVersion="8.1"/>
        /// </field>
        /// <icon src="ui_winjs.ui.navbarcommand.12x12.png" width="12" height="12" />
        /// <icon src="ui_winjs.ui.navbarcommand.16x16.png" width="16" height="16" />
        /// <htmlSnippet><![CDATA[<div data-win-control="WinJS.UI.NavBarCommand" data-win-options="{location:'/pages/home/home.html',label:'Home',icon:WinJS.UI.AppBarIcon.home}"></div>]]></htmlSnippet>
        /// <part name="navbarcommand" class="win-navbarcommand" locid="WinJS.UI.NavBarCommand_part:navbarcommand">Styles the entire NavBarCommand control.</part>
        /// <part name="button" class="win-navbarcommand-button" locid="WinJS.UI.NavBarCommand_part:button">Styles the main button in a NavBarCommand.</part>
        /// <part name="splitbutton" class="win-navbarcommand-splitbutton" locid="WinJS.UI.NavBarCommand_part:splitbutton">Styles the split button in a NavBarCommand</part>
        /// <part name="icon" class="win-navbarcommand-icon" locid="WinJS.UI.NavBarCommand_part:icon">Styles the icon in the main button of a NavBarCommand.</part>
        /// <part name="label" class="win-navbarcommand-label" locid="WinJS.UI.NavBarCommand_part:label">Styles the label in the main button of a NavBarCommand.</part>
        /// <resource type="javascript" src="//$(TARGET_DESTINATION)/js/base.js" shared="true" />
        /// <resource type="javascript" src="//$(TARGET_DESTINATION)/js/ui.js" shared="true" />
        /// <resource type="css" src="//$(TARGET_DESTINATION)/css/ui-dark.css" shared="true" />
        NavBarCommand: _Base.Namespace._lazy(function () {
            var Key = _ElementUtilities.Key;

            var strings = {
                get duplicateConstruction() { return _Resources._getWinJSString("ui/duplicateConstruction").value; }
            };

            var NavBarCommand = _Base.Class.define(function NavBarCommand_ctor(element, options) {
                /// <signature helpKeyword="WinJS.UI.NavBarCommand.NavBarCommand">
                /// <summary locid="WinJS.UI.NavBarCommand.constructor">
                /// Creates a new NavBarCommand.
                /// </summary>
                /// <param name="element" type="HTMLElement" domElement="true" isOptional="true" locid="WinJS.UI.NavBarCommand.constructor_p:element">
                /// The DOM element that will host the new  NavBarCommand control.
                /// </param>
                /// <param name="options" type="Object" isOptional="true" locid="WinJS.UI.NavBarCommand.constructor_p:options">
                /// An object that contains one or more property/value pairs to apply to the new control. 
                /// Each property of the options object corresponds to one of the control's properties or events. 
                /// Event names must begin with "on". 
                /// </param>
                /// <returns type="WinJS.UI.NavBarCommand" locid="WinJS.UI.NavBarCommand.constructor_returnValue">
                /// The new NavBarCommand.
                /// </returns>
                /// <compatibleWith platform="Windows" minVersion="8.1"/>
                /// </signature>
                element = element || _Global.document.createElement("DIV");
                options = options || {};

                if (element.winControl) {
                    throw new _ErrorFromName("WinJS.UI.NavBarCommand.DuplicateConstruction", strings.duplicateConstruction);
                }

                // Attaching JS control to DOM element
                element.winControl = this;
                this._element = element;
                _ElementUtilities.addClass(this.element, NavBarCommand._ClassName.navbarcommand);
                _ElementUtilities.addClass(this.element, "win-disposable");

                this._tooltip = null;
                this._splitOpened = false;
                this._buildDom();
                element.addEventListener('keydown', this._keydownHandler.bind(this));
                
                _Control.setOptions(this, options);
            }, {
                /// <field type="HTMLElement" domElement="true" hidden="true" locid="WinJS.UI.NavBarCommand.element" helpKeyword="WinJS.UI.NavBarCommand.element">
                /// Gets the DOM element that hosts the NavBarCommand.
                /// <compatibleWith platform="Windows" minVersion="8.1"/>
                /// </field>
                element: {
                    get: function () {
                        return this._element;
                    }
                },

                /// <field type="String" locid="WinJS.UI.NavBarCommand.label" helpKeyword="WinJS.UI.NavBarCommand.label">
                /// Gets or sets the label of the NavBarCommand.
                /// <compatibleWith platform="Windows" minVersion="8.1"/>
                /// </field>
                label: {
                    get: function () {
                        return this._label;
                    },
                    set: function (value) {
                        this._label = value;
                        this._labelEl.textContent = value;
                    }
                },

                /// <field type="String" locid="WinJS.UI.NavBarCommand.tooltip" helpKeyword="WinJS.UI.NavBarCommand.tooltip">
                /// Gets or sets the tooltip of the NavBarCommand.
                /// <compatibleWith platform="Windows" minVersion="8.1"/>
                /// </field>
                tooltip: {
                    get: function () {
                        return this._tooltip;
                    },
                    set: function (value) {
                        this._tooltip = value;
                        if (this._tooltip || this._tooltip === "") {
                            this._element.setAttribute('title', this._tooltip);
                        } else {
                            this._element.removeAttribute('title');
                        }
                    }
                },

                /// <field type="String" locid="WinJS.UI.NavBarCommand.icon" helpKeyword="WinJS.UI.NavBarCommand.icon">
                /// Gets or sets the icon of the NavBarCommand. This value is either one of the values of the AppBarIcon enumeration or the path of a custom PNG file. 
                /// <compatibleWith platform="Windows" minVersion="8.1"/>
                /// </field>
                icon: {
                    get: function () {
                        return this._icon;
                    },
                    set: function (value) {
                        this._icon = (_Icon[value] || value);

                        // If the icon's a single character, presume a glyph
                        if (this._icon && this._icon.length === 1) {
                            // Set the glyph
                            this._imageSpan.textContent = this._icon;
                            this._imageSpan.style.backgroundImage = "";
                            this._imageSpan.style.msHighContrastAdjust = "";
                            this._imageSpan.style.display = "";
                        } else if (this._icon && this._icon.length > 1) {
                            // Must be an image, set that
                            this._imageSpan.textContent = "";
                            this._imageSpan.style.backgroundImage = this._icon;
                            this._imageSpan.style.msHighContrastAdjust = "none";
                            this._imageSpan.style.display = "";
                        } else {
                            this._imageSpan.textContent = "";
                            this._imageSpan.style.backgroundImage = "";
                            this._imageSpan.style.msHighContrastAdjust = "";
                            this._imageSpan.style.display = "none";
                        }
                    }
                },

                /// <field type="String" locid="WinJS.UI.NavBarCommand.location" helpKeyword="WinJS.UI.NavBarCommand.location">
                /// Gets or sets the command's target location. 
                /// <compatibleWith platform="Windows" minVersion="8.1"/>
                /// </field>
                location: {
                    get: function () {
                        return this._location;
                    },
                    set: function (value) {
                        this._location = value;
                    }
                },

                /// <field type="String" locid="WinJS.UI.NavBarCommand.state" helpKeyword="WinJS.UI.NavBarCommand.state">
                /// Gets or sets the state value used for navigation. The command passes this object to the WinJS.Navigation.navigate function. 
                /// <compatibleWith platform="Windows" minVersion="8.1"/>
                /// </field>
                state: {
                    get: function () {
                        return this._state;
                    },
                    set: function (value) {
                        this._state = value;
                    }
                },

                /// <field type="Boolean" locid="WinJS.UI.NavBarCommand.splitButton" helpKeyword="WinJS.UI.NavBarCommand.splitButton">
                /// Gets or sets a value that specifies whether the NavBarCommand has a split button.
                /// <compatibleWith platform="Windows" minVersion="8.1"/>
                /// </field>
                splitButton: {
                    get: function () {
                        return this._split;
                    },
                    set: function (value) {
                        this._split = value;
                        if (this._split) {
                            this._splitButtonEl.style.display = "";
                        } else {
                            this._splitButtonEl.style.display = "none";
                        }
                    }
                },

                /// <field type="Boolean" locid="WinJS.UI.NavBarCommand.splitOpened" hidden="true" helpKeyword="WinJS.UI.NavBarCommand.splitOpened">
                /// Gets or sets a value that specifies whether the split button is open.
                /// <compatibleWith platform="Windows" minVersion="8.1"/>
                /// </field>
                splitOpened: {
                    get: function () {
                        return this._splitOpened;
                    },
                    set: function (value) {
                        if (this._splitOpened !== !!value) {
                            this._toggleSplit();
                        }
                    }
                },

                _toggleSplit: function NavBarCommand_toggleSplit() {
                    this._splitOpened = !this._splitOpened;
                    if (this._splitOpened) {
                        _ElementUtilities.addClass(this._splitButtonEl, NavBarCommand._ClassName.navbarcommandsplitbuttonopened);
                        this._splitButtonEl.setAttribute("aria-expanded", "true");
                    } else {
                        _ElementUtilities.removeClass(this._splitButtonEl, NavBarCommand._ClassName.navbarcommandsplitbuttonopened);
                        this._splitButtonEl.setAttribute("aria-expanded", "false");
                    }
                    this._fireEvent(NavBarCommand._EventName._splitToggle);
                },

                _rtl: {
                    get: function () {
                        return _Global.getComputedStyle(this.element).direction === "rtl";
                    }
                },

                _keydownHandler: function NavBarCommand_keydownHandler(ev) {
                    if (_ElementUtilities._matchesSelector(ev.target, ".win-interactive, .win-interactive *")) {
                        return;
                    }

                    var leftStr = this._rtl ? Key.rightArrow : Key.leftArrow;
                    var rightStr = this._rtl ? Key.leftArrow : Key.rightArrow;

                    if (!ev.altKey && (ev.keyCode === leftStr || ev.keyCode === Key.home || ev.keyCode === Key.end) && ev.target === this._splitButtonEl) {
                        this._splitButtonActive = false;
                        _ElementUtilities._setActive(this._buttonEl);
                        if (ev.keyCode === leftStr) {
                            ev.stopPropagation();
                        }
                        ev.preventDefault();
                    } else if (!ev.altKey && ev.keyCode === rightStr && this.splitButton && (ev.target === this._buttonEl || this._buttonEl.contains(ev.target))) {
                        this._splitButtonActive = true;
                        _ElementUtilities._setActive(this._splitButtonEl);
                        if (ev.keyCode === rightStr) {
                            ev.stopPropagation();
                        }
                        ev.preventDefault();
                    } else if ((ev.keyCode === Key.space || ev.keyCode === Key.enter) && (ev.target === this._buttonEl || this._buttonEl.contains(ev.target))) {
                        if (this.location) {
                            Navigation.navigate(this.location, this.state);
                        }
                        this._fireEvent(NavBarCommand._EventName._invoked);
                    } else if ((ev.keyCode === Key.space || ev.keyCode === Key.enter) && ev.target === this._splitButtonEl) {
                        this._toggleSplit();
                    }
                },

                _getFocusInto: function NavBarCommand_getFocusInto(keyCode) {
                    var leftStr = this._rtl ? Key.rightArrow : Key.leftArrow;
                    if ((keyCode === leftStr) && this.splitButton) {
                        this._splitButtonActive = true;
                        return this._splitButtonEl;
                    } else {
                        this._splitButtonActive = false;
                        return this._buttonEl;
                    }
                },

                _buildDom: function NavBarCommand_buildDom() {
                    var markup =
                        '<div tabindex="0" role="button" class="' + NavBarCommand._ClassName.navbarcommandbutton + '">' +
                            '<div class="' + NavBarCommand._ClassName.navbarcommandbuttoncontent + '">' +
                                '<div class="' + NavBarCommand._ClassName.navbarcommandicon + '"></div>' +
                                '<div class="' + NavBarCommand._ClassName.navbarcommandlabel + '"></div>' +
                            '</div>' +
                        '</div>' +
                        '<div tabindex="0" aria-expanded="false" class="' + NavBarCommand._ClassName.navbarcommandsplitbutton + '"></div>';
                    this.element.insertAdjacentHTML("afterBegin", markup);

                    this._buttonEl = this.element.firstElementChild;
                    this._buttonPressedBehavior = new exports._WinPressed(this._buttonEl);
                    this._contentEl = this._buttonEl.firstElementChild;
                    this._imageSpan = this._contentEl.firstElementChild;
                    this._imageSpan.style.display = "none";
                    this._labelEl = this._imageSpan.nextElementSibling;
                    this._splitButtonEl = this._buttonEl.nextElementSibling;
                    this._splitButtonPressedBehavior = new exports._WinPressed(this._splitButtonEl);
                    this._splitButtonEl.style.display = "none";

                    _ElementUtilities._ensureId(this._buttonEl);
                    this._splitButtonEl.setAttribute("aria-labelledby", this._buttonEl.id);

                    this._buttonEl.addEventListener("click", this._handleButtonClick.bind(this));
                    this._buttonEl.addEventListener("beforeactivate", this._beforeactivateButtonHandler.bind(this));
                    this._buttonEl.addEventListener("pointerdown", this._MSPointerDownButtonHandler.bind(this));

                    var mutationObserver = new _ElementUtilities._MutationObserver(this._splitButtonAriaExpandedPropertyChangeHandler.bind(this));
                    mutationObserver.observe(this._splitButtonEl, { attributes: true, attributeFilter: ["aria-expanded"] });
                    this._splitButtonEl.addEventListener("click", this._handleSplitButtonClick.bind(this));
                    this._splitButtonEl.addEventListener("beforeactivate", this._beforeactivateSplitButtonHandler.bind(this));
                    this._splitButtonEl.addEventListener("pointerdown", this._MSPointerDownSplitButtonHandler.bind(this));

                    // reparent any other elements.
                    var tempEl = this._splitButtonEl.nextSibling;
                    while (tempEl) {
                        this._buttonEl.insertBefore(tempEl, this._contentEl);
                        if (tempEl.nodeName !== "#text") {
                            ControlProcessor.processAll(tempEl);
                        }
                        tempEl = this._splitButtonEl.nextSibling;
                    }
                },

                _MSPointerDownButtonHandler: function NavBarCommand_MSPointerDownButtonHandler() {
                    this._splitButtonActive = false;
                },

                _MSPointerDownSplitButtonHandler: function NavBarCommand_MSPointerDownSplitButtonHandler() {
                    this._splitButtonActive = true;
                },

                _handleButtonClick: function NavBarCommand_handleButtonClick(ev) {
                    var srcElement = ev.target;
                    if (!_ElementUtilities._matchesSelector(srcElement, ".win-interactive, .win-interactive *")) {
                        if (this.location) {
                            Navigation.navigate(this.location, this.state);
                        }
                        this._fireEvent(NavBarCommand._EventName._invoked);
                    }
                },

                _splitButtonAriaExpandedPropertyChangeHandler: function NavBarCommand_splitButtonAriaExpandedPropertyChangeHandler() {
                    if ((this._splitButtonEl.getAttribute("aria-expanded") === "true") !== this._splitOpened) {
                        this._toggleSplit();
                    }
                },

                _handleSplitButtonClick: function NavBarCommand_handleSplitButtonClick() {
                    this._toggleSplit();
                },

                _beforeactivateSplitButtonHandler: function NavBarCommand_beforeactivateSplitButtonHandler(ev) {
                    if (!this._splitButtonActive) {
                        ev.stopPropagation();
                        ev.preventDefault();
                    }
                },

                _beforeactivateButtonHandler: function NavBarCommand_beforeactivateButtonHandler(ev) {
                    if (this._splitButtonActive) {
                        ev.stopPropagation();
                        ev.preventDefault();
                    }
                },

                _fireEvent: function NavBarCommand_fireEvent(type, detail) {
                    var event = _Global.document.createEvent("CustomEvent");
                    event.initCustomEvent(type, true, false, detail);
                    this.element.dispatchEvent(event);
                },

                dispose: function NavBarCommand_dispose() {
                    /// <signature helpKeyword="WinJS.UI.NavBarCommand.dispose">
                    /// <summary locid="WinJS.UI.NavBarCommand.dispose">
                    /// Disposes this control.
                    /// </summary>
                    /// <compatibleWith platform="Windows" minVersion="8.1"/>
                    /// </signature>
                    if (this._disposed) {
                        return;
                    }
                    this._disposed = true;

                    this._buttonPressedBehavior.dispose();
                    this._splitButtonPressedBehavior.dispose();
                }
            }, {
                _ClassName: {
                    navbarcommand: "win-navbarcommand",
                    navbarcommandbutton: "win-navbarcommand-button",
                    navbarcommandbuttoncontent: "win-navbarcommand-button-content",
                    navbarcommandsplitbutton: "win-navbarcommand-splitbutton",
                    navbarcommandsplitbuttonopened: "win-navbarcommand-splitbutton-opened",
                    navbarcommandicon: "win-navbarcommand-icon",
                    navbarcommandlabel: "win-navbarcommand-label"
                },
                _EventName: {
                    _invoked: "_invoked",
                    _splitToggle: "_splittoggle"
                }
            });
            _Base.Class.mix(NavBarCommand, _Control.DOMEventMixin);
            return NavBarCommand;
        })
    });

});
// Copyright (c) Microsoft Open Technologies, Inc.  All Rights Reserved. Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
define('WinJS/Controls/NavBar/_Container',[
    'exports',
    '../../Core/_Global',
    '../../Core/_Base',
    '../../Core/_ErrorFromName',
    '../../Core/_Events',
    '../../Core/_Log',
    '../../Core/_Resources',
    '../../Core/_WriteProfilerMark',
    '../../Animations',
    '../../Animations/_TransitionAnimation',
    '../../BindingList',
    '../../ControlProcessor',
    '../../Navigation',
    '../../Promise',
    '../../Scheduler',
    '../../Utilities/_Control',
    '../../Utilities/_ElementUtilities',
    '../../Utilities/_KeyboardBehavior',
    '../../Utilities/_UI',
    '../AppBar/_Constants',
    '../Repeater',
    './_Command'
    ], function NavBarContainerInit(exports, _Global, _Base, _ErrorFromName, _Events, _Log, _Resources, _WriteProfilerMark, Animations, _TransitionAnimation, BindingList, ControlProcessor, Navigation, Promise, Scheduler, _Control, _ElementUtilities, _KeyboardBehavior, _UI, _Constants, Repeater, _Command) {
    "use strict";

    function nobodyHasFocus() {
        return _Global.document.activeElement === null || _Global.document.activeElement === _Global.document.body;
    }

    _Base.Namespace._moduleDefine(exports, "WinJS.UI", {
        /// <field>
        /// <summary locid="WinJS.UI.NavBarContainer">
        /// Contains a group of NavBarCommand objects in a NavBar. 
        /// </summary>
        /// <compatibleWith platform="Windows" minVersion="8.1"/>
        /// </field>
        /// <icon src="ui_winjs.ui.navbarcontainer.12x12.png" width="12" height="12" />
        /// <icon src="ui_winjs.ui.navbarcontainer.16x16.png" width="16" height="16" />
        /// <htmlSnippet supportsContent="true"><![CDATA[<div data-win-control="WinJS.UI.NavBarContainer">
        /// <div data-win-control="WinJS.UI.NavBarCommand" data-win-options="{location:'/pages/home/home.html',label:'Home',icon:WinJS.UI.AppBarIcon.home}"></div>
        /// </div>]]></htmlSnippet>
        /// <event name="invoked" locid="WinJS.UI.NavBarContainer_e:invoked">Raised when a NavBarCommand is invoked.</event>
        /// <event name="splittoggle" locid="WinJS.UI.NavBarContainer_e:splittoggle">Raised when the split button on a NavBarCommand is toggled.</event>
        /// <part name="navbarcontainer" class="win-navbarcontainer" locid="WinJS.UI.NavBarContainer_part:navbarcontainer">Styles the entire NavBarContainer control.</part>
        /// <part name="pageindicators" class="win-navbarcontainer-pageindicator-box" locid="WinJS.UI.NavBarContainer_part:pageindicators">
        /// Styles the page indication for the NavBarContainer.
        /// </part>
        /// <part name="indicator" class="win-navbarcontainer-pagination-indicator" locid="WinJS.UI.NavBarContainer_part:indicator">Styles the page indication for each page.</part>
        /// <part name="currentindicator" class="win-navbarcontainer-pagination-indicator-current" locid="WinJS.UI.NavBarContainer_part:currentindicator">
        /// Styles the indication of the current page.
        /// </part>
        /// <part name="items" class="win-navbarcontainer-surface" locid="WinJS.UI.NavBarContainer_part:items">Styles the area that contains items for the NavBarContainer.</part>
        /// <part name="navigationArrow" class="win-navbarcontainer-navarrow" locid="WinJS.UI.NavBarContainer_part:navigationArrow">Styles left and right navigation arrows.</part>
        /// <part name="leftNavigationArrow" class="win-navbarcontainer-navleft" locid="WinJS.UI.NavBarContainer_part:leftNavigationArrow">Styles the left navigation arrow.</part>
        /// <part name="rightNavigationArrow" class="win-navbarcontainer-navright" locid="WinJS.UI.NavBarContainer_part:rightNavigationArrow">Styles the right navigation arrow.</part>
        /// <resource type="javascript" src="//$(TARGET_DESTINATION)/js/base.js" shared="true" />
        /// <resource type="javascript" src="//$(TARGET_DESTINATION)/js/ui.js" shared="true" />
        /// <resource type="css" src="//$(TARGET_DESTINATION)/css/ui-dark.css" shared="true" />
        NavBarContainer: _Base.Namespace._lazy(function () {
            var Key = _ElementUtilities.Key;

            var buttonFadeDelay = 3000;
            var PT_TOUCH = _ElementUtilities._MSPointerEvent.MSPOINTER_TYPE_TOUCH || "touch";
            var MS_MANIPULATION_STATE_STOPPED = 0;

            var createEvent = _Events._createEventProperty;
            var eventNames = {
                invoked: "invoked",
                splittoggle: "splittoggle"
            };

            var strings = {
                get duplicateConstruction() { return _Resources._getWinJSString("ui/duplicateConstruction").value; },
                get navBarContainerViewportAriaLabel() { return _Resources._getWinJSString("ui/navBarContainerViewportAriaLabel").value; }
            };

            var NavBarContainer = _Base.Class.define(function NavBarContainer_ctor(element, options) {
                /// <signature helpKeyword="WinJS.UI.NavBarContainer.NavBarContainer">
                /// <summary locid="WinJS.UI.NavBarContainer.constructor">
                /// Creates a new NavBarContainer.
                /// </summary>
                /// <param name="element" type="HTMLElement" domElement="true" isOptional="true" locid="WinJS.UI.NavBarContainer.constructor_p:element">
                /// The DOM element that will host the NavBarContainer control.
                /// </param>
                /// <param name="options" type="Object" isOptional="true" locid="WinJS.UI.NavBarContainer.constructor_p:options">
                /// An object that contains one or more property/value pairs to apply to the new control. 
                /// Each property of the options object corresponds to one of the control's properties or events. 
                /// Event names must begin with "on". 
                /// </param>
                /// <returns type="WinJS.UI.NavBarContainer" locid="WinJS.UI.NavBarContainer.constructor_returnValue">
                /// The new NavBarContainer.
                /// </returns>
                /// <compatibleWith platform="Windows" minVersion="8.1"/>
                /// </signature>
                
                element = element || _Global.document.createElement("DIV");
                this._id = element.id || _ElementUtilities._uniqueID(element);
                this._writeProfilerMark("constructor,StartTM");

                options = options || {};

                if (element.winControl) {
                    throw new _ErrorFromName("WinJS.UI.NavBarContainer.DuplicateConstruction", strings.duplicateConstruction);
                }

                // Attaching JS control to DOM element
                element.winControl = this;
                this._element = element;
                _ElementUtilities.addClass(this.element, NavBarContainer._ClassName.navbarcontainer);
                _ElementUtilities.addClass(this.element, "win-disposable");
                if (!element.getAttribute("tabIndex")) {
                    element.tabIndex = -1;
                }
                
                this._focusCurrentItemPassivelyBound = this._focusCurrentItemPassively.bind(this);
                this._closeSplitAndResetBound = this._closeSplitAndReset.bind(this);
                this._currentManipulationState = MS_MANIPULATION_STATE_STOPPED;

                this._fixedSize = false;
                this._maxRows = 1;
                this._sizes = {};

                this._setupTree();

                this._duringConstructor = true;

                this._dataChangingBound = this._dataChanging.bind(this);
                this._dataChangedBound = this._dataChanged.bind(this);

                Navigation.addEventListener('navigated', this._closeSplitAndResetBound);

                // Don't use set options for the properties so we can control the ordering to avoid rendering multiple times.
                this.layout = options.layout || _UI.Orientation.horizontal;
                if (options.maxRows) {
                    this.maxRows = options.maxRows;
                }
                if (options.template) {
                    this.template = options.template;
                }
                if (options.data) {
                    this.data = options.data;
                }
                if (options.fixedSize) {
                    this.fixedSize = options.fixedSize;
                }

                // Events only
                _Control._setOptions(this, options, true);

                this._duringConstructor = false;

                if (options.currentIndex) {
                    this.currentIndex = options.currentIndex;
                }

                this._updatePageUI();
                
                Scheduler.schedule(function NavBarContainer_async_initialize() {
                    this._updateAppBarReference();
                }, Scheduler.Priority.normal, this, "WinJS.UI.NavBarContainer_async_initialize");

                this._writeProfilerMark("constructor,StopTM");
            }, {
                /// <field type="HTMLElement" domElement="true" hidden="true" locid="WinJS.UI.NavBarContainer.element" helpKeyword="WinJS.UI.NavBarContainer.element">
                /// Gets the DOM element that hosts the NavBarContainer.
                /// <compatibleWith platform="Windows" minVersion="8.1"/>
                /// </field>
                element: {
                    get: function () {
                        return this._element;
                    }
                },

                /// <field type="Object" locid="WinJS.UI.NavBarContainer.template" helpKeyword="WinJS.UI.NavBarContainer.template" potentialValueSelector="[data-win-control='WinJS.Binding.Template']">
                /// Gets or sets a Template or custom rendering function that defines the HTML of each item within the NavBarContainer.
                /// <compatibleWith platform="Windows" minVersion="8.1"/>
                /// </field>
                template: {
                    get: function () {
                        return this._template;
                    },
                    set: function (value) {
                        this._template = value;
                        if (this._repeater) {
                            var hadFocus = this.element.contains(_Global.document.activeElement);

                            if (!this._duringConstructor) {
                                this._closeSplitIfOpen();
                            }

                            // the repeater's template is wired up to this._render() so just resetting it will rebuild the tree.
                            this._repeater.template = this._repeater.template;

                            if (!this._duringConstructor) {
                                this._measured = false;
                                this._sizes.itemMeasured = false;
                                this._reset();
                                if (hadFocus) {
                                    this._keyboardBehavior._focus(0);
                                }
                            }
                        }
                    }
                },

                _render: function NavBarContainer_render(item) {
                    var navbarCommandEl = _Global.document.createElement('div');

                    var template = this._template;
                    if (template) {
                        if (template.render) {
                            template.render(item, navbarCommandEl);
                        } else if (template.winControl && template.winControl.render) {
                            template.winControl.render(item, navbarCommandEl);
                        } else {
                            navbarCommandEl.appendChild(template(item));
                        }
                    }

                    // Create the NavBarCommand after calling render so that the reparenting in navbarCommand works.
                    var navbarCommand = new _Command.NavBarCommand(navbarCommandEl, item);
                    return navbarCommand._element;
                },

                /// <field type="WinJS.Binding.List" locid="WinJS.UI.NavBarContainer.data" helpKeyword="WinJS.UI.NavBarContainer.data">
                /// Gets or sets the WinJS.Binding.List that provides the NavBarContainer with items to display.
                /// <compatibleWith platform="Windows" minVersion="8.1"/>
                /// </field>
                data: {
                    get: function () {
                        return this._repeater && this._repeater.data;
                    },
                    set: function (value) {
                        if (!value) {
                            value = new BindingList.List();
                        }

                        if (!this._duringConstructor) {
                            this._closeSplitIfOpen();
                        }

                        this._removeDataChangingEvents();
                        this._removeDataChangedEvents();

                        var hadFocus = this.element.contains(_Global.document.activeElement);

                        if (!this._repeater) {
                            this._surfaceEl.innerHTML = "";
                            this._repeater = new Repeater.Repeater(this._surfaceEl, {
                                template: this._render.bind(this)
                            });
                        }

                        this._addDataChangingEvents(value);
                        this._repeater.data = value;
                        this._addDataChangedEvents(value);

                        if (!this._duringConstructor) {
                            this._measured = false;
                            this._sizes.itemMeasured = false;
                            this._reset();
                            if (hadFocus) {
                                this._keyboardBehavior._focus(0);
                            }
                        }
                    }
                },

                /// <field type="Number" integer="true" locid="WinJS.UI.NavBarContainer.maxRows" helpKeyword="WinJS.UI.NavBarContainer.maxRows">
                /// Gets or sets the number of rows allowed to be used before items are placed on additional pages.
                /// <compatibleWith platform="Windows" minVersion="8.1"/>
                /// </field>
                maxRows: {
                    get: function () {
                        return this._maxRows;
                    },
                    set: function (value) {
                        value = (+value === value) ? value : 1;
                        this._maxRows = Math.max(1, value);

                        if (!this._duringConstructor) {
                            this._closeSplitIfOpen();

                            this._measured = false;
                            this._reset();
                        }
                    }
                },

                /// <field type="String" oamOptionsDatatype="WinJS.UI.Orientation" locid="WinJS.UI.NavBarContainer.layout" helpKeyword="WinJS.UI.NavBarContainer.layout">
                /// Gets or sets a value that specifies whether the NavBarContainer has a horizontal or vertical layout. The default is "horizontal".
                /// <compatibleWith platform="Windows" minVersion="8.1"/>
                /// </field>
                layout: {
                    get: function () {
                        return this._layout;
                    },
                    set: function (value) {
                        if (value === _UI.Orientation.vertical) {
                            this._layout = _UI.Orientation.vertical;
                            _ElementUtilities.removeClass(this.element, NavBarContainer._ClassName.horizontal);
                            _ElementUtilities.addClass(this.element, NavBarContainer._ClassName.vertical);
                        } else {
                            this._layout = _UI.Orientation.horizontal;
                            _ElementUtilities.removeClass(this.element, NavBarContainer._ClassName.vertical);
                            _ElementUtilities.addClass(this.element, NavBarContainer._ClassName.horizontal);
                        }

                        this._viewportEl.style.msScrollSnapType = "";
                        this._zooming = false;

                        if (!this._duringConstructor) {
                            this._measured = false;
                            this._sizes.itemMeasured = false;
                            this._ensureVisible(this._keyboardBehavior.currentIndex, true);
                            this._updatePageUI();
                            this._closeSplitIfOpen();
                        }
                    }
                },

                /// <field type="Number" integer="true" locid="WinJS.UI.NavBarContainer.currentIndex" hidden="true" helpKeyword="WinJS.UI.NavBarContainer.currentIndex">
                /// Gets or sets the index of the current NavBarCommand.
                /// <compatibleWith platform="Windows" minVersion="8.1"/>
                /// </field>
                currentIndex: {
                    get: function () {
                        return this._keyboardBehavior.currentIndex;
                    },
                    set: function (value) {
                        if (value === +value) {
                            var hadFocus = this.element.contains(_Global.document.activeElement);

                            this._keyboardBehavior.currentIndex = value;
                            if (this._surfaceEl.children.length > 0) {
                                this._surfaceEl.children[this._keyboardBehavior.currentIndex].winControl._splitButtonActive = false;
                            }

                            this._ensureVisible(this._keyboardBehavior.currentIndex, true);

                            if (hadFocus) {
                                this._keyboardBehavior._focus();
                            }
                        }
                    }
                },

                /// <field type="Boolean" locid="WinJS.UI.NavBarContainer.fixedSize" helpKeyword="WinJS.UI.NavBarContainer.fixedSize">
                /// Gets or sets a value that specifies whether child NavBarCommand  objects should be a fixed width when there are multiple pages. A value of true indicates 
                /// that the NavBarCommand objects use a fixed width; a value of false indicates that they use a dynamic width. 
                /// <compatibleWith platform="Windows" minVersion="8.1"/>
                /// </field>
                fixedSize: {
                    get: function () {
                        return this._fixedSize;
                    },
                    set: function (value) {
                        this._fixedSize = !!value;

                        if (!this._duringConstructor) {
                            this._closeSplitIfOpen();

                            if (!this._measured) {
                                this._measure();
                            } else if (this._surfaceEl.children.length > 0) {
                                this._updateGridStyles();
                            }
                        }
                    }
                },

                /// <field type="Function" locid="WinJS.UI.NavBarContainer.oninvoked" helpKeyword="WinJS.UI.NavBarContainer.oninvoked">
                /// Raised when a NavBarCommand has been invoked.
                /// <compatibleWith platform="Windows" minVersion="8.1"/>
                /// </field>
                oninvoked: createEvent(eventNames.invoked),

                /// <field type="Function" locid="WinJS.UI.NavBarContainer.onsplittoggle" helpKeyword="WinJS.UI.NavBarContainer.onsplittoggle">
                /// Raised when the split button on a NavBarCommand is toggled.
                /// <compatibleWith platform="Windows" minVersion="8.1"/>
                /// </field>
                onsplittoggle: createEvent(eventNames.splittoggle),

                forceLayout: function NavBarContainer_forceLayout() {
                    /// <signature helpKeyword="WinJS.UI.NavBarContainer.forceLayout">
                    /// <summary locid="WinJS.UI.NavBarContainer.forceLayout">
                    /// Forces the NavBarContainer to update scroll positions and if the NavBar has changed size, it will also re-measure. 
                    /// Use this function when making the NavBarContainer visible again after you set its style.display property to "none".
                    /// </summary>
                    /// <compatibleWith platform="Windows" minVersion="8.1"/>
                    /// </signature>
                    this._resizeHandler();
                    if (this._measured) {
                        this._scrollPosition = _ElementUtilities.getScrollPosition(this._viewportEl)[(this.layout === _UI.Orientation.horizontal ? "scrollLeft" : "scrollTop")];
                    }

                    this._duringForceLayout = true;
                    this._ensureVisible(this._keyboardBehavior.currentIndex, true);
                    this._updatePageUI();
                    this._duringForceLayout = false;
                },

                _updateAppBarReference: function NavBarContainer_updateAppBarReference() {
                    if (!this._appBarEl || !this._appBarEl.contains(this.element)) {
                        if (this._appBarEl) {
                            this._appBarEl.removeEventListener('beforeshow', this._closeSplitAndResetBound);
                            this._appBarEl.removeEventListener('beforeshow', this._resizeImplBound);
                            this._appBarEl.removeEventListener('aftershow', this._focusCurrentItemPassivelyBound);
                        }
                    
                        var appBarEl = this.element.parentNode;
                        while (appBarEl && !_ElementUtilities.hasClass(appBarEl, _Constants.appBarClass)) {
                            appBarEl = appBarEl.parentNode;
                        }
                        this._appBarEl = appBarEl;
                        
                        if (this._appBarEl) {
                            this._appBarEl.addEventListener('beforeshow', this._closeSplitAndResetBound);
                            this._appBarEl.addEventListener('aftershow', this._focusCurrentItemPassivelyBound);
                        }
                    }
                },

                _closeSplitAndReset: function NavBarContainer_closeSplitAndReset() {
                    this._closeSplitIfOpen();
                    this._reset();
                },

                _dataChanging: function NavBarContainer_dataChanging(ev) {
                    // Store the element that was active so that we can detect
                    // if the focus went away because of the data change.
                    this._elementHadFocus = _Global.document.activeElement;

                    if (this._currentSplitNavItem && this._currentSplitNavItem.splitOpened) {
                        if (ev.type === "itemremoved") {
                            if (this._surfaceEl.children[ev.detail.index].winControl === this._currentSplitNavItem) {
                                this._closeSplitIfOpen();
                            }
                        } else if (ev.type === "itemchanged") {
                            if (this._surfaceEl.children[ev.detail.index].winControl === this._currentSplitNavItem) {
                                this._closeSplitIfOpen();
                            }
                        } else if (ev.type === "itemmoved") {
                            if (this._surfaceEl.children[ev.detail.oldIndex].winControl === this._currentSplitNavItem) {
                                this._closeSplitIfOpen();
                            }
                        } else if (ev.type === "reload") {
                            this._closeSplitIfOpen();
                        }
                    }
                },

                _dataChanged: function NavBarContainer_dataChanged(ev) {
                    this._measured = false;

                    if (ev.type === "itemremoved") {
                        if (ev.detail.index < this._keyboardBehavior.currentIndex) {
                            this._keyboardBehavior.currentIndex--;
                        } else if (ev.detail.index === this._keyboardBehavior.currentIndex) {
                            // This clamps if the item being removed was the last item in the list
                            this._keyboardBehavior.currentIndex = this._keyboardBehavior.currentIndex;
                            if (nobodyHasFocus() && this._elementHadFocus) {
                                this._keyboardBehavior._focus();
                            }
                        }
                    } else if (ev.type === "itemchanged") {
                        if (ev.detail.index === this._keyboardBehavior.currentIndex) {
                            if (nobodyHasFocus() && this._elementHadFocus) {
                                this._keyboardBehavior._focus();
                            }
                        }
                    } else if (ev.type === "iteminserted") {
                        if (ev.detail.index <= this._keyboardBehavior.currentIndex) {
                            this._keyboardBehavior.currentIndex++;
                        }
                    } else if (ev.type === "itemmoved") {
                        if (ev.detail.oldIndex === this._keyboardBehavior.currentIndex) {
                            this._keyboardBehavior.currentIndex = ev.detail.newIndex;
                            if (nobodyHasFocus() && this._elementHadFocus) {
                                this._keyboardBehavior._focus();
                            }
                        }
                    } else if (ev.type === "reload") {
                        this._keyboardBehavior.currentIndex = 0;
                        if (nobodyHasFocus() && this._elementHadFocus) {
                            this._keyboardBehavior._focus();
                        }
                    }

                    this._ensureVisible(this._keyboardBehavior.currentIndex, true);
                    this._updatePageUI();
                },
                
                _focusCurrentItemPassively: function NavBarContainer_focusCurrentItemPassively() {
                    if (this.element.contains(_Global.document.activeElement)) {
                        this._keyboardBehavior._focus();
                    }
                },
                
                _reset: function NavBarContainer_reset() {
                    this._keyboardBehavior.currentIndex = 0;
                    if (this._surfaceEl.children.length > 0) {
                        this._surfaceEl.children[this._keyboardBehavior.currentIndex].winControl._splitButtonActive = false;
                    }

                    if (this.element.contains(_Global.document.activeElement)) {
                        this._keyboardBehavior._focus(0);
                    }

                    this._viewportEl.style.msScrollSnapType = "";
                    this._zooming = false;

                    this._ensureVisible(0, true);
                    this._updatePageUI();
                },

                _removeDataChangedEvents: function NavBarContainer_removeDataChangedEvents() {
                    if (this._repeater) {
                        this._repeater.data.removeEventListener("itemchanged", this._dataChangedBound);
                        this._repeater.data.removeEventListener("iteminserted", this._dataChangedBound);
                        this._repeater.data.removeEventListener("itemmoved", this._dataChangedBound);
                        this._repeater.data.removeEventListener("itemremoved", this._dataChangedBound);
                        this._repeater.data.removeEventListener("reload", this._dataChangedBound);
                    }
                },

                _addDataChangedEvents: function NavBarContainer_addDataChangedEvents() {
                    if (this._repeater) {
                        this._repeater.data.addEventListener("itemchanged", this._dataChangedBound);
                        this._repeater.data.addEventListener("iteminserted", this._dataChangedBound);
                        this._repeater.data.addEventListener("itemmoved", this._dataChangedBound);
                        this._repeater.data.addEventListener("itemremoved", this._dataChangedBound);
                        this._repeater.data.addEventListener("reload", this._dataChangedBound);
                    }
                },

                _removeDataChangingEvents: function NavBarContainer_removeDataChangingEvents() {
                    if (this._repeater) {
                        this._repeater.data.removeEventListener("itemchanged", this._dataChangingBound);
                        this._repeater.data.removeEventListener("iteminserted", this._dataChangingBound);
                        this._repeater.data.removeEventListener("itemmoved", this._dataChangingBound);
                        this._repeater.data.removeEventListener("itemremoved", this._dataChangingBound);
                        this._repeater.data.removeEventListener("reload", this._dataChangingBound);
                    }
                },

                _addDataChangingEvents: function NavBarContainer_addDataChangingEvents(bindingList) {
                    bindingList.addEventListener("itemchanged", this._dataChangingBound);
                    bindingList.addEventListener("iteminserted", this._dataChangingBound);
                    bindingList.addEventListener("itemmoved", this._dataChangingBound);
                    bindingList.addEventListener("itemremoved", this._dataChangingBound);
                    bindingList.addEventListener("reload", this._dataChangingBound);
                },

                _mouseleave: function NavBarContainer_mouseleave() {
                    if (this._mouseInViewport) {
                        this._mouseInViewport = false;
                        this._updateArrows();
                    }
                },

                _MSPointerDown: function NavBarContainer_MSPointerDown(ev) {
                    if (ev.pointerType === PT_TOUCH) {
                        if (this._mouseInViewport) {
                            this._mouseInViewport = false;
                            this._updateArrows();
                        }
                    }
                },

                _MSPointerMove: function NavBarContainer_MSPointerMove(ev) {
                    if (ev.pointerType !== PT_TOUCH) {
                        if (!this._mouseInViewport) {
                            this._mouseInViewport = true;
                            this._updateArrows();
                        }
                    }
                },

                _setupTree: function NavBarContainer_setupTree() {
                    this._animateNextPreviousButtons = Promise.wrap();
                    this._element.addEventListener('mouseleave', this._mouseleave.bind(this));
                    _ElementUtilities._addEventListener(this._element, 'pointerdown', this._MSPointerDown.bind(this));
                    _ElementUtilities._addEventListener(this._element, 'pointermove', this._MSPointerMove.bind(this));
                    _ElementUtilities._addEventListener(this._element, "focusin", this._focusHandler.bind(this), false);

                    this._pageindicatorsEl = _Global.document.createElement('div');
                    _ElementUtilities.addClass(this._pageindicatorsEl, NavBarContainer._ClassName.pageindicators);
                    this._element.appendChild(this._pageindicatorsEl);

                    this._ariaStartMarker = _Global.document.createElement("div");
                    this._element.appendChild(this._ariaStartMarker);

                    this._viewportEl = _Global.document.createElement('div');
                    _ElementUtilities.addClass(this._viewportEl, NavBarContainer._ClassName.viewport);
                    this._element.appendChild(this._viewportEl);
                    this._viewportEl.setAttribute("role", "group");
                    this._viewportEl.setAttribute("aria-label", strings.navBarContainerViewportAriaLabel);

                    this._boundResizeHandler = this._resizeHandler.bind(this);
                    _ElementUtilities._resizeNotifier.subscribe(this._element, this._boundResizeHandler);
                    this._viewportEl.addEventListener("mselementresize", this._resizeHandler.bind(this));
                    this._viewportEl.addEventListener("scroll", this._scrollHandler.bind(this));
                    this._viewportEl.addEventListener("MSManipulationStateChanged", this._MSManipulationStateChangedHandler.bind(this));

                    this._ariaEndMarker = _Global.document.createElement("div");
                    this._element.appendChild(this._ariaEndMarker);

                    this._surfaceEl = _Global.document.createElement('div');
                    _ElementUtilities.addClass(this._surfaceEl, NavBarContainer._ClassName.surface);
                    this._viewportEl.appendChild(this._surfaceEl);

                    this._surfaceEl.addEventListener("_invoked", this._navbarCommandInvokedHandler.bind(this));
                    this._surfaceEl.addEventListener("_splittoggle", this._navbarCommandSplitToggleHandler.bind(this));
                    _ElementUtilities._addEventListener(this._surfaceEl, "focusin", this._itemsFocusHandler.bind(this), false);
                    this._surfaceEl.addEventListener("keydown", this._keyDownHandler.bind(this));

                    // Reparent NavBarCommands which were in declarative markup
                    var tempEl = this.element.firstElementChild;
                    while (tempEl !== this._pageindicatorsEl) {
                        this._surfaceEl.appendChild(tempEl);
                        ControlProcessor.process(tempEl);
                        tempEl = this.element.firstElementChild;
                    }

                    this._leftArrowEl = _Global.document.createElement('div');
                    _ElementUtilities.addClass(this._leftArrowEl, NavBarContainer._ClassName.navleftarrow);
                    _ElementUtilities.addClass(this._leftArrowEl, NavBarContainer._ClassName.navarrow);
                    this._element.appendChild(this._leftArrowEl);
                    this._leftArrowEl.addEventListener('click', this._goLeft.bind(this));
                    this._leftArrowEl.style.opacity = 0;
                    this._leftArrowEl.style.visibility = 'hidden';
                    this._leftArrowFadeOut = Promise.wrap();

                    this._rightArrowEl = _Global.document.createElement('div');
                    _ElementUtilities.addClass(this._rightArrowEl, NavBarContainer._ClassName.navrightarrow);
                    _ElementUtilities.addClass(this._rightArrowEl, NavBarContainer._ClassName.navarrow);
                    this._element.appendChild(this._rightArrowEl);
                    this._rightArrowEl.addEventListener('click', this._goRight.bind(this));
                    this._rightArrowEl.style.opacity = 0;
                    this._rightArrowEl.style.visibility = 'hidden';
                    this._rightArrowFadeOut = Promise.wrap();

                    this._keyboardBehavior = new _KeyboardBehavior._KeyboardBehavior(this._surfaceEl, {
                        scroller: this._viewportEl
                    });
                    this._winKeyboard = new _KeyboardBehavior._WinKeyboard(this._surfaceEl);
                },

                _goRight: function NavBarContainer_goRight() {
                    if (this._sizes.rtl) {
                        this._goPrev();
                    } else {
                        this._goNext();
                    }
                },

                _goLeft: function NavBarContainer_goLeft() {
                    if (this._sizes.rtl) {
                        this._goNext();
                    } else {
                        this._goPrev();
                    }
                },

                _goNext: function NavBarContainer_goNext() {
                    this._measure();
                    var itemsPerPage = this._sizes.rowsPerPage * this._sizes.columnsPerPage;
                    var targetPage = Math.min(Math.floor(this._keyboardBehavior.currentIndex / itemsPerPage) + 1, this._sizes.pages - 1);
                    this._keyboardBehavior.currentIndex = Math.min(itemsPerPage * targetPage, this._surfaceEl.children.length);
                    this._keyboardBehavior._focus();
                },

                _goPrev: function NavBarContainer_goPrev() {
                    this._measure();
                    var itemsPerPage = this._sizes.rowsPerPage * this._sizes.columnsPerPage;
                    var targetPage = Math.max(0, Math.floor(this._keyboardBehavior.currentIndex / itemsPerPage) - 1);
                    this._keyboardBehavior.currentIndex = Math.max(itemsPerPage * targetPage, 0);
                    this._keyboardBehavior._focus();
                },

                _currentPage: {
                    get: function () {
                        if (this.layout === _UI.Orientation.horizontal) {
                            this._measure();
                            if (this._sizes.viewportOffsetWidth > 0) {
                                return Math.min(this._sizes.pages - 1, Math.round(this._scrollPosition / this._sizes.viewportOffsetWidth));
                            }
                        }
                        return 0;
                    }
                },

                _resizeHandler: function NavBarContainer_resizeHandler() {
                    if (this._disposed) { return; }
                    if (!this._measured) { return; }
                    var viewportResized = this.layout === _UI.Orientation.horizontal
                            ? this._sizes.viewportOffsetWidth !== parseFloat(_Global.getComputedStyle(this._viewportEl).width)
                            : this._sizes.viewportOffsetHeight !== parseFloat(_Global.getComputedStyle(this._viewportEl).height);
                    if (!viewportResized) { return; }
                    
                    this._measured = false;

                    if (!this._pendingResize) {
                        this._pendingResize = true;

                        this._resizeImplBound = this._resizeImplBound || this._resizeImpl.bind(this);
                        
                        this._updateAppBarReference();

                        if (this._appBarEl && this._appBarEl.winControl && this._appBarEl.winControl.hidden) {
                            // Do resize lazily.
                            Scheduler.schedule(this._resizeImplBound, Scheduler.Priority.idle, null, "WinJS.UI.NavBarContainer._resizeImpl");
                            this._appBarEl.addEventListener('beforeshow', this._resizeImplBound);
                        } else {
                            // Do resize now
                            this._resizeImpl();
                        }
                    }
                },

                _resizeImpl: function NavBarContainer_resizeImpl() {
                    if (!this._disposed && this._pendingResize) {
                        this._pendingResize = false;
                        if (this._appBarEl) {
                            this._appBarEl.removeEventListener('beforeshow', this._resizeImplBound);
                        }

                        this._keyboardBehavior.currentIndex = 0;
                        if (this._surfaceEl.children.length > 0) {
                            this._surfaceEl.children[0].winControl._splitButtonActive = false;
                        }
                        if (this.element.contains(_Global.document.activeElement)) {
                            this._keyboardBehavior._focus(this._keyboardBehavior.currentIndex);
                        }
                        this._closeSplitIfOpen();
                        this._ensureVisible(this._keyboardBehavior.currentIndex, true);
                        this._updatePageUI();
                    }
                },

                _keyDownHandler: function NavBarContainer_keyDownHandler(ev) {
                    var keyCode = ev.keyCode;
                    if (!ev.altKey && (keyCode === Key.pageUp || keyCode === Key.pageDown)) {
                        var srcElement = ev.target;
                        if (_ElementUtilities._matchesSelector(srcElement, ".win-interactive, .win-interactive *")) {
                            return;
                        }

                        var index = this._keyboardBehavior.currentIndex;
                        this._measure();

                        var sizes = this._sizes;
                        var page = Math.floor(index / (sizes.columnsPerPage * sizes.rowsPerPage));

                        var scrollPositionTarget = null;
                        if (keyCode === Key.pageUp) {
                            if (this.layout === _UI.Orientation.horizontal) {
                                var indexOfFirstItemOnPage = page * sizes.columnsPerPage * sizes.rowsPerPage;
                                if (index === indexOfFirstItemOnPage && this._surfaceEl.children[index].winControl._buttonEl === _Global.document.activeElement) {
                                    // First item on page so go back 1 page.
                                    index = index - sizes.columnsPerPage * sizes.rowsPerPage;
                                } else {
                                    // Not first item on page so go to the first item on page.
                                    index = indexOfFirstItemOnPage;
                                }
                            } else {
                                var currentItem = this._surfaceEl.children[index];
                                var top = currentItem.offsetTop;
                                var bottom = top + currentItem.offsetHeight;
                                var scrollPosition = this._zooming ? this._zoomPosition : this._scrollPosition;

                                if (top >= scrollPosition && bottom < scrollPosition + sizes.viewportOffsetHeight) {
                                    // current item is fully on screen.
                                    while (index > 0 &&
                                        this._surfaceEl.children[index - 1].offsetTop > scrollPosition) {
                                        index--;
                                    }
                                }

                                if (this._keyboardBehavior.currentIndex === index) {
                                    var scrollPositionForOnePageAboveItem = bottom - sizes.viewportOffsetHeight;
                                    index = Math.max(0, index - 1);
                                    while (index > 0 &&
                                        this._surfaceEl.children[index - 1].offsetTop > scrollPositionForOnePageAboveItem) {
                                        index--;
                                    }
                                    if (index > 0) {
                                        scrollPositionTarget = this._surfaceEl.children[index].offsetTop - this._sizes.itemMarginTop;
                                    } else {
                                        scrollPositionTarget = 0;
                                    }
                                }
                            }

                            index = Math.max(index, 0);
                            this._keyboardBehavior.currentIndex = index;

                            var element = this._surfaceEl.children[index].winControl._buttonEl;
                            this._surfaceEl.children[index].winControl._splitButtonActive = false;

                            if (scrollPositionTarget !== null) {
                                this._scrollTo(scrollPositionTarget);
                            }

                            _ElementUtilities._setActive(element, this._viewportEl);
                        } else {
                            if (this.layout === _UI.Orientation.horizontal) {
                                var indexOfLastItemOnPage = (page + 1) * sizes.columnsPerPage * sizes.rowsPerPage - 1;

                                if (index === indexOfLastItemOnPage) {
                                    // Last item on page so go forward 1 page.
                                    index = index + sizes.columnsPerPage * sizes.rowsPerPage;
                                } else {
                                    // Not Last item on page so go to last item on page.
                                    index = indexOfLastItemOnPage;
                                }
                            } else {
                                var currentItem = this._surfaceEl.children[this._keyboardBehavior.currentIndex];
                                var top = currentItem.offsetTop;
                                var bottom = top + currentItem.offsetHeight;
                                var scrollPosition = this._zooming ? this._zoomPosition : this._scrollPosition;

                                if (top >= scrollPosition && bottom < scrollPosition + sizes.viewportOffsetHeight) {
                                    // current item is fully on screen.
                                    while (index < this._surfaceEl.children.length - 1 &&
                                        this._surfaceEl.children[index + 1].offsetTop + this._surfaceEl.children[index + 1].offsetHeight < scrollPosition + sizes.viewportOffsetHeight) {
                                        index++;
                                    }
                                }

                                if (index === this._keyboardBehavior.currentIndex) {
                                    var scrollPositionForOnePageBelowItem = top + sizes.viewportOffsetHeight;
                                    index = Math.min(this._surfaceEl.children.length - 1, index + 1);
                                    while (index < this._surfaceEl.children.length - 1 &&
                                        this._surfaceEl.children[index + 1].offsetTop + this._surfaceEl.children[index + 1].offsetHeight < scrollPositionForOnePageBelowItem) {
                                        index++;
                                    }

                                    if (index < this._surfaceEl.children.length - 1) {
                                        scrollPositionTarget = this._surfaceEl.children[index + 1].offsetTop - this._sizes.viewportOffsetHeight;
                                    } else {
                                        scrollPositionTarget = this._scrollLength - this._sizes.viewportOffsetHeight;
                                    }
                                }
                            }

                            index = Math.min(index, this._surfaceEl.children.length - 1);
                            this._keyboardBehavior.currentIndex = index;

                            var element = this._surfaceEl.children[index].winControl._buttonEl;
                            this._surfaceEl.children[index].winControl._splitButtonActive = false;

                            if (scrollPositionTarget !== null) {
                                this._scrollTo(scrollPositionTarget);
                            }

                            try {
                                _ElementUtilities._setActive(element, this._viewportEl);
                            } catch (e) {
                            }
                        }
                    }
                },

                _focusHandler: function NavBarContainer_focusHandler(ev) {
                    var srcElement = ev.target;
                    if (!this._surfaceEl.contains(srcElement)) {
                        // Forward focus from NavBarContainer, viewport or surface to the currentIndex.
                        this._skipEnsureVisible = true;
                        this._keyboardBehavior._focus(this._keyboardBehavior.currentIndex);
                    }
                },

                _itemsFocusHandler: function NavBarContainer_itemsFocusHandler(ev) {
                    // Find the item which is being focused and scroll it to view.
                    var srcElement = ev.target;
                    if (srcElement === this._surfaceEl) {
                        return;
                    }

                    while (srcElement.parentNode !== this._surfaceEl) {
                        srcElement = srcElement.parentNode;
                    }

                    var index = -1;
                    while (srcElement) {
                        index++;
                        srcElement = srcElement.previousSibling;
                    }

                    if (this._skipEnsureVisible) {
                        this._skipEnsureVisible = false;
                    } else {
                        this._ensureVisible(index);
                    }
                },

                _ensureVisible: function NavBarContainer_ensureVisible(index, withoutAnimation) {
                    this._measure();

                    if (this.layout === _UI.Orientation.horizontal) {
                        var page = Math.floor(index / (this._sizes.rowsPerPage * this._sizes.columnsPerPage));
                        this._scrollTo(page * this._sizes.viewportOffsetWidth, withoutAnimation);
                    } else {
                        var element = this._surfaceEl.children[index];
                        var maxScrollPosition;
                        if (index > 0) {
                            maxScrollPosition = element.offsetTop - this._sizes.itemMarginTop;
                        } else {
                            maxScrollPosition = 0;
                        }
                        var minScrollPosition;
                        if (index < this._surfaceEl.children.length - 1) {
                            minScrollPosition = this._surfaceEl.children[index + 1].offsetTop - this._sizes.viewportOffsetHeight;
                        } else {
                            minScrollPosition = this._scrollLength - this._sizes.viewportOffsetHeight;
                        }

                        var newScrollPosition = this._zooming ? this._zoomPosition : this._scrollPosition;
                        newScrollPosition = Math.max(newScrollPosition, minScrollPosition);
                        newScrollPosition = Math.min(newScrollPosition, maxScrollPosition);
                        this._scrollTo(newScrollPosition, withoutAnimation);
                    }
                },

                _scrollTo: function NavBarContainer_scrollTo(targetScrollPosition, withoutAnimation) {
                    this._measure();
                    if (this.layout === _UI.Orientation.horizontal) {
                        targetScrollPosition = Math.max(0, Math.min(this._scrollLength - this._sizes.viewportOffsetWidth, targetScrollPosition));
                    } else {
                        targetScrollPosition = Math.max(0, Math.min(this._scrollLength - this._sizes.viewportOffsetHeight, targetScrollPosition));
                    }

                    if (withoutAnimation) {
                        if (Math.abs(this._scrollPosition - targetScrollPosition) > 1) {
                            this._zooming = false;

                            this._scrollPosition = targetScrollPosition;
                            this._updatePageUI();
                            if (!this._duringForceLayout) {
                                this._closeSplitIfOpen();
                            }

                            var newScrollPos = {};
                            newScrollPos[(this.layout === _UI.Orientation.horizontal ? "scrollLeft" : "scrollTop")] = targetScrollPosition;
                            _ElementUtilities.setScrollPosition(this._viewportEl, newScrollPos);
                        }
                    } else {
                        if ((!this._zooming && Math.abs(this._scrollPosition - targetScrollPosition) > 1) || (this._zooming && Math.abs(this._zoomPosition - targetScrollPosition) > 1)) {
                            this._zoomPosition = targetScrollPosition;

                            this._zooming = true;

                            if (this.layout === _UI.Orientation.horizontal) {
                                this._viewportEl.style.msScrollSnapType = "none";
                                _ElementUtilities._zoomTo(this._viewportEl, { contentX: targetScrollPosition, contentY: 0, viewportX: 0, viewportY: 0 });
                            } else {
                                _ElementUtilities._zoomTo(this._viewportEl, { contentX: 0, contentY: targetScrollPosition, viewportX: 0, viewportY: 0 });
                            }

                            this._closeSplitIfOpen();
                        }
                    }
                },

                _MSManipulationStateChangedHandler: function NavBarContainer_MSManipulationStateChangedHandler(e) {
                    this._currentManipulationState = e.currentState;

                    if (e.currentState === e.MS_MANIPULATION_STATE_ACTIVE) {
                        this._viewportEl.style.msScrollSnapType = "";
                        this._zooming = false;
                    }

                    _Global.clearTimeout(this._manipulationStateTimeoutId);
                    // The extra stop event is firing when an zoomTo is called during another zoomTo and
                    // also the first zoomTo after a resize.
                    if (e.currentState === e.MS_MANIPULATION_STATE_STOPPED) {
                        this._manipulationStateTimeoutId = _Global.setTimeout(function () {
                            this._viewportEl.style.msScrollSnapType = "";
                            this._zooming = false;
                            this._updateCurrentIndexIfPageChanged();
                        }.bind(this), 100);
                    }
                },

                _scrollHandler: function NavBarContainer_scrollHandler() {
                    if (this._disposed) { return; }
                    
                    this._measured = false;
                    if (!this._checkingScroll) {
                        var that = this;
                        this._checkingScroll = _Global.requestAnimationFrame(function () {
                            if (that._disposed) { return; }
                            that._checkingScroll = null;

                            var newScrollPosition = _ElementUtilities.getScrollPosition(that._viewportEl)[(that.layout === _UI.Orientation.horizontal ? "scrollLeft" : "scrollTop")];
                            if (newScrollPosition !== that._scrollPosition) {
                                that._scrollPosition = newScrollPosition;
                                that._closeSplitIfOpen();
                            }
                            that._updatePageUI();

                            if (!that._zooming && that._currentManipulationState === MS_MANIPULATION_STATE_STOPPED) {
                                that._updateCurrentIndexIfPageChanged();
                            }
                        });
                    }
                },

                _updateCurrentIndexIfPageChanged: function NavBarContainer_updateCurrentIndexIfPageChanged() {
                    // If you change pages via pagination arrows, mouse wheel, or panning we need to update the current
                    // item to be the first item on the new page.
                    if (this.layout === _UI.Orientation.horizontal) {
                        this._measure();
                        var currentPage = this._currentPage;
                        var firstIndexOnPage = currentPage * this._sizes.rowsPerPage * this._sizes.columnsPerPage;
                        var lastIndexOnPage = (currentPage + 1) * this._sizes.rowsPerPage * this._sizes.columnsPerPage - 1;

                        if (this._keyboardBehavior.currentIndex < firstIndexOnPage || this._keyboardBehavior.currentIndex > lastIndexOnPage) {
                            // Page change occurred.
                            this._keyboardBehavior.currentIndex = firstIndexOnPage;
                            if (this._surfaceEl.children.length > 0) {
                                this._surfaceEl.children[this._keyboardBehavior.currentIndex].winControl._splitButtonActive = false;
                            }

                            if (this.element.contains(_Global.document.activeElement)) {
                                this._keyboardBehavior._focus(this._keyboardBehavior.currentIndex);
                            }
                        }
                    }
                },

                _measure: function NavBarContainer_measure() {
                    if (!this._measured) {
                        this._resizeImpl();
                        this._writeProfilerMark("measure,StartTM");

                        var sizes = this._sizes;

                        sizes.rtl = _Global.getComputedStyle(this._element).direction === "rtl";

                        var itemCount = this._surfaceEl.children.length;
                        if (itemCount > 0) {
                            if (!this._sizes.itemMeasured) {
                                this._writeProfilerMark("measureItem,StartTM");

                                var elementToMeasure = this._surfaceEl.firstElementChild;
                                // Clear inline margins set by NavBarContainer before measuring.
                                elementToMeasure.style.margin = "";
                                elementToMeasure.style.width = "";
                                var elementComputedStyle = _Global.getComputedStyle(elementToMeasure);
                                sizes.itemOffsetWidth = parseFloat(_Global.getComputedStyle(elementToMeasure).width);
                                if (elementToMeasure.offsetWidth === 0) {
                                    sizes.itemOffsetWidth = 0;
                                }
                                sizes.itemMarginLeft = parseFloat(elementComputedStyle.marginLeft);
                                sizes.itemMarginRight = parseFloat(elementComputedStyle.marginRight);
                                sizes.itemWidth = sizes.itemOffsetWidth + sizes.itemMarginLeft + sizes.itemMarginRight;
                                sizes.itemOffsetHeight = parseFloat(_Global.getComputedStyle(elementToMeasure).height);
                                if (elementToMeasure.offsetHeight === 0) {
                                    sizes.itemOffsetHeight = 0;
                                }
                                sizes.itemMarginTop = parseFloat(elementComputedStyle.marginTop);
                                sizes.itemMarginBottom = parseFloat(elementComputedStyle.marginBottom);
                                sizes.itemHeight = sizes.itemOffsetHeight + sizes.itemMarginTop + sizes.itemMarginBottom;
                                if (sizes.itemOffsetWidth > 0 && sizes.itemOffsetHeight > 0) {
                                    sizes.itemMeasured = true;
                                }
                                this._writeProfilerMark("measureItem,StopTM");
                            }

                            sizes.viewportOffsetWidth = parseFloat(_Global.getComputedStyle(this._viewportEl).width);
                            if (this._viewportEl.offsetWidth === 0) {
                                sizes.viewportOffsetWidth = 0;
                            }
                            sizes.viewportOffsetHeight = parseFloat(_Global.getComputedStyle(this._viewportEl).height);
                            if (this._viewportEl.offsetHeight === 0) {
                                sizes.viewportOffsetHeight = 0;
                            }

                            if (sizes.viewportOffsetWidth === 0 || sizes.itemOffsetHeight === 0) {
                                this._measured = false;
                            } else {
                                this._measured = true;
                            }

                            if (this.layout === _UI.Orientation.horizontal) {
                                this._scrollPosition = _ElementUtilities.getScrollPosition(this._viewportEl).scrollLeft;

                                sizes.leadingEdge = this._leftArrowEl.offsetWidth + parseInt(_Global.getComputedStyle(this._leftArrowEl).marginLeft) + parseInt(_Global.getComputedStyle(this._leftArrowEl).marginRight);
                                var usableSpace = sizes.viewportOffsetWidth - sizes.leadingEdge * 2;
                                sizes.maxColumns = sizes.itemWidth ? Math.max(1, Math.floor(usableSpace / sizes.itemWidth)) : 1;
                                sizes.rowsPerPage = Math.min(this.maxRows, Math.ceil(itemCount / sizes.maxColumns));
                                sizes.columnsPerPage = Math.min(sizes.maxColumns, itemCount);
                                sizes.pages = Math.ceil(itemCount / (sizes.columnsPerPage * sizes.rowsPerPage));
                                sizes.trailingEdge = sizes.leadingEdge;
                                sizes.extraSpace = usableSpace - (sizes.columnsPerPage * sizes.itemWidth);

                                this._scrollLength = sizes.viewportOffsetWidth * sizes.pages;

                                this._keyboardBehavior.fixedSize = sizes.rowsPerPage;
                                this._keyboardBehavior.fixedDirection = _KeyboardBehavior._KeyboardBehavior.FixedDirection.height;

                                this._surfaceEl.style.height = (sizes.itemHeight * sizes.rowsPerPage) + "px";
                                this._surfaceEl.style.width = this._scrollLength + "px";
                            } else {
                                this._scrollPosition = this._viewportEl.scrollTop;

                                sizes.leadingEdge = 0;
                                sizes.rowsPerPage = itemCount;
                                sizes.columnsPerPage = 1;
                                sizes.pages = 1;
                                sizes.trailingEdge = 0;

                                // Reminder there is margin collapsing so just use scrollHeight instead of itemHeight * itemCount
                                this._scrollLength = this._viewportEl.scrollHeight;

                                this._keyboardBehavior.fixedSize = sizes.columnsPerPage;
                                this._keyboardBehavior.fixedDirection = _KeyboardBehavior._KeyboardBehavior.FixedDirection.width;

                                this._surfaceEl.style.height = "";
                                this._surfaceEl.style.width = "";
                            }

                            this._updateGridStyles();
                        } else {
                            sizes.pages = 1;
                            this._hasPreviousContent = false;
                            this._hasNextContent = false;
                            this._surfaceEl.style.height = "";
                            this._surfaceEl.style.width = "";
                        }

                        this._writeProfilerMark("measure,StopTM");
                    }
                },

                _updateGridStyles: function NavBarContainer_updateGridStyles() {
                    var sizes = this._sizes;
                    var itemCount = this._surfaceEl.children.length;

                    for (var index = 0; index < itemCount; index++) {
                        var itemEl = this._surfaceEl.children[index];

                        var marginRight;
                        var marginLeft;
                        var width = "";

                        if (this.layout === _UI.Orientation.horizontal) {
                            var column = Math.floor(index / sizes.rowsPerPage);
                            var isFirstColumnOnPage = column % sizes.columnsPerPage === 0;
                            var isLastColumnOnPage = column % sizes.columnsPerPage === sizes.columnsPerPage - 1;

                            var extraTrailingMargin = sizes.trailingEdge;
                            if (this.fixedSize) {
                                extraTrailingMargin += sizes.extraSpace;
                            } else {
                                var spaceToDistribute = sizes.extraSpace - (sizes.maxColumns - sizes.columnsPerPage) * sizes.itemWidth;
                                width = (sizes.itemOffsetWidth + (spaceToDistribute / sizes.maxColumns)) + "px";
                            }
                            
                            var extraMarginRight;
                            var extraMarginLeft;

                            if (sizes.rtl) {
                                extraMarginRight = (isFirstColumnOnPage ? sizes.leadingEdge : 0);
                                extraMarginLeft = (isLastColumnOnPage ? extraTrailingMargin : 0);
                            } else {
                                extraMarginRight = (isLastColumnOnPage ? extraTrailingMargin : 0);
                                extraMarginLeft = (isFirstColumnOnPage ? sizes.leadingEdge : 0);
                            }

                            marginRight = extraMarginRight + sizes.itemMarginRight + "px";
                            marginLeft = extraMarginLeft + sizes.itemMarginLeft + "px";
                        } else {
                            marginRight = "";
                            marginLeft = "";
                        }
                        
                        if (itemEl.style.marginRight !== marginRight) {
                            itemEl.style.marginRight = marginRight;
                        }
                        if (itemEl.style.marginLeft !== marginLeft) {
                            itemEl.style.marginLeft = marginLeft;
                        }
                        if (itemEl.style.width !== width) {
                            itemEl.style.width = width;
                        }
                    }
                },

                _updatePageUI: function NavBarContainer_updatePageUI() {
                    this._measure();
                    var currentPage = this._currentPage;

                    this._hasPreviousContent = (currentPage !== 0);
                    this._hasNextContent = (currentPage < this._sizes.pages - 1);
                    this._updateArrows();

                    // Always output the pagination indicators so they reserves up space.
                    if (this._indicatorCount !== this._sizes.pages) {
                        this._indicatorCount = this._sizes.pages;
                        this._pageindicatorsEl.innerHTML = new Array(this._sizes.pages + 1).join('<span class="' + NavBarContainer._ClassName.indicator + '"></span>');
                    }

                    for (var i = 0; i < this._pageindicatorsEl.children.length; i++) {
                        if (i === currentPage) {
                            _ElementUtilities.addClass(this._pageindicatorsEl.children[i], NavBarContainer._ClassName.currentindicator);
                        } else {
                            _ElementUtilities.removeClass(this._pageindicatorsEl.children[i], NavBarContainer._ClassName.currentindicator);
                        }
                    }

                    if (this._sizes.pages > 1) {
                        this._viewportEl.style.overflowX = "";
                        this._pageindicatorsEl.style.visibility = "";
                    } else {
                        this._viewportEl.style.overflowX = "hidden";
                        this._pageindicatorsEl.style.visibility = "hidden";
                    }

                    if (this._sizes.pages <= 1 || this._layout !== _UI.Orientation.horizontal) {
                        this._ariaStartMarker.removeAttribute("aria-flowto");
                        this._ariaEndMarker.removeAttribute("x-ms-aria-flowfrom");
                    } else {
                        var firstIndexOnCurrentPage = currentPage * this._sizes.rowsPerPage * this._sizes.columnsPerPage;
                        var firstItem = this._surfaceEl.children[firstIndexOnCurrentPage].winControl._buttonEl;
                        _ElementUtilities._ensureId(firstItem);
                        this._ariaStartMarker.setAttribute("aria-flowto", firstItem.id);

                        var lastIndexOnCurrentPage = Math.min(this._surfaceEl.children.length - 1, (currentPage + 1) * this._sizes.rowsPerPage * this._sizes.columnsPerPage - 1);
                        var lastItem = this._surfaceEl.children[lastIndexOnCurrentPage].winControl._buttonEl;
                        _ElementUtilities._ensureId(lastItem);
                        this._ariaEndMarker.setAttribute("x-ms-aria-flowfrom", lastItem.id);
                    }
                },

                _closeSplitIfOpen: function NavBarContainer_closeSplitIfOpen() {
                    if (this._currentSplitNavItem) {
                        if (this._currentSplitNavItem.splitOpened) {
                            this._currentSplitNavItem._toggleSplit();
                        }
                        this._currentSplitNavItem = null;
                    }
                },

                _updateArrows: function NavBarContainer_updateArrows() {
                    var hasLeftContent = this._sizes.rtl ? this._hasNextContent : this._hasPreviousContent;
                    var hasRightContent = this._sizes.rtl ? this._hasPreviousContent : this._hasNextContent;

                    var that = this;
                    // Previous and next are the arrows, not states. On mouse hover the arrows fade in immediately. If you 
                    // mouse out the arrows fade out after a delay. When you reach the last/first page, the corresponding 
                    // arrow fades out immediately as well.
                    if (this._mouseInViewport && hasLeftContent) {
                        this._leftArrowWaitingToFadeOut && this._leftArrowWaitingToFadeOut.cancel();
                        this._leftArrowWaitingToFadeOut = null;
                        this._leftArrowFadeOut && this._leftArrowFadeOut.cancel();
                        this._leftArrowFadeOut = null;
                        this._leftArrowEl.style.visibility = '';
                        this._leftArrowFadeIn = this._leftArrowFadeIn || Animations.fadeIn(this._leftArrowEl);
                    } else {
                        if (hasLeftContent) {
                            // If we need a delayed fade out and we are already running a delayed fade out just use that one, don't extend it.
                            // Otherwise create a delayed fade out.
                            this._leftArrowWaitingToFadeOut = this._leftArrowWaitingToFadeOut || Promise.timeout(_TransitionAnimation._animationTimeAdjustment(buttonFadeDelay));
                        } else {
                            // If we need a immediate fade out and already have a delayed fade out cancel that one and create an immediate one.
                            this._leftArrowWaitingToFadeOut && this._leftArrowWaitingToFadeOut.cancel();
                            this._leftArrowWaitingToFadeOut = Promise.wrap();
                        }
                        this._leftArrowWaitingToFadeOut.then(function () {
                            // After the delay cancel any fade in if running. If we already were fading out continue it otherwise start the fade out.
                            this._leftArrowFadeIn && this._leftArrowFadeIn.cancel();
                            this._leftArrowFadeIn = null;
                            this._leftArrowFadeOut = this._leftArrowFadeOut || Animations.fadeOut(this._leftArrowEl).then(function () {
                                that._leftArrowEl.style.visibility = 'hidden';
                            });
                        }.bind(this));
                    }

                    // Same pattern for Next arrow.
                    if (this._mouseInViewport && hasRightContent) {
                        this._rightArrowWaitingToFadeOut && this._rightArrowWaitingToFadeOut.cancel();
                        this._rightArrowWaitingToFadeOut = null;
                        this._rightArrowFadeOut && this._rightArrowFadeOut.cancel();
                        this._rightArrowFadeOut = null;
                        this._rightArrowEl.style.visibility = '';
                        this._rightArrowFadeIn = this._rightArrowFadeIn || Animations.fadeIn(this._rightArrowEl);
                    } else {
                        if (hasRightContent) {
                            this._rightArrowWaitingToFadeOut = this._rightArrowWaitingToFadeOut || Promise.timeout(_TransitionAnimation._animationTimeAdjustment(buttonFadeDelay));
                        } else {
                            this._rightArrowWaitingToFadeOut && this._rightArrowWaitingToFadeOut.cancel();
                            this._rightArrowWaitingToFadeOut = Promise.wrap();
                        }
                        this._rightArrowWaitingToFadeOut.then(function () {
                            this._rightArrowFadeIn && this._rightArrowFadeIn.cancel();
                            this._rightArrowFadeIn = null;
                            this._rightArrowFadeOut = this._rightArrowFadeOut || Animations.fadeOut(this._rightArrowEl).then(function () {
                                that._rightArrowEl.style.visibility = 'hidden';
                            });
                        }.bind(this));
                    }
                },

                _navbarCommandInvokedHandler: function NavBarContainer_navbarCommandInvokedHandler(ev) {
                    var srcElement = ev.target;
                    var index = -1;
                    while (srcElement) {
                        index++;
                        srcElement = srcElement.previousSibling;
                    }

                    this._fireEvent(NavBarContainer._EventName.invoked, {
                        index: index,
                        navbarCommand: ev.target.winControl,
                        data: this._repeater ? this._repeater.data.getAt(index) : null
                    });
                },

                _navbarCommandSplitToggleHandler: function NavBarContainer_navbarCommandSplitToggleHandler(ev) {
                    var srcElement = ev.target;
                    var index = -1;
                    while (srcElement) {
                        index++;
                        srcElement = srcElement.previousSibling;
                    }

                    var navbarCommand = ev.target.winControl;

                    this._closeSplitIfOpen();

                    if (navbarCommand.splitOpened) {
                        this._currentSplitNavItem = navbarCommand;
                    }

                    this._fireEvent(NavBarContainer._EventName.splitToggle, {
                        opened: navbarCommand.splitOpened,
                        index: index,
                        navbarCommand: navbarCommand,
                        data: this._repeater ? this._repeater.data.getAt(index) : null
                    });
                },

                _fireEvent: function NavBarContainer_fireEvent(type, detail) {
                    var event = _Global.document.createEvent("CustomEvent");
                    event.initCustomEvent(type, true, false, detail);
                    this.element.dispatchEvent(event);
                },

                _writeProfilerMark: function NavBarContainer_writeProfilerMark(text) {
                    var message = "WinJS.UI.NavBarContainer:" + this._id + ":" + text;
                    _WriteProfilerMark(message);
                    _Log.log && _Log.log(message, null, "navbarcontainerprofiler");
                },

                dispose: function NavBarContainer_dispose() {
                    /// <signature helpKeyword="WinJS.UI.NavBarContainer.dispose">
                    /// <summary locid="WinJS.UI.NavBarContainer.dispose">
                    /// Disposes this control.
                    /// </summary>
                    /// <compatibleWith platform="Windows" minVersion="8.1"/>
                    /// </signature>
                    if (this._disposed) {
                        return;
                    }
                    this._disposed = true;

                    if (this._appBarEl) {
                        this._appBarEl.removeEventListener('beforeshow', this._closeSplitAndResetBound);
                        this._appBarEl.removeEventListener('beforeshow', this._resizeImplBound);
                    }

                    Navigation.removeEventListener('navigated', this._closeSplitAndResetBound);

                    this._leftArrowWaitingToFadeOut && this._leftArrowWaitingToFadeOut.cancel();
                    this._leftArrowFadeOut && this._leftArrowFadeOut.cancel();
                    this._leftArrowFadeIn && this._leftArrowFadeIn.cancel();
                    this._rightArrowWaitingToFadeOut && this._rightArrowWaitingToFadeOut.cancel();
                    this._rightArrowFadeOut && this._rightArrowFadeOut.cancel();
                    this._rightArrowFadeIn && this._rightArrowFadeIn.cancel();

                    _ElementUtilities._resizeNotifier.unsubscribe(this._element, this._boundResizeHandler);

                    this._removeDataChangingEvents();
                    this._removeDataChangedEvents();
                }
            }, {
                // Names of classes used by the NavBarContainer.
                _ClassName: {
                    navbarcontainer: "win-navbarcontainer",
                    pageindicators: "win-navbarcontainer-pageindicator-box",
                    indicator: "win-navbarcontainer-pageindicator",
                    currentindicator: "win-navbarcontainer-pageindicator-current",
                    vertical: "win-navbarcontainer-vertical",
                    horizontal: "win-navbarcontainer-horizontal",
                    viewport: "win-navbarcontainer-viewport",
                    surface: "win-navbarcontainer-surface",
                    navarrow: "win-navbarcontainer-navarrow",
                    navleftarrow: "win-navbarcontainer-navleft",
                    navrightarrow: "win-navbarcontainer-navright"
                },
                _EventName: {
                    invoked: eventNames.invoked,
                    splitToggle: eventNames.splittoggle
                }
            });
            _Base.Class.mix(NavBarContainer, _Control.DOMEventMixin);
            return NavBarContainer;
        })
    });

});

// Copyright (c) Microsoft Open Technologies, Inc.  All Rights Reserved. Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
define('WinJS/Controls/NavBar',[
    '../Core/_Global',
    '../Core/_WinRT',
    '../Core/_Base',
    '../Core/_BaseUtils',
    '../Core/_Events',
    '../Core/_WriteProfilerMark',
    '../Promise',
    '../Scheduler',
    '../Utilities/_ElementUtilities',
    './AppBar',
    './NavBar/_Command',
    './NavBar/_Container',
    'require-style!less/desktop/controls',
    'require-style!less/phone/controls'
], function NavBarInit(_Global,_WinRT, _Base, _BaseUtils, _Events, _WriteProfilerMark, Promise, Scheduler, _ElementUtilities, AppBar, _Command, _Container) {
    "use strict";

    var customLayout = "custom";

    _Base.Namespace.define("WinJS.UI", {
        /// <field>
        /// <summary locid="WinJS.UI.NavBar">
        /// Displays navigation commands in a toolbar that the user can show or hide.
        /// </summary>
        /// <compatibleWith platform="Windows" minVersion="8.1"/>
        /// </field>
        /// <icon src="ui_winjs.ui.navbar.12x12.png" width="12" height="12" />
        /// <icon src="ui_winjs.ui.navbar.16x16.png" width="16" height="16" />
        /// <htmlSnippet supportsContent="true"><![CDATA[<div data-win-control="WinJS.UI.NavBar">
        /// <div data-win-control="WinJS.UI.NavBarContainer">
        /// <div data-win-control="WinJS.UI.NavBarCommand" data-win-options="{location:'/pages/home/home.html',label:'Home',icon:WinJS.UI.AppBarIcon.home}"></div>
        /// </div>
        /// </div>]]></htmlSnippet>
        /// <event name="beforeshow" locid="WinJS.UI.NavBar_e:beforeshow">Raised just before showing the NavBar.</event>
        /// <event name="aftershow" locid="WinJS.UI.NavBar_e:aftershow">Raised immediately after an NavBar is fully shown.</event>
        /// <event name="beforehide" locid="WinJS.UI.NavBar_e:beforehide">Raised just before hiding the  NavBar.</event>
        /// <event name="afterhide" locid="WinJS.UI.NavBar_e:afterhide">Raised immediately after the NavBar is fully hidden.</event>
        /// <event name="childrenprocessed" locid="WinJS.UI.NavBar_e:childrenprocessed">Fired when children of NavBar control have been processed from a WinJS.UI.processAll call.</event>
        /// <part name="navbar" class="win-navbar" locid="WinJS.UI.NavBar_part:navbar">Styles the entire NavBar.</part>
        /// <resource type="javascript" src="//$(TARGET_DESTINATION)/js/base.js" shared="true" />
        /// <resource type="javascript" src="//$(TARGET_DESTINATION)/js/ui.js" shared="true" />
        /// <resource type="css" src="//$(TARGET_DESTINATION)/css/ui-dark.css" shared="true" />
        NavBar: _Base.Namespace._lazy(function () {
            var childrenProcessedEventName = "childrenprocessed";
            var createEvent = _Events._createEventProperty;

            var NavBar = _Base.Class.derive(AppBar.AppBar, function NavBar_ctor(element, options) {
                /// <signature helpKeyword="WinJS.UI.NavBar.NavBar">
                /// <summary locid="WinJS.UI.NavBar.constructor">
                /// Creates a new NavBar.
                /// </summary>
                /// <param name="element" type="HTMLElement" domElement="true" locid="WinJS.UI.NavBar.constructor_p:element">
                /// The DOM element that will host the new NavBar control.
                /// </param>
                /// <param name="options" type="Object" locid="WinJS.UI.NavBar.constructor_p:options">
                /// An object that contains one or more property/value pairs to apply to the new control. Each property of the options object corresponds to one of the control's
                /// properties or events.
                /// </param>
                /// <returns type="WinJS.UI.NavBar" locid="WinJS.UI.NavBar.constructor_returnValue">
                /// The new NavBar control.
                /// </returns>
                /// <compatibleWith platform="Windows" minVersion="8.1"/>
                /// </signature>

                options = options || {};

                // Shallow copy object so we can modify it.
                options = _BaseUtils._shallowCopy(options);

                // Default to Placement = Top and Layout = Custom
                options.placement = options.placement || "top";
                options.layout = customLayout;

                AppBar.AppBar.call(this, element, options);

                this._element.addEventListener("beforeshow", this._handleBeforeShow.bind(this));

                _ElementUtilities.addClass(this.element, NavBar._ClassName.navbar);

                if (_WinRT.Windows.ApplicationModel.DesignMode.designModeEnabled) {
                    this._processChildren();
                } else {
                    Scheduler.schedule(this._processChildren.bind(this), Scheduler.Priority.idle, null, "WinJS.UI.NavBar.processChildren");
                }
            }, {
                // Block others from setting the layout property.

                /// <field type="String" defaultValue="commands" oamOptionsDatatype="WinJS.UI.NavBar.layout" locid="WinJS.UI.NavBar.layout" helpKeyword="WinJS.UI.NavBar.layout">
                /// The layout of the NavBar contents.
                /// <compatibleWith platform="Windows" minVersion="8.1"/>
                /// </field>
                layout: {
                    get: function () {
                        return customLayout;
                    },
                    set: function () {
                        Object.getOwnPropertyDescriptor(AppBar.AppBar.prototype, "layout").set.call(this, customLayout);
                    },
                },

                /// <field type="Function" locid="WinJS.UI.NavBar.onchildrenprocessed" helpKeyword="WinJS.UI.NavBar.onchildrenprocessed">
                /// Raised when children of NavBar control have been processed by a WinJS.UI.processAll call.
                /// <compatibleWith platform="Windows" minVersion="8.1"/>
                /// </field>
                onchildrenprocessed: createEvent(childrenProcessedEventName),

                _processChildren: function NavBar_processChildren() {
                    // The NavBar control schedules processAll on its children at idle priority to avoid hurting startup
                    // performance. If the NavBar is shown before the scheduler gets to the idle job, the NavBar will
                    // immediately call processAll on its children. If your app needs the children to be processed before
                    // the scheduled job executes, you may call processChildren to force the processAll call.
                    if (!this._processed) {
                        this._processed = true;

                        this._writeProfilerMark("processChildren,StartTM");
                        var that = this;
                        var processed = Promise.as();
                        if (this._processors) {
                            this._processors.forEach(function (processAll) {
                                for (var i = 0, len = that.element.children.length; i < len; i++) {
                                    (function (child) {
                                        processed = processed.then(function () {
                                            processAll(child);
                                        });
                                    }(that.element.children[i]));
                                }
                            });
                        }
                        return processed.then(
                            function () {
                                that._writeProfilerMark("processChildren,StopTM");
                                that._fireEvent(NavBar._EventName.childrenProcessed);
                            },
                            function () {
                                that._writeProfilerMark("processChildren,StopTM");
                                that._fireEvent(NavBar._EventName.childrenProcessed);
                            }
                        );
                    }
                    return Promise.wrap();
                },

                _show: function NavBar_show() {
                    // Override _show to call processChildren first.
                    //
                    if (this.disabled) {
                        return;
                    }
                    var that = this;
                    this._processChildren().then(function () {
                        AppBar.AppBar.prototype._show.call(that);
                    });
                },

                _handleBeforeShow: function NavBar_handleBeforeShow() {
                    // Navbar needs to ensure its elements to have their correct height and width after AppBar changes display="none"
                    // to  display="" and AppBar needs the elements to have their final height before it measures its own element height
                    // to do the slide in animation over the correct amount of pixels.
                    if (this._disposed) {
                        return;
                    }

                    var navbarcontainerEls = this.element.querySelectorAll('.win-navbarcontainer');
                    for (var i = 0; i < navbarcontainerEls.length; i++) {
                        navbarcontainerEls[i].winControl.forceLayout();
                    }
                },

                _fireEvent: function NavBar_fireEvent(type, detail) {
                    var event = _Global.document.createEvent("CustomEvent");
                    event.initCustomEvent(type, true, false, detail || {});
                    this.element.dispatchEvent(event);
                },

                _writeProfilerMark: function NavBar_writeProfilerMark(text) {
                    _WriteProfilerMark("WinJS.UI.NavBar:" + this._id + ":" + text);
                }
            }, {
                _ClassName: {
                    navbar: "win-navbar"
                },
                _EventName: {
                    childrenProcessed: childrenProcessedEventName
                },
                isDeclarativeControlContainer: _BaseUtils.markSupportedForProcessing(function (navbar, callback) {
                    if (navbar._processed) {
                        for (var i = 0, len = navbar.element.children.length; i < len; i++) {
                            callback(navbar.element.children[i]);
                        }
                    } else {
                        navbar._processors = navbar._processors || [];
                        navbar._processors.push(callback);
                    }
                })
            });

            return NavBar;
        })
    });

});

define('require-style!less/animation-library',[],function(){});

define('require-style!less/typography',[],function(){});

define('require-style!less/desktop/styles-intrinsic',[],function(){});

define('require-style!less/desktop/colors-intrinsic',[],function(){});
