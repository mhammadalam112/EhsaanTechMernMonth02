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
exports.createFoodie = exports.getFoodieByUsername = void 0;
const foodieRepo = require('../repositories/foodie');
function getFoodieByUsername(userName) {
    return __awaiter(this, void 0, void 0, function* () {
        const rows = yield foodieRepo.getFoodieByUsername(userName);
        return rows;
    });
}
exports.getFoodieByUsername = getFoodieByUsername;
;
function createFoodie(insertObject) {
    return __awaiter(this, void 0, void 0, function* () {
        yield foodieRepo.createFoodie(insertObject);
    });
}
exports.createFoodie = createFoodie;
;
