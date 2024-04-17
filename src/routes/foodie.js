const express = require("express");
const router = express.Router();
const {    
handleRegistration,
handleLogin
} = require('../controllers/foodie');


router.post("/register", handleRegistration);

router.post("/login", handleLogin);



module.exports = router;