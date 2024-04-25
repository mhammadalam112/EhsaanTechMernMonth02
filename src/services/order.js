const { getAllOrders, getFoodieOrders, createOrder } = require('../repositories/order');
const Boom = require('@hapi/boom'); 

async function getAllOrdersService() {
    const rows = await getAllOrders();
    return rows;
};

async function getFoodieOrdersService(foodieId) {
    const rows = await getFoodieOrders(foodieId);
    if(rows.length < 1){
        const error = Boom.badRequest('there are no pending orders for you');
        throw error;
    }
    return rows;
};

async function createOrderService(insertObject) {
    await createOrder(insertObject);
};


module.exports = {
    getAllOrdersService,
    getFoodieOrdersService,
    createOrderService
};