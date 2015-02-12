define(['prototype/widget',
        'prototype/model',
        'tree/ToDoList/list',
        'tree/ToDoList/addItemBox'],
function (Widget, Model, List, AddItemBox) {

    function Root (data) {
        this.model = new Model(data);
        this.view = new View();

        this.addSubWidget([
            new AddItemBox(data),
            new List(data),
            new List(data)
        ])

        Widget.call(this);
    }

    function View () {
        this.dom = document.createElement('div');
        this.dom.classList.add('root');
    }

    Root.prototype = Object.create(Widget.prototype);

    return Root;
});
