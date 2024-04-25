const knexfile = require('../../knexfile');
const knex = require('knex')(knexfile.development);

async function getAllOrders() {
    const rows = await knex.select('*').from('orders');
    return rows;
};

async function getFoodieOrders(foodieId) {
    const rows = await knex('orders').where({ foodieId: foodieId });
    return rows;
};

async function createOrder(insertObject) {
    await knex('orders').insert(insertObject);
};


module.exports = {
    getAllOrders,
    getFoodieOrders,
    createOrder
};