const { getChefByUsername, createChef } = require('../repositories/chef');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Boom = require('@hapi/boom');

async function getChefByUsernameService(userName) {
    const rows = await getChefByUsername(userName);
    return rows;
};

async function createChefService(insertObject) {
    await createChef(insertObject);
};

async function handleLoginService(chefs,userName,password,res) {
    var userPassword = chefs[0].password;

    const isPasswordValid = await bcrypt.compare(password, userPassword);

    if (isPasswordValid) {
        const token = jwt.sign({ username: userName }, process.env.JWT_SECREY_KEY);
        res.setHeader('Authorization', token);
    } else {
        const errorBoom = Boom.badRequest('provided username or password is incorrect');
        throw errorBoom;
    }
};

module.exports = {
    getChefByUsernameService,
    createChefService,
    handleLoginService
};

