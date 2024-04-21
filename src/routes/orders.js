const express = require("express");
const router = express.Router();
const {    
handleListAllOrders,
handleFoodieOrders,
handleCreateNewOrder,
} = require('../controllers/orders');
const { authenticateUser , setFoodieUsername } = require('../middlewares/authenticate');

router.get("/list", authenticateUser("restrictAccess"), handleListAllOrders);

router.get("/foodie/list", authenticateUser() , setFoodieUsername , handleFoodieOrders);

router.post("/", authenticateUser(), setFoodieUsername , handleCreateNewOrder);

module.exports = router;   