const { getAllOrders, getFoodieOrders, createOrder } = require('../repositories/order');
const { ordersSchema } = require('../services/payloadValidation');

async function handleListAllOrders(req, res) {
    try {
        let rows = await getAllOrders();
        return res.json(rows);
    } catch (err) {
        return res.json({ "status": "error occured while fetching orders" });
    }
};

async function handleFoodieOrders(req, res) {
    try {
        const foodieUsername = req.username;
        let rows = await getFoodieOrders(foodieUsername);
        if(rows.length < 1){
            return res.json({ "message": "there are no pending orders for you" });
        }
        return res.json(rows);
    } catch (err) {
        return res.json({ "status": "error occured while fetching orders" });
    }
};

async function handleCreateNewOrder(req, res) {
    try {
        const body = req.body;
        const foodieUsername = req.username;

        const { error } = ordersSchema.validate(req.body);
        if(error){
            const errorInfo = error.details[0].message;
            return res.status(400).json({ error: errorInfo });
        }

        const insertObject = {
            dish_name: body.name,
            order_quantity: body.quantity,
            order_by: foodieUsername,
            dish_id: body.dish_id,
            price: body.price
        };

        await createOrder(insertObject);
        return res.json({ "status": "new order created successfully" });
    } catch (err) {
        if (err.message.includes('foreign key constraint fails')) {
            return res.json({ "error": "no such dish exists with the given dish id" });
        } else {
            return res.json({ "status": "error occured while creating order" });
        }
    }
};


module.exports = {
    handleListAllOrders,
    handleFoodieOrders,
    handleCreateNewOrder
};