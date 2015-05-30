/** @jsx React.DOM */

(function(React, ReactRouter, Reflux, Actions, todoListStore, global) {

        mountNode = document.getElementById("todoapp");

var catOne =  [
    {name  : 'one', value : 1, key : 0},
    {name  : 'two', value : 2, key : 1},
    {name  : 'three', value : 3, key : 2},
    {name  : 'four', value : 4, key : 3}
      ]; 


var CalcTable = React.createClass({
  render: function() {
    var rows = [];
    // var myVar = this.props.cat1;     
    this.props.cat1.forEach(function(item){
      rows.push(
        <CalcRow item={item} key={item.key}/>
        );
    });
    return(
      <table>{rows}</table>
    )
  }
});

var CalcRow = React.createClass({
  handleChange: function(evt){
        // links to action in store.js

        //modified input
        var mod = evt; 
        // value of input
        var iVal = event.target.value;

        // sends mod and iVal to store
        Actions.costChange(mod, iVal);
  },
  render: function() {
        return(
        <tr>
        <td>{this.props.item.name}</td>
        <td><input value={this.props.item.value} onChange={this.handleChange.bind(this, this.props.item.key)}/></td>
        <td>h</td>
        </tr>
        )
    }
});

var AddRowButton = React.createClass({ 
     handleSubmit: function(e) {
        var newItem = this.refs.addNewItem.getDOMNode().value;
      e.preventDefault();
      // sends event to  handleSubmit function in CalcApp component
      this.props.onSubmit(newItem);
  },
  render: function(){
    return(
        <form onSubmit={this.handleSubmit} >
          <input placeholder="add new expense" ref="addNewItem"/>
          <button>Add</button>
        </form>
      )
  }
});

var SectionSummary = React.createClass({
  render: function(){
  return(
    <div className="summary">
        <div className="table-summary">
        stuff
        </div>

    </div>
    );
  }
});

var CalcApp = React.createClass({
        getInitialState: function(){
            return{
                cat1: this.props.dogOne
            }
         },
        onStatusChange: function(mod, iVal) {
            
            var v = this.state.cat1; 

            v[mod].value = iVal;

            this.setState({
                cat1: v
            });
        },
        componentDidMount: function() {
        this.unsubscribe = todoListStore.listen(this.onStatusChange);
        },
        componentWillUnmount: function() {
        this.unsubscribe();
        },
        handleSubmit: function(newItem) {
        console.log(newItem);
        var newKeyVal = this.state.cat1.length;
        c1 = this.state.cat1; 
        c1.push({name : newItem, value : event.target.value, key : newKeyVal});
        // console.log(c1);
        this.setState({
        cat1:c1
      });
    },
  render: function() {
    return (
      <div>
          <h3>title</h3>
          <CalcTable  cat1={this.state.cat1} somethingHandler={this.somethingHandler}/>
         <div className="stuff"><p>stuff</p></div>
         <div className="stuff">
            <AddRowButton cat1={this.state.cat1} ref="addNewItem" onSubmit={this.handleSubmit} />
          </div>
            <SectionSummary />
      </div>
    );
  }
});

React.render(<CalcApp dogOne={catOne}  />, mountNode);





})(window.React, window.ReactRouter, window.Reflux, window.Actions, window.todoListStore, window);
