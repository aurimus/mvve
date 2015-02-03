define(['lib/logger', 'playback/view/prototype/component', 'lib/lodash', 'playback/view/helpers'],
function(Logger, Component, _, Helpers) {
    'use strict';

    function Container (args) {
        if (args.children) { this.children = args.children; }

        this.name = args;
        this.view = new View(args);
        this.isOpen = false;

        this.view.close.addEventListener('click', function (evt) {
            this.toggle();
        }.bind(this));

        this.toggle = function () {
            if (this.isOpen) {
                this.isOpen = false;
                this.view.dom.style.display = 'none';
            } else {
                this.isOpen = true;
                this.view.dom.style.display = 'block';
            }
        }
    }


    function View (args) {
        this.dom = document.createElement('div');
        this.dom.classList.add('container-component');
        this.dom.classList.add(args.id +'-container');

        this.dom.innerHTML = '<div class="header">\
                                <h3 class="title">'+ args.title +'</h3>\
                                <div class="close"></div>\
                              </div>';
        this.close = this.dom.querySelector('.close');
    }

    Container.prototype = Object.create(Component.prototype);

    return Container;
});