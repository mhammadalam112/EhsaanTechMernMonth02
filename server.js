const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config({ path: './config/.env' });
const PORT = process.env.PORT;

const chefRouter = require("./src/routes/chef");
const dishRouter = require("./src/routes/dish");
const ordersRouter = require("./src/routes/orders");
const foodieRouter = require("./src/routes/foodie");

app.use(express.json());

//Routes
app.use('/dishes',dishRouter);
app.use('/chefs',chefRouter);
app.use('/orders',ordersRouter);
app.use('/foodies',foodieRouter);

app.listen(PORT, () => console.log("server started at PORT " + PORT));