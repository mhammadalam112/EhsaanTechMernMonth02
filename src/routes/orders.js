const express = require("express");
const router = express.Router();
const {    
handleListAllOrders,
handleFoodieOrders,
handleCreateNewOrder,
} = require('../controllers/orders');
const { authenticateUser } = require('../middlewares/authenticate');

router.get("/list", authenticateUser("restrictAccess"), handleListAllOrders);

router.get("/foodie/list", authenticateUser() , handleFoodieOrders);

router.post("/", authenticateUser() , handleCreateNewOrder);

module.exports = router;   