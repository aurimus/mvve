define(['app/prototype/component'],
function(Component) {
    'use strict';
    var Widget = function(callbacks){
    	if (callbacks) {
	        if (typeof Object.observe == 'function') {
	            Object.observe(this.model.data, function(changes){
	                changes.forEach(function(change){
	                    if (change.type == 'update' && typeof callbacks.updates[change.name] == 'function'){
	                        callbacks.updates[change.name].call(this, this.model.data[change.name]);
	                    }
	                }, this);
	            }.bind(this));
	        }

	        if (typeof Array.observe == 'function') {
	            Array.observe(this.model.data, function(changes){
	                changes.forEach(function(change){
	                    if (change.type == 'splice' && change.addedCount > 0 && typeof callbacks.adds == 'function'){
	                    	callbacks.adds.call(this, change.object[change.index]);
	                    }
	                    if (change.type == 'splice' && change.removed.length > 0) {
	                    	change.removed.forEach(function (item, i) {
	                    		this.children[i].view.dom.detach();
	                    	}, this);
	                    }
	                }, this);
	            }.bind(this));
	        }
    	}
    };
    
    Widget.prototype = Object.create(Component.prototype);

    return Widget;
});