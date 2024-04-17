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
const { checkIfUserLoggedIn, authenticateUser } = require('../middlewares/authenticate');





router.get("/", checkIfUserLoggedIn, handleGetAllDishes);

router.get("/:id", checkIfUserLoggedIn, handleGetDishById);

router.post("/", checkIfUserLoggedIn, authenticateUser, handleCreateDish);

router.patch("/:id", checkIfUserLoggedIn, authenticateUser, handleUpdateDish);

router.delete("/:id", checkIfUserLoggedIn, authenticateUser, handleDeleteDish);

router.post("/upload", checkIfUserLoggedIn, authenticateUser, upload.single('file'), handleImageUpload);

module.exports = router;