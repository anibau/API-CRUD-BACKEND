import { CategoriesService } from "./cetegories.service";
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    getCategories(): Promise<import("./categories.entity").Categories[]>;
    addCategories(categorie: any): Promise<import("./categories.entity").Categories>;
}
