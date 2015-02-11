define(['app/prototype/component'],
function(Component) {
    'use strict';

    function Choices (args) {
        if (args.children) { this.children = args.children; }
        this.choices = args.choices;
        this.chosen_id = args.default ? args.default : Object.keys(this.choices)[0];
        this.name = args.id;
        this.view = new View(args, this.choices, this.chosen_id);

        var changeEvt = new CustomEvent(args.id + '.change', {detail: {}, bubbles: true});

        for (var choice_id in this.choices) (function(choice_id){
            var choiceNode = this.view.choices[choice_id];
            choiceNode.addEventListener('click', function(evt){ this.click(choice_id, evt); }.bind(this));
        }.bind(this))(choice_id)

        this.click = function (choice_id) {
            this.view.choices[this.chosen_id].classList.remove('chosen');
            this.view.choices[choice_id].classList.add('chosen');
            this.chosen_id = choice_id;

            changeEvt.detail.choice = {id: choice_id, name: this.choices[choice_id]};
            this.view.dom.dispatchEvent(changeEvt);
        }

        this.init = function () {
            this.click(this.chosen_id);
        }
    }


    function View (args, choices) {
        this.dom = document.createElement('div');
        this.dom.classList.add('choices-component');
        this.dom.classList.add(args.id + '-choices');
        this.choices = {};

        for (var choice_id in choices) {
            var choice_view = createChoice(choices[choice_id]);
            this.choices[choice_id] = choice_view;
            this.dom.appendChild(choice_view);
        }

        function createChoice(choice_title) {
            var choiceNode = document.createElement('div');
            choiceNode.textContent = choice_title;
            return choiceNode;
        }
    }

    Choices.prototype = Object.create(Component.prototype);

    return Choices;
});
