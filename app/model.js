define([], 
function () {

    function Model () {
        this.todos = [
            {title: 'Something', completed: false}
            {title: 'Something2', completed: true}
        ]
    }

    Root.prototype = Object.create(Widget.prototype);

    return Model;
});