import { Categories } from "./categories.entity";
import { Repository } from "typeorm";
export declare class CategoriesRepository {
    private categoriesRepository;
    constructor(categoriesRepository: Repository<Categories>);
    getCategories(): Promise<Categories[]>;
    addCategoryJSON(): Promise<string>;
    addCategories(categorie: Partial<Categories>): Promise<Categories>;
}
