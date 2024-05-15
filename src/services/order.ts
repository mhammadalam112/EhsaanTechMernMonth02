const orderRepo = require('../repositories/order');
import Boom from '@hapi/boom';

async function getPendingOrders(chefId: string) {
    const rows = await orderRepo.getPendingOrders(chefId);
    return rows;
};

async function getFoodieOrders(foodieId: string) {
    const rows = await orderRepo.getFoodieOrders(foodieId);
    if (rows.length < 1) {
        const error = Boom.badRequest('there are no pending orders for you');
        throw error;
    }
    return rows;
};

async function createOrder(insertObject: any) {
    try {
        await orderRepo.createOrder(insertObject);
    } catch (err: any) {
        if (err.message.includes('foreign key constraint fails')) {
            const error = Boom.badRequest('No such dish exists');
            throw error;
        } else {
            const error = Boom.badRequest('error occured while creating order');
            throw error;
        }
    }
};

async function completeOrder(id: string, updateObject: any) {
    const completedOrder=await orderRepo.completeOrder(id, updateObject);
    if(completedOrder == 0){
        const error = Boom.badRequest('no such order exists with the given id');
        throw error;
    }
};

export {
    getPendingOrders,
    getFoodieOrders,
    createOrder,
    completeOrder
};