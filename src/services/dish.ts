const dishRepo = require('../repositories/dish');
import Boom from '@hapi/boom';

async function getAllDishes() {
    let rows = await dishRepo.getAllDishes();
    return rows;
};

async function getDishById(id: string) {
    const rows = await dishRepo.getDishById(id);
    if(rows.length < 1){
        const error = Boom.badRequest('no dish exists with the given id');
        throw error;
    }
    return rows;
};

async function createDish(insertObject: any) {
    await dishRepo.createDish(insertObject);
};

async function updateDish(id: string, updateObject: any) {
    const updatedDish=await dishRepo.updateDish(id, updateObject);
    if(updatedDish == 0){
        const error = Boom.badRequest('no such dish exists with the given id');
        throw error;
    }
};

async function deleteDish(id: string) {
    await dishRepo.deleteDish(id);
};


export {
    getAllDishes,
    getDishById,
    createDish,
    updateDish,
    deleteDish
};