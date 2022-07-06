let List = (props) => {
  return (
    <ul>
      {props.tasks.map((el,index) => {
        return (
          <li key={index}>  
            {el}
            <button
              onClick={() => {
                props.deleteTask(el)    // yha pe data ka flow child to parent hai[#1].
              }}
            >
              Delete
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default List;

/*
#1.
Dekho hum parent se child me to data props ki help se bhej skte hai 
lekin agr hume child se parent me data bhejna ho to means ki child ko parent se kaam krwana ho to 
wo hum achieve kre skte hai function ko as a props bhejke 

humne app component me list ke attribute me deleteTask fxn ko bheja as a prop
aur us fxn ko humne list me delete btn pe lgaye hue onclick me use kr liya jisse ki delete btn pe click krte hi 
deleteTask fxn me el pass krke call lgayi jaayegi joki parent component(app) me likha hua hai aur waha execute hoga 
to is trh humne indirectly child se parent ko kaam krwa diya.
*/

/*
WHY WE MADE LIST A FUNCTIONAL COMPONENT NOT A CLASS COMPONENT?

Class componet ka functional component ke uper ek edge hota hai state ka
aur state use hoti hai data store krne me 
aur hume yaha pe koi data store hi nhi krna hai class component bnane ka kya faayda.
simple functional component se bhi hmara kaam chal jaayega
*/

/*
Line no. 6 :
jo react hai wo hume force krta hai ki har ek elem ke pass ek key honi chahiye jiski value unique ho har elem ke liye
*/