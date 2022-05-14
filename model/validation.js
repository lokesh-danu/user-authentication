const Joi = require('joi');
const regSchema = Joi.object({
    name : Joi.string().min(5),
    password : Joi.string().min(8),
    email : Joi.string().email()
})
const regValidation = (data) => {
     return regSchema.validate(data);
}

const loginSchema = Joi.object({
    password : Joi.string().min(8),
    email : Joi.string().email()
})
const loginValidation = (data) => {
     return loginSchema.validate(data);
}

module.exports.regValidation = regValidation;
module.exports.loginValidation = loginValidation;