"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const { handleRegistration } = require('../controllers/chef');
const { handleLogin } = require('../controllers/auth');
const { userLogin } = require('../middlewares/authenticate');
router.post("/register", handleRegistration);
router.post("/login", userLogin, handleLogin);
exports.default = router;
