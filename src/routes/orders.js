const express = require("express");
const router = express.Router();
const {    
handleListAllOrders,
handleFoodieOrders,
handleCreateNewOrder
} = require('../controllers/orders');
const { checkIfUserLoggedIn ,authenticateUser } = require('../middlewares/authenticate');

router.get("/listAllOrders", checkIfUserLoggedIn , authenticateUser, handleListAllOrders);

router.get("/listFoodieOrders", checkIfUserLoggedIn , handleFoodieOrders);

router.post("/", checkIfUserLoggedIn , handleCreateNewOrder);

module.exports = router;   