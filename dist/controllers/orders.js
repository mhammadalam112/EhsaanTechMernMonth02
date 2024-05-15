"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleCompleteOrder = exports.handleCreateNewOrder = exports.handleFoodieOrders = exports.handleListPendingOrders = void 0;
const order_1 = require("../services/order");
const payloadValidation_1 = require("../utils/payloadValidation");
const boom_1 = __importDefault(require("@hapi/boom"));
function handleListPendingOrders(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const chefId = req.userId;
        let rows = yield (0, order_1.getPendingOrders)(chefId);
        return res.json(rows);
    });
}
exports.handleListPendingOrders = handleListPendingOrders;
;
function handleFoodieOrders(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const foodieId = req.userId;
        let rows = yield (0, order_1.getFoodieOrders)(foodieId);
        return res.json(rows);
    });
}
exports.handleFoodieOrders = handleFoodieOrders;
;
function handleCreateNewOrder(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = req.body;
        const foodieId = req.userId;
        const { error } = payloadValidation_1.ordersSchema.validate(req.body);
        if (error) {
            const errorInfo = error.details[0].message;
            const errorBoom = boom_1.default.badRequest(errorInfo);
            throw errorBoom;
        }
        const insertObject = {
            dish_name: body.name,
            order_quantity: body.quantity,
            foodieId: foodieId,
            dish_id: body.dish_id,
            price: body.price
        };
        yield (0, order_1.createOrder)(insertObject);
        return res.json({ "status": "new order created successfully" });
    });
}
exports.handleCreateNewOrder = handleCreateNewOrder;
;
function handleCompleteOrder(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        const updateObject = {
            status: "FULFILLED"
        };
        yield (0, order_1.completeOrder)(id, updateObject);
        return res.json({ "status": "order completed successfully" });
    });
}
exports.handleCompleteOrder = handleCompleteOrder;
;
