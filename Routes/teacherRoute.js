const express = require("express");
const controller = require("./../Controllers/teacherController");
const {addTeacherValidation,updateTeacherValidation,deleteTeacherValidation} = require("./../Core/Validations/teacherValidation");
const checkeValidations = require("./../Core/Validations/checkValidations");
const autorizationMW = require("./../Core/Authorization/authorization");

const teacherRoute = express.Router();

teacherRoute.route("/teachers")
          .all(autorizationMW.checkAdminORTeacher)
          .get(controller.getAllTeachers)
          .post(addTeacherValidation,checkeValidations,controller.addTeacher)
          .patch(updateTeacherValidation,checkeValidations, controller.updateTeacher)
          .delete(deleteTeacherValidation,checkeValidations, controller.deleteTeacher)
 
module.exports= teacherRoute;