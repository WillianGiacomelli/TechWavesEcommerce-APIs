import { Router } from "express";
import "dotenv/config";

const customerRouter = Router();

customerRouter.get("/customer", (req, res, next) => {
    res.status(200).json("cheguei")
});

customerRouter.post("/customer", (req, res, next) => {
    res.status(200).json("cheguei fella")
});

export default customerRouter;