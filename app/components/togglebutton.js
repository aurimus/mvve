define(['prototype/component'],
function(Component) {
    'use strict';

    function ToggleButton (args) {
        this.view = new View(args.id);

        this.onClass = args.classes ? args.classes.on : args.id;
        this.offClass = args.classes && args.classes.off ? args.classes.off : 'not' + args.id;

        this.onTitle = args.titles ? args.titles.on : args.id;
        this.offTitle = args.titles && args.titles.off ? args.titles.off : 'not' + args.id;

        this.state = args.onByDefault ? true : false;

        var toggleEvt = new CustomEvent('toggle', {detail: {}, bubbles: true});
        this.view.dom.addEventListener('click', function (evt) {
            toggleEvt.detail.newStateOn = !this.state;
            this.view.dom.dispatchEvent(toggleEvt);
            evt.stopPropagation();
        }.bind(this));

        this.setOn = function (state) {
            this.state = state;
            this.view.dom.classList.add(state ? this.onClass : this.offClass);
            this.view.dom.classList.remove(state ? this.offClass: this.onClass);
            this.view.dom.setAttribute('title', state ? this.onTitle : this.offTitle);
            this.view.dom.setAttribute('title', state ? this.offTitle: this.onTitle);
            this.view.dom.setAttribute('aria-label', state ? this.onTitle : this.offTitle);
            this.view.dom.setAttribute('aria-label', state ? this.offTitle: this.onTitle);
        };

        this.init = function () {
            this.setOn(this.state);
        };
    }

    function View (name) {
        this.dom = document.createElement('div');
        this.dom.classList.add(name.toLowerCase() + '-toggle');
        this.dom.classList.add('control-toggle-button');
    }

    ToggleButton.prototype = Object.create(Component.prototype);

    return ToggleButton;
});