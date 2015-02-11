define(['app/prototype/component'],
function(Component) {
    'use strict';

    function Checkbox (args) {
        this.view = new View(args);
        this.name = args.id;
        this.state = args.onByDefault ? true : false;

        var toggleEvt = new CustomEvent(args.id +'.toggle', {detail: {}, bubbles: true});
        this.view.checkbox.addEventListener('change', function (evt) {
            toggleEvt.detail.checked = evt.target.checked;
            this.view.checkbox.dispatchEvent(toggleEvt);
            evt.stopPropagation();
        }.bind(this));

        this.setOn = function (state) {
            this.state = state;
            this.view.checkbox.checked = state;
        };

        this.init = function () {
            this.setOn(this.state);
        };
    }

    function View (args) {
        this.dom = document.createElement('label');
        this.text = document.createTextNode(args.label);
        this.checkbox = document.createElement('input');
        this.checkbox.setAttribute('type', 'checkbox');
        this.checkbox.setAttribute('name', args.id);
        this.checkbox.classList.add(args.id.toLowerCase() + '-checkbox');
        this.checkbox.classList.add('checkbox-component');
        this.dom.appendChild(this.checkbox);
        this.dom.appendChild(this.text);
    }

    Checkbox.prototype = Object.create(Component.prototype);

    return Checkbox;
});
