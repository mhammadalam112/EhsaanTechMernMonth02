const knexfile = require('../knexfile');
const knex = require('knex')(knexfile.development);

async function getPendingOrders(chefId: string) {
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

async function getFoodieOrders(foodieId: string) {
    const rows = knex('orders').where({ foodieId: foodieId });
    return rows;
};

interface insertObject {
    dish_name: string;
    order_quantity: string;
    foodieId: string; 
    dish_id: string; 
    price: string;
}

async function createOrder(insertObject: insertObject) {
    await knex('orders').insert(insertObject);
};

async function completeOrder(id: string, updateObject: any) {
    const rows = knex('orders').where({ id: id }).update(updateObject);
    return rows;
};

export {
    getPendingOrders,
    getFoodieOrders,
    createOrder,
    completeOrder
};