import { Router } from "express";
import "dotenv/config";
import { createCustomer } from "../../controllers/customerController";

const customerRouter = Router();

customerRouter.get("/customer", (req, res, next) => {
    res.status(200).json("cheguei")
});

customerRouter.post("/customer", createCustomer);

export default customerRouter;