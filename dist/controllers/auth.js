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
exports.handleLogin = void 0;
const chef_1 = require("../services/chef");
const foodie_1 = require("../services/foodie");
const auth_1 = require("../services/auth");
const payloadValidation_1 = require("../utils/payloadValidation");
const boom_1 = __importDefault(require("@hapi/boom"));
function handleLogin(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let userName = '';
        let password = '';
        ;
        if ((req.body !== null && req.body !== undefined) && ('userName' in req.body && 'password' in req.body)) {
            userName = req.body.userName;
            password = req.body.password;
        }
        const { error } = payloadValidation_1.loginSchema.validate(req.body);
        if (error) {
            const errorInfo = error.details[0].message;
            const errorBoom = boom_1.default.badRequest(errorInfo);
            throw errorBoom;
        }
        if (req.userType == 'chef') {
            var user = yield (0, chef_1.getChefByUsername)(userName);
            yield (0, auth_1.login)(user, userName, password, res, "chef");
        }
        else {
            var user = yield (0, foodie_1.getFoodieByUsername)(userName);
            yield (0, auth_1.login)(user, userName, password, res, "foodie");
        }
        return res.json({ "status": "successfully Logged In", "token": res.token });
    });
}
exports.handleLogin = handleLogin;
;
