import { Router } from "express";
import "dotenv/config";

const healthCheckRouter = Router();

healthCheckRouter.get("/customer/health-check", (req, res, next) => {
    res.status(200).json("API customer is working successfully")
});

export default healthCheckRouter;