const {body,param,query} = require("express-validator");
const { default: isEmail } = require("validator/lib/isemail");

module.exports.addTeacherValidation = [
    body("id").isMongoId().withMessage("Teacher Id should be number"),
    body("password").isString().withMessage("Teacher password should be string"),
    body("fullName").isAlpha().withMessage("Teacher Name should be string"),
    body("email").isEmail().withMessage("Teacher Email not valid!"),
    body("image").isString().withMessage("Teacher Age should be number")
]

module.exports.updateTeacherValidation = [
    body("id").isMongoId().withMessage("Teacher Id should be number"),
    body("password").optional().isString().withMessage("Teacher password should be string"),
    body("fullName").optional().isAlpha().withMessage("Teacher Name should be string"),
    body("email").optional().isEmail().withMessage("Teacher Email not valid!"),
    body("image").optional().isString().withMessage("Teacher Age should be number")
]
module.exports.deleteTeacherValidation = [
    body("id").isMongoId().withMessage("Teacher Id should be number")
    
]
