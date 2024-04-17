const joi = require('joi'); 

const authSchema = joi.object({
    firstName : joi.string().required().messages({'any.required': 'First name is required'}),
    lastName : joi.string().required().messages({'any.required': 'Last name is required'}),
    userName : joi.string().required().messages({'any.required': 'username is required'}),
    password : joi.string().min(8).pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
    .required().messages({
        'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
        'string.min': 'Password must be at least 8 characters long',
        'any.required': 'Password is required'
      })
});

module.exports = {
    authSchema
}