const express = require("express");
const router = express.Router();
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        cb(null, uniqueSuffix + '_' + file.originalname)
    }
})

const upload = multer({ storage: storage });
const {
    handleGetAllDishes,
    handleGetDishById,
    handleCreateDish,
    handleUpdateDish,
    handleDeleteDish,
    handleImageUpload
} = require('../controllers/dish');
const { authenticateUser } = require('../middlewares/authenticate');


router.get("/", authenticateUser(), handleGetAllDishes);

router.get("/:id", authenticateUser(), handleGetDishById);

router.post("/" , authenticateUser("restrictAccess"), handleCreateDish);

router.patch("/:id" , authenticateUser("restrictAccess"), handleUpdateDish);

router.delete("/:id" , authenticateUser("restrictAccess"), handleDeleteDish);

router.post("/upload" , authenticateUser("restrictAccess"), upload.single('file'), handleImageUpload);

module.exports = router;