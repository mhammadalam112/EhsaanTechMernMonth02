"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const { handleListPendingOrders, handleFoodieOrders, handleCreateNewOrder, handleCompleteOrder } = require('../controllers/orders');
const { authenticateUser } = require('../middlewares/authenticate');
router.get("/list", authenticateUser("restrictAccess"), handleListPendingOrders);
router.get("/foodie/list", authenticateUser(), handleFoodieOrders);
router.post("/", authenticateUser(), handleCreateNewOrder);
router.patch("/complete/:id", authenticateUser("restrictAccess"), handleCompleteOrder);
exports.default = router;
