import { CategoriesRepository } from "./categories.repository";
import { Categories } from "./categories.entity";
import { CategorieDto } from "./categorie.dto";
export declare class CategoriesService {
    private readonly categoriesRepository;
    constructor(categoriesRepository: CategoriesRepository);
    getCategories(): Promise<Categories[]>;
    addCategoriesJSON(): Promise<string>;
    addCategories(categorie: CategorieDto): Promise<Categories>;
}
