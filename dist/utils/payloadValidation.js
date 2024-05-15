"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dishUpdateSchema = exports.dishCreateSchema = exports.ordersSchema = exports.loginSchema = exports.authSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const authSchema = joi_1.default.object({
    firstName: joi_1.default.string().required().messages({ 'any.required': 'First name is required' }),
    lastName: joi_1.default.string().required().messages({ 'any.required': 'Last name is required' }),
    userName: joi_1.default.string().required().messages({ 'any.required': 'username is required' }),
    password: joi_1.default.string().required().min(8).pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
        .messages({
        'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
        'string.min': 'Password must be at least 8 characters long',
        'any.required': 'Password is required'
    })
});
exports.authSchema = authSchema;
const loginSchema = joi_1.default.object({
    userName: joi_1.default.string().required().messages({ 'any.required': 'username is required' }),
    password: joi_1.default.string().required().messages({ 'any.required': 'Password is required' })
});
exports.loginSchema = loginSchema;
const ordersSchema = joi_1.default.object({
    name: joi_1.default.string().required().messages({ 'any.required': 'dish name is required' }),
    quantity: joi_1.default.number().required().min(0).messages({ 'any.required': 'dish quantity is required' }),
    dish_id: joi_1.default.number().required().min(0).messages({ 'any.required': 'dish id is required' }),
    price: joi_1.default.number().required().min(0).messages({ 'any.required': 'dish price is required' })
});
exports.ordersSchema = ordersSchema;
const dishCreateSchema = joi_1.default.object({
    name: joi_1.default.string().required().messages({ 'any.required': 'dish name is required' }),
    category: joi_1.default.string().required().messages({ 'any.required': 'dish category is required' }),
    price: joi_1.default.number().required().min(0).messages({ 'any.required': 'dish price is required' })
});
exports.dishCreateSchema = dishCreateSchema;
const dishUpdateSchema = joi_1.default.object({
    name: joi_1.default.string(),
    category: joi_1.default.string(),
    price: joi_1.default.number().min(0)
});
exports.dishUpdateSchema = dishUpdateSchema;
