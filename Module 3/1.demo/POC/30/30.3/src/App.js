import React from "react";
import "./App.css"; // App.css ko import kr liya taki jo App.js ki jo css h uska effect dhikh ske

class App extends React.Component {
  state = {
    tasks: ["make coffee", "make notes", "go for a jog", "new task"],
    currInput: "",  // suru me input box khaali rhega
  };

  render = () => {
    return (
      <div>
        <input
         className = "input-box"   // hum react me kisi bhi elem ko class dene ke liye class keyword use nhi krte kyunki class keyword pahle se class based component bnane ke liye reserved hoti hai 
                                   // to hum class keyword ki jagah className keyword use karte hai
          type="text"
          onChange={(e) => {
            this.setState({ currInput: e.currentTarget.value });  // isse hmara typing ho paayega[#1]
          }}

          onKeyDown={(e) => { //[#2]
            if (e.key == "Enter") {
              this.setState({
                tasks: [...this.state.tasks, this.state.currInput], // we use spread operator to add the new elem b/c in state array we can't simply use push to add a element.
                currInput: "",
              });
            }
          }}
          
          value={this.state.currInput} 
        />

        <ul>
          {this.state.tasks.map((el) => { //one by one tasks ke saare el ko li me convert kar dega
            return <li>{el}</li>;
          })}
        </ul>
      </div>
    );
  };
}

export default App; // yaha se humne is App component ko export kar rkha hai jo index.js me import hota hai


/*
#1.
Problem : hum input me type nhi kar paa rhe. Kyu?
Explaination : jab bhi hum input me kuch type kar rhe hai to component ko lgta hai ki uski state change ho rhi hai 
               to re - render hoke ui dobara se show hota hai 
               aur kyunki humne input ki value ko currInput set kar rkha hai to wahi currInput ki value dobara se dikh jaati hai jisse hume lgta hai ki input me type nhi ho paa rha hai
Solution : isse bachne ke liye hum onChange event ka use karte hai 
           onChange : jab bhi jispe ye event lga hai uspe koi change hoga to iske andar ka fxn execute hota hai
           is case me humne fxn aisa likha hai ki jab bhi input ki value change ho to wo changed value currInput ke andar set ho jaaye to jab re-render hoke ui return hoga to input ke andar(input box) updated value dikhe 

#2.
ab humne keydown event bhi lga diya jisse hoga ye ki jab bhi key press hogi ye event occure hoga aur jaise hi key Enter hogi tabhi state change kar dete hai
state change se matlab hai ki tasks me currInput ki value ko tasks arr me add kar dete hai(jisse re-render hoga aur map dobara chlega tasks pe aur uske saare elements ko li bnaker return kr dega)
aur currInput ko khali kar dete hai aur fir me input box ki value me currInput daal dete hai 
taki enter krne ke baad(yani append hone ke baad) hmara input box khali dikhe
*/