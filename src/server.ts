import express from "express";
const app = express();
import 'express-async-errors';
import dotenv from "dotenv";
dotenv.config({ path: './config/.env' });
const PORT = process.env.PORT;

import chefRouter from "./routes/chef";
import dishRouter from "./routes/dish";
import ordersRouter from "./routes/orders";
import foodieRouter from "./routes/foodie";

const { globalErrorHandler } = require('./middlewares/authenticate');

app.use(express.json());

//Routes
app.use('/dishes',dishRouter);
app.use('/chefs',chefRouter);
app.use('/orders',ordersRouter);
app.use('/foodies',foodieRouter);

app.use(globalErrorHandler);

app.listen(PORT, () => console.log("server started at PORT " + PORT));