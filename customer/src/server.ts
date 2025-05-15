import express from "express";
import cors from 'cors';
import "dotenv/config";
import customerRouter from "./routes/customer/customer-route";
import healthCheckRouter from "./routes/healthCheck/health-check-route";

const PORT = process.env.API_PORT ?? 3002;

const app = express();

app.use(express.json());
app.use(cors());

app.use(customerRouter);
app.use(healthCheckRouter);


app.listen(PORT, () =>{
    console.log(`Client API server is running on port ${PORT}`);
})
