const knexfile = require('../knexfile');
const knex = require('knex')(knexfile.development);

async function getFoodieByUsername(userName: string) {
    const rows =  knex.select('*').from('foodie').where({ username: userName });
    return rows;
};

async function createFoodie(insertObject: any) {
    await knex('foodie').insert(insertObject);
};


export {
    getFoodieByUsername,
    createFoodie
};