const mongoose = require("mongoose");
const autoincrement = require("mongoose-sequence")(mongoose)

const classSchema = new mongoose.Schema({
    _id:Number,
    name:{type:String, require:true },
    supervisor:{type:mongoose.Schema.Types.ObjectId,ref:"teachers"},    
    childrens: [[Number]]
       
})
classSchema.plugin(autoincrement);
mongoose.model("classes",classSchema);
       