import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Categories } from "./categories.entity";
import { Repository } from "typeorm";
import * as data from '../../Utils/data.json'
import { CategorieDto } from "./categories.dto";

@Injectable()
export class CategoriesRepository{
    constructor(@InjectRepository(Categories) private categoriesRepository: Repository<Categories>){}
    
    //* GET/CATEGORIES
    async getCategories (){
        const categories= await this.categoriesRepository.find({relations:{products:true}});
        if (!categories.length) {
            throw new NotFoundException("No se encontraron categorías con productos asociados.");
          }
          return categories
    }
    //* GET/SEEDER
    async addCategoryJSON(){
        for (const obj of data){
            const category= await this.categoriesRepository.findOne({where:{name: obj.categories}});
            if(!category){
                const newCategory= this.categoriesRepository.create({name:obj.categories});
                await this.categoriesRepository.save(newCategory)
            }
        }; return 'las categorias fueron agregadas'
    }
    //* POST/CATEGORIES
    async addCategories(categorie:CategorieDto): Promise<Categories>{
        const searchCategory= await this.categoriesRepository.findOne({where:{name: categorie.name}});
        if(searchCategory){
            throw new NotFoundException(`Error: la categoria ${categorie.name} ya existe`)
        }
        const category=  this.categoriesRepository.create(categorie);
        return this.categoriesRepository.save(category)
    }
}