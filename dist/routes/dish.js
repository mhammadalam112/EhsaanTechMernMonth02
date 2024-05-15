"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        cb(null, uniqueSuffix + '_' + file.originalname);
    }
});
const upload = (0, multer_1.default)({ storage: storage });
const { handleGetAllDishes, handleGetDishById, handleCreateDish, handleUpdateDish, handleDeleteDish, handleImageUpload } = require('../controllers/dish');
const { authenticateUser } = require('../middlewares/authenticate');
router.get("/", authenticateUser(), handleGetAllDishes);
router.get("/:id", authenticateUser(), handleGetDishById);
router.post("/", authenticateUser("restrictAccess"), handleCreateDish);
router.patch("/:id", authenticateUser("restrictAccess"), handleUpdateDish);
router.delete("/:id", authenticateUser("restrictAccess"), handleDeleteDish);
router.post("/upload", authenticateUser("restrictAccess"), upload.single('file'), handleImageUpload);
exports.default = router;
