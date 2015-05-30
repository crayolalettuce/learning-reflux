/** @jsx React.DOM */

(function(React, ReactRouter, Reflux, Actions, todoListStore, global) {

        mountNode = document.getElementById("todoapp");

var catOne =  [
    {name  : 'one', value : 1, key : 1},
    {name  : 'two', value : 2, key : 2},
    {name  : 'three', value : 3, key : 3},
    {name  : 'four', value : 4, key : 4}
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
  handleChange: function(){
        // links to action in store.js
        Actions.costChange();
  },
  render: function() {
        return(
        <tr>
        <td>{this.props.item.name}</td>
        <td><input value={this.props.item.value} onChange={this.handleChange}/></td>
        <td>h</td>
        </tr>
        )
    }
});

var AddRowButton = React.createClass({ 
     handleSubmit: function(e) {
      e.preventDefault();
      this.props.onSubmit(this);
  },
  render: function(){
    return(
        <form onSubmit={this.handleSubmit}>
          <input />
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
                      cat1: this.props.cat1
                  };
         },
        onStatusChange: function() {
            alert('test2');
        },
        componentDidMount: function() {
        this.unsubscribe = todoListStore.listen(this.onStatusChange);
        },
        componentWillUnmount: function() {
        this.unsubscribe();
        },
        handleSubmit: function() {
        // console.log(this.props.cat1);
        // console.log(this.props.cat1.length+1);
        var newKeyVal = this.props.cat1.length+1;
        c = this.props.cat1; 
        c = c.push({name : "four", value : 4, key : newKeyVal});
        this.setState({
        cat1:c
      });
    },
  render: function() {
    return (
      <div>
          <h3>title</h3>
          <CalcTable  cat1={this.props.cat1} somethingHandler={this.somethingHandler}/>
         <div className="stuff"><p>stuff</p></div>
         <div className="stuff">
            <AddRowButton cat1={this.props.cat1} onSubmit={this.handleSubmit}/>
          </div>
            <SectionSummary />
      </div>
    );
  }
});

React.render(<CalcApp cat1={catOne}/>, mountNode);





})(window.React, window.ReactRouter, window.Reflux, window.Actions, window.todoListStore, window);
