const express = require("express");
const router = express.Router();
const {    
handleRegistration,
handleLogin
} = require('../controllers/foodie');
const { userLogin } = require('../middlewares/authenticate');

router.post("/register", handleRegistration);

router.post("/login", userLogin, handleLogin);



module.exports = router;