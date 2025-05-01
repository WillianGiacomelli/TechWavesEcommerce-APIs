import { Router } from "express";
import "dotenv/config";

const healthCheckRouter = Router();

healthCheckRouter.get("/health-check", (req, res, next) => {
    res.status(200).json("API is working successfully")
});

export default healthCheckRouter;