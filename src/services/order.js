const { getAllOrders, getFoodieOrders, createOrder } = require('../repositories/order');
const Boom = require('@hapi/boom');

async function getAllOrdersService() {
    const rows = await getAllOrders();
    return rows;
};

async function getFoodieOrdersService(foodieId) {
    const rows = await getFoodieOrders(foodieId);
    if (rows.length < 1) {
        const error = Boom.badRequest('there are no pending orders for you');
        throw error;
    }
    return rows;
};

async function createOrderService(insertObject) {
    try {
        await createOrder(insertObject);
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


    module.exports = {
        getAllOrdersService,
        getFoodieOrdersService,
        createOrderService
    };