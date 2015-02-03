define(['lib/logger', 'playback/view/prototype/component'],
function(Logger, Component) {
    'use strict';

    function ProgressBar (args) {

        /* Public */

        this.name = args.id;
        this.view = new View(args.id);

        this.setProgress = function (procent) {
            if (procent < 0) {procent = 0;}
            if (procent > 1) {procent = 1;}

            this.view.progress.style.width = this.view.dom.offsetWidth*procent + 'px';
            
            return procent;
        };

    }


    /****** VIEW ******/

    function View (name) {
        this.dom = document.createElement('div');
        this.dom.classList.add(name.toLowerCase() + '-progressbar');
        this.dom.classList.add('progressbar-control');
        this.progress = document.createElement('div');
        this.progress.classList.add('progress');
        this.dom.appendChild(this.progress);
    }

    ProgressBar.prototype = Object.create(Component.prototype);

    return ProgressBar;
});