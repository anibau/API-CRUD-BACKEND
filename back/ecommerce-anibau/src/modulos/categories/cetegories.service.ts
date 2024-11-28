import { Injectable } from "@nestjs/common";
import { CategoriesRepository } from "./categories.repository";
import { Categories } from "./categories.entity";

@Injectable()
export class CategoriesService{
    constructor(private readonly categoriesRepository: CategoriesRepository){}
    async getCategories(){
        return this.categoriesRepository.getCategories()
    }
    async addCategories(categorie: Partial<Categories>){
        return this.categoriesRepository.addCategories(categorie)
    }
}