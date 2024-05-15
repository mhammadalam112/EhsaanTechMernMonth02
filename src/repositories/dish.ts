const knexfile = require('../knexfile');
const knex = require('knex')(knexfile.development);

async function getAllDishes() {
    const rows = knex.select('*').from('dish');
    return rows;
};

async function getDishById(id: number) {
    const rows = knex('dish').where({ id: id });
    return rows;
};

async function createDish(insertObject: any) {
    await knex('dish').insert(insertObject);
};

async function updateDish(id: number, updateObject: any) {
    const rows= knex('dish').where({ id: id }).update(updateObject);
    return rows;
};

async function deleteDish(id: number) {
    await knex('dish').where({ id: id }).del();
};


export {
getAllDishes,
getDishById,
createDish,
updateDish,
deleteDish
};