import CategoryModel from "../models/category-model";
import CategoryRepository from "../repositories/categorie/categorie-repository";

export default class CategoryService {
    private categorieRepository: CategoryRepository;

    constructor() {
        this.categorieRepository = new CategoryRepository('category');
    }

    // async createCategory(data: any): Promise<any> {
    //     const existingCategory = await this.categorieRepository.findByName(data.name);

    //     if (existingCategory) {
    //         throw new Error("Category with this name already exists");
    //     }

    //     const categoryCreated = await this.categorieRepository.create(data);

    //     if (!categoryCreated) {
    //         throw new Error("Error creating category");
    //     }

    //     return categoryCreated;
    // }

    async getAllCategories(): Promise<CategoryModel[]> {
        const categories = await this.categorieRepository.findAll();
        return categories;
    }
}