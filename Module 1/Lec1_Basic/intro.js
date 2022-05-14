
/*1.How to print in javascript! */
// console.log("Hello World !!!");


/*2.Data Types, Decalartion, Assign and Scope*/

/*
2.1 Data Types =>

Java => Primitive => int , float , double , boolean
        Non Primitive => Arrays , Stacks

2.1.1 Javascript Primitive =>
Number(int , float , double) , Boolean , String(  "" , '' ) , undefined , Null , Object

Datatype name = value;
int a = 10;


let and const
ES6 => Ecma Script 6

*/
// Let :
// Dynamic casting
let a = 10;  // you have declared a variable with name a and initialized it with value 10;
// console.log(a);

// let keyword => block scoped
if(true){
   let a = 20;
//    console.log(a);
}

// console.log(a);

/*
Const : 
constant => block scoped and constant

declaration and assign should be in one line in case of const in js
you can't declare in one and assign in another in case of const in javascript like this 

const pi;
pi = 3.14;

this is wrong you can't do this in javascript.
 */

const pi = 3.14;  // const variables remain constant throughout of the program they can't be changed.
// console.log(pi);

// in js you assign any type of value in let and const 
let c = true;
let d = 3.14;
let e = 'Hey i am a string';
let f = undefined;
let g;  // you can let any vairable not assigned anything in case of let which automatically by default get undefined.
// console.log(g);

// 2.1.2 Non Primitive

// Arrays=>
// int[] a = new int[5];

let values = [1 , 2 , 3 , 4 , 5 , 6 , 7 , 8 , 9 , 10 ];
// console.log(values);

// add some data in values array
values.push("Captain america !!");
// console.log(values);
// function , object , string , int , boolean

// console.log(values.pop());

// console.log(values);

//push => add at the end
//pop => delete from the end

// shift => delete a element from the starting
// unshift => add a element in the starting of the array
// console.log(values.shift());
// console.log(values);

/*3 Objects */
// Objects => key values pair : objects are the pair of keys and values.
// keys => unique

let obj = {
    "Full Name":"Steve Rogers", 
    place:"Queens",
    movies:["captain america" , "winter soldier" , {
        bestie : "bucky",
        nickname:"wintersoldier",
        partner : "falcon",
        weaknes : ["brainwash"]
    }]
}
// in above e.g. place is a key and Queens is a value.
/*
Objects me vlaues ko access krne ke liye hamare pass 2 methods hote hai 
a. Dot operation 
b. Bracket operation.
*/

// dot notation => literal check : for e.g. - obj.name me yaha obj naam ke object me jaaker name naam ki key ko dunda jaayega aur uski value return hogi.
// console.log(obj.name);
// console.log(obj.movies);

// how we can access "rainw":
console.log(obj.movies[2].weaknes[0].substring(1,5))

let key = "place";
// console.log(obj.key); //=> it will check if there is a key named "key"

// square brackets notation : useful when key is of two or more words.
obj["place"];
obj["Full Name"];

obj.skills = ["martial arts" , "taekwondo"];
obj.place = "New york";
// console.log(obj);
