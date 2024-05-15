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
exports.handleImageUpload = exports.handleDeleteDish = exports.handleUpdateDish = exports.handleCreateDish = exports.handleGetDishById = exports.handleGetAllDishes = void 0;
const dish_1 = require("../services/dish");
const payloadValidation_1 = require("../utils/payloadValidation");
const boom_1 = __importDefault(require("@hapi/boom"));
function handleGetAllDishes(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let rows = yield (0, dish_1.getAllDishes)();
        return res.json(rows);
    });
}
exports.handleGetAllDishes = handleGetAllDishes;
;
function handleGetDishById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        let rows = yield (0, dish_1.getDishById)(id);
        return res.json(rows);
    });
}
exports.handleGetDishById = handleGetDishById;
;
function handleCreateDish(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = req.body;
        const chefId = req.userId;
        const { error } = payloadValidation_1.dishCreateSchema.validate(body);
        if (error) {
            const errorInfo = error.details[0].message;
            const errorBoom = boom_1.default.badRequest(errorInfo);
            throw errorBoom;
        }
        const insertObject = {
            dish_name: body.name,
            category: body.category,
            price: body.price,
            chefId: chefId
        };
        yield (0, dish_1.createDish)(insertObject);
        return res.json({ "status": "new dish created successfully" });
    });
}
exports.handleCreateDish = handleCreateDish;
;
function handleUpdateDish(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = req.body;
        const id = req.params.id;
        const { error } = payloadValidation_1.dishUpdateSchema.validate(body);
        if (error) {
            const errorInfo = error.details[0].message;
            const errorBoom = boom_1.default.badRequest(errorInfo);
            throw errorBoom;
        }
        const updateObject = {
            dish_name: body.name,
            category: body.category,
            price: body.price
        };
        yield (0, dish_1.updateDish)(id, updateObject);
        return res.json({ "status": "dish updated successfully" });
    });
}
exports.handleUpdateDish = handleUpdateDish;
;
function handleDeleteDish(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        yield (0, dish_1.deleteDish)(id);
        return res.json({ "status": "dish deleted successfully" });
    });
}
exports.handleDeleteDish = handleDeleteDish;
;
function handleImageUpload(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        return res.json(req.file);
    });
}
exports.handleImageUpload = handleImageUpload;
;
