// Component ka naam aur file ka naam same hona 
// & component ka name ka first letter capital hona jruri h in react

let Functional = () => {
    return (
      <div>
        <h1>This is our first react app.</h1>
        <p>Some other html</p>
      </div>
    );
  };
  
export default Functional;  // hum apne component ko export kr dete h jise hum index.js me import krke use krte h

  
/*
jo components fxn ki madad se bne hote hai unhe functional components bolte hai 
yaha pe Functional component ko arrow fxn ki madad se bnaya hai
aur yaha pe JSX used hai b/c humne js ke andar html likh rkhi hai
Functional comp ke andar state nhi hoti
*/