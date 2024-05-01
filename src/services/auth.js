const Boom = require('@hapi/boom');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function login(user, userName, password, res, userType) {
    var userPassword = user[0].password;

    const isPasswordValid = await bcrypt.compare(password, userPassword);

    if (!isPasswordValid) {
        const errorBoom = Boom.badRequest('provided username or password is incorrect');
        throw errorBoom;
    }

    
    if(userType == 'chef'){
        const token = jwt.sign({ username: userName }, process.env.JWT_SECREY_KEY, { expiresIn: '1h' });
        res.setHeader('Authorization', token);
    }
};


module.exports = {
    login
};