import { CategoriesRepository } from "./categories.repository";
import { Categories } from "./categories.entity";
export declare class CategoriesService {
    private readonly categoriesRepository;
    constructor(categoriesRepository: CategoriesRepository);
    getCategories(): Promise<Categories[]>;
    addCategoriesJSON(): Promise<string>;
    addCategories(categorie: Partial<Categories>): Promise<Categories>;
}
