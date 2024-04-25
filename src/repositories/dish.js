const knexfile = require('../../knexfile');
const knex = require('knex')(knexfile.development);

async function getAllDishes() {
    const rows = await knex.select('*').from('dish');
    return rows;
};

async function getDishById(id) {
    const rows = await knex('dish').where({ id: id });
    return rows;
};

async function createDish(insertObject) {
    await knex('dish').insert(insertObject);
};

async function updateDish(id, updateObject) {
    await knex('dish').where({ id: id }).update(updateObject);
};

async function deleteDish(id) {
    await knex('dish').where({ id: id }).del();
};


module.exports = {
    getAllDishes,
    getDishById,
    createDish,
    updateDish,
    deleteDish
};