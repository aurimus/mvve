define(['lib/logger', 'playback/view/prototype/component', 'lib/lodash', 'playback/view/helpers'],
function(Logger, Component, _, Helpers) {
    'use strict';

    function Section (args) {
        if (args.children) { this.children = args.children; }

        this.name = args.id;
        this.view = new View(args.id, args.title ? args.title : '');
    }


    function View (id, title) {
        this.dom = document.createElement('div');
        this.dom.classList.add('section-component');
        this.dom.classList.add(id + 'section');
        this.dom.innerHTML = '<hr/><div class="header">\
                                <h5 class="title">'+ title +'</h5>\
                              </div>';
    }

    Section.prototype = Object.create(Component.prototype);

    return Section;
});