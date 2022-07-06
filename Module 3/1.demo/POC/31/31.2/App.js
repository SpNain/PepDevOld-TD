import React from "react";
import "./App.css";
import List from "./List";
import Input from "./Input";

class App extends React.Component {
  state = {
    tasks: ["make coffee", "make notes", "go for a jog", "new task"],
    currInput: "",
  };

  render = () => {
    return (
      <div>
        <Input currInput={this.state.currInput} />
        
        <List tasks = {this.state.tasks}/>  
      </div>
    );
  };
}

export default App;


/*
Hum nhi chahte the ki hum saari chije app component me hi likhe isiliye humne usko alag alag components me break kr liya like list & input.
ab baat ye thi ki humne state to app me likhi hai to usse hum children component me kaise use kre.
Iska solution hai ye line - " Parent components (app) apne children components (list) ko data bhej skte hai using props."(props->properties)
iska matlab hai ki hum jaha pe bhi parent component me child component ko use kr rhe hai wha pe 
child component ke attribute me hum us parent component ki properties ko bhej skte hai

Just like in html - <a href="link">Text!</a> : here href is an attribute of a tag.
In jsx -  <List tasks={this.state.tasks} /> here tasks is the attribute of list component.
yha pe hum tasks attribute ko kuch bhi naam de skte h jruri nhi h ki jo state me ho whi naam de

hum multiple attribute(data) bhi de(bhej) skte h jo udhar props me catch ho jaayenge

*/