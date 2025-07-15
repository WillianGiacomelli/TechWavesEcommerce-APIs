import express from "express";
import cors from 'cors';
import customerRouter from "./modules/routes/customer/customer-route";
import { errorHandler } from "./modules/middlewares/error-handler";
import healthCheckRouter from "./modules/routes/healtchCheck/health-check-route";
import productRouter from "./modules/routes/product/product-route";
require("dotenv").config();

const PORT = process.env.API_PORT;

const app = express();

app.use(express.json());
app.use(cors());

app.use(customerRouter);
app.use(productRouter);
app.use(healthCheckRouter);

app.use(errorHandler);

app.listen(PORT, () =>{
    console.log(`Client gateway server is running on port ${PORT}`);
})
