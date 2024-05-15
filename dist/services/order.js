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
exports.completeOrder = exports.createOrder = exports.getFoodieOrders = exports.getPendingOrders = void 0;
const orderRepo = require('../repositories/order');
const boom_1 = __importDefault(require("@hapi/boom"));
function getPendingOrders(chefId) {
    return __awaiter(this, void 0, void 0, function* () {
        const rows = yield orderRepo.getPendingOrders(chefId);
        return rows;
    });
}
exports.getPendingOrders = getPendingOrders;
;
function getFoodieOrders(foodieId) {
    return __awaiter(this, void 0, void 0, function* () {
        const rows = yield orderRepo.getFoodieOrders(foodieId);
        if (rows.length < 1) {
            const error = boom_1.default.badRequest('there are no pending orders for you');
            throw error;
        }
        return rows;
    });
}
exports.getFoodieOrders = getFoodieOrders;
;
function createOrder(insertObject) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield orderRepo.createOrder(insertObject);
        }
        catch (err) {
            if (err.message.includes('foreign key constraint fails')) {
                const error = boom_1.default.badRequest('No such dish exists');
                throw error;
            }
            else {
                const error = boom_1.default.badRequest('error occured while creating order');
                throw error;
            }
        }
    });
}
exports.createOrder = createOrder;
;
function completeOrder(id, updateObject) {
    return __awaiter(this, void 0, void 0, function* () {
        const completedOrder = yield orderRepo.completeOrder(id, updateObject);
        if (completedOrder == 0) {
            const error = boom_1.default.badRequest('no such order exists with the given id');
            throw error;
        }
    });
}
exports.completeOrder = completeOrder;
;
