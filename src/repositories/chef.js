const knexfile = require('../../knexfile');
const knex = require('knex')(knexfile.development);

async function getChefByUsername(userName) {
    const rows =  knex.select('*').from('chef').where({ username: userName });
    return rows;
};

async function createChef(insertObject) {
    await knex('chef').insert(insertObject);
};


module.exports = {
    getChefByUsername,
    createChef
};