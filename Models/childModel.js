const mongoose = require("mongoose");

const childSchema = new mongoose.Schema({
    _id:Number,
    fullName:{type:String, require:true },
    age:Number,    
    address:{
        city:String,street:Number,building:Number
    },
    level:String    
})

mongoose.model("children",childSchema);
       