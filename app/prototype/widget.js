define(['prototype/component'],
function(Component) {
    'use strict';
    var Widget = function(args){
        Component.call(this, args);
    };
    
    Widget.prototype = Object.create(Component.prototype);

    return Widget;
});