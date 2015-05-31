/** @jsx React.DOM */

(function(React, ReactRouter, Reflux, Actions, creatorStore, global) {

        mountNode = document.getElementById("todoapp");

var catOne =  [
    {name  : 'one', value : 1, key : 0},
    {name  : 'two', value : 2, key : 1},
    {name  : 'three', value : 3, key : 2},
    {name  : 'four', value : 4, key : 3}
      ]; 

// helper function can be called in to sum obj.values 
 var sumVals = function(sumThis){
    // setting up variables to sum all expense inputs 
    var i = 0; 
    var sum = 0;
    var s = sumThis; 
    // summing expense inputs 
    do {
        var c = s[i].value;
        if (isNaN(c)!== true) {
        sum = sum + Number(c); 
        }
        ++i;
    } while (i <= s.length-1);
    return sum;
 }

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
      <table><tbody>{rows}</tbody></table>
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
  handleDelete: function(item){
    // alert(item);
    Actions.deleteItem(item);
  },
  render: function() {
        return(
        <tr>
        <td>{this.props.item.name}</td>
        <td><input type="number" value={this.props.item.value} onChange={this.handleChange.bind(this, this.props.item.key)}/></td>
        <td><button onClick={this.handleDelete.bind(this, this.props.item.key)}>delete</button></td>
        <td>{this.props.item.key}</td>
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
var currentSum = sumVals(this.props.cat1)
  return(
    <div className="summary">
        <div className="table-summary">
        <p>{currentSum}</p>
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

            console.log('stuff');

         },
        onStatusChange: function(mod, iVal) {
            
            var v = this.state.cat1; 

            v[mod].value = iVal;

            this.setState({
                cat1: v
            });
        },
        onRowDelete: function(item){

            var BBB = this.state.cat1; 

            BBB.splice(item, 1);

            console.log(BBB);

            var arL = BBB.length; 

            console.log(arL);

            this.setState({
                cat1:BBB
            });

            console.log(this.state.cat1);

        },
        componentDidMount: function() {
        this.unsubscribe = creatorStore.listen(this.onStatusChange);
        this.blahblah = deleterStore.listen(this.onRowDelete);
        },
        componentWillUnmount: function() {
        this.unsubscribe();
        this.blahblah();
        },
        handleSubmit: function(newItem) {
        console.log(newItem);
        var newKeyVal = this.state.cat1.length;
        c1 = this.state.cat1; 
        c1.push({name : newItem, value : event.target.value, key : newKeyVal});
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
            <SectionSummary cat1={this.state.cat1} />
      </div>
    );
  }
});

React.render(<CalcApp dogOne={catOne}  />, mountNode);





})(window.React, window.ReactRouter, window.Reflux, window.Actions, window.creatorStore, window);
