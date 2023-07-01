const { selectFields } = require("express-validator/src/select-fields");
const mongoose = require("mongoose");
require("./../Models/classModel");
const teacherSchema =mongoose.model("teachers");

const classSchema = mongoose.model("classes");

 module.exports.getAllClasses = (request,response, next) => {
  classSchema.find({})
  .populate({path:"supervisor",selectFields:{fullName:1}})
  .then(data=>{
   if(data == null){
     throw new Error("NO Children!");
   }else{
    response.status(200).json({data});
   }              
  }) 
  .catch(error=>{
   next(error);
  });  
  };
  
  module.exports.getClassById = (request,response, next) => {
    classSchema.findOne({_id:request.params.id})
               .populate({path:"supervisor",selectFields:{fullName:1}})               
             .then(data=>{
              response.status(200).json({ data});              
             }) 
             .catch(error=>{
              next(error);
             });  
  };
  
  module.exports.addClass = (request,response, next) => {
    let classObject = new classSchema({
      _id:request.body.id,
      name:request.body.name,
      supervisor:request.body.supervisor,
      childrens:request.body.childrens 
           
      });
      teacherSchema.findOne({_id:request.body.supervisor})
      .then(data=>{
        if(data == null){
          throw new Error("NO Teacher!");
        }
        else{
          classObject.save()
          .then(data=>{
               response.status(200).json({ data });

          })
          .catch(error=>{
            next(error);
           });
        }              
       }) 
       .catch(error=>{
        next(error);
       });  
  };
  
  module.exports.deleteClass = (request,response, next) => {
    classSchema.deleteOne({_id:request.params.id})
             .then(data=>{
              response.status(200).json({ data: "Deleted Class!" });             
             }) 
             .catch(error=>{
              next(error);
             });  
    
  };
  
  module.exports.updateClass = (request,response, next) => {
    classSchema.updateOne({_id:request.body.id},{
      $set:{ 
        _id:request.body.id,
      name:request.body.name,
      supervisor:request.body.supervisor,
      childrens:request.body.childrens 
      }
   })
   .then(data=>{
    response.status(200).json({ data:"Updated."});              
   }) 
   .catch(error=>{
    next(error);
   });  
  };
    
  module.exports.getClassBySupervisor = (request,response, next) => {    
    classSchema.findOne({supervisor:request.params.id})                                           
             .then(data=>{
              response.status(200).json({data});              
             }) 
             .catch(error=>{
              next(error);
             });  
  };
  module.exports.getClassByChildId = (request,response, next) => {
    
    classSchema.findOne({_id:request.params.id})                                           
             .then(data=>{
              response.status(200).json(`supervisor:${data.childrens}`);              
             }) 
             .catch(error=>{
              next(error);
             }); 
  };