import { Request, Response } from 'express';
import { 
    getAllDishes, 
    getDishById, 
    createDish, 
    updateDish, 
    deleteDish 
} from '../services/dish';
import { dishCreateSchema, dishUpdateSchema } from '../utils/payloadValidation';
import Boom from '@hapi/boom';

interface customRequest extends Request {
    userId: string;
}

async function handleGetAllDishes(req: Request, res: Response) {
    let rows = await getAllDishes();
    return res.json(rows);
};

async function handleGetDishById(req: Request, res: Response) {
    const id = req.params.id;
    let rows = await getDishById(id);
    return res.json(rows);
};

async function handleCreateDish(req: customRequest, res: Response) {
    const body = req.body;
    const chefId = req.userId;

    const { error } = dishCreateSchema.validate(body);
    if (error) {
        const errorInfo = error.details[0].message;
        const errorBoom = Boom.badRequest(errorInfo);
        throw errorBoom;
    }

    interface insertObject {
        dish_name: string;
        category: string;
        price: string; 
        chefId: string; 
    }

    const insertObject: insertObject = {
        dish_name: body.name,
        category: body.category,
        price: body.price,
        chefId: chefId
    };

    await createDish(insertObject);
    return res.json({ "status": "new dish created successfully" });
};

async function handleUpdateDish(req: Request, res: Response) {
    const body = req.body;
    const id = req.params.id;

    const { error } = dishUpdateSchema.validate(body);
    if (error) {
        const errorInfo = error.details[0].message;
        const errorBoom = Boom.badRequest(errorInfo);
        throw errorBoom;
    }

    interface updateObject {
        dish_name: string;
        category: string;
        price: string;
    }

    const updateObject: updateObject = {
        dish_name: body.name,
        category: body.category,
        price: body.price
    };

    await updateDish(id, updateObject);
    return res.json({ "status": "dish updated successfully" });
};

async function handleDeleteDish(req: Request, res: Response) {
    const id = req.params.id;
    await deleteDish(id);
    return res.json({ "status": "dish deleted successfully" });
};

async function handleImageUpload(req: Request, res: Response) {
    return res.json(req.file);
};


export {
    handleGetAllDishes,
    handleGetDishById,
    handleCreateDish,
    handleUpdateDish,
    handleDeleteDish,
    handleImageUpload
};