import { Categories } from "./categories.entity";
import { Repository } from "typeorm";
export declare class CategoriesRepository {
    private categoriesRepository;
    constructor(categoriesRepository: Repository<Categories>);
    getCategories(): Promise<Categories[]>;
    addCategories(categorie: Partial<Categories>): Promise<Categories>;
}
