let name = "Steve";

//  by default
// module.exports = {
    // name : "Steve"
// }


// module.exports.name = name;  // module.export k object me ek `name` naam ki key add hogi jisme name yani steve pda hoga
// module.exports.something = "something";
// Line no 9/10 will create this type of thing : module.exports = {
//                                                                    name : "Steve"  -> 9
//                                                                    something : "something"  -> 10
//                                                                }

module.exports = name;   // module.export obj converted into string because we assign a string to it.

// module.exports = "steve"; // line no 16 ka result


/*
Note :

We never export a whole file.

jab bhi hume ek file se koi cheej dusri file me export krni ho to uske sidhe likh ke export krdo 
aur udhar usi type ke var me catch krlo like we did in line no. 16

lekin jab hume ek file se multiple cheeje export krni ho to use module.export ke obj me key value pair bnake send krte h

*/