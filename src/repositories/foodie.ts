const knexfile = require('../knexfile');
const knex = require('knex')(knexfile.development);

async function getFoodieByUsername(userName: string) {
    const rows =  knex.select('*').from('foodie').where({ username: userName });
    return rows;
};

interface insertObject {
    first_name: string;
    last_name: string;
    username: string; 
    password: string; 
}

async function createFoodie(insertObject: insertObject) {
    await knex('foodie').insert(insertObject);
};


export {
    getFoodieByUsername,
    createFoodie
};