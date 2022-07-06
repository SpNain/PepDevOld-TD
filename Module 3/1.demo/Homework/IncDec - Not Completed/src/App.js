import React from "react";
 
import "./App.css";
class App extends React.Component{
  state = {
    left_Number: 0,
    Right_Number: 0,
  };

  render = () => {
    return (
      <div className="big-container">
        <div className="container">
          <h1>{this.state.left_Number}</h1>
          <button
            onClick={() => {
              this.setState({ Right_Number : this.state.Right_Number + 1 });
            }}
          >Increase Right_Number</button>
          <button
            onClick={() => {
              this.setState({ left_Number : this.state.left_Number - 1 });
            }}
          >Decrease left_Number</button>
        </div>
        <div className="container">
          <h1>{this.state.Right_Number}</h1>
          <button
            onClick={() => {
              this.setState({ left_Number : this.state.left_Number + 1 });
            }}
          >Increase left_Number</button>
          <button
            onClick={() => {
              this.setState({ Right_Number : this.state.Right_Number - 1 });
            }}
          >Decrease Right_Number</button>
        </div>
      </div>
    );
  };
}

export default App;
