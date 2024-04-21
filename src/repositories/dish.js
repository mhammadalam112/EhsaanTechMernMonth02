const knexfile = require('../../knexfile');
const knex = require('knex')(knexfile.development);

async function getAllDishes(){
    try{
    const rows = await knex.select('*').from('dish');
    return rows;
    }catch(err){
        throw error;
    }
};

async function getDishById(id){
    try{
    const rows = await knex('dish').where({ id: id });
    return rows;
    }catch(err){
        throw error;
    }
};

async function createDish(insertObject){
    try{
        await knex('dish').insert(insertObject);
    }catch(err){
        throw error;
    }
};

async function updateDish(id, updateObject){
    try{
        await knex('dish').where({ id: id }).update(updateObject);
    }catch(err){
        throw error;
    }
};

async function deleteDish(id){
    try{
        await knex('dish').where({ id: id }).del();
    }catch(err){
        console.log(err);
        throw err;
    }
};


module.exports = {
    getAllDishes,
    getDishById,
    createDish,
    updateDish,
    deleteDish
};