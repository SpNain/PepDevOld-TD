let add = {
    city: "Delhi",
    region: "Pitampura",
    pin: 110001,
};

let { region, pin, city, myVar } = add;

console.log(region);
console.log(pin);
console.log(city);

console.log(myVar);

/*
Line no. 7 is equal to these three lines => let region = add.region;     
                                            let pin = add.pin;
                                            let city = add.city;
That means ki line no. 7 me 3 variable bne hai aur add naame ke object me jaake us naam ki key ki values in variables me assign ho rhi hai

> Destructring on object ki help se hume alag alag multiple variables nhi bnane pdte agr hume ek hi obj se key values nikalni hai to
> Destructing on object ke time hum variables ko kisi bhi order me likh skte hai bas jiski value chahiye hai uska aur var ka name same hona chahiye

*/