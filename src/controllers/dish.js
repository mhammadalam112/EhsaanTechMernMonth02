const knexfile = require('../../knexfile');
const knex = require('knex')(knexfile.development);

async function handleGetAllDishes(req, res) {
    try {
        let rows = await knex.select('*').from('dish');
        return res.json(rows);
    } catch (err) {
        return res.json({ "status": "error occured" });
    }
};

async function handleGetDishById(req, res) {
    const id = req.params.id;
    try {
        let rows = await knex('dish').where({ id: id });
        return res.json(rows);
    } catch (err) {
        return res.json({ "status": "error occured" });
    }
};

async function handleCreateDish(req, res) {
    const body = req.body;

    const insertObject = {
        dish_name: body.name,
        category: body.category,
        price: body.price
    };

    try {
        await knex('dish').insert(insertObject);
        return res.json({ "status": "success" });
    } catch (err) {
        return res.json({ "status": "error" });
    }
};

async function handleUpdateDish(req, res) {
    const body = req.body;
    const id = req.params.id;

    const updateObject = {
        dish_name: body.name,
        category: body.category,
        price: body.price
    };

    try {
        await knex('dish').where({ id: id }).update(updateObject);
        return res.json({ "status": "success" });
    } catch (err) {
        return res.json({ "status": "error" });
    }
};

async function handleDeleteDish(req, res) {
    const id = req.params.id;
    try {
        await knex('dish').where({ id: id }).del();
        return res.json({ "status": "success" });
    } catch (err) {
        return res.json({ "status": "error" });
    }

};

async function handleImageUpload(req, res) {
    return res.json(req.file);
};


module.exports = {
    handleGetAllDishes,
    handleGetDishById,
    handleCreateDish,
    handleUpdateDish,
    handleDeleteDish,
    handleImageUpload
};