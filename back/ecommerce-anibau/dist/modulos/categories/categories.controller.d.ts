import { CategoriesService } from "./categories.service";
import { Categories } from "./categories.entity";
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    getCategories(): Promise<Categories[]>;
    addCategoryJSON(): Promise<string>;
    addCategories(categorie: Partial<Categories>): Promise<Categories>;
}
