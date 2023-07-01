const mongoose = require("mongoose");
require("./../Models/childModel");
const childSchema = mongoose.model("children");


module.exports.getAllChildrens = (request,response, next) => {
  childSchema.find({})
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

module.exports.getChildById = (request,response, next) => {
  childSchema.findOne({_id:request.params.id})
             .then(data=>{
              response.status(200).json({ data});              
             }) 
             .catch(error=>{
              next(error);
             });    
};

module.exports.addChild = (request,response, next) => {
  
  let childObject = new childSchema({
    _id:request.body.id,
    fullName:request.body.fullName,
    age:request.body.age,
    level:request.body.level,    
    address :{
      city:request.body.address.city,
      street:request.body.address.street,
      building:request.body.address.building
    }
    
    
  });
  childObject.save()
              .then(data=>{
                  response.status(200).json({ data});          
             })
             .catch(error=>{
              next(error);
             });
};

module.exports.deleteChild = (request,response, next) => {
  childSchema.deleteOne({_id:request.params.id})
             .then(data=>{
              response.status(200).json({ data});              
             }) 
             .catch(error=>{
              next(error);
             });  
};

module.exports.updateChild = (request,response, next) => {
  if(request.role = "teacher"){
    if(request.id == request.body.id){
      childSchema.updateOne({_id:request.body.id},{
        $set:{ 
          _id:request.body.id,
          fullName:request.body.fullName,
          age:request.body.age,
          level:request.body.level,    
          address :{
            city:request.body.address.city,
            street:request.body.address.street,
            building:request.body.address.building
          }
        }
     })
     .then(data=>{
      response.status(200).json({ data:"Updated."});              
     }) 
     .catch(error=>{
      next(error);
     });  
    }
  }
  else{
  childSchema.updateOne({_id:request.body.id},{
                $set:{ 
                  _id:request.body.id,
                  fullName:request.body.fullName,
                  age:request.body.age,
                  level:request.body.level,    
                  address :{
                    city:request.body.address.city,
                    street:request.body.address.street,
                    building:request.body.address.building
                  }
                }
             })
             .then(data=>{
              response.status(200).json({ data:"Updated."});              
             }) 
             .catch(error=>{
              next(error);
             });
            }  
};
