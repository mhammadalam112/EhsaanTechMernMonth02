const { getPendingOrders, getFoodieOrders, createOrder, completeOrder } = require('../services/order');
const { ordersSchema } = require('../utils/payloadValidation');
const Boom = require('@hapi/boom');

async function handleListPendingOrders(req, res) {
    let rows = await getPendingOrders();
    return res.json(rows);
};

async function handleFoodieOrders(req, res) {
    const foodieId = req.userId;
    let rows = await getFoodieOrders(foodieId);

    return res.json(rows);
};

async function handleCreateNewOrder(req, res) {
    const body = req.body;
    const foodieId = req.userId;

    const { error } = ordersSchema.validate(req.body);
    if (error) {
        const errorInfo = error.details[0].message;
        const errorBoom = Boom.badRequest(errorInfo);
        throw errorBoom;
    }

    const insertObject = {
        dish_name: body.name,
        order_quantity: body.quantity,
        foodieId: foodieId,
        dish_id: body.dish_id,
        price: body.price
    };

    await createOrder(insertObject);
    return res.json({ "status": "new order created successfully" });
};

async function handleCompleteOrder(req, res) {
    const id = req.params.id;

    const updateObject = {
        status: "FULFILLED"
    };

    await completeOrder(id, updateObject);
    return res.json({ "status": "order completed successfully" });
};

module.exports = {
    handleListPendingOrders,
    handleFoodieOrders,
    handleCreateNewOrder,
    handleCompleteOrder
};