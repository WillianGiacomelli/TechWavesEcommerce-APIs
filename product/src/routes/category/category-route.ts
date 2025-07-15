import { Router } from "express";
import "dotenv/config";
import { getAllCategories } from "../../controllers/categoryController";

const categoryRouter = Router();

// customerRouter.get("/categorie", (req, res, next) => {
//     res.status(200).json("cheguei")
// });

categoryRouter.get("/product/category", getAllCategories);

export default categoryRouter;