define(['prototype/widget', 'tree/ToDoList/list'],
function (Widget, List) {

    function Root (args) {
        this.model = args.model.todos;
        this.view = new View();
        this.children = [
            new List({model: this.model}),
            new List({model: this.model}),
            new List({model: this.model}),
            new List({model: this.model}),
            new List({model: this.model}),
            new List({model: this.model}),
            new List({model: this.model}),
            new List({model: this.model}),
            new List({model: this.model}),
            new List({model: this.model}),
        ];
    }

    function View () {
        this.dom = document.createElement('div');
        this.dom.classList.add('root');
    }

    Root.prototype = Object.create(Widget.prototype);

    return Root;
});
