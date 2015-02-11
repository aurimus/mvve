define([],
function() {
    'use strict';

    var Component = function(){};

    Component.prototype.listen = function(handlers) {
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

    Component.prototype.addSubWidget = function(widgets, node) {
        var attach_point = node ? node : this.view.dom;
        if (!this.children) this.children = [];

        if (widgets instanceof Component) {
            var widget = widgets;
            append(widget);
            this.children.push(widget);
        } else if (widgets instanceof Array) widgets.forEach(function (w) {
                append(w);
                this.children.push(w);
            }, this);
        else if (widgets[Object.keys(widgets)[0]] instanceof Component) {
            for (var key in widgets) {
                append(widget[key]);
                this[key] = widgets[key];
            }
        }

        function append (widget) {
            attach_point.appendChild(widget.view.dom);
            if (typeof(widget.init) == 'function') { widget.init(); }
        }
    }

    return Component;
});
