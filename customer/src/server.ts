import express from "express";
import "dotenv/config";
import customerRouter from "./routes/routes";

const PORT = process.env.API_PORT ?? 3002;

const app = express();

app.use(express.json());

app.use(customerRouter);


app.listen(PORT, () =>{
    console.log(`Client API server is running on port ${PORT}`);
})
