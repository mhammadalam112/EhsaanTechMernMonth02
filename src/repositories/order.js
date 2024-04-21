const knexfile = require('../../knexfile');
const knex = require('knex')(knexfile.development);

async function getAllOrders() {
    try {
        const rows = await knex.select('*').from('orders');
        return rows;
    } catch (err) {
        throw error;
    }
};

async function getFoodieOrders(foodieUsername) {
    try {
        const rows = await knex('orders').where({ order_by: foodieUsername });
        return rows;
    } catch (err) {
        throw error;
    }
};

async function createOrder(insertObject) {
    try {
        await knex('orders').insert(insertObject);
    } catch (err) {
        throw err;
    }
};


module.exports = {
    getAllOrders,
    getFoodieOrders,
    createOrder
};