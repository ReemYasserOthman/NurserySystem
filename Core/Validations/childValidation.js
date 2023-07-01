const {body,param,query} = require("express-validator");
const levels = [
    "PreKG",
    "KG1",
    "KG2"
  ]
  

module.exports.addChildValidation = [
    body("id").isNumeric().withMessage("Child Id should be number"),
    body("fullName").isString().withMessage("Child Name should be string"),
    body("age").isNumeric().withMessage("Child Age should be number"),
    body("address").isObject().withMessage("Child Age should be object"),
    body("address.city").isString().withMessage("City should be string"),
    body("address.street").isNumeric().withMessage("street should be number"),
    body("address.building").isNumeric().withMessage("building should be number"),
    body("level").isIn(levels).withMessage("Level contain invalid value."),
    
]
module.exports.updateChildValidation = [
    body("id").isNumeric().withMessage("Child Id should be number"),
    body("fullName").optional().isString().withMessage("Child Name should be string"),
    body("age").optional().isNumeric().withMessage("Child Age should be number"),
    body("address").optional().isObject().withMessage("Child Age should be object"),
    body("address.city").optional().isString().withMessage("City should be string"),
    body("address.street").optional().isNumeric().withMessage("street should be number"),
    body("address.building").optional().isNumeric().withMessage("building should be number"),
    body("level").optional().isIn(levels).withMessage("Level contain invalid value.")    
    
]
module.exports.deleteChildValidation = [
    body("id").isNumeric().withMessage("Child Id should be number") 
    
]
module.exports.getByIdChildValidation = [
    param("id").isNumeric().withMessage("Child Id should be number") 
    
]