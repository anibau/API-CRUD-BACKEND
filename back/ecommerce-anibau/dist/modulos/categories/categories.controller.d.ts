import { CategoriesService } from "./cetegories.service";
import { Categories } from "./categories.entity";
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    getCategories(): Promise<Categories[]>;
    addCategories(categorie: any): Promise<Categories>;
}
