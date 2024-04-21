const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config({ path: './config/.env' });
const { authSchema, loginSchema } = require('../services/payloadValidation');
const { getChefByUsername, createChef } = require('../repositories/chef');
const { getFoodieByUsername } = require('../repositories/foodie');

async function handleRegistration(req, res) {
    try {
        const { firstName, lastName, userName, password } = req.body;

        const { error } = authSchema.validate(req.body);
        if (error) {
            const errorInfo = error.details[0].message;
            return res.status(400).json({ error: errorInfo });
        }

        const query1 = await getChefByUsername(userName);
        const query2 = await getFoodieByUsername(userName);

        if (query1.length > 0 || query2.length > 0) {
            return res.status(401).json({ "error": "User already exists with the entered username" });
        }

        const encryptedPassword = await bcrypt.hash(password, 10);

        const insertObject = {
            first_name: firstName,
            last_name: lastName,
            username: userName,
            password: encryptedPassword
        };

        await createChef(insertObject);
        return res.json({ "status": "successfully registered" });
    } catch (err) {
        return res.json({ "status": "error occured during user registration" });
    }
};

async function handleLogin(req, res) {
    const { userName, password } = req.body;
    let userPassword = '';

    const { error } = loginSchema.validate(req.body);
    if (error) {
        const errorInfo = error.details[0].message;
        return res.status(400).json({ error: errorInfo });
    }

    const rows = await getChefByUsername(userName);
    if (rows.length <= 0) {
        return res.status(401).json({ "error": "provided user does not exist. Please register" });
    } else {
        userPassword = rows[0].password;
    }

    const isPasswordValid = await bcrypt.compare(password, userPassword);

    if (isPasswordValid) {
        const token = jwt.sign({ username: userName }, process.env.JWT_SECREY_KEY);
        res.setHeader('Authorization', token);
        return res.json({ "status": "successfully Logged In" });
    } else {
        return res.status(401).json({ "error": "provided username or password is incorrect" });
    }

};

module.exports = {
    handleRegistration,
    handleLogin
};