const { getAllDishes,
    getDishById,
    createDish,
    updateDish,
    deleteDish } = require('../repositories/dish');
const { dishCreateSchema, dishUpdateSchema } = require('../services/payloadValidation');

async function handleGetAllDishes(req, res) {
    try {
        let rows = await getAllDishes();
        return res.json(rows);
    } catch (err) {
        return res.json({ "status": "error occured while fetching dishes" });
    }
};

async function handleGetDishById(req, res) {
    try {
        const id = req.params.id;
        let rows = await getDishById(id);
        if(rows.length < 1){
            return res.json({ "message": "no dish exists with the given id" });
        }
        return res.json(rows);
    } catch (err) {
        return res.json({ "status": "error occured while fetching dish" });
    }
};

async function handleCreateDish(req, res) {
    try {
        const body = req.body;

        const { error } = dishCreateSchema.validate(body);
        if (error) {
            const errorInfo = error.details[0].message;
            return res.status(400).json({ error: errorInfo });
        }

        const insertObject = {
            dish_name: body.name,
            category: body.category,
            price: body.price
        };

        await createDish(insertObject);
        return res.json({ "status": "new dish created successfully" });
    } catch (err) {
        return res.json({ "status": "error occured while creating dish" });
    }
};

async function handleUpdateDish(req, res) {
    try {
        const body = req.body;
        const id = req.params.id;

        const { error } = dishUpdateSchema.validate(body);
        if (error) {
            const errorInfo = error.details[0].message;
            return res.status(400).json({ error: errorInfo });
        }

        const updateObject = {
            dish_name: body.name,
            category: body.category,
            price: body.price
        };

        await updateDish(id, updateObject);
        return res.json({ "status": "dish updated successfully" });
    } catch (err) {
        return res.json({ "status": "error occured while updating dish" });
    }
};

async function handleDeleteDish(req, res) {
    try {
        const id = req.params.id;
        await deleteDish(id);
        return res.json({ "status": "dish deleted successfully" });
    } catch (err) {
        return res.json({ "status": "error occured while deleting dish" });
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