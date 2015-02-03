define(['prototype/widget'],
function(Widget) {
    'use strict';

    function Item (args) {
        this.model = args;
        this.view = new View({
            id: 'todoitem',
            label: this.model.title,
            checked: this.model.completed
        });

        this.view.checkbox.addEventListener('change', function(evt){
            this.model.completed = evt.target.checked;
        }.bind(this));

        this.set_completed = function (state) { this.view.checkbox.checked = state; }

        this.view.input.addEventListener('change', function(evt){
            this.model.title = evt.target.value;
        }.bind(this));

        this.set_title = function (title) { this.view.input.value = title; }

        Widget.call(this);
    }

    function View (args) {
        this.dom = document.createElement('label');
        this.input = document.createElement('input');
        this.input.setAttribute('value', args.label);

        this.checkbox = document.createElement('input');
        this.checkbox.setAttribute('type', 'checkbox');
        this.checkbox.setAttribute('name', args.id);
        this.checkbox.checked = args.checked;

        this.dom.appendChild(this.checkbox);
        this.dom.appendChild(this.input);
    }

    Item.prototype = Object.create(Widget.prototype);

    return Item;
});
