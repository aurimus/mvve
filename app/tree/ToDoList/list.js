define(['prototype/widget', 'tree/ToDoList/item'],
function (Widget, Item) {

    function List (args) {
        this.model = args.model;
        this.view = new View();

        this.children = [];
        this.model.forEach(function(item){
            this.children.push( new Item(item) );
        }, this);

    }

    function View () {
        this.dom = document.createElement('div');
        this.dom.classList.add('todolist');
    }

    List.prototype = Object.create(Widget.prototype);

    return List;
});
