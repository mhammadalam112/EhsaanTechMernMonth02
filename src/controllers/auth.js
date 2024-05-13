const { getChefByUsername } = require('../services/chef');
const { getFoodieByUsername } = require('../services/foodie');
const { login } = require('../services/auth');
const { loginSchema } = require('../utils/payloadValidation');
const Boom = require('@hapi/boom');


async function handleLogin(req, res) {
    const { userName, password } = req.body;

    const { error } = loginSchema.validate(req.body);
    if (error) {
        const errorInfo = error.details[0].message;
        const errorBoom = Boom.badRequest(errorInfo);
        throw errorBoom;
    }

    if(req.userType == 'chef' ){
        var user = await getChefByUsername(userName);
        await login(user,userName,password,res,"chef"); 
    } else {
        var user = await getFoodieByUsername(userName);
        await login(user,userName,password,res,"foodie"); 
    }

    

    return res.json({ "status": "successfully Logged In", "token": res.token });

};

module.exports = {
    handleLogin
};