define(['app/prototype/widget', 'app/tree/ToDoList/item', 'app/prototype/model'],
function (Widget, Item, Model) {

    function List (data) {
        this.model = new Model(data);
        this.view = new View();

        data.forEach(function(item_data){
            this.addSubWidget( new Item(item_data) );
        }, this);

        Widget.call(this, {
            adds: function (data) {
                this.addSubWidget(new Item(data));
            }
        });
    }

    function View () {
        this.dom = document.createElement('div');
        this.dom.classList.add('todolist');
    }

    List.prototype = Object.create(Widget.prototype);

    return List;
});
