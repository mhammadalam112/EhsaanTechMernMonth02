const { getAllDishes,
    getDishById,
    createDish,
    updateDish,
    deleteDish } = require('../repositories/dish');
const Boom = require('@hapi/boom');    

async function getAllDishesService() {
    let rows = await getAllDishes();
    return rows;
};

async function getDishByIdService(id) {
    let rows = await getDishById(id);
    if(rows.length < 1){
        const error = Boom.badRequest('no dish exists with the given id');
        throw error;
    }
    return rows;
};

async function createDishService(insertObject) {
    await createDish(insertObject);
};

async function updateDishService(id, updateObject) {
    await updateDish(id, updateObject);
};

async function deleteDishService(id) {
    await deleteDish(id);
};


module.exports = {
    getAllDishesService,
    getDishByIdService,
    createDishService,
    updateDishService,
    deleteDishService
};