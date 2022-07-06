import React from "react";
import "./App.css";
class App extends React.Component {
  state = {};

  render = () => {
    return (
      <div className="body">
        <div className="calculation">calculation</div>

        <div className="operation Box">
          <div class="keys">+</div>
          <div class="keys">-</div>
          <div class="keys">*</div>
          <div class="keys">/</div>
        </div>

        <div className="keypad Box">
          <div class="number C">C</div>
          <div class="number equal">=</div>
          <div class="number">1</div>
          <div class="number">2</div>
          <div class="number">3</div>
          <div class="number">4</div>
          <div class="number">5</div>
          <div class="number">6</div>
          <div class="number">7</div>
          <div class="number">8</div>
          <div class="number">9</div>
          <div class="number">0</div>
        </div>
      </div>
    );
  };
}

export default App;
