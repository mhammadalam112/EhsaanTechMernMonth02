const knexfile = require('../../knexfile');
const knex = require('knex')(knexfile.development);

async function getAllDishes() {
    const rows = knex.select('*').from('dish');
    return rows;
};

async function getDishById(id) {
    const rows = knex('dish').where({ id: id });
    return rows;
};

async function createDish(insertObject) {
    await knex('dish').insert(insertObject);
};

async function updateDish(id, updateObject) {
    const rows= knex('dish').where({ id: id }).update(updateObject);
    return rows;
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