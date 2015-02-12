define(['prototype/widget', 'prototype/model'],
function (Widget, Model) {

    function AddItemBox (data) {
        this.model = new Model(data);
        this.view = new View();

        this.view.addBtn.addEventListener('click', function(evt){
            this.model.push({title: this.view.input.value, completed: false});
            this.view.input.value = '';
        }.bind(this));

        Widget.call(this);
    }

    function View () {
        this.dom = document.createElement('div');
        this.input = document.createElement('input');
        this.addBtn = document.createElement('button');
        this.addBtn.textContent = 'Add';

        this.dom.appendChild(this.input);
        this.dom.appendChild(this.addBtn);
    }

    AddItemBox.prototype = Object.create(Widget.prototype);

    return AddItemBox;
});
