(function(Reflux, Actions, global) {
    'use strict';



    global.todoListStore = Reflux.createStore({
        init: function(){
            
            // listens to handleChange in CalcRow component
            this.listenTo(Actions.costChange, this.output);

            // listens to handleDelete on CalcRow component 
            this.listenTo(Actions.deleteItem, this.onDeleteItem);
        },
        // listens for mod and iVal
        output: function(mod, iVal){
            // passes mod and iVal to CalcTable 
            this.trigger(mod, iVal);
        },
        onDeleteItem: function (item){
            this.trigger(item);
        }
        });


    // global.todoListStore = Reflux.createStore({

    //     listenables: [TodoActions],
    //     onCostChange: function(){
    //         alert('test1');
    //     }

    // });

})(window.Reflux, window.Actions, window);
