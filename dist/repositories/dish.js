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
exports.deleteDish = exports.updateDish = exports.createDish = exports.getDishById = exports.getAllDishes = void 0;
const knexfile = require('../knexfile');
const knex = require('knex')(knexfile.development);
function getAllDishes() {
    return __awaiter(this, void 0, void 0, function* () {
        const rows = knex.select('*').from('dish');
        return rows;
    });
}
exports.getAllDishes = getAllDishes;
;
function getDishById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const rows = knex('dish').where({ id: id });
        return rows;
    });
}
exports.getDishById = getDishById;
;
function createDish(insertObject) {
    return __awaiter(this, void 0, void 0, function* () {
        yield knex('dish').insert(insertObject);
    });
}
exports.createDish = createDish;
;
function updateDish(id, updateObject) {
    return __awaiter(this, void 0, void 0, function* () {
        const rows = knex('dish').where({ id: id }).update(updateObject);
        return rows;
    });
}
exports.updateDish = updateDish;
;
function deleteDish(id) {
    return __awaiter(this, void 0, void 0, function* () {
        yield knex('dish').where({ id: id }).del();
    });
}
exports.deleteDish = deleteDish;
;
