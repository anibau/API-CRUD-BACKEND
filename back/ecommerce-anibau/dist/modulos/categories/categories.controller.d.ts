import { CategoriesService } from "./categories.service";
import { Categories } from "./categories.entity";
import { CategorieDto } from "./categorie.dto";
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    getCategories(): Promise<Categories[]>;
    addCategoryJSON(): Promise<string>;
    addCategories(categorie: CategorieDto): Promise<Categories>;
}
