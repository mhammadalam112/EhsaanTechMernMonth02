const { getFoodieByUsername, createFoodie } = require('../repositories/foodie');
const Boom = require('@hapi/boom');
const bcrypt = require('bcryptjs');

async function getFoodieByUsernameService(userName) {
    const rows = await getFoodieByUsername(userName);
    return rows;
};

async function createFoodieService(insertObject) {
    await createFoodie(insertObject);
};

async function handleLoginService(foodies, userName, password, res) {
    var userPassword = foodies[0].password;

    const isPasswordValid = await bcrypt.compare(password, userPassword);

    if (!isPasswordValid) {
        const errorBoom = Boom.badRequest('provided username or password is incorrect');
        throw errorBoom;
    }
};

module.exports = {
    getFoodieByUsernameService,
    createFoodieService,
    handleLoginService
};