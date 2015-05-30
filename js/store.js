(function(Reflux, Actions, global) {
    'use strict';



    global.todoListStore = Reflux.createStore({

        init: function(){
            this.listenTo(Actions.costChange, this.output);
        },
        output: function(){
            this.trigger('stuff');
            alert('test1');
        }

          });


    // global.todoListStore = Reflux.createStore({

    //     listenables: [TodoActions],
    //     onCostChange: function(){
    //         alert('test1');
    //     }

    // });

})(window.Reflux, window.Actions, window);
