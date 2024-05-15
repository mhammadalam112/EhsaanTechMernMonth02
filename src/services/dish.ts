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

interface insertObject {
    dish_name: string;
    category: string;
    price: string; 
    chefId: string; 
}

async function createDish(insertObject: insertObject) {
    await dishRepo.createDish(insertObject);
};

interface updateObject {
    dish_name: string;
    category: string;
    price: string;
}

async function updateDish(id: string, updateObject: updateObject) {
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