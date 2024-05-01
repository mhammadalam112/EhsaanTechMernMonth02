const { getAllDishes,
    getDishById,
    createDish,
    updateDish,
    deleteDish } = require('../services/dish');
const { dishCreateSchema, dishUpdateSchema } = require('../utils/payloadValidation');
const Boom = require('@hapi/boom');

async function handleGetAllDishes(req, res) {
    let rows = await getAllDishes();
    return res.json(rows);
};

async function handleGetDishById(req, res) {
    const id = req.params.id;
    let rows = await getDishById(id);
    return res.json(rows);
};

async function handleCreateDish(req, res) {
    const body = req.body;
    const chefId = req.userId;

    const { error } = dishCreateSchema.validate(body);
    if (error) {
        const errorInfo = error.details[0].message;
        const errorBoom = Boom.badRequest(errorInfo);
        throw errorBoom;
    }

    const insertObject = {
        dish_name: body.name,
        category: body.category,
        price: body.price,
        chefId: chefId
    };

    await createDish(insertObject);
    return res.json({ "status": "new dish created successfully" });
};

async function handleUpdateDish(req, res) {
    const body = req.body;
    const id = req.params.id;

    const { error } = dishUpdateSchema.validate(body);
    if (error) {
        const errorInfo = error.details[0].message;
        const errorBoom = Boom.badRequest(errorInfo);
        throw errorBoom;
    }

    const updateObject = {
        dish_name: body.name,
        category: body.category,
        price: body.price
    };

    await updateDish(id, updateObject);
    return res.json({ "status": "dish updated successfully" });
};

async function handleDeleteDish(req, res) {
    const id = req.params.id;
    await deleteDish(id);
    return res.json({ "status": "dish deleted successfully" });
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