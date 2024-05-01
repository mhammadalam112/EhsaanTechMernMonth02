const foodieRepo = require('../repositories/foodie');
const Boom = require('@hapi/boom');
const bcrypt = require('bcryptjs');

async function getFoodieByUsername(userName) {
    const rows = await foodieRepo.getFoodieByUsername(userName);
    return rows;
};

async function createFoodie(insertObject) {
    await foodieRepo.createFoodie(insertObject);
};


module.exports = {
    getFoodieByUsername,
    createFoodie
};