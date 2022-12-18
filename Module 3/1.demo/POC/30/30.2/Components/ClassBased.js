// Understanding class based components - Stage : 1

/*
import React from "react";

class ClassBased extends React.Component {
  state = {  // this is how we create state.
    someNumber: 3,
  };

  render = () => { 
    return (  // jo bhi hum comp se return karte hai wo UI pe dhikhta hai
      <div>
        <h1> {this.state.someNumber} </h1>  // aise hum state ko access kr skte h
      </div>
    );
  };
}

export default ClassBased;
*/

/*
jo components class ki madad se bne hote hai unhe class based components bolte hai 
yaha pe ClassBased component ko ClassBased class ki madad se bnaya hai
aur yaha pe JSX used hai kyunki humne js ke andar html likh rkhi hai
Class based components me hum variable declare krne ke liye let use nhi krte
Lekin agr variable render() ke andar h to fir hum let use krte h

classBased class ko humne bnaya hai
aur ye hmari bnayi hui class React ki component class ko inherit karti hai 
matlab jo feature Component class ke pass honge ab wo iske pass bhi honge
extends - kisi ek class ko dusri class ki properties inherit krwane ke liye use karte hai

render react library ka ek fxn hai, jo ek UI return karta hai
jab hum apni class bnake component bnate hai tab hume usme fxn,variable,objects ke liye let likhne ki jrurat nhi pdti
class based component me render fxn  & state is neccessary

"this" refers to our current component just like in oops this refers to our current obj.

State is just a piece of data stored in our component.
agr do alag alag jagah pe humne ek hi comp use kiya hai tb bhi un dono comp ki state alag alag ho skti hai
for analogy : jaise ek hi class ke alag alag obj ke pass kisi variable ki value alag alag ho skti h usi trh alag alag component ki alag alag state ho skti h

*/


// Understanding class based components - Stage : 2

import React from "react";

class ClassBased extends React.Component {
  state = {
    someNumber: 0,
  };

  render = () => {
    console.log("Rendered function is executed");

    return (
      <div>
        <button
          onClick={() => {
            this.setState({ someNumber: this.state.someNumber + 1 }); // increase the someNumber
          }}
        >
          increment
        </button>
        <h1>{this.state.someNumber}</h1>

        <button
          onClick={() => {
            this.setState({ someNumber: this.state.someNumber - 1 }); // decrease the someNumber
          }}
        >
          decrement
        </button>
      </div>
    );
  };
}

export default ClassBased;

/*
onClick : button.addEventListner("click",function(){}) - jb bhi button pe clcik hoga uske andar ka fxn execute hoga

setState : ye ek fxn hai jo state change karta hai. Ye ek object hota hai jisme jiski state change karni hai uska key values pair hota hai

jab bhi kisi bhi component ki state change hoti hai to component re-render hota hai aur render fxn dobara se ui return karta hai
isi wajah se jab bhi hum state change krte hai to wo changes hume ui pe dikh jate hai
*/