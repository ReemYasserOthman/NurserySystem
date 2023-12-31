const jwt = require("jsonwebtoken");

module.exports=(request,response,next)=>{
   //get token
    try
   {
    const token=request.get("authorization").split(" ")[1];    
    const decodedToken=jwt.verify(token,process.env.SECRETKEY); 
    console.log(decodedToken);
    request.role=decodedToken.role;
    request.id=decodedToken.id;  
    next();
  
   }catch(error)
   {
      error.message="Not Authenticated";
      error.status=401;
      next(error);
   }
      

}

module.exports.checkAdmin=(request,response,next)=>{
    
   if(request.role == "admin")
   next();
   else
   {
       let error = new Error("Not Authorized");
       error.status = 403;
       next(error);
   }
}

module.exports.checkAdminORTeacher=(request,response,next)=>{
    
   if(request.role == "admin" || request.role == "teacher")
   next();
   else
   {
       let error = new Error("Not Authorized");
       error.status = 403;
       next(error);
   }
}
