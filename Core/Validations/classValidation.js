const {body,param,query} = require("express-validator");

module.exports.addClassValidation=[
    //body("id").isNumeric().withMessage("Class Id should be number"),
    body("name").isString().withMessage("Class Name should be string"),
    body("supervisor").isMongoId().withMessage("Class supervisor should be object!"),
    body("childrens").isArray().withMessage("Class childrens should be Array!"),
    body("childrens[*]").isInt().withMessage("Class childrens elements should be Numbers!")    

]
module.exports.updateClassValidation=[
    body("id").isNumeric().withMessage("Class Id should be number"),
    body("name").optional().isString().withMessage("Class Name should be string"),
    body("supervisor").optional().isMongoId().withMessage("Class supervisor should be object!"),
    body("childrens").optional().isArray().withMessage("Class childrens should be Array!"),
    body("childrens[*]").optional().isInt().withMessage("Class childrens elements should be Numbers!")    

]
module.exports.deleteClassValidation=[
    body("id").isNumeric().withMessage("Class Id should be number")
]
module.exports.getByIdClassValidation=[
    param("id").isNumeric().withMessage("Class or children Id should be number")
]
module.exports.supervisorClassValidation=[
    param("id").isMongoId().withMessage("Class supervisor should be object!")
]