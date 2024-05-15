import { Request, Response } from 'express';
import { 
    getPendingOrders, 
    getFoodieOrders, 
    createOrder, 
    completeOrder 
} from '../services/order';
import { ordersSchema } from '../utils/payloadValidation';
import Boom from '@hapi/boom';

interface customRequest extends Request {
    userId: string;
}

async function handleListPendingOrders(req: customRequest, res: Response) {
    const chefId = req.userId;
    let rows = await getPendingOrders(chefId);
    return res.json(rows);
};

async function handleFoodieOrders(req: customRequest, res: Response) {
    const foodieId = req.userId;
    let rows = await getFoodieOrders(foodieId);

    return res.json(rows);
};

async function handleCreateNewOrder(req: customRequest, res: Response) {
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

async function handleCompleteOrder(req: Request, res: Response) {
    const id = req.params.id;

    const updateObject = {
        status: "FULFILLED"
    };

    await completeOrder(id, updateObject);
    return res.json({ "status": "order completed successfully" });
};

export {
    handleListPendingOrders,
    handleFoodieOrders,
    handleCreateNewOrder,
    handleCompleteOrder
};