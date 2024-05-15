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
Object.defineProperty(exports, "__esModule", { value: true });
exports.completeOrder = exports.createOrder = exports.getFoodieOrders = exports.getPendingOrders = void 0;
const knexfile = require('../knexfile');
const knex = require('knex')(knexfile.development);
function getPendingOrders(chefId) {
    return __awaiter(this, void 0, void 0, function* () {
        const rows = knex.select('orders.id as orderId', 'orders.dish_name', 'orders.order_quantity', 'orders.price', 'orders.status', 'dish.chefId')
            .from('orders')
            .innerJoin('dish', 'orders.dish_id', 'dish.id')
            .innerJoin('chef', 'dish.chefId', 'chef.userId')
            .where('chef.userId', chefId)
            .andWhere('orders.status', 'PENDING');
        return rows;
    });
}
exports.getPendingOrders = getPendingOrders;
;
function getFoodieOrders(foodieId) {
    return __awaiter(this, void 0, void 0, function* () {
        const rows = knex('orders').where({ foodieId: foodieId });
        return rows;
    });
}
exports.getFoodieOrders = getFoodieOrders;
;
function createOrder(insertObject) {
    return __awaiter(this, void 0, void 0, function* () {
        yield knex('orders').insert(insertObject);
    });
}
exports.createOrder = createOrder;
;
function completeOrder(id, updateObject) {
    return __awaiter(this, void 0, void 0, function* () {
        const rows = knex('orders').where({ id: id }).update(updateObject);
        return rows;
    });
}
exports.completeOrder = completeOrder;
;
