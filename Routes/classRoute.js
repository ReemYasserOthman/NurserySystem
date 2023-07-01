const express = require("express");
const controller = require("./../Controllers/classController");
const {addClassValidation,updateClassValidation,deleteClassValidation,getByIdClassValidation,supervisorClassValidation} = require("./../Core/Validations/classValidation");
const checkeValidations = require("./../Core/Validations/checkValidations");
const autorizationMW = require("./../Core/Authorization/authorization");

const classRoute = express.Router();

classRoute.route("/classes")          
          .get(autorizationMW.checkAdmin,controller.getAllClasses)
          .post(autorizationMW.checkAdmin,addClassValidation,checkeValidations, controller.addClass)
          .delete(autorizationMW.checkAdmin,deleteClassValidation,checkeValidations, controller.deleteClass)
          .patch(autorizationMW.checkAdminORTeacher,updateClassValidation,checkeValidations, controller.updateClass)
          .delete(autorizationMW.checkAdmin,deleteClassValidation,checkeValidations, controller.deleteClass)

classRoute.get("/classes/:id",autorizationMW.checkAdmin,getByIdClassValidation,checkeValidations,controller.getClassById)
classRoute.get("/classchildern/:id",autorizationMW.checkAdmin,autorizationMW.checkAdmin,getByIdClassValidation,checkeValidations,controller.getClassByChildId)
classRoute.get("/classTeacher/:id",autorizationMW.checkAdminORTeacher,supervisorClassValidation,checkeValidations,controller.getClassBySupervisor) 
module.exports= classRoute;