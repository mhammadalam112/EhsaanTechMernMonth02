const bcrypt = require('bcryptjs');
const { authSchema , loginSchema } = require('../services/payloadValidation');
const { getChefByUsername} = require('../repositories/chef');
const { getFoodieByUsername , createFoodie} = require('../repositories/foodie'); 

async function handleRegistration(req,res){
    const { firstName, lastName, userName, password } = req.body;

    const { error } = authSchema.validate(req.body);
    if(error){
        const errorInfo = error.details[0].message;
        return res.status(400).json({ error: errorInfo });
    }

    const query1 = await getChefByUsername(userName);
    const query2 = await getFoodieByUsername(userName);

    if (query1.length > 0 || query2.length > 0) {
        return res.status(401).json({ "error": "user already exists with the entered username" });
    }

    const encryptedPassword = await bcrypt.hash(password,10);

    const insertObject = {
        first_name: firstName,
        last_name: lastName,
        username: userName,
        password: encryptedPassword
    };

    try {
        await createFoodie(insertObject);
        return res.json({ "status": "successfully registered" });
    } catch (err) {
        return res.json({ "status": "error occured during user registration" });
    }
};

async function handleLogin(req,res){
    const { userName, password } = req.body;
    let userPassword='';
    
    const { error } = loginSchema.validate(req.body);
    if (error) {
        const errorInfo = error.details[0].message;
        return res.status(400).json({ error: errorInfo });
    }

    const rows = await getFoodieByUsername(userName);
    if( rows.length<= 0){
        return res.status(401).json({ "error": "provided user does not exist. Please register" });
    }else{
        userPassword = rows[0].password;
    }

    const isPasswordValid = await bcrypt.compare(password,userPassword);
    
    if(isPasswordValid){
        return res.json({ "status": "successfully logged in" });
    }else{
        return res.status(401).json({ "error": "provided username or password is incorrect" });
    }

};

module.exports = {
    handleRegistration,
    handleLogin
};