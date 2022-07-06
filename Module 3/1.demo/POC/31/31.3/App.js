import React from "react";
import "./App.css";
import List from "./List";
import Input from "./Input";

class App extends React.Component {
  state = {
    tasks: ["make coffee", "make notes", "go for a jog", "new task"],
    currInput: "",
  };

  handleCurrInput = (value) => {  // ye jo value input box me aati h use currInput me set krta h
    this.setState({ currInput: value });
  };

  handleTasks = () => {
    this.setState({
      tasks: [...this.state.tasks, this.state.currInput],
      currInput: "",
    });
  };

  // iska kaam hai delete pe click krte hi us task ke li ko delete krna
  deleteTask = (singleTask) => {  // wha se jo el bheja hoga wo idhar singleTask me recieve hoga
    let currTaskArr = this.state.tasks;

    let filteredArr = currTaskArr.filter((element) => {
      return element !== singleTask;
    });

    this.setState({ tasks: filteredArr });
  };

  render = () => {
    return (
      <div>
        <Input
          handleCurrInput={this.handleCurrInput}
          handleTasks={this.handleTasks}
          currInput={this.state.currInput}
        /> 
        {/* yha pe humne handleCurrInput,handleTasks aur currInput kof as props pass kiya h [#1]*/}
        <List tasks={this.state.tasks} deleteTask={this.deleteTask} /> 
      </div> // uper hume tasks aur deleteTask ko as a props(attribute of list) pass kiya hai
    );
  };
}

export default App;

//#1. JSX me HTML ke andar comment sturucture is like this : {/* comment */}