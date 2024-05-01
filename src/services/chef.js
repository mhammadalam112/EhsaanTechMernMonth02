const chefRepo = require('../repositories/chef');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Boom = require('@hapi/boom');

async function getChefByUsername(userName) {
    const rows = await chefRepo.getChefByUsername(userName);
    return rows;
};

async function createChef(insertObject) {
    await chefRepo.createChef(insertObject);
};


module.exports = {
    getChefByUsername,
    createChef
};

