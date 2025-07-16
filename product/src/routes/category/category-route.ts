import { Router } from "express";
import "dotenv/config";
import { getAllCategories } from "../../controllers/categoryController";
import { Request, Response } from "express";

const categoryRouter = Router();

// customerRouter.get("/categorie", (req, res, next) => {
//     res.status(200).json("cheguei")
// });
categoryRouter.get("/product/category", (req: Request, res: Response) => {
	getAllCategories(req, res);
});

export default categoryRouter;