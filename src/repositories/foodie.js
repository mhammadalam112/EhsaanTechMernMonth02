const knexfile = require('../../knexfile');
const knex = require('knex')(knexfile.development);

async function getFoodieByUsername(userName) {
    const rows =  knex.select('*').from('foodie').where({ username: userName });
    return rows;
};

async function createFoodie(insertObject) {
    await knex('foodie').insert(insertObject);
};


module.exports = {
    getFoodieByUsername,
    createFoodie
};