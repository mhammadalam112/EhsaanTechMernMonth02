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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: './config/.env' });
const { getChefByUsername } = require('../repositories/chef');
const { getFoodieByUsername } = require('../repositories/foodie');
const Boom = require('@hapi/boom');
var userId = '';
function userLogin(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const userName = req.body.userName;
        const query1 = yield getChefByUsername(userName);
        const query2 = yield getFoodieByUsername(userName);
        if (query1.length < 1 && query2.length < 1) {
            const errorBoom = Boom.badRequest('provided user does not exist. Please register');
            throw errorBoom;
        }
        else {
            if (query1.length > 0) {
                userId = query1[0].userId;
                req.userType = "chef";
            }
            else {
                userId = query2[0].userId;
                req.userType = "foodie";
            }
        }
        next();
    });
}
;
function authenticateUser(access) {
    return function (req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!userId) {
                return res.json({ "error": "user not logged in. Please login again" });
            }
            if (access == "restrictAccess") {
                const token = req.headers.authorization;
                if (!token) {
                    return res.json({ "error": "not authorized to perform this operation" });
                }
                const jwtSecretKey = process.env.JWT_SECREY_KEY;
                const validUser = jsonwebtoken_1.default.verify(token, jwtSecretKey);
                if (!validUser) {
                    return res.json({ "error": "not authorized to perform this operation" });
                }
            }
            req.userId = userId;
            next();
        });
    };
}
;
function globalErrorHandler(err, req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        err.statusCode = err.statusCode ? err.statusCode : 500;
        return res.status(err.statusCode).json({ message: err.message });
    });
}
;
module.exports = { authenticateUser, userLogin, globalErrorHandler };
