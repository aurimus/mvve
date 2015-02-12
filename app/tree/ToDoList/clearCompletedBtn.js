define(['prototype/widget', 'prototype/model'],
function (Widget, Model) {

    function ClearCompletedBtn (data) {
        this.model = new Model(data);
        this.view = new View();

        this.view.dom.addEventListener('click', function(evt){
            this.model.data.forEach(function (item, i) {
                this.model.delete(i);
            }.bind(this));
        }.bind(this));

        Widget.call(this);
    }

    function View () {
        this.dom = document.createElement('button');
        this.dom.textContent = 'Clear Complted';
    }

    ClearCompletedBtn.prototype = Object.create(Widget.prototype);

    return ClearCompletedBtn;
});
