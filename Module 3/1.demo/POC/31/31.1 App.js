import React from "react";
import "./App.css";

class App extends React.Component {
  state = {
    tasks: ["make coffee", "make notes", "go for a jog", "new task"],
    currInput: "", 
  };

  render = () => {
    return (
      <div>
        <input
          className="input-box"
          type="text"
          onChange={(e) => {
            this.setState({ currInput: e.currentTarget.value });
          }}

          onKeyDown={(e) => { //[#2]
            if (e.key == "Enter") {
              this.setState({
                tasks: [...this.state.tasks, this.state.currInput],
                currInput: "",
              });
            }
          }}
          
          value={this.state.currInput} 
        />

        <ul>
        {this.state.tasks.map((el) => {
        return (
          <li>
            {el}
            <button
              onClick={() => {
                let currTaskArr = this.state.tasks;   // yaha pe humne state me se tasks nikal liye jisme li hai 

                // hume pta hai ki filter fxn jis array pe lgaya hota hai uske elements ko ek ek krke filter method me pass kiye gye fxn me pass krte hai
                // lekin humne yaha pe fxn pass nhi kiya balki likh hi diya hai
                // to yha pe currTaskArr ke ek ek element ko filter fxn leke aayga aur isme likhe fxn me pass krega
                // yani ek ek krke element argument me likhe element me jaayenge aur fir check honge ki jo task hume delete krna hai
                // uske brabar h ki nhi jo brabar milega uske liye false return hoga aur use currTaskArr me se filter kr diya jaayega
                let filteredArr = currTaskArr.filter((element) => {   //  filter maar diya jisse ki required li nikal jaaye aur render hone pe ui pe na dhikhe
                  return element !== el;
                });

                this.setState({ tasks: filteredArr });  // ab humne state ke tasks me filterArr(jisme deleted task nhi hai) set kr diya
 
              }}
            >
              Delete
            </button>
          </li>
        );
      })}
        </ul>
      </div>
    );
  };
}

export default App;

/*
Delete button fxnality :

to humne <li> bna li thi task ke elements ki 
ab hum un <li>'s ke saath delete btn lagana chahte hai 
jisse ki jis <li> ke saath wale delete btn ko click kiya jaaye wo <li> delete ho jaaye
to iske liye humne button pe event lgaya onclick jispe click hote hi uske andar likha fxn execute hoga
fxn kya krta h uska explaination likh rkha h 

*/