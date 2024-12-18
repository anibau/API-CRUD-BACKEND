import { Categories } from "./categories.entity";
import { Repository } from "typeorm";
import { CategorieDto } from "./categories.dto";
export declare class CategoriesRepository {
    private categoriesRepository;
    constructor(categoriesRepository: Repository<Categories>);
    getCategories(): Promise<Categories[]>;
    addCategoryJSON(): Promise<string>;
    addCategories(categorie: CategorieDto): Promise<Categories>;
}
