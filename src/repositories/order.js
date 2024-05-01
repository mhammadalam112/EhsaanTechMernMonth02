const knexfile = require('../../knexfile');
const knex = require('knex')(knexfile.development);

async function getAllOrders() {
    const rows =  knex('orders').where('status', 'PENDING');
    return rows;
};

async function getFoodieOrders(foodieId) {
    const rows =  knex('orders').where({ foodieId: foodieId });
    return rows;
};

async function createOrder(insertObject) {
    await knex('orders').insert(insertObject);
};

async function completeOrder(id, updateObject) {
    const rows= knex('orders').where({ id: id }).update(updateObject);
    return rows;
};

module.exports = {
    getAllOrders,
    getFoodieOrders,
    createOrder,
    completeOrder
};