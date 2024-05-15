const knexfile = require('../knexfile');
const knex = require('knex')(knexfile.development);

async function getAllDishes() {
    const rows = knex.select('*').from('dish');
    return rows;
};

async function getDishById(id: string) {
    const rows = knex('dish').where({ id: id });
    return rows;
};

interface insertObject {
    dish_name: string;
    category: string;
    price: string; 
    chefId: string; 
}

async function createDish(insertObject: insertObject) {
    await knex('dish').insert(insertObject);
};

interface updateObject {
    dish_name: string;
    category: string;
    price: string;
}

async function updateDish(id: string, updateObject: updateObject) {
    const rows= knex('dish').where({ id: id }).update(updateObject);
    return rows;
};

async function deleteDish(id: string) {
    await knex('dish').where({ id: id }).del();
};


export {
getAllDishes,
getDishById,
createDish,
updateDish,
deleteDish
};