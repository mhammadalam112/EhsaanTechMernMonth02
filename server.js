const express = require("express");
const app = express();
const cookieParser = require('cookie-parser');
const dotenv = require("dotenv");
dotenv.config({ path: './config/.env' });
const PORT = process.env.PORT;

const chefRouter = require("./src/routes/chef");
const dishRouter = require("./src/routes/dish");
const ordersRouter = require("./src/routes/orders");
const foodieRouter = require("./src/routes/foodie");

app.use(express.json());
app.use(cookieParser());

//Routes
app.use('/dish',dishRouter);
app.use('/chef',chefRouter);
app.use('/orders',ordersRouter);
app.use('/foodie',foodieRouter);

app.listen(PORT, () => console.log("server started at PORT " + PORT));