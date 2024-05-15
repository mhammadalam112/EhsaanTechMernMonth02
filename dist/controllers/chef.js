"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleRegistration = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const dotenv_1 = __importDefault(require("dotenv"));
const { authSchema } = require('../utils/payloadValidation');
const { getChefByUsername, createChef } = require('../services/chef');
const { getFoodieByUsername } = require('../services/foodie');
const boom_1 = __importDefault(require("@hapi/boom"));
dotenv_1.default.config({ path: './config/.env' });
function handleRegistration(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { firstName, lastName, userName, password } = req.body;
        const { error } = authSchema.validate(req.body);
        if (error) {
            const errorInfo = error.details[0].message;
            const errorBoom = boom_1.default.badRequest(errorInfo);
            throw errorBoom;
        }
        const query1 = yield getChefByUsername(userName);
        const query2 = yield getFoodieByUsername(userName);
        if (query1.length > 0 || query2.length > 0) {
            const errorBoom = boom_1.default.badRequest('User already exists with the entered username');
            throw errorBoom;
        }
        const encryptedPassword = yield bcryptjs_1.default.hash(password, 10);
        const insertObject = {
            first_name: firstName,
            last_name: lastName,
            username: userName,
            password: encryptedPassword
        };
        yield createChef(insertObject);
        return res.json({ "status": "successfully registered" });
    });
}
exports.handleRegistration = handleRegistration;
;
