define(['lib/logger', 'playback/view/prototype/component', 'lib/lodash', 'playback/view/helpers'],
function(Logger, Component, _, Helpers) {
    'use strict';

    //TODO: drag the thumb when posible (instead of just positioning) ??

    function Slider (args) {

        /* Public */

        this.name = args.id;
        this.view = new View(args.id);
        this.isDragging = false;
        this.lastThumbPos = 0;
        this.globalListeners = {};

        this.setThumbPos = function (procent) {
            if (procent < 0) {procent = 0;}
            if (procent > 1) {procent = 1;}

            this.view.thumb.style.left = this.view.dom.offsetWidth*procent - this.view.thumb.offsetWidth/2 + 'px';
            return procent;
        };

        /* Events */

        // Listeners
        
        var isTouchSupported = 'ontouchend' in window;
        var isMouseSupported = 'onmouseup' in window;  // Most touch devices will have this event anyway, so not very useful atm

        if (isTouchSupported) {
            this.view.dom.addEventListener('touchstart', start.bind(this));
            this.view.dom.addEventListener('touchmove', move.bind(this));
            this.view.dom.addEventListener('touchend', end.bind(this));

            _.assign(this.globalListeners, {touchmove: move, touchend: end});
        }

        if (isMouseSupported) {
            this.view.dom.addEventListener('mousedown', start.bind(this));
            this.view.dom.addEventListener('mousemove', move.bind(this));
            this.view.dom.addEventListener('mouseup', end.bind(this));

            _.assign(this.globalListeners, {mousemove: move, mouseup: end, mouseleave: mouseleave});
        }


        // Emitters

        var changeEvt = new CustomEvent('slider.change', {detail: {}, bubbles: true});
        var dragEvt = new CustomEvent('slider.drag', {detail: {}, bubbles: true});


        /* Private */

        function start (evt) {
            if (evt.which == 1 || isTouchSupported) {
                this.isDragging = true;
                this.lastThumbPos = (this.view.thumb.offsetLeft + this.view.thumb.offsetWidth/2) / this.view.dom.offsetWidth;
                this.setThumbPos(Helpers.getPointerPos(evt, this.view.dom) / this.view.dom.offsetWidth);
            }
        }

        function move (evt) {
            if (this.isDragging){
                dragEvt.detail.positionPercent = this.setThumbPos(Helpers.getPointerPos(evt, this.view.dom) / this.view.dom.offsetWidth);
                this.view.dom.dispatchEvent(dragEvt);
            }
        }

        function end (evt) {
            if ((evt.which == 1 || isTouchSupported) && this.isDragging) {
                changeEvt.detail.positionPercent = this.setThumbPos(Helpers.getPointerPos(evt, this.view.dom) / this.view.dom.offsetWidth);
                this.view.dom.dispatchEvent(changeEvt);
                this.isDragging = false;
            }
        }

        function mouseleave(evt) {
            if (this.isDragging) {
                this.isDragging = false;
                this.setThumbPos(this.lastThumbPos);
            }
        }
        
    }


    /****** VIEW ******/

    function View (name) {
        this.dom = document.createElement('div');
        this.dom.classList.add(name.toLowerCase() + '-slider');
        this.dom.classList.add('slider-control');
        this.thumb = document.createElement('div');
        this.thumb.classList.add('thumb');
        this.dom.appendChild(this.thumb);
    }

    Slider.prototype = Object.create(Component.prototype);

    return Slider;
});