const knexfile = require('../knexfile');
const knex = require('knex')(knexfile.development);

async function getChefByUsername(userName: string) {
    const rows =  knex.select('*').from('chef').where({ username: userName });
    return rows;
};

async function createChef(insertObject: any) {
    await knex('chef').insert(insertObject);
};


export {
    getChefByUsername,
    createChef
};