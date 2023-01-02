const joi = require('@hapi/joi')


// signup validation
const signupValidation = (data) => {
    const schema = {
    name:joi.string().required(),
    email:joi.string().required(),
    password: joi.string().required(),
    phone: joi.string().required(),
    phone: joi.string().required(),
    role: joi.string().required(),
    address: joi.string().required(),
    age: joi.string().required(),
    address: joi.string().required(),
    ward: joi.string().required(),
    pollingunit: joi.string().required(),
    electionDate: joi.string().required(),
    electionTime: joi.string().required()

    }
    return joi.validate(data, schema)
    
}
//login vallidation 
const signinValidation = (data) => {
    const schema = {
   email:joi.string().required(),
    password: joi.string().required()
    }
    return joi.validate(data, schema)
    
}


module.exports.signupValidation = signupValidation
module.exports.signinValidation = signinValidation
