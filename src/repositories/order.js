const knexfile = require('../../knexfile');
const knex = require('knex')(knexfile.development);

async function getPendingOrders(chefId) {
    const rows = knex.select('orders.id as orderId',
        'orders.dish_name',
        'orders.order_quantity',
        'orders.price',
        'orders.status',
        'dish.chefId')
        .from('orders')
        .innerJoin('dish', 'orders.dish_id', 'dish.id')
        .innerJoin('chef', 'dish.chefId', 'chef.userId')
        .where('chef.userId', chefId)
        .andWhere('orders.status', 'PENDING');
    return rows;
};

async function getFoodieOrders(foodieId) {
    const rows = knex('orders').where({ foodieId: foodieId });
    return rows;
};

async function createOrder(insertObject) {
    await knex('orders').insert(insertObject);
};

async function completeOrder(id, updateObject) {
    const rows = knex('orders').where({ id: id }).update(updateObject);
    return rows;
};

module.exports = {
    getPendingOrders,
    getFoodieOrders,
    createOrder,
    completeOrder
};