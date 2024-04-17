const knexfile = require('../../knexfile');
const knex = require('knex')(knexfile.development);


async function handleListAllOrders(req, res) {
    try {
        let rows = await knex.select('*').from('orders');
        return res.json(rows);
    } catch (err) {
        return res.json({ "status": "error occured" });
    }
};

async function handleFoodieOrders(req, res) {
    const foodieUsername = req.cookies.username;
    try {
        let rows = await knex('orders').where({ order_by: foodieUsername });
        return res.json(rows);
    } catch (err) {
        return res.json({ "status": "error occured" });
    }
};

async function handleCreateNewOrder(req, res) {
    const body = req.body;
    const foodieUsername = req.cookies.username;

    const insertObject = {
        dish_name: body.name,
        order_quantity: body.quantity,
        order_by: foodieUsername,
        dish_id: body.dish_id,
        price: body.price
    };

    try {
        await knex('orders').insert(insertObject);
        return res.json({ "status": "success" });
    } catch (err) {
        console.log("error mssg ",err.message);
        if(err.message.includes('foreign key constraint fails')){
            return res.json({ "error": "No such dish exists" });
        }else{
        return res.json({ "status": "error" });
        }
    }
};




module.exports = {
    handleListAllOrders,
    handleFoodieOrders,
    handleCreateNewOrder
};