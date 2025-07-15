import { ApiResponse } from "../models/response/response";
import CategoryService from "../services/categoryService";
import { Request, Response } from "express";

const getAllCategories = async (req: Request, res: Response) => {
    try{
        const body  = req.body;

        const categoryService = new CategoryService();

        const data = await categoryService.getAllCategories();

        return res.status(200).json(ApiResponse.success("", data));
    }catch(error: any){
        error
        res.status(500).json(ApiResponse.error(error.message));
    }
}

export {getAllCategories}