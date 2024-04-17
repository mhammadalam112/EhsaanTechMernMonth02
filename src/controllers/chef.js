const knexfile = require('../../knexfile');
const knex = require('knex')(knexfile.development);
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config({ path: './config/.env' });
const { authSchema } = require('../schemas/payloadSchema'); 

async function handleRegistration(req,res){
    const { firstName, lastName, userName, password } = req.body;

    const { error } = authSchema.validate(req.body);
    if(error){
        const errorInfo = error.details[0].message;
        return res.status(400).json({ error: errorInfo });
    }

    const query1 = await knex.select('*').from('chef').where({ username: userName });
    const query2 = await knex.select('*').from('foodie').where({ username: userName });

    if (query1.length > 0 || query2.length > 0) {
        return res.status(401).json({ "error": "User already exists with the entered username" });
    }

    const encryptedPassword = await bcrypt.hash(password,10);

    const insertObject = {
        first_name: firstName,
        last_name: lastName,
        username: userName,
        password: encryptedPassword
    };

    try {
        await knex('chef').insert(insertObject);
        return res.json({ "status": "successfully registered" });
    } catch (err) {
        return res.json({ "status": "error occured" });
    }
};

async function handleLogin(req,res){
    const { userName, password } = req.body;
    let userPassword='';

    if(!(userName && password)){
        return res.status(400).json({ "error": "Please provide all the values" });
    }else if(!userName){
        return res.status(400).json({ "error": "Please enter username" });
    }else if(!password){
        return res.status(400).json({ "error": "Please enter password" });
    }

    const rows = await knex.select('*').from('chef').where({ username: userName });
    if( rows.length<= 0){
        return res.status(401).json({ "error": "provided user does not exist. Please register" });
    }else{
        userPassword = rows[0].password;
    }

    const isPasswordValid = await bcrypt.compare(password,userPassword);
    
    if(isPasswordValid){
        const token = jwt.sign({username:userName}, process.env.JWT_SECREY_KEY);
        res.cookie("token",token);
        res.cookie("username",userName);
        return res.json({ "status": "successfully Logged In" });
    }else{
        return res.status(401).json({ "error": "provided username or password is incorrect" });
    }

};

module.exports = {
    handleRegistration,
    handleLogin
};