define(['data/todos', 'prototype/widget', 'tree/ToDoList/item', 'tree/ToDoList/list', 'tree/Root'], 
function(todos, Widget, Item, List, Root) {

    describe("ToDoList", function() {
        var root, list, item;

        beforeEach(function() {
            root = new Root(todos);
            list = root.children[2];
            item = list.children[0];
        }); 

        it("item should be an instance of Widget", function() {
            expect(item instanceof Widget).toEqual(true);
        });

        it("item view should contain dom", function() {
            expect(item.view.dom instanceof Node).toEqual(true);
        });

        it("item checkbox should be correspond to model", function() {
            item = new Item({title: 'A todo item', completed: false});
            expect(item.view.checkbox.checked).toEqual(false);
        });

        it("to change item view when model changes", function(done) {
            custom_item = new Item({title: 'A todo item', completed: false});
            custom_item.model.set('completed', true);
            custom_item.model.set('title', 'New title');
            setTimeout(function () {
                expect(custom_item.view.checkbox.checked).toEqual(true);
                expect(custom_item.view.input.value).toEqual('New title');
                done();
            }, 90);
        });

        it("to change view of other items with same model when model changes", function(done) {
            todos = [
                {title: 'Todo item 1', completed: false},
                {title: 'Todo item 2', completed: false}
            ]

            custom_list1 = new List(todos);
            custom_list2 = new List(todos);

            custom_list1.children[0].model.set('completed', true);
            setTimeout(function () {
                expect(custom_list2.children[0].view.checkbox.checked).toEqual(true);
                done();
            }, 90);
        });

        it("should add item to todo list", function (done) {
            list.model.push({title: 'Added title', completed: false});
            setTimeout(function () {
                expect(list.children[list.children.length-1].view.input.value).toEqual('Added title');
                done();
            }, 90);
        });

    });
});