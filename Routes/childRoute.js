const express = require("express");
const controller = require("./../Controllers/childController");
const {addChildValidation,updateChildValidation,deleteChildValidation} = require("./../Core/Validations/childValidation");
const checkeValidations = require("./../Core/Validations/checkValidations");
const { getByIdChildValidation } = require("../Core/Validations/childValidation");
const autorizationMW = require("./../Core/Authorization/authorization");

const childRoute = express.Router();

childRoute.route("/children")          
          .get(autorizationMW.checkAdmin,controller.getAllChildrens)
          .post(autorizationMW.checkAdmin,addChildValidation,checkeValidations,controller.addChild)
          .patch(autorizationMW.checkAdminORTeacher,updateChildValidation,checkeValidations,controller.updateChild)
          .delete(autorizationMW.checkAdmin,deleteChildValidation,checkeValidations,controller.deleteChild)

childRoute.get("/children/:id",autorizationMW.checkAdmin,getByIdChildValidation,checkeValidations, controller.getChildById)
 
module.exports= childRoute;