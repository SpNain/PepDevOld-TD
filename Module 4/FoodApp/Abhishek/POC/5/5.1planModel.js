// ye sir ne nhi maine hi bnaya hai kyunki ye bnane ke liye bola tha class me 

const mongoose = require('mongoose');

moongoose.connect(db_link).then(function () {
    console.log("db connected");
});

const planSchema = mongoose.schema({
    id: Number,     // agr kisi key ke liye sirf ek hi attribute dena ho aur wo attribute type ho to sidha aise shortcut me de skte hai
    name: String,
    rating:Number,
    price: Number,
    delivery: Boolean,
    meals: Number,
    description: String
});

const planModel = mongoose.model('PlanModel', planSchema);