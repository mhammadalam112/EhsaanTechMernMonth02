import express from "express";
const router = express.Router();
const {    
handleListPendingOrders,
handleFoodieOrders,
handleCreateNewOrder,
handleCompleteOrder
} = require('../controllers/orders');
const { authenticateUser } = require('../middlewares/authenticate');

router.get("/list", authenticateUser("restrictAccess"), handleListPendingOrders);

router.get("/foodie/list", authenticateUser() , handleFoodieOrders);

router.post("/", authenticateUser() , handleCreateNewOrder);

router.patch("/complete/:id" , authenticateUser("restrictAccess"), handleCompleteOrder);

export default router;