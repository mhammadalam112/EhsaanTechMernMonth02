const dishRepo = require('../repositories/dish');
const Boom = require('@hapi/boom');    

async function getAllDishes() {
    let rows = await dishRepo.getAllDishes();
    return rows;
};

async function getDishById(id) {
    const rows = await dishRepo.getDishById(id);
    if(rows.length < 1){
        const error = Boom.badRequest('no dish exists with the given id');
        throw error;
    }
    return rows;
};

async function createDish(insertObject) {
    await dishRepo.createDish(insertObject);
};

async function updateDish(id, updateObject) {
    const updatedDish=await dishRepo.updateDish(id, updateObject);
    if(updatedDish == 0){
        const error = Boom.badRequest('no such dish exists with the given id');
        throw error;
    }
};

async function deleteDish(id) {
    await dishRepo.deleteDish(id);
};


module.exports = {
    getAllDishes,
    getDishById,
    createDish,
    updateDish,
    deleteDish
};