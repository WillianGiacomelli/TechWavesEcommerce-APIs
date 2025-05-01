import { Router } from "express";
require("dotenv").config();
const httpProxy = require('express-http-proxy');

const healthCheckRouter = Router();

const customerServiceProxy = httpProxy(process.env.CUSTOMER_API_URL, {
    timeout: 5000,
    proxyErrorHandler: (err: any, res: any, next: any) => {
        console.error("Proxy error:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

healthCheckRouter.get("/health-check", (req, res, next) => customerServiceProxy(req,res,next));

export default healthCheckRouter;