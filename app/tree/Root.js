define(['prototype/widget'], 
function (Widget) {

    function Body () {
        this.view = new View();
        this.children = {

        };

        this.init = function () {
            
        };
    }

    function View () {
        this.dom = document.createElement('div');
        this.dom.classList.add('root-widget');
    }

    Root.prototype = Object.create(Widget.prototype);

    return Root;
});