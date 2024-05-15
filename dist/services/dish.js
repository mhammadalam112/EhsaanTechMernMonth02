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
exports.deleteDish = exports.updateDish = exports.createDish = exports.getDishById = exports.getAllDishes = void 0;
const dishRepo = require('../repositories/dish');
const boom_1 = __importDefault(require("@hapi/boom"));
function getAllDishes() {
    return __awaiter(this, void 0, void 0, function* () {
        let rows = yield dishRepo.getAllDishes();
        return rows;
    });
}
exports.getAllDishes = getAllDishes;
;
function getDishById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const rows = yield dishRepo.getDishById(id);
        if (rows.length < 1) {
            const error = boom_1.default.badRequest('no dish exists with the given id');
            throw error;
        }
        return rows;
    });
}
exports.getDishById = getDishById;
;
function createDish(insertObject) {
    return __awaiter(this, void 0, void 0, function* () {
        yield dishRepo.createDish(insertObject);
    });
}
exports.createDish = createDish;
;
function updateDish(id, updateObject) {
    return __awaiter(this, void 0, void 0, function* () {
        const updatedDish = yield dishRepo.updateDish(id, updateObject);
        if (updatedDish == 0) {
            const error = boom_1.default.badRequest('no such dish exists with the given id');
            throw error;
        }
    });
}
exports.updateDish = updateDish;
;
function deleteDish(id) {
    return __awaiter(this, void 0, void 0, function* () {
        yield dishRepo.deleteDish(id);
    });
}
exports.deleteDish = deleteDish;
;
