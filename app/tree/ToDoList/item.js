define(['app/prototype/widget', 'app/prototype/model'],
function(Widget, Model) {
    'use strict';

    function Item (data) {
        this.model = new Model(data);
        this.view = new View(data);

        this.view.input.addEventListener('focus', function(evt){
            this.model.set('completed', false);
        }.bind(this));

        this.view.checkbox.addEventListener('change', function(evt){
            this.model.set('completed', evt.target.checked);
        }.bind(this));

        this.view.input.addEventListener('change', function(evt){
            this.model.set('title', evt.target.value);
        }.bind(this));

        Widget.call(this, {
            updates: {
                completed: function (state) {
                    this.view.checkbox.checked = state;
                },
                title: function (title) {
                    this.view.input.value = title;
                }
            }
        });
    }

    function View (model) {
        this.dom = document.createElement('label');
        this.input = document.createElement('input');
        this.input.setAttribute('value', model.title);

        this.checkbox = document.createElement('input');
        this.checkbox.setAttribute('type', 'checkbox');
        this.checkbox.setAttribute('name', 'todoitem');
        this.checkbox.checked = model.completed;

        this.dom.appendChild(this.checkbox);
        this.dom.appendChild(this.input);
    }

    Item.prototype = Object.create(Widget.prototype);

    return Item;
});
