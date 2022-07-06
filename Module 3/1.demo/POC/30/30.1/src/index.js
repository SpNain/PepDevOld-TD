// react and react-dom are Libraries

import React from "react"; // creation logic - component bnane ka logic

// react-dom jo library hai uske saare function humne ReactDOM me daal diye hai
import ReactDOM from "react-dom"; // render logic - us component ko browser pe dhikhana kaise hai - shadow dom

// App ek component hai jo humne yaha pe import kar rkha hai
import App from "./App";

// [#1]
ReactDOM.render(
  <App />,
  document.querySelector("#root") // aur ek jagah jha us component ko dikhana hai
);

/*
#1.
Here document refers to index.html in public folder
Render - is a fxn of react-dom library aur kyunki humne react-dom libarary ko ReactDOM me daal rkha hai to hum ReactDOM ki madad se iss fxn ko use kr skte hai 
        ye do chije leta hai - ek component (App in this case)*
                               aur ek jagah jha us component ko dikhana hai(elem with id root in this case)
        kaam kya krta hai - ye jo component humne ise diya hai us comp ko jo jagah aayegi usme daal dega (App ko root id wale elem yani div me daal dega)

* : hum ek se jyada components ka ek superset bnake yani multiple comps ko ek div me daal ke bhi as one component pass kar skte hai
like this -> <div>
                  <App />
                  <App />
                  <App />
                  <App />
             </div>,

Mota moti App is like main component which contains sub components.
HTML Reference : "App" is body which contains diff divs and other elements.
*/