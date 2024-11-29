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
    async addCategories(categorie: Partial<Categories>): Promise<Categories>{
        const searchCategory= await this.categoriesRepository.findOne({where:{name: categorie.name}});
        if(searchCategory){
            throw new NotFoundException(`Error: la categoria ${categorie.name} ya existe`)
        }
        const category=  this.categoriesRepository.create(categorie);
        return this.categoriesRepository.save(category)
    }
}