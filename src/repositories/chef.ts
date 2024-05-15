const knexfile = require('../knexfile');
const knex = require('knex')(knexfile.development);

async function getChefByUsername(userName: string) {
    const rows =  knex.select('*').from('chef').where({ username: userName });
    return rows;
};

interface insertObject {
    first_name: string;
    last_name: string;
    username: string; 
    password: string; 
}

async function createChef(insertObject: insertObject) {
    await knex('chef').insert(insertObject);
};


export {
    getChefByUsername,
    createChef
};