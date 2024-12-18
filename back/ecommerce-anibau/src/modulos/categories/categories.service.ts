import { Injectable } from "@nestjs/common";
import { CategoriesRepository } from "./categories.repository";
import { Categories } from "./categories.entity";
import { CategorieDto } from "./categories.dto";

@Injectable()
export class CategoriesService{
    constructor(private readonly categoriesRepository: CategoriesRepository){}

    //* GET/CATEGORIES
    async getCategories(){
        return this.categoriesRepository.getCategories()
    }
    //* GET/SEEDER
    async addCategoriesJSON(){
        return this.categoriesRepository.addCategoryJSON()
    }
    //* POST/CATEGORIES
    async addCategories(categorie:CategorieDto): Promise<Categories>{
        return this.categoriesRepository.addCategories(categorie)
    }
}