import { PrismaClient } from "@prisma/client";
import CategoryModel from "../../models/category-model";
import BaseRepository from "../base/baseRepositorie";

export default class CategoryRepository  extends BaseRepository<CategoryModel>{

    constructor(model: keyof PrismaClient) {
        super(model);
    }

}