import joi from 'joi';

const authSchema = joi.object({
    firstName : joi.string().required().messages({'any.required': 'First name is required'}),
    lastName : joi.string().required().messages({'any.required': 'Last name is required'}),
    userName : joi.string().required().messages({'any.required': 'username is required'}),
    password : joi.string().required().min(8).pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
    .messages({
        'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
        'string.min': 'Password must be at least 8 characters long',
        'any.required': 'Password is required'
      })
});

const loginSchema = joi.object({
    userName : joi.string().required().messages({'any.required': 'username is required'}),
    password : joi.string().required().messages({'any.required': 'Password is required'})
});

const ordersSchema = joi.object({
    name : joi.string().required().messages({'any.required': 'dish name is required'}),
    quantity : joi.number().required().min(0).messages({'any.required': 'dish quantity is required'}),
    dish_id : joi.number().required().min(0).messages({'any.required': 'dish id is required'}),
    price : joi.number().required().min(0).messages({'any.required': 'dish price is required'})
});

const dishCreateSchema = joi.object({
    name : joi.string().required().messages({'any.required': 'dish name is required'}),
    category : joi.string().required().messages({'any.required': 'dish category is required'}),
    price : joi.number().required().min(0).messages({'any.required': 'dish price is required'})
});

const dishUpdateSchema = joi.object({
    name : joi.string(),
    category : joi.string(),
    price : joi.number().min(0)
});


export {
    authSchema,
    loginSchema,
    ordersSchema,
    dishCreateSchema,
    dishUpdateSchema
}