define(['lib/lodash', 'prototype/component'],
function (_, Component) {
    'use strict';

    function Element (args) {
        this.data = args.data ? args.data : null;
        this.view = new View(args.id);

        if (args.template) {
            var templateFn;

            this.setTemplate = function(tmpl) {
                templateFn = _.template(tmpl, null, { variable: 'data' });
            };

            this.update = function(newData) {
                this.view.dom.innerHTML = templateFn( newData ? newData : this.data );
            };

            this.init = function() {
                if (this.data) { this.update(this.data); }
            };

            this.setTemplate(args.template);
        } else if (args.content) {
            this.view.dom.innerHTML = args.content;

            this.setContent = function(content) {
                this.view.dom.innerHTML = content;
            };
        }
    }

    function View (id) {
        this.dom = document.createElement('div');
        this.dom.classList.add(id.toLowerCase());
        this.dom.classList.add('control-element');
    }

    Element.prototype = Object.create(Component.prototype);

    return Element;
});
