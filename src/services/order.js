const orderRepo = require('../repositories/order');
const Boom = require('@hapi/boom');

async function getPendingOrders() {
    const rows = await orderRepo.getAllOrders();
    return rows;
};

async function getFoodieOrders(foodieId) {
    const rows = await orderRepo.getFoodieOrders(foodieId);
    if (rows.length < 1) {
        const error = Boom.badRequest('there are no pending orders for you');
        throw error;
    }
    return rows;
};

async function createOrder(insertObject) {
    try {
        await orderRepo.createOrder(insertObject);
    } catch (err) {
        if (err.message.includes('foreign key constraint fails')) {
            const error = Boom.badRequest('No such dish exists');
            throw error;
        } else {
            const error = Boom.badRequest('error occured while creating order');
            throw error;
        }
    }
};

async function completeOrder(id, updateObject) {
    const completedOrder=await orderRepo.completeOrder(id, updateObject);
    if(completedOrder == 0){
        const error = Boom.badRequest('no such order exists with the given id');
        throw error;
    }
};

    module.exports = {
        getPendingOrders,
        getFoodieOrders,
        createOrder,
        completeOrder
    };