const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config({ path: './config/.env' });
const { authSchema, loginSchema } = require('../utils/payloadValidation');
const { getChefByUsername, createChef} = require('../services/chef');
const { getFoodieByUsername } = require('../services/foodie');
const Boom = require('@hapi/boom');

async function handleRegistration(req, res) {
        const { firstName, lastName, userName, password } = req.body;

        const { error } = authSchema.validate(req.body);
        if (error) {
            const errorInfo = error.details[0].message;
            const errorBoom = Boom.badRequest(errorInfo);
            throw errorBoom;
        }

        const query1 = await getChefByUsername(userName);
        const query2 = await getFoodieByUsername(userName);

        if (query1.length > 0 || query2.length > 0) {
            const errorBoom = Boom.badRequest('User already exists with the entered username');
            throw errorBoom;
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
};



module.exports = {
    handleRegistration
};