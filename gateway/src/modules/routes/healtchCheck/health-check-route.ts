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

const productServiceProxy = httpProxy(process.env.PRODUCT_API_URL, {
    timeout: 5000,
    proxyErrorHandler: (err: any, res: any, next: any) => {
        console.error("Proxy error:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

const requestServiceProxy = httpProxy(process.env.REQUEST_API_URL, {
    timeout: 5000,
    proxyErrorHandler: (err: any, res: any, next: any) => {
        console.error("Proxy error:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

healthCheckRouter.get("/customer/health-check", (req, res, next) => customerServiceProxy(req,res,next));

healthCheckRouter.get("/product/health-check", (req, res, next) => productServiceProxy(req,res,next));

healthCheckRouter.get("/request/health-check", (req, res, next) => requestServiceProxy(req,res,next));

export default healthCheckRouter;