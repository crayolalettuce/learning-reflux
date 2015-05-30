(function(Reflux, TodoActions, global) {
    'use strict';

    global.todoListStore = Reflux.createStore({

        listenables: [TodoActions],
        onCostChange: function(){
            alert('test1');
        },
        output: function(){
            this.trigger();
        }, 

    });

})(window.Reflux, window.TodoActions, window);
