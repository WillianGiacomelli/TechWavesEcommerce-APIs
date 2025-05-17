import { Router } from "express";
import "dotenv/config";

const healthCheckRouter = Router();

healthCheckRouter.get("/product/health-check", (req, res, next) => {
    res.status(200).json("API product is working successfully")
});

export default healthCheckRouter;