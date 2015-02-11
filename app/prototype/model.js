define([],
function() {
    'use strict';

    var Model = function(data) {
        this.data = data;
        if (!(typeof Object.observe == 'function')){
            
        }
    };

    Model.prototype.set = function(prop, val) {
        if (typeof Object.observe == 'function') {
            this.data[prop] = val;
        } else {

        }
    };

    Model.prototype.push = function(obj) {
        if (typeof Object.observe == 'function') {
            this.data.push(obj);
        } else {

        }
    };

    Model.prototype.delete = function(key) {
        if (typeof Object.observe == 'function') {
            if (this.data instanceof Array) {
                this.data.splice(key, 1);
            } else { delete this.data[key]; }
        }
    };

    return Model;
});
