let Input = (props) => {
  return (
    <input
      className="input-box"
      type="text"
      onChange={(e) => {
        props.handleCurrInput(e.currentTarget.value); // [#1]
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          props.handleTasks();     // [#2]
        }
      }}
      value={props.currInput}
    />
  );
};

export default Input;

/*
#1.
data flow from child to parent
humne kuch type kiya, input box me change aaya
onChange chla, usne handleCurrInput ko call lgayi aur saath me jo value h input me wo bhej di
fir handleCurrInput(value) {joki App.js me likha hua h} chlta h aur value ko currInput me set kr deta h

#2.
data flow from child to parent
key down hui, onKeyDown event chla
agr wo key enter hui to handleTasks() ko call lg jaayegi {joki App.js me likha hua h}
fir handleTasks() jo currInput h use tasks array me daal deta h aur fir currInput ko khaali kr deta h
aur kyunki state change hui isiliye UI re-render hoti h aur jo nya tasks hume daal tha uski li bnakar hume ui pe dhikh jaati h
*/