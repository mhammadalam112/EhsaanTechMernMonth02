const knexfile = require('../../knexfile');
const knex = require('knex')(knexfile.development);

async function getFoodieByUsername(userName){
    try{
    const rows = await knex.select('*').from('foodie').where({ username: userName });
    return rows;
    }catch(err){
        throw error;
    }
};

async function createFoodie(insertObject){
    try{
        await knex('foodie').insert(insertObject);
    }catch(err){
        throw error;
    }
};


module.exports = {
    getFoodieByUsername,
    createFoodie
};