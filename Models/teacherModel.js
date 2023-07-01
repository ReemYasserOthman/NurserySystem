const mongoose = require("mongoose");

const teacherSchema=new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    //_id:Number,
    fullName:{type:String,required:true},
    email: {
        type: String
      , required: true
      , validate:/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/
      },
      password:{
        type:String
        //validate:/(?=.[a-z])(?=.[A-Z])(?=.[0-9])(?=.[!@#\$%\^&\*])(?=.{8,})/
      },
      image:{type:String}
})

mongoose.model("teachers",teacherSchema)