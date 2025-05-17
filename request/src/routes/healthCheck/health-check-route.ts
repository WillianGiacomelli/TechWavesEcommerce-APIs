import { Router } from "express";
import "dotenv/config";

const healthCheckRouter = Router();

healthCheckRouter.get("/request/health-check", (req, res, next) => {
    res.status(200).json("API request is working successfully")
});

export default healthCheckRouter;