define([],
function() {
    'use strict';

    var Component = function(args){
        Object.observe(this.model, function(changes){
            changes.forEach(function(change){
                if (typeof this['set_' + change.name] == 'function'){
                    this['set_' + change.name](this.model[change.name])
                }
            }, this);
        }.bind(this));
    };

    Component.prototype.events = function(handlers) {
        for (var evt in handlers){
            this.view.dom.addEventListener(evt, handlers[evt].bind(this));
        }
    };

    Component.prototype.detach = function() {
        if (this.view.dom.parentNode) {
            this.parentNode = this.view.dom.parentNode;
            this.siblingNode = this.view.dom.nextSibling;
            this.parentNode.removeChild(this.view.dom);
        }
    }

    Component.prototype.reattach = function(parentNode) {
        if (!this.view.dom.parentNode) {
            var parentNode = parentNode ? parentNode : this.parentNode;
            if (this.siblingNode){
                parentNode.insertBefore(this.view.dom, this.siblingNode);
            } else {
                parentNode.appendChild(this.view.dom);
            }
        }
    }

    Component.prototype.attach = function(container) {
        append(container, this);

        function append(parent, widget) {
            var dom = widget.view.dom;

            // Make all children
            if (widget.children instanceof Array) {
                widget.children.forEach(function(widget){
                    append(dom, widget);
                })
            } else if (widget.children instanceof Object) {
                for (var name in widget.children) {
                    append(dom, widget.children[name]);
                }
            }

            parent.appendChild(dom);

            // Initialize after dom is attached to the dom
            if (typeof(widget.init) == 'function') { widget.init(); }
        }

    }

    return Component;
});
