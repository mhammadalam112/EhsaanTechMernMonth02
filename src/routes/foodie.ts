import express from "express";
const router = express.Router();
const { handleRegistration } = require('../controllers/foodie');
const { handleLogin } = require('../controllers/auth');
const { userLogin } = require('../middlewares/authenticate');

router.post("/register", handleRegistration);

router.post("/login", userLogin, handleLogin);



export default router;