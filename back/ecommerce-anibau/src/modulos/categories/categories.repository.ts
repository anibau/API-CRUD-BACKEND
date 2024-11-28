import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Categories } from "./categories.entity";
import { Repository } from "typeorm";

@Injectable()
export class CategoriesRepository{
    constructor(@InjectRepository(Categories) private categoriesRepository: Repository<Categories>){}
    
    async getCategories (){
        const categories= await this.categoriesRepository.find({relations:{products:true}});
        if (!categories.length) {
            throw new NotFoundException("No se encontraron categorías con productos asociados.");
          }
          return categories
    }
    async addCategories(categorie: Partial<Categories>){
        const category=  this.categoriesRepository.create(categorie);
        return this.categoriesRepository.save(category)
    }
}