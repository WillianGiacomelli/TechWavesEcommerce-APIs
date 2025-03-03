import express from "express";
import customerRouter from "./modules/routes/customer/customer-route";
import { errorHandler } from "./modules/middlewares/error-handler";
require("dotenv").config();

const PORT = process.env.API_PORT;

const app = express();

app.use(express.json());

app.use(customerRouter);

app.use(errorHandler);

app.listen(PORT, () =>{
    console.log(`Client gateway server is running on port ${PORT}`);
})
