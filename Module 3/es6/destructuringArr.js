let a = [1, 2, 3, 4, 5];

let [kuchBhi, , , reqVar] = a;

console.log(kuchBhi);
console.log(reqVar);

/*
> Destructring on array ki help se hume alag alag multiple variables nhi bnane pdte agr hume ek hi array se values nikalni hai to
> Destructring on array me hum jis order me variables bnate hai unme array ke corresponding elem ki values aati hai e.g. agr koi var 2nd no. pe declared hai to usme arr[1] yani arr ki 2nd elem ki value aayegi
> agr hume koi values skip krni ho to destructring ke time uska var ki jagah khaali chhod skte hai ya _ use kar skte hai 
> lekin _ hum sirf ek hi baar use kar skte hai 
*/
