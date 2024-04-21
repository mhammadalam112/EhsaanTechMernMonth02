const knexfile = require('../../knexfile');
const knex = require('knex')(knexfile.development);

async function getChefByUsername(userName){
    try{
    const rows = await knex.select('*').from('chef').where({ username: userName });
    return rows;
    }catch(err){
        throw error;
    }
};

async function createChef(insertObject){
    try{
        await knex('chef').insert(insertObject);
    }catch(err){
        throw error;
    }
};


module.exports = {
    getChefByUsername,
    createChef
};