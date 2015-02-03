define(['lib/logger'],
function(Logger) {
    'use strict';

    // TODO: Click or mouse release should not extend outside control when dragged out with mouse button down.

    var Component = function(args){
        this.view = new View(args.id);
    };

    function View (id) {
        this.dom = document.createElement('div');
        this.dom.className = id + '-widget';
    }

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

    return Component;
});